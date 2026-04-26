import { after, NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  getNotificationInbox,
  getReservationCcRecipients,
  isEmailConfigured,
  sendEmail,
} from "@/lib/email";
import { reservationReminderEmail } from "@/lib/email-templates/reservation-reminder";
import { getTourBySlug } from "@/data/tours";
import { notifyReminder } from "@/lib/telegram/notifications";
import { format } from "date-fns";
import { parseReservationNotes } from "@/lib/reservation-meta";
import { isReservationReminderDue } from "@/lib/booking-cutoffs";
import type { SailsReservation } from "@/lib/telegram/types";

interface ReminderBatchSummary {
  telegramSent: number;
  telegramDeactivated: number;
  telegramFailed: number;
  emailSent: number;
  emailFailed: number;
}

async function processReminderBatch(
  reservations: SailsReservation[],
  reservationCcRecipients: string[]
): Promise<ReminderBatchSummary> {
  const summary: ReminderBatchSummary = {
    telegramSent: 0,
    telegramDeactivated: 0,
    telegramFailed: 0,
    emailSent: 0,
    emailFailed: 0,
  };

  for (const reservation of reservations) {
    try {
      const result = await notifyReminder(reservation);
      summary.telegramSent += result.sent;
      summary.telegramDeactivated += result.deactivated;
      summary.telegramFailed += result.failed;
    } catch (telegramError) {
      summary.telegramFailed++;
      console.error("[MERRYSAILS-REMINDER] Telegram reminder failed:", telegramError);
    }

    if (isEmailConfigured() && reservation.customerEmail) {
      try {
        const tour = getTourBySlug(reservation.tourSlug);
        const reservationMeta = parseReservationNotes(reservation.notes);

        await sendEmail({
          to: reservation.customerEmail,
          cc: reservationCcRecipients,
          subject: `Reminder: ${reservation.tourName} starts soon | ${reservation.reservationId} | MerrySails`,
          html: reservationReminderEmail({
            reservationId: reservation.reservationId,
            customerName: reservation.customerName,
            tourName: reservation.tourName,
            tourSlug: reservation.tourSlug,
            date: format(new Date(reservation.date), "MMMM d, yyyy"),
            time: reservation.time,
            guests: reservation.guests,
            departurePoint: tour?.departurePoint,
            packageName: reservationMeta.packageName,
            addOns: reservationMeta.addOns,
            privateTransferRequested: reservationMeta.privateTransferRequested,
          }),
        });

        summary.emailSent++;
      } catch (emailError) {
        summary.emailFailed++;
        console.error("[MERRYSAILS-REMINDER] Reminder email failed:", emailError);
      }
    }
  }

  return summary;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const reservationSearchStart = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const reservationSearchEnd = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const reservations = await prisma.reservation.findMany({
      where: {
        date: { gte: reservationSearchStart, lte: reservationSearchEnd },
        status: { notIn: ["cancelled", "completed"] },
      },
    });

    const toRemind = reservations.filter((r: typeof reservations[number]) => {
      return isReservationReminderDue(r.tourSlug, new Date(r.date), r.time, now, 30);
    });

    const notificationInbox = getNotificationInbox();
    const reservationCcRecipients = getReservationCcRecipients(notificationInbox);

    if (toRemind.length > 0) {
      const reminderPayload = toRemind.map((reservation: typeof toRemind[number]) => ({
        ...reservation,
        totalPrice: Number(reservation.totalPrice),
      }));

      after(async () => {
        const summary = await processReminderBatch(
          reminderPayload,
          reservationCcRecipients
        );
        console.log("[MERRYSAILS-REMINDER] Background reminder batch:", {
          reminders: reminderPayload.length,
          ...summary,
        });
      });
    }

    return NextResponse.json({
      success: true,
      checked: reservations.length,
      remindersQueued: toRemind.length,
    });
  } catch (error) {
    console.error("[MERRYSAILS-REMINDER] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
