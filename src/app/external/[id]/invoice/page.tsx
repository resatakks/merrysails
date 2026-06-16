import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, FileText, MapPin, Receipt, User } from "lucide-react";
import { prisma } from "@/lib/db";
import { ReservationPdfPreview } from "@/components/reservation/ReservationPdfPreview";

export const metadata: Metadata = {
  title: "External Invoice",
  description: "Internal invoice document for an external-company booking.",
  robots: { index: false, follow: false },
};

function formatMoney(amount: number, currency: string): string {
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
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export default async function ExternalInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await prisma.externalJob.findUnique({ where: { jobId: id } });

  if (!job) {
    return (
      <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--line)] bg-white p-8 text-center shadow-sm">
          <p className="text-2xl font-bold text-[var(--heading)]">
            Invoice not found
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            We could not find an external job with ID{" "}
            <strong>{id.toUpperCase()}</strong>.
          </p>
          <Link
            href="/admin/external"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Back to admin
          </Link>
        </div>
      </main>
    );
  }

  const invoiceDate = format(
    job.confirmedAt ?? job.createdAt,
    "MMMM d, yyyy"
  );
  const serviceDate = format(new Date(job.jobDate), "EEEE, MMMM d, yyyy");
  const unitPrice = job.guests > 0 ? Number(job.amount) / job.guests : Number(job.amount);

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-10 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-5xl space-y-6 print:max-w-none print:space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              External Invoice
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
              Invoice — {job.companyName}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/external/${job.jobId}/voucher`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              View voucher
            </Link>
            <Link
              href="/admin/external"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              Back to admin
            </Link>
          </div>
        </div>

        <ReservationPdfPreview
          eyebrow="Invoice PDF"
          title="Preview the invoice PDF"
          description="Review the invoice here, open it in a dedicated viewer, or download the original file directly."
          previewHref={`/external/${job.jobId}/invoice/pdf`}
          downloadHref={`/external/${job.jobId}/invoice/pdf?download=1`}
        />

        <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
          <div className="bg-[var(--heading)] px-6 py-8 text-white md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-primary)]/90">
                  MerrySails Istanbul
                </p>
                <h2 className="mt-3 text-3xl font-bold">Invoice</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                  Merry Travel Acentası · TURSAB A-9889
                  <br />
                  Karaköy, Istanbul, Turkey
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left md:min-w-[260px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Invoice Reference
                </div>
                <div className="mt-2 text-2xl font-bold tracking-[0.08em]">
                  {job.jobId}
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
                  {job.companyName ? "Bill To" : "Billing Details"}
                </h3>
                {job.companyName ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-bold text-[var(--heading)]">
                      {job.companyName}
                    </p>
                    {job.companyAddress ? (
                      <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--body-text)]">
                        {job.companyAddress}
                      </p>
                    ) : null}
                    {job.companyTaxId ? (
                      <p className="text-sm text-[var(--text-muted)]">
                        <span className="font-semibold text-[var(--heading)]">Tax ID:</span>{" "}
                        {job.companyTaxId}
                      </p>
                    ) : null}
                    {job.companyEmail ? (
                      <p className="text-sm text-[var(--text-muted)]">{job.companyEmail}</p>
                    ) : null}
                    {job.companyPhone ? (
                      <p className="text-sm text-[var(--text-muted)]">{job.companyPhone}</p>
                    ) : null}
                    <div className="mt-3 border-t border-[var(--line)] pt-3 text-xs text-[var(--text-muted)]">
                      <p className="font-semibold uppercase tracking-[0.12em]">
                        Service for
                      </p>
                      <p className="mt-1 text-sm text-[var(--heading)]">
                        {job.customerName}
                        {job.customerEmail ? ` · ${job.customerEmail}` : ""}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex items-start gap-3">
                    <div className="rounded-full bg-white p-2">
                      <User className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Customer
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {job.customerName}
                      </p>
                      {job.customerEmail ? (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {job.customerEmail}
                        </p>
                      ) : null}
                      {job.customerPhone ? (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {job.customerPhone}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
                {job.paymentNotes ? (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-800">
                      Payment terms
                    </p>
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-amber-900">
                      {job.paymentNotes}
                    </p>
                  </div>
                ) : null}
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
                        Service
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {job.serviceTitle}
                      </p>
                    </div>
                  </div>

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
                        {job.jobTime ? ` · ${job.jobTime}` : ""}
                      </p>
                    </div>
                  </div>

                  {job.pickupPoint ? (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-[var(--surface-alt)] p-2">
                        <MapPin className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Pickup
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                          {job.pickupPoint}
                        </p>
                      </div>
                    </div>
                  ) : null}
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
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)]">
                  <div className="overflow-x-auto">
                    <table className="min-w-[38rem] w-full border-collapse text-sm">
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
                        <tr className="border-t border-[var(--line)]">
                          <td className="px-4 py-3 font-medium text-[var(--heading)]">
                            {job.serviceTitle}
                          </td>
                          <td className="px-4 py-3 text-[var(--body-text)]">
                            {job.guests}
                          </td>
                          <td className="px-4 py-3 text-[var(--body-text)]">
                            {formatMoney(unitPrice, job.currency)}
                            <span className="ml-1 text-[var(--text-muted)]">
                              {job.guests > 1 ? "/pax" : "/job"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-[var(--heading)]">
                            {formatMoney(Number(job.amount), job.currency)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-[var(--surface-alt)]">
                        <tr className="border-t border-[var(--line)]">
                          <td
                            className="px-4 py-4 text-base font-bold text-[var(--heading)]"
                            colSpan={3}
                          >
                            Invoice total
                          </td>
                          <td className="px-4 py-4 text-right text-xl font-bold text-[var(--heading)]">
                            {formatMoney(
                              Number(job.amount),
                              job.currency
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Payment
                </h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--body-text)]">
                  <p>
                    <span className="font-semibold">Method:</span>{" "}
                    {job.paymentMethod.replace(/_/g, " ")}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {job.paymentStatus}
                  </p>
                  {job.notes ? (
                    <p className="whitespace-pre-line">{job.notes}</p>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
