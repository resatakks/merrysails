import { notFound } from "next/navigation";
import { ACTIVE_LOCALES, isActiveLocale, getHtmlDir, type SiteLocale } from "@/i18n/config";

export function generateStaticParams() {
  // Only generate routes for non-EN active locales.
  // When ACTIVE_LOCALES is ["en"], this returns [] — no [locale] routes built yet.
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    notFound();
  }

  // Wrap with lang + dir so screen readers and crawlers get the right language signal
  // even though the <html> lang is set to "en" in the root layout.
  return (
    <div lang={locale} dir={getHtmlDir(locale as SiteLocale)}>
      {children}
    </div>
  );
}
