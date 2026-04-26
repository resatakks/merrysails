import { prisma } from "@/lib/db";
import { parseReservationNotes } from "@/lib/reservation-meta";
import type { ReservationPdfInput } from "@/lib/reservation-pdf";

function formatReservationStatus(status: string): string {
  switch (status) {
    case "new":
      return "New";
    case "pending":
      return "New";
    case "confirmed":
      return "Confirmed";
    case "cancelled":
      return "Cancelled";
    case "completed":
      return "Completed";
    default:
      return status
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
  }
}

export async function getReservationDocumentPayload(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { reservationId: reservationId.toUpperCase() },
  });

  if (!reservation) {
    return null;
  }

  const meta = parseReservationNotes(reservation.notes);

  const documentInput: ReservationPdfInput = {
    reservationId: reservation.reservationId,
    customerName: reservation.customerName,
    customerEmail: reservation.customerEmail,
    customerPhone: reservation.customerPhone,
    tourSlug: reservation.tourSlug,
    tourName: reservation.tourName,
    serviceDate: reservation.date,
    time: reservation.time,
    guests: reservation.guests,
    totalPrice: Number(reservation.totalPrice),
    currency: reservation.currency,
    packageName: meta.packageName,
    addOns: meta.addOns,
    additionalGuests: meta.additionalGuests,
    privateTransferRequested: meta.privateTransferRequested,
    notes: meta.customerNote,
    pricing: meta.pricing,
    status: formatReservationStatus(reservation.status),
  };

  return {
    reservation,
    meta,
    documentInput,
  };
}
