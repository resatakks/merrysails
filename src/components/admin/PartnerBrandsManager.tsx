"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updatePartnerReservationStatusAction } from "@/app/actions/partner-brands";
import {
  getReservationStatusBadgeClass,
  getReservationStatusLabel,
  normalizeReservationStatus,
} from "@/lib/reservation-status";

export interface PartnerReservationRow {
  brandKey: string;
  brandLabel: string;
  brandBadgeClass: string;
  reservationId: string;
  tourName: string | null;
  dateLabel: string | null;
  time: string | null;
  guests: number | null;
  totalPrice: number | null;
  currency: string | null;
  status: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerCountry: string | null;
  notes: string | null;
  createdAtLabel: string | null;
}

interface PartnerBrandsManagerProps {
  reservations: PartnerReservationRow[];
}

function formatMoney(value: number | null, currency: string | null) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-";
  }
  const symbol = currency === "EUR" || !currency ? "€" : `${currency} `;
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function getActionClass(action: string, active: boolean) {
  if (active) {
    return "cursor-not-allowed bg-[var(--heading)] text-white opacity-80";
  }
  switch (action) {
    case "confirmed":
      return "bg-emerald-600 text-white hover:brightness-110";
    case "completed":
      return "bg-sky-600 text-white hover:brightness-110";
    case "cancelled":
      return "bg-rose-600 text-white hover:brightness-110";
    default:
      return "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]";
  }
}

function getStatusSurfaceClass(status: string) {
  switch (normalizeReservationStatus(status)) {
    case "new":
      return "bg-amber-50/35 hover:bg-amber-50/80";
    case "confirmed":
      return "bg-emerald-50/30 hover:bg-emerald-50/75";
    case "completed":
      return "bg-sky-50/30 hover:bg-sky-50/75";
    case "cancelled":
      return "bg-rose-50/20 hover:bg-rose-50/70";
    default:
      return "hover:bg-[var(--surface-alt)]/70";
  }
}

const rowActions = [
  { value: "confirmed", label: "Confirm" },
  { value: "completed", label: "Complete" },
  { value: "cancelled", label: "Cancel" },
] as const;

export function PartnerBrandsManager({
  reservations,
}: PartnerBrandsManagerProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const totalGuests = reservations.reduce(
    (sum, item) => sum + (item.guests ?? 0),
    0
  );

  const handleStatusChange = (row: PartnerReservationRow, nextStatus: string) => {
    startTransition(async () => {
      try {
        await updatePartnerReservationStatusAction({
          brandKey: row.brandKey,
          reservationId: row.reservationId,
          status: nextStatus,
        });
        setMessage(
          `${row.reservationId} updated to ${getReservationStatusLabel(nextStatus)}.`
        );
        setErrorMessage("");
        router.refresh();
      } catch (error) {
        const err = error as Error;
        setErrorMessage(err.message || "Something went wrong.");
        setMessage("");
      }
    });
  };

  const renderBrandBadge = (row: PartnerReservationRow) => (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${row.brandBadgeClass}`}
    >
      {row.brandLabel}
    </span>
  );

  const renderStatusBadge = (status: string) => {
    const normalizedStatus = normalizeReservationStatus(status);
    return (
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getReservationStatusBadgeClass(
          normalizedStatus
        )}`}
      >
        {getReservationStatusLabel(normalizedStatus)}
      </span>
    );
  };

  const renderActions = (row: PartnerReservationRow) => {
    const normalizedStatus = normalizeReservationStatus(row.status);
    return (
      <div className="flex flex-wrap gap-1.5">
        {rowActions.map((action) => {
          const active =
            normalizedStatus === normalizeReservationStatus(action.value);
          return (
            <button
              key={action.value}
              type="button"
              disabled={isPending || active}
              onClick={() => handleStatusChange(row, action.value)}
              className={`h-8 rounded-full px-3 text-xs font-bold transition-all disabled:cursor-not-allowed ${getActionClass(
                action.value,
                active
              )}`}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
        <div className="grid gap-4 border-b border-[var(--line)] bg-[linear-gradient(135deg,#ffffff,rgba(246,248,250,0.95))] p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              Partner Brands Desk
            </p>
            <h2 className="mt-2 text-xl font-bold text-[var(--heading)]">
              Luma Yacht &amp; Vesper reservations
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Unified, read-only view across the sister brands&rsquo; own
              databases. Status changes here update the brand&rsquo;s database
              but do <strong>not</strong> send that brand&rsquo;s customer email
              — use the brand&rsquo;s own panel if a status email is needed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center sm:min-w-[260px]">
            {[
              { label: "Bookings", value: reservations.length },
              { label: "Guests", value: totalGuests },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[var(--line)] bg-white px-3 py-3"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {item.label}
                </div>
                <div className="mt-1 text-lg font-bold text-[var(--heading)]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {(message || errorMessage) && (
          <div className="border-t border-[var(--line)] px-5 py-3 text-sm">
            {message ? <span className="text-emerald-700">{message}</span> : null}
            {errorMessage ? (
              <span className="text-rose-700">{errorMessage}</span>
            ) : null}
          </div>
        )}
      </section>

      {reservations.length === 0 ? (
        <div className="rounded-[2rem] border border-[var(--line)] bg-white p-8 text-sm text-[var(--text-muted)] shadow-sm">
          No partner reservations matched this filter.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <section className="hidden overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full border-collapse text-sm">
                <thead className="bg-[var(--surface-alt)] text-left text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  <tr>
                    <th scope="col" className="px-4 py-4">Brand</th>
                    <th scope="col" className="px-4 py-4">Reservation</th>
                    <th scope="col" className="px-4 py-4">Service</th>
                    <th scope="col" className="px-4 py-4 text-center">Guests</th>
                    <th scope="col" className="px-4 py-4 text-right">Total</th>
                    <th scope="col" className="px-4 py-4">Status</th>
                    <th scope="col" className="px-4 py-4">Workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {reservations.map((row) => {
                    const normalizedStatus = normalizeReservationStatus(
                      row.status
                    );
                    return (
                      <tr
                        key={`${row.brandKey}-${row.reservationId}`}
                        className={`align-top transition-colors ${getStatusSurfaceClass(
                          normalizedStatus
                        )}`}
                      >
                        <td className="px-4 py-4">{renderBrandBadge(row)}</td>
                        <td className="px-4 py-4">
                          <div className="font-mono text-xs font-bold text-[var(--brand-primary)]">
                            {row.reservationId}
                          </div>
                          <div className="mt-1 font-semibold text-[var(--heading)]">
                            {row.customerName ?? "—"}
                          </div>
                          <div className="mt-1 max-w-[230px] truncate text-xs text-[var(--text-muted)]">
                            {row.customerEmail ?? "—"}
                          </div>
                          <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                            {row.customerPhone ?? "—"}
                            {row.customerCountry ? ` · ${row.customerCountry}` : ""}
                          </div>
                          {row.notes ? (
                            <div className="mt-1 max-w-[230px] truncate text-[11px] italic text-[var(--text-muted)]">
                              {row.notes}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-[230px] font-semibold text-[var(--heading)]">
                            {row.tourName ?? "—"}
                          </div>
                          <div className="mt-1 text-xs text-[var(--text-muted)]">
                            {row.dateLabel ?? "—"}
                            {row.time ? ` · ${row.time}` : ""}
                          </div>
                          {row.createdAtLabel ? (
                            <div className="mt-1 text-xs text-[var(--text-muted)]">
                              Created {row.createdAtLabel}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-[var(--heading)]">
                          {row.guests ?? "—"}
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-[var(--heading)]">
                          {formatMoney(row.totalPrice, row.currency)}
                        </td>
                        <td className="px-4 py-4">
                          {renderStatusBadge(normalizedStatus)}
                        </td>
                        <td className="px-4 py-4">{renderActions(row)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mobile cards */}
          <section className="space-y-3 lg:hidden">
            {reservations.map((row) => {
              const normalizedStatus = normalizeReservationStatus(row.status);
              return (
                <article
                  key={`${row.brandKey}-${row.reservationId}`}
                  className={`rounded-[1.75rem] border border-[var(--line)] p-4 shadow-sm ${getStatusSurfaceClass(
                    normalizedStatus
                  )}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {renderBrandBadge(row)}
                    {renderStatusBadge(normalizedStatus)}
                  </div>
                  <p className="mt-3 font-mono text-xs font-bold text-[var(--brand-primary)]">
                    {row.reservationId}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-[var(--heading)]">
                    {row.customerName ?? "—"}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {row.tourName ?? "—"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                    {row.dateLabel ?? "—"}
                    {row.time ? ` · ${row.time}` : ""}
                    {row.guests != null ? ` · ${row.guests} guests` : ""}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3">
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Total
                      </div>
                      <div className="mt-1 text-sm font-bold text-[var(--heading)]">
                        {formatMoney(row.totalPrice, row.currency)}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3">
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Contact
                      </div>
                      <div className="mt-1 truncate text-xs text-[var(--heading)]">
                        {row.customerEmail ?? row.customerPhone ?? "—"}
                      </div>
                    </div>
                  </div>
                  {row.notes ? (
                    <p className="mt-3 text-[11px] italic text-[var(--text-muted)]">
                      {row.notes}
                    </p>
                  ) : null}
                  <div className="mt-4">{renderActions(row)}</div>
                </article>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
}
