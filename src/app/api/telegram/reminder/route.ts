import { NextRequest, NextResponse } from "next/server";
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

    let telegramSent = 0;
    let emailSent = 0;
    const notificationInbox = getNotificationInbox();
    const reservationCcRecipients = getReservationCcRecipients(notificationInbox);

    for (const r of toRemind) {
      try {
        await notifyReminder({ ...r, totalPrice: Number(r.totalPrice) });
        telegramSent++;
      } catch (telegramError) {
        console.error("[MERRYSAILS-REMINDER] Telegram reminder failed:", telegramError);
      }

      if (isEmailConfigured() && r.customerEmail) {
        try {
          const tour = getTourBySlug(r.tourSlug);
          const reservationMeta = parseReservationNotes(r.notes);

          await sendEmail({
            to: r.customerEmail,
            cc: reservationCcRecipients,
            subject: `Reminder: ${r.tourName} starts soon | ${r.reservationId} | MerrySails`,
            html: reservationReminderEmail({
              reservationId: r.reservationId,
              customerName: r.customerName,
              tourName: r.tourName,
              tourSlug: r.tourSlug,
              date: format(new Date(r.date), "MMMM d, yyyy"),
              time: r.time,
              guests: r.guests,
              departurePoint: tour?.departurePoint,
              packageName: reservationMeta.packageName,
              addOns: reservationMeta.addOns,
              privateTransferRequested: reservationMeta.privateTransferRequested,
            }),
          });

          emailSent++;
        } catch (emailError) {
          console.error("[MERRYSAILS-REMINDER] Reminder email failed:", emailError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      checked: reservations.length,
      reminders: toRemind.length,
      telegramSent,
      emailSent,
    });
  } catch (error) {
    console.error("[MERRYSAILS-REMINDER] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 30;
