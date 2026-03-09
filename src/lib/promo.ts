/**
 * Sunset cruise winter promotion config.
 * Promo ends March 20, 2026 — price reverts from €20 to €40.
 */

export const SUNSET_PROMO = {
  slug: "bosphorus-sunset-cruise",
  promoPrice: 20,
  regularPrice: 40,
  // March 20, 2026 00:00 Istanbul time (UTC+3)
  endDate: new Date("2026-03-20T00:00:00+03:00"),
  label: "Winter Special",
} as const;

export function isPromoActive(): boolean {
  return new Date() < SUNSET_PROMO.endDate;
}

export function getSunsetPrice(): number {
  return isPromoActive() ? SUNSET_PROMO.promoPrice : SUNSET_PROMO.regularPrice;
}
