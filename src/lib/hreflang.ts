import { ACTIVE_LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import {
  LOCALIZED_ROUTES,
  RU_ENABLED_ROUTES,
  ZH_ENABLED_ROUTES,
} from "@/i18n/localized-routes";

// Route segment -> BCP-47 hreflang ATTRIBUTE code. The URL path keeps the route
// segment (/zh/, /sa/), but the hreflang attribute must be a valid language
// code, not a country code. "zh" content is Simplified → "zh-Hans"; "sa" (Saudi
// Arabia, a region) → Arabic → "ar". Emitting raw hreflang="zh"/"sa" is what
// triggers Semrush/Google "language mismatch" (detected zh-Hans/ar != declared
// zh/sa). Any locale not listed already IS a valid ISO-639 code (tr/de/fr/nl/
// ru/en) and passes through unchanged.
const HREFLANG_CODE: Record<string, string> = {
  sa: "ar",
  zh: "zh-Hans",
};
function hreflangCode(locale: string): string {
  return HREFLANG_CODE[locale] ?? locale;
}

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
    // Stage zh: only emit hreflang for paths that have a live /zh page.
    if (locale === "zh" && !ZH_ENABLED_ROUTES.has(path)) continue;
    languages[hreflangCode(locale)] = `${SITE_URL}/${locale}${path}`;
  }

  return languages;
}
