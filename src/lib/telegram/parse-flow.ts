/**
 * Bridges incoming Telegram updates → LLM parser → preview card → confirm
 * action. Lives next to existing commands.ts; the webhook dispatches to here
 * when it detects a forward / `/yenis` command / parse-session callback.
 *
 * State machine summary:
 *   forward/paste → parseAndPersist → previewMessage sent (state=pending)
 *   callback ps:e:<sid>:<field> → state=editing + editingField set
 *   operator's NEXT non-command message while editing → apply override, re-render preview
 *   callback ps:t:<sid>:<r|e> → flip intent, re-render preview
 *   callback ps:c:<sid> → finalize() → create record → success card
 *   callback ps:x:<sid> → cancel
 *   callback ps:r:<sid> → repeat parse (clear overrides, re-run LLM)
 */

import { prisma } from "@/lib/db";
import { sendMessage, editMessageText, answerCallbackQuery } from "./bot";
import {
  parseAndPersist,
  recordOutcome,
  applyOverrides,
} from "@/lib/external-parser/persistence";
import { parseExternalMessage } from "@/lib/external-parser/parse";
import { validateParsed } from "@/lib/external-parser/schema";
import { finalize } from "@/lib/external-parser/finalize";
import {
  formatParsePreview,
  formatFieldEditPrompt,
  formatSuccess,
  formatParseError,
  formatSessionExpired,
} from "./parse-formatters";
import {
  parsePreviewKeyboard,
  paymentMethodKeyboard,
  parsedSuccessKeyboard,
} from "./parse-keyboards";
import type { ParsedExternalJob } from "@/lib/external-parser/schema";
import type { TelegramMessage, TelegramCallbackQuery } from "./types";

const MIN_PARSE_INPUT_LENGTH = 20;

/**
 * Decide whether plain text from the operator looks like a booking forward
 * vs. just chitchat. Operators usually COPY-PASTE from WhatsApp (forwarding
 * cross-app isn't possible), so we can't rely solely on Telegram's
 * forward_origin metadata.
 *
 * Heuristic: a message is auto-parsed when it is reasonably long AND carries
 * at least one strong booking signal (email, phone with country code, price,
 * or date). Casual chat usually fails all three.
 */
const BOOKING_SIGNALS: RegExp[] = [
  /[\w.+\-]+@[\w.\-]+\.[a-z]{2,}/i, // email
  /\+\d[\d\s\-().]{6,}/, // phone with country code
  /(?:€|\$|£|₺)\s?\d{2,}|\b\d{2,}\s?(?:eur|euro|usd|dolar|dollar|tl|lira|pound|sterlin|gbp)\b/i, // price
  /\b\d{1,2}[./]\d{1,2}[./]\d{2,4}\b/, // date 29.06.26 / 29/06/2026
  /\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık|ocak|şubat|mart|nisan|mayıs)/i, // "29 June" / "29 Haziran"
];

const MIN_AUTOPARSE_LENGTH = 50;

function shouldAutoParse(message: TelegramMessage): boolean {
  // Telegram forwarded messages carry forward_origin (modern) or
  // forward_from* (legacy). Either signals "this came from elsewhere".
  if (message.forward_origin) return true;
  if (message.forward_from || message.forward_from_chat) return true;

  // Plain text that looks like a booking forward — paste from WhatsApp etc.
  const text = (message.text ?? message.caption ?? "").trim();
  if (text.length < MIN_AUTOPARSE_LENGTH) return false;
  if (text.startsWith("/")) return false;

  let hits = 0;
  for (const signal of BOOKING_SIGNALS) {
    if (signal.test(text)) hits++;
    if (hits >= 1) return true;
  }
  return false;
}

function getParseInputText(message: TelegramMessage): string | null {
  const text = (message.text ?? message.caption ?? "").trim();
  if (text.length < MIN_PARSE_INPUT_LENGTH) return null;
  return text;
}

async function sendPreview(
  chatId: string,
  sessionId: string,
  parsed: ParsedExternalJob,
  intent: "reservation" | "external" | "update",
  warnings: string[],
  reused: boolean
): Promise<number | null> {
  const text = formatParsePreview(parsed, intent, warnings, reused);
  const keyboard = parsePreviewKeyboard(sessionId, parsed, intent);
  const result = await sendMessage({
    chat_id: chatId,
    text,
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
  const messageId = (result?.result as { message_id?: number } | undefined)
    ?.message_id;
  if (messageId) {
    await prisma.parseSession.update({
      where: { id: sessionId },
      data: { previewMessageId: messageId },
    });
  }
  return messageId ?? null;
}

async function renderPreviewFromSession(
  sessionId: string
): Promise<void> {
  const session = await prisma.parseSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) return;
  const base = session.parsedData as unknown as ParsedExternalJob;
  const overrides = (session.overrides ?? {}) as Record<string, unknown>;
  const merged = applyOverrides(base, overrides);
  const intent = session.intent as "reservation" | "external" | "update";
  const text = formatParsePreview(merged, intent, [], false);
  const keyboard = parsePreviewKeyboard(sessionId, merged, intent);
  if (session.previewMessageId) {
    await editMessageText(
      session.chatId,
      session.previewMessageId,
      text,
      keyboard
    );
  } else {
    await sendPreview(
      session.chatId,
      sessionId,
      merged,
      intent,
      [],
      false
    );
  }
}

// ─── Entry: forwarded or /yenis pasted message ───
export async function handleParseEntry(
  message: TelegramMessage
): Promise<boolean> {
  const chatId = String(message.chat.id);
  const text = getParseInputText(message);
  if (!text) return false;

  // Permission check — only verified TelegramUser
  const user = await prisma.telegramUser.findUnique({
    where: { chatId },
  });
  if (!user || !user.isActive) {
    await sendMessage({
      chat_id: chatId,
      text: "Bu bot sadece verified operatörlere açık. /start ile kayıt ol.",
    });
    return true;
  }

  // Holding message while parser runs
  const holding = await sendMessage({
    chat_id: chatId,
    text: "🔄 Mesaj analiz ediliyor...",
  });
  const holdingMessageId = (holding?.result as { message_id?: number })
    ?.message_id;

  const outcome = await parseAndPersist(text, chatId, "merrysails");

  // Replace holding message with preview (or error)
  if (!outcome.ok) {
    if (holdingMessageId) {
      await editMessageText(
        chatId,
        holdingMessageId,
        formatParseError(outcome.failure.error)
      );
    } else {
      await sendMessage({
        chat_id: chatId,
        text: formatParseError(outcome.failure.error),
      });
    }
    return true;
  }

  const { sessionId, data, warnings, reused } = outcome.result;
  const intent = data.intent;

  // Delete holding, send fresh preview
  if (holdingMessageId) {
    await editMessageText(
      chatId,
      holdingMessageId,
      formatParsePreview(data, intent, warnings, reused),
      parsePreviewKeyboard(sessionId, data, intent)
    );
    await prisma.parseSession.update({
      where: { id: sessionId },
      data: { previewMessageId: holdingMessageId },
    });
  } else {
    await sendPreview(chatId, sessionId, data, intent, warnings, reused);
  }

  return true;
}

// ─── Callback router ───
export async function handleParseCallback(
  callback: TelegramCallbackQuery
): Promise<boolean> {
  const data = callback.data;
  if (!data || !data.startsWith("ps:")) return false;

  const chatId = String(callback.message?.chat.id ?? callback.from.id);
  const parts = data.split(":");
  // parts[0] = "ps", parts[1] = action, parts[2] = sessionId, rest = args
  const action = parts[1];

  // ── Mail action is session-independent: ps:m:<r|e>:<bookingRef> ──
  if (action === "m") {
    return handleSendMail(callback, parts[2] as "r" | "e", parts.slice(3).join(":"));
  }

  const sessionId = parts[2];

  const session = await prisma.parseSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.expiresAt.getTime() < Date.now()) {
    await answerCallbackQuery(callback.id, "Oturum süresi dolmuş", true);
    if (session?.previewMessageId) {
      await editMessageText(chatId, session.previewMessageId, formatSessionExpired());
    }
    return true;
  }

  if (action === "c") {
    return handleConfirm(callback, session);
  }
  if (action === "x") {
    return handleCancel(callback, session);
  }
  if (action === "t") {
    return handleSwitchTarget(callback, session, parts[3] as "r" | "e");
  }
  if (action === "e") {
    return handleStartEdit(callback, session, parts[3]);
  }
  if (action === "r") {
    return handleRepeatParse(callback, session);
  }
  if (action === "s") {
    // ps:s:<sid>:<field>:<value> — set a discrete-choice field
    return handleDiscreteSet(callback, session, parts[3], parts.slice(4).join(":"));
  }
  if (action === "b") {
    // Back from sub-menu
    await answerCallbackQuery(callback.id);
    await renderPreviewFromSession(session.id);
    return true;
  }

  await answerCallbackQuery(callback.id);
  return true;
}

async function handleSendMail(
  callback: TelegramCallbackQuery,
  type: "r" | "e",
  bookingRef: string
): Promise<boolean> {
  const chatId = String(callback.message?.chat.id ?? callback.from.id);
  await answerCallbackQuery(callback.id, "📧 Mail gönderiliyor...");

  try {
    const { sendReservationBookingEmail, sendExternalBookingEmail } =
      await import("@/lib/send-booking-email");
    const result =
      type === "r"
        ? await sendReservationBookingEmail(bookingRef)
        : await sendExternalBookingEmail(bookingRef);

    if (!result.ok) {
      await sendMessage({
        chat_id: chatId,
        text: `❌ Mail gönderilemedi (${bookingRef}): ${result.error}`,
      });
      return true;
    }

    await sendMessage({
      chat_id: chatId,
      text: [
        `✅ <b>Mail gönderildi</b> · ${bookingRef}`,
        ``,
        `📧 ${result.to}`,
        result.cc && result.cc.length
          ? `<i>CC: ${result.cc.join(", ")}</i>`
          : "",
        ``,
        `Voucher + invoice PDF ekli.`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    await sendMessage({
      chat_id: chatId,
      text: `❌ Mail hatası (${bookingRef}): ${(err as Error).message.slice(0, 200)}`,
    });
  }
  return true;
}

async function handleConfirm(
  callback: TelegramCallbackQuery,
  session: { id: string; chatId: string; parsedData: unknown; overrides: unknown; intent: string; previewMessageId: number | null }
): Promise<boolean> {
  const base = session.parsedData as ParsedExternalJob;
  const overrides = (session.overrides ?? {}) as Record<string, unknown>;
  const merged = applyOverrides(base, overrides);
  const intent = session.intent as "reservation" | "external" | "update";

  if (intent === "update") {
    // LLM-driven field updates are intentionally NOT auto-applied (too risky
    // to guess which field the operator meant). Route them to the manage card
    // of the referenced record where edits are deterministic.
    const ref = (merged.referenceId ?? "").trim();
    await answerCallbackQuery(callback.id);
    if (session.previewMessageId) {
      const kind = ref.startsWith("EXT-") ? "e" : "r";
      await editMessageText(
        session.chatId,
        session.previewMessageId,
        ref
          ? `🔄 <b>Güncelleme</b> — ${ref}\n\nBu kaydı yönet kartından onayla / iptal / sil:`
          : `🔄 Güncelleme tespit edildi ama kayıt no okunamadı.\n/yenis_son ile ilgili kaydı bul.`,
        ref
          ? {
              inline_keyboard: [
                [{ text: "⚙️ Kaydı Yönet", callback_data: `ps:mg:${kind}:detail:${ref}` }],
              ],
            }
          : undefined
      );
    }
    return true;
  }

  await answerCallbackQuery(callback.id, "Kaydediliyor...");

  const result = await finalize(merged, intent);

  if (!result.ok) {
    if (session.previewMessageId) {
      await editMessageText(
        session.chatId,
        session.previewMessageId,
        `❌ Kayıt başarısız: ${result.error}`
      );
    }
    return true;
  }

  await recordOutcome(session.id, "confirmed", {
    createdRecordId:
      result.type === "reservation" ? result.reservationId : result.jobId,
    createdRecordType: result.type,
  });

  const recordRef =
    result.type === "reservation" ? result.reservationId : result.jobId;
  if (session.previewMessageId) {
    await editMessageText(
      session.chatId,
      session.previewMessageId,
      formatSuccess(
        result.type,
        recordRef,
        result.voucherUrl,
        result.invoiceUrl
      ),
      parsedSuccessKeyboard(
        result.type,
        result.recordId,
        result.voucherUrl,
        result.invoiceUrl,
        recordRef
      )
    );
  }
  return true;
}

async function handleCancel(
  callback: TelegramCallbackQuery,
  session: { id: string; chatId: string; previewMessageId: number | null }
): Promise<boolean> {
  await recordOutcome(session.id, "cancelled");
  await answerCallbackQuery(callback.id, "İptal edildi");
  if (session.previewMessageId) {
    await editMessageText(
      session.chatId,
      session.previewMessageId,
      "↩️ Parse iptal edildi. Yeni mesaj forward edebilirsin."
    );
  }
  return true;
}

async function handleSwitchTarget(
  callback: TelegramCallbackQuery,
  session: { id: string; intent: string },
  target: "r" | "e"
): Promise<boolean> {
  const newIntent = target === "r" ? "reservation" : "external";
  if (session.intent !== newIntent) {
    await prisma.parseSession.update({
      where: { id: session.id },
      data: { intent: newIntent },
    });
  }
  await answerCallbackQuery(
    callback.id,
    newIntent === "reservation"
      ? "Reservation olarak işaretlendi"
      : "External olarak işaretlendi"
  );
  await renderPreviewFromSession(session.id);
  return true;
}

async function handleStartEdit(
  callback: TelegramCallbackQuery,
  session: {
    id: string;
    chatId: string;
    parsedData: unknown;
    overrides: unknown;
  },
  field: string
): Promise<boolean> {
  // Discrete-choice fields get a sub-keyboard instead of free text
  if (field === "paymentMethod") {
    await answerCallbackQuery(callback.id);
    await sendMessage({
      chat_id: session.chatId,
      text: "Ödeme yöntemini seç:",
      reply_markup: paymentMethodKeyboard(session.id),
    });
    return true;
  }

  await prisma.parseSession.update({
    where: { id: session.id },
    data: { state: "editing", editingField: field },
  });

  const base = session.parsedData as ParsedExternalJob;
  const overrides = (session.overrides ?? {}) as Record<string, unknown>;
  const current =
    field in overrides
      ? overrides[field]
      : (base as unknown as Record<string, unknown>)[field];

  await answerCallbackQuery(callback.id);
  await sendMessage({
    chat_id: session.chatId,
    text: formatFieldEditPrompt(field, current),
  });
  return true;
}

async function handleDiscreteSet(
  callback: TelegramCallbackQuery,
  session: { id: string; chatId: string; overrides: unknown },
  field: string,
  value: string
): Promise<boolean> {
  const overrides = (session.overrides ?? {}) as Record<string, unknown>;
  overrides[field] = value;
  await prisma.parseSession.update({
    where: { id: session.id },
    data: { overrides: overrides as object },
  });
  await answerCallbackQuery(callback.id, `${field} = ${value}`);
  await renderPreviewFromSession(session.id);
  return true;
}

async function handleRepeatParse(
  callback: TelegramCallbackQuery,
  session: {
    id: string;
    chatId: string;
    originalMessage: string;
    brand: string;
    previewMessageId: number | null;
  }
): Promise<boolean> {
  await answerCallbackQuery(callback.id, "Tekrar parse ediliyor...");

  const result = await parseExternalMessage(
    session.originalMessage,
    session.brand as "merrysails"
  );
  if (!result.ok) {
    if (session.previewMessageId) {
      await editMessageText(
        session.chatId,
        session.previewMessageId,
        formatParseError(result.error)
      );
    }
    return true;
  }

  await prisma.parseSession.update({
    where: { id: session.id },
    data: {
      parsedData: result.data as unknown as object,
      intent: result.data.intent,
      overrides: {},
    },
  });

  await renderPreviewFromSession(session.id);
  return true;
}

// ─── Edit field reply handler — when operator is in editing state and
// sends a regular message, treat it as the new value ───
export async function handleEditingReply(
  message: TelegramMessage
): Promise<boolean> {
  const chatId = String(message.chat.id);
  const session = await prisma.parseSession.findFirst({
    where: { chatId, state: "editing" },
    orderBy: { updatedAt: "desc" },
  });
  if (!session || !session.editingField) return false;

  const rawValue = (message.text ?? "").trim();
  if (!rawValue) return false;

  // "-" means clear / null
  const cleared = rawValue === "-";
  const field = session.editingField;
  const value = cleared ? null : coerceFieldValue(field, rawValue);

  const overrides = (session.overrides ?? {}) as Record<string, unknown>;
  overrides[field] = value;

  await prisma.parseSession.update({
    where: { id: session.id },
    data: {
      overrides: overrides as object,
      state: "pending",
      editingField: null,
    },
  });

  await renderPreviewFromSession(session.id);
  return true;
}

function coerceFieldValue(field: string, raw: string): unknown {
  if (field === "guests" || field === "amount") {
    const n = Number.parseFloat(raw.replace(",", "."));
    return Number.isFinite(n) ? (field === "guests" ? Math.round(n) : n) : null;
  }
  if (field === "durationHours") {
    const n = Number.parseFloat(raw.replace(",", "."));
    return Number.isFinite(n) ? n : null;
  }
  if (field === "jobDate") {
    // Accept multiple inputs
    const m1 = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m1) {
      const [, y, mo, d] = m1;
      return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    const m2 = raw.match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})$/);
    if (m2) {
      const [, d, mo, y] = m2;
      const year = y.length === 2 ? `20${y}` : y;
      return `${year}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return raw;
  }
  return raw;
}

// ─── Utility used by webhook to decide dispatch order ───
export async function isOperatorEditing(chatId: string): Promise<boolean> {
  const session = await prisma.parseSession.findFirst({
    where: { chatId, state: "editing" },
    select: { id: true },
  });
  return !!session;
}

export { shouldAutoParse };
