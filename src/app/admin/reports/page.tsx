import type { Metadata } from "next";
import {
  addDays,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCoreTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Admin Reports",
  robots: { index: false, follow: false },
};

function money(value: number) {
  return `€${value.toLocaleString("en-US")}`;
}

export default async function AdminReportsPage() {
  await requireAdminSession();

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const next14DaysEnd = addDays(today, 14);

  const [monthReservations, upcomingReservations] = await Promise.all([
    prisma.reservation.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    }),
    prisma.reservation.findMany({
      where: {
        date: { gte: today, lt: next14DaysEnd },
        status: { not: "cancelled" },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    }),
  ]);

  const statusSummary = ["pending", "confirmed", "completed", "cancelled"].map(
    (status) => {
      const items = monthReservations.filter((reservation) => reservation.status === status);
      return {
        status,
        count: items.length,
        revenue: items.reduce((sum, reservation) => sum + reservation.totalPrice, 0),
      };
    }
  );

  const totalRevenue = monthReservations
    .filter((reservation) => reservation.status !== "cancelled")
    .reduce((sum, reservation) => sum + reservation.totalPrice, 0);

  const totalGuests = monthReservations
    .filter((reservation) => reservation.status !== "cancelled")
    .reduce((sum, reservation) => sum + reservation.guests, 0);

  const productSummary = getCoreTours().map((tour) => {
    const items = monthReservations.filter((reservation) => reservation.tourSlug === tour.slug);
    const revenue = items
      .filter((reservation) => reservation.status !== "cancelled")
      .reduce((sum, reservation) => sum + reservation.totalPrice, 0);
    const guests = items
      .filter((reservation) => reservation.status !== "cancelled")
      .reduce((sum, reservation) => sum + reservation.guests, 0);

    return {
      slug: tour.slug,
      name: tour.nameEn,
      bookings: items.length,
      revenue,
      guests,
      share: totalRevenue > 0 ? revenue / totalRevenue : 0,
    };
  });

  const demandTimeline = Array.from({ length: 14 }, (_, index) => {
    const day = addDays(today, index);
    const key = format(day, "yyyy-MM-dd");
    const items = upcomingReservations.filter(
      (reservation) => format(new Date(reservation.date), "yyyy-MM-dd") === key
    );

    return {
      label: format(day, "dd MMM"),
      bookings: items.length,
      revenue: items.reduce((sum, reservation) => sum + reservation.totalPrice, 0),
    };
  });

  const peakBookings = Math.max(...demandTimeline.map((item) => item.bookings), 1);

  const departureWindows = Array.from(
    upcomingReservations.reduce((map, reservation) => {
      const key = `${reservation.time}|${reservation.tourName}`;
      const current = map.get(key) ?? {
        label: `${reservation.time} · ${reservation.tourName}`,
        bookings: 0,
        guests: 0,
      };

      current.bookings += 1;
      current.guests += reservation.guests;
      map.set(key, current);
      return map;
    }, new Map<string, { label: string; bookings: number; guests: number }>() ).values()
  )
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 8);

  return (
    <AdminShell
      currentPath="/admin/reports"
      title="Commercial reports"
      description="Revenue, guest volume, and core-product demand reporting for the current month plus a forward-looking 14-day booking pulse."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Month revenue", value: money(totalRevenue) },
          { label: "Month bookings", value: monthReservations.length },
          { label: "Month guests", value: totalGuests },
          {
            label: "Average booking value",
            value:
              monthReservations.length > 0
                ? money(totalRevenue / Math.max(monthReservations.length, 1))
                : "€0",
          },
        ].map((card) => (
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

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Core product revenue mix
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Which of the 3 flagship pages is driving the current month.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {productSummary.map((product) => (
              <div
                key={product.slug}
                className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface-alt)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-bold text-[var(--heading)]">
                      {product.name}
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-muted)]">
                      {product.bookings} bookings · {product.guests} guests
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[var(--heading)]">
                      {money(product.revenue)}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {(product.share * 100).toFixed(0)}% revenue share
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-gold))]"
                    style={{ width: `${Math.max(product.share * 100, product.revenue > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Status breakdown
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Operational confidence for current-month reservations.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {statusSummary.map((item) => (
              <div
                key={item.status}
                className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold capitalize text-[var(--heading)]">
                    {item.status}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {item.count} bookings
                  </div>
                </div>
                <div className="mt-2 text-lg font-bold text-[var(--heading)]">
                  {money(item.revenue)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Next 14 days booking pulse
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Quick demand line to see where the next busy days are stacking up.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {demandTimeline.map((day) => (
              <div key={day.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-[var(--heading)]">{day.label}</span>
                  <span className="text-[var(--text-muted)]">
                    {day.bookings} bookings · {money(day.revenue)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-alt)]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cta-end))]"
                    style={{ width: `${Math.max((day.bookings / peakBookings) * 100, day.bookings > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Busiest departure windows
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              The strongest short-term operating slots by time and product.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {departureWindows.length === 0 ? (
              <div className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4 text-sm text-[var(--text-muted)]">
                No upcoming bookings in the next 14 days yet.
              </div>
            ) : (
              departureWindows.map((slot) => (
                <div
                  key={slot.label}
                  className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <div className="text-sm font-semibold text-[var(--heading)]">
                    {slot.label}
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-muted)]">
                    {slot.bookings} bookings · {slot.guests} guests
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
