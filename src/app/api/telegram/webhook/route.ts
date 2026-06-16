import { NextRequest, NextResponse } from "next/server";
import { handleCommand, handleCallbackQuery } from "@/lib/telegram/commands";
import {
  handleParseEntry,
  handleParseCallback,
  handleEditingReply,
  isOperatorEditing,
  shouldAutoParse,
} from "@/lib/telegram/parse-flow";
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

    // Callback queries — parse flow callbacks (ps:*) handled first, falls
    // through to the existing reservation/admin callbacks.
    if (update.callback_query) {
      const data = update.callback_query.data ?? "";
      if (data.startsWith("ps:mg:")) {
        const { handleManageCallback } = await import(
          "@/lib/telegram/parse-manage"
        );
        await handleManageCallback(update.callback_query);
      } else if (data.startsWith("ps:")) {
        await handleParseCallback(update.callback_query);
      } else {
        await handleCallbackQuery(update.callback_query);
      }
      return NextResponse.json({ ok: true });
    }

    const message = update.message;
    if (!message) return NextResponse.json({ ok: true });

    const text = (message.text ?? message.caption ?? "").trim();

    // Slash commands always go to the existing command handler.
    if (text.startsWith("/")) {
      const yenisHandled = text.startsWith("/yenis")
        ? await handleParseEntry({
            ...message,
            text: text.replace(/^\/yenis(\s+|$)/, "").trim() || message.text,
          })
        : false;
      if (!yenisHandled) {
        await handleCommand(message);
      }
      return NextResponse.json({ ok: true });
    }

    // If operator is mid-edit, treat next plain message as the field value.
    if (await isOperatorEditing(String(message.chat.id))) {
      const handled = await handleEditingReply(message);
      if (handled) return NextResponse.json({ ok: true });
    }

    // Auto-detect forwarded messages → start parse flow.
    if (shouldAutoParse(message)) {
      await handleParseEntry(message);
      return NextResponse.json({ ok: true });
    }

    // Fallback to existing command/text handler.
    if (text) await handleCommand(message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[MERRYSAILS-TELEGRAM] Webhook error:", error);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

export const runtime = "nodejs";
export const maxDuration = 30;
