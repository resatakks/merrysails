"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createManualReservationAdminAction } from "@/app/actions/admin";

interface ManualReservationTourOption {
  slug: string;
  name: string;
  defaultTime: string;
  defaultPrice: number;
}

interface AdminManualReservationFormProps {
  tours: ManualReservationTourOption[];
}

const initialState = {
  success: false,
  error: "",
  reservationId: "",
  emailSent: false,
};

export function AdminManualReservationForm({
  tours,
}: AdminManualReservationFormProps) {
  const [state, formAction, pending] = useActionState(
    createManualReservationAdminAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Product
          </span>
          <select
            name="tourSlug"
            required
            defaultValue={tours[0]?.slug}
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          >
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Status
          </span>
          <select
            name="status"
            defaultValue="confirmed"
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          >
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Date
          </span>
          <input
            type="date"
            name="date"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Time
          </span>
          <input
            name="time"
            placeholder="18:00"
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Guests
          </span>
          <input
            type="number"
            name="guests"
            min="1"
            defaultValue="2"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Sale EUR
          </span>
          <input
            type="number"
            name="totalPrice"
            min="0"
            step="0.01"
            required
            placeholder="280"
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Internal cost EUR
          </span>
          <input
            type="number"
            name="internalCostEur"
            min="0"
            step="0.01"
            placeholder="Optional"
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Customer name
          </span>
          <input
            name="customerName"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Country
          </span>
          <input
            name="customerCountry"
            placeholder="Optional"
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Customer email
          </span>
          <input
            type="email"
            name="customerEmail"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Phone
          </span>
          <input
            name="customerPhone"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Package / option
          </span>
          <input
            name="packageName"
            placeholder="VIP yacht, Gold dinner, with wine..."
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Add-ons
          </span>
          <input
            name="addOns"
            placeholder="Cake, transfer, photographer..."
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Other passengers
          </span>
          <textarea
            name="additionalGuests"
            rows={4}
            placeholder="One passenger per line"
            className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Internal / customer note
          </span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Pickup note, dietary note, payment note..."
            className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 text-sm font-semibold text-[var(--heading)]">
          <input type="checkbox" name="privateTransferRequested" className="h-4 w-4" />
          Private transfer requested
        </label>
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800">
          <input type="checkbox" name="sendEmail" defaultChecked className="h-4 w-4" />
          Send customer email with PDFs
        </label>
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      {state.success && state.reservationId ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <div className="font-bold">
            {state.reservationId} created{state.emailSent ? " and emailed" : ""}.
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link className="font-semibold underline" href={`/reservation/${state.reservationId}`}>
              Reservation
            </Link>
            <Link className="font-semibold underline" href={`/reservation/${state.reservationId}/invoice`}>
              Invoice
            </Link>
            <Link className="font-semibold underline" href={`/reservation/${state.reservationId}/voucher`}>
              Voucher
            </Link>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create reservation"}
      </button>
    </form>
  );
}
