import { notFound } from "next/navigation";
import { ACTIVE_LOCALES, isActiveLocale, getHtmlDir, type SiteLocale } from "@/i18n/config";

// Route segment -> BCP-47 language code for the lang attribute. The URL path
// keeps the route segment (/zh/, /sa/), but the lang attribute must be a valid
// language code, not a country code: "zh" → "zh-Hans" (Simplified); "sa" (Saudi
// Arabia, a region) → "ar" (Arabic). Mirrors HREFLANG_CODE in src/lib/hreflang.ts
// + the sitemap so every language signal agrees.
const LANG_CODE: Record<string, string> = {
  sa: "ar",
  zh: "zh-Hans",
};

export function generateStaticParams() {
  // Only generate routes for non-EN active locales.
  // When ACTIVE_LOCALES is ["en"], this returns [] — no [locale] routes built yet.
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    notFound();
  }

  // Wrap with lang + dir so screen readers and crawlers get the right language signal
  // even though the <html> lang is set to "en" in the root layout.
  return (
    <div lang={LANG_CODE[locale] ?? locale} dir={getHtmlDir(locale as SiteLocale)}>
      {children}
    </div>
  );
}
