export const SUPPORTED_LOCALES = [
  "en",
  "tr",
  "de",
  "es",
  "fr",
  "it",
  "pt",
  "ru",
  "hu",
  "nl",
  "sa",
  "el",
] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = "en";

// Rollout is staged intentionally so we don't emit hreflang signals
// for locales that do not yet have public routes and translated content.
export const ACTIVE_LOCALES: SiteLocale[] = ["en", "tr", "de", "fr", "nl"];

export const FUTURE_LOCALES: SiteLocale[] = SUPPORTED_LOCALES.filter(
  (locale) => !ACTIVE_LOCALES.includes(locale)
);

export const RTL_LOCALES: SiteLocale[] = ["sa"];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  hu: "Magyar",
  nl: "Nederlands",
  sa: "العربية",
  el: "Ελληνικά",
};

export function isSupportedLocale(value: string): value is SiteLocale {
  return SUPPORTED_LOCALES.includes(value as SiteLocale);
}

export function isActiveLocale(locale: SiteLocale): boolean {
  return ACTIVE_LOCALES.includes(locale);
}

// Keep in sync with src/app/[locale]/ directory.
// Add a route here whenever you add a new src/app/[locale]/<route>/page.tsx.
// Missing entry → switcher falls back to locale homepage (safe but suboptimal).
// Extra entry that doesn't exist → switcher navigates to a 404 (bad).
export const LOCALIZED_ROUTES = new Set([
  "bosphorus-cruise",
  "istanbul-dinner-cruise",
  "cruises",
  "cruises/bosphorus-sunset-cruise",
  "yacht-charter-istanbul",
  "boat-rental-istanbul",
  "boat-rental-hourly-istanbul",
  "private-bosphorus-dinner-cruise",
  "proposal-yacht-rental-istanbul",
  "proposal-yacht-with-photographer-istanbul",
  "corporate-events",
  "corporate-yacht-dinner-istanbul",
  "private-events",
  "private-tours",
  "client-hosting-yacht-istanbul",
  "product-launch-yacht-istanbul",
  "team-building-yacht-istanbul",
  "faq",
  "about",
  "contact",
  "reservation",
  "blog",
  "guides",
  "bosphorus-cruise-departure-points",
  "dinner-cruise-pickup-sultanahmet-taksim",
  "dinner-cruise-with-hotel-pickup-istanbul",
  "kabatas-dinner-cruise-istanbul",
  "kurucesme-marina-yacht-charter",
  "private-dinner-cruise-for-couples-istanbul",
  "sunset-cruise-tickets-istanbul",
  "turkish-night-dinner-cruise-istanbul",
]);

export function getHtmlDir(locale: SiteLocale): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}
