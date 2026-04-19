"use client";

import { useActionState } from "react";
import { upsertTourOperationDayAction } from "@/app/actions/admin";
import { getCoreTours } from "@/data/tours";

const initialState = {
  success: false,
  error: "",
  dateKey: "",
};

const coreTours = getCoreTours();

export function OperationDayForm() {
  const [state, formAction, pending] = useActionState(
    upsertTourOperationDayAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--heading)]">
            Core tour
          </label>
          <select
            name="tourSlug"
            defaultValue={coreTours[0]?.slug}
            className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          >
            {coreTours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--heading)]">
            Operation date
          </label>
          <input
            type="date"
            name="date"
            required
            className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <label className="block text-sm font-medium text-[var(--heading)]">
            Departure time override
          </label>
          <input
            type="time"
            name="departureTimeOverride"
            className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          />
        </div>

        <label className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-medium text-[var(--heading)]">
          <input type="checkbox" name="isSoldOut" className="h-4 w-4" />
          Mark as sold out
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--heading)]">
          Operations note
        </label>
        <textarea
          name="note"
          rows={3}
          className="mt-1.5 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          placeholder="Internal reminder or guest-facing operational note"
        />
      </div>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state.success && state.dateKey && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Operation day saved for {state.dateKey}.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save operation day"}
      </button>
    </form>
  );
}
