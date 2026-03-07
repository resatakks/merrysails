import { NextRequest, NextResponse } from "next/server";
import { handleCommand, handleCallbackQuery } from "@/lib/telegram/commands";
import type { TelegramUpdate } from "@/lib/telegram/types";

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret
    const secretHeader = req.headers.get("x-telegram-bot-api-secret-token");
    const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (expected && secretHeader !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update: TelegramUpdate = await req.json();

    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    } else if (update.message?.text) {
      await handleCommand(update.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[MERRYSAILS-TELEGRAM] Webhook error:", error);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

export const runtime = "nodejs";
export const maxDuration = 30;
