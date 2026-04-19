import { DEFAULT_LOCALE, type SiteLocale } from "./config";

export type LocalizedField<T> = Partial<Record<SiteLocale, T>>;

export function getLocalizedValue<T>(
  field: LocalizedField<T>,
  locale: SiteLocale,
  fallbackLocale: SiteLocale = DEFAULT_LOCALE
): T | undefined {
  return field[locale] ?? field[fallbackLocale];
}
