import { ACTIVE_LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

// Routes that will have locale-specific versions when non-EN locales are activated.
// EN stays at root (e.g. /bosphorus-cruise), other locales get a prefix (e.g. /tr/bosphorus-cruise).
const LOCALIZED_ROUTES = new Set([
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/proposal-yacht-rental-istanbul",
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
    if (locale !== "en") {
      languages[locale] = `${SITE_URL}/${locale}${path}`;
    }
  }

  return languages;
}
