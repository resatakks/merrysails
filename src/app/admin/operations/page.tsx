import type { Metadata } from "next";
import Link from "next/link";
import {
  addDays,
  format,
  isSameDay,
  startOfDay,
  subDays,
} from "date-fns";
import { deleteTourOperationDayAction } from "@/app/actions/admin";
import { AdminManualReservationForm } from "@/components/admin/AdminManualReservationForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { getPriceMode, getTourBySlug, tours } from "@/data/tours";
import { listUpcomingTourOperations } from "@/lib/tour-operations";
import { normalizeReservationStatus } from "@/lib/reservation-status";

export const metadata: Metadata = {
  title: "Admin Operations",
  robots: { index: false, follow: false },
};

type OperationRange = "today" | "tomorrow" | "next-7" | "last-7" | "upcoming";

const rangeOptions: Array<{ value: OperationRange; label: string }> = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "next-7", label: "Next 7 days" },
  { value: "last-7", label: "Last 7 days" },
  { value: "upcoming", label: "Upcoming" },
];

function getRange(value?: string): {
  activeRange: OperationRange;
  start: Date;
  end: Date;
  label: string;
} {
  const today = startOfDay(new Date());

  switch (value) {
    case "tomorrow": {
      const tomorrow = addDays(today, 1);
      return {
        activeRange: "tomorrow",
        start: tomorrow,
        end: addDays(tomorrow, 1),
        label: format(tomorrow, "dd MMM yyyy"),
      };
    }
    case "next-7":
      return {
        activeRange: "next-7",
        start: today,
        end: addDays(today, 7),
        label: `${format(today, "dd MMM")} - ${format(addDays(today, 6), "dd MMM")}`,
      };
    case "last-7": {
      const start = subDays(today, 7);
      return {
        activeRange: "last-7",
        start,
        end: today,
        label: `${format(start, "dd MMM")} - ${format(subDays(today, 1), "dd MMM")}`,
      };
    }
    case "upcoming":
      return {
        activeRange: "upcoming",
        start: today,
        end: addDays(today, 30),
        label: "Next 30 days",
      };
    default:
      return {
        activeRange: "today",
        start: today,
        end: addDays(today, 1),
        label: format(today, "dd MMM yyyy"),
      };
  }
}

function money(value: number) {
  return `€${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function getStatusClass(status: string) {
  switch (normalizeReservationStatus(status)) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-800";
    case "completed":
      return "bg-sky-50 text-sky-800";
    case "cancelled":
      return "bg-rose-50 text-rose-800";
    default:
      return "bg-amber-50 text-amber-800";
  }
}

export default async function AdminOperationsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const { activeRange, start, end, label } = getRange(params.range);

  const [reservations, operations] = await Promise.all([
    prisma.reservation.findMany({
      where: {
        date: { gte: start, lt: end },
        status: { not: "cancelled" },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }, { createdAt: "asc" }],
      take: 160,
    }),
    listUpcomingTourOperations(),
  ]);

  const groupedReservations = reservations.reduce(
    (map, reservation) => {
      const key = format(new Date(reservation.date), "yyyy-MM-dd");
      const current = map.get(key) ?? [];
      current.push(reservation);
      map.set(key, current);
      return map;
    },
    new Map<string, typeof reservations>()
  );

  const activeRevenue = reservations.reduce(
    (sum, reservation) => sum + Number(reservation.totalPrice),
    0
  );
  const guestCount = reservations.reduce((sum, reservation) => sum + reservation.guests, 0);
  const confirmedCount = reservations.filter((reservation) =>
    ["confirmed", "completed"].includes(normalizeReservationStatus(reservation.status))
  ).length;

  const manualTourOptions = tours.map((tour) => {
    const priceMode = getPriceMode(tour);
    return {
      slug: tour.slug,
      name: tour.nameEn,
      defaultTime: tour.departureTime,
      defaultPrice: tour.priceEur,
      priceMode,
      packages: (tour.packages ?? []).map((pkg) => ({
        name: pkg.name,
        price: pkg.price,
        description: pkg.description,
      })),
      addOns: (tour.addOns ?? []).map((addOn) => {
        const match = addOn.price.match(/(\d+(?:[.,]\d+)?)/);
        const amount = match
          ? Number.parseFloat(match[1].replace(",", "."))
          : 0;
        const unit: "perPerson" | "perBooking" = /\/\s*person|\/ pp|per person/i.test(
          addOn.price
        )
          ? "perPerson"
          : "perBooking";
        return {
          name: addOn.name,
          price: addOn.price,
          amount: Number.isFinite(amount) ? amount : 0,
          unit,
        };
      }),
    };
  });

  return (
    <AdminShell
      currentPath="/admin/operations"
      title="Operations board"
      description="Fast reservation planning, manual booking creation, and upcoming operation-day overrides from one working screen."
    >
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-5">
          <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                  Quick filters
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
                  {label}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {rangeOptions.map((option) => (
                  <Link
                    key={option.value}
                    href={`/admin/operations?range=${option.value}`}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold transition-colors ${
                      activeRange === option.value
                        ? "bg-[var(--brand-primary)] !text-white"
                        : "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]/40"
                    }`}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {[
                { label: "Jobs", value: reservations.length },
                { label: "Guests", value: guestCount },
                { label: "Confirmed", value: confirmedCount },
                { label: "Revenue", value: money(activeRevenue) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {item.label}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[var(--heading)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="rounded-[2rem] border border-[var(--line)] bg-white p-8 text-sm text-[var(--text-muted)] shadow-sm">
                No active reservations in this range.
              </div>
            ) : (
              Array.from(groupedReservations.entries()).map(([dateKey, items]) => {
                const date = new Date(`${dateKey}T00:00:00`);
                return (
                  <section
                    key={dateKey}
                    className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-[var(--heading)]">
                          {isSameDay(date, new Date()) ? "Today" : format(date, "EEEE, dd MMM")}
                        </h2>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {items.length} jobs · {items.reduce((sum, item) => sum + item.guests, 0)} guests
                        </p>
                      </div>
                      <Link
                        href={`/admin/reservations?date=${dateKey}`}
                        className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)]"
                      >
                        Open day
                      </Link>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {items.map((reservation) => (
                        <article
                          key={reservation.id}
                          className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                                  {reservation.reservationId}
                                </span>
                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClass(reservation.status)}`}>
                                  {normalizeReservationStatus(reservation.status)}
                                </span>
                              </div>
                              <h3 className="mt-2 text-base font-bold text-[var(--heading)]">
                                {reservation.time} · {reservation.tourName}
                              </h3>
                              <p className="mt-1 text-sm text-[var(--text-muted)]">
                                {reservation.customerName} · {reservation.guests} guests · {reservation.customerPhone}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:justify-end">
                              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[var(--heading)]">
                                {money(Number(reservation.totalPrice))}
                              </span>
                              <Link
                                href={`/reservation/${reservation.reservationId}/voucher`}
                                className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-bold text-[var(--brand-primary)]"
                              >
                                Voucher
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Add reservation
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              Manual bookings use the same reservation page, invoice, voucher, and customer email template.
            </p>
            <div className="mt-6">
              <AdminManualReservationForm tours={manualTourOptions} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Upcoming operation days
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              Sold-out dates and departure overrides already saved in the system.
            </p>

            <div className="mt-5 space-y-3">
              {operations.length === 0 ? (
                <div className="rounded-2xl bg-[var(--surface-alt)] px-4 py-4 text-sm text-[var(--text-muted)]">
                  No operation day overrides yet.
                </div>
              ) : (
                operations.map((operation) => {
                  const tour = getTourBySlug(operation.tourSlug);

                  return (
                    <div
                      key={operation.id}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-bold text-[var(--heading)]">
                            {tour?.nameEn ?? operation.tourSlug}
                          </p>
                          <p className="mt-1 text-sm text-[var(--text-muted)]">
                            {operation.date}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {operation.isSoldOut && (
                              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                Sold out
                              </span>
                            )}
                            {operation.departureTimeOverride && (
                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                {operation.departureTimeOverride}
                              </span>
                            )}
                          </div>
                          {operation.note && (
                            <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                              {operation.note}
                            </p>
                          )}
                        </div>

                        <form action={deleteTourOperationDayAction}>
                          <input type="hidden" name="id" value={operation.id} />
                          <button
                            type="submit"
                            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-red-300 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
