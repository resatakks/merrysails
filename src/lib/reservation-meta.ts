import type { ReservationPricingSnapshot } from "@/lib/reservation-pricing";

const META_START = "[MERRYSAILS_META]";
const META_END = "[/MERRYSAILS_META]";

interface ReservationMetaPayload {
  packageName?: string;
  addOns?: string[];
  customerNote?: string;
  pricing?: ReservationPricingSnapshot;
}

export interface ParsedReservationMeta {
  packageName?: string;
  addOns: string[];
  customerNote?: string;
  pricing?: ReservationPricingSnapshot;
  hasStructuredMeta: boolean;
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

  return {
    currency: pricing.currency === "EUR" ? "EUR" : "EUR",
    guests: Math.max(1, Math.trunc(pricing.guests)),
    priceMode: pricing.priceMode,
    lineItems,
    subtotal: roundMoney(pricing.subtotal),
    addOnsTotal: roundMoney(pricing.addOnsTotal),
    total: roundMoney(pricing.total),
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
    pricing: sanitizePricingSnapshot(payload.pricing),
  };

  if (
    !cleanedPayload.packageName &&
    (!cleanedPayload.addOns || cleanedPayload.addOns.length === 0) &&
    !cleanedPayload.customerNote &&
    !cleanedPayload.pricing
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
      pricing: sanitizePricingSnapshot(parsed.pricing),
      hasStructuredMeta: true,
    };
  } catch {
    return {
      addOns: [],
      customerNote: trimmed,
      pricing: undefined,
      hasStructuredMeta: false,
    };
  }
}
