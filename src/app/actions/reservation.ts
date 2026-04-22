"use server";

import { format, isValid, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { after } from "next/server";
import { prisma } from "@/lib/db";
import { generateReservationId } from "@/lib/reservation-id";
import { getNotificationInbox, getReservationCcRecipients, sendEmail } from "@/lib/email";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { reservationNotificationEmail } from "@/lib/email-templates/reservation-notification";
import { reservationCancelledEmail } from "@/lib/email-templates/reservation-cancelled";
import { serializeReservationNotes } from "@/lib/reservation-meta";
import { buildReservationPdfAttachments } from "@/lib/reservation-pdf";
import { getBookingMode } from "@/data/tours";
import {
  buildReservationPricingSnapshot,
  ReservationValidationError,
} from "@/lib/reservation-pricing";
import { consumeRateLimit } from "@/lib/rate-limit";
import {
  getSameDayBookingClosedMessage,
  isSameDayBookingClosed,
} from "@/lib/booking-cutoffs";

interface CreateReservationInput {
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  packageName?: string;
  addOns?: string[];
  additionalGuests?: string[];
  privateTransferRequested?: boolean;
  notes?: string;
  honeypot?: string;
}

const DATE_INPUT_FORMATS = [
  "yyyy-MM-dd",
  "dd MMM yyyy",
  "MMMM d, yyyy",
  "dd MMMM yyyy",
];

function sanitizeSingleLine(value: string, maxLength: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeNotes(value?: string): string | undefined {
  const cleaned = value?.replace(/\u0000/g, "").trim();
  return cleaned ? cleaned.slice(0, 1200) : undefined;
}

function sanitizeGuestNames(values?: string[]): string[] {
  return (
    values
      ?.map((value) => value.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 24) ?? []
  );
}

function normalizePhone(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 32);
}

function isExactClockTime(value: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function normalizeReservationTime(value: string): string {
  const trimmed = sanitizeSingleLine(value, 80);

  if (!trimmed) {
    return "To be confirmed";
  }

  return isExactClockTime(trimmed) ? trimmed : trimmed;
}

function parseReservationDateInput(value: string): Date | null {
  const trimmed = value.trim();

  for (const formatPattern of DATE_INPUT_FORMATS) {
    const parsedDate = parse(trimmed, formatPattern, new Date(), {
      locale: enUS,
    });

    if (isValid(parsedDate)) {
      return new Date(
        Date.UTC(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate()
        )
      );
    }
  }

  const fallbackDate = new Date(trimmed);

  if (!Number.isNaN(fallbackDate.getTime())) {
    return new Date(
      Date.UTC(
        fallbackDate.getUTCFullYear(),
        fallbackDate.getUTCMonth(),
        fallbackDate.getUTCDate()
      )
    );
  }

  return null;
}

export async function createReservation(input: CreateReservationInput) {
  try {
    if (input.honeypot?.trim()) {
      return {
        success: false,
        error: "We could not process the reservation. Please try again.",
      };
    }

    const customerName = sanitizeSingleLine(input.customerName, 120);
    const customerEmail = sanitizeSingleLine(input.customerEmail, 160).toLowerCase();
    const customerPhone = normalizePhone(input.customerPhone);
    const customerCountry = input.customerCountry
      ? sanitizeSingleLine(input.customerCountry, 80)
      : undefined;
    const customerNote = sanitizeNotes(input.notes);
    const additionalGuests = sanitizeGuestNames(input.additionalGuests);

    if (customerName.length < 2) {
      return {
        success: false,
        error: "Please enter your full name.",
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    const phoneDigits = customerPhone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 18) {
      return {
        success: false,
        error: "Please enter a valid phone number.",
      };
    }

    const reservationDate = parseReservationDateInput(input.date);

    if (!reservationDate) {
      return {
        success: false,
        error: "Please choose a valid reservation date.",
      };
    }

    const todayUtc = new Date();
    const minReservationDate = new Date(
      Date.UTC(
        todayUtc.getUTCFullYear(),
        todayUtc.getUTCMonth(),
        todayUtc.getUTCDate()
      )
    );

    if (reservationDate < minReservationDate) {
      return {
        success: false,
        error: "Past dates cannot be booked online.",
      };
    }

    const reservationTime = normalizeReservationTime(input.time);

    if (
      isSameDayBookingClosed(
        input.tourSlug,
        reservationDate,
        new Date(),
        reservationTime
      )
    ) {
      return {
        success: false,
        error:
          getSameDayBookingClosedMessage(input.tourSlug, reservationTime) ??
          "Online booking is closed for this departure. Please contact us directly.",
      };
    }

    const limitKey = `${customerEmail}|${phoneDigits}|${input.tourSlug}`;
    const reservationLimit = consumeRateLimit("reservation", limitKey, {
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });

    if (!reservationLimit.allowed) {
      return {
        success: false,
        error:
          "Too many reservation attempts were made in a short time. Please wait a little and try again.",
      };
    }

    const pricing = buildReservationPricingSnapshot({
      tourSlug: input.tourSlug,
      guests: input.guests,
      packageName: input.packageName,
      addOns: input.addOns,
    });

    const reservationId = await generateReservationId();
    const initialStatus =
      getBookingMode(pricing.tour) === "book" ? "confirmed" : "pending";
    const notificationInbox = getNotificationInbox();
    const reservationCcRecipients = getReservationCcRecipients(notificationInbox);

    const reservation = await prisma.reservation.create({
      data: {
        reservationId,
        tourSlug: pricing.tour.slug,
        tourName: pricing.tour.nameEn,
        date: reservationDate,
        time: reservationTime,
        guests: pricing.guests,
        totalPrice: pricing.total,
        currency: pricing.currency,
        status: initialStatus,
        customerName,
        customerEmail,
        customerPhone,
        customerCountry: customerCountry || null,
        notes:
          serializeReservationNotes({
            packageName: pricing.packageName,
            addOns: pricing.selectedAddOns.map((addOn) => addOn.name),
            customerNote,
            additionalGuests,
            privateTransferRequested: Boolean(input.privateTransferRequested),
            pricing: {
              currency: pricing.currency,
              guests: pricing.guests,
              priceMode: pricing.priceMode,
              lineItems: pricing.lineItems,
              subtotal: pricing.subtotal,
              addOnsTotal: pricing.addOnsTotal,
              total: pricing.total,
            },
          }) ?? null,
      },
    });

    const formattedDate = format(reservationDate, "MMMM d, yyyy");

    after(async () => {
      const tasks: Promise<unknown>[] = [];

      tasks.push(
        (async () => {
          const attachments =
            initialStatus === "confirmed"
              ? await buildReservationPdfAttachments({
                  reservationId,
                  customerName,
                  customerEmail,
                  customerPhone,
                  tourSlug: pricing.tour.slug,
                  tourName: pricing.tour.nameEn,
                  serviceDate: reservationDate,
                  time: reservationTime,
                  guests: pricing.guests,
                  totalPrice: pricing.total,
                  currency: pricing.currency,
                  packageName: pricing.packageName,
                  addOns: pricing.selectedAddOns.map((addOn) => addOn.name),
                  additionalGuests,
                  privateTransferRequested: Boolean(input.privateTransferRequested),
                  notes: customerNote,
                  pricing,
                  status: "Confirmed",
                })
              : undefined;

          await sendEmail({
            to: customerEmail,
            cc: reservationCcRecipients,
            attachments,
            subject:
              initialStatus === "confirmed"
                ? `Reservation Confirmed — ${reservationId} | MerrySails`
                : `Reservation Request Received — ${reservationId} | MerrySails`,
            html: reservationConfirmationEmail({
              reservationId,
              customerName,
              tourName: pricing.tour.nameEn,
              tourSlug: pricing.tour.slug,
              date: formattedDate,
              time: reservationTime,
              guests: pricing.guests,
              totalPrice: pricing.total,
              currency: pricing.currency,
              packageName: pricing.packageName,
              addOns: pricing.selectedAddOns.map((addOn) => addOn.name),
              additionalGuests,
              privateTransferRequested: Boolean(input.privateTransferRequested),
              notes: customerNote,
              variant: initialStatus === "confirmed" ? "confirmed" : "received",
            }),
          });
        })().catch((emailErr) => {
          console.error("Failed to send customer email:", emailErr);
        })
      );

      if (notificationInbox) {
        tasks.push(
          sendEmail({
            to: notificationInbox,
            cc: reservationCcRecipients.filter((recipient) => recipient !== notificationInbox),
            subject: `🎉 New Booking: ${reservationId} — ${pricing.tour.nameEn}`,
            html: reservationNotificationEmail({
              reservationId,
              customerName,
              customerEmail,
              customerPhone,
              customerCountry,
              tourName: pricing.tour.nameEn,
              tourSlug: pricing.tour.slug,
              date: formattedDate,
              time: reservationTime,
              guests: pricing.guests,
              totalPrice: pricing.total,
              currency: pricing.currency,
              packageName: pricing.packageName,
              addOns: pricing.selectedAddOns.map((addOn) => addOn.name),
              additionalGuests,
              privateTransferRequested: Boolean(input.privateTransferRequested),
              notes: customerNote,
            }),
          }).catch((emailErr) => {
            console.error("Failed to send notification email:", emailErr);
          })
        );
      }

      if (process.env.TELEGRAM_BOT_TOKEN) {
        tasks.push(
          import("@/lib/telegram/notifications")
            .then(({ notifyNewReservation }) =>
              notifyNewReservation({
                ...reservation,
                totalPrice: Number(reservation.totalPrice),
              })
            )
            .catch((telegramErr) => {
              console.error(
                "Failed to send reservation Telegram notification:",
                telegramErr
              );
            })
        );
      }

      await Promise.allSettled(tasks);
    });

    return {
      success: true,
      reservationId,
      totalPrice: pricing.total,
      packageName: pricing.packageName,
      addOns: pricing.selectedAddOns.map((addOn) => addOn.name),
    };
  } catch (error) {
    if (error instanceof ReservationValidationError) {
      return { success: false, error: error.message };
    }

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
