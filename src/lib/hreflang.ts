import { ACTIVE_LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

// Routes that have live [locale]/ pages for every active non-EN locale.
// Only add a path here once its locale/page.tsx files exist — hreflang pointing
// to 404s hurts crawl quality. EN stays at root; other locales get a /<locale>/ prefix.
const LOCALIZED_ROUTES = new Set([
  "", // homepage — EN root "/" + /tr /de /fr /nl
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
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
  "/boat-rental-hourly-istanbul",
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
  "/sunset-cruise-tickets-istanbul",
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
  // NOTE: /kabatas-bogaz-turu is TR-ONLY — explicitly excluded from LOCALIZED_ROUTES
  // to prevent emitting hreflang annotations for non-existent /de/, /fr/, /nl/, / variants.
  // Adding it here causes 4×404 in Semrush (Source: 2026-05-17 audit).
]);

// Subset of LOCALIZED_ROUTES that ALSO have a live /ru/<path> page.
// Russian rollout is staged: only the top-3 commercial tours + homepage have a
// fully translated /ru page so far. Other routes in LOCALIZED_ROUTES are
// EN/TR/DE/FR/NL only and must NOT emit a ru hreflang (pointing at a 404 hurts
// crawl quality). Add a path here once src/app/[locale]/<path>/page.tsx ships a
// ru TRANSLATIONS block.
// RU now covers 13 paths (2026-06-01 expansion). Adding to this set enables
// ru hreflang alternates on the EN canonical page, which is what crawlers use
// to discover the Russian variant. Stage-set must match RU_ENABLED_PATHS in
// src/app/sitemap.xml/route.ts.
const RU_ENABLED_ROUTES = new Set([
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
]);

/**
 * Builds alternates.languages for Next.js generateMetadata().
 * Returns undefined for routes not in LOCALIZED_ROUTES, so they get no hreflang.
 * When only EN is active, only x-default + en are emitted — no premature signals.
 */
export function buildHreflang(path: string): Record<string, string> | undefined {
  if (!LOCALIZED_ROUTES.has(path)) return undefined;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}${path}`,
    en: `${SITE_URL}${path}`,
  };

  for (const locale of ACTIVE_LOCALES) {
    if (locale === "en") continue;
    // Stage ru: only emit hreflang for paths that have a live /ru page.
    if (locale === "ru" && !RU_ENABLED_ROUTES.has(path)) continue;
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }

  return languages;
}
