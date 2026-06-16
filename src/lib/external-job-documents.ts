/**
 * Adapter: ExternalJob → ReservationPdfInput, so external work reuses the
 * exact same voucher/invoice PDF engine as normal reservations (no separate
 * design to maintain). Branding is always MerrySails.
 */
import { prisma } from "@/lib/db";
import type { ReservationPdfInput } from "@/lib/reservation-pdf";

function formatExternalStatus(status: string): string {
  switch (status) {
    case "new":
      return "New";
    case "confirmed":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

export async function getExternalJobDocumentPayload(jobId: string) {
  const job = await prisma.externalJob.findUnique({
    where: { jobId: jobId.toUpperCase() },
  });
  if (!job) return null;

  // Compose the time line: "19:00 · 2 hours" when both present.
  const timeBits = [
    job.jobTime,
    job.durationHours
      ? `${job.durationHours} hour${job.durationHours === 1 ? "" : "s"}`
      : null,
  ].filter(Boolean);
  const time = timeBits.join(" · ") || "TBC";

  // Build the voucher "extra" block (inclusions + payment) the same way the
  // reservation engine renders voucherExtraNote.
  const extraLines: string[] = [];
  if (job.inclusions.length > 0) {
    extraLines.push("Included:");
    for (const inc of job.inclusions) extraLines.push(`• ${inc}`);
  }
  if (job.paymentNotes) {
    if (extraLines.length) extraLines.push("");
    extraLines.push("Payment");
    extraLines.push(job.paymentNotes);
  }
  const voucherExtraNote = extraLines.length ? extraLines.join("\n") : undefined;

  const documentInput: ReservationPdfInput = {
    reservationId: job.jobId,
    customerName: job.customerName,
    customerEmail: job.customerEmail ?? "—",
    customerPhone: job.customerPhone ?? "—",
    tourSlug: "external-job", // synthetic — getTourBySlug returns undefined, fine
    tourName: job.serviceTitle,
    serviceDate: job.jobDate,
    time,
    guests: job.guests,
    totalPrice: Number(job.amount),
    currency: job.currency,
    packageName: job.serviceTitle,
    addOns: job.inclusions,
    additionalGuests: [],
    privateTransferRequested: false,
    notes: job.notes ?? undefined,
    status: formatExternalStatus(job.status),
    isCustomBooking: true,
    meetingPointOverride: job.pickupPoint ?? "To be confirmed",
    voucherExtraNote,
    voucherExtraNoteTitle: job.voucherExtraTitle ?? "On Board & Inclusions",
  };

  return { job, documentInput };
}
