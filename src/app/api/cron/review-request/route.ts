/**
 * Post-trip review + cross-sell EMAIL cron — MerrySails (boat/cruise).
 *
 * Replaces the former Twilio-WhatsApp DRY-RUN skeleton. Channel is now EMAIL
 * ONLY, sent via the repo's SMTP helper (sendEmail). ~6h after a cruise/tour
 * ENDS, each guest gets a single designed message: satisfaction line + review
 * buttons (Google now; Trustpilot when a profile exists) + a returning-guest
 * 10% discount (WELCOMEBACK10, honored MANUALLY by the operator over WhatsApp)
 * + own-cruise cross-sell + one tasteful Merry Tourism card + WhatsApp & Call.
 *
 * Timing (boat brand — no returnDate exists):
 *   tripEnd = combine Reservation.date (DateTime) + time (String "HH:MM").
 *   Send when now >= tripEnd + 6h.
 *   Lookback cap: only tripEnd within [now-72h, now-6h] (prevents a first-deploy
 *   blast to all historical customers).
 *   QUIET HOURS: send moment computed in Europe/Istanbul; skip if hour < 9 or
 *   hour >= 22 (caught on a later run).
 *
 * Eligibility:
 *   - status in ("completed", "confirmed")  [excludes cancelled/refunded/rejected]
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
import {
  postTripReviewEmail,
  type ReviewLocale,
} from "@/lib/email-templates/post-trip-review";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;

const ELIGIBLE_STATUSES = ["completed", "confirmed"];

/** Boat locale derivation — same rule the previous cron used. */
function deriveLocale(country?: string | null): ReviewLocale {
  return country === "TR" || country === "Turkey" ? "tr" : "en";
}

/**
 * Combine the reservation `date` (DateTime) with `time` ("HH:MM") into the
 * trip-end instant. The stored `date` already carries the calendar day; we
 * overlay the hour/minute from `time`. Falls back to the raw date when `time`
 * is missing/malformed.
 */
function computeTripEnd(date: Date, time: string | null | undefined): Date {
  const end = new Date(date.getTime());
  if (time && /^\d{1,2}:\d{2}$/.test(time.trim())) {
    const [h, m] = time.trim().split(":").map((n) => Number.parseInt(n, 10));
    if (Number.isFinite(h) && Number.isFinite(m)) {
      end.setHours(h, m, 0, 0);
    }
  }
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
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
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
    const locale: ReviewLocale =
      url.searchParams.get("locale") === "tr" ? "tr" : "en";
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
  const windowEnd = new Date(now.getTime() - SIX_HOURS_MS); // now-6h

  // Candidate reservations: eligible status, has email. We still bound the date
  // column generously (date column ≈ trip day) and recompute the precise
  // tripEnd from date+time below, so the [now-72h, now-6h] window is enforced
  // exactly in code regardless of the stored time-of-day.
  const candidates = await prisma.reservation.findMany({
    where: {
      status: { in: ELIGIBLE_STATUSES },
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

  // Filter to those whose precise tripEnd is inside [now-72h, now-6h].
  const inWindow = candidates.filter((r) => {
    if (!r.customerEmail) return false;
    const tripEnd = computeTripEnd(r.date, r.time);
    const sendMoment = new Date(tripEnd.getTime() + SIX_HOURS_MS);
    // Send when now >= tripEnd + 6h  AND  tripEnd within [now-72h, now-6h].
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
