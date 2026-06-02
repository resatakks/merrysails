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

// Locale → district-map registry. All 5 active non-EN locales shipped.
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
    title: "Sultanahmet'ten Boğaz Turu — €30",
    description:
      "Sultanahmet otellerinden Boğaz turu. Akşam yemekli turda otel pickup dahil (€30'dan). T1 tramvayıyla Kabataş'a 8-12 dk. TÜRSAB A lisanslı.",
    ogTitle: "Sultanahmet'ten Boğaz Turu",
    ogDescription: "Sultanahmet'ten Boğaz turu — doğrudan rezervasyon, akşam yemekli turda otel pickup dahil, Kabataş iskelesine T1 tramvayı + taksi seçenekleri.",
  },
  de: {
    title: "Bosporus-Kreuzfahrt ab Sultanahmet — €30",
    description:
      "Bosporus-Kreuzfahrt ab Sultanahmet — Hotel-Abholung im Dinner-Cruise inkl. (€30+). T1-Tram nach Kabataş 8-12 Min. TÜRSAB A-Gruppe lizenziert.",
    ogTitle: "Bosporus-Kreuzfahrt ab Sultanahmet",
    ogDescription: "Direkte Buchung — Dinner-Cruise mit Hotel-Abholung aus Sultanahmet, T1-Straßenbahn + Taxi-Optionen zum Kabataş-Anleger.",
  },
  fr: {
    title: "Croisière Bosphore depuis Sultanahmet — €30",
    description:
      "Croisière sur le Bosphore depuis Sultanahmet — prise en charge à l'hôtel incluse sur la croisière-dîner (dès €30). Tramway T1 vers Kabataş 8-12 min.",
    ogTitle: "Croisière Bosphore depuis Sultanahmet",
    ogDescription: "Réservation directe — croisière-dîner avec prise en charge depuis Sultanahmet, tramway T1 + taxi vers l'embarcadère de Kabataş.",
  },
  nl: {
    title: "Bosporuscruise vanuit Sultanahmet — €30",
    description:
      "Bosporuscruise vanuit Sultanahmet — hotelophaling bij dinercruise inbegrepen (vanaf €30). Tram T1 naar Kabataş 8-12 min. TÜRSAB groep A vergunning.",
    ogTitle: "Bosporuscruise vanuit Sultanahmet",
    ogDescription: "Directe boeking — dinercruise met hotelophaling vanuit Sultanahmet, tram T1 + taxi-opties naar de Kabataş-steiger.",
  },
  ru: {
    title: "Круиз по Босфору из Султанахмета — €30",
    description:
      "Круиз по Босфору из Султанахмета — трансфер от отеля в ужин-круизе включён (от €30). Трамвай Т1 до Кабаташа 8-12 мин. Лицензия TÜRSAB А.",
    ogTitle: "Круиз по Босфору из Султанахмета",
    ogDescription: "Прямое бронирование — ужин-круиз с трансфером от отеля из Султанахмета, трамвай Т1 + такси до причала Кабаташ.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as SupportedLocale)) return {};
  const district = REGISTRY[locale as SupportedLocale].sultanahmet;
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
  const district = REGISTRY[locale as SupportedLocale].sultanahmet;
  return <HotelClusterPage district={district} locale={locale as SiteLocale} />;
}
