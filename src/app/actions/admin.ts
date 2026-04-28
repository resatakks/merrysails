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
  validateAdminCredentials,
} from "@/lib/admin-auth";
import {
  getOperationDateKey,
  isValidDepartureTimeOverride,
  normalizeOperationDate,
} from "@/lib/tour-operations";
import { getPriceMode, getTourBySlug } from "@/data/tours";
import { generateReservationId } from "@/lib/reservation-id";
import { getNotificationInbox, getReservationCcRecipients, sendEmail } from "@/lib/email";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { parseReservationNotes, serializeReservationNotes } from "@/lib/reservation-meta";
import { buildReservationPdfAttachments } from "@/lib/reservation-pdf";
import type { ReservationPricingSnapshot } from "@/lib/reservation-pricing";
import {
  isReservationStatus,
  normalizeReservationStatus,
} from "@/lib/reservation-status";

interface AdminLoginState {
  success: boolean;
  error: string;
}

interface OperationDayActionState {
  success: boolean;
  error: string;
  dateKey: string;
}

interface ManualReservationActionState {
  success: boolean;
  error: string;
  reservationId: string;
  emailSent: boolean;
}

interface ReservationWorkflowInput {
  reservationId: string;
  status: string;
  internalCostEur?: number | null;
}

interface BulkReservationWorkflowInput {
  reservationIds: string[];
  status: string;
  internalCosts?: Record<string, number | null | undefined>;
}

interface ReservationDetailsInput {
  reservationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
}

function sanitizeText(value: FormDataEntryValue | null, maxLength: number): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function parseOptionalEuroCost(value: FormDataEntryValue | null): number | null {
  const cleaned = String(value ?? "")
    .replace(",", ".")
    .trim();

  if (!cleaned) {
    return null;
  }

  const parsed = Number.parseFloat(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.round(parsed * 100) / 100;
}

function parseRequiredEuroAmount(value: FormDataEntryValue | null): number | null {
  const cleaned = String(value ?? "")
    .replace(",", ".")
    .trim();

  if (!cleaned) {
    return null;
  }

  const parsed = Number.parseFloat(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.round(parsed * 100) / 100;
}

function parseDelimitedList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\n|,/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 40);
}

function parseAddOnList(values: FormDataEntryValue[]): string[] {
  const out: string[] = [];
  for (const value of values) {
    String(value ?? "")
      .split(/\n|,/)
      .map((item) => item.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .forEach((item) => out.push(item));
  }
  return out.slice(0, 40);
}

interface AdditionalPassengerInput {
  name?: string;
  phone?: string;
  email?: string;
}

function parseAdditionalPassengers(
  value: FormDataEntryValue | null
): string[] {
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];

  const lines: string[] = [];
  for (const entry of parsed.slice(0, 24)) {
    if (!entry || typeof entry !== "object") continue;
    const passenger = entry as AdditionalPassengerInput;
    const name = (passenger.name ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
    const phone = (passenger.phone ?? "").replace(/\s+/g, " ").trim().slice(0, 32);
    const email = (passenger.email ?? "").replace(/\s+/g, "").trim().slice(0, 160);
    if (!name && !phone && !email) continue;
    const parts = [name || "(name pending)"];
    if (phone) parts.push(phone);
    if (email) parts.push(email);
    lines.push(parts.join(" – "));
  }
  return lines;
}

function parseAdminDateInput(value: string): Date | null {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match.map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function buildManualPricingSnapshot(input: {
  tourSlug: string;
  guests: number;
  totalPrice: number;
  packageName?: string;
  addOns?: string[];
}): ReservationPricingSnapshot {
  const tour = getTourBySlug(input.tourSlug);
  const priceMode = tour ? getPriceMode(tour) : "custom";
  const safeGuests = Math.max(1, input.guests);

  // Resolve add-on prices from tour data so each one shows on the invoice
  const addOnLines = (input.addOns ?? [])
    .map((name) => {
      const match = tour?.addOns?.find((a) => a.name === name);
      if (!match) {
        return {
          type: "addon" as const,
          label: name,
          quantity: 1,
          unitPrice: 0,
          unitLabel: "",
          total: 0,
        };
      }
      const amountMatch = match.price.match(/(\d+(?:[.,]\d+)?)/);
      const amount = amountMatch
        ? Math.round(Number.parseFloat(amountMatch[1].replace(",", ".")) * 100) / 100
        : 0;
      const isPerPerson = /\/\s*person|\/ pp|per person/i.test(match.price);
      const quantity = isPerPerson ? safeGuests : 1;
      const total = Math.round(amount * quantity * 100) / 100;
      return {
        type: "addon" as const,
        label: match.name,
        quantity,
        unitPrice: amount,
        unitLabel: isPerPerson ? "/person" : "",
        total,
      };
    });

  const addOnsTotal = Math.round(
    addOnLines.reduce((sum, line) => sum + line.total, 0) * 100
  ) / 100;
  const baseTotal = Math.max(0, Math.round((input.totalPrice - addOnsTotal) * 100) / 100);
  const baseQuantity = priceMode === "perGroup" ? 1 : safeGuests;
  const baseUnitPrice =
    baseQuantity > 0
      ? Math.round((baseTotal / baseQuantity) * 100) / 100
      : baseTotal;

  return {
    currency: "EUR",
    guests: input.guests,
    priceMode,
    lineItems: [
      {
        type: "package",
        label: input.packageName || tour?.nameEn || "Manual reservation",
        quantity: baseQuantity,
        unitPrice: baseUnitPrice,
        unitLabel: priceMode === "perGroup" ? "/booking" : "/person",
        total: baseTotal,
      },
      ...addOnLines,
    ],
    subtotal: baseTotal,
    addOnsTotal,
    total: input.totalPrice,
  };
}

async function sendReservationCustomerEmail(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { reservationId },
  });

  if (!reservation) {
    throw new Error("Reservation not found.");
  }

  const meta = parseReservationNotes(reservation.notes);
  const normalizedStatus = normalizeReservationStatus(reservation.status);
  const isConfirmed = normalizedStatus === "confirmed" || normalizedStatus === "completed";
  const totalPrice = Number(reservation.totalPrice);
  const formattedDate = format(new Date(reservation.date), "MMMM d, yyyy");
  const notificationInbox = getNotificationInbox();
  const reservationCcRecipients = getReservationCcRecipients(notificationInbox);
  const emailPayload = {
    reservationId: reservation.reservationId,
    customerName: reservation.customerName,
    tourName: reservation.tourName,
    tourSlug: reservation.tourSlug,
    date: formattedDate,
    time: reservation.time,
    guests: reservation.guests,
    totalPrice,
    currency: reservation.currency,
    packageName: meta.packageName,
    addOns: meta.addOns,
    additionalGuests: meta.additionalGuests,
    privateTransferRequested: meta.privateTransferRequested,
    notes: meta.customerNote,
    variant: isConfirmed ? "confirmed" as const : "received" as const,
  };

  const attachments = await buildReservationPdfAttachments({
    reservationId: reservation.reservationId,
    customerName: reservation.customerName,
    customerEmail: reservation.customerEmail,
    customerPhone: reservation.customerPhone,
    tourSlug: reservation.tourSlug,
    tourName: reservation.tourName,
    serviceDate: new Date(reservation.date),
    time: reservation.time,
    guests: reservation.guests,
    totalPrice,
    currency: reservation.currency,
    packageName: meta.packageName,
    addOns: meta.addOns,
    additionalGuests: meta.additionalGuests,
    privateTransferRequested: meta.privateTransferRequested,
    notes: meta.customerNote,
    pricing: meta.pricing,
    status: isConfirmed ? "Confirmed" : "Received",
  });

  await sendEmail({
    to: reservation.customerEmail,
    cc: reservationCcRecipients,
    subject: isConfirmed
      ? `Reservation Confirmed — ${reservation.reservationId} | MerrySails`
      : `Reservation Request Received — ${reservation.reservationId} | MerrySails`,
    html: reservationConfirmationEmail(emailPayload),
    attachments,
  });
}

async function applyReservationWorkflowUpdate({
  reservationId,
  status,
  internalCostEur,
}: ReservationWorkflowInput): Promise<void> {
  const normalizedId = reservationId.trim().toUpperCase();
  const nextStatus = normalizeReservationStatus(status);

  if (!normalizedId || !isReservationStatus(nextStatus)) {
    return;
  }

  const existing = await prisma.reservation.findUnique({
    where: { reservationId: normalizedId },
  });

  if (!existing) {
    return;
  }

  const currentStatus = normalizeReservationStatus(existing.status);
  const hasCostAlready = typeof existing.internalCostEur === "number";
  const safeInternalCost =
    typeof internalCostEur === "number" && Number.isFinite(internalCostEur)
      ? Math.round(internalCostEur * 100) / 100
      : null;

  if (nextStatus === "completed" && !hasCostAlready && safeInternalCost === null) {
    throw new Error("Internal cost is required before a reservation can be completed.");
  }

  if (
    currentStatus === nextStatus &&
    (safeInternalCost === null || safeInternalCost === existing.internalCostEur)
  ) {
    return;
  }

  const now = new Date();
  const updatedReservation = await prisma.reservation.update({
    where: { reservationId: normalizedId },
    data: {
      status: nextStatus,
      internalCostEur:
        safeInternalCost !== null ? safeInternalCost : existing.internalCostEur,
      confirmedAt:
        nextStatus === "confirmed"
          ? existing.confirmedAt ?? now
          : existing.confirmedAt,
      completedAt:
        nextStatus === "completed"
          ? now
          : nextStatus === "cancelled"
          ? null
          : existing.completedAt,
    },
  });

  if (process.env.TELEGRAM_BOT_TOKEN) {
    try {
      const { notifyStatusChange } = await import("@/lib/telegram/notifications");
      await notifyStatusChange(
        {
          ...updatedReservation,
          status: nextStatus,
          totalPrice: Number(updatedReservation.totalPrice),
          internalCostEur:
            typeof updatedReservation.internalCostEur === "number"
              ? Number(updatedReservation.internalCostEur)
              : null,
        },
        currentStatus,
        nextStatus
      );
    } catch (telegramError) {
      console.error("Failed to send admin status Telegram notification:", telegramError);
    }
  }

  // Server-side Google Ads conversion upload — fires once on confirmed
  // transition. Catches the gap when client-side gtag was blocked at
  // booking time. Silent no-op when env vars are missing.
  if (
    currentStatus !== "confirmed" &&
    nextStatus === "confirmed" &&
    updatedReservation.gclid
  ) {
    try {
      const [{ uploadPurchaseConversion, hashUserIdentifiersServer }] = await Promise.all([
        import("@/lib/google-ads-conversion"),
      ]);
      const userIdentifiers = await hashUserIdentifiersServer({
        email: updatedReservation.customerEmail,
        phone: updatedReservation.customerPhone,
      });
      const result = await uploadPurchaseConversion({
        gclid: updatedReservation.gclid,
        conversionDateTime: updatedReservation.confirmedAt ?? new Date(),
        value: Number(updatedReservation.totalPrice),
        currency: updatedReservation.currency,
        orderId: updatedReservation.reservationId,
        userIdentifiers,
      });
      if (!result.ok && result.reason !== "not_configured") {
        console.warn(
          `[google-ads] Conversion upload for ${updatedReservation.reservationId} returned: ${result.reason}`
        );
      }
    } catch (uploadErr) {
      console.error("[google-ads] Server-side conversion upload threw:", uploadErr);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/reports");
  revalidatePath("/admin/calendar");
  revalidatePath(`/reservation/${normalizedId}`);
  revalidatePath(`/reservation/${normalizedId}/voucher`);
  revalidatePath(`/reservation/${normalizedId}/invoice`);
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

  const email = sanitizeText(formData.get("email"), 160).toLowerCase();
  const password = sanitizeText(formData.get("password"), 256);

  if (!email || !password || !validateAdminCredentials(email, password)) {
    return {
      success: false,
      error: "The admin email or password is not correct.",
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
  const internalCostEur = parseOptionalEuroCost(formData.get("internalCostEur"));

  await applyReservationWorkflowUpdate({
    reservationId,
    status: nextStatus,
    internalCostEur,
  });
}

export async function saveReservationInternalCostAdminAction(input: {
  reservationId: string;
  internalCostEur: number | null;
}) {
  await requireAdminSession();

  const reservationId = input.reservationId.trim().toUpperCase();
  if (!reservationId) {
    throw new Error("Reservation ID is required.");
  }

  const existing = await prisma.reservation.findUnique({
    where: { reservationId },
  });

  if (!existing) {
    throw new Error("Reservation not found.");
  }

  await prisma.reservation.update({
    where: { reservationId },
    data: {
      internalCostEur:
        typeof input.internalCostEur === "number" && Number.isFinite(input.internalCostEur)
          ? Math.round(input.internalCostEur * 100) / 100
          : null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/reports");
}

export async function updateReservationDetailsAdminAction(
  input: ReservationDetailsInput
) {
  await requireAdminSession();

  const reservationId = input.reservationId.trim().toUpperCase();
  const customerName = input.customerName.replace(/\s+/g, " ").trim().slice(0, 120);
  const customerEmail = input.customerEmail.replace(/\s+/g, "").trim().toLowerCase().slice(0, 160);
  const customerPhone = input.customerPhone.replace(/\s+/g, " ").trim().slice(0, 32);
  const time = input.time.replace(/\s+/g, " ").trim().slice(0, 80);
  const serviceDate = parseAdminDateInput(input.date);
  const guests = Math.trunc(input.guests);
  const totalPrice = Math.round(input.totalPrice * 100) / 100;

  if (!reservationId) {
    throw new Error("Reservation ID is required.");
  }

  if (customerName.length < 2) {
    throw new Error("Customer name is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw new Error("Valid customer email is required.");
  }

  if (customerPhone.replace(/\D/g, "").length < 7) {
    throw new Error("Valid customer phone is required.");
  }

  if (!serviceDate) {
    throw new Error("Valid service date is required.");
  }

  if (!time) {
    throw new Error("Service time is required.");
  }

  if (!Number.isFinite(guests) || guests < 1) {
    throw new Error("Guest count must be at least 1.");
  }

  if (!Number.isFinite(totalPrice) || totalPrice < 0) {
    throw new Error("Sale price must be zero or higher.");
  }

  await prisma.reservation.update({
    where: { reservationId },
    data: {
      customerName,
      customerEmail,
      customerPhone,
      date: serviceDate,
      time,
      guests,
      totalPrice,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/reports");
  revalidatePath("/admin/calendar");
  revalidatePath(`/reservation/${reservationId}`);
  revalidatePath(`/reservation/${reservationId}/voucher`);
  revalidatePath(`/reservation/${reservationId}/invoice`);
}

export async function createManualReservationAdminAction(
  _prevState: ManualReservationActionState,
  formData: FormData
): Promise<ManualReservationActionState> {
  await requireAdminSession();

  const tourSlug = sanitizeText(formData.get("tourSlug"), 120);
  const tour = getTourBySlug(tourSlug);
  const customerName = sanitizeText(formData.get("customerName"), 120);
  const customerEmail = sanitizeText(formData.get("customerEmail"), 160)
    .replace(/\s+/g, "")
    .toLowerCase();
  const customerPhone = sanitizeText(formData.get("customerPhone"), 32);
  const customerCountry = sanitizeText(formData.get("customerCountry"), 80);
  const dateInput = sanitizeText(formData.get("date"), 32);
  const time = sanitizeText(formData.get("time"), 80) || "To be confirmed";
  const guests = Number.parseInt(String(formData.get("guests") ?? ""), 10);
  const totalPrice = parseRequiredEuroAmount(formData.get("totalPrice"));
  const internalCostEur = parseOptionalEuroCost(formData.get("internalCostEur"));
  const status = normalizeReservationStatus(sanitizeText(formData.get("status"), 24) || "confirmed");
  const packageName = sanitizeText(formData.get("packageName"), 160);
  const addOns = parseAddOnList(formData.getAll("addOns"));
  const additionalGuests = (() => {
    const structured = parseAdditionalPassengers(formData.get("additionalPassengers"));
    if (structured.length > 0) return structured;
    return parseDelimitedList(formData.get("additionalGuests"));
  })();
  const privateTransferRequested = formData.get("privateTransferRequested") === "on";
  const customerNote = String(formData.get("notes") ?? "").replace(/\u0000/g, "").trim().slice(0, 1200);
  const shouldSendEmail = formData.get("sendEmail") === "on";
  const serviceDate = parseAdminDateInput(dateInput);

  if (!tour) {
    return { success: false, error: "Please choose a valid tour.", reservationId: "", emailSent: false };
  }

  if (customerName.length < 2) {
    return { success: false, error: "Customer name is required.", reservationId: "", emailSent: false };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return { success: false, error: "Valid customer email is required.", reservationId: "", emailSent: false };
  }

  if (customerPhone.replace(/\D/g, "").length < 7) {
    return { success: false, error: "Valid customer phone is required.", reservationId: "", emailSent: false };
  }

  if (!serviceDate) {
    return { success: false, error: "Valid service date is required.", reservationId: "", emailSent: false };
  }

  if (!Number.isFinite(guests) || guests < 1) {
    return { success: false, error: "Guest count must be at least 1.", reservationId: "", emailSent: false };
  }

  if (totalPrice === null) {
    return { success: false, error: "Sale price must be zero or higher.", reservationId: "", emailSent: false };
  }

  if (!isReservationStatus(status)) {
    return { success: false, error: "Please choose a valid status.", reservationId: "", emailSent: false };
  }

  if (status === "completed" && internalCostEur === null) {
    return { success: false, error: "Internal cost is required before a manual reservation can be completed.", reservationId: "", emailSent: false };
  }

  try {
    const now = new Date();
    const reservationId = await generateReservationId();
    const pricing = buildManualPricingSnapshot({
      tourSlug: tour.slug,
      guests,
      totalPrice,
      packageName: packageName || undefined,
      addOns,
    });

    const reservation = await prisma.reservation.create({
      data: {
        reservationId,
        tourSlug: tour.slug,
        tourName: tour.nameEn,
        date: serviceDate,
        time,
        guests,
        totalPrice,
        currency: "EUR",
        status,
        internalCostEur,
        confirmedAt: status === "confirmed" || status === "completed" ? now : null,
        completedAt: status === "completed" ? now : null,
        customerName,
        customerEmail,
        customerPhone,
        customerCountry: customerCountry || null,
        notes:
          serializeReservationNotes({
            packageName: packageName || undefined,
            addOns,
            customerNote: customerNote || undefined,
            additionalGuests,
            privateTransferRequested,
            pricing,
          }) ?? null,
      },
    });

    let emailSent = false;
    if (shouldSendEmail) {
      await sendReservationCustomerEmail(reservation.reservationId);
      emailSent = true;
    }

    if (process.env.TELEGRAM_BOT_TOKEN) {
      try {
        const { notifyNewReservation } = await import("@/lib/telegram/notifications");
        await notifyNewReservation({
          ...reservation,
          totalPrice: Number(reservation.totalPrice),
          internalCostEur:
            typeof reservation.internalCostEur === "number"
              ? Number(reservation.internalCostEur)
              : null,
        });
      } catch (telegramError) {
        console.error("Failed to send manual reservation Telegram notification:", telegramError);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/operations");
    revalidatePath("/admin/reservations");
    revalidatePath("/admin/reports");
    revalidatePath("/admin/calendar");

    return { success: true, error: "", reservationId, emailSent };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      error: err.message || "Manual reservation could not be created.",
      reservationId: "",
      emailSent: false,
    };
  }
}

export async function resendReservationCustomerEmailAdminAction(input: {
  reservationId: string;
}) {
  await requireAdminSession();

  const reservationId = input.reservationId.trim().toUpperCase();
  if (!reservationId) {
    throw new Error("Reservation ID is required.");
  }

  await sendReservationCustomerEmail(reservationId);
}

export async function deleteReservationAdminAction(input: {
  reservationId: string;
  confirmationReservationId: string;
}) {
  await requireAdminSession();

  const reservationId = input.reservationId.trim().toUpperCase();
  const confirmationReservationId = input.confirmationReservationId
    .trim()
    .toUpperCase();

  if (!reservationId || reservationId !== confirmationReservationId) {
    throw new Error("Type the exact reservation ID before deleting.");
  }

  await prisma.reservation.delete({
    where: { reservationId },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/reports");
  revalidatePath("/admin/calendar");
}

export async function bulkUpdateReservationsAdminAction(
  input: BulkReservationWorkflowInput
) {
  await requireAdminSession();

  const nextStatus = normalizeReservationStatus(input.status);
  if (!isReservationStatus(nextStatus)) {
    throw new Error("Invalid reservation status.");
  }

  const uniqueReservationIds = [...new Set(input.reservationIds.map((id) => id.trim().toUpperCase()).filter(Boolean))];

  if (uniqueReservationIds.length === 0) {
    throw new Error("Select at least one reservation.");
  }

  if (nextStatus === "completed") {
    const reservations = await prisma.reservation.findMany({
      where: { reservationId: { in: uniqueReservationIds } },
      select: { reservationId: true, internalCostEur: true },
    });

    const missingCosts = reservations.filter((reservation) => {
      const inputCost = input.internalCosts?.[reservation.reservationId];
      return (
        typeof reservation.internalCostEur !== "number" &&
        !(typeof inputCost === "number" && Number.isFinite(inputCost))
      );
    });

    if (missingCosts.length > 0) {
      throw new Error(
        `Internal cost is required before completion: ${missingCosts
          .map((item) => item.reservationId)
          .join(", ")}`
      );
    }
  }

  for (const reservationId of uniqueReservationIds) {
    await applyReservationWorkflowUpdate({
      reservationId,
      status: nextStatus,
      internalCostEur:
        typeof input.internalCosts?.[reservationId] === "number"
          ? input.internalCosts?.[reservationId] ?? null
          : null,
    });
  }
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
