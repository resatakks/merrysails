import type { Metadata } from "next";
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminReservationManager } from "@/components/admin/AdminReservationManager";
import { normalizeReservationStatus } from "@/lib/reservation-status";

type ReservationAttributionFields = {
  gclid: string | null;
  trafficChannel: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrerHost: string | null;
};

function summarizeAttribution(r: ReservationAttributionFields): {
  channel: string;
  detail: string | null;
} {
  if (r.gclid) {
    return {
      channel: "Google Ads",
      detail: r.utmCampaign ?? `gclid:${r.gclid.slice(0, 10)}…`,
    };
  }
  if (r.trafficChannel === "google_ads") {
    return { channel: "Google Ads", detail: r.utmCampaign };
  }
  if (r.trafficChannel === "organic_search") {
    return { channel: "SEO", detail: r.utmSource };
  }
  if (r.trafficChannel === "paid_search") {
    return { channel: "Paid Search", detail: r.utmSource };
  }
  if (r.trafficChannel === "social") {
    return { channel: "Social", detail: r.utmSource };
  }
  if (r.trafficChannel === "email") {
    return { channel: "Email", detail: r.utmCampaign };
  }
  if (r.trafficChannel === "referral") {
    return { channel: "Referral", detail: r.referrerHost };
  }
  if (r.trafficChannel === "direct") {
    return { channel: "Direct", detail: null };
  }
  return { channel: "Unknown", detail: null };
}

export const metadata: Metadata = {
  title: "Admin Reservations",
  robots: { index: false, follow: false },
};

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; date?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const status = params.status?.trim().toLowerCase() || "all";
  const query = params.q?.trim() || "";
  const date = params.date?.trim() || "";
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const selectedDate = dateMatch
    ? new Date(
        Date.UTC(
          Number(dateMatch[1]),
          Number(dateMatch[2]) - 1,
          Number(dateMatch[3])
        )
      )
    : null;
  const selectedDateEnd = selectedDate
    ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
    : null;

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(status !== "all"
        ? status === "new"
          ? { status: { in: ["new", "pending"] } }
          : { status }
        : {}),
      ...(query
        ? {
            OR: [
              { reservationId: { contains: query, mode: "insensitive" } },
              { customerName: { contains: query, mode: "insensitive" } },
              { customerEmail: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(selectedDate && selectedDateEnd
        ? { date: { gte: selectedDate, lt: selectedDateEnd } }
        : {}),
    },
    orderBy: [{ createdAt: "desc" }],
    take: 120,
  });

  const filters = [
    { value: "all", label: "All" },
    { value: "new", label: "New" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminShell
      currentPath="/admin/reservations"
      title="Reservation manager"
      description="Review new reservations by creation time, manage confirmation and completion flow, and track EUR cost before marking bookings as completed."
    >
      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
        <form className="grid gap-4 md:grid-cols-[180px_180px_1fr_auto]">
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
            type="date"
            name="date"
            defaultValue={date}
            className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />

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

      <div className="mt-8">
        <AdminReservationManager
          reservations={reservations.map((reservation) => ({
            id: reservation.id,
            reservationId: reservation.reservationId,
            customerName: reservation.customerName,
            customerEmail: reservation.customerEmail,
            customerPhone: reservation.customerPhone,
            tourName: reservation.tourName,
            dateLabel: format(new Date(reservation.date), "dd MMM yyyy"),
            dateInput: format(new Date(reservation.date), "yyyy-MM-dd"),
            time: reservation.time,
            guests: reservation.guests,
            totalPrice: Number(reservation.totalPrice),
            status: normalizeReservationStatus(reservation.status),
            createdAtLabel: format(new Date(reservation.createdAt), "dd MMM yyyy"),
            createdTimeLabel: format(new Date(reservation.createdAt), "HH:mm"),
            internalCostEur:
              typeof reservation.internalCostEur === "number"
                ? Number(reservation.internalCostEur)
                : null,
            confirmedAtLabel: reservation.confirmedAt
              ? format(new Date(reservation.confirmedAt), "dd MMM HH:mm")
              : null,
            completedAtLabel: reservation.completedAt
              ? format(new Date(reservation.completedAt), "dd MMM HH:mm")
              : null,
            attribution: summarizeAttribution(reservation),
          }))}
        />
      </div>
    </AdminShell>
  );
}
