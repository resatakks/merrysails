import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminExternalJobForm } from "@/components/admin/AdminExternalJobForm";

export const metadata: Metadata = {
  title: "Admin · External Work",
  robots: { index: false, follow: false },
};

const STATUS_TONES: Record<string, string> = {
  new: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  completed: "border-sky-200 bg-sky-50 text-sky-800",
  cancelled: "border-rose-200 bg-rose-50 text-rose-800",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const PAYMENT_LABELS: Record<string, string> = {
  pending: "Payment pending",
  paid: "Paid",
  refunded: "Refunded",
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

export default async function AdminExternalPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const status = params.status?.trim().toLowerCase() || "all";
  const query = params.q?.trim() || "";

  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (query) {
    where.OR = [
      { jobId: { contains: query, mode: "insensitive" } },
      { companyName: { contains: query, mode: "insensitive" } },
      { customerName: { contains: query, mode: "insensitive" } },
      { serviceTitle: { contains: query, mode: "insensitive" } },
    ];
  }

  const jobs = await prisma.externalJob.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const counts = await prisma.externalJob.groupBy({
    by: ["status"],
    _count: { status: true },
  });
  const countByStatus = counts.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = row._count.status;
    return acc;
  }, {});
  const totalCount = jobs.length;

  const tabs: Array<{ key: string; label: string }> = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "confirmed", label: "Confirmed" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminShell
      currentPath="/admin/external"
      title="External Work"
      description="Voucher and invoice records issued on behalf of other companies — independent of the website's own tours."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-5">
          <div className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm">
            <form className="flex flex-wrap items-center gap-3">
              {tabs.map((tab) => {
                const active = tab.key === status;
                const count =
                  tab.key === "all" ? totalCount : countByStatus[tab.key] ?? 0;
                return (
                  <Link
                    key={tab.key}
                    href={`/admin/external?status=${tab.key}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                      active
                        ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                        : "border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]/40"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`rounded-full px-2 text-[11px] font-bold ${active ? "bg-white/20" : "bg-[var(--surface-alt)] text-[var(--text-muted)]"}`}
                    >
                      {count}
                    </span>
                  </Link>
                );
              })}
              <div className="ml-auto">
                <input
                  type="search"
                  name="q"
                  placeholder="Search company, customer, service…"
                  defaultValue={query}
                  className="h-10 rounded-full border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
                {status !== "all" ? (
                  <input type="hidden" name="status" value={status} />
                ) : null}
              </div>
            </form>
          </div>

          <div className="space-y-3">
            {jobs.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white p-10 text-center text-sm text-[var(--text-muted)]">
                No external jobs match the current filter. Create one from the
                form on the right.
              </div>
            ) : (
              jobs.map((job) => {
                const statusKey = job.status in STATUS_LABELS ? job.status : "new";
                const paymentKey =
                  job.paymentStatus in PAYMENT_LABELS
                    ? job.paymentStatus
                    : "pending";

                return (
                  <article
                    key={job.id}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-xs font-bold text-[var(--brand-primary)]">
                            {job.jobId}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_TONES[statusKey] ?? STATUS_TONES.new}`}
                          >
                            {STATUS_LABELS[statusKey]}
                          </span>
                          <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                            {PAYMENT_LABELS[paymentKey]}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--heading)]">
                          {job.serviceTitle}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          <strong>{job.companyName}</strong> →{" "}
                          {job.customerName}
                          {job.customerPhone ? ` · ${job.customerPhone}` : ""}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {format(new Date(job.jobDate), "EEE, dd MMM yyyy")}
                          {job.jobTime ? ` · ${job.jobTime}` : ""}
                          {job.guests > 1 ? ` · ${job.guests} pax` : ""}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:justify-end">
                        <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1.5 text-sm font-bold text-[var(--heading)]">
                          {formatMoney(Number(job.amount), job.currency)}
                        </span>
                        <Link
                          href={`/external/${job.jobId}/voucher`}
                          className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)]"
                        >
                          Voucher
                        </Link>
                        <Link
                          href={`/external/${job.jobId}/invoice`}
                          className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)]"
                        >
                          Invoice
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <aside>
          <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Add external job
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              The voucher and invoice will render the external company&apos;s
              branding — logo, address, tax ID — not ours.
            </p>
            <div className="mt-6">
              <AdminExternalJobForm />
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
