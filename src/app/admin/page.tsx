import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { getCoreTours, getTourBySlug } from "@/data/tours";
import { listUpcomingTourOperations } from "@/lib/tour-operations";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);

  const [pendingCount, confirmedTodayCount, upcomingReservations, operations] =
    await Promise.all([
      prisma.reservation.count({ where: { status: "pending" } }),
      prisma.reservation.count({
        where: {
          status: "confirmed",
          date: { gte: today, lt: tomorrow },
        },
      }),
      prisma.reservation.findMany({
        where: {
          date: { gte: today },
          status: { not: "cancelled" },
        },
        orderBy: [{ date: "asc" }, { createdAt: "asc" }],
        take: 8,
      }),
      listUpcomingTourOperations(),
    ]);

  const soldOutCount = operations.filter((item) => item.isSoldOut).length;
  const timeOverrideCount = operations.filter(
    (item) => item.departureTimeOverride
  ).length;

  const summaryCards = [
    {
      label: "Pending reservations",
      value: pendingCount,
    },
    {
      label: "Confirmed for today",
      value: confirmedTodayCount,
    },
    {
      label: "Sold-out operation days",
      value: soldOutCount,
    },
    {
      label: "Departure overrides",
      value: timeOverrideCount,
    },
  ];

  return (
    <AdminShell
      currentPath="/admin"
      title="Operations dashboard"
      description="Keep reservation status, operational availability, and the 3 core product flow aligned from one internal control area."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-[var(--text-muted)]">{card.label}</div>
            <div className="mt-2 text-3xl font-bold text-[var(--heading)]">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--heading)]">
                Upcoming reservations
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Quick view of the next operational bookings.
              </p>
            </div>
            <Link
              href="/admin/reservations"
              className="text-sm font-semibold text-[var(--brand-primary)]"
            >
              Open reservations
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {upcomingReservations.length === 0 ? (
              <div className="rounded-2xl bg-[var(--surface-alt)] px-4 py-4 text-sm text-[var(--text-muted)]">
                No upcoming reservations found.
              </div>
            ) : (
              upcomingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-2xl border border-[var(--line)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                        {reservation.reservationId}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.customerName}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {reservation.tourName}
                      </p>
                    </div>
                    <div className="text-right text-sm text-[var(--text-muted)]">
                      <div>{format(new Date(reservation.date), "dd MMM yyyy")}</div>
                      <div>{reservation.time}</div>
                      <div className="mt-1 font-semibold text-[var(--heading)]">
                        {reservation.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--heading)]">
                Core product health
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Quick links for the 3 revenue pages and current operation day
                count.
              </p>
            </div>
            <Link
              href="/admin/operations"
              className="text-sm font-semibold text-[var(--brand-primary)]"
            >
              Manage operations
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {getCoreTours().map((tour) => {
              const operationCount = operations.filter(
                (item) => item.tourSlug === tour.slug
              ).length;

              return (
                <div
                  key={tour.slug}
                  className="rounded-2xl border border-[var(--line)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--heading)]">
                        {tour.nameEn}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {tour.packages?.length ?? 0} packages · {tour.departurePoint}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[var(--heading)]">
                        {operationCount} op day
                        {operationCount === 1 ? "" : "s"}
                      </p>
                      <Link
                        href={getTourBySlug(tour.slug)?.canonicalPath ?? "/cruises"}
                        className="mt-1 inline-block text-sm font-semibold text-[var(--brand-primary)]"
                      >
                        Open page
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
