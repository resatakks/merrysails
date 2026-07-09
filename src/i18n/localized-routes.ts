// Single source of truth for routes that have live [locale]/<path>/page.tsx
// shipped for each active non-EN locale. Consumers (hreflang, sitemap, Header,
// Footer) import these sets instead of redefining their own — drift between
// them caused hreflang→404 and missing alternates in earlier audits
// (2026-05-17, 2026-06-05).
//
// EN stays at the root (`/path`); other locales get a `/<locale>/path` prefix.
// Homepage is represented as `""` (path-suffix convention) — sitemap callers
// substitute `"/"` themselves.
//
// IMPORTANT: only add a path here AFTER src/app/[locale]/<path>/page.tsx exists
// for every active non-EN locale (tr, de, fr, nl). Pointing hreflang at 404s
// hurts crawl quality.

// Core LOCALIZED_ROUTES — covers tr, de, fr, nl on every active path. Used by
// hreflang.ts (with "" homepage) and Header/Footer (no homepage entry).
export const LOCALIZED_ROUTES = new Set<string>([
  "", // homepage — EN root "/" + /tr /de /fr /nl
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/boat-rental-hourly-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/proposal-yacht-rental-istanbul",
  "/corporate-events",
  "/private-events",
  "/faq",
  "/about",
  "/contact",
  "/blog",
  "/guides",
  "/cruises",
  "/private-tours",
  "/bosphorus-cruise-departure-points",
  "/client-hosting-yacht-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/kabatas-dinner-cruise-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/private-dinner-cruise-for-couples-istanbul",
  "/product-launch-yacht-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/team-building-yacht-istanbul",
  "/turkish-night-dinner-cruise-istanbul",
  "/honeymoon-yacht-cruise-istanbul",
  "/anniversary-yacht-cruise-istanbul",
  "/bosphorus-cruise-for-couples",
  "/bosphorus-cruise-for-families",
  // 2026-06-02: Hotel-cluster pages — shipped in EN + TR + DE + FR + NL + RU.
  "/bosphorus-cruise-from-sultanahmet",
  "/bosphorus-cruise-from-taksim",
  "/bosphorus-cruise-from-beyoglu",
  // NOTE: /kabatas-bogaz-turu is TR-ONLY — explicitly excluded to prevent
  // emitting hreflang annotations for non-existent /de/, /fr/, /nl/, / variants.
]);

// Subset of LOCALIZED_ROUTES that ALSO has a live /ru/<path> page.
// Mirror exactly with RU_ENABLED_PATHS in sitemap consumer logic.
export const RU_ENABLED_ROUTES = new Set<string>([
  "", // homepage
  "/bosphorus-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/istanbul-dinner-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/corporate-events",
  "/private-events",
  "/kabatas-dinner-cruise-istanbul",
  "/team-building-yacht-istanbul",
  "/kurucesme-marina-yacht-charter",
  // 2026-06-02: Hotel-cluster RU variants shipped.
  "/bosphorus-cruise-from-sultanahmet",
  "/bosphorus-cruise-from-taksim",
  "/bosphorus-cruise-from-beyoglu",
  // 2026-06-05: audience pages also live in RU.
  "/anniversary-yacht-cruise-istanbul",
  "/honeymoon-yacht-cruise-istanbul",
  "/bosphorus-cruise-for-couples",
  "/bosphorus-cruise-for-families",
]);

// 2026-06-04: Chinese (Simplified) staged rollout.
export const ZH_ENABLED_ROUTES = new Set<string>([
  "", // homepage
  "/bosphorus-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/istanbul-dinner-cruise",
  "/yacht-charter-istanbul",
]);
