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

export function getHtmlDir(locale: SiteLocale): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}
