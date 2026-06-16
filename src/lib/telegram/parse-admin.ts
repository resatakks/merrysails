/**
 * Lightweight admin/audit commands for the parse flow.
 *
 * /yenis_son       Last 10 parsed sessions across all states.
 * /maliyet         Anthropic API spend this month + last 30 days.
 * /yenis_bekleyen  Pending parse sessions (operator started but didn't confirm).
 */

import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { sendMessage } from "./bot";
import type { TelegramMessage } from "./types";

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stateBadge(state: string): string {
  switch (state) {
    case "pending":
      return "⏳";
    case "confirmed":
      return "✅";
    case "cancelled":
      return "❌";
    case "editing":
      return "✏️";
    default:
      return "•";
  }
}

export async function handleYenisSon(message: TelegramMessage): Promise<void> {
  const chatId = String(message.chat.id);
  const sessions = await prisma.parseSession.findMany({
    where: { chatId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  if (sessions.length === 0) {
    await sendMessage({
      chat_id: chatId,
      text: "Henüz parse edilmiş mesaj yok. WhatsApp'tan forward et — bot başlar.",
    });
    return;
  }

  const lines = [`<b>📋 Son 10 parse</b>`, ""];
  for (const s of sessions) {
    const when = format(s.createdAt, "dd MMM HH:mm");
    const recordRef = s.createdRecordId
      ? ` → <code>${escHtml(s.createdRecordId)}</code>`
      : "";
    const intentTag =
      s.intent === "reservation"
        ? "🟢R"
        : s.intent === "external"
          ? "🟡E"
          : "🔄U";
    const data = s.parsedData as { customerName?: string; serviceTitle?: string };
    const who = escHtml(data?.customerName ?? "—").slice(0, 22);
    lines.push(
      `${stateBadge(s.state)} ${intentTag} ${when} · ${who}${recordRef}`
    );
  }
  await sendMessage({ chat_id: chatId, text: lines.join("\n") });
}

export async function handleParserMaliyet(message: TelegramMessage): Promise<void> {
  const chatId = String(message.chat.id);

  const now = new Date();
  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );
  const last30Start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [monthSum, monthCount, last30Sum, last30Count, errorCount] =
    await Promise.all([
      prisma.parseLog.aggregate({
        where: { createdAt: { gte: monthStart } },
        _sum: { costUsd: true },
      }),
      prisma.parseLog.count({
        where: { createdAt: { gte: monthStart }, outcome: { not: "error" } },
      }),
      prisma.parseLog.aggregate({
        where: { createdAt: { gte: last30Start } },
        _sum: { costUsd: true },
      }),
      prisma.parseLog.count({
        where: { createdAt: { gte: last30Start }, outcome: { not: "error" } },
      }),
      prisma.parseLog.count({
        where: { createdAt: { gte: last30Start }, outcome: "error" },
      }),
    ]);

  const monthUsd = monthSum._sum.costUsd ?? 0;
  const last30Usd = last30Sum._sum.costUsd ?? 0;

  await sendMessage({
    chat_id: chatId,
    text: [
      `<b>💸 Parser API maliyeti</b>`,
      "",
      `<b>Bu ay (${format(monthStart, "MMMM")}):</b>`,
      `  ${monthCount} parse · $${monthUsd.toFixed(4)}`,
      "",
      `<b>Son 30 gün:</b>`,
      `  ${last30Count} parse · $${last30Usd.toFixed(4)}`,
      errorCount > 0 ? `  ${errorCount} hata` : "",
      "",
      `<i>Model: Claude Haiku 4.5 ($1/$5 per M token)</i>`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function handleYenisBekleyen(
  message: TelegramMessage
): Promise<void> {
  const chatId = String(message.chat.id);
  const sessions = await prisma.parseSession.findMany({
    where: { chatId, state: "pending", expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  if (sessions.length === 0) {
    await sendMessage({
      chat_id: chatId,
      text: "Bekleyen parse yok.",
    });
    return;
  }

  const lines = [`<b>⏳ Bekleyen parse (${sessions.length})</b>`, ""];
  for (const s of sessions) {
    const data = s.parsedData as { customerName?: string; serviceTitle?: string };
    const who = escHtml(data?.customerName ?? "—").slice(0, 24);
    const what = escHtml(data?.serviceTitle ?? "").slice(0, 32);
    const when = format(s.createdAt, "dd MMM HH:mm");
    lines.push(`• ${when} — ${who}`);
    lines.push(`  <i>${what}</i>`);
  }
  await sendMessage({ chat_id: chatId, text: lines.join("\n") });
}
