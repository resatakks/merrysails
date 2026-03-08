"use server";

import { prisma } from "@/lib/db";
import { generateReservationId } from "@/lib/reservation-id";
import { sendEmail } from "@/lib/email";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { reservationNotificationEmail } from "@/lib/email-templates/reservation-notification";
import { reservationCancelledEmail } from "@/lib/email-templates/reservation-cancelled";
import { format } from "date-fns";

interface CreateReservationInput {
  tourSlug: string;
  tourName: string;
  date: string; // ISO string
  time: string;
  guests: number;
  totalPrice: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  notes?: string;
}

export async function createReservation(input: CreateReservationInput) {
  try {
    const reservationId = await generateReservationId();
    const dateObj = new Date(input.date);

    const reservation = await prisma.reservation.create({
      data: {
        reservationId,
        tourSlug: input.tourSlug,
        tourName: input.tourName,
        date: dateObj,
        time: input.time,
        guests: input.guests,
        totalPrice: input.totalPrice,
        currency: input.currency,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        customerCountry: input.customerCountry || null,
        notes: input.notes || null,
      },
    });

    const formattedDate = format(dateObj, "MMMM d, yyyy");

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: input.customerEmail,
        cc: process.env.GMAIL_USER,
        subject: `Booking Confirmed — ${reservationId} | MerrySails`,
        html: reservationConfirmationEmail({
          reservationId,
          customerName: input.customerName,
          tourName: input.tourName,
          date: formattedDate,
          time: input.time,
          guests: input.guests,
          totalPrice: input.totalPrice,
          currency: input.currency,
          notes: input.notes,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send customer email:", emailErr);
    }

    // Send notification email to business
    try {
      if (process.env.GMAIL_USER) {
        await sendEmail({
          to: process.env.GMAIL_USER,
          subject: `🎉 New Booking: ${reservationId} — ${input.tourName}`,
          html: reservationNotificationEmail({
            reservationId,
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            customerCountry: input.customerCountry,
            tourName: input.tourName,
            tourSlug: input.tourSlug,
            date: formattedDate,
            time: input.time,
            guests: input.guests,
            totalPrice: input.totalPrice,
            currency: input.currency,
            notes: input.notes,
          }),
        });
      }
    } catch (emailErr) {
      console.error("Failed to send notification email:", emailErr);
    }

    // Telegram notification (will be added in Faz 4)
    if (process.env.TELEGRAM_BOT_TOKEN) {
      try {
        const { notifyNewReservation } = await import("@/lib/telegram/notifications");
        await notifyNewReservation(reservation);
      } catch {
        // Telegram not set up yet — silently skip
      }
    }

    return { success: true, reservationId };
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return { success: false, error: "Failed to create reservation. Please try again." };
  }
}

export async function getReservation(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { reservationId: reservationId.toUpperCase() },
    });

    if (!reservation) {
      return { success: false, error: "Reservation not found" };
    }

    return { success: true, reservation };
  } catch {
    return { success: false, error: "Failed to look up reservation" };
  }
}

export async function getReservationsByEmail(email: string) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { customerEmail: email.toLowerCase().trim() },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        reservationId: true,
        tourName: true,
        date: true,
        time: true,
        guests: true,
        status: true,
        totalPrice: true,
        currency: true,
      },
    });

    return { success: true, reservations };
  } catch {
    return { success: false, error: "Failed to look up reservations" };
  }
}

export async function cancelReservation(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { reservationId: reservationId.toUpperCase() },
    });

    if (!reservation) {
      return { success: false, error: "Reservation not found" };
    }

    if (reservation.status === "cancelled") {
      return { success: false, error: "Reservation is already cancelled" };
    }

    // Check if cancellation is at least 24h before
    const now = new Date();
    const tourDate = new Date(reservation.date);
    const hoursUntilTour = (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilTour < 24) {
      return { success: false, error: "Cancellations must be made at least 24 hours before departure" };
    }

    await prisma.reservation.update({
      where: { reservationId: reservationId.toUpperCase() },
      data: { status: "cancelled" },
    });

    const formattedDate = format(tourDate, "MMMM d, yyyy");

    // Send cancellation email to customer
    try {
      await sendEmail({
        to: reservation.customerEmail,
        subject: `Reservation Cancelled — ${reservationId} | MerrySails`,
        html: reservationCancelledEmail({
          reservationId: reservation.reservationId,
          customerName: reservation.customerName,
          tourName: reservation.tourName,
          date: formattedDate,
          time: reservation.time,
          totalPrice: reservation.totalPrice,
          currency: reservation.currency,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send cancellation email:", emailErr);
    }

    // Telegram notification for cancellation
    if (process.env.TELEGRAM_BOT_TOKEN) {
      try {
        const { notifyStatusChange } = await import("@/lib/telegram/notifications");
        await notifyStatusChange(
          { ...reservation, totalPrice: Number(reservation.totalPrice) },
          reservation.status,
          "cancelled"
        );
      } catch {
        // Telegram not set up yet — silently skip
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to cancel reservation" };
  }
}
