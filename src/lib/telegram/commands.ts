// Telegram Bot Command Handlers — MerrySails
import { prisma } from "@/lib/db";
import { normalizeReservationStatus } from "@/lib/reservation-status";
import { sendMessage, editMessageText, answerCallbackQuery } from "./bot";
import {
  formatWelcome, formatHelp, formatReservationDetail, formatCompactToday,
  formatCompactTomorrow, formatCompactWeek, formatCompactSearch,
  formatNotificationSettings, formatStatisticsDetail,
} from "./formatters";
import {
  startQuickActions, reservationListButtons, reservationDetailActions,
  notificationSettings, statisticsPeriod, confirmAction,
} from "./keyboards";
import type { TelegramMessage, TelegramCallbackQuery, SailsReservation } from "./types";

// ─── Timezone helpers (Turkey UTC+3) ─────────────────────
function getTurkeyDate(date?: Date): Date {
  const d = date || new Date();
  return new Date(d.getTime() + 3 * 60 * 60 * 1000);
}

function getTodayRange(): { start: Date; end: Date } {
  const now = getTurkeyDate();
  return {
    start: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), -3, 0, 0)),
    end: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 20, 59, 59)),
  };
}

function getTomorrowRange(): { start: Date; end: Date } {
  const now = getTurkeyDate();
  return {
    start: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, -3, 0, 0)),
    end: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 20, 59, 59)),
  };
}

function getWeekRange(): { start: Date; end: Date } {
  const now = getTurkeyDate();
  const day = now.getUTCDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  return {
    start: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diffToMonday, -3, 0, 0)),
    end: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diffToMonday + 6, 20, 59, 59)),
  };
}

function getMonthRange(): { start: Date; end: Date } {
  const now = getTurkeyDate();
  return {
    start: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, -3, 0, 0)),
    end: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 20, 59, 59)),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRes(r: any): SailsReservation {
  return { ...r, totalPrice: Number(r.totalPrice) };
}

// ─── Command handlers ─────────────────────────────────────

export async function handleStart(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const user = message.from;

  await prisma.telegramUser.upsert({
    where: { chatId },
    update: { username: user?.username || null, firstName: user?.first_name || null, isActive: true },
    create: { chatId, username: user?.username || null, firstName: user?.first_name || null, isActive: true },
  });

  await sendMessage({ chat_id: chatId, text: formatWelcome(user?.first_name), reply_markup: startQuickActions() });
}

export async function handleBugun(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const { start, end } = getTodayRange();
  const reservations = await prisma.reservation.findMany({
    where: { date: { gte: start, lte: end }, status: { not: "cancelled" } },
    orderBy: { date: "asc" },
  });
  const mapped = reservations.map(mapRes);
  await sendMessage({
    chat_id: chatId,
    text: formatCompactToday(mapped),
    reply_markup: mapped.length > 0 ? reservationListButtons(mapped) : undefined,
  });
}

export async function handleYarin(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const { start, end } = getTomorrowRange();
  const reservations = await prisma.reservation.findMany({
    where: { date: { gte: start, lte: end }, status: { not: "cancelled" } },
    orderBy: { date: "asc" },
  });
  const mapped = reservations.map(mapRes);
  await sendMessage({
    chat_id: chatId,
    text: formatCompactTomorrow(mapped),
    reply_markup: mapped.length > 0 ? reservationListButtons(mapped) : undefined,
  });
}

export async function handleHafta(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const { start, end } = getWeekRange();
  const reservations = await prisma.reservation.findMany({
    where: { date: { gte: start, lte: end }, status: { not: "cancelled" } },
    orderBy: { date: "asc" },
  });
  const mapped = reservations.map(mapRes);
  await sendMessage({
    chat_id: chatId,
    text: formatCompactWeek(mapped),
    reply_markup: mapped.length > 0 ? reservationListButtons(mapped) : undefined,
  });
}

export async function handleBekleyen(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const reservations = await prisma.reservation.findMany({
    where: { status: { in: ["new", "pending"] } },
    orderBy: { date: "asc" },
    take: 30,
  });
  const mapped = reservations.map(mapRes);
  if (mapped.length === 0) {
    await sendMessage({ chat_id: chatId, text: "✅ Bekleyen rezervasyon yok!" });
    return;
  }
  let text = `🆕 <b>BEKLEYENLER — ${mapped.length} Tur</b>\n━━━━━━━━━━━━━━━━\n\n`;
  for (const r of mapped) {
    const ds = new Date(r.date).toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul", day: "2-digit", month: "2-digit" });
    text += `🆕 <b>${r.time}</b> ${r.customerName.split(" ")[0]} — ${r.tourName} 📅${ds}\n`;
  }
  text += `\n👇 <i>Detay için dokunun</i>`;
  await sendMessage({ chat_id: chatId, text, reply_markup: reservationListButtons(mapped) });
}

export async function handleDurum(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const parts = (message.text || "").split(" ");
  if (parts.length < 2) {
    await sendMessage({ chat_id: chatId, text: "Kullanım: /durum [ID]\nÖrnek: /durum MRY-2026-0001" });
    return;
  }
  const query = parts.slice(1).join(" ").trim();

  // Try by reservationId first, then by cuid
  const reservation = await prisma.reservation.findFirst({
    where: {
      OR: [
        { reservationId: { equals: query, mode: "insensitive" } },
        { id: query },
      ],
    },
  });

  if (!reservation) {
    await sendMessage({ chat_id: chatId, text: `Rezervasyon "${query}" bulunamadı.` });
    return;
  }
  const r = mapRes(reservation);
  await sendMessage({
    chat_id: chatId,
    text: formatReservationDetail(r),
    reply_markup: reservationDetailActions(r.id, {
      phone: r.customerPhone,
      reservationId: r.reservationId,
      tourSlug: r.tourSlug,
    }),
  });
}

export async function handleMaliyet(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const parts = (message.text || "").trim().split(/\s+/);

  if (parts.length < 3) {
    await sendMessage({
      chat_id: chatId,
      text:
        "Kullanım: /maliyet [ID] [EUR]\nÖrnek: /maliyet MRY-2026-0001 80\n\nTamamlandı yapmadan önce maliyeti Euro cinsinden girmeniz gerekir.",
    });
    return;
  }

  const query = parts[1].trim();
  const cost = Number.parseFloat(parts[2].replace(",", "."));

  if (!Number.isFinite(cost) || cost < 0) {
    await sendMessage({
      chat_id: chatId,
      text: "Maliyet Euro cinsinden 0 veya daha büyük bir sayı olmalı. Örnek: /maliyet MRY-2026-0001 80",
    });
    return;
  }

  const reservation = await prisma.reservation.findFirst({
    where: {
      OR: [
        { reservationId: { equals: query, mode: "insensitive" } },
        { id: query },
      ],
    },
  });

  if (!reservation) {
    await sendMessage({ chat_id: chatId, text: `Rezervasyon "${query}" bulunamadı.` });
    return;
  }

  const updated = await prisma.reservation.update({
    where: { id: reservation.id },
    data: { internalCostEur: Math.round(cost * 100) / 100 },
  });
  const r = mapRes(updated);

  await sendMessage({
    chat_id: chatId,
    text: `💶 <b>Maliyet kaydedildi:</b> ${r.internalCostEur} EUR\n\n${formatReservationDetail(r)}`,
    reply_markup: reservationDetailActions(r.id, {
      phone: r.customerPhone,
      reservationId: r.reservationId,
      tourSlug: r.tourSlug,
    }),
  });
}

export async function handleAra(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const query = (message.text || "").replace("/ara", "").trim();
  if (!query) {
    await sendMessage({ chat_id: chatId, text: "Kullanım: /ara [isim, telefon, email veya rez ID]\nÖrnek: /ara John" });
    return;
  }
  const reservations = await prisma.reservation.findMany({
    where: {
      OR: [
        { customerName: { contains: query, mode: "insensitive" } },
        { customerEmail: { contains: query, mode: "insensitive" } },
        { customerPhone: { contains: query } },
        { reservationId: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { date: "desc" },
    take: 15,
  });
  const mapped = reservations.map(mapRes);
  await sendMessage({
    chat_id: chatId,
    text: formatCompactSearch(query, mapped),
    reply_markup: mapped.length > 0 ? reservationListButtons(mapped) : undefined,
  });
}

export async function handleIstatistik(message: TelegramMessage) {
  await sendMessage({
    chat_id: String(message.chat.id),
    text: "📊 Hangi dönem için istatistik görmek istersiniz?",
    reply_markup: statisticsPeriod(),
  });
}

export async function handleBildirimler(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const user = await prisma.telegramUser.findUnique({ where: { chatId } });
  if (!user) { await sendMessage({ chat_id: chatId, text: "Önce /start ile kayıt olun." }); return; }
  await sendMessage({
    chat_id: chatId,
    text: formatNotificationSettings(user),
    reply_markup: notificationSettings(user),
  });
}

// ─── Stats helper ─────────────────────────────────────────
async function computeStats(start: Date, end: Date) {
  const reservations = await prisma.reservation.findMany({
    where: { date: { gte: start, lte: end } },
    select: { status: true, totalPrice: true, tourName: true },
  });
  type StatsRow = typeof reservations[number];
  const active = reservations.filter((r: StatsRow) => r.status !== "cancelled");
  const revenue = active.reduce((s: number, r: StatsRow) => s + (r.totalPrice || 0), 0);

  const tourCounts: Record<string, { count: number; revenue: number }> = {};
  for (const r of active) {
    const tour = r.tourName;
    if (!tourCounts[tour]) tourCounts[tour] = { count: 0, revenue: 0 };
    tourCounts[tour].count++;
    tourCounts[tour].revenue += r.totalPrice || 0;
  }
  const topTours = Object.entries(tourCounts).map(([tour, d]) => ({ tour, ...d })).sort((a, b) => b.count - a.count);

  return {
    total: reservations.length,
    completed: reservations.filter((r: StatsRow) => r.status === "completed").length,
    cancelled: reservations.filter((r: StatsRow) => r.status === "cancelled").length,
    pending: reservations.filter((r: StatsRow) => normalizeReservationStatus(r.status) === "new").length,
    revenue,
    currency: "€",
    avgPrice: active.length > 0 ? Math.round(revenue / active.length) : 0,
    topTours,
  };
}

// ─── Callback query handler ──────────────────────────────
export async function handleCallbackQuery(callback: TelegramCallbackQuery) {
  const chatId = String(callback.message?.chat.id);
  const messageId = callback.message?.message_id;
  const data = callback.data || "";

  // Quick command callbacks
  if (data.startsWith("cmd_")) {
    const cmd = data.replace("cmd_", "");
    await answerCallbackQuery(callback.id);
    const fake: TelegramMessage = {
      message_id: callback.message?.message_id || 0,
      chat: callback.message?.chat || { id: parseInt(chatId), type: "private" },
      from: callback.from,
      date: Math.floor(Date.now() / 1000),
      text: `/${cmd}`,
    };
    switch (cmd) {
      case "bugun": return handleBugun(fake);
      case "yarin": return handleYarin(fake);
      case "bekleyen": return handleBekleyen(fake);
      case "istatistik": return handleIstatistik(fake);
      case "bildirimler": return handleBildirimler(fake);
      case "yardim": return sendMessage({ chat_id: chatId, text: formatHelp() });
    }
    return;
  }

  // Show detail as NEW message
  if (data.startsWith("show_")) {
    const id = data.replace("show_", "");
    const reservation = await prisma.reservation.findUnique({ where: { id } });
    if (!reservation) { await answerCallbackQuery(callback.id, "Bulunamadı", true); return; }
    const r = mapRes(reservation);
    await sendMessage({
      chat_id: chatId,
      text: formatReservationDetail(r),
      reply_markup: reservationDetailActions(r.id, {
        phone: r.customerPhone,
        reservationId: r.reservationId,
        tourSlug: r.tourSlug,
      }),
    });
    await answerCallbackQuery(callback.id);
    return;
  }

  if (data === "dismiss") {
    await answerCallbackQuery(callback.id, "İptal edildi");
    if (messageId) await editMessageText(chatId, messageId, "↩️ İşlem iptal edildi.");
    return;
  }

  if (data.startsWith("detail_")) {
    const id = data.replace("detail_", "");
    const reservation = await prisma.reservation.findUnique({ where: { id } });
    if (!reservation) { await answerCallbackQuery(callback.id, "Bulunamadı", true); return; }
    const r = mapRes(reservation);
    if (messageId) {
      await editMessageText(
        chatId,
        messageId,
        formatReservationDetail(r),
        reservationDetailActions(r.id, {
          phone: r.customerPhone,
          reservationId: r.reservationId,
          tourSlug: r.tourSlug,
        })
      );
    }
    await answerCallbackQuery(callback.id);
    return;
  }

  if (data.startsWith("approve_")) {
    const id = data.replace("approve_", "");
    const old = await prisma.reservation.findUnique({ where: { id } });
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: "confirmed", confirmedAt: old?.confirmedAt ?? new Date() },
    });
    await answerCallbackQuery(callback.id, "✅ Onaylandı!");
    if (messageId) {
      const r = mapRes(reservation);
      await editMessageText(
        chatId,
        messageId,
        formatReservationDetail(r),
        reservationDetailActions(r.id, {
          phone: r.customerPhone,
          reservationId: r.reservationId,
          tourSlug: r.tourSlug,
        })
      );
    }
    // Notify other admins
    try {
      const { notifyStatusChange } = await import("./notifications");
      await notifyStatusChange(mapRes(reservation), old?.status || "new", "confirmed");
    } catch { /* silent */ }
    return;
  }

  if (data.startsWith("cancel_") && !data.startsWith("cancel_confirm_")) {
    const id = data.replace("cancel_", "");
    await answerCallbackQuery(callback.id);
    if (messageId) await editMessageText(chatId, messageId, `⚠️ Rezervasyon iptal edilecek. Emin misiniz?`, confirmAction("cancel", id));
    return;
  }

  if (data.startsWith("confirm_cancel_")) {
    const id = data.replace("confirm_cancel_", "");
    const old = await prisma.reservation.findUnique({ where: { id } });
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: "cancelled", completedAt: null },
    });
    await answerCallbackQuery(callback.id, "❌ İptal edildi");
    if (messageId) {
      const r = mapRes(reservation);
      await editMessageText(
        chatId,
        messageId,
        formatReservationDetail(r),
        reservationDetailActions(r.id, {
          phone: r.customerPhone,
          reservationId: r.reservationId,
          tourSlug: r.tourSlug,
        })
      );
    }
    // Notify other admins
    try {
      const { notifyStatusChange } = await import("./notifications");
      await notifyStatusChange(mapRes(reservation), old?.status || "new", "cancelled");
    } catch { /* silent */ }
    return;
  }

  if (data.startsWith("complete_")) {
    const id = data.replace("complete_", "");
    const old = await prisma.reservation.findUnique({ where: { id } });

    if (!old) {
      await answerCallbackQuery(callback.id, "Bulunamadı", true);
      return;
    }

    if (typeof old.internalCostEur !== "number") {
      await answerCallbackQuery(
        callback.id,
        "Önce EUR maliyet girin. Örnek: /maliyet MRY-2026-0001 80",
        true
      );
      await sendMessage({
        chat_id: chatId,
        text: `💶 <b>${old.reservationId}</b> tamamlanmadan önce maliyet gerekli.\n\nEuro cinsinden yazın:\n<code>/maliyet ${old.reservationId} 80</code>`,
      });
      return;
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: "completed", completedAt: new Date() },
    });
    await answerCallbackQuery(callback.id, "🏁 Tamamlandı!");
    if (messageId) {
      const r = mapRes(reservation);
      await editMessageText(
        chatId,
        messageId,
        formatReservationDetail(r),
        reservationDetailActions(r.id, {
          phone: r.customerPhone,
          reservationId: r.reservationId,
          tourSlug: r.tourSlug,
        })
      );
    }
    // Notify other admins
    try {
      const { notifyStatusChange } = await import("./notifications");
      await notifyStatusChange(mapRes(reservation), old?.status || "new", "completed");
    } catch { /* silent */ }
    return;
  }

  // Notification toggles
  if (data.startsWith("toggle_")) {
    const field = data.replace("toggle_", "") as "notifyNew" | "notifyReminder" | "notifyDaily";
    const user = await prisma.telegramUser.findUnique({ where: { chatId } });
    if (!user) { await answerCallbackQuery(callback.id, "Kullanıcı bulunamadı", true); return; }
    const updated = await prisma.telegramUser.update({ where: { chatId }, data: { [field]: !user[field] } });
    await answerCallbackQuery(callback.id, `${!user[field] ? "✅ Açıldı" : "❌ Kapatıldı"}`);
    if (messageId) await editMessageText(chatId, messageId, formatNotificationSettings(updated), notificationSettings(updated));
    return;
  }

  // Statistics
  if (data.startsWith("stats_")) {
    const period = data.replace("stats_", "");
    let start: Date, end: Date, label: string;
    if (period === "today") { ({ start, end } = getTodayRange()); label = "Bugün"; }
    else if (period === "week") { ({ start, end } = getWeekRange()); label = "Bu Hafta"; }
    else { ({ start, end } = getMonthRange()); label = "Bu Ay"; }
    const stats = await computeStats(start, end);
    await answerCallbackQuery(callback.id);
    if (messageId) await editMessageText(chatId, messageId, formatStatisticsDetail(label, stats), statisticsPeriod());
    return;
  }

  await answerCallbackQuery(callback.id, "Bilinmeyen işlem");
}

// ─── Command router ───────────────────────────────────────
export async function handleCommand(message: TelegramMessage) {
  const text = message.text || "";
  const command = text.split(" ")[0].split("@")[0].toLowerCase();
  switch (command) {
    case "/start": return handleStart(message);
    case "/bugun": return handleBugun(message);
    case "/yarin": return handleYarin(message);
    case "/hafta": return handleHafta(message);
    case "/bekleyen": return handleBekleyen(message);
    case "/durum": return handleDurum(message);
    case "/maliyet": return handleMaliyet(message);
    case "/ara": return handleAra(message);
    case "/istatistik": return handleIstatistik(message);
    case "/bildirimler": return handleBildirimler(message);
    case "/yardim": case "/help":
      return sendMessage({ chat_id: String(message.chat.id), text: formatHelp() });
    default:
      if (text.startsWith("/")) await sendMessage({ chat_id: String(message.chat.id), text: "Bilinmeyen komut. /yardim yazın." });
  }
}
