import { prisma } from "@/lib/db";
import { parseReservationNotes } from "@/lib/reservation-meta";
import { parseReservationItems } from "@/lib/reservation-items";
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

  const isCustomBooking = !reservation.time;
  const pickupFromNotes = (() => {
    const raw = reservation.notes ?? "";
    const match = raw.match(/pickup\s+from\s+([^,.\n—-]+?)(?:\s+time\s+flexible|[,.\n—-]|$)/i);
    return match ? match[1].trim() : null;
  })();
  const meetingPointOverride = isCustomBooking
    ? `${pickupFromNotes ?? "Karaköy"} — pickup time flexible`
    : undefined;

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
    isCustomBooking,
    meetingPointOverride,
    items: parseReservationItems(reservation.items) ?? undefined,
  };

  return {
    reservation,
    meta,
    documentInput,
  };
}
