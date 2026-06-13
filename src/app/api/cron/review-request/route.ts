/**
 * Post-booking WhatsApp review-request cron — SKELETON
 *
 * Status: operator-pending Twilio (or WhatsApp Cloud API) approval.
 * Without WHATSAPP_API_TOKEN / TWILIO_* set, this route runs in DRY-RUN
 * mode: it identifies eligible reservations and logs the would-send list,
 * but does NOT call any provider. Safe to enable on the Vercel cron schedule.
 *
 * Eligibility:
 *   - Reservation.status in ("completed", "confirmed")
 *   - Reservation.date occurred 24-72h ago (cruise ran, customer is back ashore)
 *   - No existing ReviewRequest row for that reservationId
 *   - customerPhone present, E.164-ish
 *
 * Cadence: daily at 11:00 Europe/Istanbul (configure in vercel.json crons).
 *
 * Real cost (once enabled):
 *   Twilio TR utility template ~$0.0451/msg × ~50 booking/mo ≈ $2.50/mo
 *   Meta Cloud API direct ~$0.0273/msg × ~50 ≈ $1.37/mo
 *
 * Operator next steps:
 *   1. Approve WABA template "post_booking_review_request_v1" (Meta Business)
 *   2. Resolve MerrySails GBP Place ID → set MERRYSAILS_GBP_REVIEW_URL
 *   3. Choose provider (Twilio vs Cloud API direct) → set env vars
 *   4. Add to vercel.json crons:
 *      { "path": "/api/cron/review-request", "schedule": "0 11 * * *" }
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const BRAND_NAME = "MerrySails";
const BRAND_NAME_TR = "MerrySails ailesi";
const DISCOUNT_CODE = "SAIL5";

function buildMessage(opts: {
  name: string;
  locale: string;
  gbpUrl: string;
  tripadvisorUrl?: string;
}): string {
  const { name, locale, gbpUrl, tripadvisorUrl } = opts;
  if (locale === "tr") {
    return [
      `Merhaba ${name},`,
      ``,
      `${BRAND_NAME_TR} olarak rezervasyonunuz icin tesekkurler.`,
      ``,
      `Deneyiminizi nasil bulduğunuzu ogrenmek isteriz. 5 yildiz + yorum yazarsaniz, bir sonraki rezervasyonunuzda %5 indirim kuponu hediyemiz: ${DISCOUNT_CODE}`,
      ``,
      `Google: ${gbpUrl}`,
      tripadvisorUrl ? `TripAdvisor: ${tripadvisorUrl}` : "",
      ``,
      `Tesekkurler!`,
      BRAND_NAME,
    ].filter(Boolean).join("\n");
  }
  return [
    `Hello ${name},`,
    ``,
    `Thank you for booking with ${BRAND_NAME}.`,
    ``,
    `We would love to hear about your experience. If you leave a 5-star review with a short note, we will send you a 5% discount code for your next booking: ${DISCOUNT_CODE}`,
    ``,
    `Google: ${gbpUrl}`,
    tripadvisorUrl ? `TripAdvisor: ${tripadvisorUrl}` : "",
    ``,
    `Thanks!`,
    BRAND_NAME,
  ].filter(Boolean).join("\n");
}

async function sendViaTwilio(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !from) {
    return { skipped: true as const, reason: "twilio_not_configured" };
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const params = new URLSearchParams({
    From: `whatsapp:${from}`,
    To: `whatsapp:${to}`,
    Body: body,
  });
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!r.ok) {
    const err = await r.text();
    return { ok: false as const, status: r.status, error: err };
  }
  const data = (await r.json()) as { sid: string; status: string };
  return { ok: true as const, providerMsgId: data.sid, status: data.status };
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const gbpUrl = process.env.MERRYSAILS_GBP_REVIEW_URL ?? "";
  const tripadvisorUrl = process.env.MERRYSAILS_TRIPADVISOR_URL || undefined;
  const dryRun =
    !process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !gbpUrl;

  const now = new Date();
  const seventyTwoAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);
  const twentyFourAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Candidate reservations: cruise ran 24-72h ago, completed/confirmed
  const candidates = await prisma.reservation.findMany({
    where: {
      status: { in: ["completed", "confirmed"] },
      date: { gte: seventyTwoAgo, lte: twentyFourAgo },
    },
    select: {
      reservationId: true,
      customerName: true,
      customerPhone: true,
      customerCountry: true,
    },
  });

  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, candidates: 0, sent: 0, dryRun });
  }

  // Skip those that already have a request
  const existing = await prisma.reviewRequest.findMany({
    where: { reservationId: { in: candidates.map((c) => c.reservationId) } },
    select: { reservationId: true },
  });
  const seen = new Set(existing.map((e) => e.reservationId));
  const toProcess = candidates.filter(
    (c) => !seen.has(c.reservationId) && c.customerPhone && c.customerPhone.length >= 8,
  );

  const results: Array<{
    reservationId: string;
    status: string;
    providerMsgId?: string;
    error?: string;
  }> = [];

  for (const r of toProcess) {
    const locale =
      r.customerCountry === "TR" || r.customerCountry === "Turkey" ? "tr" : "en";
    const body = buildMessage({
      name: r.customerName?.split(" ")[0] ?? "there",
      locale,
      gbpUrl,
      tripadvisorUrl,
    });

    if (dryRun) {
      await prisma.reviewRequest.create({
        data: {
          reservationId: r.reservationId,
          customerPhone: r.customerPhone,
          customerName: r.customerName,
          locale,
          channel: "whatsapp",
          status: "skipped",
          errorMessage: "dry_run_no_provider",
        },
      });
      results.push({ reservationId: r.reservationId, status: "dry_run" });
      continue;
    }

    const send = await sendViaTwilio(r.customerPhone, body);
    if ("skipped" in send) {
      await prisma.reviewRequest.create({
        data: {
          reservationId: r.reservationId,
          customerPhone: r.customerPhone,
          customerName: r.customerName,
          locale,
          channel: "whatsapp",
          status: "skipped",
          errorMessage: send.reason,
        },
      });
      results.push({ reservationId: r.reservationId, status: "skipped" });
      continue;
    }
    if (!send.ok) {
      await prisma.reviewRequest.create({
        data: {
          reservationId: r.reservationId,
          customerPhone: r.customerPhone,
          customerName: r.customerName,
          locale,
          channel: "whatsapp",
          status: "failed",
          errorMessage: send.error.slice(0, 500),
        },
      });
      results.push({
        reservationId: r.reservationId,
        status: "failed",
        error: `${send.status}`,
      });
      continue;
    }
    await prisma.reviewRequest.create({
      data: {
        reservationId: r.reservationId,
        customerPhone: r.customerPhone,
        customerName: r.customerName,
        locale,
        channel: "whatsapp",
        status: "sent",
        providerMsgId: send.providerMsgId,
        sentAt: new Date(),
      },
    });
    results.push({
      reservationId: r.reservationId,
      status: "sent",
      providerMsgId: send.providerMsgId,
    });
  }

  return NextResponse.json({
    ok: true,
    candidates: candidates.length,
    eligible: toProcess.length,
    sent: results.filter((r) => r.status === "sent").length,
    dryRun,
    results,
  });
}
