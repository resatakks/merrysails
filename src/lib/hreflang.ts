import { ACTIVE_LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import {
  LOCALIZED_ROUTES,
  RU_ENABLED_ROUTES,
  ZH_ENABLED_ROUTES,
} from "@/i18n/localized-routes";

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
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }

  return languages;
}
