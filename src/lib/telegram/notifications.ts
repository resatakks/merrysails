// Telegram Notification Sender — MerrySails
import { prisma } from "@/lib/db";
import { sendMessage } from "./bot";
import {
  formatBookingAbandonment,
  formatNewReservation,
  formatReminder,
  formatStatusChange,
} from "./formatters";
import { reservationActions } from "./keyboards";
import type { BookingAbandonmentAlert, SailsReservation } from "./types";

async function getActiveUsers(notificationType: "notifyNew" | "notifyReminder" | "notifyDaily") {
  return prisma.telegramUser.findMany({
    where: { isActive: true, [notificationType]: true },
  });
}

async function broadcast(
  notificationType: "notifyNew" | "notifyReminder" | "notifyDaily",
  text: string,
  replyMarkup?: Parameters<typeof sendMessage>[0]["reply_markup"]
) {
  const users = await getActiveUsers(notificationType);
  const results = await Promise.allSettled(
    users.map((user: typeof users[number]) => sendMessage({ chat_id: user.chatId, text, reply_markup: replyMarkup }))
  );
  const sent = results.filter((r: PromiseSettledResult<unknown>) => r.status === "fulfilled").length;
  const failed = results.filter((r: PromiseSettledResult<unknown>) => r.status === "rejected").length;
  console.log(`[MERRYSAILS-TELEGRAM] Broadcast: ${sent} sent, ${failed} failed (${notificationType})`);
  return { sent, failed };
}

export async function notifyNewReservation(reservation: SailsReservation) {
  const text = formatNewReservation(reservation);
  const keyboard = reservationActions(reservation.id, {
    phone: reservation.customerPhone,
    reservationId: reservation.reservationId,
    tourSlug: reservation.tourSlug,
  });
  return broadcast("notifyNew", text, keyboard);
}

export async function notifyStatusChange(reservation: SailsReservation, oldStatus: string, newStatus: string) {
  const text = formatStatusChange(reservation, oldStatus, newStatus);
  return broadcast("notifyNew", text);
}

export async function notifyReminder(reservation: SailsReservation) {
  const text = formatReminder(reservation);
  return broadcast("notifyReminder", text);
}

export async function notifyBookingAbandonment(
  abandonment: BookingAbandonmentAlert
) {
  const text = formatBookingAbandonment(abandonment);
  return broadcast("notifyNew", text);
}

export async function sendDailyReport(text: string) {
  return broadcast("notifyDaily", text);
}
