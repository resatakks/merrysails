"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { createManualReservationAdminAction } from "@/app/actions/admin";

export interface ManualReservationPackageOption {
  name: string;
  price: number;
  description?: string;
}

export interface ManualReservationAddOnOption {
  name: string;
  price: string;
  amount: number;
  unit: "perPerson" | "perBooking";
}

export interface ManualReservationTourOption {
  slug: string;
  name: string;
  defaultTime: string;
  defaultPrice: number;
  priceMode: "perPerson" | "perGroup" | "custom";
  packages: ManualReservationPackageOption[];
  addOns: ManualReservationAddOnOption[];
}

interface AdminManualReservationFormProps {
  tours: ManualReservationTourOption[];
}

interface PassengerRow {
  name: string;
  phone: string;
  email: string;
}

const initialState = {
  success: false,
  error: "",
  reservationId: "",
  emailSent: false,
};

const inputClass =
  "mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]";
const textareaClass =
  "mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]";
const labelText =
  "text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]";

function formatEur(value: number) {
  if (!Number.isFinite(value)) return "€0";
  return `€${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function AdminManualReservationForm({
  tours,
}: AdminManualReservationFormProps) {
  const [state, formAction, pending] = useActionState(
    createManualReservationAdminAction,
    initialState
  );

  const [tourSlug, setTourSlug] = useState<string>(tours[0]?.slug ?? "");
  const selectedTour = useMemo(
    () => tours.find((tour) => tour.slug === tourSlug) ?? tours[0],
    [tours, tourSlug]
  );

  const [guests, setGuests] = useState<number>(2);
  const [packageName, setPackageName] = useState<string>(
    selectedTour?.packages[0]?.name ?? ""
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [perPersonOverride, setPerPersonOverride] = useState<string>("");
  const [overrideTotal, setOverrideTotal] = useState<string>("");
  const [passengers, setPassengers] = useState<PassengerRow[]>([]);

  // Reset package/add-ons when tour changes
  function handleTourChange(slug: string) {
    setTourSlug(slug);
    const next = tours.find((tour) => tour.slug === slug);
    setPackageName(next?.packages[0]?.name ?? "");
    setSelectedAddOns([]);
    setPerPersonOverride("");
    setOverrideTotal("");
  }

  function toggleAddOn(name: string) {
    setSelectedAddOns((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  }

  function updatePassenger(index: number, patch: Partial<PassengerRow>) {
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  function addPassenger() {
    setPassengers((prev) => [...prev, { name: "", phone: "", email: "" }]);
  }

  function removePassenger(index: number) {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  }

  // Pricing preview
  const pkg = selectedTour?.packages.find((p) => p.name === packageName);
  const safeGuests = Math.max(1, Number.isFinite(guests) ? guests : 1);
  const packagePrice = pkg?.price ?? selectedTour?.defaultPrice ?? 0;
  const perPersonOverrideValue = Number.parseFloat(
    perPersonOverride.replace(",", ".")
  );
  const usingPerPersonOverride =
    Number.isFinite(perPersonOverrideValue) && perPersonOverrideValue >= 0;
  const basePrice = usingPerPersonOverride ? perPersonOverrideValue : packagePrice;
  const baseTotal =
    selectedTour?.priceMode === "perGroup"
      ? basePrice
      : basePrice * safeGuests;

  const addOnsList = selectedTour?.addOns ?? [];
  const addOnsTotal = selectedAddOns.reduce((sum, name) => {
    const item = addOnsList.find((a) => a.name === name);
    if (!item) return sum;
    return sum + item.amount * (item.unit === "perPerson" ? safeGuests : 1);
  }, 0);

  const computedTotal = baseTotal + addOnsTotal;
  const overrideValue = Number.parseFloat(overrideTotal.replace(",", "."));
  const finalTotal =
    Number.isFinite(overrideValue) && overrideValue >= 0
      ? overrideValue
      : computedTotal;

  const passengersJson = JSON.stringify(
    passengers
      .map((row) => ({
        name: row.name.trim(),
        phone: row.phone.trim(),
        email: row.email.trim(),
      }))
      .filter((row) => row.name || row.phone || row.email)
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="totalPrice" value={finalTotal.toFixed(2)} />
      <input type="hidden" name="additionalPassengers" value={passengersJson} />

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelText}>Product</span>
          <select
            name="tourSlug"
            required
            value={tourSlug}
            onChange={(event) => handleTourChange(event.target.value)}
            className={inputClass}
          >
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelText}>Status</span>
          <select name="status" defaultValue="confirmed" className={inputClass}>
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className={labelText}>Date</span>
          <input type="date" name="date" required className={inputClass} />
        </label>
        <label>
          <span className={labelText}>Time</span>
          <input
            name="time"
            placeholder={selectedTour?.defaultTime || "18:00"}
            defaultValue={selectedTour?.defaultTime || ""}
            key={selectedTour?.slug}
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelText}>Guests</span>
          <input
            type="number"
            name="guests"
            min="1"
            value={guests}
            onChange={(event) =>
              setGuests(Math.max(1, Number.parseInt(event.target.value, 10) || 1))
            }
            required
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        {selectedTour && selectedTour.packages.length > 0 ? (
          <label>
            <span className={labelText}>Package / option</span>
            <select
              name="packageName"
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
              className={inputClass}
            >
              {selectedTour.packages.map((pkg) => (
                <option key={pkg.name} value={pkg.name}>
                  {pkg.name} — {formatEur(pkg.price)}
                  {selectedTour.priceMode === "perGroup" ? " / group" : " / pp"}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            <span className={labelText}>Package / option</span>
            <input
              name="packageName"
              placeholder="VIP yacht, Gold dinner, with wine..."
              className={inputClass}
            />
          </label>
        )}
        <label>
          <span className={labelText}>
            {selectedTour?.priceMode === "perGroup"
              ? "Override group EUR"
              : "Override per-person EUR"}
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={perPersonOverride}
            onChange={(event) => setPerPersonOverride(event.target.value)}
            placeholder={`Default: ${packagePrice}`}
            className={inputClass}
          />
        </label>
      </div>

      {addOnsList.length > 0 ? (
        <div>
          <span className={labelText}>Add-ons</span>
          <div className="mt-2 grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-3 sm:grid-cols-2">
            {addOnsList.map((addOn) => {
              const checked = selectedAddOns.includes(addOn.name);
              return (
                <label
                  key={addOn.name}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
                    checked
                      ? "border-[var(--brand-primary)] bg-white"
                      : "border-transparent bg-white/60 hover:bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="addOns"
                    value={addOn.name}
                    checked={checked}
                    onChange={() => toggleAddOn(addOn.name)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span className="flex-1">
                    <span className="block font-semibold text-[var(--heading)]">
                      {addOn.name}
                    </span>
                    <span className="block text-xs text-[var(--text-muted)]">
                      {addOn.price}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)]">
              {selectedTour?.priceMode === "perGroup"
                ? `Group${usingPerPersonOverride ? " (override)" : ""}`
                : `${formatEur(basePrice)}${usingPerPersonOverride ? " override" : ""} × ${safeGuests}`}
            </span>
            <span className="font-semibold text-[var(--heading)]">
              {formatEur(baseTotal)}
            </span>
          </div>
          {addOnsTotal > 0 ? (
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Add-ons</span>
              <span className="font-semibold text-[var(--heading)]">
                {formatEur(addOnsTotal)}
              </span>
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between border-t border-[var(--line)] pt-2 text-base">
            <span className="font-bold text-[var(--heading)]">Suggested total</span>
            <span className="font-bold text-[var(--brand-primary)]">
              {formatEur(computedTotal)}
            </span>
          </div>
        </div>
        <label>
          <span className={labelText}>Override sale EUR</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={overrideTotal}
            onChange={(event) => setOverrideTotal(event.target.value)}
            placeholder={`Auto: ${computedTotal.toFixed(2)}`}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelText}>Internal cost EUR</span>
          <input
            type="number"
            name="internalCostEur"
            min="0"
            step="0.01"
            placeholder="Optional"
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelText}>Country</span>
          <input
            name="customerCountry"
            placeholder="Optional"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="md:col-span-1">
          <span className={labelText}>Customer name</span>
          <input name="customerName" required className={inputClass} />
        </label>
        <label>
          <span className={labelText}>Customer email</span>
          <input
            type="email"
            name="customerEmail"
            required
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelText}>Phone</span>
          <input name="customerPhone" required className={inputClass} />
        </label>
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--heading)]">
              Other passengers
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Add name, phone, and email per passenger.
            </p>
          </div>
          <button
            type="button"
            onClick={addPassenger}
            className="inline-flex h-9 items-center gap-1 rounded-full border border-[var(--line)] bg-white px-3 text-xs font-bold text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)]"
          >
            + Add passenger
          </button>
        </div>

        {passengers.length > 0 ? (
          <div className="mt-3 space-y-3">
            {passengers.map((row, index) => (
              <div
                key={index}
                className="grid gap-2 rounded-xl bg-white p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <input
                  placeholder="Full name"
                  value={row.name}
                  onChange={(event) =>
                    updatePassenger(index, { name: event.target.value })
                  }
                  className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
                />
                <input
                  placeholder="Phone"
                  value={row.phone}
                  onChange={(event) =>
                    updatePassenger(index, { phone: event.target.value })
                  }
                  className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={row.email}
                  onChange={(event) =>
                    updatePassenger(index, { email: event.target.value })
                  }
                  className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
                />
                <button
                  type="button"
                  onClick={() => removePassenger(index)}
                  className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-xs font-bold text-rose-600 transition-colors hover:border-rose-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <label className="block">
        <span className={labelText}>Internal / customer note</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Pickup note, dietary note, payment note..."
          className={textareaClass}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 text-sm font-semibold text-[var(--heading)]">
          <input type="checkbox" name="privateTransferRequested" className="h-4 w-4" />
          Private transfer requested
        </label>
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800">
          <input type="checkbox" name="sendEmail" defaultChecked className="h-4 w-4" />
          Send customer email with voucher + invoice
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
        {pending ? "Creating..." : `Create reservation · ${formatEur(finalTotal)}`}
      </button>
    </form>
  );
}
