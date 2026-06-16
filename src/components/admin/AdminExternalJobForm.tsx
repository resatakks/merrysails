"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createExternalJobAction,
  type ExternalJobActionState,
} from "@/app/actions/external-job";

const initialState: ExternalJobActionState = {
  success: false,
  error: "",
  jobId: "",
};

const inputClass =
  "mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]";
const textareaClass =
  "mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]";
const labelText =
  "text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]";

type Currency = "EUR" | "USD" | "TRY" | "GBP";
type PaymentMethod =
  | "cash_on_board"
  | "card_on_board"
  | "card_paid"
  | "bank_transfer";
type PaymentStatus = "pending" | "paid" | "refunded";
type EventType =
  | "engagement"
  | "birthday"
  | "wedding"
  | "corporate"
  | "family"
  | "custom";

const PAYMENT_METHODS: Array<{ value: PaymentMethod; label: string }> = [
  { value: "cash_on_board", label: "Cash on board" },
  { value: "card_on_board", label: "Card on board" },
  { value: "card_paid", label: "Card paid (online)" },
  { value: "bank_transfer", label: "Bank transfer" },
];

const PAYMENT_STATUSES: Array<{ value: PaymentStatus; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "refunded", label: "Refunded" },
];

interface EventTemplate {
  id: EventType;
  emoji: string;
  label: string;
  helper: string;
  serviceTitle: string;
  voucherExtraTitle: string;
  durationHours: string;
  inclusions: string[];
  paymentNotes: string;
  paymentMethod: PaymentMethod;
}

const EVENT_TEMPLATES: EventTemplate[] = [
  {
    id: "engagement",
    emoji: "💍",
    label: "Engagement",
    helper: "Sunset 3h · catering + decor + photo + cake",
    serviceTitle: "Engagement Organization on Private Yacht",
    voucherExtraTitle: "Engagement Package & Schedule",
    durationHours: "3",
    inclusions: [
      "Private yacht charter (sunset cruise)",
      "Catering & food service",
      "Table decorations",
      "Music speaker",
      "Professional photography service",
      "Engagement cake",
      "Professional crew, fuel and all operating costs",
    ],
    paymentNotes:
      "Partial deposit collected before the event, balance paid on the day.",
    paymentMethod: "cash_on_board",
  },
  {
    id: "birthday",
    emoji: "🎂",
    label: "Birthday party",
    helper: "Private cruise 3h · cake + decor + music",
    serviceTitle: "Birthday Celebration on Private Yacht",
    voucherExtraTitle: "Birthday Package & Schedule",
    durationHours: "3",
    inclusions: [
      "Private yacht charter",
      "Birthday cake",
      "Table & boat decorations",
      "Music speaker",
      "Soft drinks served on board",
      "Professional crew, fuel and all operating costs",
    ],
    paymentNotes: "Full payment in cash on board, or as agreed.",
    paymentMethod: "cash_on_board",
  },
  {
    id: "wedding",
    emoji: "💐",
    label: "Wedding / Anniversary",
    helper: "4h sunset · premium decor + photo + live music",
    serviceTitle: "Wedding Celebration on Private Yacht",
    voucherExtraTitle: "Wedding Package & Schedule",
    durationHours: "4",
    inclusions: [
      "Private yacht charter (premium)",
      "Premium catering & food service",
      "Premium floral & table decorations",
      "Professional photography & video service",
      "Live music or DJ",
      "Wedding/anniversary cake",
      "Professional crew, fuel and all operating costs",
    ],
    paymentNotes:
      "50% deposit on booking, balance paid before departure.",
    paymentMethod: "bank_transfer",
  },
  {
    id: "corporate",
    emoji: "🏢",
    label: "Corporate event",
    helper: "B2B invoice · catering + AV · bank transfer",
    serviceTitle: "Corporate Cruise & Catering",
    voucherExtraTitle: "Corporate Package & Schedule",
    durationHours: "4",
    inclusions: [
      "Private yacht charter (corporate)",
      "Catering & beverage service",
      "AV setup (music speaker, microphone if needed)",
      "Tables and seating arrangement",
      "Professional crew, fuel and all operating costs",
    ],
    paymentNotes:
      "Bank transfer invoice — payment due 7 days before event date.",
    paymentMethod: "bank_transfer",
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧‍👦",
    label: "Family gathering",
    helper: "Private cruise 3h · catering + soft drinks",
    serviceTitle: "Family Cruise & Catering",
    voucherExtraTitle: "Family Package & Schedule",
    durationHours: "3",
    inclusions: [
      "Private yacht charter",
      "Family-style catering",
      "Soft drinks served on board",
      "Professional crew, fuel and all operating costs",
    ],
    paymentNotes: "Full payment in cash on board, or as agreed.",
    paymentMethod: "cash_on_board",
  },
  {
    id: "custom",
    emoji: "✏️",
    label: "Custom / Blank",
    helper: "Operator fills everything manually",
    serviceTitle: "",
    voucherExtraTitle: "Package & Schedule",
    durationHours: "",
    inclusions: [],
    paymentNotes: "",
    paymentMethod: "cash_on_board",
  },
];

function formatMoney(value: number, currency: Currency): string {
  const symbol =
    currency === "USD"
      ? "$"
      : currency === "TRY"
        ? "₺"
        : currency === "GBP"
          ? "£"
          : "€";
  if (!Number.isFinite(value)) return `${symbol}0`;
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function AdminExternalJobForm() {
  const [state, formAction, pending] = useActionState(
    createExternalJobAction,
    initialState
  );

  const [eventType, setEventType] = useState<EventType>("custom");
  const [serviceTitle, setServiceTitle] = useState("");
  const [voucherExtraTitle, setVoucherExtraTitle] = useState("Package & Schedule");
  const [durationHours, setDurationHours] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash_on_board");

  const [currency, setCurrency] = useState<Currency>("EUR");
  const [amount, setAmount] = useState<string>("");
  const [showCompany, setShowCompany] = useState(false);

  function applyTemplate(id: EventType) {
    setEventType(id);
    const tmpl = EVENT_TEMPLATES.find((t) => t.id === id);
    if (!tmpl) return;
    setServiceTitle(tmpl.serviceTitle);
    setVoucherExtraTitle(tmpl.voucherExtraTitle);
    setDurationHours(tmpl.durationHours);
    setInclusions(tmpl.inclusions.join("\n"));
    setPaymentNotes(tmpl.paymentNotes);
    setPaymentMethod(tmpl.paymentMethod);
    if (id === "corporate") setShowCompany(true);
  }

  const amountValue = Number.parseFloat(amount.replace(",", "."));
  const safeAmount = Number.isFinite(amountValue) ? amountValue : 0;
  const totalDisplay = formatMoney(safeAmount, currency);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="eventType" value={eventType} />
      <input type="hidden" name="paymentMethod" value={paymentMethod} />

      <section>
        <span className={labelText}>Event template</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {EVENT_TEMPLATES.map((tmpl) => {
            const active = eventType === tmpl.id;
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
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
          End customer
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelText}>Customer name *</span>
            <input name="customerName" required className={inputClass} />
          </label>
          <label>
            <span className={labelText}>Customer email</span>
            <input
              type="email"
              name="customerEmail"
              placeholder="Optional"
              className={inputClass}
            />
          </label>
          <label>
            <span className={labelText}>Customer phone</span>
            <input
              name="customerPhone"
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
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
          Service / job details
        </h3>
        <div className="mt-4 grid gap-4">
          <label>
            <span className={labelText}>Service title *</span>
            <input
              name="serviceTitle"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              required
              placeholder="e.g. Engagement Organization on Private Yacht"
              className={inputClass}
            />
          </label>
          <input type="hidden" name="voucherExtraTitle" value={voucherExtraTitle} />
          <label>
            <span className={labelText}>
              Inclusions (one per line — bulleted on voucher)
            </span>
            <textarea
              name="inclusions"
              rows={6}
              value={inclusions}
              onChange={(e) => setInclusions(e.target.value)}
              placeholder={"Private yacht charter\nCatering & food service\nTable decorations\n..."}
              className={textareaClass}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-4">
            <label>
              <span className={labelText}>Job date *</span>
              <input
                type="date"
                name="jobDate"
                required
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelText}>Time</span>
              <input
                name="jobTime"
                placeholder="18:00 or TBC"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelText}>Duration (hours)</span>
              <input
                type="number"
                step="0.5"
                min="0"
                name="durationHours"
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                placeholder="3"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelText}>Guests / pax</span>
              <input
                type="number"
                name="guests"
                min="1"
                defaultValue="2"
                required
                className={inputClass}
              />
            </label>
          </div>
          <label>
            <span className={labelText}>Pickup / meeting point</span>
            <input
              name="pickupPoint"
              placeholder="Balat, Karaköy, Kuruçeşme Marina, or TBC"
              className={inputClass}
            />
          </label>
          <label>
            <span className={labelText}>Service description (optional)</span>
            <textarea
              name="serviceDescription"
              rows={2}
              placeholder="Free-text — extra detail shown on voucher header"
              className={textareaClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
          Pricing &amp; payment
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label>
            <span className={labelText}>Amount *</span>
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
              placeholder="0.00"
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
              <option value="TRY">TRY (₺)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </label>
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
            <span className={labelText}>Payment method</span>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className={inputClass}
            >
              {PAYMENT_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelText}>Payment status</span>
            <select
              name="paymentStatus"
              defaultValue="pending"
              className={inputClass}
            >
              {PAYMENT_STATUSES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelText}>Status</span>
            <select
              name="status"
              defaultValue="confirmed"
              className={inputClass}
            >
              <option value="new">New</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <label className="mt-4 block">
          <span className={labelText}>Payment notes (voucher + invoice)</span>
          <textarea
            name="paymentNotes"
            rows={2}
            value={paymentNotes}
            onChange={(e) => setPaymentNotes(e.target.value)}
            placeholder="e.g. Partial deposit collected before the event, balance on the day."
            className={textareaClass}
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <button
          type="button"
          onClick={() => setShowCompany((s) => !s)}
          className="flex w-full items-center justify-between text-left"
        >
          <span>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Bill-to company (optional · B2B)
            </h3>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Voucher always shows MerrySails. When filled, the invoice adds a
              &quot;Bill to&quot; block with company name + tax ID.
            </p>
          </span>
          <span className="ml-3 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-bold text-[var(--brand-primary)]">
            {showCompany ? "Hide" : "Add"}
          </span>
        </button>

        {showCompany ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label>
              <span className={labelText}>Company name</span>
              <input name="companyName" className={inputClass} />
            </label>
            <label>
              <span className={labelText}>Tax ID / VAT no</span>
              <input
                name="companyTaxId"
                placeholder="Optional"
                className={inputClass}
              />
            </label>
            <label className="md:col-span-2">
              <span className={labelText}>Company address</span>
              <textarea
                name="companyAddress"
                rows={2}
                placeholder="Street, city, postal code, country"
                className={textareaClass}
              />
            </label>
            <label>
              <span className={labelText}>Company email</span>
              <input
                type="email"
                name="companyEmail"
                placeholder="Optional"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelText}>Company phone</span>
              <input
                name="companyPhone"
                placeholder="Optional"
                className={inputClass}
              />
            </label>
          </div>
        ) : null}
      </section>

      <div className="grid gap-4">
        <label>
          <span className={labelText}>
            Customer-facing note (voucher + invoice)
          </span>
          <textarea
            name="notes"
            rows={2}
            placeholder="Optional — extra free-text shown to customer"
            className={textareaClass}
          />
        </label>
        <label>
          <span className={labelText}>
            Internal operator note (admin only)
          </span>
          <textarea
            name="internalNote"
            rows={2}
            placeholder="Yat, pickup details, captain note — never leaves the admin"
            className={textareaClass}
          />
        </label>
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      {state.success && state.jobId ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <div className="font-bold">{state.jobId} created.</div>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              className="font-semibold underline"
              href={`/external/${state.jobId}/voucher`}
            >
              Voucher
            </Link>
            <Link
              className="font-semibold underline"
              href={`/external/${state.jobId}/invoice`}
            >
              Invoice
            </Link>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Creating..."
          : `Create external job · ${totalDisplay}`}
      </button>
    </form>
  );
}
