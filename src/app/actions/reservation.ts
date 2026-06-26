"use server";

import { format, isValid, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { after } from "next/server";
import { prisma } from "@/lib/db";
import { generateReservationId } from "@/lib/reservation-id";
import { getNotificationInbox, getReservationCcRecipients, sendEmail } from "@/lib/email";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { serializeReservationNotes } from "@/lib/reservation-meta";
import {
  buildReservationPricingSnapshot,
  ReservationValidationError,
} from "@/lib/reservation-pricing";
import { buildReservationPdfAttachments } from "@/lib/reservation-pdf";
import { consumeRateLimit } from "@/lib/rate-limit";
import {
  getSameDayBookingClosedMessage,
  isSameDayBookingClosed,
} from "@/lib/booking-cutoffs";

interface AttributionPayload {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  gadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrerHost?: string;
  landingPath?: string;
  trafficChannel?: string;
}

interface CreateReservationInput {
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  /** 3-13 yaş, 50% indirim (defaults to 0). Ignored in mixed-package bookings. */
  children?: number;
  /** 0-3 yaş, ücretsiz (defaults to 0). Ignored in mixed-package bookings. */
  infants?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  packageName?: string;
  /** Whole-yacht charter (fleet path): priced server-side from fleet.ts. */
  fleetSlug?: string;
  charterHours?: number;
  addOns?: string[];
  additionalGuests?: string[];
  privateTransferRequested?: boolean;
  notes?: string;
  honeypot?: string;
  attribution?: AttributionPayload;
  /**
   * Customer locale captured from the booking page pathname (en/tr/de/fr/nl/ru).
   * Drives the localized confirmation email. Additive + optional — defaults to
   * "en" so a missing/unknown value never breaks the booking or the email.
   * (A non-EN customer used to receive an all-English email; 2026-06-20.)
   */
  locale?: string;
  /**
   * Optional mixed-package breakdown. When present and has ≥2 entries the
   * booking is treated as a mixed-package reservation (some guests on one
   * package, others on a different one). Sum of items[].guests must equal
   * `guests`. Single-entry / absent → legacy single-package behavior.
   */
  items?: { packageName: string; guests: number }[];
}

function sanitizeAttribution(input?: AttributionPayload) {
  if (!input) return {};
  const trim = (v?: string) => (v ? v.trim().slice(0, 255) || null : null);
  return {
    gclid: trim(input.gclid),
    gbraid: trim(input.gbraid),
    wbraid: trim(input.wbraid),
    gadSource: trim(input.gadSource),
    utmSource: trim(input.utmSource),
    utmMedium: trim(input.utmMedium),
    utmCampaign: trim(input.utmCampaign),
    utmContent: trim(input.utmContent),
    utmTerm: trim(input.utmTerm),
    referrerHost: trim(input.referrerHost),
    landingPath: trim(input.landingPath),
    trafficChannel: trim(input.trafficChannel),
  };
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

/**
 * Locales the confirmation email is translated into. Anything else (incl.
 * undefined) clamps to "en" so the revenue-critical email always renders.
 */
const EMAIL_LOCALES = new Set(["en", "tr", "de", "fr", "nl", "ru"]);

function resolveEmailLocale(value?: string): string {
  const candidate = value?.trim().toLowerCase();
  return candidate && EMAIL_LOCALES.has(candidate) ? candidate : "en";
}

function isExactClockTime(value: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function normalizeReservationTime(value: string): string {
  const trimmed = sanitizeSingleLine(value, 80);

  if (!trimmed) {
    return "To be confirmed";
  }

  if (isExactClockTime(trimmed)) {
    return trimmed;
  }

  // The departure can arrive as localized prose — e.g. a Turkish operation-day
  // override "20:30 kalkış (biniş 20:00'da başlar)". The stored + emailed time
  // must be a clean clock value, never another locale's prose (an EN customer
  // was shown a Turkish departure, 2026-06-20). Extract the departure clock;
  // keep the raw value only for genuine non-clock notes ("arranged after booking").
  const clock = trimmed.match(/\b\d{1,2}:\d{2}\b/)?.[0];
  return clock ?? trimmed;
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
    const emailLocale = resolveEmailLocale(input.locale);

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

    // Normalize the mixed-package items array: keep only well-formed entries
    // with a packageName + integer guests ≥1. Drop the array when it collapses
    // to fewer than 2 entries (single-package = legacy path).
    const normalizedItems = Array.isArray(input.items)
      ? input.items
          .map((it) => ({
            packageName: typeof it.packageName === "string" ? it.packageName.trim() : "",
            guests: Number.isFinite(it.guests) ? Math.trunc(it.guests) : 0,
          }))
          .filter((it) => it.packageName.length > 0 && it.guests > 0)
      : [];
    const mixedItems = normalizedItems.length >= 2 ? normalizedItems : undefined;

    const pricing = buildReservationPricingSnapshot({
      tourSlug: input.tourSlug,
      guests: input.guests,
      children: input.children,
      infants: input.infants,
      packageName: input.packageName,
      fleetSlug: input.fleetSlug,
      charterHours: input.charterHours,
      addOns: input.addOns,
      date: reservationDate,
      items: mixedItems,
    });

    // Snapshot of mixed-package line items persisted in the `items` JSONB
    // column so renderers can show per-package guest split + prices without
    // re-pricing. Stays null for legacy single-package reservations.
    const persistedItems = mixedItems
      ? pricing.lineItems
          .filter((line) => line.type === "package")
          .map((line) => ({
            packageName: line.label,
            guests: line.quantity,
            unitPrice: line.unitPrice,
            unitLabel: line.unitLabel,
            total: line.total,
            currency: pricing.currency,
          }))
      : null;

    const reservationId = await generateReservationId();
    const initialStatus = "new";
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
        items: persistedItems ?? undefined,
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
              guestBreakdown: pricing.guestBreakdown,
              childDiscountSavings: pricing.childDiscountSavings,
              priceMode: pricing.priceMode,
              lineItems: pricing.lineItems,
              subtotal: pricing.subtotal,
              addOnsTotal: pricing.addOnsTotal,
              originalTotal: pricing.originalTotal,
              total: pricing.total,
              groupDiscount: pricing.groupDiscount,
              weeklyDiscount: pricing.weeklyDiscount,
            },
          }) ?? null,
        ...sanitizeAttribution(input.attribution),
      },
    });

    const formattedDate = format(reservationDate, "MMMM d, yyyy");

    after(async () => {
      const tasks: Promise<unknown>[] = [];

      tasks.push(
        (async () => {
          // Build voucher + invoice PDFs so the customer receives them with
          // the initial "received" email — restored after commit 3511f4c
          // accidentally stripped the attachment chain.
          let attachments: Awaited<ReturnType<typeof buildReservationPdfAttachments>> | undefined;
          try {
            attachments = await buildReservationPdfAttachments({
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
              pricing: {
                currency: pricing.currency,
                guests: pricing.guests,
                guestBreakdown: pricing.guestBreakdown,
                childDiscountSavings: pricing.childDiscountSavings,
                priceMode: pricing.priceMode,
                lineItems: pricing.lineItems,
                subtotal: pricing.subtotal,
                addOnsTotal: pricing.addOnsTotal,
                originalTotal: pricing.originalTotal,
                total: pricing.total,
                groupDiscount: pricing.groupDiscount,
                weeklyDiscount: pricing.weeklyDiscount,
              },
              status: "Received",
              items: persistedItems ?? undefined,
            });
          } catch (pdfErr) {
            console.error("Failed to build reservation PDF attachments:", pdfErr);
          }

          await sendEmail({
            to: customerEmail,
            cc: reservationCcRecipients,
            subject:
              `Reservation Request Received — ${reservationId} | MerrySails`,
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
              variant: "received",
              locale: emailLocale,
              originalTotal: pricing.groupDiscount.eligible
                ? pricing.originalTotal
                : undefined,
              groupDiscountSavings: pricing.groupDiscount.eligible
                ? pricing.groupDiscount.savings
                : undefined,
              groupDiscountCode: pricing.groupDiscount.eligible
                ? pricing.groupDiscount.code
                : undefined,
              items: persistedItems
                ? persistedItems.map(({ packageName, guests }) => ({
                    packageName,
                    guests,
                  }))
                : undefined,
              guestBreakdown: pricing.guestBreakdown,
              childDiscountSavings:
                pricing.childDiscountSavings > 0
                  ? pricing.childDiscountSavings
                  : undefined,
            }),
            attachments,
          });
        })().catch((emailErr) => {
          console.error("Failed to send customer email:", emailErr);
        })
      );

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
