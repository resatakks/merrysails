/**
 * Turn a confirmed ParsedExternalJob into a persisted record. Routes to
 * Reservation OR ExternalJob based on intent.
 *
 * Today's source-of-truth defaults (when fields are missing in parse):
 *  - currency: EUR
 *  - paymentMethod: cash_on_board
 *  - status: confirmed (operator already saw the preview)
 *  - guests: 1 (already enforced by schema validator)
 *  - reservation tour mapping: when intent="reservation" and serviceTitle
 *    contains "dinner" → bosphorus-dinner-cruise, "sunset" → bosphorus-sunset-
 *    cruise, "private" + "yacht" → private-bosphorus-sunset-cruise. Operator
 *    picks the right one during edit step when ambiguous.
 */

import { prisma } from "@/lib/db";
import { generateReservationId } from "@/lib/reservation-id";
import { generateExternalJobId } from "@/lib/external-job-id";
import { serializeReservationNotes } from "@/lib/reservation-meta";
import type { ParsedExternalJob } from "./schema";

const TOUR_SLUG_FALLBACKS: Array<{
  match: RegExp;
  tourSlug: string;
  tourName: string;
}> = [
  {
    match: /private.*dinner|dinner.*private|özel.*dinner|yemekli/i,
    tourSlug: "private-bosphorus-dinner-yacht-cruise",
    tourName: "Private Bosphorus Dinner Yacht Cruise",
  },
  {
    match: /private.*sunset|sunset.*private|özel.*sunset|prıvate yat/i,
    tourSlug: "private-bosphorus-sunset-cruise",
    tourName: "Private Bosphorus Sunset Cruise",
  },
  {
    match: /dinner.*cruise|akşam.*yemekli/i,
    tourSlug: "bosphorus-dinner-cruise",
    tourName: "Bosphorus Dinner Cruise",
  },
  {
    match: /sunset.*cruise|gün batımı/i,
    tourSlug: "bosphorus-sunset-cruise",
    tourName: "Bosphorus Sunset Cruise",
  },
];

function mapReservationTour(parsed: ParsedExternalJob): {
  slug: string;
  name: string;
} {
  const haystack = [
    parsed.serviceTitle,
    parsed.internalNote ?? "",
    parsed.inclusions.join(" "),
  ].join(" ");
  for (const candidate of TOUR_SLUG_FALLBACKS) {
    if (candidate.match.test(haystack)) {
      return { slug: candidate.tourSlug, name: candidate.tourName };
    }
  }
  // Fallback: keep operator-provided title, slug "custom-cruise" — operator
  // can re-classify from admin if needed.
  return {
    slug: "private-bosphorus-sunset-cruise",
    name: parsed.serviceTitle || "Private Bosphorus Cruise",
  };
}

/** Guard against literal "null"/"undefined" strings leaking from the LLM. */
function clean(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const t = String(value).trim();
  if (!t || t.toLowerCase() === "null" || t.toLowerCase() === "undefined") {
    return null;
  }
  return t;
}

/**
 * Default on-board inclusions for a NON-dinner private yacht (sightseeing /
 * sunset / charter). Operator confirmed (2026-06-14): these are standard on
 * every such booking, so we surface them on the voucher automatically.
 */
const PRIVATE_YACHT_DEFAULT_INCLUSIONS = [
  "Soft drinks on board (tea, coffee, water)",
  "Light snacks (nuts)",
];

function isDinnerTour(slug: string): boolean {
  return /dinner/i.test(slug);
}

/**
 * Default meeting point when the operator's message doesn't mention one.
 * Operator-locked 2026-07-20: "yatlar da buluşma noktası mimar sinan heykeli
 * karaköy pier default aksi söylenmedikçe, sunsetlerde karaköy pier balıkcı
 * kemal near tarzı" — yacht/private-charter bookings default to the Mimar
 * Sinan statue wording, the shared sunset cruise defaults to the Balıkçı
 * Kemal wording. Every yacht booking this session landed on this same real
 * pickup anyway, so default instead of asking — only still ask if the
 * message names a genuinely different location. Shared dinner cruise
 * (Kabataş, not Karaköy) and anything unmatched fall back to the tour's own
 * long-form departurePoint text (null here = no override).
 */
function defaultMeetingPointFor(slug: string): string | null {
  if (slug === "bosphorus-sunset-cruise") {
    return "Karaköy Pier (near Balıkçı Kemal)";
  }
  if (
    slug === "yacht-charter-in-istanbul" ||
    slug === "private-bosphorus-sunset-cruise" ||
    slug === "private-bosphorus-dinner-yacht-cruise"
  ) {
    return "Karaköy Pier (Mimar Sinan statue)";
  }
  return null;
}

function dateOrNow(iso: string | null): Date {
  if (iso) {
    const d = new Date(`${iso}T12:00:00.000Z`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

function inferEventTypeForExternal(parsed: ParsedExternalJob): string {
  const t = parsed.eventType;
  if (
    t === "engagement" ||
    t === "birthday" ||
    t === "wedding" ||
    t === "corporate" ||
    t === "family" ||
    t === "transfer" ||
    t === "custom"
  ) {
    return t;
  }
  // "cruise" was a parser hint not a stored type — fall back.
  return "custom";
}

function inferVoucherExtraTitle(parsed: ParsedExternalJob): string {
  switch (parsed.eventType) {
    case "engagement":
      return "Engagement Package & Schedule";
    case "birthday":
      return "Birthday Package & Schedule";
    case "wedding":
      return "Wedding Package & Schedule";
    case "corporate":
      return "Corporate Package & Schedule";
    case "family":
      return "Family Package & Schedule";
    case "transfer":
      return "Transfer & Schedule";
    default:
      return "Package & Schedule";
  }
}

export interface FinalizeReservationResult {
  ok: true;
  type: "reservation";
  recordId: string; // reservation row id
  reservationId: string; // MRY-2026-XXXX
  voucherUrl: string;
  invoiceUrl: string;
}

export interface FinalizeExternalResult {
  ok: true;
  type: "external";
  recordId: string;
  jobId: string;
  voucherUrl: string;
  invoiceUrl: string;
}

export type FinalizeResult =
  | FinalizeReservationResult
  | FinalizeExternalResult
  | { ok: false; error: string };

const SITE_BASE = "https://merrysails.com";

export async function finalizeAsReservation(
  parsed: ParsedExternalJob
): Promise<FinalizeResult> {
  if (!parsed.customerName) return { ok: false, error: "customerName missing" };
  if (!Number.isFinite(parsed.amount)) {
    return { ok: false, error: "amount missing" };
  }

  const tour = mapReservationTour(parsed);
  const serviceDate = dateOrNow(parsed.jobDate);
  const time = clean(parsed.jobTime) ?? "TBC";
  const customerEmail = clean(parsed.customerEmail) ?? "tbc@merrysails.com";
  const customerPhone = clean(parsed.customerPhone) ?? "TBC";
  const pickup = clean(parsed.pickupPoint);
  const serviceTitle = clean(parsed.serviceTitle) ?? tour.name;
  // packageName is the canonical, catalog-exact string (e.g. "Without Wine",
  // "Bosphorus Sunset Cruise with Wine", "Private Yacht Charter") when the
  // model matched one — falls back to serviceTitle for anything else
  // (transfers, custom events) so behavior is unchanged when packageName
  // wasn't applicable.
  const packageName = clean(parsed.packageName) ?? serviceTitle;

  // Merge parser-detected inclusions with the standard private-yacht ikram
  // defaults (only for non-dinner tours, and only when not already present).
  const parsedInclusions = parsed.inclusions
    .map(clean)
    .filter((x): x is string => x !== null);
  const inclusions = isDinnerTour(tour.slug)
    ? parsedInclusions
    : Array.from(
        new Set([...parsedInclusions, ...PRIVATE_YACHT_DEFAULT_INCLUSIONS])
      );

  // Build a clean customer-facing note — never the literal string "null".
  const paymentNote = clean(parsed.paymentNotes);
  const customerNote =
    paymentNote ??
    `${serviceTitle}.${pickup ? ` Departure: ${pickup}.` : ""}`;

  const notes = serializeReservationNotes({
    packageName,
    addOns: inclusions,
    customerNote,
    additionalGuests: [],
    privateTransferRequested: false,
    meetingPointNote: pickup ?? defaultMeetingPointFor(tour.slug) ?? undefined,
    paymentMethod: parsed.paymentMethod,
    emailTemplate: "custom-booking",
    internalOperatorNote: clean(parsed.internalNote) ?? undefined,
  });

  const reservationId = await generateReservationId();
  const reservation = await prisma.reservation.create({
    data: {
      reservationId,
      tourSlug: tour.slug,
      tourName: tour.name,
      date: serviceDate,
      time,
      guests: parsed.guests,
      totalPrice: parsed.amount,
      currency: parsed.currency,
      status: "confirmed",
      confirmedAt: new Date(),
      customerName: parsed.customerName,
      customerEmail,
      customerPhone,
      customerCountry: parsed.customerCountry ?? null,
      notes,
    },
  });

  return {
    ok: true,
    type: "reservation",
    recordId: reservation.id,
    reservationId: reservation.reservationId,
    voucherUrl: `${SITE_BASE}/reservation/${reservation.reservationId}/voucher`,
    invoiceUrl: `${SITE_BASE}/reservation/${reservation.reservationId}/invoice`,
  };
}

export async function finalizeAsExternal(
  parsed: ParsedExternalJob
): Promise<FinalizeResult> {
  if (!parsed.customerName) return { ok: false, error: "customerName missing" };
  if (!Number.isFinite(parsed.amount)) {
    return { ok: false, error: "amount missing" };
  }

  const jobDate = dateOrNow(parsed.jobDate);
  const jobId = await generateExternalJobId();
  const pickup = clean(parsed.pickupPoint);
  const dropoff = clean(parsed.dropoffPoint);
  const serviceTitle = clean(parsed.serviceTitle) ?? "Private Charter";
  const inclusions = parsed.inclusions
    .map(clean)
    .filter((x): x is string => x !== null);

  const job = await prisma.externalJob.create({
    data: {
      jobId,
      eventType: inferEventTypeForExternal(parsed),
      customerName: parsed.customerName,
      customerEmail: clean(parsed.customerEmail),
      customerPhone: clean(parsed.customerPhone),
      customerCountry: clean(parsed.customerCountry),
      serviceTitle,
      jobDate,
      jobTime: clean(parsed.jobTime),
      durationHours: parsed.durationHours,
      guests: parsed.guests,
      pickupPoint:
        parsed.eventType === "transfer" && dropoff
          ? `${pickup ?? "TBC"} → ${dropoff}`
          : pickup,
      inclusions,
      voucherExtraTitle: inferVoucherExtraTitle(parsed),
      amount: parsed.amount,
      currency: parsed.currency,
      paymentMethod: parsed.paymentMethod,
      paymentNotes: clean(parsed.paymentNotes),
      status: "confirmed",
      confirmedAt: new Date(),
      notes: serviceTitle,
      internalNote: clean(parsed.internalNote),
    },
  });

  return {
    ok: true,
    type: "external",
    recordId: job.id,
    jobId: job.jobId,
    voucherUrl: `${SITE_BASE}/external/${job.jobId}/voucher`,
    invoiceUrl: `${SITE_BASE}/external/${job.jobId}/invoice`,
  };
}

export async function finalize(
  parsed: ParsedExternalJob,
  intent: "reservation" | "external"
): Promise<FinalizeResult> {
  return intent === "reservation"
    ? finalizeAsReservation(parsed)
    : finalizeAsExternal(parsed);
}

/**
 * Finalize a whole multi-item message (round-trip legs, multi-day tour days,
 * or a bundle of distinct services). Each item keeps its OWN intent — a
 * message can legitimately mix a cruise reservation with an external event
 * leg. Creates one record per item; a failure on one item does not roll
 * back the others (each is independently useful to the operator), but is
 * reported so nothing silently disappears.
 */
export async function finalizeItems(
  items: ParsedExternalJob[]
): Promise<FinalizeResult[]> {
  const results: FinalizeResult[] = [];
  for (const item of items) {
    results.push(await finalize(item, item.intent === "update" ? "external" : item.intent));
  }
  return results;
}
