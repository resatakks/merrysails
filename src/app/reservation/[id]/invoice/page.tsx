import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Receipt,
  User,
  Users,
} from "lucide-react";
import { getReservation } from "@/app/actions/reservation";
import { getTourBySlug } from "@/data/tours";
import { parseReservationNotes } from "@/lib/reservation-meta";

export const metadata: Metadata = {
  title: "Reservation Invoice",
  robots: { index: false, follow: false },
};

interface InvoiceLineItem {
  label: string;
  quantity: number;
  unitPrice: number;
  unitLabel: string;
  total: number;
}

function formatCurrency(amount: number, currency: string): string {
  const symbol =
    currency === "EUR"
      ? "€"
      : currency === "USD"
      ? "$"
      : currency === "TRY"
      ? "₺"
      : currency === "GBP"
      ? "£"
      : `${currency} `;

  return `${symbol}${amount}`;
}

export default async function ReservationInvoicePage({
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
            Invoice not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            We could not generate an invoice for reservation ID{" "}
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
  const reservationMeta = parseReservationNotes(reservation.notes);
  const pricing = reservationMeta.pricing;
  const currency = pricing?.currency ?? reservation.currency;
  const invoiceDate = format(new Date(), "MMMM d, yyyy");
  const serviceDate = format(new Date(reservation.date), "EEEE, MMMM d, yyyy");

  const lineItems: InvoiceLineItem[] =
    pricing?.lineItems?.length
      ? pricing.lineItems
      : [
          {
            label: reservationMeta.packageName ?? reservation.tourName,
            quantity: 1,
            unitPrice: Number(reservation.totalPrice),
            unitLabel: "/booking",
            total: Number(reservation.totalPrice),
          },
        ];

  const subtotal = pricing?.subtotal ?? Number(reservation.totalPrice);
  const addOnsTotal = pricing?.addOnsTotal ?? 0;
  const total = pricing?.total ?? Number(reservation.totalPrice);

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-10 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-5xl space-y-6 print:max-w-none print:space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              Reservation Invoice
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
              Booking summary and finance reference
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/reservation/${reservation.reservationId}`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              Back to reservation
            </Link>
            <Link
              href={`/reservation/${reservation.reservationId}/voucher`}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold !text-white shadow-[0_14px_32px_rgba(255,78,80,0.24)] transition-all hover:brightness-110"
            >
              Open voucher
            </Link>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
          <div className="bg-[var(--heading)] px-6 py-8 text-white md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-primary)]/90">
                  MerrySails
                </p>
                <h2 className="mt-3 text-3xl font-bold">Reservation Invoice</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  This invoice-style summary is generated directly from your
                  reservation data and helps finance, operations, and guest
                  support stay aligned.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left md:min-w-[260px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Invoice Reference
                </div>
                <div className="mt-2 text-2xl font-bold tracking-[0.08em]">
                  {reservation.reservationId}
                </div>
                <div className="mt-3 text-xs text-white/65">
                  Issued on {invoiceDate}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Billing Details
                </h3>
                <div className="mt-4 space-y-4">
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
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {reservation.customerPhone}
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
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Service Details
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <Receipt className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.tourName}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-[var(--surface-alt)] p-2">
                        <Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Service date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                          {serviceDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-[var(--surface-alt)] p-2">
                        <Clock className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Departure
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                          {reservation.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <MapPin className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Departure point
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {tour?.departurePoint ??
                          "Final meeting instructions are shared after confirmation."}
                      </p>
                    </div>
                  </div>

                  {(reservationMeta.privateTransferRequested ||
                    reservationMeta.additionalGuests.length > 0) && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Booking extras
                      </p>
                      <div className="mt-2 space-y-2 text-sm text-[var(--body-text)]">
                        {reservationMeta.privateTransferRequested && (
                          <p>
                            <span className="font-semibold text-[var(--heading)]">Transfer:</span>{" "}
                            Private transfer requested separately
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
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[var(--surface-alt)] p-2">
                    <FileText className="h-4 w-4 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                      Line Items
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      The totals below are tied to the package and add-ons saved
                      with your reservation.
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)]">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-[var(--surface-alt)]">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-[var(--text-muted)]">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-[var(--text-muted)]">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-[var(--text-muted)]">
                          Unit
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-[var(--text-muted)]">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((item) => (
                        <tr
                          key={`${item.label}-${item.unitPrice}`}
                          className="border-t border-[var(--line)]"
                        >
                          <td className="px-4 py-3 font-medium text-[var(--heading)]">
                            {item.label}
                          </td>
                          <td className="px-4 py-3 text-[var(--body-text)]">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-[var(--body-text)]">
                            {formatCurrency(item.unitPrice, currency)}
                            <span className="ml-1 text-[var(--text-muted)]">
                              {item.unitLabel}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-[var(--heading)]">
                            {formatCurrency(item.total, currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[var(--surface-alt)]">
                      <tr className="border-t border-[var(--line)]">
                        <td className="px-4 py-3 text-[var(--text-muted)]" colSpan={3}>
                          Package subtotal
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-[var(--heading)]">
                          {formatCurrency(subtotal, currency)}
                        </td>
                      </tr>
                      <tr className="border-t border-[var(--line)]">
                        <td className="px-4 py-3 text-[var(--text-muted)]" colSpan={3}>
                          Add-ons subtotal
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-[var(--heading)]">
                          {formatCurrency(addOnsTotal, currency)}
                        </td>
                      </tr>
                      <tr className="border-t border-[var(--line)]">
                        <td
                          className="px-4 py-4 text-base font-bold text-[var(--heading)]"
                          colSpan={3}
                        >
                          Reservation total
                        </td>
                        <td className="px-4 py-4 text-right text-xl font-bold text-[var(--heading)]">
                          {formatCurrency(total, currency)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Payment Note
                </h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--body-text)]">
                  <p>This reservation summary is linked to your booking record.</p>
                  <p>Payment collection follows the operational terms of the booked experience.</p>
                  <p>
                    For corporate billing or formal invoice requests, contact the
                    team before departure with your reservation ID.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
