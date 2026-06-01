import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import { HOTEL_CLUSTER_DISTRICTS_TR } from "@/lib/hotel-cluster-content";

export async function generateStaticParams() {
  return [{ locale: "tr" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  const district = HOTEL_CLUSTER_DISTRICTS_TR.taksim;
  return {
    title: "Taksim'den Boğaz Turu — €30",
    description:
      "Taksim otellerinden Boğaz turu. F1 füniküleriyle Kabataş'a 5 dakika, taksi 10 dakika. Pzt/Sal/Per gün batımı €30. Akşam yemekli turda otel pickup.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/${district.slug}`,
      languages: buildHreflang(`/${district.slug}`),
    },
    openGraph: {
      title: "Taksim'den Boğaz Turu",
      description: "Taksim'den Boğaz turu — F1 füniküleri sizi Kabataş'a 5 dakikada bırakır. Doğrudan rezervasyon, akşam yemekli turda otel pickup.",
      url: `${SITE_URL}/${locale}/${district.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();
  return <HotelClusterPage district={HOTEL_CLUSTER_DISTRICTS_TR.taksim} locale={locale as SiteLocale} />;
}
