/**
 * Inline keyboards for the LLM-parse → confirm flow. Lives in its own file so
 * the existing keyboards.ts stays focused on reservation list/detail flows.
 *
 * Callback data convention (Telegram limits each to 64 bytes):
 *   ps:c:<sid>           — confirm (create with current intent)
 *   ps:x:<sid>           — cancel
 *   ps:t:<sid>:<r|e>     — switch target type (reservation / external)
 *   ps:e:<sid>:<field>   — start editing field
 *   ps:r:<sid>           — repeat parse (operator says "yanlış parse ettin")
 *   ps:u:<sid>           — confirm update (intent=update flow)
 */

import type { InlineKeyboardMarkup, InlineKeyboardButton } from "./types";
import type { ParsedExternalJob } from "@/lib/external-parser/schema";

export function parsePreviewKeyboard(
  sessionId: string,
  parsed: ParsedExternalJob,
  intent: "reservation" | "external" | "update"
): InlineKeyboardMarkup {
  const rows: InlineKeyboardButton[][] = [];

  if (intent === "update") {
    rows.push([
      { text: "✅ Güncellemeyi Uygula", callback_data: `ps:u:${sessionId}` },
      { text: "❌ İptal", callback_data: `ps:x:${sessionId}` },
    ]);
    return { inline_keyboard: rows };
  }

  const isReservation = intent === "reservation";
  rows.push([
    {
      text: isReservation
        ? "✅ Reservation Oluştur"
        : "🟡 External Oluştur",
      callback_data: `ps:c:${sessionId}`,
    },
  ]);

  // Switch target — show only the alternative
  rows.push([
    isReservation
      ? {
          text: "🔄 External'a Çevir",
          callback_data: `ps:t:${sessionId}:e`,
        }
      : {
          text: "🔄 Reservation'a Çevir",
          callback_data: `ps:t:${sessionId}:r`,
        },
  ]);

  // Field-level edits — show the most commonly mis-parsed ones
  const editRow1: InlineKeyboardButton[] = [
    { text: "📅 Tarih", callback_data: `ps:e:${sessionId}:jobDate` },
    { text: "🕐 Saat", callback_data: `ps:e:${sessionId}:jobTime` },
    { text: "👥 Pax", callback_data: `ps:e:${sessionId}:guests` },
  ];
  const editRow2: InlineKeyboardButton[] = [
    { text: "💰 Tutar", callback_data: `ps:e:${sessionId}:amount` },
    { text: "📍 Pickup", callback_data: `ps:e:${sessionId}:pickupPoint` },
    { text: "👤 İsim", callback_data: `ps:e:${sessionId}:customerName` },
  ];
  rows.push(editRow1);
  rows.push(editRow2);

  // Less common
  const editRow3: InlineKeyboardButton[] = [];
  if (parsed.customerEmail || parsed.eventType !== "transfer") {
    editRow3.push({ text: "✉️ Email", callback_data: `ps:e:${sessionId}:customerEmail` });
  }
  editRow3.push({ text: "📱 Telefon", callback_data: `ps:e:${sessionId}:customerPhone` });
  if (intent === "external") {
    editRow3.push({
      text: "💳 Ödeme",
      callback_data: `ps:e:${sessionId}:paymentMethod`,
    });
  }
  if (editRow3.length) rows.push(editRow3);

  rows.push([
    { text: "🔁 Tekrar Parse", callback_data: `ps:r:${sessionId}` },
    { text: "❌ İptal", callback_data: `ps:x:${sessionId}` },
  ]);

  return { inline_keyboard: rows };
}

export function paymentMethodKeyboard(sessionId: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "💵 Cash on board", callback_data: `ps:s:${sessionId}:paymentMethod:cash_on_board` },
        { text: "💳 Card on board", callback_data: `ps:s:${sessionId}:paymentMethod:card_on_board` },
      ],
      [
        { text: "✅ Card paid", callback_data: `ps:s:${sessionId}:paymentMethod:card_paid` },
        { text: "🏦 Bank transfer", callback_data: `ps:s:${sessionId}:paymentMethod:bank_transfer` },
      ],
      [{ text: "↩️ Geri", callback_data: `ps:b:${sessionId}` }],
    ],
  };
}

export function intentClassifyKeyboard(sessionId: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "✅ Reservation (normal cruise)", callback_data: `ps:t:${sessionId}:r` }],
      [{ text: "🟡 External (event/transfer)", callback_data: `ps:t:${sessionId}:e` }],
      [{ text: "↩️ Geri", callback_data: `ps:b:${sessionId}` }],
    ],
  };
}

export function parsedSuccessKeyboard(
  type: "reservation" | "external",
  recordId: string,
  voucherUrl: string,
  invoiceUrl: string,
  bookingRef: string
): InlineKeyboardMarkup {
  const kind = type === "reservation" ? "r" : "e";
  return {
    inline_keyboard: [
      [
        { text: "🎫 Voucher", url: voucherUrl },
        { text: "📄 Invoice", url: invoiceUrl },
      ],
      [
        {
          text: "✉️ Müşteriye Mail Gönder",
          callback_data: `ps:m:${kind}:${bookingRef}`,
        },
      ],
      [
        {
          text: "⚙️ Yönet (onay/iptal/sil)",
          callback_data: `ps:mg:${kind}:detail:${bookingRef}`,
        },
      ],
    ],
  };
}
