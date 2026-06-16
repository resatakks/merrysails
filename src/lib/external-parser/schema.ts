/**
 * Validated shape of an LLM-parsed external work message.
 *
 * The Gemini call is forced into responseSchema:JSON so we get a typed object
 * back. We still validate manually here because (a) network/model can mis-shape
 * occasionally, (b) we want graceful "elle gir" fallback rather than a 500.
 */

export type ParsedEventType =
  | "engagement"
  | "birthday"
  | "wedding"
  | "corporate"
  | "family"
  | "transfer"
  | "cruise"
  | "custom";

export type ParsedPaymentMethod =
  | "cash_on_board"
  | "card_on_board"
  | "card_paid"
  | "bank_transfer";

export type ParsedCurrency = "EUR" | "USD" | "TRY" | "GBP";

export type ParsedIntent =
  /** Standard shared/private cruise booking — write to Reservation table. */
  | "reservation"
  /** Custom event, engagement, wedding, transfer — write to ExternalJob. */
  | "external"
  /** Operator wants to change an existing record. */
  | "update";

export interface ParsedExternalJob {
  /** Confidence 0-1 — when < 0.6 we ask operator to verify carefully. */
  confidence: number;
  /** Free-text reason — what the model wasn't sure about. */
  uncertainties: string[];
  /** Where this entry should land. */
  intent: ParsedIntent;
  /** When intent="update", the referenced existing job/reservation id. */
  referenceId: string | null;

  eventType: ParsedEventType;
  serviceTitle: string;

  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  customerCountry: string | null;

  /** ISO date "YYYY-MM-DD". null if not detected. */
  jobDate: string | null;
  /** Free-text time like "18:00" or "TBC" or "18:00 / 19:00 TBC". */
  jobTime: string | null;
  durationHours: number | null;
  guests: number;
  pickupPoint: string | null;
  dropoffPoint: string | null;

  inclusions: string[];

  amount: number;
  currency: ParsedCurrency;
  paymentMethod: ParsedPaymentMethod;
  paymentNotes: string | null;

  /** Operator-facing free-text the model thought worth surfacing. */
  internalNote: string | null;
}

const EVENT_TYPES: ParsedEventType[] = [
  "engagement",
  "birthday",
  "wedding",
  "corporate",
  "family",
  "transfer",
  "cruise",
  "custom",
];

const PAYMENT_METHODS: ParsedPaymentMethod[] = [
  "cash_on_board",
  "card_on_board",
  "card_paid",
  "bank_transfer",
];

const CURRENCIES: ParsedCurrency[] = ["EUR", "USD", "TRY", "GBP"];

function s(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function num(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(",", ".").trim();
    if (!cleaned) return null;
    const n = Number.parseFloat(cleaned);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function arr(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0)
    .slice(0, 40);
}

function pick<T extends string>(value: unknown, allowed: T[], fallback: T): T {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim().toLowerCase() as T;
  return allowed.includes(trimmed) ? trimmed : fallback;
}

function isoDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const m = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : value;
}

export function validateParsed(raw: unknown): {
  ok: boolean;
  data?: ParsedExternalJob;
  errors: string[];
} {
  const errors: string[] = [];
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: ["Model returned non-object response."] };
  }
  const r = raw as Record<string, unknown>;

  const customerName = s(r.customerName);
  if (!customerName) errors.push("customerName missing");
  const amount = num(r.amount);
  if (amount === null || amount < 0) errors.push("amount missing or invalid");

  const guestsRaw = num(r.guests);
  const guests =
    guestsRaw && Number.isFinite(guestsRaw) && guestsRaw >= 1
      ? Math.trunc(guestsRaw)
      : 1;

  const confidenceRaw = num(r.confidence);
  const confidence =
    confidenceRaw === null
      ? 0.5
      : Math.max(0, Math.min(1, confidenceRaw));

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const intentRaw = typeof r.intent === "string" ? r.intent.trim().toLowerCase() : "";
  const intent: ParsedIntent =
    intentRaw === "reservation" || intentRaw === "external" || intentRaw === "update"
      ? (intentRaw as ParsedIntent)
      : "external";

  const data: ParsedExternalJob = {
    confidence,
    uncertainties: arr(r.uncertainties),
    intent,
    referenceId: s(r.referenceId),
    eventType: pick(r.eventType, EVENT_TYPES, "custom"),
    serviceTitle:
      s(r.serviceTitle) ??
      (pick(r.eventType, EVENT_TYPES, "custom") === "transfer"
        ? "Private Transfer"
        : "Private Cruise"),
    customerName: customerName!,
    customerEmail: s(r.customerEmail)?.toLowerCase() ?? null,
    customerPhone: s(r.customerPhone),
    customerCountry: s(r.customerCountry),
    jobDate: isoDate(r.jobDate),
    jobTime: s(r.jobTime),
    durationHours: num(r.durationHours),
    guests,
    pickupPoint: s(r.pickupPoint),
    dropoffPoint: s(r.dropoffPoint),
    inclusions: arr(r.inclusions),
    amount: amount!,
    currency: pick(r.currency, CURRENCIES, "EUR"),
    paymentMethod: pick(r.paymentMethod, PAYMENT_METHODS, "cash_on_board"),
    paymentNotes: s(r.paymentNotes),
    internalNote: s(r.internalNote),
  };

  return { ok: true, data, errors: [] };
}

/**
 * Sanity rules — reject obvious mistakes after schema validation.
 * Returns array of warning strings; empty = clean.
 */
export function sanityCheck(parsed: ParsedExternalJob): string[] {
  const warnings: string[] = [];

  // Big amount — verify currency wasn't misread (€2,100 ≠ $21,000)
  if (parsed.amount >= 10_000) {
    warnings.push(
      `Amount is large (${parsed.amount} ${parsed.currency}) — double-check currency and figure.`
    );
  }

  // Date in the past → likely mis-parsed (operator forwards future bookings)
  if (parsed.jobDate) {
    const date = new Date(`${parsed.jobDate}T12:00:00.000Z`);
    const now = new Date();
    if (date.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
      warnings.push(`Date ${parsed.jobDate} is in the past — verify year.`);
    }
  } else {
    warnings.push("Date could not be parsed — fill manually.");
  }

  // Engagement / wedding usually has inclusions
  if (
    (parsed.eventType === "engagement" || parsed.eventType === "wedding") &&
    parsed.inclusions.length === 0
  ) {
    warnings.push(
      `${parsed.eventType} usually has inclusions — none detected.`
    );
  }

  // Transfer should have pickup AND dropoff
  if (parsed.eventType === "transfer" && !parsed.dropoffPoint) {
    warnings.push("Transfer detected but no dropoff point — verify.");
  }

  return warnings;
}
