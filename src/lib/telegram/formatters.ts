// Telegram Message Formatters — MerrySails
import type { BookingAbandonmentAlert, SailsReservation } from "./types";
import {
  getBookingAbandonmentContext,
  getBookingAbandonmentTriggerLabel,
} from "@/lib/booking-abandonment";
import { getReservationLinkContext } from "@/lib/reservation-links";
import { parseReservationNotes } from "@/lib/reservation-meta";
import { getExperienceSupportPageUrl } from "@/lib/experience-support";
import { normalizeReservationStatus } from "@/lib/reservation-status";
import { getWhatsAppUrl } from "./phone-links";

function esc(text: string | number | null | undefined): string {
  if (text === null || text === undefined) return "-";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function labelTrafficChannel(
  channel?: string | null,
  gclid?: string | null,
  medium?: string | null
): string | null {
  if (gclid) return "Google Ads (gclid)";
  if (channel === "google_ads") return "Google Ads";
  if (channel === "paid_search") return "Paid Search";
  if (channel === "organic_search") return "Organic Search (SEO)";
  if (channel === "email") return "Email";
  if (channel === "social") return "Social";
  if (channel === "referral") return "Referral";
  if (channel === "direct") return "Direct";
  if (medium && /cpc|ppc|paid/.test(medium)) return "Paid";
  return channel ?? null;
}

const TZ = "Europe/Istanbul";

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("tr-TR", { timeZone: TZ, day: "2-digit", month: "long", year: "numeric" });
}

function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("tr-TR", { timeZone: TZ, day: "2-digit", month: "2-digit" });
}

function formatTodayFull(): string {
  return new Date().toLocaleDateString("tr-TR", { timeZone: TZ, day: "2-digit", month: "long", year: "numeric", weekday: "long" });
}

function formatTomorrowFull(): string {
  return new Date(Date.now() + 86400000).toLocaleDateString("tr-TR", { timeZone: TZ, day: "2-digit", month: "long", weekday: "long" });
}

function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("tr-TR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusEmoji(status?: string): string {
  switch (normalizeReservationStatus(status)) {
    case "new": return "🆕";
    case "confirmed": return "✅";
    case "completed": return "🏁";
    case "cancelled": return "❌";
    default: return "📋";
  }
}

function statusText(status?: string): string {
  switch (normalizeReservationStatus(status)) {
    case "new": return "Yeni";
    case "confirmed": return "Onaylandı";
    case "completed": return "Tamamlandı";
    case "cancelled": return "İptal";
    default: return status || "Bekliyor";
  }
}

function progressBar(filled: number, total: number, width = 10): string {
  if (total === 0) return "░".repeat(width);
  const f = Math.round((filled / total) * width);
  return "▓".repeat(f) + "░".repeat(width - f);
}

function currencySymbol(currency: string): string {
  switch (currency) {
    case "EUR": return "€";
    case "USD": return "$";
    case "TRY": return "₺";
    case "GBP": return "£";
    default: return currency;
  }
}

function getTurkeyDateKey(date: string | Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function getDepartureLabel(date: string | Date): string {
  const [targetYear, targetMonth, targetDay] = getTurkeyDateKey(date)
    .split("-")
    .map(Number);
  const [todayYear, todayMonth, todayDay] = getTurkeyDateKey(new Date())
    .split("-")
    .map(Number);

  const targetUtc = Date.UTC(targetYear, targetMonth - 1, targetDay);
  const todayUtc = Date.UTC(todayYear, todayMonth - 1, todayDay);
  const dayDiff = Math.round((targetUtc - todayUtc) / 86400000);
  const absoluteDate = formatDate(date);

  if (dayDiff === 0) return `Bugun · ${absoluteDate}`;
  if (dayDiff === 1) return `Yarin · ${absoluteDate}`;
  if (dayDiff > 1) return `${dayDiff} gun kaldi · ${absoluteDate}`;
  return `${Math.abs(dayDiff)} gun once · ${absoluteDate}`;
}

// ─── Full reservation detail ──────────────────────────────
export function formatReservationDetail(r: SailsReservation): string {
  const dateStr = formatDate(r.date);
  const cs = currencySymbol(r.currency);
  const linkContext = getReservationLinkContext(r.tourSlug, r.reservationId);
  const meta = parseReservationNotes(r.notes);
  const supportGuideUrl = getExperienceSupportPageUrl(r.tourSlug);

  let msg = `${statusEmoji(r.status)} <b>Rezervasyon ${esc(r.reservationId)}</b>\n`;
  msg += `━━━━━━━━━━━━━━━━\n`;
  msg += `🌐 <b>Kaynak:</b> merrysails.com\n`;
  msg += `📊 <b>Durum:</b> ${statusEmoji(r.status)} ${statusText(r.status)}\n`;
  msg += `🧭 <b>Sayfa:</b> ${esc(linkContext.pageLabel)}\n`;
  msg += `🎯 <b>Akış:</b> ${esc(linkContext.bookingLabel)}\n`;
  msg += `⏳ <b>Kalkış:</b> ${esc(getDepartureLabel(r.date))}\n`;

  // Customer
  msg += `\n👤 <b>${esc(r.customerName)}</b>\n`;
  msg += `📱 <b>Tel:</b> ${esc(r.customerPhone)}\n`;
  msg += `📧 ${esc(r.customerEmail)}\n`;
  if (r.customerCountry) msg += `🌍 ${esc(r.customerCountry)}\n`;

  // Tour
  msg += `\n⛵ <b>Tur:</b> ${esc(r.tourName)}\n`;
  msg += `📅 <b>Tarih:</b> ${dateStr}\n`;
  msg += `🕐 <b>Saat:</b> ${esc(r.time)}\n`;
  msg += `👥 <b>Misafir:</b> ${r.guests} kişi\n`;
  if (meta.packageName) msg += `📦 <b>Paket:</b> ${esc(meta.packageName)}\n`;
  if (meta.addOns.length > 0) msg += `➕ <b>Ekstra:</b> ${esc(meta.addOns.join(", "))}\n`;
  if (meta.privateTransferRequested) {
    msg += `🚗 <b>Transfer:</b> Private transfer istendi, ekip pickup detaylari icin iletisime gececek\n`;
  }

  // Price
  msg += `\n💰 <b>Toplam:</b> ${r.totalPrice} ${cs}`;
  if (r.guests > 1) msg += ` (${r.guests} Misafir)`;
  msg += `\n`;
  if (typeof r.internalCostEur === "number") {
    msg += `💶 <b>Maliyet:</b> ${r.internalCostEur} €\n`;
    msg += `📈 <b>Marj:</b> ${Math.round((r.totalPrice - r.internalCostEur) * 100) / 100} €\n`;
  }

  // Notes
  if (meta.customerNote) msg += `\n📝 <b>Not:</b> ${esc(meta.customerNote)}\n`;

  msg += `\n🔗 <b>Rezervasyon:</b> ${esc(linkContext.reservationUrl)}\n`;
  msg += `🧾 <b>Fatura:</b> ${esc(linkContext.invoiceUrl)}\n`;
  msg += `🎟️ <b>Voucher:</b> ${esc(linkContext.voucherUrl)}\n`;
  if (supportGuideUrl) {
    msg += `📍 <b>Boarding Rehberi:</b> ${esc(supportGuideUrl)}\n`;
  }
  if (linkContext.tourPath !== "/") {
    msg += `🌐 <b>Tur Sayfası:</b> ${esc(linkContext.tourUrl)}\n`;
  }

  // WhatsApp
  const whatsappUrl = getWhatsAppUrl(r.customerPhone);
  if (whatsappUrl) {
    msg += `\n💬 WhatsApp: ${whatsappUrl}`;
  }

  return msg;
}

// ─── Compact line for lists ───────────────────────────────
export function formatCompactLine(r: SailsReservation): string {
  const name = esc(r.customerName.split(" ")[0]);
  let tour = r.tourName || "-";
  if (tour.length > 25) tour = tour.substring(0, 23) + "..";
  return `${statusEmoji(r.status)} <b>${esc(r.time)}</b> ${name} — ${esc(tour)}`;
}

// ─── New reservation notification ─────────────────────────
export function formatNewReservation(r: SailsReservation): string {
  const dateStr = formatDate(r.date);
  const cs = currencySymbol(r.currency);
  const linkContext = getReservationLinkContext(r.tourSlug, r.reservationId);
  const meta = parseReservationNotes(r.notes);
  const supportGuideUrl = getExperienceSupportPageUrl(r.tourSlug);

  let msg = `🔔 <b>YENİ REZERVASYON!</b>\n`;
  msg += `━━━━━━━━━━━━━━━━\n`;
  msg += `🌐 <b>Kaynak:</b> merrysails.com\n`;
  msg += `📋 <b>Rez No:</b> ${esc(r.reservationId)}\n`;
  msg += `🧭 <b>Sayfa:</b> ${esc(linkContext.pageLabel)}\n`;
  msg += `🎯 <b>Akış:</b> ${esc(linkContext.bookingLabel)}\n`;
  msg += `⏳ <b>Kalkış:</b> ${esc(getDepartureLabel(r.date))}\n`;

  msg += `\n👤 <b>${esc(r.customerName)}</b>\n`;
  msg += `📱 Tel: ${esc(r.customerPhone)}\n`;
  msg += `📧 ${esc(r.customerEmail)}\n`;
  if (r.customerCountry) msg += `🌍 ${esc(r.customerCountry)}\n`;

  msg += `\n⛵ ${esc(r.tourName)}\n`;
  msg += `📅 ${dateStr} | 🕐 ${esc(r.time)}\n`;
  msg += `👥 ${r.guests} kişi\n`;
  if (meta.packageName) msg += `📦 ${esc(meta.packageName)}\n`;
  if (meta.addOns.length > 0) msg += `➕ ${esc(meta.addOns.join(", "))}\n`;
  if (meta.privateTransferRequested) {
    msg += `🚗 Private transfer istendi — ekip pickup plani icin misafirle iletisime gececek\n`;
  }

  msg += `\n💰 <b>${r.totalPrice} ${cs}</b>`;
  if (r.guests > 1) msg += ` (${r.guests} Misafir)`;
  msg += `\n`;

  // Attribution — answers "Reservation geldi, SEO mu Ads mi?"
  const attributionLabel = labelTrafficChannel(r.trafficChannel, r.gclid, r.utmMedium);
  if (attributionLabel || r.gclid || r.utmSource || r.utmCampaign || r.referrerHost) {
    msg += `\n📊 <b>Kaynak:</b> ${esc(attributionLabel ?? "unknown")}\n`;
    if (r.utmCampaign) msg += `🎯 Kampanya: ${esc(r.utmCampaign)}\n`;
    if (r.utmSource && r.utmSource !== attributionLabel) {
      msg += `🔖 utm_source: ${esc(r.utmSource)}`;
      if (r.utmMedium) msg += ` / ${esc(r.utmMedium)}`;
      msg += `\n`;
    }
    if (r.gclid) msg += `🆔 gclid: ${esc(r.gclid.slice(0, 32))}${r.gclid.length > 32 ? "…" : ""}\n`;
    if (r.referrerHost && !r.gclid && !r.utmSource) {
      msg += `↩️ referrer: ${esc(r.referrerHost)}\n`;
    }
    if (r.landingPath) msg += `🛬 landing: ${esc(r.landingPath)}\n`;
  }

  if (meta.customerNote) msg += `\n📝 Not: ${esc(meta.customerNote)}\n`;

  msg += `\n🔗 Rezervasyon: ${esc(linkContext.reservationUrl)}\n`;
  msg += `🧾 Fatura: ${esc(linkContext.invoiceUrl)}\n`;
  msg += `🎟️ Voucher: ${esc(linkContext.voucherUrl)}\n`;
  if (supportGuideUrl) {
    msg += `📍 Boarding Rehberi: ${esc(supportGuideUrl)}\n`;
  }
  if (linkContext.tourPath !== "/") {
    msg += `🌐 Tur: ${esc(linkContext.tourUrl)}\n`;
  }

  const whatsappUrl = getWhatsAppUrl(r.customerPhone);
  if (whatsappUrl) {
    msg += `\n💬 WhatsApp: ${whatsappUrl}\n`;
  }

  return msg;
}

export function formatBookingAbandonment(
  abandonment: BookingAbandonmentAlert
): string {
  const context = getBookingAbandonmentContext(abandonment.tourSlug);
  const cs = currencySymbol(abandonment.currency);

  let msg = `⚠️ <b>BOOKING ABANDONMENT</b>\n`;
  msg += `━━━━━━━━━━━━━━━━\n`;
  msg += `🌐 <b>Kaynak:</b> merrysails.com\n`;
  msg += `🛎️ <b>Tetik:</b> ${esc(
    getBookingAbandonmentTriggerLabel(abandonment.trigger)
  )}\n`;
  msg += `🕒 <b>Zaman:</b> ${esc(formatDateTime(abandonment.occurredAt))}\n`;
  msg += `🧭 <b>Sayfa:</b> ${esc(context.pageLabel)}\n`;
  msg += `🎯 <b>Akış:</b> ${esc(context.bookingLabel)}\n`;

  msg += `\n👤 <b>${esc(abandonment.customerName || "Unknown visitor")}</b>\n`;
  msg += `📱 <b>Tel:</b> ${esc(abandonment.customerPhone)}\n`;
  msg += `📧 <b>Email:</b> ${esc(abandonment.customerEmail)}\n`;
  if (abandonment.fieldsCompleted.length > 0) {
    msg += `🧩 <b>Dolu alanlar:</b> ${esc(
      abandonment.fieldsCompleted.join(", ")
    )}\n`;
  }

  msg += `\n⛵ <b>Tur:</b> ${esc(abandonment.tourName)}\n`;
  msg += `📅 <b>Tarih:</b> ${esc(abandonment.date)}\n`;
  msg += `🕐 <b>Saat:</b> ${esc(abandonment.time || "-")}\n`;
  msg += `👥 <b>Misafir:</b> ${esc(abandonment.guests)}\n`;
  msg += `💰 <b>Gosterilen toplam:</b> ${esc(abandonment.totalPrice)} ${cs}\n`;
  if (abandonment.packageName) {
    msg += `📦 <b>Paket:</b> ${esc(abandonment.packageName)}\n`;
  }
  if (abandonment.addOns.length > 0) {
    msg += `➕ <b>Ekstralar:</b> ${esc(abandonment.addOns.join(", "))}\n`;
  }
  if (abandonment.additionalGuests.length > 0) {
    msg += `🧑‍🤝‍🧑 <b>Diger misafirler:</b> ${esc(
      abandonment.additionalGuests.join(", ")
    )}\n`;
  }
  if (abandonment.departurePoint) {
    msg += `📍 <b>Kalkis:</b> ${esc(abandonment.departurePoint)}\n`;
  }
  if (abandonment.privateTransferRequested) {
    msg += `🚗 <b>Transfer:</b> Private transfer istendi\n`;
  }
  if (abandonment.customerMessage) {
    msg += `\n📝 <b>Mesaj:</b> ${esc(abandonment.customerMessage)}\n`;
  }

  if (abandonment.pageUrl) {
    msg += `\n🔗 <b>Kaynak URL:</b> ${esc(abandonment.pageUrl)}\n`;
  }
  msg += `🌐 <b>Tur Sayfasi:</b> ${esc(context.tourUrl)}\n`;
  if (context.supportGuideUrl) {
    msg += `📍 <b>Meeting Rehberi:</b> ${esc(context.supportGuideUrl)}\n`;
  }

  const whatsappUrl = getWhatsAppUrl(abandonment.customerPhone);
  if (whatsappUrl) {
    msg += `\n💬 WhatsApp: ${whatsappUrl}`;
  }

  return msg;
}

// ─── Status change notification ───────────────────────────
export function formatStatusChange(r: SailsReservation, oldStatus: string, newStatus: string): string {
  const linkContext = getReservationLinkContext(r.tourSlug, r.reservationId);

  let msg = `🔄 <b>DURUM DEĞİŞİKLİĞİ</b>\n━━━━━━━━━━━━━━━━\n`;
  msg += `📋 <b>${esc(r.reservationId)}</b> — ${esc(r.customerName)}\n\n`;
  msg += `${statusEmoji(oldStatus)} ${statusText(oldStatus)} → ${statusEmoji(newStatus)} <b>${statusText(newStatus)}</b>\n`;
  msg += `🧭 ${esc(linkContext.pageLabel)} · ${esc(linkContext.bookingLabel)}\n`;
  msg += `⛵ ${esc(r.tourName)}\n`;
  msg += `📅 ${formatDate(r.date)} | 🕐 ${esc(r.time)}\n`;
  msg += `⏳ ${esc(getDepartureLabel(r.date))}\n`;
  return msg;
}

// ─── Reminder notification ────────────────────────────────
export function formatReminder(r: SailsReservation): string {
  const linkContext = getReservationLinkContext(r.tourSlug, r.reservationId);
  const meta = parseReservationNotes(r.notes);
  const supportGuideUrl = getExperienceSupportPageUrl(r.tourSlug);

  let msg = `⏰ <b>HATIRLATMA — 2 Saat Kaldı!</b>\n━━━━━━━━━━━━━━━━\n`;
  msg += `📋 <b>${esc(r.reservationId)}</b> — ${esc(r.customerName)}\n\n`;
  msg += `⛵ ${esc(r.tourName)}\n`;
  msg += `🕐 <b>Saat:</b> ${esc(r.time)}\n`;
  msg += `📱 ${esc(r.customerPhone)}\n`;
  msg += `👥 ${r.guests} kişi\n`;
  if (meta.packageName) msg += `📦 ${esc(meta.packageName)}\n`;
  if (meta.privateTransferRequested) {
    msg += `🚗 Private transfer istendi — ekip final pickup plani icin misafirle iletisime gececek\n`;
  }
  msg += `🧾 ${esc(linkContext.invoiceUrl)}\n`;
  msg += `🎟️ ${esc(linkContext.voucherUrl)}\n`;
  if (supportGuideUrl) msg += `📍 ${esc(supportGuideUrl)}\n`;
  return msg;
}

// ─── Compact today list ───────────────────────────────────
export function formatCompactToday(reservations: SailsReservation[]): string {
  const today = formatTodayFull();
  const total = reservations.length;
  const revenue = reservations.reduce((s, r) => s + (r.totalPrice || 0), 0);

  let msg = `📅 <b>BUGÜN — ${today}</b>\n━━━━━━━━━━━━━━━━\n`;
  msg += `${total} tur`;
  if (revenue > 0) msg += ` | 💰 ${revenue.toLocaleString("tr-TR")} €`;
  msg += `\n\n`;

  if (total === 0) return msg + `Bugün tur yok 🎉`;

  for (const r of reservations.slice(0, 50)) msg += formatCompactLine(r) + "\n";
  if (total > 50) msg += `\n... ve ${total - 50} tur daha\n`;
  msg += `\n👇 <i>Detay için dokunun</i>`;
  return msg;
}

// ─── Compact tomorrow list ────────────────────────────────
export function formatCompactTomorrow(reservations: SailsReservation[]): string {
  const tomorrow = formatTomorrowFull();
  const total = reservations.length;
  const revenue = reservations.reduce((s, r) => s + (r.totalPrice || 0), 0);

  let msg = `📅 <b>YARIN — ${tomorrow}</b>\n━━━━━━━━━━━━━━━━\n`;
  msg += `${total} tur`;
  if (revenue > 0) msg += ` | 💰 ${revenue.toLocaleString("tr-TR")} €`;
  msg += `\n\n`;

  if (total === 0) return msg + `Yarın tur yok 👍`;

  for (const r of reservations.slice(0, 50)) msg += formatCompactLine(r) + "\n";
  if (total > 50) msg += `\n... ve ${total - 50} tur daha\n`;
  msg += `\n👇 <i>Detay için dokunun</i>`;
  return msg;
}

// ─── Compact weekly list grouped by day ───────────────────
export function formatCompactWeek(reservations: SailsReservation[]): string {
  const total = reservations.length;
  const revenue = reservations.reduce((s, r) => s + (r.totalPrice || 0), 0);

  let msg = `📅 <b>BU HAFTA — ${total} Tur</b>\n━━━━━━━━━━━━━━━━\n`;
  if (revenue > 0) msg += `💰 ${revenue.toLocaleString("tr-TR")} €\n`;
  msg += `\n`;

  if (total === 0) return msg + `Bu hafta tur yok 👍`;

  const groups = new Map<string, SailsReservation[]>();
  for (const r of reservations) {
    const key = new Date(r.date).toISOString().split("T")[0];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }

  let shown = 0;
  for (const [dateKey, dayRes] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const d = new Date(dateKey + "T12:00:00Z");
    const dayLabel = d.toLocaleDateString("tr-TR", { timeZone: TZ, weekday: "long", day: "2-digit", month: "2-digit" });
    msg += `▸ <b>${dayLabel}</b> (${dayRes.length})\n`;
    for (const r of dayRes) {
      if (shown >= 50) break;
      msg += `  ${formatCompactLine(r)}\n`;
      shown++;
    }
    msg += `\n`;
  }

  if (total > 50) msg += `... ve ${total - 50} tur daha\n\n`;
  msg += `👇 <i>Detay için dokunun</i>`;
  return msg;
}

// ─── Morning briefing (for cron) ──────────────────────────
export function formatMorningBriefing(reservations: SailsReservation[]): string {
  const today = formatTodayFull();
  const total = reservations.length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const pending = reservations.filter((r) => normalizeReservationStatus(r.status) === "new").length;
  const revenue = reservations.reduce((s, r) => s + (r.totalPrice || 0), 0);

  let msg = `☀️ <b>GÜNAYDIN — ${today}</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `📊 <b>Özet:</b>\n`;
  msg += `   📋 Toplam: <b>${total}</b> tur\n`;
  msg += `   ✅ Onaylı: <b>${confirmed}</b>\n`;
  msg += `   🆕 Bekleyen: <b>${pending}</b>\n`;
  msg += `   💰 Günlük: <b>${revenue.toLocaleString("tr-TR")} €</b>\n\n`;

  if (total === 0) return msg + `Bugün tur yok, rahat bir gün! 🎉`;

  msg += `${progressBar(confirmed, total)} ${confirmed}/${total}\n\n`;
  for (const r of reservations) msg += formatCompactLine(r) + "\n";
  return msg;
}

// ─── Evening summary (for cron) ───────────────────────────
export function formatEveningSummary(reservations: SailsReservation[]): string {
  const tomorrow = formatTomorrowFull();
  const total = reservations.length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const pending = reservations.filter((r) => normalizeReservationStatus(r.status) === "new").length;
  const revenue = reservations.reduce((s, r) => s + (r.totalPrice || 0), 0);

  let msg = `🌙 <b>AKŞAM BRİFİNG — Yarın: ${tomorrow}</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `📊 <b>Özet:</b>\n`;
  msg += `   📋 Toplam: <b>${total}</b> tur\n`;
  msg += `   ✅ Onaylı: <b>${confirmed}</b>\n`;
  msg += `   🆕 Bekleyen: <b>${pending}</b>\n`;
  msg += `   💰 Tahmini: <b>${revenue.toLocaleString("tr-TR")} €</b>\n\n`;

  if (total === 0) return msg + `Yarın tur yok 👍`;

  msg += `${progressBar(confirmed, total)} ${confirmed}/${total}\n\n`;
  for (const r of reservations) msg += formatCompactLine(r) + "\n";
  return msg;
}

// ─── Daily end-of-day stats ───────────────────────────────
export function formatDailyStats(stats: {
  total: number; completed: number; cancelled: number; newCount: number;
  revenue: number; currency: string;
  topTours?: { tour: string; count: number }[];
  botVisits?: { provider: string; count: number }[];
  gsc?: { clicks: number; impressions: number; ctr: number; position: number; date: string } | null;
  ads?: {
    totalSpendTl: number;
    budgetTl: number;
    totalClicks: number;
    totalConversions: number;
    campaigns: { name: string; spendTl: number; clicks: number; conversions: number }[];
  } | null;
}): string {
  const today = new Date().toLocaleDateString("tr-TR", { timeZone: TZ, day: "2-digit", month: "long" });
  const rate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  let msg = `📊 <b>GÜN SONU RAPOR — ${today}</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `📋 Toplam: <b>${stats.total}</b>\n`;
  msg += `✅ Tamamlanan: <b>${stats.completed}</b> (${rate}%)\n`;
  msg += `❌ İptal: <b>${stats.cancelled}</b>\n`;
  msg += `🆕 Yeni Gelen: <b>${stats.newCount}</b>\n\n`;
  msg += `${progressBar(stats.completed, stats.total)} ${rate}%\n\n`;
  msg += `💰 Günlük Ciro: <b>${stats.revenue.toLocaleString("tr-TR")} ${stats.currency}</b>\n`;

  if (stats.topTours && stats.topTours.length > 0) {
    msg += `\n⛵ <b>En Çok Tur:</b>\n`;
    for (const t of stats.topTours.slice(0, 3)) msg += `   ${esc(t.tour)} — ${t.count}x\n`;
  }

  if (stats.ads) {
    const a = stats.ads;
    const pct = a.budgetTl > 0 ? Math.round((a.totalSpendTl / a.budgetTl) * 100) : 0;
    msg += `\n🎯 <b>Google Ads — Bugün:</b>\n`;
    msg += `   Harcama: <b>${a.totalSpendTl.toFixed(0)}₺</b> / ${a.budgetTl}₺ (${pct}%)\n`;
    msg += `   Tıklama: <b>${a.totalClicks}</b> | Dönüşüm: <b>${a.totalConversions.toFixed(1)}</b>\n`;
    if (a.totalClicks > 0) {
      const cpc = a.totalSpendTl / a.totalClicks;
      msg += `   Ort. CPC: <b>${cpc.toFixed(0)}₺</b>\n`;
    }
    for (const c of a.campaigns) {
      if (c.spendTl > 0) {
        const label = c.name.includes("Dinner") ? "🍽️ Dinner" : c.name.includes("Sunset") ? "🌅 Sunset" : c.name.includes("Yacht") ? "⛵ Yacht" : "🔵 Generic";
        msg += `   ${label}: ${c.spendTl.toFixed(0)}₺ / ${c.clicks}t / ${c.conversions.toFixed(1)}d\n`;
      }
    }
  }

  if (stats.gsc) {
    const g = stats.gsc;
    msg += `\n🔍 <b>SEO — GSC (${g.date}):</b>\n`;
    msg += `   Tıklama: <b>${g.clicks}</b> | Gösterim: <b>${g.impressions}</b>\n`;
    msg += `   CTR: <b>${(g.ctr * 100).toFixed(1)}%</b> | Ort. Sıra: <b>${g.position.toFixed(1)}</b>\n`;
  }

  if (stats.botVisits && stats.botVisits.length > 0) {
    const totalBots = stats.botVisits.reduce((s, b) => s + b.count, 0);
    msg += `\n🤖 <b>AI Crawler — ${totalBots} ziyaret:</b>\n`;
    for (const b of stats.botVisits.slice(0, 5)) msg += `   ${esc(b.provider)} — ${b.count}x\n`;
  }

  return msg;
}

// ─── Statistics detail ────────────────────────────────────
export function formatStatisticsDetail(
  periodLabel: string,
  stats: { total: number; completed: number; cancelled: number; pending: number; revenue: number; currency: string; avgPrice: number; topTours: { tour: string; count: number; revenue: number }[] }
): string {
  const rate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  let msg = `📊 <b>${periodLabel} İstatistik</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `📋 Toplam: <b>${stats.total}</b>\n`;
  msg += `✅ Tamamlanan: <b>${stats.completed}</b>\n`;
  msg += `🆕 Bekleyen: <b>${stats.pending}</b>\n`;
  msg += `❌ İptal: <b>${stats.cancelled}</b>\n\n`;
  msg += `${progressBar(stats.completed, stats.total)} ${rate}%\n\n`;
  msg += `💰 Ciro: <b>${stats.revenue.toLocaleString("tr-TR")} ${stats.currency}</b>\n`;
  if (stats.total > 0) msg += `💵 Ort. Fiyat: <b>${stats.avgPrice.toLocaleString("tr-TR")} ${stats.currency}</b>\n`;

  if (stats.topTours.length > 0) {
    msg += `\n⛵ <b>En Çok Tur:</b>\n`;
    for (const t of stats.topTours.slice(0, 5)) msg += `   ${esc(t.tour)} — ${t.count}x | ${t.revenue.toLocaleString("tr-TR")} €\n`;
  }
  return msg;
}

// ─── Search results ───────────────────────────────────────
export function formatCompactSearch(query: string, results: SailsReservation[]): string {
  let msg = `🔍 <b>Arama: "${esc(query)}"</b>\n━━━━━━━━━━━━━━━━\n`;
  if (results.length === 0) return msg + `\nSonuç bulunamadı.\n\n💡 <i>İsim, email, telefon veya rezervasyon ID ile arayabilirsiniz.</i>`;
  msg += `<b>${results.length}</b> sonuç:\n\n`;
  for (const r of results.slice(0, 15)) msg += `${formatCompactLine(r)} 📅${formatDateShort(r.date)}\n`;
  if (results.length > 15) msg += `\n... ve ${results.length - 15} sonuç daha`;
  msg += `\n\n👇 <i>Detay için dokunun</i>`;
  return msg;
}

// ─── Notification settings ────────────────────────────────
export function formatNotificationSettings(s: { notifyNew: boolean; notifyDaily: boolean; notifyReminder: boolean }): string {
  const on = "✅", off = "❌";
  let msg = `⚙️ <b>Bildirim Ayarları</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `${s.notifyNew ? on : off} Yeni Rezervasyon\n`;
  msg += `${s.notifyReminder ? on : off} Hatırlatmalar\n`;
  msg += `${s.notifyDaily ? on : off} Günlük Raporlar\n\n`;
  msg += `💡 <i>Açmak/kapatmak için butonlara dokunun.</i>`;
  return msg;
}

// ─── Welcome message ──────────────────────────────────────
export function formatWelcome(firstName?: string): string {
  const name = firstName ? ` ${esc(firstName)}` : "";
  let msg = `👋 <b>Merhaba${name}!</b>\n\n`;
  msg += `⛵ <b>MerrySails Bot</b>'a hoş geldiniz.\n\n`;
  msg += `📋 <b>Rezervasyon Takibi</b>\nmerrysails.com üzerinden gelen tüm\nrezervasyonları anlık takip edin.\n\n`;
  msg += `✅ <b>Hızlı İşlem</b>\nTek tuşla onayla veya iptal et; tamamlandı için önce EUR maliyet gir.\n\n`;
  msg += `📊 <b>Günlük Raporlar</b>\nSabah brifing, akşam özet ve gün sonu\nraporu otomatik olarak gelir.\n\n`;
  msg += `Başlamak için aşağıdaki butonları kullanın\nveya /yardim yazın.`;
  return msg;
}

// ─── Help message ─────────────────────────────────────────
export function formatHelp(): string {
  let msg = `📖 <b>MerrySails Bot</b>\n━━━━━━━━━━━━━━━━\n\n`;
  msg += `📅 <b>Günlük Takip</b>\n├ /bugun — Bugünkü turlar\n├ /yarin — Yarınki turlar\n└ /hafta — Bu haftanın turları\n\n`;
  msg += `🔍 <b>Sorgulama</b>\n├ /bekleyen — Onay bekleyen turlar\n├ /durum [ID] — Rezervasyon detayı\n└ /ara [isim/tel] — Rezervasyon ara\n\n`;
  msg += `💶 <b>Maliyet</b>\n└ /maliyet [ID] [EUR] — Tamamlandı öncesi maliyet gir\n\n`;
  msg += `📊 <b>Raporlar</b>\n└ /istatistik — Dönemsel istatistikler\n\n`;
  msg += `⚙️ <b>Ayarlar</b>\n├ /bildirimler — Bildirim tercihleri\n└ /yardim — Bu mesajı göster\n\n`;
  msg += `🔔 <b>Otomatik Bildirimler</b>\n├ Yeni rezervasyon bildirimi\n├ 2 saat kala hatırlatma\n├ 08:00 Sabah brifing\n├ 18:30 Akşam özet\n└ 23:00 Gün sonu rapor`;
  return msg;
}
