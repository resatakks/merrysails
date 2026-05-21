/**
 * Mixed-package booking helpers. A reservation can carry an optional `items`
 * JSONB column with per-package guest counts so families/groups can split a
 * single reservation across, e.g., an alcohol package and a soft-drinks
 * package. When `items` is absent or has fewer than 2 entries the booking is
 * treated as a single-package reservation (legacy path) — renderers fall
 * back to the existing pricing snapshot in that case.
 */
import { currencySymbol } from "@/lib/email-templates/helpers";

export interface ReservationLineItem {
  packageName: string;
  guests: number;
  unitPrice: number;
  unitLabel: string;
  total: number;
  currency: string;
}

/**
 * Best-effort coercion from the Prisma Json column to a typed array. Returns
 * null when the value is missing, malformed, or has fewer than 2 entries so
 * call sites can branch with a single null-check.
 */
export function parseReservationItems(value: unknown): ReservationLineItem[] | null {
  if (!Array.isArray(value)) return null;
  const items: ReservationLineItem[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const e = entry as Record<string, unknown>;
    const packageName = typeof e.packageName === "string" ? e.packageName.trim() : "";
    const guests = Number(e.guests);
    const unitPrice = Number(e.unitPrice);
    const unitLabel = typeof e.unitLabel === "string" ? e.unitLabel : "/person";
    const total = Number(e.total);
    const currency = typeof e.currency === "string" ? e.currency : "EUR";
    if (!packageName || !Number.isFinite(guests) || guests < 1) continue;
    items.push({
      packageName,
      guests: Math.trunc(guests),
      unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
      unitLabel,
      total: Number.isFinite(total) ? total : 0,
      currency,
    });
  }
  return items.length >= 2 ? items : null;
}

/** Short human-readable summary: "Alcohol Package (3) · Soft Drinks (2)". */
export function formatItemsSummary(items: ReservationLineItem[]): string {
  return items
    .map((it) => `${it.packageName} (${it.guests})`)
    .join(" · ");
}

/** Per-line summary with prices: "Alcohol · 3 guests · €45/person · €135". */
export function formatItemLineWithPrice(item: ReservationLineItem): string {
  const sym = currencySymbol(item.currency);
  return `${item.packageName} · ${item.guests} guest${item.guests > 1 ? "s" : ""} · ${sym}${item.unitPrice}${item.unitLabel} · ${sym}${item.total}`;
}
