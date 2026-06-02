import Link from "next/link";
import { ArrowRight, MapPin, Train, Car } from "lucide-react";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import type { HotelClusterDistrict } from "@/lib/hotel-cluster-content";
import type { SiteLocale } from "@/i18n/config";

/**
 * UI strings used by the hotel-cluster page chrome. The district-specific
 * body content (transport options, FAQs, hotels) is already locale-typed
 * via HOTEL_CLUSTER_DISTRICTS_TR — this object covers everything else.
 */
const CHROME_STRINGS: Record<string, {
  fromDistrictSide: (side: string) => string;
  fromHotels: (name: string) => string;
  perPerson: string;
  pickupIncluded: string;
  selfArrive: string;
  reserveLabelPrefix: string;
  reserveLabelGeneric: string;
  gettingThereHeading: (name: string) => string;
  hotelsHeading: (name: string) => string;
  hotelsDescription: (name: string) => string;
  faqHeading: string;
  optionsHeading: (name: string) => string;
  sunsetCardTitle: string;
  sunsetCardDesc: string;
  dinnerCardTitle: string;
  dinnerCardDesc: string;
  yachtCardTitle: string;
  yachtCardDesc: string;
  ctaHeading: (name: string) => string;
  ctaBody: string;
  ctaReservePrefix: string;
  ctaWhatsapp: (name: string) => string;
  whatsappPrefill: (district: string, label: string) => string;
  trustLine: string;
  europeanSide: string;
  asianSide: string;
}> = {
  en: {
    fromDistrictSide: (side) => `${side} side`,
    fromHotels: (name) => `From ${name} hotels`,
    perPerson: "per person",
    pickupIncluded: "Hotel pickup included on dinner cruise",
    selfArrive: "Self-arrive at the pier",
    reserveLabelPrefix: "Reserve",
    reserveLabelGeneric: "Bosphorus Cruise",
    gettingThereHeading: (name) => `Getting from ${name} to the cruise pier`,
    hotelsHeading: (name) => `Hotels in ${name} we frequently arrange pickup for`,
    hotelsDescription: (name) =>
      `The dinner-cruise pickup vehicle stops at most ${name} hotels regardless of brand — the list below shows venues we hear most commonly during booking confirmation. If your hotel is not listed, note the address in the WhatsApp booking message and the operations team will confirm the pickup point.`,
    faqHeading: "FAQ",
    optionsHeading: (name) => `All Bosphorus cruise options from ${name}`,
    sunsetCardTitle: "Sunset cruise — from €30",
    sunsetCardDesc: "2-hour golden hour from Karaköy pier.",
    dinnerCardTitle: "Dinner cruise — from €30",
    dinnerCardDesc: "3.5-hour evening with dinner + Turkish night show. Hotel pickup included.",
    yachtCardTitle: "Private yacht — from €200",
    yachtCardDesc: "Whole-yacht charter, 2-hour minimum, 10–150 guests.",
    ctaHeading: (name) => `Book your ${name} cruise`,
    ctaBody:
      "Send your hotel name + preferred evening to WhatsApp — we confirm pickup time and package within minutes.",
    ctaReservePrefix: "Reserve",
    ctaWhatsapp: (name) => `WhatsApp from ${name}`,
    whatsappPrefill: (district, label) =>
      `Hi MerrySails! I'm staying in ${district} and would like to book the Bosphorus ${label}. Hotel: [name], date: [date], guests: [N].`,
    trustLine: `Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #${TURSAB_LICENSE_NUMBER} · 50,000+ guests since 2001.`,
    europeanSide: "European",
    asianSide: "Asian",
  },
  de: {
    fromDistrictSide: (side) => `${side} Seite`,
    fromHotels: (name) => `Aus ${name}-Hotels`,
    perPerson: "pro Person",
    pickupIncluded: "Hotel-Abholung im Dinner-Cruise inklusive",
    selfArrive: "Eigene Anreise zum Anleger",
    reserveLabelPrefix: "Reservieren",
    reserveLabelGeneric: "Bosporus-Kreuzfahrt",
    gettingThereHeading: (name) => `Von ${name} zum Anleger`,
    hotelsHeading: (name) => `Hotels in ${name}, von denen wir häufig abholen`,
    hotelsDescription: (name) =>
      `Das Dinner-Cruise-Abholfahrzeug hält an den meisten ${name}-Hotels — die folgende Liste zeigt Häuser, die wir bei Buchungsbestätigungen am häufigsten hören. Wenn Ihr Hotel nicht aufgeführt ist, geben Sie die Adresse in der WhatsApp-Nachricht an, das Operations-Team bestätigt den Abholpunkt.`,
    faqHeading: "FAQ",
    optionsHeading: (name) => `Alle Bosporus-Kreuzfahrt-Optionen ab ${name}`,
    sunsetCardTitle: "Sonnenuntergangs-Tour — ab €30",
    sunsetCardDesc: "2-stündige goldene Stunde ab Karaköy-Anleger.",
    dinnerCardTitle: "Dinner-Cruise — ab €30",
    dinnerCardDesc: "3,5-stündiger Abend mit Abendessen + türkischer Nacht-Show. Hotel-Abholung inkl.",
    yachtCardTitle: "Privatyacht — ab €200",
    yachtCardDesc: "Ganze Yacht charter, 2 Std. Minimum, 10-150 Gäste.",
    ctaHeading: (name) => `${name}-Kreuzfahrt buchen`,
    ctaBody:
      "Hotel-Name + bevorzugten Abend per WhatsApp senden — wir bestätigen Abholzeit und Paket innerhalb von Minuten.",
    ctaReservePrefix: "Reservieren",
    ctaWhatsapp: (name) => `WhatsApp aus ${name}`,
    whatsappPrefill: (district, label) =>
      `Hallo MerrySails! Ich wohne in ${district} und möchte die Bosporus-${label} buchen. Hotel: [Name], Datum: [Datum], Gäste: [N].`,
    trustLine: `Betrieben unter Meryem Yıldız Travel · TÜRSAB A-Gruppe Lizenz #${TURSAB_LICENSE_NUMBER} · 50.000+ Gäste seit 2001.`,
    europeanSide: "Europäische",
    asianSide: "Asiatische",
  },
  fr: {
    fromDistrictSide: (side) => `Rive ${side.toLowerCase()}`,
    fromHotels: (name) => `Depuis les hôtels de ${name}`,
    perPerson: "par personne",
    pickupIncluded: "Prise en charge à l'hôtel incluse sur la croisière-dîner",
    selfArrive: "Rejoindre seul l'embarcadère",
    reserveLabelPrefix: "Réserver",
    reserveLabelGeneric: "Croisière sur le Bosphore",
    gettingThereHeading: (name) => `De ${name} à l'embarcadère`,
    hotelsHeading: (name) => `Hôtels à ${name} où nous organisons souvent la prise en charge`,
    hotelsDescription: (name) =>
      `Le véhicule de prise en charge de la croisière-dîner s'arrête à la plupart des hôtels de ${name} — la liste ci-dessous montre les établissements les plus mentionnés lors de la confirmation de réservation. Si votre hôtel n'y figure pas, indiquez l'adresse dans le message WhatsApp et l'équipe opérationnelle confirmera le point de rendez-vous.`,
    faqHeading: "FAQ",
    optionsHeading: (name) => `Toutes les croisières sur le Bosphore depuis ${name}`,
    sunsetCardTitle: "Croisière coucher de soleil — dès €30",
    sunsetCardDesc: "2 h d'heure dorée depuis l'embarcadère de Karaköy.",
    dinnerCardTitle: "Croisière-dîner — dès €30",
    dinnerCardDesc: "Soirée de 3,5 h avec dîner + spectacle de nuit turque. Prise en charge à l'hôtel incluse.",
    yachtCardTitle: "Yacht privé — dès €200",
    yachtCardDesc: "Affrètement complet, 2 h minimum, 10-150 invités.",
    ctaHeading: (name) => `Réservez votre croisière depuis ${name}`,
    ctaBody:
      "Envoyez votre nom d'hôtel + soirée préférée sur WhatsApp — nous confirmons l'horaire de prise en charge et le forfait en quelques minutes.",
    ctaReservePrefix: "Réserver",
    ctaWhatsapp: (name) => `WhatsApp depuis ${name}`,
    whatsappPrefill: (district, label) =>
      `Bonjour MerrySails ! Je séjourne à ${district} et je souhaite réserver la ${label} sur le Bosphore. Hôtel : [nom], date : [date], invités : [N].`,
    trustLine: `Exploité sous Meryem Yıldız Travel · Licence TÜRSAB Groupe A #${TURSAB_LICENSE_NUMBER} · 50 000+ invités depuis 2001.`,
    europeanSide: "Européenne",
    asianSide: "Asiatique",
  },
  nl: {
    fromDistrictSide: (side) => `${side.toLowerCase()} oever`,
    fromHotels: (name) => `Vanuit ${name}-hotels`,
    perPerson: "per persoon",
    pickupIncluded: "Hotelophaling inbegrepen bij dinercruise",
    selfArrive: "Zelf naar de steiger",
    reserveLabelPrefix: "Boek",
    reserveLabelGeneric: "Bosporuscruise",
    gettingThereHeading: (name) => `Van ${name} naar de cruise-steiger`,
    hotelsHeading: (name) => `Hotels in ${name} waar wij vaak ophalen`,
    hotelsDescription: (name) =>
      `Het ophaalvoertuig van de dinercruise stopt bij de meeste ${name}-hotels — onderstaande lijst toont de hotels die wij het vaakst horen bij boekingsbevestigingen. Staat uw hotel er niet bij, noteer dan het adres in het WhatsApp-boekingsbericht; het operationele team bevestigt het ophaalpunt.`,
    faqHeading: "FAQ",
    optionsHeading: (name) => `Alle Bosporuscruise-opties vanuit ${name}`,
    sunsetCardTitle: "Zonsondergangscruise — vanaf €30",
    sunsetCardDesc: "2-uurs gouden uur vanaf de Karaköy-steiger.",
    dinnerCardTitle: "Dinercruise — vanaf €30",
    dinnerCardDesc: "3,5 uur 's avonds met diner + Turkse nachtshow. Hotelophaling inbegrepen.",
    yachtCardTitle: "Privéjacht — vanaf €200",
    yachtCardDesc: "Volledige jachtcharter, 2 uur minimum, 10-150 gasten.",
    ctaHeading: (name) => `Boek uw cruise vanuit ${name}`,
    ctaBody:
      "Stuur uw hotelnaam + voorkeursavond naar WhatsApp — we bevestigen ophaaltijd en pakket binnen enkele minuten.",
    ctaReservePrefix: "Boek",
    ctaWhatsapp: (name) => `WhatsApp vanuit ${name}`,
    whatsappPrefill: (district, label) =>
      `Hoi MerrySails! Ik logeer in ${district} en wil de Bosporus-${label} boeken. Hotel: [naam], datum: [datum], gasten: [N].`,
    trustLine: `Uitgevoerd door Meryem Yıldız Travel · TÜRSAB groep A vergunning #${TURSAB_LICENSE_NUMBER} · 50.000+ gasten sinds 2001.`,
    europeanSide: "Europese",
    asianSide: "Aziatische",
  },
  ru: {
    fromDistrictSide: (side) => `${side === "European" ? "европейский" : "азиатский"} берег`,
    fromHotels: (name) => `Из отелей ${name}`,
    perPerson: "с человека",
    pickupIncluded: "Трансфер от отеля включён в ужин-круизе",
    selfArrive: "Самостоятельная поездка до причала",
    reserveLabelPrefix: "Забронировать",
    reserveLabelGeneric: "Круиз по Босфору",
    gettingThereHeading: (name) => `Из ${name} до причала круиза`,
    hotelsHeading: (name) => `Отели в ${name}, из которых мы часто забираем`,
    hotelsDescription: (name) =>
      `Машина-ассистент ужин-круиза заезжает в большинство отелей ${name} — список ниже показывает отели, чаще всего упоминаемые при подтверждении брони. Если Вашего отеля нет в списке, укажите адрес в WhatsApp-сообщении при бронировании, и операционная команда подтвердит точку посадки.`,
    faqHeading: "Вопросы и ответы",
    optionsHeading: (name) => `Все варианты круиза по Босфору из ${name}`,
    sunsetCardTitle: "Круиз на закате — от €30",
    sunsetCardDesc: "2 часа золотого часа с причала Карайёй.",
    dinnerCardTitle: "Ужин-круиз — от €30",
    dinnerCardDesc: "3,5 часа вечера: ужин + турецкое ночное шоу. Трансфер от отеля включён.",
    yachtCardTitle: "Частная яхта — от €200",
    yachtCardDesc: "Аренда всей яхты, минимум 2 часа, 10-150 гостей.",
    ctaHeading: (name) => `Забронируйте круиз из ${name}`,
    ctaBody:
      "Отправьте название отеля и удобный вечер в WhatsApp — подтверждаем время трансфера и пакет за несколько минут.",
    ctaReservePrefix: "Забронировать",
    ctaWhatsapp: (name) => `WhatsApp из ${name}`,
    whatsappPrefill: (district, label) =>
      `Здравствуйте, MerrySails! Я проживаю в ${district} и хотел бы забронировать ${label} по Босфору. Отель: [название], дата: [дата], гостей: [N].`,
    trustLine: `Работаем под Meryem Yıldız Travel · лицензия TÜRSAB Группы А №${TURSAB_LICENSE_NUMBER} · более 50 000 гостей с 2001 года.`,
    europeanSide: "Европейский",
    asianSide: "Азиатский",
  },
  tr: {
    fromDistrictSide: (side) => `${side} yakası`,
    fromHotels: (name) => `${name} otellerinden`,
    perPerson: "kişi başı",
    pickupIncluded: "Akşam yemekli turda otel pickup dahil",
    selfArrive: "İskeleye kendi başınıza ulaşın",
    reserveLabelPrefix: "Rezerve Et",
    reserveLabelGeneric: "Boğaz Turu",
    gettingThereHeading: (name) => `${name}'ten iskeleye nasıl gidilir`,
    hotelsHeading: (name) => `${name} otellerinden sık aldığımız misafirler`,
    hotelsDescription: (name) =>
      `Akşam yemekli tur pickup aracı çoğu ${name} otelinde durur — aşağıdaki liste rezervasyon onaylarında en sık duyduğumuz yerleri gösterir. Oteliniz listede yoksa, WhatsApp rezervasyon mesajında adresi belirtin, operasyon ekibi pickup noktasını teyit edecek.`,
    faqHeading: "SSS",
    optionsHeading: (name) => `${name}'ten tüm Boğaz turu seçenekleri`,
    sunsetCardTitle: "Gün batımı turu — €30'dan",
    sunsetCardDesc: "Karaköy iskelesinden 2 saatlik altın saat.",
    dinnerCardTitle: "Akşam yemekli tur — €30'dan",
    dinnerCardDesc: "3,5 saatlik akşam: yemek + Türk gecesi gösterisi. Otel pickup dahil.",
    yachtCardTitle: "Özel yat — €200'den",
    yachtCardDesc: "Tüm tekne kiralama, 2 saat minimum, 10-150 misafir.",
    ctaHeading: (name) => `${name}'ten Boğaz turu rezervasyonu`,
    ctaBody: "Otel adı + tercih ettiğiniz akşamı WhatsApp'tan gönderin — pickup zamanı ve paketi dakikalar içinde teyit ediyoruz.",
    ctaReservePrefix: "Rezerve Et",
    ctaWhatsapp: (name) => `${name}'ten WhatsApp'tan yaz`,
    whatsappPrefill: (district, label) =>
      `Merhaba MerrySails! ${district}'te kalıyorum ve Boğaz ${label} için rezervasyon yapmak istiyorum. Otel: [isim], tarih: [tarih], misafir: [N].`,
    trustLine: `Meryem Yıldız Travel altında işletilir · TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} · 2001'den bu yana 50.000+ misafir.`,
    europeanSide: "Avrupa",
    asianSide: "Asya",
  },
};

/**
 * Shared template for /bosphorus-cruise-from-[district] pages. Renders
 * district-specific transport, hotels, FAQ, and pickup info from the
 * data object passed in.
 *
 * Why this template exists (2026-06-01):
 *   "Bosphorus cruise from Sultanahmet" / "from Taksim" / "from Beyoğlu"
 *   are high-intent local-search queries — the visitor has a hotel
 *   booked and wants to know the logistics. CR on these pages typically
 *   beats generic Bosphorus-cruise pages because the visitor is
 *   ready-to-buy with a specific hotel pickup question already answered.
 */

type Props = {
  district: HotelClusterDistrict;
  /** Locale of the page rendering this district. Defaults to "en"
   *  which preserves prior EN behaviour. */
  locale?: SiteLocale;
};

export default function HotelClusterPage({ district, locale = "en" }: Props) {
  const t = CHROME_STRINGS[locale] ?? CHROME_STRINGS.en;
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const productPath =
    district.recommendedCruise === "sunset"
      ? `${localePrefix}/cruises/bosphorus-sunset-cruise`
      : district.recommendedCruise === "dinner"
        ? `${localePrefix}/istanbul-dinner-cruise`
        : `${localePrefix}/yacht-charter-istanbul`;
  const productPrice =
    district.recommendedCruise === "sunset"
      ? "€30"
      : district.recommendedCruise === "dinner"
        ? "€30"
        : "€200";
  // Translated label for sticky CTA + WhatsApp prefill.
  const productLabel =
    district.recommendedCruise === "sunset"
      ? t.sunsetCardTitle.replace(/ —.*/, "")
      : district.recommendedCruise === "dinner"
        ? t.dinnerCardTitle.replace(/ —.*/, "")
        : t.yachtCardTitle.replace(/ —.*/, "");
  const sideText =
    district.side === "European" ? t.europeanSide : t.asianSide;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Bosphorus Cruise from ${district.name}, Istanbul`,
    description: district.introCapsule,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Place", name: `${district.name}, Istanbul` },
    serviceType: "Bosphorus cruise from hotel district",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${district.slug}`,
      price: productPrice.replace("€", ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".answer-capsule"],
    },
    mainEntity: district.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
      {
        "@type": "ListItem",
        position: 3,
        name: `From ${district.name}`,
        item: `${SITE_URL}/${district.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
        <div className="container-main max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href={localePrefix || "/"} className="hover:text-[var(--brand-primary)]">{locale === "tr" ? "Ana Sayfa" : "Home"}</Link>
            <span>/</span>
            <Link href={`${localePrefix}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">{locale === "tr" ? "Boğaz Turu" : "Bosphorus Cruise"}</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{locale === "tr" ? `${district.name}'ten` : `From ${district.name}`}</span>
          </nav>

          {/* Above-fold conversion card */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                <MapPin className="mr-1 inline h-3 w-3" />
                {t.fromHotels(district.name)} · {t.fromDistrictSide(sideText)}
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--heading)] sm:text-3xl">
                {locale === "tr"
                  ? `${district.name}'ten Boğaz Turu, İstanbul`
                  : `Bosphorus Cruise from ${district.name}, Istanbul`}
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--heading)]">{`${
                  locale === "tr" ? `${productPrice}'dan ${t.perPerson}` : `From ${productPrice} ${t.perPerson}`
                }`}</span>
                <span className="mx-2">·</span>
                <span>{district.pickupEligible ? t.pickupIncluded : t.selfArrive}</span>
              </p>
            </div>
            <Link
              href={`${productPath}#core-booking-planner`}
              className="btn-cta !whitespace-nowrap !px-5 !py-3 text-sm sm:text-base"
            >
              {t.ctaReservePrefix} {productLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <SocialProofBadges variant="generic" locale={locale} />

          {/* Intro / capsule */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              {district.introCapsule}
            </p>
          </section>

          {/* Transport */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              {t.gettingThereHeading(district.name)}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {district.transportToPier.map((opt) => (
                <div
                  key={opt.mode}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {opt.mode.includes("Tram") || opt.mode.includes("funicular") ? (
                      <Train className="h-5 w-5 text-[var(--brand-primary)]" />
                    ) : opt.mode.includes("Taxi") ? (
                      <Car className="h-5 w-5 text-[var(--brand-primary)]" />
                    ) : (
                      <MapPin className="h-5 w-5 text-[var(--brand-primary)]" />
                    )}
                    <h3 className="text-base font-semibold text-[var(--heading)]">{opt.mode}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{opt.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hotels list */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              {t.hotelsHeading(district.name)}
            </h2>
            <p className="mb-3 text-sm text-[var(--text-muted)]">
              {t.hotelsDescription(district.name)}
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {district.knownHotels.map((hotel) => (
                <li
                  key={hotel}
                  className="rounded-lg bg-[var(--surface-alt)] px-3 py-2 text-sm text-[var(--body-text)]"
                >
                  {hotel}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{t.faqHeading}</h2>
            <div className="space-y-3">
              {district.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related products */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              {t.optionsHeading(district.name)}
            </h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <li>
                <Link
                  href={`${localePrefix}/cruises/bosphorus-sunset-cruise`}
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    {t.sunsetCardTitle}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    {t.sunsetCardDesc}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/istanbul-dinner-cruise`}
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    {t.dinnerCardTitle}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    {t.dinnerCardDesc}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/yacht-charter-istanbul`}
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    {t.yachtCardTitle}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    {t.yachtCardDesc}
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              {t.ctaHeading(district.name)}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              {t.ctaBody}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`${productPath}#core-booking-planner`} className="btn-cta !px-6 !py-3">
                {t.ctaReservePrefix} {productLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  t.whatsappPrefill(district.name, productLabel.toLowerCase()),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                {t.ctaWhatsapp(district.name)}
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              {t.trustLine}
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref={`${productPath}#core-booking-planner`}
        reserveLabel={
          locale === "tr"
            ? `${productPrice}'dan ${t.reserveLabelPrefix.toLowerCase()}`
            : `${t.ctaReservePrefix} from ${productPrice}`
        }
        locale={locale}
        whatsappLocation={`hotel_cluster_${locale}_${district.slug}`}
        whatsappPrefill={t.whatsappPrefill(district.name, productLabel.toLowerCase())}
      />
    </>
  );
}
