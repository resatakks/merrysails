"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  clearAdminSession,
  isAdminAuthConfigured,
  isAdminDevBypassEnabled,
  requireAdminSession,
  setAdminSession,
  validateAdminPassword,
} from "@/lib/admin-auth";
import {
  getOperationDateKey,
  isValidDepartureTimeOverride,
  normalizeOperationDate,
} from "@/lib/tour-operations";
import { getTourBySlug } from "@/data/tours";
import { sendEmail } from "@/lib/email";
import { reservationCancelledEmail } from "@/lib/email-templates/reservation-cancelled";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { parseReservationNotes } from "@/lib/reservation-meta";

interface AdminLoginState {
  success: boolean;
  error: string;
}

interface OperationDayActionState {
  success: boolean;
  error: string;
  dateKey: string;
}

function sanitizeText(value: FormDataEntryValue | null, maxLength: number): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function revalidateOperationPaths(tourSlug: string) {
  const canonicalPath = getTourBySlug(tourSlug)?.canonicalPath;

  revalidatePath("/admin");
  revalidatePath("/admin/operations");
  revalidatePath("/reservation");

  if (canonicalPath) {
    revalidatePath(canonicalPath);
  }

  if (tourSlug === "bosphorus-dinner-cruise") {
    revalidatePath("/istanbul-dinner-cruise");
  }

  if (tourSlug === "yacht-charter-in-istanbul") {
    revalidatePath("/yacht-charter-istanbul");
  }
}

export async function adminLoginAction(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  if (isAdminDevBypassEnabled()) {
    redirect("/admin");
  }

  if (!isAdminAuthConfigured()) {
    return {
      success: false,
      error:
        "Admin access is not configured yet. Add ADMIN_ACCESS_PASSWORD and ADMIN_SESSION_SECRET in the environment.",
    };
  }

  const password = sanitizeText(formData.get("password"), 256);

  if (!password || !validateAdminPassword(password)) {
    return {
      success: false,
      error: "The admin password is not correct.",
    };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateReservationStatusAdminAction(
  formData: FormData
): Promise<void> {
  await requireAdminSession();

  const reservationId = sanitizeText(formData.get("reservationId"), 64).toUpperCase();
  const nextStatus = sanitizeText(formData.get("status"), 24).toLowerCase();

  if (!reservationId || !["pending", "confirmed", "cancelled", "completed"].includes(nextStatus)) {
    return;
  }

  const existing = await prisma.reservation.findUnique({
    where: { reservationId },
  });

  if (!existing) {
    return;
  }

  if (existing.status === nextStatus) {
    return;
  }

  const updatedReservation = await prisma.reservation.update({
    where: { reservationId },
    data: { status: nextStatus },
  });

  const formattedDate = format(new Date(existing.date), "MMMM d, yyyy");
  const reservationMeta = parseReservationNotes(existing.notes);

  if (nextStatus === "confirmed") {
    try {
      await sendEmail({
        to: existing.customerEmail,
        cc: process.env.GMAIL_USER,
        subject: `Reservation Confirmed — ${reservationId} | MerrySails`,
        html: reservationConfirmationEmail({
          reservationId: existing.reservationId,
          customerName: existing.customerName,
          tourName: existing.tourName,
          tourSlug: existing.tourSlug,
          date: formattedDate,
          time: existing.time,
          guests: existing.guests,
          totalPrice: Number(existing.totalPrice),
          currency: existing.currency,
          packageName: reservationMeta.packageName,
          addOns: reservationMeta.addOns,
          notes: reservationMeta.customerNote,
          variant: "confirmed",
        }),
      });
    } catch (emailError) {
      console.error("Failed to send reservation confirmation status email:", emailError);
    }
  }

  if (nextStatus === "cancelled") {
    try {
      await sendEmail({
        to: existing.customerEmail,
        cc: process.env.GMAIL_USER,
        subject: `Reservation Cancelled — ${reservationId} | MerrySails`,
        html: reservationCancelledEmail({
          reservationId: existing.reservationId,
          customerName: existing.customerName,
          tourName: existing.tourName,
          date: formattedDate,
          time: existing.time,
          totalPrice: Number(existing.totalPrice),
          currency: existing.currency,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send reservation cancellation status email:", emailError);
    }
  }

  if (process.env.TELEGRAM_BOT_TOKEN) {
    try {
      const { notifyStatusChange } = await import("@/lib/telegram/notifications");
      await notifyStatusChange(
        { ...updatedReservation, totalPrice: Number(updatedReservation.totalPrice) },
        existing.status,
        nextStatus
      );
    } catch (telegramError) {
      console.error("Failed to send admin status Telegram notification:", telegramError);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath(`/reservation/${reservationId}`);
  revalidatePath(`/reservation/${reservationId}/voucher`);
  revalidatePath(`/reservation/${reservationId}/invoice`);

}

export async function upsertTourOperationDayAction(
  _prevState: OperationDayActionState,
  formData: FormData
): Promise<OperationDayActionState> {
  await requireAdminSession();

  const tourSlug = sanitizeText(formData.get("tourSlug"), 120);
  const dateInput = sanitizeText(formData.get("date"), 32);
  const departureTimeOverride = sanitizeText(
    formData.get("departureTimeOverride"),
    16
  );
  const note = sanitizeText(formData.get("note"), 240);
  const isSoldOut = formData.get("isSoldOut") === "on";

  if (!tourSlug || !getTourBySlug(tourSlug)) {
    return {
      success: false,
      error: "Please choose a valid tour.",
      dateKey: "",
    };
  }

  if (!dateInput) {
    return {
      success: false,
      error: "Please choose a date.",
      dateKey: "",
    };
  }

  if (
    departureTimeOverride &&
    !isValidDepartureTimeOverride(departureTimeOverride)
  ) {
    return {
      success: false,
      error: "Departure override must use HH:MM format.",
      dateKey: "",
    };
  }

  const normalizedDate = normalizeOperationDate(dateInput);

  await prisma.tourOperationDay.upsert({
    where: {
      tourSlug_date: {
        tourSlug,
        date: normalizedDate,
      },
    },
    update: {
      isSoldOut,
      departureTimeOverride: departureTimeOverride || null,
      note: note || null,
    },
    create: {
      tourSlug,
      date: normalizedDate,
      isSoldOut,
      departureTimeOverride: departureTimeOverride || null,
      note: note || null,
    },
  });

  revalidateOperationPaths(tourSlug);

  return {
    success: true,
    error: "",
    dateKey: getOperationDateKey(normalizedDate),
  };
}

export async function deleteTourOperationDayAction(
  formData: FormData
): Promise<void> {
  await requireAdminSession();

  const id = sanitizeText(formData.get("id"), 40);

  if (!id) {
    return;
  }

  const existingOperation = await prisma.tourOperationDay.findUnique({
    where: { id },
    select: { tourSlug: true },
  });

  if (!existingOperation) {
    return;
  }

  await prisma.tourOperationDay.delete({
    where: { id },
  });

  revalidateOperationPaths(existingOperation.tourSlug);
}
