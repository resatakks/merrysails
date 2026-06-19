"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
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

type Currency = "EUR" | "USD";
type PaymentMethod =
  | "cash_on_board"
  | "card_on_board"
  | "card_paid"
  | "bank_transfer";
type EmailTemplate = "standard" | "custom-booking";

interface ReservationTemplate {
  id: string;
  label: string;
  emoji: string;
  helper: string;
  tourSlug: string;
  packageName?: string;
  time: string;
  timeLocked: boolean;
  pickup: string;
  meetingPointNote: string;
  pricePerPerson?: number;
  priceTotal?: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  emailTemplate: EmailTemplate;
  /** Hint for operator — explains the price model in template card. */
  priceHelper: string;
}

const TEMPLATES: ReservationTemplate[] = [
  {
    id: "sunset-shared",
    label: "Sunset Shared",
    emoji: "🌅",
    helper: "Karaköy · 18:30 boarding / 19:00 dep · €34/pax fixed",
    tourSlug: "bosphorus-sunset-cruise",
    packageName: "Standard",
    time: "19:00 (boarding from 18:30)",
    timeLocked: false,
    pickup:
      "Karaköy ferry pier next to the Mimar Sinan statue (by Marmaray, near Balıkçı Kemal)",
    meetingPointNote:
      "Meeting point: Karaköy ferry pier next to the Mimar Sinan statue (by the Marmaray exit, near Balıkçı Kemal). Boarding opens at 18:30, departure 19:00. Please arrive at least 15 minutes before boarding.",
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "standard",
    priceHelper: "Fixed €34/pax shared cruise — cash or card on board.",
  },
  {
    id: "dinner-shared",
    label: "Dinner Shared",
    emoji: "🍽️",
    helper: "Kabataş iskele · 20:30 start · paket fiyatı",
    tourSlug: "bosphorus-dinner-cruise",
    packageName: "Silver / Soft Drinks",
    time: "20:30",
    timeLocked: false,
    pickup: "Kabataş iskele",
    meetingPointNote:
      "Meeting point: Kabataş iskele (ferry pier). Boarding from 20:00, departure 20:30. Please arrive at least 30 minutes before departure for boarding and seating.",
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "standard",
    priceHelper:
      "Fixed package price — cash or card on board. (Shuttle var ama default mailde belirtilmiyor.)",
  },
  {
    id: "private-sunset",
    label: "Private Sunset",
    emoji: "🛥️",
    helper: "€200 / 20:00-22:00 / Karaköy — hepsi düzenlenebilir",
    tourSlug: "private-bosphorus-sunset-cruise",
    time: "20:00 - 22:00",
    timeLocked: false,
    pickup: "Karaköy",
    meetingPointNote:
      "Exact meeting point in Karaköy will be confirmed by our team one day before. Tentative area: near the Mimar Sinan statue / Balıkçı Kemal corner — easy to find, right by the waterfront.",
    priceTotal: 200,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "custom-booking",
    priceHelper: "Custom group price — set per booking.",
  },
  {
    id: "private-dinner",
    label: "Private Dinner",
    emoji: "🥂",
    helper: "€220 / 19:30-22:30 / Karaköy — düzenlenebilir",
    tourSlug: "private-bosphorus-dinner-yacht-cruise",
    time: "19:30 - 22:30",
    timeLocked: false,
    pickup: "Karaköy",
    meetingPointNote:
      "Exact meeting point in Karaköy will be confirmed by our team one day before. Tentative area: near the Mimar Sinan statue / Balıkçı Kemal corner.",
    priceTotal: 280,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "custom-booking",
    priceHelper: "Custom group price — set per booking.",
  },
  {
    id: "private-yacht",
    label: "Private Yacht Charter",
    emoji: "⛵",
    helper: "Esnek saat / Karaköy / fiyat custom",
    tourSlug: "yacht-charter-in-istanbul",
    time: "",
    timeLocked: false,
    pickup: "Karaköy",
    meetingPointNote:
      "Exact meeting point will be confirmed by our team one day before.",
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "custom-booking",
    priceHelper: "Set total based on yacht tier and duration.",
  },
  {
    id: "princes-islands",
    label: "Princes' Islands Swimming",
    emoji: "🏝️",
    helper: "USD default · saat TBC · kalkış TBC",
    tourSlug: "private-yacht-swimming-tour",
    time: "",
    timeLocked: false,
    pickup: "",
    meetingPointNote:
      "Pickup point and exact departure time will be confirmed by our team one day before. The day is fully private — flexible duration.",
    currency: "USD",
    paymentMethod: "cash_on_board",
    emailTemplate: "custom-booking",
    priceHelper:
      "USD pricing — set the agreed amount (e.g. $1,200 for full-day private).",
  },
  {
    id: "blank",
    label: "Blank (custom)",
    emoji: "✏️",
    helper: "Hiçbir şey doldurulmamış — operator full kontrol",
    tourSlug: "",
    time: "",
    timeLocked: false,
    pickup: "",
    meetingPointNote: "",
    currency: "EUR",
    paymentMethod: "cash_on_board",
    emailTemplate: "custom-booking",
    priceHelper: "Set everything manually.",
  },
];

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

const PAYMENT_OPTIONS: Array<{ value: PaymentMethod; label: string; hint: string }> = [
  { value: "cash_on_board", label: "Cash on board", hint: "Müşteri teknede nakit öder" },
  { value: "card_on_board", label: "Card on board", hint: "Müşteri teknede kartla öder" },
  { value: "card_paid", label: "Card paid", hint: "Online / önceden ödendi" },
  { value: "bank_transfer", label: "Bank transfer", hint: "Havale / EFT" },
];

function paymentNoteFor(method: PaymentMethod, totalDisplay: string): string {
  switch (method) {
    case "cash_on_board":
      return `Payment: ${totalDisplay} cash on board.`;
    case "card_on_board":
      return `Payment: ${totalDisplay} by card on board.`;
    case "card_paid":
      return `Payment received in full (${totalDisplay}). Nothing due on board.`;
    case "bank_transfer":
      return `Payment by bank transfer (${totalDisplay}). Please share proof if not already sent.`;
  }
}

function formatMoney(value: number, currency: Currency) {
  const symbol = currency === "USD" ? "$" : "€";
  if (!Number.isFinite(value)) return `${symbol}0`;
  return `${symbol}${value.toLocaleString("en-US", {
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

  const [templateId, setTemplateId] = useState<string>("blank");
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

  // Newly added controlled fields (from template or operator).
  const [time, setTime] = useState<string>("");
  const [pickup, setPickup] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash_on_board");
  const [meetingPointNote, setMeetingPointNote] = useState<string>("");
  const [internalOperatorNote, setInternalOperatorNote] = useState<string>("");
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>("standard");

  // Sync default time / pickup with the selected tour when no template-driven
  // value is in place.
  useEffect(() => {
    if (!time && selectedTour?.defaultTime) {
      setTime(selectedTour.defaultTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTour?.slug]);

  function handleTourChange(slug: string) {
    setTourSlug(slug);
    const next = tours.find((tour) => tour.slug === slug);
    setPackageName(next?.packages[0]?.name ?? "");
    setSelectedAddOns([]);
    setPerPersonOverride("");
    setOverrideTotal("");
    setTime(next?.defaultTime ?? "");
    // Manual tour change implies we're off-template.
    setTemplateId("blank");
  }

  function applyTemplate(id: string) {
    setTemplateId(id);
    const tmpl = TEMPLATES.find((t) => t.id === id);
    if (!tmpl) return;

    if (tmpl.tourSlug) {
      const tour = tours.find((t) => t.slug === tmpl.tourSlug);
      if (tour) {
        setTourSlug(tour.slug);
        setPackageName(tmpl.packageName ?? tour.packages[0]?.name ?? "");
        setSelectedAddOns([]);
      }
    } else {
      // Blank: keep current tour selection.
      setSelectedAddOns([]);
    }

    setTime(tmpl.time);
    setPickup(tmpl.pickup);
    setMeetingPointNote(tmpl.meetingPointNote);
    setCurrency(tmpl.currency);
    setPaymentMethod(tmpl.paymentMethod);
    setEmailTemplate(tmpl.emailTemplate);

    if (typeof tmpl.priceTotal === "number") {
      setOverrideTotal(String(tmpl.priceTotal));
      setPerPersonOverride("");
    } else if (typeof tmpl.pricePerPerson === "number") {
      setPerPersonOverride(String(tmpl.pricePerPerson));
      setOverrideTotal("");
    } else {
      setOverrideTotal("");
      setPerPersonOverride("");
    }
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

  const totalDisplay = formatMoney(finalTotal, currency);
  const paymentNotePreview = paymentNoteFor(paymentMethod, totalDisplay);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="totalPrice" value={finalTotal.toFixed(2)} />
      <input type="hidden" name="additionalPassengers" value={passengersJson} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="paymentMethod" value={paymentMethod} />
      <input type="hidden" name="meetingPointNote" value={meetingPointNote} />
      <input type="hidden" name="internalOperatorNote" value={internalOperatorNote} />
      <input type="hidden" name="emailTemplate" value={emailTemplate} />
      <input type="hidden" name="pickup" value={pickup} />

      <div>
        <span className={labelText}>Quick templates</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((tmpl) => {
            const active = templateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => applyTemplate(tmpl.id)}
                className={`flex flex-col items-start gap-1 rounded-2xl border px-3 py-2.5 text-left text-xs transition-colors ${
                  active
                    ? "border-[var(--brand-primary)] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                    : "border-[var(--line)] bg-[var(--surface-alt)] hover:border-[var(--brand-primary)]/40 hover:bg-white"
                }`}
                aria-pressed={active}
              >
                <span className="flex items-center gap-2 text-sm font-bold text-[var(--heading)]">
                  <span aria-hidden>{tmpl.emoji}</span>
                  {tmpl.label}
                </span>
                <span className="text-[11px] leading-snug text-[var(--text-muted)]">
                  {tmpl.helper}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
          <span className={labelText}>
            Time{" "}
            <span className="font-normal normal-case text-[var(--text-muted)]">
              (boş → &ldquo;to be confirmed&rdquo;)
            </span>
          </span>
          <input
            name="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder={selectedTour?.defaultTime || "19:00 or TBC"}
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

      <label className="block">
        <span className={labelText}>
          Pickup / departure point{" "}
          <span className="font-normal normal-case text-[var(--text-muted)]">
            (boş → &ldquo;to be confirmed&rdquo;)
          </span>
        </span>
        <input
          value={pickup}
          onChange={(event) => setPickup(event.target.value)}
          placeholder="e.g. Karaköy, Kabataş, Kuruçeşme Marina, or leave blank"
          className={inputClass}
        />
      </label>

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
                  {pkg.name} — {formatMoney(pkg.price, "EUR")}
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
              ? "Override group"
              : "Override per-person"}
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
                : `${formatMoney(basePrice, "EUR")}${
                    usingPerPersonOverride ? " override" : ""
                  } × ${safeGuests}`}
            </span>
            <span className="font-semibold text-[var(--heading)]">
              {formatMoney(baseTotal, "EUR")}
            </span>
          </div>
          {addOnsTotal > 0 ? (
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Add-ons</span>
              <span className="font-semibold text-[var(--heading)]">
                {formatMoney(addOnsTotal, "EUR")}
              </span>
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between border-t border-[var(--line)] pt-2 text-base">
            <span className="font-bold text-[var(--heading)]">Suggested total</span>
            <span className="font-bold text-[var(--brand-primary)]">
              {formatMoney(computedTotal, "EUR")}
            </span>
          </div>
          {currency === "USD" ? (
            <p className="mt-2 text-[11px] leading-snug text-amber-700">
              Currency set to USD — the suggested total is computed in EUR using
              the package data. Use the override below to enter the USD figure.
            </p>
          ) : null}
        </div>
        <label>
          <span className={labelText}>Override sale total ({currency})</span>
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

      <div className="grid gap-4 md:grid-cols-3">
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
          <span className={labelText}>Currency</span>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
            className={inputClass}
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
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

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <span className={labelText}>Payment method</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {PAYMENT_OPTIONS.map((option) => {
            const active = paymentMethod === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  active
                    ? "border-[var(--brand-primary)] bg-white"
                    : "border-transparent bg-white/60 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethodRadio"
                  value={option.value}
                  checked={active}
                  onChange={() => setPaymentMethod(option.value)}
                  className="mt-0.5 h-4 w-4"
                />
                <span className="flex-1">
                  <span className="block font-semibold text-[var(--heading)]">
                    {option.label}
                  </span>
                  <span className="block text-xs text-[var(--text-muted)]">
                    {option.hint}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] leading-snug text-[var(--text-muted)]">
          Customer email satırı: <strong>{paymentNotePreview}</strong>
        </p>
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

      <label className="block">
        <span className={labelText}>
          Meeting point note{" "}
          <span className="font-normal normal-case text-[var(--text-muted)]">
            (mavi kutuda müşteri mailine basılır)
          </span>
        </span>
        <textarea
          rows={3}
          value={meetingPointNote}
          onChange={(event) => setMeetingPointNote(event.target.value)}
          placeholder="Karaköy ferry pier next to Mimar Sinan statue, near Balıkçı Kemal corner..."
          className={textareaClass}
        />
      </label>

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
        <span className={labelText}>
          Customer-facing note{" "}
          <span className="font-normal normal-case text-[var(--text-muted)]">
            (voucher &amp; admin görür)
          </span>
        </span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Pickup note, dietary note, payment note..."
          className={textareaClass}
        />
      </label>

      <label className="block">
        <span className={labelText}>
          Internal operator note{" "}
          <span className="font-normal normal-case text-[var(--text-muted)]">
            (sadece admin görür — müşteri mailinde YOK)
          </span>
        </span>
        <textarea
          rows={2}
          value={internalOperatorNote}
          onChange={(event) => setInternalOperatorNote(event.target.value)}
          placeholder="Shuttle ayrı olarak ayarlandı, telefonda konuşulanlar, captain notu..."
          className={textareaClass}
        />
      </label>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <span className={labelText}>Customer email template</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(
            [
              {
                value: "standard" as const,
                label: "Standard confirmation",
                hint: "Paket + add-on + breakdown (shared cruise default)",
              },
              {
                value: "custom-booking" as const,
                label: "Phone-arranged custom",
                hint: "Sade, meeting-point notu ile (private + Princes default)",
              },
            ]
          ).map((option) => {
            const active = emailTemplate === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  active
                    ? "border-[var(--brand-primary)] bg-white"
                    : "border-transparent bg-white/60 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="emailTemplateRadio"
                  value={option.value}
                  checked={active}
                  onChange={() => setEmailTemplate(option.value)}
                  className="mt-0.5 h-4 w-4"
                />
                <span className="flex-1">
                  <span className="block font-semibold text-[var(--heading)]">
                    {option.label}
                  </span>
                  <span className="block text-xs text-[var(--text-muted)]">
                    {option.hint}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

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
        {pending ? "Creating..." : `Create reservation · ${totalDisplay}`}
      </button>
    </form>
  );
}
