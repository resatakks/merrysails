import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { notifyNewReservation } from "@/lib/telegram/notifications";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      GMAIL_USER: process.env.GMAIL_USER || "NOT_SET",
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? `SET (${process.env.GMAIL_APP_PASSWORD.length} chars)` : "NOT_SET",
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? "SET" : "NOT_SET",
    },
  };

  // Test email
  try {
    const emailResult = await sendEmail({
      to: "resatakkus10@gmail.com",
      subject: "MerrySails Production Email Test",
      html: "<h2>Production Test</h2><p>Email works from Vercel!</p>",
    });
    results.email = { success: true, messageId: emailResult.messageId };
  } catch (err: unknown) {
    const e = err as Error & { code?: string; command?: string };
    results.email = { success: false, error: e.message, code: e.code, command: e.command };
  }

  // Test telegram
  try {
    const tgResult = await notifyNewReservation({
      id: "test-diag",
      reservationId: "TEST-DIAG",
      tourSlug: "test",
      tourName: "Diagnostic Test",
      date: new Date(),
      time: "17:00",
      guests: 1,
      totalPrice: 0,
      currency: "EUR",
      customerName: "System Test",
      customerEmail: "test@test.com",
      customerPhone: "+90 000 000 0000",
      customerCountry: null,
      notes: null,
      status: "pending",
      createdAt: new Date(),
    });
    results.telegram = { success: true, ...tgResult };
  } catch (err: unknown) {
    const e = err as Error;
    results.telegram = { success: false, error: e.message, stack: e.stack?.split("\n").slice(0, 3) };
  }

  return NextResponse.json(results, { status: 200 });
}

export const runtime = "nodejs";
export const maxDuration = 30;
