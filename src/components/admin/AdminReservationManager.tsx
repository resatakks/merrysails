"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  bulkUpdateReservationsAdminAction,
  deleteReservationAdminAction,
  resendReservationCustomerEmailAdminAction,
  saveReservationInternalCostAdminAction,
  updateReservationDetailsAdminAction,
  updateReservationStatusAdminAction,
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getReservationStatusBadgeClass,
  getReservationStatusLabel,
  normalizeReservationStatus,
} from "@/lib/reservation-status";

interface AdminReservationItem {
  id: string;
  reservationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourName: string;
  dateLabel: string;
  dateInput: string;
  time: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAtLabel: string;
  createdTimeLabel: string;
  internalCostEur: number | null;
  confirmedAtLabel?: string | null;
  completedAtLabel?: string | null;
  attribution?: { channel: string; detail: string | null };
}

function attributionChipClass(channel: string): string {
  switch (channel) {
    case "Google Ads":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "SEO":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "Paid Search":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Social":
      return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200";
    case "Email":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Referral":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "Direct":
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

interface AdminReservationManagerProps {
  reservations: AdminReservationItem[];
}

interface EditableReservationFields {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: string;
  totalPrice: string;
}

function formatMoney(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-";
  }

  return `€${value.toLocaleString("en-US", {
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

const bulkActions = [
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirm" },
  { value: "completed", label: "Complete" },
  { value: "cancelled", label: "Cancel" },
] as const;

export function AdminReservationManager({
  reservations,
}: AdminReservationManagerProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [costs, setCosts] = useState<Record<string, string>>(
    Object.fromEntries(
      reservations.map((reservation) => [
        reservation.reservationId,
        typeof reservation.internalCostEur === "number"
          ? String(reservation.internalCostEur)
          : "",
      ])
    )
  );
  const [editForms, setEditForms] = useState<Record<string, EditableReservationFields>>(
    Object.fromEntries(
      reservations.map((reservation) => [
        reservation.reservationId,
        {
          customerName: reservation.customerName,
          customerEmail: reservation.customerEmail,
          customerPhone: reservation.customerPhone,
          date: reservation.dateInput,
          time: reservation.time,
          guests: String(reservation.guests),
          totalPrice: String(reservation.totalPrice),
        },
      ])
    )
  );
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const activeEditReservation = activeEditId
    ? reservations.find((item) => item.reservationId === activeEditId)
    : null;
  const activeEditValues = activeEditId ? editForms[activeEditId] : null;

  const allVisibleSelected =
    reservations.length > 0 &&
    reservations.every((reservation) => selectedIds.includes(reservation.reservationId));

  const normalizedCostMap = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(costs).map(([reservationId, value]) => {
          const parsed = Number.parseFloat(value.replace(",", "."));
          return [
            reservationId,
            Number.isFinite(parsed) && parsed >= 0
              ? Math.round(parsed * 100) / 100
              : null,
          ];
        })
      ),
    [costs]
  );

  const selectedCount = selectedIds.length;
  const totalGuests = reservations.reduce((sum, item) => sum + item.guests, 0);
  const activeRevenue = reservations
    .filter((item) => normalizeReservationStatus(item.status) !== "cancelled")
    .reduce((sum, item) => sum + item.totalPrice, 0);
  const knownCost = reservations.reduce(
    (sum, item) => sum + (item.internalCostEur ?? 0),
    0
  );

  const setSuccess = (value: string) => {
    setMessage(value);
    setErrorMessage("");
  };

  const setFailure = (value: string) => {
    setErrorMessage(value);
    setMessage("");
  };

  const runAsync = (
    fn: () => Promise<void>,
    successMessage: string,
    onSuccess?: () => void
  ) => {
    startTransition(async () => {
      try {
        await fn();
        setSuccess(successMessage);
        onSuccess?.();
        router.refresh();
      } catch (error) {
        const err = error as Error;
        setFailure(err.message || "Something went wrong.");
      }
    });
  };

  const toggleAll = () => {
    setSelectedIds(
      allVisibleSelected
        ? []
        : reservations.map((reservation) => reservation.reservationId)
    );
  };

  const toggleOne = (reservationId: string) => {
    setSelectedIds((current) =>
      current.includes(reservationId)
        ? current.filter((id) => id !== reservationId)
        : [...current, reservationId]
    );
  };

  const handleCostChange = (reservationId: string, value: string) => {
    setCosts((current) => ({
      ...current,
      [reservationId]: value,
    }));
  };

  const handleSaveCost = (reservationId: string) => {
    const internalCostEur = normalizedCostMap[reservationId] ?? null;
    runAsync(
      () =>
        saveReservationInternalCostAdminAction({
          reservationId,
          internalCostEur,
        }),
      `Cost saved for ${reservationId}.`
    );
  };

  const handleEditField = (
    reservationId: string,
    field: keyof EditableReservationFields,
    value: string
  ) => {
    setEditForms((current) => ({
      ...current,
      [reservationId]: {
        ...current[reservationId],
        [field]: value,
      },
    }));
  };

  const handleSaveDetails = (reservationId: string) => {
    const values = editForms[reservationId];

    if (!values) {
      setFailure("Reservation details are not loaded.");
      return;
    }

    const guests = Number.parseInt(values.guests, 10);
    const totalPrice = Number.parseFloat(values.totalPrice.replace(",", "."));

    if (!Number.isFinite(guests) || guests < 1) {
      setFailure("Guest count must be at least 1.");
      return;
    }

    if (!Number.isFinite(totalPrice) || totalPrice < 0) {
      setFailure("Sale price must be zero or higher.");
      return;
    }

    runAsync(
      () =>
        updateReservationDetailsAdminAction({
          reservationId,
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          customerPhone: values.customerPhone,
          date: values.date,
          time: values.time,
          guests,
          totalPrice,
        }),
      `${reservationId} details saved.`,
      () => setActiveEditId(null)
    );
  };

  const handleDeleteReservation = () => {
    if (!deleteCandidateId) {
      return;
    }

    runAsync(
      () =>
        deleteReservationAdminAction({
          reservationId: deleteCandidateId,
          confirmationReservationId: deleteCandidateId,
        }),
      `${deleteCandidateId} deleted.`,
      () => setDeleteCandidateId(null)
    );
  };

  const handleResendEmail = (reservationId: string) => {
    runAsync(
      () => resendReservationCustomerEmailAdminAction({ reservationId }),
      `Customer email resent for ${reservationId}.`
    );
  };

  const handleStatusChange = (reservationId: string, nextStatus: string) => {
    const internalCostEur = normalizedCostMap[reservationId] ?? null;

    if (
      normalizeReservationStatus(nextStatus) === "completed" &&
      internalCostEur === null &&
      !reservations.find((item) => item.reservationId === reservationId)?.internalCostEur
    ) {
      setFailure("Enter an internal EUR cost before marking a reservation as completed.");
      return;
    }

    const formData = new FormData();
    formData.set("reservationId", reservationId);
    formData.set("status", nextStatus);

    if (internalCostEur !== null) {
      formData.set("internalCostEur", String(internalCostEur));
    }

    runAsync(
      () => updateReservationStatusAdminAction(formData),
      `${reservationId} updated to ${getReservationStatusLabel(nextStatus)}.`
    );
  };

  const handleBulkAction = (nextStatus: string) => {
    if (selectedIds.length === 0) {
      setFailure("Select at least one reservation first.");
      return;
    }

    if (normalizeReservationStatus(nextStatus) === "completed") {
      const missingCosts = reservations.filter(
        (reservation) =>
          selectedIds.includes(reservation.reservationId) &&
          normalizedCostMap[reservation.reservationId] === null &&
          typeof reservation.internalCostEur !== "number"
      );

      if (missingCosts.length > 0) {
        setFailure(
          `Add EUR cost before completing: ${missingCosts
            .map((item) => item.reservationId)
            .join(", ")}`
        );
        return;
      }
    }

    runAsync(
      async () => {
        await bulkUpdateReservationsAdminAction({
          reservationIds: selectedIds,
          status: nextStatus,
          internalCosts: normalizedCostMap,
        });
        setSelectedIds([]);
      },
      `${selectedIds.length} reservation(s) updated to ${getReservationStatusLabel(nextStatus)}.`
    );
  };

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

  const renderCostEditor = (reservation: AdminReservationItem, compact = false) => (
    <div className={`flex ${compact ? "gap-2" : "items-center gap-2"}`}>
      <input
        type="number"
        min="0"
        step="0.01"
        value={costs[reservation.reservationId] ?? ""}
        onChange={(event) =>
          handleCostChange(reservation.reservationId, event.target.value)
        }
        className={`h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)] ${
          compact ? "w-full" : "w-24"
        }`}
        placeholder="Cost"
        aria-label={`Internal EUR cost for ${reservation.reservationId}`}
      />
      <button
        type="button"
        onClick={() => handleSaveCost(reservation.reservationId)}
        disabled={isPending}
        className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-xs font-bold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
        <div className="grid gap-4 border-b border-[var(--line)] bg-[linear-gradient(135deg,#ffffff,rgba(246,248,250,0.95))] p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              Reservation Desk
            </p>
            <h2 className="mt-2 text-xl font-bold text-[var(--heading)]">
              Compact operations table
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Scan service date, customer, status, sale, cost, and documents without opening every booking card.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[390px]">
            {[
              { label: "Bookings", value: reservations.length },
              { label: "Guests", value: totalGuests },
              { label: "Revenue", value: formatMoney(activeRevenue) },
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

        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleAll}
              className="h-10 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              {allVisibleSelected ? "Clear selection" : "Select visible"}
            </button>
            <span className="rounded-full bg-[var(--surface-alt)] px-3 py-2 text-sm font-semibold text-[var(--heading)]">
              {selectedCount} selected
            </span>
            <span className="hidden rounded-full bg-[var(--surface-alt)] px-3 py-2 text-sm font-semibold text-[var(--text-muted)] sm:inline-flex">
              Known cost {formatMoney(knownCost)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {bulkActions.map((action) => (
              <button
                key={action.value}
                type="button"
                onClick={() => handleBulkAction(action.value)}
                disabled={isPending || selectedCount === 0}
                className={`h-10 rounded-full px-4 text-sm font-semibold transition-all ${
                  selectedCount === 0 || isPending
                    ? "cursor-not-allowed border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--text-muted)]"
                    : getActionClass(action.value, false)
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {(message || errorMessage) && (
          <div className="border-t border-[var(--line)] px-5 py-3 text-sm">
            {message ? <span className="text-emerald-700">{message}</span> : null}
            {errorMessage ? <span className="text-rose-700">{errorMessage}</span> : null}
          </div>
        )}
      </section>

      {reservations.length === 0 ? (
        <div className="rounded-[2rem] border border-[var(--line)] bg-white p-8 text-sm text-[var(--text-muted)] shadow-sm">
          No reservations matched this filter.
        </div>
      ) : (
        <>
          <section className="hidden overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-[1180px] w-full border-collapse text-sm">
                <thead className="bg-[var(--surface-alt)] text-left text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  <tr>
                    <th scope="col" className="w-12 px-4 py-4">
                      <span className="sr-only">Select</span>
                    </th>
                    <th scope="col" className="px-4 py-4">Reservation</th>
                    <th scope="col" className="px-4 py-4">Service</th>
                    <th scope="col" className="px-4 py-4 text-center">Guests</th>
                    <th scope="col" className="px-4 py-4 text-right">Sale</th>
                    <th scope="col" className="px-4 py-4">Cost</th>
                    <th scope="col" className="px-4 py-4 text-right">Margin</th>
                    <th scope="col" className="px-4 py-4">Status</th>
                    <th scope="col" className="px-4 py-4">Workflow</th>
                    <th scope="col" className="px-4 py-4 text-right">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {reservations.map((reservation) => {
                    const normalizedStatus = normalizeReservationStatus(reservation.status);
                    const activeCost =
                      normalizedCostMap[reservation.reservationId] ??
                      reservation.internalCostEur;
                    const margin =
                      typeof activeCost === "number"
                        ? reservation.totalPrice - activeCost
                        : null;

                    return (
                      <tr
                        key={reservation.id}
                        className={`align-top transition-colors ${getStatusSurfaceClass(
                          normalizedStatus
                        )}`}
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(reservation.reservationId)}
                            onChange={() => toggleOne(reservation.reservationId)}
                            className="h-4 w-4 rounded border-[var(--line)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                            aria-label={`Select ${reservation.reservationId}`}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-mono text-xs font-bold text-[var(--brand-primary)]">
                            {reservation.reservationId}
                          </div>
                          <div className="mt-1 font-semibold text-[var(--heading)]">
                            {reservation.customerName}
                          </div>
                          <div className="mt-1 max-w-[230px] truncate text-xs text-[var(--text-muted)]">
                            {reservation.customerEmail}
                          </div>
                          <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                            {reservation.customerPhone}
                          </div>
                          {reservation.attribution && (
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              <span
                                title={reservation.attribution.detail ?? undefined}
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${attributionChipClass(
                                  reservation.attribution.channel
                                )}`}
                              >
                                {reservation.attribution.channel}
                              </span>
                              {reservation.attribution.detail && (
                                <span className="max-w-[180px] truncate text-[10px] text-[var(--text-muted)]">
                                  {reservation.attribution.detail}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-[230px] font-semibold text-[var(--heading)]">
                            {reservation.tourName}
                          </div>
                          <div className="mt-1 text-xs text-[var(--text-muted)]">
                            {reservation.dateLabel} · {reservation.time}
                          </div>
                          <div className="mt-1 text-xs text-[var(--text-muted)]">
                            Created {reservation.createdAtLabel} at {reservation.createdTimeLabel}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-[var(--heading)]">
                          {reservation.guests}
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-[var(--heading)]">
                          {formatMoney(reservation.totalPrice)}
                        </td>
                        <td className="px-4 py-4">
                          {renderCostEditor(reservation)}
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-[var(--heading)]">
                          {formatMoney(margin)}
                        </td>
                        <td className="px-4 py-4">
                          {renderStatusBadge(normalizedStatus)}
                          {reservation.confirmedAtLabel ? (
                            <div className="mt-2 text-[11px] text-[var(--text-muted)]">
                              Confirmed {reservation.confirmedAtLabel}
                            </div>
                          ) : null}
                          {reservation.completedAtLabel ? (
                            <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                              Completed {reservation.completedAtLabel}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {rowActions.map((action) => {
                              const active =
                                normalizedStatus === normalizeReservationStatus(action.value);

                              return (
                                <button
                                  key={action.value}
                                  type="button"
                                  disabled={isPending || active}
                                  onClick={() =>
                                    handleStatusChange(
                                      reservation.reservationId,
                                      action.value
                                    )
                                  }
                                  className={`h-8 rounded-full px-3 text-xs font-bold transition-all ${getActionClass(
                                    action.value,
                                    active
                                  )}`}
                                >
                                  {action.label}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => setActiveEditId(reservation.reservationId)}
                            >
                              Edit
                            </Button>
                            <Button asChild variant="outline" size="xs">
                              <Link href={`/reservation/${reservation.reservationId}/invoice`}>
                                Invoice
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="xs">
                              <Link href={`/reservation/${reservation.reservationId}/voucher`}>
                                Voucher
                              </Link>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => handleResendEmail(reservation.reservationId)}
                              disabled={isPending}
                              title="Resend customer email"
                            >
                              Email
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="xs"
                              onClick={() => setDeleteCandidateId(reservation.reservationId)}
                              disabled={isPending}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3 lg:hidden">
            {reservations.map((reservation) => {
              const normalizedStatus = normalizeReservationStatus(reservation.status);
              const activeCost =
                normalizedCostMap[reservation.reservationId] ??
                reservation.internalCostEur;
              const margin =
                typeof activeCost === "number"
                  ? reservation.totalPrice - activeCost
                  : null;

              return (
                <article
                  key={reservation.id}
                  className={`rounded-[1.75rem] border border-[var(--line)] p-4 shadow-sm ${getStatusSurfaceClass(
                    normalizedStatus
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(reservation.reservationId)}
                      onChange={() => toggleOne(reservation.reservationId)}
                      className="mt-1 h-5 w-5 rounded border-[var(--line)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      aria-label={`Select ${reservation.reservationId}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-mono text-xs font-bold text-[var(--brand-primary)]">
                          {reservation.reservationId}
                        </p>
                        {renderStatusBadge(normalizedStatus)}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-[var(--heading)]">
                        {reservation.customerName}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {reservation.tourName}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                        {reservation.dateLabel} · {reservation.time} · {reservation.guests} guests
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { label: "Sale", value: formatMoney(reservation.totalPrice) },
                      { label: "Cost", value: formatMoney(activeCost) },
                      { label: "Margin", value: formatMoney(margin) },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm font-bold text-[var(--heading)]">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    {renderCostEditor(reservation, true)}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {rowActions.map((action) => {
                      const active =
                        normalizedStatus === normalizeReservationStatus(action.value);

                      return (
                        <button
                          key={action.value}
                          type="button"
                          disabled={isPending || active}
                          onClick={() =>
                            handleStatusChange(reservation.reservationId, action.value)
                          }
                          className={`min-h-10 rounded-full px-3.5 text-xs font-bold transition-all ${getActionClass(
                            action.value,
                            active
                          )}`}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveEditId(reservation.reservationId)}
                      className="rounded-full"
                    >
                      Edit
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href={`/reservation/${reservation.reservationId}/invoice`}>
                        Invoice
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href={`/reservation/${reservation.reservationId}/voucher`}>
                        Voucher
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleResendEmail(reservation.reservationId)}
                      disabled={isPending}
                      className="rounded-full"
                      title="Resend customer email"
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteCandidateId(reservation.reservationId)}
                      disabled={isPending}
                      className="rounded-full"
                    >
                      Delete
                    </Button>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}

      <Dialog open={Boolean(activeEditId)} onOpenChange={(open) => !open && setActiveEditId(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-[2rem] border-[var(--line)] bg-white sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit reservation</DialogTitle>
            <DialogDescription>
              Update customer and service details. Voucher and invoice pages will use the saved data.
            </DialogDescription>
          </DialogHeader>

          {activeEditReservation && activeEditValues ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Customer
                </span>
                <input
                  value={activeEditValues.customerName}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "customerName", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Email
                </span>
                <input
                  type="email"
                  value={activeEditValues.customerEmail}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "customerEmail", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Phone
                </span>
                <input
                  value={activeEditValues.customerPhone}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "customerPhone", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Service date
                </span>
                <input
                  type="date"
                  value={activeEditValues.date}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "date", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Time
                </span>
                <input
                  value={activeEditValues.time}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "time", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Guests
                </span>
                <input
                  type="number"
                  min="1"
                  value={activeEditValues.guests}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "guests", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Sale EUR
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={activeEditValues.totalPrice}
                  onChange={(event) =>
                    handleEditField(activeEditReservation.reservationId, "totalPrice", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                />
              </label>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveEditId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => activeEditId && handleSaveDetails(activeEditId)}
              disabled={isPending || !activeEditId}
            >
              Save reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleteCandidateId)}
        onOpenChange={(open) => !open && setDeleteCandidateId(null)}
      >
        <DialogContent className="rounded-[2rem] border-[var(--line)] bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete reservation?</DialogTitle>
            <DialogDescription>
              {deleteCandidateId} will be permanently removed from the reservation list. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteCandidateId(null)}
            >
              No, keep it
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteReservation}
              disabled={isPending}
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
