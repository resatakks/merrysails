// Telegram Notification Sender — MerrySails
import { prisma } from "@/lib/db";
import { isInactiveChatError, sendMessage } from "./bot";
import {
  formatBookingAbandonment,
  formatNewReservation,
  formatReminder,
  formatStatusChange,
} from "./formatters";
import { reservationActions } from "./keyboards";
import { getWhatsAppUrl } from "./phone-links";
import type { BookingAbandonmentAlert, SailsReservation } from "./types";

interface GoogleAdsLeadNotification {
  id: string;
  campaignName?: string | null;
  product?: string | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  isTest?: boolean;
  createdAt?: string | Date;
}

function escapeHtml(value?: string | null) {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

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
  const results = await Promise.all(
    users.map(async (user: typeof users[number]) => {
      try {
        const response = await sendMessage({
          chat_id: user.chatId,
          text,
          reply_markup: replyMarkup,
        });

        if (response.ok) {
          return { status: "sent" as const };
        }

        if (isInactiveChatError(response)) {
          await prisma.telegramUser.update({
            where: { chatId: user.chatId },
            data: { isActive: false },
          });

          return {
            status: "deactivated" as const,
            chatId: user.chatId,
            reason: response.description ?? "inactive chat",
          };
        }

        return {
          status: "failed" as const,
          chatId: user.chatId,
          reason: response.description ?? "telegram api error",
        };
      } catch (error) {
        return {
          status: "failed" as const,
          chatId: user.chatId,
          reason: error instanceof Error ? error.message : "unknown error",
        };
      }
    })
  );

  const sent = results.filter((result) => result.status === "sent").length;
  const deactivated = results.filter((result) => result.status === "deactivated").length;
  const failed = results.filter((result) => result.status === "failed").length;

  console.log(
    `[MERRYSAILS-TELEGRAM] Broadcast: ${sent} sent, ${deactivated} deactivated, ${failed} failed (${notificationType})`
  );

  return { sent, deactivated, failed };
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

export async function notifyGoogleAdsLead(lead: GoogleAdsLeadNotification) {
  const whatsappUrl = getWhatsAppUrl(lead.phone);
  const createdAt = lead.createdAt ? new Date(lead.createdAt) : new Date();
  const rows = [
    "<b>New Google Ads Lead</b>",
    lead.isTest ? "<b>TEST LEAD</b>" : "",
    "",
    `<b>Product:</b> ${escapeHtml(lead.product || "MerrySails")}`,
    `<b>Name:</b> ${escapeHtml(lead.name || "Not provided")}`,
    `<b>Phone:</b> ${escapeHtml(lead.phone || "Not provided")}`,
    lead.email ? `<b>Email:</b> ${escapeHtml(lead.email)}` : "",
    `<b>Campaign:</b> ${escapeHtml(lead.campaignName || "Unknown")}`,
    `<b>Time:</b> ${escapeHtml(createdAt.toISOString())}`,
  ].filter(Boolean);

  const keyboard = whatsappUrl
    ? {
        inline_keyboard: [
          [
            { text: "WhatsApp", url: whatsappUrl },
          ],
        ],
      }
    : undefined;

  return broadcast("notifyNew", rows.join("\n"), keyboard);
}

export async function sendDailyReport(text: string) {
  return broadcast("notifyDaily", text);
}
