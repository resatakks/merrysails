/**
 * Shared merchant-listing fields required by Google's Product / Offer rich
 * result spec.  Without these on every Offer node, the page is silently
 * dropped from the "Merchant listings" report in GSC (we saw it crash from
 * 12 valid items in April 2026 to 0 by mid-May because these were missing).
 *
 * Cruises and yacht charters do not physically ship anything — guests board
 * at the marina — so we declare `doesNotShip: true` and a free-return,
 * one-day return-by-mail policy that matches the digital/voucher reality.
 *
 * Usage: spread `...OFFER_MERCHANT_DEFAULTS` inside any object literal that
 * already has `"@type": "Offer"`:
 *
 *   offers: {
 *     "@type": "Offer",
 *     price: 30,
 *     priceCurrency: "EUR",
 *     ...OFFER_MERCHANT_DEFAULTS,
 *   }
 *
 * Reference: CLAUDE.md rule 4c (merchant listings required fields).
 */
export const OFFER_MERCHANT_DEFAULTS = {
  shippingDetails: {
    "@type": "OfferShippingDetails",
    doesNotShip: true,
  },
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "TR",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnFees: "https://schema.org/FreeReturn",
    returnMethod: "https://schema.org/ReturnByMail",
  },
} as const;

/**
 * Shared inLanguage hint for the brand's "primary" surfaces (Organization,
 * WebSite, Captain Person schemas) rendered in the root layout. Yandex
 * weighs the schema-level `inLanguage` signal more heavily than Google does
 * for language attribution; without it, the Russian Wikidata graph + Yandex
 * "Translate this page" hints fall through to OG `locale`, which is weaker.
 *
 * The site root layout is hard-coded to `en` (other locales are middleware-
 * rewritten), so the brand-level entity declarations all advertise English
 * here. Per-page schemas (tours, blog posts, locale pages) override this
 * with their own `inLanguage` to match the surface they live on.
 */
export const BRAND_IN_LANGUAGE = "en" as const;
