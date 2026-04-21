import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusButtons } from "@/components/admin/AdminStatusButtons";

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "confirmed":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "completed":
      return "border-sky-200 bg-sky-50 text-sky-800";
    case "cancelled":
      return "border-rose-200 bg-rose-50 text-rose-800";
    default:
      return "border-[var(--line)] bg-[var(--surface-alt)] text-[var(--heading)]";
  }
}

export const metadata: Metadata = {
  title: "Admin Reservations",
  robots: { index: false, follow: false },
};

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const status = params.status?.trim().toLowerCase() || "all";
  const query = params.q?.trim() || "";

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(status !== "all" ? { status } : {}),
      ...(query
        ? {
            OR: [
              { reservationId: { contains: query, mode: "insensitive" } },
              { customerName: { contains: query, mode: "insensitive" } },
              { customerEmail: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
    take: 120,
  });

  const filters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminShell
      currentPath="/admin/reservations"
      title="Reservation manager"
      description="Review incoming reservations, search by guest or booking code, and update statuses without leaving the internal panel."
    >
      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
        <form className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
          <select
            name="status"
            defaultValue={status}
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>

          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search reservation ID, name, or email"
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-all hover:brightness-110"
          >
            Filter
          </button>
        </form>
      </section>

      <div className="mt-8 space-y-4">
        {reservations.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 text-sm text-[var(--text-muted)] shadow-sm">
            No reservations matched this filter.
          </div>
        ) : (
          reservations.map((reservation) => (
            <article
              key={reservation.id}
              className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
                    {reservation.reservationId}
                  </p>
                  <h2 className="text-xl font-bold text-[var(--heading)]">
                    {reservation.customerName}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    {reservation.customerEmail} · {reservation.customerPhone}
                  </p>
                  <p className="text-sm font-medium text-[var(--heading)]">
                    {reservation.tourName}
                  </p>
                </div>

                <div className="grid gap-2 text-sm text-[var(--text-muted)] sm:grid-cols-2 lg:min-w-[320px]">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Date
                    </div>
                    <div className="mt-1 text-[var(--heading)]">
                      {format(new Date(reservation.date), "dd MMM yyyy")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Time
                    </div>
                    <div className="mt-1 text-[var(--heading)]">
                      {reservation.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Guests
                    </div>
                    <div className="mt-1 text-[var(--heading)]">
                      {reservation.guests}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Total
                    </div>
                    <div className="mt-1 text-[var(--heading)]">
                      €{reservation.totalPrice}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em]">
                      Status
                    </div>
                    <div
                      className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${getStatusBadgeClass(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-[var(--line)] pt-5 lg:flex-row lg:items-center lg:justify-between">
                <AdminStatusButtons
                  reservationId={reservation.reservationId}
                  currentStatus={reservation.status}
                />

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/reservation/${reservation.reservationId}`}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  >
                    Reservation
                  </Link>
                  <Link
                    href={`/reservation/${reservation.reservationId}/invoice`}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  >
                    Invoice
                  </Link>
                  <Link
                    href={`/reservation/${reservation.reservationId}/voucher`}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  >
                    Voucher
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </AdminShell>
  );
}
