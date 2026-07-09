import Link from "next/link";
import { Anchor, Sunset, UtensilsCrossed, Ship, Waves } from "lucide-react";
import type { SiteLocale } from "@/i18n/config";

type TourKey = "bosphorus" | "sunset" | "dinner" | "yacht" | "boat";

type CardLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru" | "zh";

// Slugs that have a live /zh/<slug> page (ZH_ENABLED_ROUTES). Cards whose slug
// is not here are hidden on zh so we never link to a /zh 404 (boat-rental).
const ZH_LIVE_SLUGS = new Set<string>([
  "bosphorus-cruise",
  "cruises/bosphorus-sunset-cruise",
  "istanbul-dinner-cruise",
  "yacht-charter-istanbul",
]);

interface TourCardData {
  key: TourKey;
  hrefSlug: string;
  icon: React.ReactNode;
  label: Record<CardLocale, string>;
  tagline: Record<CardLocale, string>;
  price: string;
}

const ALL_TOURS: TourCardData[] = [
  {
    key: "bosphorus",
    hrefSlug: "bosphorus-cruise",
    icon: <Anchor className="h-5 w-5 text-[var(--brand-primary)]" />,
    label: {
      en: "Bosphorus Cruise Istanbul",
      tr: "İstanbul Boğaz Turu",
      de: "Bosporus-Tour Istanbul",
      fr: "Croisière sur le Bosphore",
      nl: "Bosporus-cruise Istanbul",
      ru: "Круиз по Босфору в Стамбуле",
      zh: "伊斯坦布尔博斯普鲁斯游船",
    },
    tagline: {
      en: "Compare all cruise types — shared, private & dinner",
      tr: "Tüm tur tiplerini karşılaştır — paylaşımlı, özel ve akşam yemekli",
      de: "Alle Touren im Vergleich — geteilt, privat & Dinner",
      fr: "Comparez tous les types — partagé, privé & dîner",
      nl: "Vergelijk alle cruise-types — gedeeld, privé & diner",
      ru: "Сравните все типы — групповые, частные и с ужином",
      zh: "对比所有游船类型 — 共享、私人与晚宴",
    },
    price: "From €30",
  },
  {
    key: "sunset",
    hrefSlug: "cruises/bosphorus-sunset-cruise",
    icon: <Sunset className="h-5 w-5 text-amber-500" />,
    label: {
      en: "Bosphorus Sunset Cruise",
      tr: "Boğaz Gün Batımı Turu",
      de: "Bosporus Sonnenuntergangsfahrt",
      fr: "Croisière au coucher du soleil",
      nl: "Bosporus zonsondergangcruise",
      ru: "Круиз по Босфору на закате",
      zh: "博斯普鲁斯日落游船",
    },
    tagline: {
      en: "2-hour cruise at golden hour with open bar",
      tr: "Altın saatte 2 saatlik tur, açık bar dahil",
      de: "2-Stunden-Fahrt zur goldenen Stunde mit Open Bar",
      fr: "Croisière de 2 h à l'heure dorée avec open bar",
      nl: "2-uur cruise tijdens het gouden uur met open bar",
      ru: "2-часовой круиз в золотой час с открытым баром",
      zh: "2 小时黄金时刻航程,含畅饮酒吧",
    },
    price: "From €30",
  },
  {
    key: "dinner",
    hrefSlug: "istanbul-dinner-cruise",
    icon: <UtensilsCrossed className="h-5 w-5 text-rose-500" />,
    label: {
      en: "Istanbul Dinner Cruise",
      tr: "İstanbul Akşam Yemekli Tur",
      de: "Istanbul Dinner-Kreuzfahrt",
      fr: "Dîner-croisière Istanbul",
      nl: "Istanbul dinercruise",
      ru: "Ужин-круиз в Стамбуле",
      zh: "伊斯坦布尔晚宴游船",
    },
    tagline: {
      en: "3-hour dinner, live show & unlimited drinks",
      tr: "3 saatlik yemek, canlı şov ve sınırsız içecek",
      de: "3 Stunden Dinner, Live-Show & Getränke ohne Limit",
      fr: "Dîner de 3 h, show live & boissons illimitées",
      nl: "3 uur diner, liveshow & onbeperkt drinken",
      ru: "3 часа ужина, шоу и безлимитные напитки",
      zh: "3 小时晚宴、现场表演与无限畅饮",
    },
    price: "From €30",
  },
  {
    key: "yacht",
    hrefSlug: "yacht-charter-istanbul",
    icon: <Ship className="h-5 w-5 text-sky-500" />,
    label: {
      en: "Yacht Charter Istanbul",
      tr: "İstanbul Yat Kiralama",
      de: "Yachtcharter Istanbul",
      fr: "Location de yacht Istanbul",
      nl: "Jachtcharter Istanbul",
      ru: "Аренда яхты в Стамбуле",
      zh: "伊斯坦布尔私人游艇包租",
    },
    tagline: {
      en: "Private yacht — your route, your schedule",
      tr: "Özel yat — sizin rotanız, sizin saatiniz",
      de: "Private Yacht — Ihre Route, Ihr Zeitplan",
      fr: "Yacht privé — votre itinéraire, votre horaire",
      nl: "Privéjacht — uw route, uw schema",
      ru: "Частная яхта — ваш маршрут, ваше расписание",
      zh: "私人游艇 — 您的航线,您的时间",
    },
    price: "From €220",
  },
  {
    key: "boat",
    hrefSlug: "boat-rental-istanbul",
    icon: <Waves className="h-5 w-5 text-teal-500" />,
    label: {
      en: "Boat Rental Istanbul",
      tr: "İstanbul Tekne Kiralama",
      de: "Bootsverleih Istanbul",
      fr: "Location de bateau Istanbul",
      nl: "Bootverhuur Istanbul",
      ru: "Аренда лодки в Стамбуле",
      zh: "伊斯坦布尔租船",
    },
    tagline: {
      en: "Hire a boat by the hour with or without captain",
      tr: "Kaptanlı veya kaptansız saatlik tekne kiralama",
      de: "Boot stundenweise mieten — mit oder ohne Kapitän",
      fr: "Louez un bateau à l'heure avec ou sans capitaine",
      nl: "Boot per uur huren met of zonder kapitein",
      ru: "Аренда лодки почасово — с капитаном или без",
      zh: "按小时租船,可选配船长",
    },
    price: "From €150/hr",
  },
];

const DEFAULT_HEADING: Record<CardLocale, string> = {
  en: "Also popular on the Bosphorus",
  tr: "Boğaz'da popüler diğer seçenekler",
  de: "Ebenfalls beliebt am Bosporus",
  fr: "Également populaires sur le Bosphore",
  nl: "Ook populair op de Bosporus",
  ru: "Также популярно на Босфоре",
  zh: "博斯普鲁斯热门之选",
};

interface RelatedToursProps {
  /** Mevcut sayfanın tour key'i — kart listesinden çıkarılır */
  exclude: TourKey;
  heading?: string;
  locale?: SiteLocale | CardLocale;
}

function toCardLocale(locale: SiteLocale | CardLocale | undefined): CardLocale {
  if (
    locale === "en" ||
    locale === "tr" ||
    locale === "de" ||
    locale === "fr" ||
    locale === "nl" ||
    locale === "ru" ||
    locale === "zh"
  ) {
    return locale;
  }
  return "en";
}

export default function RelatedTours({ exclude, heading, locale }: RelatedToursProps) {
  const l = toCardLocale(locale);
  const tours = ALL_TOURS.filter((t) => t.key !== exclude)
    // On zh, only show cards whose target slug has a live /zh page — avoids
    // linking the boat-rental card to a /zh 404.
    .filter((t) => l !== "zh" || ZH_LIVE_SLUGS.has(t.hrefSlug));
  const finalHeading = heading ?? DEFAULT_HEADING[l];
  const localePrefix = l === "en" ? "" : `/${l}`;

  return (
    <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
      <h2 className="mb-6 text-xl font-bold text-[var(--heading)]">{finalHeading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tours.map((tour) => (
          <Link
            key={tour.key}
            // 2026-07-09: /istanbul-dinner-cruise (EN root) moved to
            // /bosphorus-dinner-cruise-istanbul (DMCA relocation — Lumen
            // #86820254). Locale variants (/tr,/de,/fr,/nl,/ru,/zh) still
            // live at .../istanbul-dinner-cruise unchanged — only override
            // hrefSlug for the English card so this stays a single shared
            // component without forking per-locale data.
            href={`${localePrefix}/${l === "en" && tour.key === "dinner" ? "bosphorus-dinner-cruise-istanbul" : tour.hrefSlug}`}
            className="group flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-white"
          >
            <div className="flex items-center gap-2">
              {tour.icon}
              <span className="text-sm font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                {tour.label[l]}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{tour.tagline[l]}</p>
            <span className="mt-auto text-xs font-semibold text-[var(--brand-primary)]">
              {tour.price} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
