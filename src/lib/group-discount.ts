/**
 * Group discount: 2+ guests on shared cruises (sunset & dinner) get an
 * automatic 10% discount, then rounded down to a "nicer" number.
 *
 * Yacht charter (private) and other private experiences are ineligible.
 *
 * Pure utility — no I/O, safe to import from server actions, client
 * components, email templates, and PDF generators.
 */

export const GROUP_DISCOUNT_CODE = "SAIL10";
export const GROUP_DISCOUNT_PCT = 0.1;
/**
 * 3+ guests trigger the 10% group discount. 2-guest bookings are the modal
 * party size for sunset/dinner cruises, so a 2+ threshold would be a flat
 * giveaway with no upsell pull. 3+ keeps the promo strategic — it nudges
 * couples to bring a third person.
 */
export const GROUP_DISCOUNT_MIN_GUESTS = 3;

const ELIGIBLE_TOUR_SLUGS = new Set<string>([
  "bosphorus-sunset-cruise",
  "bosphorus-dinner-cruise",
]);

export function isGroupDiscountEligibleTour(tourSlug: string | null | undefined): boolean {
  if (!tourSlug) return false;
  return ELIGIBLE_TOUR_SLUGS.has(tourSlug.trim().toLowerCase());
}

export function isGroupDiscountEligible(
  tourSlug: string | null | undefined,
  guests: number,
): boolean {
  return (
    isGroupDiscountEligibleTour(tourSlug) &&
    Number.isFinite(guests) &&
    guests >= GROUP_DISCOUNT_MIN_GUESTS
  );
}

/**
 * Round down to a "nicer" number. Examples:
 *   34 -> 30, 47 -> 45, 68 -> 60, 91 -> 90, 144 -> 140, 218 -> 200.
 *
 * Tiers:
 *   < 50    -> nearest €5
 *   < 200   -> nearest €10
 *   >= 200  -> nearest €20
 */
export function niceRoundDown(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  let bucket: number;
  if (amount < 50) bucket = 5;
  else if (amount < 200) bucket = 10;
  else bucket = 20;
  return Math.floor(amount / bucket) * bucket;
}

export interface GroupDiscountResult {
  /** True when both tour and guest count qualify. */
  eligible: boolean;
  /** "min_guests" when guests<2, "ineligible_tour" otherwise. Only set when not eligible. */
  ineligibilityReason?: "min_guests" | "ineligible_tour";
  /** Subtotal before any discount (EUR). */
  originalTotal: number;
  /** Final total after 10% off + nice-rounding (EUR). Equal to originalTotal when not eligible. */
  discountedTotal: number;
  /** originalTotal - discountedTotal. 0 when not eligible. */
  savings: number;
  /** Effective % saved (savings / originalTotal). Slightly more than 10% due to rounding. */
  effectivePct: number;
  /** Promo code label shown to the customer. */
  code: string;
}

export function applyGroupDiscount(
  originalTotal: number,
  tourSlug: string | null | undefined,
  guests: number,
): GroupDiscountResult {
  const safeOriginal =
    Number.isFinite(originalTotal) && originalTotal > 0 ? originalTotal : 0;

  if (!isGroupDiscountEligibleTour(tourSlug)) {
    return {
      eligible: false,
      ineligibilityReason: "ineligible_tour",
      originalTotal: safeOriginal,
      discountedTotal: safeOriginal,
      savings: 0,
      effectivePct: 0,
      code: GROUP_DISCOUNT_CODE,
    };
  }

  if (!Number.isFinite(guests) || guests < GROUP_DISCOUNT_MIN_GUESTS) {
    return {
      eligible: false,
      ineligibilityReason: "min_guests",
      originalTotal: safeOriginal,
      discountedTotal: safeOriginal,
      savings: 0,
      effectivePct: 0,
      code: GROUP_DISCOUNT_CODE,
    };
  }

  const raw = safeOriginal * (1 - GROUP_DISCOUNT_PCT);
  const discountedTotal = niceRoundDown(raw);
  const savings = Math.max(0, safeOriginal - discountedTotal);
  const effectivePct = safeOriginal > 0 ? savings / safeOriginal : 0;

  return {
    eligible: true,
    originalTotal: safeOriginal,
    discountedTotal,
    savings,
    effectivePct,
    code: GROUP_DISCOUNT_CODE,
  };
}

/** Short label for UI — "Group discount (2+ guests, sunset & dinner)" style. */
export function getGroupDiscountLabel(): string {
  return `Group discount (${GROUP_DISCOUNT_MIN_GUESTS}+ guests)`;
}

/** Marketing copy used across booking form, emails, PDFs. */
export const GROUP_DISCOUNT_COPY = {
  badge: `Group of ${GROUP_DISCOUNT_MIN_GUESTS}+ saves 10% — auto-applied`,
  badgeLong: `Bring a friend — ${GROUP_DISCOUNT_MIN_GUESTS}+ guests save 10% automatically`,
  emailLine: () => `Group discount (${GROUP_DISCOUNT_MIN_GUESTS}+ guests)`,
  voucherFootnote: (savings: number, currency: string) =>
    `You saved ${currency}${savings.toFixed(0)} with our group discount.`,
} as const;
