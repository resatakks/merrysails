import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  redirect(`/${locale}/bosphorus-cruise`);
}
