import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Phone,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { ReservationPdfPreview } from "@/components/reservation/ReservationPdfPreview";

export const metadata: Metadata = {
  title: "External Voucher",
  description: "Voucher document for an external-work booking.",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_TONES: Record<string, string> = {
  new: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  completed: "border-sky-200 bg-sky-50 text-sky-800",
  cancelled: "border-rose-200 bg-rose-50 text-rose-800",
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

function paymentMethodLabel(method: string): string {
  switch (method) {
    case "cash_on_board":
      return "Cash on board";
    case "card_on_board":
      return "Card on board";
    case "card_paid":
      return "Card paid";
    case "bank_transfer":
      return "Bank transfer";
    default:
      return method.replace(/_/g, " ");
  }
}

export default async function ExternalVoucherPage({
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
            Voucher not found
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

  const statusKey = job.status in STATUS_LABELS ? job.status : "new";
  const durationLabel = job.durationHours
    ? `${job.durationHours} hour${job.durationHours === 1 ? "" : "s"}`
    : null;
  const timeLine = [job.jobTime, durationLabel].filter(Boolean).join(" · ");

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] px-4 py-10 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-4xl space-y-6 print:max-w-none print:space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              External Work · Voucher
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
              {job.serviceTitle}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/external/${job.jobId}/invoice`}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              View invoice
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
          eyebrow="Voucher PDF"
          title="Preview the boarding voucher PDF"
          description="Open the travel-ready voucher inside the page, switch to the full PDF viewer, or download the original file for offline access before departure."
          previewHref={`/external/${job.jobId}/voucher/pdf`}
          downloadHref={`/external/${job.jobId}/voucher/pdf?download=1`}
        />

        <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
          <div className="bg-[var(--heading)] px-6 py-8 text-white md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-primary)]/90">
                  MerrySails Istanbul
                </p>
                <h2 className="mt-3 text-3xl font-bold">{job.serviceTitle}</h2>
                {job.serviceDescription ? (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                    {job.serviceDescription}
                  </p>
                ) : null}
                {job.companyName ? (
                  <p className="mt-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    Bill to: {job.companyName}
                  </p>
                ) : null}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left md:min-w-[240px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Voucher ID
                </div>
                <div className="mt-2 text-2xl font-bold tracking-[0.08em]">
                  {job.jobId}
                </div>
                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_TONES[statusKey] ?? STATUS_TONES.new}`}
                  >
                    {STATUS_LABELS[statusKey]}
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
                        {job.customerName}
                      </p>
                      {job.customerEmail ? (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {job.customerEmail}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white p-2">
                      {job.customerPhone ? (
                        <Phone className="h-4 w-4 text-[var(--brand-primary)]" />
                      ) : (
                        <Users className="h-4 w-4 text-[var(--brand-primary)]" />
                      )}
                    </div>
                    <div>
                      {job.customerPhone ? (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                            Phone
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                            {job.customerPhone}
                          </p>
                          <p className="mt-1 text-sm text-[var(--text-muted)]">
                            {job.guests} guest{job.guests > 1 ? "s" : ""}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                            Guests
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                            {job.guests} guest{job.guests > 1 ? "s" : ""}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Service Details
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
                        {format(new Date(job.jobDate), "EEEE, MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  {timeLine ? (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-[var(--surface-alt)] p-2">
                        <Clock className="h-4 w-4 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                          {timeLine}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <div className="rounded-full bg-[var(--surface-alt)] p-2">
                      <MapPin className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Pickup / meeting point
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {job.pickupPoint ?? "To be confirmed"}
                      </p>
                    </div>
                  </div>
                </div>

                {job.notes ? (
                  <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Notes
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--body-text)]">
                      {job.notes}
                    </p>
                  </div>
                ) : null}
              </section>
            </div>

            <div className="space-y-6">
              {job.inclusions.length > 0 ? (
                <section className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-2.5">
                      <UtensilsCrossed className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800">
                        {job.voucherExtraTitle ?? "On Board & Inclusions"}
                      </h3>
                      <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-[var(--body-text)]">
                        {job.inclusions.map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2 pl-1">
                            <span className="mt-0.5 text-amber-600">✓</span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                      {job.paymentNotes ? (
                        <div className="mt-5 rounded-xl border border-amber-200/60 bg-white/60 p-3 text-sm leading-relaxed text-amber-900">
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-800">
                            Payment
                          </p>
                          <p className="mt-1.5 whitespace-pre-line">
                            {job.paymentNotes}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ) : null}

              <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                  Voucher Summary
                </h3>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-sm text-[var(--text-muted)]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[var(--heading)]">
                    {formatMoney(Number(job.amount), job.currency)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Payment: {paymentMethodLabel(job.paymentMethod)} ·{" "}
                  {job.paymentStatus}
                </p>
              </section>

              <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[var(--surface-alt)] p-2">
                    <FileText className="h-4 w-4 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                      Before You Arrive
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      Please arrive 15 minutes before departure. Keep your
                      voucher ID handy on your phone. For changes, message us
                      on WhatsApp.
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
