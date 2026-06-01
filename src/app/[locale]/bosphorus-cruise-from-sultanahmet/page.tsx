import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import { HOTEL_CLUSTER_DISTRICTS_TR } from "@/lib/hotel-cluster-content";

// Only TR for now — DE/FR/NL/RU variants can be added by extending
// hotel-cluster-content.ts and the CHROME_STRINGS in HotelClusterPage.
export async function generateStaticParams() {
  return [{ locale: "tr" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  const district = HOTEL_CLUSTER_DISTRICTS_TR.sultanahmet;
  return {
    title: "Sultanahmet'ten Boğaz Turu — €30",
    description:
      "Sultanahmet otellerinden Boğaz turu. Akşam yemekli turda otel pickup dahil (€30'dan). T1 tramvayıyla Kabataş'a 8-12 dk. TÜRSAB A lisanslı.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/${district.slug}`,
      languages: buildHreflang(`/${district.slug}`),
    },
    openGraph: {
      title: "Sultanahmet'ten Boğaz Turu",
      description: "Sultanahmet'ten Boğaz turu — doğrudan rezervasyon, akşam yemekli turda otel pickup dahil, Kabataş iskelesine T1 tramvayı + taksi seçenekleri.",
      url: `${SITE_URL}/${locale}/${district.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();
  return <HotelClusterPage district={HOTEL_CLUSTER_DISTRICTS_TR.sultanahmet} locale={locale as SiteLocale} />;
}
