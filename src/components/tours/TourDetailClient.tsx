"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, MapPin, Clock, Users, Star, Shield,
  Camera, CalendarDays, Anchor, Navigation,
  Plus, Minus,
} from "lucide-react";
import {
  getBookingMode,
  getPriceMode,
  getPriceSuffix,
  getTourFormat,
  isPricingVisible,
  type Tour,
  type Package,
  type AddOn,
} from "@/data/tours";
import BookingSidebar from "@/components/booking/BookingSidebar";
import ImageLightbox from "@/components/ui/ImageLightbox";
import TourFeatureStrip from "@/components/tours/TourFeatureStrip";
import TourGalleryMobile from "@/components/tours/TourGalleryMobile";
import SalePrice from "@/components/ui/SalePrice";
import TourCard from "@/components/tours/TourCard";
import SocialProof from "@/components/tours/SocialProof";
import BestPriceBadge from "@/components/tours/BestPriceBadge";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import { localizeBadge } from "@/lib/tour-badge";
import type { SiteLocale } from "@/i18n/config";

type DetailLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru";

function toDetailLocale(locale: SiteLocale | undefined): DetailLocale {
  return locale && locale in UI_LABELS ? (locale as DetailLocale) : "en";
}

interface Props {
  tour: Tour;
  related: Tour[];
  locale?: SiteLocale;
  bookingPrefill?: {
    packageName?: string;
    date?: string;
    guests?: number;
    time?: string;
  };
}

type TabKey = "overview" | "itinerary" | "included" | "faq";

type UiLabels = {
  tabOverview: string;
  tabItinerary: string;
  tabIncluded: string;
  tabFaq: string;
  duration: string;
  format: string;
  departure: string;
  pickup: string;
  pickupIncluded: string;
  pickupOptional: string;
  pickupCheck: string;
  viewAllPhotos: (n: number) => string;
  reviews: string;
  about: (h: string) => string;
  packageOptions: (h: string) => string;
  serviceScope: (h: string) => string;
  priceOnRequest: string;
  selected: string;
  selectedScope: string;
  addOnServices: string;
  availableOnRequest: string;
  routeDeparture: (h: string) => string;
  departureLabel: string;
  highlights: (h: string) => string;
  bestFor: string;
  importantNotes: string;
  freeCancellation: string;
  freeCancellationBody: string;
  itineraryTitle: (h: string) => string;
  includedTitle: (h: string) => string;
  includedCol: string;
  notIncludedCol: string;
  faqTitle: (h: string) => string;
  youMightAlsoLike: string;
  selectedPackage: string;
  currentFare: string;
  packages: string;
  publicOptions: (n: number) => string;
  singleFare: string;
  booking: string;
  directRequestFlow: string;
  directBookingMeta: string;
  currentDirectFare: string;
  onBoardPreview: string;
  onBoardHeading: (h: string) => string;
  onBoardBody: string;
  sharedSunsetSailing: (t: string) => string;
  experienceType: string;
  smallGroupRoute: string;
};

const UI_LABELS: Record<DetailLocale, UiLabels> = {
  en: {
    tabOverview: "Overview",
    tabItinerary: "Itinerary",
    tabIncluded: "What's Included",
    tabFaq: "FAQ",
    duration: "Duration",
    format: "Format",
    departure: "Departure",
    pickup: "Pick-up",
    pickupIncluded: "Included",
    pickupOptional: "Optional",
    pickupCheck: "Check details",
    viewAllPhotos: (n) => `View all ${n} photos`,
    reviews: "reviews",
    about: (h) => `About ${h}`,
    packageOptions: (h) => `${h} Package Options`,
    serviceScope: (h) => `${h} Service Scope`,
    priceOnRequest: "Price on request",
    selected: "Selected",
    selectedScope: "Selected scope",
    addOnServices: "Add-On Services",
    availableOnRequest: "Available on request",
    routeDeparture: (h) => `${h} Route & Departure`,
    departureLabel: "Departure",
    highlights: (h) => `${h} Highlights`,
    bestFor: "Best For",
    importantNotes: "Important Booking Notes",
    freeCancellation: "Free Cancellation",
    freeCancellationBody: "Full refund available with 24+ hours advance notice. No questions asked.",
    itineraryTitle: (h) => `${h} Itinerary`,
    includedTitle: (h) => `What's Included in ${h}`,
    includedCol: "Included",
    notIncludedCol: "Not Included",
    faqTitle: (h) => `${h} Frequently Asked Questions`,
    youMightAlsoLike: "You Might Also Like",
    selectedPackage: "Selected package",
    currentFare: "Current fare",
    packages: "Packages",
    publicOptions: (n) => `${n} public options`,
    singleFare: "Single public fare",
    booking: "Booking",
    directRequestFlow: "Direct request flow",
    directBookingMeta: "Direct booking price shown on this page",
    currentDirectFare: "Current direct booking fare",
    onBoardPreview: "On-board preview",
    onBoardHeading: (h) => `${h} — On Board the Bosphorus`,
    onBoardBody: "See the actual on-board experience before you book: the Bosphorus views, golden-hour light, and yacht atmosphere of a shared MerrySails departure.",
    sharedSunsetSailing: (t) => `${t} shared sunset sailing`,
    experienceType: "Experience type",
    smallGroupRoute: "Small-group luxury yacht route",
  },
  tr: {
    tabOverview: "Genel Bakış",
    tabItinerary: "Program",
    tabIncluded: "Neler Dahil",
    tabFaq: "SSS",
    duration: "Süre",
    format: "Format",
    departure: "Kalkış",
    pickup: "Alış",
    pickupIncluded: "Dahil",
    pickupOptional: "Opsiyonel",
    pickupCheck: "Detayları kontrol edin",
    viewAllPhotos: (n) => `${n} fotoğrafın tümünü gör`,
    reviews: "değerlendirme",
    about: (h) => `${h} Hakkında`,
    packageOptions: (h) => `${h} Paket Seçenekleri`,
    serviceScope: (h) => `${h} Hizmet Kapsamı`,
    priceOnRequest: "Fiyat talep üzerine",
    selected: "Seçildi",
    selectedScope: "Seçilen kapsam",
    addOnServices: "Ek Hizmetler",
    availableOnRequest: "Talep üzerine mevcut",
    routeDeparture: (h) => `${h} Güzergah ve Kalkış`,
    departureLabel: "Kalkış",
    highlights: (h) => `${h} Öne Çıkanlar`,
    bestFor: "Kimler İçin İdeal",
    importantNotes: "Önemli Rezervasyon Notları",
    freeCancellation: "Ücretsiz İptal",
    freeCancellationBody: "24+ saat önceden bildirimle tam iade mevcuttur. Hiçbir soru sorulmaz.",
    itineraryTitle: (h) => `${h} Programı`,
    includedTitle: (h) => `${h} Neleri İçerir`,
    includedCol: "Dahil",
    notIncludedCol: "Dahil Değil",
    faqTitle: (h) => `${h} Sıkça Sorulan Sorular`,
    youMightAlsoLike: "Şunları da Beğenebilirsiniz",
    selectedPackage: "Seçilen paket",
    currentFare: "Güncel ücret",
    packages: "Paketler",
    publicOptions: (n) => `${n} genel seçenek`,
    singleFare: "Tek genel ücret",
    booking: "Rezervasyon",
    directRequestFlow: "Doğrudan talep akışı",
    directBookingMeta: "Bu sayfada gösterilen doğrudan rezervasyon fiyatı",
    currentDirectFare: "Güncel doğrudan rezervasyon ücreti",
    onBoardPreview: "Teknede önizleme",
    onBoardHeading: (h) => `${h} — Boğaz'da Tekne Üzerinde`,
    onBoardBody: "Rezervasyon yapmadan önce gerçek tekne deneyimini görün: Boğaz manzarası, altın saat ışığı ve paylaşımlı bir MerrySails seferinin yat atmosferi.",
    sharedSunsetSailing: (t) => `${t} paylaşımlı gün batımı seferi`,
    experienceType: "Deneyim türü",
    smallGroupRoute: "Küçük grup lüks yat güzergahı",
  },
  de: {
    tabOverview: "Überblick",
    tabItinerary: "Ablauf",
    tabIncluded: "Inklusivleistungen",
    tabFaq: "FAQ",
    duration: "Dauer",
    format: "Format",
    departure: "Abfahrt",
    pickup: "Abholung",
    pickupIncluded: "Inklusive",
    pickupOptional: "Optional",
    pickupCheck: "Details prüfen",
    viewAllPhotos: (n) => `Alle ${n} Fotos ansehen`,
    reviews: "Bewertungen",
    about: (h) => `Über ${h}`,
    packageOptions: (h) => `${h} Paketoptionen`,
    serviceScope: (h) => `${h} Leistungsumfang`,
    priceOnRequest: "Preis auf Anfrage",
    selected: "Ausgewählt",
    selectedScope: "Ausgewählter Umfang",
    addOnServices: "Zusatzleistungen",
    availableOnRequest: "Auf Anfrage verfügbar",
    routeDeparture: (h) => `${h} Route & Abfahrt`,
    departureLabel: "Abfahrt",
    highlights: (h) => `${h} Highlights`,
    bestFor: "Ideal für",
    importantNotes: "Wichtige Buchungshinweise",
    freeCancellation: "Kostenlose Stornierung",
    freeCancellationBody: "Volle Rückerstattung bei Stornierung mindestens 24 Stunden im Voraus. Ohne Rückfragen.",
    itineraryTitle: (h) => `${h} Ablauf`,
    includedTitle: (h) => `Inklusivleistungen der ${h}`,
    includedCol: "Inklusive",
    notIncludedCol: "Nicht inklusive",
    faqTitle: (h) => `${h} Häufig gestellte Fragen`,
    youMightAlsoLike: "Das könnte Ihnen auch gefallen",
    selectedPackage: "Ausgewähltes Paket",
    currentFare: "Aktueller Preis",
    packages: "Pakete",
    publicOptions: (n) => `${n} öffentliche Optionen`,
    singleFare: "Einzelner öffentlicher Preis",
    booking: "Buchung",
    directRequestFlow: "Direkter Anfrageprozess",
    directBookingMeta: "Auf dieser Seite angezeigter Direktbuchungspreis",
    currentDirectFare: "Aktueller Direktbuchungspreis",
    onBoardPreview: "Vorschau an Bord",
    onBoardHeading: (h) => `${h} — An Bord auf dem Bosporus`,
    onBoardBody: "Sehen Sie das echte Bord-Erlebnis vor der Buchung: die Bosporus-Ausblicke, das Licht der goldenen Stunde und die Jacht-Atmosphäre einer geteilten MerrySails-Abfahrt.",
    sharedSunsetSailing: (t) => `Geteilte Sonnenuntergangsfahrt um ${t}`,
    experienceType: "Erlebnistyp",
    smallGroupRoute: "Kleingruppen-Luxusjacht-Route",
  },
  fr: {
    tabOverview: "Aperçu",
    tabItinerary: "Itinéraire",
    tabIncluded: "Ce qui est inclus",
    tabFaq: "FAQ",
    duration: "Durée",
    format: "Format",
    departure: "Départ",
    pickup: "Prise en charge",
    pickupIncluded: "Inclus",
    pickupOptional: "Optionnel",
    pickupCheck: "Voir les détails",
    viewAllPhotos: (n) => `Voir les ${n} photos`,
    reviews: "avis",
    about: (h) => `À propos de ${h}`,
    packageOptions: (h) => `Formules ${h}`,
    serviceScope: (h) => `Étendue du service ${h}`,
    priceOnRequest: "Prix sur demande",
    selected: "Sélectionné",
    selectedScope: "Étendue sélectionnée",
    addOnServices: "Services supplémentaires",
    availableOnRequest: "Disponible sur demande",
    routeDeparture: (h) => `Itinéraire et départ ${h}`,
    departureLabel: "Départ",
    highlights: (h) => `Points forts ${h}`,
    bestFor: "Idéal pour",
    importantNotes: "Notes de réservation importantes",
    freeCancellation: "Annulation gratuite",
    freeCancellationBody: "Remboursement intégral avec un préavis de 24 heures ou plus. Sans justification.",
    itineraryTitle: (h) => `Itinéraire ${h}`,
    includedTitle: (h) => `Ce qui est inclus dans ${h}`,
    includedCol: "Inclus",
    notIncludedCol: "Non inclus",
    faqTitle: (h) => `Questions fréquentes ${h}`,
    youMightAlsoLike: "Vous pourriez aussi aimer",
    selectedPackage: "Formule sélectionnée",
    currentFare: "Tarif actuel",
    packages: "Formules",
    publicOptions: (n) => `${n} options publiques`,
    singleFare: "Tarif public unique",
    booking: "Réservation",
    directRequestFlow: "Processus de demande directe",
    directBookingMeta: "Prix de réservation directe affiché sur cette page",
    currentDirectFare: "Tarif de réservation directe actuel",
    onBoardPreview: "Aperçu à bord",
    onBoardHeading: (h) => `${h} — À bord sur le Bosphore`,
    onBoardBody: "Découvrez l'expérience réelle à bord avant de réserver : les vues sur le Bosphore, la lumière de l'heure dorée et l'ambiance yacht d'un départ partagé MerrySails.",
    sharedSunsetSailing: (t) => `Croisière partagée au coucher du soleil à ${t}`,
    experienceType: "Type d'expérience",
    smallGroupRoute: "Itinéraire en yacht de luxe en petit groupe",
  },
  nl: {
    tabOverview: "Overzicht",
    tabItinerary: "Programma",
    tabIncluded: "Wat is inbegrepen",
    tabFaq: "FAQ",
    duration: "Duur",
    format: "Format",
    departure: "Vertrek",
    pickup: "Ophalen",
    pickupIncluded: "Inbegrepen",
    pickupOptional: "Optioneel",
    pickupCheck: "Bekijk details",
    viewAllPhotos: (n) => `Bekijk alle ${n} foto's`,
    reviews: "beoordelingen",
    about: (h) => `Over ${h}`,
    packageOptions: (h) => `${h} Pakketopties`,
    serviceScope: (h) => `${h} Servicebereik`,
    priceOnRequest: "Prijs op aanvraag",
    selected: "Geselecteerd",
    selectedScope: "Geselecteerd bereik",
    addOnServices: "Extra services",
    availableOnRequest: "Beschikbaar op aanvraag",
    routeDeparture: (h) => `${h} Route en vertrek`,
    departureLabel: "Vertrek",
    highlights: (h) => `${h} Hoogtepunten`,
    bestFor: "Ideaal voor",
    importantNotes: "Belangrijke boekingsnotities",
    freeCancellation: "Gratis annulering",
    freeCancellationBody: "Volledige terugbetaling bij annulering 24 uur of meer van tevoren. Zonder vragen.",
    itineraryTitle: (h) => `${h} Programma`,
    includedTitle: (h) => `Wat is inbegrepen bij ${h}`,
    includedCol: "Inbegrepen",
    notIncludedCol: "Niet inbegrepen",
    faqTitle: (h) => `${h} Veelgestelde vragen`,
    youMightAlsoLike: "Misschien vindt u dit ook leuk",
    selectedPackage: "Geselecteerd pakket",
    currentFare: "Huidige prijs",
    packages: "Pakketten",
    publicOptions: (n) => `${n} openbare opties`,
    singleFare: "Enkele openbare prijs",
    booking: "Boeking",
    directRequestFlow: "Directe aanvraagstroom",
    directBookingMeta: "Directe boekingsprijs getoond op deze pagina",
    currentDirectFare: "Huidige directe boekingsprijs",
    onBoardPreview: "Voorbeeld aan boord",
    onBoardHeading: (h) => `${h} — Aan boord op de Bosporus`,
    onBoardBody: "Bekijk de echte ervaring aan boord voordat u boekt: de uitzichten op de Bosporus, het licht van het gouden uur en de jachtsfeer van een gedeeld MerrySails-vertrek.",
    sharedSunsetSailing: (t) => `Gedeelde zonsondergangvaart om ${t}`,
    experienceType: "Soort ervaring",
    smallGroupRoute: "Luxe jachtroute in kleine groep",
  },
  ru: {
    tabOverview: "Обзор",
    tabItinerary: "Программа",
    tabIncluded: "Что включено",
    tabFaq: "FAQ",
    duration: "Длительность",
    format: "Формат",
    departure: "Отправление",
    pickup: "Трансфер",
    pickupIncluded: "Включён",
    pickupOptional: "По запросу",
    pickupCheck: "Уточнить детали",
    viewAllPhotos: (n) => `Все фото — ${n}`,
    reviews: "отзывов",
    about: (h) => `О туре ${h}`,
    packageOptions: (h) => `Пакеты ${h}`,
    serviceScope: (h) => `Объём услуги ${h}`,
    priceOnRequest: "Цена по запросу",
    selected: "Выбрано",
    selectedScope: "Выбранный объём",
    addOnServices: "Дополнительные услуги",
    availableOnRequest: "Доступно по запросу",
    routeDeparture: (h) => `Маршрут и отправление — ${h}`,
    departureLabel: "Отправление",
    highlights: (h) => `Преимущества — ${h}`,
    bestFor: "Кому подойдёт",
    importantNotes: "Важные замечания по бронированию",
    freeCancellation: "Бесплатная отмена",
    freeCancellationBody: "Полный возврат при отмене за 24+ часа. Без лишних вопросов.",
    itineraryTitle: (h) => `Программа — ${h}`,
    includedTitle: (h) => `Что включено в ${h}`,
    includedCol: "Включено",
    notIncludedCol: "Не включено",
    faqTitle: (h) => `Частые вопросы — ${h}`,
    youMightAlsoLike: "Вам также может понравиться",
    selectedPackage: "Выбранный пакет",
    currentFare: "Текущая цена",
    packages: "Пакеты",
    publicOptions: (n) => `Открытых опций: ${n}`,
    singleFare: "Единый общий тариф",
    booking: "Бронирование",
    directRequestFlow: "Прямой запрос",
    directBookingMeta: "На странице показана цена прямого бронирования",
    currentDirectFare: "Текущая цена прямого бронирования",
    onBoardPreview: "На борту",
    onBoardHeading: (h) => `${h} — на борту в Босфоре`,
    onBoardBody: "Посмотрите реальный опыт на борту до бронирования: виды Босфора, золотой час и атмосфера яхты MerrySails.",
    sharedSunsetSailing: (t) => `Совместный закатный круиз в ${t}`,
    experienceType: "Тип опыта",
    smallGroupRoute: "Маршрут на люксовой яхте в малой группе",
  },
};

const SEO_HEADINGS_BY_SLUG: Record<string, string> = {
  "bosphorus-sunset-cruise": "Bosphorus Sunset Cruise",
  "bosphorus-dinner-cruise": "Istanbul Dinner Cruise",
  "yacht-charter-in-istanbul": "Yacht Charter Istanbul",
};

// Locale-specific SEO headings (h1 + meta title source). 2026-06-10: added
// because /de/cruises/bosphorus-sunset-cruise was rendering English h1 — bug:
// pageHeading fell back to tName = i18n?.nameEn, which is always English.
const LOCALE_HEADINGS_BY_SLUG: Record<Exclude<DetailLocale, "en">, Record<string, string>> = {
  tr: {
    "bosphorus-sunset-cruise": "Boğaz Gün Batımı Turu — İstanbul",
    "bosphorus-dinner-cruise": "İstanbul Boğaz Yemekli Turu",
    "yacht-charter-in-istanbul": "İstanbul Yat Kiralama",
  },
  de: {
    "bosphorus-sunset-cruise": "Bosporus Sonnenuntergangsfahrt Istanbul",
    "bosphorus-dinner-cruise": "Istanbul Dinner-Kreuzfahrt am Bosporus",
    "yacht-charter-in-istanbul": "Yachtcharter Istanbul",
  },
  fr: {
    "bosphorus-sunset-cruise": "Croisière au coucher du soleil sur le Bosphore",
    "bosphorus-dinner-cruise": "Croisière dîner sur le Bosphore — Istanbul",
    "yacht-charter-in-istanbul": "Location de yacht à Istanbul",
  },
  nl: {
    "bosphorus-sunset-cruise": "Bosporus zonsondergangcruise Istanbul",
    "bosphorus-dinner-cruise": "Istanbul Bosporus diner-cruise",
    "yacht-charter-in-istanbul": "Jachtcharter Istanbul",
  },
  ru: {
    "bosphorus-sunset-cruise": "Круиз по Босфору на закате — Стамбул",
    "bosphorus-dinner-cruise": "Ужин-круиз по Босфору — Стамбул",
    "yacht-charter-in-istanbul": "Аренда яхты в Стамбуле",
  },
};

// Per-person price suffix per locale (perPerson is the only mode used by the
// translated tours). EN keeps getPriceSuffix() for byte-identical output.
const PRICE_SUFFIX: Record<Exclude<DetailLocale, "en">, string> = {
  tr: "/kişi",
  de: "/Person",
  fr: "/personne",
  nl: "/persoon",
  ru: "/гость",
};

// Translated equivalents of getTourFormat() for the locale-aware tours.
const TOUR_FORMAT_BY_LOCALE: Record<
  Exclude<DetailLocale, "en">,
  Record<string, string>
> = {
  tr: {
    "bosphorus-sunset-cruise": "Paylaşımlı gün batımı turu",
    "bosphorus-dinner-cruise": "Paylaşımlı yemekli tur",
  },
  de: {
    "bosphorus-sunset-cruise": "Geteilte Sonnenuntergangsfahrt",
    "bosphorus-dinner-cruise": "Geteilte Dinner-Kreuzfahrt",
  },
  fr: {
    "bosphorus-sunset-cruise": "Croisière partagée au coucher du soleil",
    "bosphorus-dinner-cruise": "Croisière dîner partagée",
  },
  nl: {
    "bosphorus-sunset-cruise": "Gedeelde zonsondergangcruise",
    "bosphorus-dinner-cruise": "Gedeelde dinercruise",
  },
  ru: {
    "bosphorus-sunset-cruise": "Совместный закатный круиз",
    "bosphorus-dinner-cruise": "Совместный ужин-круиз",
  },
};

export default function TourDetailClient({
  tour,
  related,
  locale: localeProp = "en",
  bookingPrefill,
}: Props) {
  const locale = toDetailLocale(localeProp);
  const L = UI_LABELS[locale] ?? UI_LABELS.en;
  const i18n =
    locale !== "en" ? tour.i18n?.[locale] : undefined;

  // Locale-resolved tour fields — fall back to English when no translation exists.
  const tName = i18n?.nameEn ?? tour.nameEn;
  const tDescription = i18n?.longDescription ?? tour.longDescription;
  const tDuration = i18n?.duration ?? tour.duration;
  const tDepartureTime = i18n?.departureTime ?? tour.departureTime;
  const tDeparturePoint = i18n?.departurePoint ?? tour.departurePoint;
  const tRoute = i18n?.route ?? tour.route;
  const tHighlights = i18n?.highlights ?? tour.highlights;
  const tBestFor = i18n?.bestFor ?? tour.bestFor;
  const tImportantNotes = i18n?.importantNotes ?? tour.importantNotes;
  const tIncludes = i18n?.includes ?? tour.includes;
  const tNotIncluded = i18n?.notIncluded ?? tour.notIncluded;
  const tFaq = i18n?.faq ?? tour.faq;
  const tItinerary = (tour.itinerary ?? []).map((step, idx) => ({
    ...step,
    title: i18n?.itinerary?.[idx]?.title ?? step.title,
    description: i18n?.itinerary?.[idx]?.description ?? step.description,
  }));
  // Translated package name/description/features matched by index.
  const localizedPackage = (idx: number) => i18n?.packages?.[idx];

  const packageParam = bookingPrefill?.packageName;
  const dateParam = bookingPrefill?.date;
  const guestsParam = bookingPrefill?.guests;
  const timeParam = bookingPrefill?.time;

  const resolvePackageSelection = () =>
    tour.packages?.find((pkg) => pkg.name === packageParam) ??
    tour.packages?.[0];

  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
    resolvePackageSelection()
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const contentRef = useRef<HTMLDivElement>(null);

  const hasPackages = tour.packages && tour.packages.length > 0;
  const hasItinerary = tour.itinerary && tour.itinerary.length > 0;
  const hasFaq = tour.faq && tour.faq.length > 0;
  const TAB_LABELS: { key: TabKey; label: string }[] = [
    { key: "overview", label: L.tabOverview },
    { key: "itinerary", label: L.tabItinerary },
    { key: "included", label: L.tabIncluded },
    { key: "faq", label: L.tabFaq },
  ];
  const showPricing = isPricingVisible(tour);
  const bookingMode = getBookingMode(tour);
  const priceMode = getPriceMode(tour);
  const priceSuffix = locale === "en" ? getPriceSuffix(tour) : PRICE_SUFFIX[locale];
  const tourFormat =
    locale !== "en" && TOUR_FORMAT_BY_LOCALE[locale]?.[tour.slug]
      ? TOUR_FORMAT_BY_LOCALE[locale][tour.slug]
      : getTourFormat(tour);

  const allImages = [tour.image, ...tour.gallery.filter((img) => img !== tour.image)];
  const prefilledDate = useMemo(() => {
    if (!dateParam) return undefined;
    const parsed = new Date(`${dateParam}T12:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [dateParam]);

  const prefilledGuests = useMemo(() => {
    if (!guestsParam || guestsParam < 1) return undefined;
    return Math.min(guestsParam, MAX_BOOKING_GUESTS);
  }, [guestsParam]);
  const availableAddOns = useMemo(
    () => selectedPackage?.addOns ?? tour.addOns ?? [],
    [selectedPackage, tour.addOns]
  );
  const pickupStatus = useMemo(() => {
    const pickupTerms = ["pickup", "transfer", "abhol", "ophaal", "alış", "prise en charge"];
    const matchesPickup = (item: string) => {
      const normalized = item.toLowerCase();
      return pickupTerms.some((term) => normalized.includes(term));
    };
    const hasPickupIncluded = tIncludes.some(matchesPickup);
    const hasPickupExcluded = tNotIncluded?.some(matchesPickup);

    if (hasPickupIncluded) return L.pickupIncluded;
    if (hasPickupExcluded) return L.pickupOptional;
    return L.pickupCheck;
  }, [tIncludes, tNotIncluded, L]);
  // 2026-06-10: locale-specific heading lookup. Prior bug: non-EN locales fell
  // through to tName = i18n?.nameEn (always English). German page now correctly
  // renders "Bosporus Sonnenuntergangsfahrt Istanbul" etc.
  const pageHeading =
    locale === "en"
      ? SEO_HEADINGS_BY_SLUG[tour.slug] ?? tour.nameEn
      : LOCALE_HEADINGS_BY_SLUG[locale]?.[tour.slug] ?? tName;

  // Build available tabs based on tour data
  const availableTabs = TAB_LABELS.filter((tab) => {
    if (tab.key === "itinerary" && !hasItinerary) return false;
    if (tab.key === "faq" && !hasFaq) return false;
    return true;
  });

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);

    const nextAvailableAddOns = pkg.addOns ?? tour.addOns ?? [];
    setSelectedAddOns((prev) =>
      prev.filter((addon) =>
        nextAvailableAddOns.some((item) => item.name === addon.name)
      )
    );

    // Clarity 7d showed 18 sessions on dinner-cruise where users tapped a
    // package card and got no visible feedback — the BookingCalendar lives in
    // the sticky sidebar on desktop but is far down-scroll on mobile, so the
    // selection looked silent. We now smooth-scroll to the calendar and pulse
    // it briefly so the package→date→time funnel reads as one motion.
    if (typeof window !== "undefined") {
      const target = document.getElementById("booking-calendar");
      if (target) {
        const top =
          target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
        target.classList.add("ring-2", "ring-[var(--brand-primary)]");
        window.setTimeout(() => {
          target.classList.remove("ring-2", "ring-[var(--brand-primary)]");
        }, 1400);
      }
    }
  };


  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    // Smooth scroll to content area
    if (contentRef.current) {
      const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const basePrice = tour.priceEur;
  const effectivePrice = selectedPackage?.price ?? basePrice;
  const effectiveOriginalPrice =
    selectedPackage?.originalPrice ??
    (effectivePrice === basePrice ? tour.originalPriceEur : undefined);
  const selectedOptionLabel = hasPackages ? L.selectedPackage : L.currentFare;
  const hasVideoPreview = Boolean(tour.videoSrc);
  const showFeatureStrip = tour.slug === "bosphorus-sunset-cruise";
  const selectedPackageIndex = selectedPackage
    ? tour.packages?.findIndex((p) => p.name === selectedPackage.name) ?? -1
    : -1;
  const selectedPackageName =
    (selectedPackageIndex >= 0
      ? localizedPackage(selectedPackageIndex)?.name
      : undefined) ?? selectedPackage?.name;
  const selectedPackageDescription =
    selectedPackageIndex >= 0
      ? localizedPackage(selectedPackageIndex)?.description ?? selectedPackage?.description
      : selectedPackage?.description;

  // Hero gallery visibility — when the tour data has an empty `gallery` array,
  // the entire mobile + desktop hero gallery block is skipped (e.g. sunset cruise
  // parked 2026-05-26 pending fresh original shoot). og:image + Product schema
  // image still use tour.image for SEO/social previews.
  const showHeroGallery = tour.gallery.length > 0;

  return (
    <>
      {showHeroGallery && (
        <>
      {/* Hero Gallery — mobile: swipeable auto-advancing carousel */}
      <TourGalleryMobile
        images={allImages}
        alt={`${tour.nameEn} — ${tour.route} in Istanbul`}
        onOpen={openLightbox}
        className="md:hidden mb-8"
      />

      {/* Hero Gallery — desktop: 3-image layout (1 large + 2 stacked) */}
      <div className="relative hidden md:grid md:grid-cols-3 gap-2 rounded-2xl overflow-hidden mb-8 h-[280px] sm:h-[360px] md:h-[440px]">
        {/* Main large image */}
        <div
          className="md:col-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={allImages[0]}
            alt={`${tName} — ${tRoute} in Istanbul`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute top-4 left-4 z-10">
            {tour.badge && (
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                {localizeBadge(tour.badge, localeProp)}
              </span>
            )}
          </div>
        </div>

        {/* 2 stacked images on the right */}
        <div className="hidden md:grid grid-rows-2 gap-2">
          {allImages.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(i + 1)}
            >
              <Image
                src={img}
                alt={tour.galleryAlts?.[i + 1] ?? `${tName} ${i + 2}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* "View all X photos" button overlay */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-[var(--heading)] shadow-md hover:bg-white transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          {L.viewAllPhotos(allImages.length)}
        </button>
      </div>
        </>
      )}

      {/* Quick Info Bar — horizontal with dividers */}
      <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--line)] bg-white md:grid-cols-4">
        <div className="flex items-center gap-2.5 border-b border-r border-[var(--line)] px-5 py-4 md:border-b-0">
          <Clock className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{L.duration}</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tDuration}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-4 md:border-b-0 md:border-r">
          <Users className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{L.format}</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tourFormat}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-r border-[var(--line)] px-5 py-4">
          <CalendarDays className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{L.departure}</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tDepartureTime}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-5 py-4">
          <Navigation className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{L.pickup}</div>
            <div className="text-sm font-semibold text-[var(--heading)]">
              {pickupStatus}
            </div>
          </div>
        </div>
      </div>

      {showFeatureStrip && <TourFeatureStrip brand="MerrySails" />}

      {hasVideoPreview ? (
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative aspect-video bg-[#071022]">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={tour.image}
              >
                <source src={tour.videoSrc} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                {L.onBoardPreview}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
                {L.onBoardHeading(pageHeading)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {L.onBoardBody}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {L.departure}
                  </div>
                  <div className="mt-2 text-base font-semibold text-[var(--heading)]">
                    {L.sharedSunsetSailing(tDepartureTime)}
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {L.experienceType}
                  </div>
                  <div className="mt-2 text-base font-semibold text-[var(--heading)]">
                    {L.smallGroupRoute}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="order-2 space-y-6 lg:order-1 lg:col-span-2">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{pageHeading}</h1>
            <p className="text-[var(--text-muted)] mb-3">{tName}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(tour.rating) ? "text-[var(--brand-gold)] fill-[var(--brand-gold)]" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-[var(--text-muted)]">({tour.reviewCount} {L.reviews})</span>
              </div>
            </div>
          </div>

          {showPricing && (
            <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <SalePrice
                    price={effectivePrice}
                    originalPrice={effectiveOriginalPrice}
                    suffix={priceSuffix}
                    label={selectedOptionLabel}
                    size="xl"
                    showBadge={Boolean(effectiveOriginalPrice)}
                    showMeta={Boolean(effectiveOriginalPrice)}
                    metaText={L.directBookingMeta}
                  />
                  {selectedPackageDescription && (
                    <p className="max-w-2xl text-sm leading-relaxed text-[var(--body-text)]/80">
                      {selectedPackageDescription}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {L.packages}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {hasPackages ? L.publicOptions(tour.packages!.length) : L.singleFare}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {L.duration}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {tDuration}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {L.booking}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {L.directRequestFlow}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="rounded-xl border border-[var(--line)] bg-white p-1.5 lg:sticky lg:top-20 lg:z-20">
            <div className="flex gap-1">
              {availableTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? "text-white"
                      : "text-[var(--body-text)] hover:text-[var(--heading)] hover:bg-[var(--surface-alt)]"
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[var(--brand-primary)] rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content with animation */}
          <div ref={contentRef}>
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">{L.about(pageHeading)}</h2>
                    <div className="text-[var(--body-text)] leading-relaxed whitespace-pre-line">
                      {tDescription}
                    </div>
                  </div>

                  {/* Packages */}
                  {hasPackages && (
                    <div className="bg-white rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-6">
                        {showPricing ? L.packageOptions(pageHeading) : L.serviceScope(pageHeading)}
                      </h2>
                      <div className={`grid grid-cols-1 gap-4 ${tour.packages!.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                        {tour.packages!.map((pkg, pkgIdx) => {
                          const isSelected = selectedPackage?.name === pkg.name;
                          const pkgL = localizedPackage(pkgIdx);
                          const pkgName = pkgL?.name ?? pkg.name;
                          const pkgDescription = pkgL?.description ?? pkg.description;
                          const pkgFeatures = pkgL?.features ?? pkg.features;
                          return (
                            <button
                              key={pkg.name}
                              onClick={() => handlePackageSelect(pkg)}
                              className={`text-left rounded-xl border-2 p-5 transition-all ${
                                isSelected
                                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 shadow-md ring-2 ring-[var(--brand-primary)]/20"
                                  : "border-[var(--line)] hover:border-[var(--brand-primary)]/30"
                              }`}
                            >
                              <h3 className="text-lg font-bold mb-1">{pkgName}</h3>
                              <p className="text-sm text-[var(--text-muted)] mb-3">{pkgDescription}</p>
                              {showPricing ? (
                                <div className="mb-4">
                                  <SalePrice
                                    price={pkg.price}
                                    originalPrice={pkg.originalPrice}
                                    suffix={priceSuffix}
                                    size="md"
                                    showBadge={Boolean(pkg.originalPrice)}
                                    showMeta={Boolean(pkg.originalPrice)}
                                    metaText={L.currentDirectFare}
                                  />
                                </div>
                              ) : (
                                <div className="mb-4 text-sm font-semibold text-[var(--brand-primary)]">
                                  {L.priceOnRequest}
                                </div>
                              )}
                              <ul className="space-y-2">
                                {pkgFeatures.map((f) => (
                                  <li key={f} className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                              {isSelected && (
                                <div className="mt-4 pt-3 border-t border-[var(--brand-primary)]/20 text-center">
                                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                                    {showPricing ? L.selected : L.selectedScope}
                                  </span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {availableAddOns.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-4">{L.addOnServices}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableAddOns.map((addon) => {
                          const isSelected = selectedAddOns.some((a) => a.name === addon.name);
                          return (
                            <button
                              key={addon.name}
                              onClick={() => toggleAddOn(addon)}
                              className={`flex items-center justify-between py-3 px-4 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
                                  : "border-transparent bg-[var(--surface-alt)] hover:border-[var(--brand-primary)]/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                                  isSelected
                                    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
                                    : "border-gray-300"
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm font-medium">{addon.name}</span>
                              </div>
                              <span className="text-sm font-bold text-[var(--brand-primary)]">
                                {showPricing ? addon.price : L.availableOnRequest}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Route & Departure */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">{L.routeDeparture(pageHeading)}</h2>
                    <div className="flex items-center gap-2 text-[var(--body-text)] mb-3">
                      <Anchor className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                      <span>{tRoute}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {L.departureLabel}: {tDeparturePoint} &mdash; {tDepartureTime}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">{L.highlights(pageHeading)}</h2>
                    <div className="flex flex-wrap gap-2">
                      {tHighlights.map((h) => (
                        <span key={h} className="px-3 py-1.5 bg-[var(--surface-alt)] rounded-full text-sm font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(tBestFor?.length || tImportantNotes?.length) && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {tBestFor && tBestFor.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 md:p-8">
                          <h2 className="text-xl font-bold mb-4">{L.bestFor}</h2>
                          <div className="flex flex-wrap gap-2">
                            {tBestFor.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-[var(--surface-alt)] px-3 py-2 text-sm font-medium text-[var(--body-text)]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tImportantNotes && tImportantNotes.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 md:p-8">
                          <h2 className="text-xl font-bold mb-4">{L.importantNotes}</h2>
                          <ul className="space-y-3">
                            {tImportantNotes.map((note) => (
                              <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--body-text)]">
                                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cancellation */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">{L.freeCancellation}</h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          {L.freeCancellationBody}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "itinerary" && hasItinerary && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-8">{L.itineraryTitle(pageHeading)}</h2>
                    <div className="relative">
                      {/* Continuous vertical line */}
                      <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-[var(--brand-primary)]/15" />

                      <div className="space-y-0">
                        {tItinerary.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="flex gap-5 group"
                          >
                            {/* Time marker on left */}
                            <div className="flex flex-col items-center shrink-0 w-[80px]">
                              <div className="text-xs font-bold text-[var(--brand-primary)] mb-1.5 w-full text-right pr-4">
                                {step.time}
                              </div>
                            </div>

                            {/* Dot on the line */}
                            <div className="flex flex-col items-center shrink-0 relative">
                              <div className="w-3 h-3 rounded-full bg-[var(--brand-primary)] ring-4 ring-[var(--brand-primary)]/10 shrink-0 mt-0.5 z-10" />
                              {i < tItinerary.length - 1 && (
                                <div className="w-0.5 flex-1 bg-[var(--brand-primary)]/15 my-0" />
                              )}
                            </div>

                            {/* Content */}
                            <div className={`pb-8 ${i === tItinerary.length - 1 ? "pb-0" : ""} flex-1`}>
                              <h3 className="font-semibold text-[var(--heading)] mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-sm text-[var(--body-text)] leading-relaxed">{step.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "included" && (
                <motion.div
                  key="included"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">{L.includedTitle(pageHeading)}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Included column */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-green-700">{L.includedCol}</h3>
                        </div>
                        <ul className="space-y-3">
                          {tIncludes.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm">
                              <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-green-500" />
                              </div>
                              <span className="text-[var(--body-text)]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Not Included column */}
                      {tNotIncluded && tNotIncluded.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="w-3.5 h-3.5 text-red-500" />
                            </div>
                            <h3 className="font-semibold text-red-600">{L.notIncludedCol}</h3>
                          </div>
                          <ul className="space-y-3">
                            {tNotIncluded.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-red-400" />
                                </div>
                                <span className="text-[var(--text-muted)]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "faq" && hasFaq && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">{L.faqTitle(pageHeading)}</h2>
                    <div className="space-y-3">
                      {tFaq!.map((item, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div
                            key={i}
                            className={`border rounded-xl overflow-hidden transition-colors ${
                              isOpen ? "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/[0.02]" : "border-[var(--line)]"
                            }`}
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--surface-alt)]/50 transition-colors cursor-pointer"
                            >
                              <span className="font-medium text-sm text-[var(--heading)] pr-4">{item.question}</span>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isOpen ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--surface-alt)] text-[var(--body-text)]"
                              }`}>
                                {isOpen ? (
                                  <Minus className="w-3.5 h-3.5" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" />
                                )}
                              </div>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5 text-sm text-[var(--body-text)] leading-relaxed">
                                    {item.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar — sticky booking area with package cards + mobile bar */}
        <div className="order-1 lg:order-2">
          <BookingSidebar
          tour={{
            slug: tour.slug,
            nameEn: tName,
            name: tName,
            priceEur: tour.priceEur,
            originalPriceEur: tour.originalPriceEur,
            departureTime: tour.departureTime,
            departurePoint: tour.departurePoint,
            image: tour.image,
            packages: tour.packages,
            addOns: availableAddOns,
            bookingMode,
            priceMode,
            showPricing,
            enquiryLabel: tour.enquiryLabel,
          }}
          effectivePrice={effectivePrice}
          selectedPackage={selectedPackage}
          onSelectPackage={handlePackageSelect}
          selectedAddOns={selectedAddOns}
          initialDate={prefilledDate}
          initialGuests={prefilledGuests}
          initialTime={timeParam || undefined}
        />
          <SocialProof tourSlug={tour.slug} />
        </div>
      </div>

      {showPricing && <BestPriceBadge />}

      {/* Related tours */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">{L.youMightAlsoLike}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((relatedTour) => (
              <TourCard key={relatedTour.id} tour={relatedTour} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
          alt={tName}
        />
      )}

    </>
  );
}
