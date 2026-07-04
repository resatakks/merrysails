/**
 * Post-trip review + cross-sell EMAIL cron — MerrySails (boat/cruise).
 *
 * Replaces the former Twilio-WhatsApp DRY-RUN skeleton. Channel is now EMAIL
 * ONLY, sent via the repo's SMTP helper (sendEmail). ~4h after a cruise/tour
 * ENDS, each guest gets a single designed message: satisfaction line + review
 * buttons (Google now; Trustpilot when a profile exists) + a returning-guest
 * 10% discount (WELCOMEBACK10, honored MANUALLY by the operator over WhatsApp)
 * + own-cruise cross-sell + one tasteful Merry Tourism card + WhatsApp & Call.
 *
 * Timing (boat brand — no returnDate exists):
 *   tripEnd = combine Reservation.date (DateTime) + time (String "HH:MM").
 *   Send when now >= tripEnd + 4h.
 *   Lookback cap: only tripEnd within [now-72h, now-4h] (prevents a first-deploy
 *   blast to all historical customers).
 *   QUIET HOURS: send moment computed in Europe/Istanbul; skip if hour < 9 or
 *   hour >= 22 (caught on a later run).
 *
 * Eligibility (DENYLIST — operator rule "all statuses except cancelled"):
 *   - status NOT in EXCLUDED_STATUSES (cancelled/canceled/iptal/İptal/refunded/
 *     rejected/test) — so the default "new" status IS eligible, alongside
 *     confirmed/completed. The operator confirms bookings off-DB and rarely
 *     flips status, so "new" is the dominant real-trip state.
 *   - customerEmail present
 *   - No existing ReviewRequest row for that reservationId (idempotent: one row /
 *     reservationId via the model's @unique reservationId).
 *
 * Go-live gate: actual sending is wrapped behind REVIEW_EMAIL_ENABLED === 'true'
 * (default OFF → cron no-ops, returns { disabled: true }). Deploying this code
 * does NOT email anyone until the operator flips the flag on.
 *
 * Test mode: ?test=1&email=<addr> sends one sample to the given address
 * regardless of the flag (does NOT write a ReviewRequest row).
 *
 * Cron (vercel.json): { path: '/api/cron/review-request', schedule: '0 8,18 * * *' }
 * CRON_SECRET Bearer auth gate preserved.
 *
 * Operator next steps:
 *   1. Set REVIEW_EMAIL_ENABLED=true on Vercel when ready to go live.
 *   2. Create a Trustpilot profile → set MERRYSAILS_TRUSTPILOT_REVIEW_URL to
 *      surface the green Trustpilot button (currently hidden — Google only).
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { GBP_REVIEW_URL } from "@/lib/constants";
import { getBcp47 } from "@/i18n/config";
import {
  isReviewLocale,
  postTripReviewEmail,
  type ReviewLocale,
} from "@/lib/email-templates/post-trip-review";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/** How long after a trip ends before the review email goes out (tunable). */
const SEND_DELAY_MS = 4 * 60 * 60 * 1000; // 4h after trip-end
const SEVENTY_TWO_HOURS_MS = 120 * 60 * 60 * 1000; // TEMP: 120h (5d) one-off outage backlog catch-up 2026-07-04 — revert to 72h after

/**
 * DENYLIST eligibility. The dominant reservation status is "new" (the operator
 * confirms bookings off-DB and rarely flips status), so an ALLOWLIST of
 * ("completed","confirmed") wrongly excluded most real trips. Operator rule:
 * "all statuses except cancelled". So new/confirmed/completed are eligible;
 * only the terminal/non-trip states below are excluded.
 */
const EXCLUDED_STATUSES = [
  "cancelled",
  "canceled",
  "iptal",
  "İptal",
  "refunded",
  "rejected",
  "test",
];

/**
 * Boat brand: there is NO reservation.locale column, so the email language is
 * derived from `customerCountry`. We map ISO codes AND human-readable country
 * names (the form stores either) to a ReviewLocale. Anything not mapped — or a
 * locale the email isn't translated into — resolves to `en` (the guaranteed
 * fallback). As the project adds more translations, this map widens; today the
 * email template (post-trip-review.ts) covers every SUPPORTED_LOCALE, so each
 * mapped locale below has a real translation.
 *
 * Country → locale grouping (per project i18n + operator brief):
 *   Turkey → tr; DACH → de; RU/BY/KZ → ru; France → fr; NL/BE → nl;
 *   Gulf/Egypt (Arabic) → sa; CN/TW/HK → zh; Spain → es; Italy → it;
 *   PT/BR → pt; Hungary → hu; Greece → el; everything else → en.
 */
const COUNTRY_TO_LOCALE: Record<string, ReviewLocale> = {
  // Turkey
  tr: "tr",
  turkey: "tr",
  türkiye: "tr",
  turkiye: "tr",
  // German-speaking (DACH)
  de: "de",
  germany: "de",
  deutschland: "de",
  at: "de",
  austria: "de",
  österreich: "de",
  ch: "de",
  switzerland: "de",
  schweiz: "de",
  // Russian-speaking
  ru: "ru",
  russia: "ru",
  "russian federation": "ru",
  by: "ru",
  belarus: "ru",
  kz: "ru",
  kazakhstan: "ru",
  // France
  fr: "fr",
  france: "fr",
  // Dutch-speaking
  nl: "nl",
  netherlands: "nl",
  "the netherlands": "nl",
  holland: "nl",
  be: "nl",
  belgium: "nl",
  // Arabic-speaking (Gulf + Egypt) → "sa" locale
  sa: "sa",
  "saudi arabia": "sa",
  ae: "sa",
  "united arab emirates": "sa",
  uae: "sa",
  qa: "sa",
  qatar: "sa",
  kw: "sa",
  kuwait: "sa",
  bh: "sa",
  bahrain: "sa",
  om: "sa",
  oman: "sa",
  eg: "sa",
  egypt: "sa",
  // Chinese
  cn: "zh",
  china: "zh",
  tw: "zh",
  taiwan: "zh",
  hk: "zh",
  "hong kong": "zh",
  // Spain
  es: "es",
  spain: "es",
  españa: "es",
  espana: "es",
  // Italy
  it: "it",
  italy: "it",
  italia: "it",
  // Portuguese-speaking
  pt: "pt",
  portugal: "pt",
  br: "pt",
  brazil: "pt",
  brasil: "pt",
  // Hungary
  hu: "hu",
  hungary: "hu",
  magyarország: "hu",
  // Greece
  gr: "el",
  greece: "el",
  ελλάδα: "el",
};

/**
 * Resolve the email locale from the stored customerCountry. Normalises case /
 * surrounding whitespace, looks up the country→locale map, and ALWAYS falls
 * back to `en` for unmapped countries (so e.g. UK/US/etc. get English).
 */
function deriveLocale(country?: string | null): ReviewLocale {
  const key = country?.trim().toLowerCase();
  if (!key) return "en";
  return COUNTRY_TO_LOCALE[key] ?? "en";
}

/**
 * Combine the reservation `date` (DateTime) with `time` (String) into the
 * trip-end instant. The stored `date` already carries the calendar day; we
 * overlay the hour/minute from `time`.
 *
 * Real `time` values are messy — they can carry extra text, e.g.
 * "10:00 (return ~17:00)" or "17:00 (boarding from 18:30)". A naive split(':')
 * would yield minute=NaN → Invalid Date. So we extract the FIRST HH:MM with a
 * regex and validate the range. When no valid time is found, we fall back to a
 * safe default of 12:00 (noon) so tripEnd is ALWAYS a valid Date.
 */
function computeTripEnd(date: Date, time: string | null | undefined): Date {
  const end = new Date(date.getTime());
  const m = (time || "").match(/(\d{1,2}):(\d{2})/);
  if (m) {
    const h = Number(m[1]);
    const min = Number(m[2]);
    if (Number.isFinite(h) && Number.isFinite(min) && h <= 23 && min <= 59) {
      end.setHours(h, min, 0, 0);
      return end;
    }
  }
  // No parseable time → anchor at local noon (avoids midnight edge + keeps the
  // tripEnd well inside the trip day for the window math). Always valid.
  end.setHours(12, 0, 0, 0);
  return end;
}

/** Current hour (0-23) in Europe/Istanbul for the quiet-hours guard. */
function istanbulHour(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(at);
  const hourPart = parts.find((p) => p.type === "hour")?.value ?? "0";
  const h = Number.parseInt(hourPart, 10);
  return Number.isFinite(h) ? h % 24 : 0;
}

/** Localised trip date string for the email body. */
function formatTripDate(date: Date, locale: ReviewLocale): string {
  // Use the project's BCP-47 tag per locale (en-US, tr-TR, ar-SA, zh-CN, …) so
  // each recipient sees the date written in their own language. en stays en-GB
  // for the existing day-month-year ordering.
  const intlLocale = locale === "en" ? "en-GB" : getBcp47(locale);
  return new Intl.DateTimeFormat(intlLocale, {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const isTestMode = url.searchParams.get("test") === "1";
  const testEmail = url.searchParams.get("email")?.trim();

  const trustpilotUrl =
    process.env.MERRYSAILS_TRUSTPILOT_REVIEW_URL?.trim() || undefined;

  // ── Test mode: send one sample to the given address regardless of the flag.
  if (isTestMode) {
    if (!testEmail) {
      return NextResponse.json(
        { error: "test mode requires ?email=<addr>" },
        { status: 400 }
      );
    }
    // Allow ?locale=<any supported review locale> for previewing translations;
    // unknown/absent → en.
    const localeParam = url.searchParams.get("locale")?.trim().toLowerCase();
    const locale: ReviewLocale =
      localeParam && isReviewLocale(localeParam) ? localeParam : "en";
    const sample = postTripReviewEmail({
      customerName: "Alex Sample",
      tourName:
        locale === "tr" ? "Boğaz Gün Batımı Turu" : "Bosphorus Sunset Cruise",
      date: formatTripDate(new Date(), locale),
      time: "19:30",
      locale,
      googleReviewUrl: GBP_REVIEW_URL,
      trustpilotUrl,
    });
    await sendEmail({
      to: testEmail,
      subject: sample.subject,
      html: sample.html,
    });
    return NextResponse.json({ ok: true, test: true, to: testEmail, locale });
  }

  // ── Go-live gate: default OFF → cron no-ops without emailing anyone.
  const enabled = process.env.REVIEW_EMAIL_ENABLED === "true";
  if (!enabled) {
    return NextResponse.json({ disabled: true });
  }

  const now = new Date();
  const windowStart = new Date(now.getTime() - SEVENTY_TWO_HOURS_MS); // now-72h
  const windowEnd = new Date(now.getTime() - SEND_DELAY_MS); // now-4h

  // Candidate reservations: eligible status, has email. We still bound the date
  // column generously (date column ≈ trip day) and recompute the precise
  // tripEnd from date+time below, so the [now-72h, now-4h] window is enforced
  // exactly in code regardless of the stored time-of-day.
  const candidates = await prisma.reservation.findMany({
    where: {
      status: { notIn: EXCLUDED_STATUSES },
      customerEmail: { not: "" },
      // date column is the calendar day; widen by a day on each side so a late
      // evening trip whose tripEnd lands inside the window isn't excluded by a
      // midnight-anchored date value. Precise gating happens on tripEnd below.
      date: {
        gte: new Date(windowStart.getTime() - 24 * 60 * 60 * 1000),
        lte: new Date(windowEnd.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    select: {
      reservationId: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      customerCountry: true,
      tourName: true,
      date: true,
      time: true,
    },
  });

  // Filter to those whose precise tripEnd is inside [now-72h, now-4h].
  const inWindow = candidates.filter((r) => {
    if (!r.customerEmail) return false;
    const tripEnd = computeTripEnd(r.date, r.time);
    const sendMoment = new Date(tripEnd.getTime() + SEND_DELAY_MS);
    // Send when now >= tripEnd + 4h  AND  tripEnd within [now-72h, now-4h].
    return (
      now.getTime() >= sendMoment.getTime() &&
      tripEnd.getTime() >= windowStart.getTime() &&
      tripEnd.getTime() <= windowEnd.getTime()
    );
  });

  if (inWindow.length === 0) {
    return NextResponse.json({ ok: true, candidates: 0, sent: 0 });
  }

  // Idempotency: skip reservations that already have a ReviewRequest row.
  const existing = await prisma.reviewRequest.findMany({
    where: { reservationId: { in: inWindow.map((c) => c.reservationId) } },
    select: { reservationId: true },
  });
  const seen = new Set(existing.map((e) => e.reservationId));
  const toProcess = inWindow.filter((c) => !seen.has(c.reservationId));

  // Quiet hours: compute the SEND moment in Europe/Istanbul; skip the whole run
  // if outside 09:00–22:00. A later run (08:00 / 18:00 Vercel cron) catches them.
  const hour = istanbulHour(now);
  if (hour < 9 || hour >= 22) {
    return NextResponse.json({
      ok: true,
      skipped: "quiet_hours",
      istanbulHour: hour,
      eligible: toProcess.length,
    });
  }

  const results: Array<{
    reservationId: string;
    status: string;
    error?: string;
  }> = [];

  for (const r of toProcess) {
    const locale = deriveLocale(r.customerCountry);
    const tripEnd = computeTripEnd(r.date, r.time);
    const { subject, html } = postTripReviewEmail({
      customerName: r.customerName ?? "there",
      tourName: r.tourName,
      date: formatTripDate(tripEnd, locale),
      time: r.time,
      locale,
      googleReviewUrl: GBP_REVIEW_URL,
      trustpilotUrl,
    });

    // Claim the row FIRST (unique reservationId) so a concurrent/overlapping
    // run can never double-send even if the SMTP call is slow.
    try {
      await prisma.reviewRequest.create({
        data: {
          reservationId: r.reservationId,
          customerPhone: r.customerPhone ?? "",
          customerName: r.customerName ?? "",
          locale,
          channel: "email",
          status: "pending",
        },
      });
    } catch {
      // Unique-constraint race: another run already claimed it. Skip.
      results.push({ reservationId: r.reservationId, status: "duplicate" });
      continue;
    }

    try {
      await sendEmail({ to: r.customerEmail!, subject, html });
      await prisma.reviewRequest.update({
        where: { reservationId: r.reservationId },
        data: { status: "sent", sentAt: new Date() },
      });
      results.push({ reservationId: r.reservationId, status: "sent" });
    } catch (err) {
      await prisma.reviewRequest.update({
        where: { reservationId: r.reservationId },
        data: {
          status: "failed",
          errorMessage:
            (err instanceof Error ? err.message : String(err)).slice(0, 500),
        },
      });
      results.push({
        reservationId: r.reservationId,
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    candidates: candidates.length,
    eligible: toProcess.length,
    sent: results.filter((x) => x.status === "sent").length,
    failed: results.filter((x) => x.status === "failed").length,
    results,
  });
}
