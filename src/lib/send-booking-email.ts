/**
 * Reusable booking-email senders for both Reservation and ExternalJob, used
 * by the Telegram parse flow's "✉️ Mail Gönder" button (and re-usable
 * anywhere server-side). Uses the custom-booking template + the shared PDF
 * attachment engine so the email matches what the operator just reviewed.
 */
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import {
  getNotificationInbox,
  getReservationCcRecipients,
  sendEmail,
} from "@/lib/email";
import { reservationCustomBookingEmail } from "@/lib/email-templates/reservation-custom-booking";
import { buildReservationPdfAttachments } from "@/lib/reservation-pdf";
import { parseReservationNotes } from "@/lib/reservation-meta";
import { getExternalJobDocumentPayload } from "@/lib/external-job-documents";

function currencySymbol(currency: string): string {
  switch (currency) {
    case "USD":
      return "$";
    case "TRY":
      return "₺";
    case "GBP":
      return "£";
    default:
      return "€";
  }
}

function paymentNote(method: string | undefined, totalDisplay: string): string {
  switch (method) {
    case "cash_on_board":
      return `Payment: ${totalDisplay} cash on board.`;
    case "card_on_board":
      return `Payment: ${totalDisplay} by card on board.`;
    case "card_paid":
      return `Payment received in full (${totalDisplay}). Nothing due on board.`;
    case "bank_transfer":
      return `Payment by bank transfer (${totalDisplay}). Please share the proof if not already sent.`;
    default:
      return "Payment is collected directly on the day of the experience.";
  }
}

export interface SendBookingEmailResult {
  ok: boolean;
  error?: string;
  to?: string;
  cc?: string[];
}

export async function sendReservationBookingEmail(
  reservationId: string
): Promise<SendBookingEmailResult> {
  const reservation = await prisma.reservation.findUnique({
    where: { reservationId },
  });
  if (!reservation) return { ok: false, error: "Reservation not found." };
  if (
    !reservation.customerEmail ||
    reservation.customerEmail === "tbc@merrysails.com" ||
    !reservation.customerEmail.includes("@")
  ) {
    return { ok: false, error: "Geçerli müşteri email yok (TBC)." };
  }

  const meta = parseReservationNotes(reservation.notes);
  const totalPrice = Number(reservation.totalPrice);
  const totalDisplay = `${currencySymbol(reservation.currency)}${totalPrice.toFixed(2)}`;
  const formattedDate = format(new Date(reservation.date), "EEEE, MMMM d, yyyy");
  const cc = getReservationCcRecipients(getNotificationInbox());

  const html = reservationCustomBookingEmail({
    reservationId: reservation.reservationId,
    customerName: reservation.customerName,
    tourName: reservation.tourName,
    date: formattedDate,
    pickup: meta.meetingPointNote ?? reservation.time,
    totalPrice,
    currency: reservation.currency,
    paymentNote: paymentNote(meta.paymentMethod, totalDisplay),
    customerPhone: reservation.customerPhone,
    meetingPointNote: meta.meetingPointNote,
    guestCount: reservation.guests,
  });

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
    status: "Confirmed",
    isCustomBooking: meta.emailTemplate === "custom-booking" || !reservation.time,
    meetingPointOverride: meta.meetingPointNote ?? undefined,
    voucherExtraNote: meta.voucherExtraNote,
    voucherExtraNoteTitle: meta.voucherExtraNoteTitle,
  });

  await sendEmail({
    to: reservation.customerEmail,
    cc,
    subject: `MerrySails — Booking confirmation · ${reservation.reservationId}`,
    html,
    attachments,
  });

  return { ok: true, to: reservation.customerEmail, cc };
}

export async function sendExternalBookingEmail(
  jobId: string
): Promise<SendBookingEmailResult> {
  const payload = await getExternalJobDocumentPayload(jobId);
  if (!payload) return { ok: false, error: "External job not found." };
  const { job, documentInput } = payload;

  if (!job.customerEmail || !job.customerEmail.includes("@")) {
    return { ok: false, error: "Geçerli müşteri email yok." };
  }

  const totalPrice = Number(job.amount);
  const totalDisplay = `${currencySymbol(job.currency)}${totalPrice.toFixed(2)}`;
  const formattedDate = format(new Date(job.jobDate), "EEEE, MMMM d, yyyy");
  const cc = getReservationCcRecipients(getNotificationInbox());

  const html = reservationCustomBookingEmail({
    reservationId: job.jobId,
    customerName: job.customerName,
    tourName: job.serviceTitle,
    date: formattedDate,
    pickup: job.pickupPoint ?? documentInput.time,
    totalPrice,
    currency: job.currency,
    paymentNote: job.paymentNotes ?? paymentNote(job.paymentMethod, totalDisplay),
    customerPhone: job.customerPhone ?? "",
    meetingPointNote: job.pickupPoint ?? undefined,
    guestCount: job.guests,
  });

  const attachments = await buildReservationPdfAttachments(documentInput);

  await sendEmail({
    to: job.customerEmail,
    cc,
    subject: `MerrySails — Booking confirmation · ${job.jobId}`,
    html,
    attachments,
  });

  return { ok: true, to: job.customerEmail, cc };
}
