import type { ReservationPricingSnapshot } from "@/lib/reservation-pricing";

const META_START = "[MERRYSAILS_META]";
const META_END = "[/MERRYSAILS_META]";

/**
 * Payment methods surfaced in admin reservation creation. `cash_on_board` and
 * `card_on_board` map to the same customer-facing copy on shared cruises;
 * `card_paid` means the booking is settled (no on-board collection).
 */
export type ReservationPaymentMethod =
  | "cash_on_board"
  | "card_on_board"
  | "card_paid"
  | "bank_transfer";

/**
 * Email template flag — written to meta so resend uses the same flow.
 * `custom-booking` switches sendReservationCustomerEmail to the minimal
 * private-booking template (with optional meeting-point note).
 */
export type ReservationEmailTemplate = "standard" | "custom-booking";

interface ReservationMetaPayload {
  packageName?: string;
  addOns?: string[];
  customerNote?: string;
  additionalGuests?: string[];
  privateTransferRequested?: boolean;
  pricing?: ReservationPricingSnapshot;
  meetingPointNote?: string;
  paymentMethod?: ReservationPaymentMethod;
  internalOperatorNote?: string;
  emailTemplate?: ReservationEmailTemplate;
  voucherExtraNote?: string;
  voucherExtraNoteTitle?: string;
  /** Overrides the computed "Guests" line verbatim (e.g. "Up to 10 guests"
   * for a capacity-priced private charter without a confirmed headcount). */
  guestSummaryOverride?: string;
  /** Overrides the auto-generated "Good to know" payment sentence verbatim
   * (e.g. a split deposit + balance) — the 4 fixed paymentMethod values
   * can't express a partial-deposit booking accurately. */
  paymentNoteOverride?: string;
}

export interface ParsedReservationMeta {
  packageName?: string;
  addOns: string[];
  customerNote?: string;
  additionalGuests: string[];
  privateTransferRequested: boolean;
  pricing?: ReservationPricingSnapshot;
  hasStructuredMeta: boolean;
  meetingPointNote?: string;
  paymentMethod?: ReservationPaymentMethod;
  internalOperatorNote?: string;
  emailTemplate?: ReservationEmailTemplate;
  voucherExtraNote?: string;
  voucherExtraNoteTitle?: string;
  guestSummaryOverride?: string;
  paymentNoteOverride?: string;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function sanitizePricingSnapshot(
  pricing?: ReservationPricingSnapshot
): ReservationPricingSnapshot | undefined {
  if (!pricing) {
    return undefined;
  }

  const lineItems = pricing.lineItems
    .filter(
      (item) =>
        item &&
        typeof item.label === "string" &&
        Number.isFinite(item.quantity) &&
        Number.isFinite(item.unitPrice) &&
        Number.isFinite(item.total)
    )
    .map((item) => ({
      type: item.type,
      label: item.label.trim(),
      quantity: Math.max(1, Math.trunc(item.quantity)),
      unitPrice: roundMoney(item.unitPrice),
      unitLabel: item.unitLabel?.trim() || "",
      total: roundMoney(item.total),
    }));

  const total = roundMoney(pricing.total);
  const originalTotal = roundMoney(
    typeof pricing.originalTotal === "number" ? pricing.originalTotal : pricing.total
  );
  const groupDiscount = pricing.groupDiscount ?? {
    eligible: false,
    originalTotal,
    discountedTotal: total,
    savings: 0,
    effectivePct: 0,
    code: "SAIL10",
  };
  const weeklyDiscount = pricing.weeklyDiscount ?? {
    eligible: false,
    standardPrice: roundMoney(pricing.subtotal / Math.max(1, pricing.guests)),
    effectivePrice: roundMoney(pricing.subtotal / Math.max(1, pricing.guests)),
    savingsPerUnit: 0,
    label: "",
  };

  return {
    currency: pricing.currency === "EUR" ? "EUR" : "EUR",
    guests: Math.max(1, Math.trunc(pricing.guests)),
    guestBreakdown: pricing.guestBreakdown ?? {
      adults: Math.max(1, Math.trunc(pricing.guests)),
      children: 0,
      infants: 0,
    },
    childDiscountSavings: pricing.childDiscountSavings ?? 0,
    priceMode: pricing.priceMode,
    lineItems,
    subtotal: roundMoney(pricing.subtotal),
    addOnsTotal: roundMoney(pricing.addOnsTotal),
    originalTotal,
    total,
    groupDiscount,
    weeklyDiscount,
  };
}

export function serializeReservationNotes(
  payload: ReservationMetaPayload
): string | null {
  const cleanedPayload: ReservationMetaPayload = {
    packageName: payload.packageName?.trim() || undefined,
    addOns:
      payload.addOns
        ?.map((item) => item.trim())
        .filter(Boolean) ?? [],
    customerNote: payload.customerNote?.trim() || undefined,
    additionalGuests:
      payload.additionalGuests
        ?.map((item) => item.trim())
        .filter(Boolean) ?? [],
    privateTransferRequested: payload.privateTransferRequested || undefined,
    pricing: sanitizePricingSnapshot(payload.pricing),
    meetingPointNote: payload.meetingPointNote?.trim() || undefined,
    paymentMethod: payload.paymentMethod,
    internalOperatorNote: payload.internalOperatorNote?.trim() || undefined,
    emailTemplate: payload.emailTemplate,
    voucherExtraNote: payload.voucherExtraNote?.trim() || undefined,
    voucherExtraNoteTitle: payload.voucherExtraNoteTitle?.trim() || undefined,
    guestSummaryOverride: payload.guestSummaryOverride?.trim() || undefined,
    paymentNoteOverride: payload.paymentNoteOverride?.trim() || undefined,
  };

  if (
    !cleanedPayload.packageName &&
    (!cleanedPayload.addOns || cleanedPayload.addOns.length === 0) &&
    !cleanedPayload.customerNote &&
    (!cleanedPayload.additionalGuests || cleanedPayload.additionalGuests.length === 0) &&
    !cleanedPayload.privateTransferRequested &&
    !cleanedPayload.pricing &&
    !cleanedPayload.meetingPointNote &&
    !cleanedPayload.paymentMethod &&
    !cleanedPayload.internalOperatorNote &&
    !cleanedPayload.emailTemplate &&
    !cleanedPayload.voucherExtraNote &&
    !cleanedPayload.guestSummaryOverride &&
    !cleanedPayload.paymentNoteOverride
  ) {
    return null;
  }

  return `${META_START}${JSON.stringify(cleanedPayload)}${META_END}`;
}

export function parseReservationNotes(
  notes?: string | null
): ParsedReservationMeta {
  const trimmed = notes?.trim();

  if (!trimmed) {
    return {
      addOns: [],
      additionalGuests: [],
      privateTransferRequested: false,
      pricing: undefined,
      hasStructuredMeta: false,
    };
  }

  const startIndex = trimmed.indexOf(META_START);
  const endIndex = trimmed.indexOf(META_END);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return {
      addOns: [],
      customerNote: trimmed,
      additionalGuests: [],
      privateTransferRequested: false,
      pricing: undefined,
      hasStructuredMeta: false,
    };
  }

  const rawJson = trimmed
    .slice(startIndex + META_START.length, endIndex)
    .trim();

  try {
    const parsed = JSON.parse(rawJson) as ReservationMetaPayload;

    return {
      packageName: parsed.packageName?.trim() || undefined,
      addOns:
        parsed.addOns
          ?.map((item) => item.trim())
          .filter(Boolean) ?? [],
      customerNote: parsed.customerNote?.trim() || undefined,
      additionalGuests:
        parsed.additionalGuests
          ?.map((item) => item.trim())
          .filter(Boolean) ?? [],
      privateTransferRequested: Boolean(parsed.privateTransferRequested),
      pricing: sanitizePricingSnapshot(parsed.pricing),
      hasStructuredMeta: true,
      meetingPointNote: parsed.meetingPointNote?.trim() || undefined,
      paymentMethod: parsed.paymentMethod,
      internalOperatorNote: parsed.internalOperatorNote?.trim() || undefined,
      emailTemplate: parsed.emailTemplate,
      voucherExtraNote: parsed.voucherExtraNote?.trim() || undefined,
      voucherExtraNoteTitle: parsed.voucherExtraNoteTitle?.trim() || undefined,
      guestSummaryOverride: parsed.guestSummaryOverride?.trim() || undefined,
      paymentNoteOverride: parsed.paymentNoteOverride?.trim() || undefined,
    };
  } catch {
    return {
      addOns: [],
      customerNote: trimmed,
      additionalGuests: [],
      privateTransferRequested: false,
      pricing: undefined,
      hasStructuredMeta: false,
    };
  }
}
