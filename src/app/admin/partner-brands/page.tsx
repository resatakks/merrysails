import type { Metadata } from "next";
import { format } from "date-fns";
import { requireAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  PartnerBrandsManager,
  type PartnerReservationRow,
} from "@/components/admin/PartnerBrandsManager";
import {
  PARTNER_BRANDS,
  listAllPartnerReservations,
} from "@/lib/partner-brands";

export const metadata: Metadata = {
  title: "Partner Brands",
  robots: { index: false, follow: false },
};

// Reads live partner DBs at request time — never statically prerendered.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const BRAND_FILTERS = [
  { value: "all", label: "All brands" },
  ...PARTNER_BRANDS.map((b) => ({ value: b.key, label: b.label })),
];

export default async function AdminPartnerBrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; status?: string; q?: string }>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const brand = params.brand?.trim().toLowerCase() || "all";
  const status = params.status?.trim().toLowerCase() || "all";
  const query = params.q?.trim() || "";

  const results = await listAllPartnerReservations({
    brand,
    status,
    search: query,
  });

  const badgeByKey = Object.fromEntries(
    PARTNER_BRANDS.map((b) => [b.key, b.badgeClass])
  );

  const rows: PartnerReservationRow[] = results
    .filter((r) => r.state === "configured")
    .flatMap((r) =>
      r.reservations.map((reservation) => ({
        brandKey: reservation.brandKey,
        brandLabel: reservation.brandLabel,
        brandBadgeClass: badgeByKey[reservation.brandKey] ?? "",
        reservationId: reservation.reservationId,
        tourName: reservation.tourName,
        dateLabel: reservation.date
          ? format(new Date(reservation.date), "dd MMM yyyy")
          : null,
        time: reservation.time,
        guests: reservation.guests,
        totalPrice: reservation.totalPrice,
        currency: reservation.currency,
        status: reservation.status,
        customerName: reservation.customerName,
        customerEmail: reservation.customerEmail,
        customerPhone: reservation.customerPhone,
        customerCountry: reservation.customerCountry,
        notes: reservation.notes,
        createdAtLabel: reservation.createdAt
          ? format(new Date(reservation.createdAt), "dd MMM yyyy HH:mm")
          : null,
      }))
    )
    // Merge across brands, newest-first overall.
    .sort((a, b) => (a.createdAtLabel && b.createdAtLabel
      ? b.createdAtLabel.localeCompare(a.createdAtLabel)
      : 0));

  // Per-brand notices: which brands are unconfigured or errored, so the page
  // never silently hides a missing/broken connection.
  const unconfigured = results.filter((r) => r.state === "unconfigured");
  const errored = results.filter((r) => r.state === "error");
  const anyConfigured = results.some((r) => r.state === "configured");

  return (
    <AdminShell
      currentPath="/admin/partner-brands"
      title="Partner Brands"
      description="Unified, read-only view of sister-brand reservations — Luma Yacht and Vesper — pulled live from their own separate databases. Storage stays separate per brand; this tab is for visibility and basic status management."
    >
      {/* Configuration / connection notices */}
      {(unconfigured.length > 0 || errored.length > 0) && (
        <section className="mb-6 space-y-3">
          {!anyConfigured && (
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm">
              <p className="font-bold">No partner databases configured yet.</p>
              <p className="mt-2 leading-relaxed">
                Set the partner brands&rsquo; Neon connection strings to see
                their reservations here. Add{" "}
                <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                  LUMA_DATABASE_URL
                </code>{" "}
                and{" "}
                <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                  VESPER_DATABASE_URL
                </code>{" "}
                to the environment (Vercel project env, or a local gitignored
                env file). See{" "}
                <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                  .env.example
                </code>{" "}
                for the variable names.
              </p>
            </div>
          )}

          {anyConfigured &&
            unconfigured.map((r) => (
              <div
                key={r.brandKey}
                className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900"
              >
                <strong>{r.brandLabel}</strong> database URL is not configured —
                its reservations are not shown. Set its{" "}
                <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                  {PARTNER_BRANDS.find((b) => b.key === r.brandKey)?.envVar}
                </code>{" "}
                to enable it.
              </div>
            ))}

          {errored.map((r) => (
            <div
              key={r.brandKey}
              className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900"
            >
              <strong>{r.brandLabel}</strong> database could not be reached. Its
              reservations are temporarily unavailable.
              {r.error ? (
                <span className="mt-1 block font-mono text-xs text-rose-700/80">
                  {r.error}
                </span>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {anyConfigured && (
        <>
          <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
            <form className="grid gap-4 md:grid-cols-[180px_180px_1fr_auto]">
              <select
                name="brand"
                defaultValue={brand}
                className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                aria-label="Filter by brand"
              >
                {BRAND_FILTERS.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <select
                name="status"
                defaultValue={status}
                className="h-12 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                aria-label="Filter by status"
              >
                {STATUS_FILTERS.map((filter) => (
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

          <div className="mt-8">
            <PartnerBrandsManager reservations={rows} />
          </div>
        </>
      )}
    </AdminShell>
  );
}
