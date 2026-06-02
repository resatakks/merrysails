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
  HOTEL_CLUSTER_DISTRICTS_NL,
  HOTEL_CLUSTER_DISTRICTS_RU,
} from "@/lib/hotel-cluster-content";

const REGISTRY = {
  tr: HOTEL_CLUSTER_DISTRICTS_TR,
  de: HOTEL_CLUSTER_DISTRICTS_DE,
  fr: HOTEL_CLUSTER_DISTRICTS_FR,
  nl: HOTEL_CLUSTER_DISTRICTS_NL,
  ru: HOTEL_CLUSTER_DISTRICTS_RU,
} as const;

type SupportedLocale = keyof typeof REGISTRY;
const SUPPORTED: SupportedLocale[] = ["tr", "de", "fr", "nl", "ru"];

const META: Record<SupportedLocale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  tr: {
    title: "Beyoğlu'ndan Boğaz Turu — €30",
    description:
      "Beyoğlu otellerinden (Karaköy, Galata, Pera, Cihangir) Boğaz turu. Karaköy'den gün batımı iskelesine 5 dakika. Akşam yemekli turda otel pickup dahil.",
    ogTitle: "Beyoğlu'ndan Boğaz Turu",
    ogDescription: "Beyoğlu'ndan Boğaz turu — Karaköy otelleri gün batımı iskelesine 5 dakika. Doğrudan rezervasyon, akşam yemekli turda otel pickup.",
  },
  de: {
    title: "Bosporus-Kreuzfahrt ab Beyoğlu — €30",
    description:
      "Bosporus-Kreuzfahrt ab Beyoğlu (Karaköy, Galata, Pera, Cihangir). Von Karaköy 5 Min. zum Sonnenuntergangs-Anleger. Hotel-Abholung im Dinner-Cruise inkl.",
    ogTitle: "Bosporus-Kreuzfahrt ab Beyoğlu",
    ogDescription: "Bosporus-Kreuzfahrt ab Beyoğlu — Karaköy-Hotels 5 Min. zum Sonnenuntergangs-Anleger. Direkte Buchung, Hotel-Abholung im Dinner-Cruise.",
  },
  fr: {
    title: "Croisière Bosphore depuis Beyoğlu — €30",
    description:
      "Croisière sur le Bosphore depuis Beyoğlu (Karaköy, Galata, Pera, Cihangir). Karaköy 5 min de l'embarcadère coucher de soleil. Croisière-dîner avec prise en charge.",
    ogTitle: "Croisière Bosphore depuis Beyoğlu",
    ogDescription: "Croisière sur le Bosphore depuis Beyoğlu — hôtels Karaköy à 5 min de l'embarcadère coucher de soleil. Réservation directe.",
  },
  nl: {
    title: "Bosporuscruise vanuit Beyoğlu — €30",
    description:
      "Bosporuscruise vanuit Beyoğlu (Karaköy, Galata, Pera, Cihangir). Vanuit Karaköy 5 min naar de zonsondergangssteiger. Hotelophaling bij dinercruise.",
    ogTitle: "Bosporuscruise vanuit Beyoğlu",
    ogDescription: "Bosporuscruise vanuit Beyoğlu — Karaköy-hotels 5 min van de zonsondergangssteiger. Directe boeking, hotelophaling bij dinercruise.",
  },
  ru: {
    title: "Круиз по Босфору из Бейоглу — €30",
    description:
      "Круиз по Босфору из Бейоглу (Карайёй, Галата, Пера, Джихангир). От Карайёй 5 мин до причала заката. Трансфер в ужин-круизе включён.",
    ogTitle: "Круиз по Босфору из Бейоглу",
    ogDescription: "Круиз по Босфору из Бейоглу — отели Карайёй 5 мин до причала заката. Прямое бронирование, трансфер в ужин-круизе.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as SupportedLocale)) return {};
  const district = REGISTRY[locale as SupportedLocale].beyoglu;
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
  const district = REGISTRY[locale as SupportedLocale].beyoglu;
  return <HotelClusterPage district={district} locale={locale as SiteLocale} />;
}
