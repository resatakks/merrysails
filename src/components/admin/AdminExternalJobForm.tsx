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
type Status = "new" | "confirmed" | "completed" | "cancelled";

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

  const [currency, setCurrency] = useState<Currency>("EUR");
  const [amount, setAmount] = useState<string>("");

  const amountValue = Number.parseFloat(amount.replace(",", "."));
  const safeAmount = Number.isFinite(amountValue) ? amountValue : 0;
  const totalDisplay = formatMoney(safeAmount, currency);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="currency" value={currency} />

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
          Client company (whose voucher/invoice we issue)
        </h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          The voucher and invoice PDF will show THIS company&apos;s logo + tax
          ID + address — not our own brand.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelText}>Company name *</span>
            <input name="companyName" required className={inputClass} />
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
          <label className="md:col-span-2">
            <span className={labelText}>Company logo URL</span>
            <input
              name="companyLogoUrl"
              type="url"
              placeholder="https://example.com/logo.png — appears on PDF header"
              className={inputClass}
            />
          </label>
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
              required
              placeholder="e.g. Bosphorus Sunset Cruise, Yacht Charter, Airport Transfer"
              className={inputClass}
            />
          </label>
          <label>
            <span className={labelText}>Service description</span>
            <textarea
              name="serviceDescription"
              rows={3}
              placeholder="Optional — extra detail shown on voucher + invoice"
              className={textareaClass}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
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
                placeholder="19:00 or TBC"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelText}>Guests / pax</span>
              <input
                type="number"
                name="guests"
                min="1"
                defaultValue="1"
                required
                className={inputClass}
              />
            </label>
          </div>
          <label>
            <span className={labelText}>Pickup / meeting point</span>
            <input
              name="pickupPoint"
              placeholder="Optional"
              className={inputClass}
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
              name="paymentMethod"
              defaultValue="cash_on_board"
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
      </section>

      <div className="grid gap-4">
        <label>
          <span className={labelText}>
            Customer-facing note (voucher + invoice)
          </span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Optional — shown on the customer voucher/invoice"
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
            placeholder="Optional — never leaves the admin"
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
