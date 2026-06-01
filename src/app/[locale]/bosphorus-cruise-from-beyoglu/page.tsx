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
  const district = HOTEL_CLUSTER_DISTRICTS_TR.beyoglu;
  return {
    title: "Beyoğlu'ndan Boğaz Turu — €30",
    description:
      "Beyoğlu otellerinden (Karaköy, Galata, Pera, Cihangir) Boğaz turu. Karaköy'den gün batımı iskelesine 5 dakika. Akşam yemekli turda otel pickup dahil.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/${district.slug}`,
      languages: buildHreflang(`/${district.slug}`),
    },
    openGraph: {
      title: "Beyoğlu'ndan Boğaz Turu",
      description: "Beyoğlu'ndan Boğaz turu — Karaköy otelleri gün batımı iskelesine 5 dakika. Doğrudan rezervasyon, akşam yemekli turda otel pickup.",
      url: `${SITE_URL}/${locale}/${district.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();
  return <HotelClusterPage district={HOTEL_CLUSTER_DISTRICTS_TR.beyoglu} locale={locale as SiteLocale} />;
}
