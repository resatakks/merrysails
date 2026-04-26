// Telegram Inline Keyboards — MerrySails
import type { InlineKeyboardMarkup, InlineKeyboardButton, SailsReservation } from "./types";
import {
  getReservationDetailUrl,
  getReservationInvoiceUrl,
  getReservationVoucherUrl,
  getTourUrlBySlug,
} from "@/lib/reservation-links";
import { getWhatsAppUrl } from "./phone-links";

interface ReservationActionOptions {
  phone?: string | null;
  reservationId?: string;
  tourSlug?: string;
}

export function startQuickActions(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "📅 Bugün", callback_data: "cmd_bugun" }, { text: "📅 Yarın", callback_data: "cmd_yarin" }],
      [{ text: "🆕 Bekleyenler", callback_data: "cmd_bekleyen" }, { text: "📊 İstatistik", callback_data: "cmd_istatistik" }],
      [{ text: "⚙️ Bildirimler", callback_data: "cmd_bildirimler" }, { text: "📖 Tüm Komutlar", callback_data: "cmd_yardim" }],
    ],
  };
}

export function reservationListButtons(reservations: SailsReservation[]): InlineKeyboardMarkup {
  const buttons: InlineKeyboardButton[][] = [];
  const limited = reservations.slice(0, 50);

  for (let i = 0; i < limited.length; i += 2) {
    const row: InlineKeyboardButton[] = [];
    const r1 = limited[i];
    const name1 = r1.customerName.split(" ")[0].substring(0, 10);
    row.push({ text: `${r1.time} ${name1} ${r1.reservationId}`, callback_data: `show_${r1.id}` });

    if (i + 1 < limited.length) {
      const r2 = limited[i + 1];
      const name2 = r2.customerName.split(" ")[0].substring(0, 10);
      row.push({ text: `${r2.time} ${name2} ${r2.reservationId}`, callback_data: `show_${r2.id}` });
    }
    buttons.push(row);
  }
  return { inline_keyboard: buttons };
}

export function reservationActions(
  id: string,
  options: ReservationActionOptions = {}
): InlineKeyboardMarkup {
  const rows: InlineKeyboardButton[][] = [];
  rows.push([
    { text: "✅ Onayla", callback_data: `approve_${id}` },
    { text: "🏁 Tamamla", callback_data: `complete_${id}` },
    { text: "❌ İptal", callback_data: `cancel_${id}` },
  ]);
  rows.push([{ text: "📋 Detay Gör", callback_data: `detail_${id}` }]);

  const reservationLinks: InlineKeyboardButton[] = [];
  if (options.reservationId) {
    reservationLinks.push({
      text: "📄 Rezervasyon",
      url: getReservationDetailUrl(options.reservationId),
    });
    reservationLinks.push({
      text: "🧾 Fatura",
      url: getReservationInvoiceUrl(options.reservationId),
    });
    reservationLinks.push({
      text: "🎟️ Voucher",
      url: getReservationVoucherUrl(options.reservationId),
    });
  }
  if (reservationLinks.length > 0) rows.push(reservationLinks);

  const contactLinks: InlineKeyboardButton[] = [];
  const whatsappUrl = getWhatsAppUrl(options.phone);
  if (whatsappUrl) {
    contactLinks.push({ text: "💬 WhatsApp", url: whatsappUrl });
  }
  if (options.tourSlug) {
    contactLinks.push({
      text: "🌐 Tur Sayfası",
      url: getTourUrlBySlug(options.tourSlug),
    });
  }
  if (contactLinks.length > 0) rows.push(contactLinks);

  return { inline_keyboard: rows };
}

export function reservationDetailActions(
  id: string,
  options: ReservationActionOptions = {}
): InlineKeyboardMarkup {
  const rows: InlineKeyboardButton[][] = [];
  rows.push([
    { text: "✅ Onayla", callback_data: `approve_${id}` },
    { text: "🏁 Tamamla", callback_data: `complete_${id}` },
    { text: "❌ İptal", callback_data: `cancel_${id}` },
  ]);

  const reservationLinks: InlineKeyboardButton[] = [];
  if (options.reservationId) {
    reservationLinks.push({
      text: "📄 Rezervasyon",
      url: getReservationDetailUrl(options.reservationId),
    });
    reservationLinks.push({
      text: "🧾 Fatura",
      url: getReservationInvoiceUrl(options.reservationId),
    });
    reservationLinks.push({
      text: "🎟️ Voucher",
      url: getReservationVoucherUrl(options.reservationId),
    });
  }
  if (reservationLinks.length > 0) rows.push(reservationLinks);

  const contactLinks: InlineKeyboardButton[] = [];
  const whatsappUrl = getWhatsAppUrl(options.phone);
  if (whatsappUrl) {
    contactLinks.push({ text: "💬 WhatsApp", url: whatsappUrl });
  }
  if (options.tourSlug) {
    contactLinks.push({
      text: "🌐 Tur Sayfası",
      url: getTourUrlBySlug(options.tourSlug),
    });
  }
  if (contactLinks.length > 0) rows.push(contactLinks);

  return { inline_keyboard: rows };
}

export function notificationSettings(s: { notifyNew: boolean; notifyDaily: boolean; notifyReminder: boolean }): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: `${s.notifyNew ? "✅" : "❌"} Yeni Rez.`, callback_data: "toggle_notifyNew" },
        { text: `${s.notifyReminder ? "✅" : "❌"} Hatırlatma`, callback_data: "toggle_notifyReminder" },
      ],
      [{ text: `${s.notifyDaily ? "✅" : "❌"} Günlük Rap.`, callback_data: "toggle_notifyDaily" }],
    ],
  };
}

export function statisticsPeriod(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "📅 Bugün", callback_data: "stats_today" },
        { text: "📅 Bu Hafta", callback_data: "stats_week" },
        { text: "📅 Bu Ay", callback_data: "stats_month" },
      ],
    ],
  };
}

export function confirmAction(action: string, id: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "✅ Evet", callback_data: `confirm_${action}_${id}` }, { text: "↩️ Vazgeç", callback_data: "dismiss" }],
    ],
  };
}
