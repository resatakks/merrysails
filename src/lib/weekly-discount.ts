/**
 * Weekly (day-of-week) discount utility for the Bosphorus Sunset Cruise
 * and any other tour that defines a `weekdayDiscount` on its packages.
 *
 * Every Tuesday (2) and Thursday (4) the sunset cruise packages carry a
 * reduced per-person price:
 *   Without Wine  €34 → €30
 *   With Wine     €40 → €35
 *
 * Pure utility — no I/O, safe to import from server actions, client
 * components, email templates, and PDF generators.
 *
 * Uses JS Date.getDay() encoding: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat.
 */

import type { Package } from "@/data/tours";

export interface WeeklyDiscountResult {
  /** True when the package has a weekday discount AND the date falls on a qualifying day. */
  eligible: boolean;
  /** Standard (non-discounted) unit price. */
  standardPrice: number;
  /** Effective unit price — equals discountedPrice when eligible, standardPrice otherwise. */
  effectivePrice: number;
  /** Savings per person (0 when not eligible). */
  savingsPerUnit: number;
  /** Human-readable label (e.g. "Tuesday & Thursday Sailings"). */
  label: string;
}

/**
 * Returns the weekday-discount result for a given package and optional date.
 * When date is undefined/null the discount is treated as not eligible.
 */
export function applyWeeklyDiscount(
  pkg: Package | undefined,
  date: Date | string | null | undefined
): WeeklyDiscountResult {
  const standardPrice = pkg?.price ?? 0;
  const noDiscount: WeeklyDiscountResult = {
    eligible: false,
    standardPrice,
    effectivePrice: standardPrice,
    savingsPerUnit: 0,
    label: "",
  };

  if (!pkg?.weekdayDiscount || !date) return noDiscount;

  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || Number.isNaN(d.getTime())) return noDiscount;

  const dayOfWeek = d.getDay();
  const { weekdays, discountedPrice, label = "" } = pkg.weekdayDiscount;

  if (!weekdays.includes(dayOfWeek)) return noDiscount;

  return {
    eligible: true,
    standardPrice,
    effectivePrice: discountedPrice,
    savingsPerUnit: standardPrice - discountedPrice,
    label,
  };
}

/**
 * Convenience: given a package and a date, return the effective unit price.
 * Handles missing package/date gracefully.
 */
export function getEffectivePackagePrice(
  pkg: Package | undefined,
  date: Date | string | null | undefined,
  fallback = 0
): number {
  if (!pkg) return fallback;
  const result = applyWeeklyDiscount(pkg, date);
  return result.effectivePrice || pkg.price || fallback;
}
