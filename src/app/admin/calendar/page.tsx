import type { Metadata } from "next";
import Link from "next/link";
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { getTourBySlug } from "@/data/tours";
import { normalizeReservationStatus } from "@/lib/reservation-status";

export const metadata: Metadata = {
  title: "Admin Calendar",
  robots: { index: false, follow: false },
};

function getMonthFromQuery(value?: string) {
  if (!value) {
    return startOfMonth(new Date());
  }

  const parsed = parse(value, "yyyy-MM", new Date());
  return Number.isNaN(parsed.getTime()) ? startOfMonth(new Date()) : startOfMonth(parsed);
}

function getStatusClass(status: string) {
  switch (normalizeReservationStatus(status)) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-800";
    case "completed":
      return "bg-sky-50 text-sky-800";
    case "new":
      return "bg-amber-50 text-amber-800";
    case "cancelled":
      return "bg-rose-50 text-rose-800";
    default:
      return "bg-[var(--surface-alt)] text-[var(--heading)]";
  }
}

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const activeMonth = getMonthFromQuery(params.month);
  const monthStart = startOfMonth(activeMonth);
  const monthEnd = endOfMonth(activeMonth);

  const [reservations, operations] = await Promise.all([
    prisma.reservation.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }, { createdAt: "asc" }],
    }),
    prisma.tourOperationDay.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
      orderBy: [{ date: "asc" }, { tourSlug: "asc" }],
    }),
  ]);

  const reservationMap = new Map<string, typeof reservations>();
  for (const reservation of reservations) {
    const key = format(new Date(reservation.date), "yyyy-MM-dd");
    const current = reservationMap.get(key) ?? [];
    current.push(reservation);
    reservationMap.set(key, current);
  }

  const operationMap = new Map<string, typeof operations>();
  for (const operation of operations) {
    const key = format(new Date(operation.date), "yyyy-MM-dd");
    const current = operationMap.get(key) ?? [];
    current.push(operation);
    operationMap.set(key, current);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
  });

  const upcomingReservations = await prisma.reservation.findMany({
    where: {
      date: { gte: new Date() },
      status: { not: "cancelled" },
    },
    orderBy: [{ date: "asc" }, { time: "asc" }],
    take: 10,
  });

  const soldOutDays = operations.filter((item) => item.isSoldOut);
  const calendarToday = new Date();
  const calendarTomorrow = new Date(calendarToday);
  calendarTomorrow.setDate(calendarToday.getDate() + 1);
  const todayKey = format(calendarToday, "yyyy-MM-dd");
  const tomorrowKey = format(calendarTomorrow, "yyyy-MM-dd");
  const todayReservations = reservationMap.get(todayKey) ?? [];
  const tomorrowReservations = reservationMap.get(tomorrowKey) ?? [];

  return (
    <AdminShell
      currentPath="/admin/calendar"
      title="Reservation calendar"
      description="Monthly service board for the 3 core products, sold-out controls, and fast visibility into what is happening on each date."
    >
      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
              Monthly board
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
              {format(activeMonth, "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/calendar?month=${format(subMonths(activeMonth, 1), "yyyy-MM")}`}
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]"
            >
              Previous month
            </Link>
            <Link
              href={`/admin/calendar?month=${format(new Date(), "yyyy-MM")}`}
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]"
            >
              Current month
            </Link>
            <Link
              href={`/admin/calendar?month=${format(addMonths(activeMonth, 1), "yyyy-MM")}`}
              className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Next month
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            { label: "Today bookings", value: todayReservations.length },
            {
              label: "Today guests",
              value: todayReservations.reduce((sum, reservation) => sum + reservation.guests, 0),
            },
            { label: "Tomorrow bookings", value: tomorrowReservations.length },
            {
              label: "Tomorrow guests",
              value: tomorrowReservations.reduce((sum, reservation) => sum + reservation.guests, 0),
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {card.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--heading)]">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="rounded-xl bg-[var(--surface-alt)] px-2 py-3">
              {day}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-7">
          {days.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const dayReservations = reservationMap.get(key) ?? [];
            const dayOperations = operationMap.get(key) ?? [];

            return (
              <div
                key={key}
                className={`min-h-[180px] rounded-[1.5rem] border p-3 ${
                  isSameMonth(day, activeMonth)
                    ? "border-[var(--line)] bg-white"
                    : "border-transparent bg-[var(--surface-alt)]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      isToday(day)
                        ? "bg-[var(--brand-primary)] text-white"
                        : "bg-[var(--surface-alt)] text-[var(--heading)]"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="text-[11px] font-semibold text-[var(--text-muted)]">
                    {dayReservations.length} bookings
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {dayOperations
                    .filter((operation) => operation.isSoldOut || operation.departureTimeOverride)
                    .slice(0, 2)
                    .map((operation) => {
                      const tour = getTourBySlug(operation.tourSlug);
                      return (
                        <div
                          key={operation.id}
                          className="rounded-xl bg-[#fff7ed] px-2.5 py-2 text-[11px] leading-relaxed text-[#9a3412]"
                        >
                          <div className="font-bold">
                            {tour?.nameEn ?? operation.tourSlug}
                          </div>
                          <div>
                            {operation.isSoldOut ? "Sold out" : "Time override"}
                            {operation.departureTimeOverride
                              ? ` · ${operation.departureTimeOverride}`
                              : ""}
                          </div>
                        </div>
                      );
                    })}

                  {dayReservations.slice(0, 3).map((reservation) => (
                    <div
                      key={reservation.id}
                      className={`rounded-xl px-2.5 py-2 text-[11px] leading-relaxed ${getStatusClass(
                        reservation.status
                      )}`}
                    >
                      <div className="font-bold">
                        {reservation.time} · {reservation.tourName}
                      </div>
                      <div className="truncate">
                        {reservation.customerName} · {reservation.guests} guests
                      </div>
                    </div>
                  ))}

                  {dayReservations.length > 3 ? (
                    <div className="text-[11px] font-semibold text-[var(--brand-primary)]">
                      +{dayReservations.length - 3} more reservations
                    </div>
                  ) : null}
                </div>

                {dayReservations.length > 0 ? (
                  <Link
                    href={`/admin/reservations?date=${key}`}
                    className="mt-3 inline-flex rounded-full bg-[var(--surface-alt)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)] transition-colors hover:bg-white"
                  >
                    View day
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--heading)]">
                Next departures
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Immediate operational queue for the next service windows.
              </p>
            </div>
            <Link
              href="/admin/reservations"
              className="text-sm font-semibold text-[var(--brand-primary)]"
            >
              Open reservation manager
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                      {reservation.reservationId}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {reservation.customerName}
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-muted)]">
                      {reservation.tourName}
                    </div>
                  </div>
                  <div className="text-right text-sm text-[var(--text-muted)]">
                    <div>{format(new Date(reservation.date), "dd MMM yyyy")}</div>
                    <div>{reservation.time}</div>
                    <div className="mt-1 font-semibold text-[var(--heading)]">
                      {reservation.guests} guests
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--heading)]">
            Sold-out and override alerts
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Fast view of operation-day changes in the selected month.
          </p>

          <div className="mt-5 space-y-3">
            {soldOutDays.length === 0 ? (
              <div className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4 text-sm text-[var(--text-muted)]">
                No sold-out service days in this month yet.
              </div>
            ) : (
              soldOutDays.map((item) => {
                const tour = getTourBySlug(item.tourSlug);

                return (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                  >
                    <div className="text-sm font-semibold text-[var(--heading)]">
                      {tour?.nameEn ?? item.tourSlug}
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-muted)]">
                      {format(new Date(item.date), "dd MMM yyyy")}
                    </div>
                    {item.departureTimeOverride ? (
                      <div className="mt-2 text-sm text-[var(--heading)]">
                        Override: {item.departureTimeOverride}
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
