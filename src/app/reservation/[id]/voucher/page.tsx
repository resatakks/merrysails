import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  MapPin,
  Package,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { getReservation } from "@/app/actions/reservation";
import { ReservationPdfPreview } from "@/components/reservation/ReservationPdfPreview";
import { getTourBySlug, getTourPath } from "@/data/tours";
import { parseReservationNotes } from "@/lib/reservation-meta";
import {
  getReservationStatusLabel,
  getReservationStatusTone,
  normalizeReservationStatus,
} from "@/lib/reservation-status";

export const metadata: Metadata = {
  title: "Reservation Voucher",
  robots: { index: false, follow: false },
};

export default async function ReservationVoucherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getReservation(id);

  if (!result.success || !result.reservation) {
    return (
      <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--line)] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--heading)]">
            Voucher not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            We could not generate a voucher for reservation ID{" "}
            <strong>{id.toUpperCase()}</strong>.
          </p>
          <Link
            href="/reservation"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Go to reservation center
          </Link>
        </div>
      </main>
    );
  }

  const reservation = result.reservation;
  const tour = getTourBySlug(reservation.tourSlug);
  const normalizedStatus = normalizeReservationStatus(reservation.status);
  const statusLabel = getReservationStatusLabel(normalizedStatus);
  const reservationMeta = parseReservationNotes(reservation.notes);
  const hasSelectedOptions = Boolean(
    reservationMeta.packageName ||
      reservationMeta.addOns.length > 0 ||
      reservationMeta.privateTransferRequested ||
      reservationMeta.additionalGuests.length > 0
  );
  const voucherPdfHref = `/reservation/${reservation.reservationId}/voucher/pdf`;
  const voucherPdfDownloadHref = `${voucherPdfHref}?download=1`;

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-10 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-4xl space-y-6 print:max-w-none print:space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              Travel Voucher
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
              Reservation voucher and boarding details
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/reservation/${reservation.reservationId}/invoice`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              Reservation invoice
            </Link>
            <Link
              href={`/reservation/${reservation.reservationId}`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              Back to reservation
            </Link>
            {tour && (
              <Link
                href={getTourPath(tour)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold !text-white shadow-[0_14px_32px_rgba(255,78,80,0.24)] transition-all hover:brightness-110"
              >
                Open experience page
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <ReservationPdfPreview
          eyebrow="Voucher PDF"
          title="Preview the original boarding voucher PDF"
          description="Open the travel-ready voucher inside the page, switch to the full PDF viewer, or download the original file for offline access before departure."
          previewHref={voucherPdfHref}
          downloadHref={voucherPdfDownloadHref}
        />

        <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
          <div className="bg-[var(--heading)] px-6 py-8 text-white md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-primary)]/90">
                  MerrySails
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {reservation.tourName}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  Present this voucher together with your reservation ID when you
                  arrive. Save it as a PDF or keep it open on your phone for a
                  faster check-in flow.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left md:min-w-[240px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Reservation ID
                </div>
                <div className="mt-2 text-2xl font-bold tracking-[0.08em]">
                  {reservation.reservationId}
                </div>
                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getReservationStatusTone(normalizedStatus)}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-8">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Guest Details
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white p-2">
                      <User className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Lead guest
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.customerName}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {reservation.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white p-2">
                      <Users className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Guests
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.guests} guest
                        {reservation.guests > 1 ? "s" : ""}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {reservation.customerPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Cruise Details
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {format(new Date(reservation.date), "EEEE, MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <Clock className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Departure time
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <MapPin className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Departure point
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {tour?.departurePoint ?? "Final meeting instructions are shared after confirmation."}
                      </p>
                    </div>
                  </div>
                </div>

                {hasSelectedOptions && (
                  <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-white p-2">
                        <Package className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div className="w-full">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Selected booking option
                        </p>
                        <div className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--body-text)]">
                          {reservationMeta.packageName && (
                            <p>
                              <span className="font-semibold text-[var(--heading)]">Package:</span>{" "}
                              {reservationMeta.packageName}
                            </p>
                          )}
                          {reservationMeta.privateTransferRequested && (
                            <p>
                              <span className="font-semibold text-[var(--heading)]">Transfer:</span>{" "}
                              Private transfer requested. Our team will contact you with pickup details.
                            </p>
                          )}
                          {reservationMeta.addOns.length > 0 && (
                            <p>
                              <span className="font-semibold text-[var(--heading)]">Add-ons:</span>{" "}
                              {reservationMeta.addOns.join(", ")}
                            </p>
                          )}
                          {reservationMeta.additionalGuests.length > 0 && (
                            <div>
                              <p>
                                <span className="font-semibold text-[var(--heading)]">Other passengers:</span>
                              </p>
                              <ul className="mt-1 list-disc pl-5">
                                {reservationMeta.additionalGuests.map((guest) => (
                                  <li key={guest}>{guest}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {reservationMeta.customerNote && (
                  <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-white p-2">
                        <Sparkles className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Special requests
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">
                          {reservationMeta.customerNote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Included Reference
                </h3>
                <ul className="mt-4 space-y-3">
                  {(tour?.includes ?? [
                    "Reservation reference and reservation ID",
                    "Boarding support from the MerrySails team",
                    "Tour-specific inclusions shared on the booking page",
                  ]).slice(0, 6).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--body-text)]"
                    >
                      <span className="mt-0.5 text-[var(--brand-primary)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Before You Board
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--body-text)]">
                  <p>Arrive at least 15 minutes before departure.</p>
                  <p>Keep your reservation ID ready when you meet the team.</p>
                  <p>
                    Payment collection and final operational notes follow the
                    terms shown on your booked experience page.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[var(--surface-alt)] p-2">
                    <FileText className="h-4 w-4 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                      Voucher & Invoice
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      MerrySails vouchers are generated from the reservation
                      system and linked to your reservation ID. Your reservation
                      invoice uses the same booking data for a cleaner finance
                      and operations workflow. If anything changes, use the
                      reservation page or contact the team by phone or WhatsApp
                      before departure.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
