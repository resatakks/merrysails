import type { Metadata } from "next";
import { deleteTourOperationDayAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { OperationDayForm } from "@/components/admin/OperationDayForm";
import { requireAdminSession } from "@/lib/admin-auth";
import { getTourBySlug } from "@/data/tours";
import { listUpcomingTourOperations } from "@/lib/tour-operations";

export const metadata: Metadata = {
  title: "Admin Operations",
  robots: { index: false, follow: false },
};

export default async function AdminOperationsPage() {
  await requireAdminSession();

  const operations = await listUpcomingTourOperations();

  return (
    <AdminShell
      currentPath="/admin/operations"
      title="Availability & departure control"
      description="Manage real sold-out days and per-date departure-time overrides for the 3 core products. The booking calendar now reads from this data instead of fake sold-out dates."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--heading)]">
            Create or update operation day
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            Set a specific day as sold out or override the departure time for
            that day.
          </p>

          <div className="mt-6">
            <OperationDayForm />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--heading)]">
            Upcoming operation days
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            These overrides feed the live booking calendar and admin planning.
          </p>

          <div className="mt-6 space-y-3">
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
                    className="rounded-2xl border border-[var(--line)] px-4 py-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[var(--heading)]">
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
                              {operation.departureTimeOverride} override
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
                          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-red-300 hover:text-red-600"
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
      </div>
    </AdminShell>
  );
}
