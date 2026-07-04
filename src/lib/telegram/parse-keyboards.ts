/**
 * Inline keyboards for the LLM-parse → confirm flow. Lives in its own file so
 * the existing keyboards.ts stays focused on reservation list/detail flows.
 *
 * Callback data convention (Telegram limits each to 64 bytes):
 *   ps:c:<sid>              — confirm (create ALL items with their intent)
 *   ps:x:<sid>               — cancel
 *   ps:t:<sid>:<r|e>         — switch target type (single-item only)
 *   ps:e:<sid>:<idx>:<field> — start editing <field> on item <idx> (idx=0 for single-item)
 *   ps:r:<sid>               — repeat parse (operator says "yanlış parse ettin")
 *   ps:u:<sid>               — confirm update (intent=update flow)
 */

import type { InlineKeyboardMarkup, InlineKeyboardButton } from "./types";
import type { ParsedExternalJob } from "@/lib/external-parser/schema";

export function parsePreviewKeyboard(
  sessionId: string,
  items: ParsedExternalJob[],
  intent: "reservation" | "external" | "update"
): InlineKeyboardMarkup {
  const rows: InlineKeyboardButton[][] = [];

  if (items.length === 1 && intent === "update") {
    rows.push([
      { text: "✅ Güncellemeyi Uygula", callback_data: `ps:u:${sessionId}` },
      { text: "❌ İptal", callback_data: `ps:x:${sessionId}` },
    ]);
    return { inline_keyboard: rows };
  }

  if (items.length === 1) {
    const parsed = items[0];
    const isReservation = intent === "reservation";
    rows.push([
      {
        text: isReservation ? "✅ Reservation Oluştur" : "🟡 External Oluştur",
        callback_data: `ps:c:${sessionId}`,
      },
    ]);

    // Switch target — show only the alternative. Multi-item messages skip
    // this: each item already carries its own intent from the parse.
    rows.push([
      isReservation
        ? { text: "🔄 External'a Çevir", callback_data: `ps:t:${sessionId}:e` }
        : { text: "🔄 Reservation'a Çevir", callback_data: `ps:t:${sessionId}:r` },
    ]);

    // Field-level edits — show the most commonly mis-parsed ones
    rows.push([
      { text: "📅 Tarih", callback_data: `ps:e:${sessionId}:0:jobDate` },
      { text: "🕐 Saat", callback_data: `ps:e:${sessionId}:0:jobTime` },
      { text: "👥 Pax", callback_data: `ps:e:${sessionId}:0:guests` },
    ]);
    rows.push([
      { text: "💰 Tutar", callback_data: `ps:e:${sessionId}:0:amount` },
      { text: "📍 Pickup", callback_data: `ps:e:${sessionId}:0:pickupPoint` },
      { text: "👤 İsim", callback_data: `ps:e:${sessionId}:0:customerName` },
    ]);
    if (parsed.packageName !== null || parsed.eventType === "cruise") {
      rows.push([
        { text: "📦 Paket", callback_data: `ps:e:${sessionId}:0:packageName` },
      ]);
    }

    const editRow3: InlineKeyboardButton[] = [];
    if (parsed.customerEmail || parsed.eventType !== "transfer") {
      editRow3.push({ text: "✉️ Email", callback_data: `ps:e:${sessionId}:0:customerEmail` });
    }
    editRow3.push({ text: "📱 Telefon", callback_data: `ps:e:${sessionId}:0:customerPhone` });
    if (intent === "external") {
      editRow3.push({ text: "💳 Ödeme", callback_data: `ps:e:${sessionId}:0:paymentMethod` });
    }
    if (editRow3.length) rows.push(editRow3);
  } else {
    // Multi-item (round-trip / multi-day / bundle) — one big confirm, plus
    // a compact per-item edit row for the fields most likely to need a fix.
    rows.push([
      { text: `✅ Tümünü Oluştur (${items.length})`, callback_data: `ps:c:${sessionId}` },
    ]);
    items.slice(0, 4).forEach((item, idx) => {
      rows.push([
        { text: `${idx + 1}️⃣ 💰`, callback_data: `ps:e:${sessionId}:${idx}:amount` },
        { text: `${idx + 1}️⃣ 📅`, callback_data: `ps:e:${sessionId}:${idx}:jobDate` },
        {
          text: `${idx + 1}️⃣ ${item.packageName !== null || item.eventType === "cruise" ? "📦" : "📝"}`,
          callback_data: `ps:e:${sessionId}:${idx}:${item.packageName !== null || item.eventType === "cruise" ? "packageName" : "serviceTitle"}`,
        },
      ]);
    });
  }

  rows.push([
    { text: "🔁 Tekrar Parse", callback_data: `ps:r:${sessionId}` },
    { text: "❌ İptal", callback_data: `ps:x:${sessionId}` },
  ]);

  return { inline_keyboard: rows };
}

export function paymentMethodKeyboard(
  sessionId: string,
  itemIdx = 0
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "💵 Cash on board", callback_data: `ps:s:${sessionId}:${itemIdx}:paymentMethod:cash_on_board` },
        { text: "💳 Card on board", callback_data: `ps:s:${sessionId}:${itemIdx}:paymentMethod:card_on_board` },
      ],
      [
        { text: "✅ Card paid", callback_data: `ps:s:${sessionId}:${itemIdx}:paymentMethod:card_paid` },
        { text: "🏦 Bank transfer", callback_data: `ps:s:${sessionId}:${itemIdx}:paymentMethod:bank_transfer` },
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
  records: Array<{
    type: "reservation" | "external";
    recordRef: string;
    voucherUrl: string;
    invoiceUrl: string;
  }>
): InlineKeyboardMarkup {
  const rows: InlineKeyboardButton[][] = [];
  records.forEach((r, idx) => {
    const kind = r.type === "reservation" ? "r" : "e";
    const n = records.length > 1 ? `${idx + 1}. ` : "";
    rows.push([
      { text: `${n}🎫 Voucher`, url: r.voucherUrl },
      { text: `${n}📄 Invoice`, url: r.invoiceUrl },
    ]);
    rows.push([
      {
        text: `${n}✉️ Mail Gönder`,
        callback_data: `ps:m:${kind}:${r.recordRef}`,
      },
      {
        text: `${n}⚙️ Yönet`,
        callback_data: `ps:mg:${kind}:detail:${r.recordRef}`,
      },
    ]);
  });
  return { inline_keyboard: rows };
}
