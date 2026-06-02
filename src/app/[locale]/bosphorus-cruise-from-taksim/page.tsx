import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import {
  HOTEL_CLUSTER_DISTRICTS_TR,
  HOTEL_CLUSTER_DISTRICTS_DE,
  HOTEL_CLUSTER_DISTRICTS_FR,
} from "@/lib/hotel-cluster-content";

const REGISTRY = {
  tr: HOTEL_CLUSTER_DISTRICTS_TR,
  de: HOTEL_CLUSTER_DISTRICTS_DE,
  fr: HOTEL_CLUSTER_DISTRICTS_FR,
} as const;

type SupportedLocale = keyof typeof REGISTRY;
const SUPPORTED: SupportedLocale[] = ["tr", "de", "fr"];

const META: Record<SupportedLocale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  tr: {
    title: "Taksim'den Boğaz Turu — €30",
    description:
      "Taksim otellerinden Boğaz turu. F1 füniküleriyle Kabataş'a 5 dakika, taksi 10 dakika. Pzt/Sal/Per gün batımı €30. Akşam yemekli turda otel pickup.",
    ogTitle: "Taksim'den Boğaz Turu",
    ogDescription: "Taksim'den Boğaz turu — F1 füniküleri sizi Kabataş'a 5 dakikada bırakır. Doğrudan rezervasyon, akşam yemekli turda otel pickup.",
  },
  de: {
    title: "Bosporus-Kreuzfahrt ab Taksim — €30",
    description:
      "Bosporus-Kreuzfahrt ab Taksim — F1-Standseilbahn nach Kabataş 5 Min., Taxi 10 Min. Sonnenuntergangs-Tour Mo/Di/Do €30. Hotel-Abholung im Dinner-Cruise.",
    ogTitle: "Bosporus-Kreuzfahrt ab Taksim",
    ogDescription: "Bosporus-Kreuzfahrt ab Taksim — F1-Standseilbahn bringt Sie in 5 Min. nach Kabataş. Direkte Buchung, Hotel-Abholung im Dinner-Cruise.",
  },
  fr: {
    title: "Croisière Bosphore depuis Taksim — €30",
    description:
      "Croisière sur le Bosphore depuis Taksim — funiculaire F1 vers Kabataş en 5 min, taxi 10 min. Coucher de soleil lun/mar/jeu €30. Croisière-dîner avec prise en charge.",
    ogTitle: "Croisière Bosphore depuis Taksim",
    ogDescription: "Croisière sur le Bosphore depuis Taksim — funiculaire F1 dépose à Kabataş en 5 min. Réservation directe, prise en charge sur la croisière-dîner.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as SupportedLocale)) return {};
  const district = REGISTRY[locale as SupportedLocale].taksim;
  const meta = META[locale as SupportedLocale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/${district.slug}`,
      languages: buildHreflang(`/${district.slug}`),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${SITE_URL}/${locale}/${district.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || !SUPPORTED.includes(locale as SupportedLocale)) notFound();
  const district = REGISTRY[locale as SupportedLocale].taksim;
  return <HotelClusterPage district={district} locale={locale as SiteLocale} />;
}
