import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

type LocaleKey = "tr" | "de" | "fr" | "nl";

type FaqItem = { q: string; a: string };

type LocaleContent = {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    tagline: string;
    heading: string;
    subheading: string;
    bookNow: string;
    trustLine: string;
    fromLabel: string;
  };
  products: {
    sunset: { eyebrow: string; title: string; description: string; price: string };
    dinner: { eyebrow: string; title: string; description: string; price: string };
    yacht: { eyebrow: string; title: string; description: string; price: string };
  };
  coreSection: {
    heading: string;
    intro: string;
    seeDetails: string;
  };
  whyUs: {
    heading: string;
    intro: string;
    cards: { title: string; description: string }[];
  };
  faqSection: {
    heading: string;
    intro: string;
    items: FaqItem[];
  };
  bottomCta: {
    heading: string;
    intro: string;
    bookButton: string;
    whatsappButton: string;
  };
};

const TRANSLATIONS: Record<LocaleKey, LocaleContent> = {
  tr: {
    htmlLang: "tr-TR",
    metaTitle: "Boğaz Turu İstanbul | Gün Batımı & Yemek | MerrySails",
    metaDescription:
      "İstanbul'un özel Boğaz deneyimleri: gün batımı turu, akşam yemekli Boğaz turu ve özel yat kiralama. TÜRSAB A Grubu lisanslı, 50.000+ misafir.",
    hero: {
      tagline: "İstanbul'un Özel Boğaz Deneyimi",
      heading: "Boğaz'da Unutulmaz Bir Deneyim Sizi Bekliyor",
      subheading:
        "Gün batımı turu, akşam yemekli tekne turu ve özel yat kiralama — direkt rezervasyon, lisanslı operatör, net fiyatlar.",
      bookNow: "Hemen Rezervasyon",
      trustLine: "TÜRSAB A Grubu Lisanslı · 50.000+ Misafir · Direkt Rezervasyon",
      fromLabel: "Başlangıç fiyatı",
    },
    products: {
      sunset: {
        eyebrow: "Altın saat",
        title: "Boğaz Gün Batımı Turu",
        description: "Net fiyatlı, tarihe göre planlı, paylaşımlı altın saat yelken keyfi.",
        price: "€34'ten başlayan fiyatlarla",
      },
      dinner: {
        eyebrow: "Paylaşımlı akşam",
        title: "Boğaz Akşam Yemeği Turu",
        description: "Akşam yemeği servisi, eğlence ve dört farklı paket seçeneğiyle ana paylaşımlı deneyim.",
        price: "€30'dan başlayan fiyatlarla",
      },
      yacht: {
        eyebrow: "Premium charter",
        title: "Yat Kiralama İstanbul",
        description: "Özel yat paketleri, ek hizmetler ve premium rezervasyon seçenekleri.",
        price: "€280'den başlayan fiyatlarla",
      },
    },
    coreSection: {
      heading: "Boğaz Deneyiminizi Seçin",
      intro: "Direkt rezervasyon için 3 ana ürünümüz: gün batımı, akşam yemekli ve özel yat.",
      seeDetails: "Detayları görüntüle →",
    },
    whyUs: {
      heading: "Neden MerrySails?",
      intro: "İstanbul'da Boğaz turlarının uzmanı olarak misafirlerimize net, güvenilir ve şeffaf bir deneyim sunuyoruz.",
      cards: [
        {
          title: "Direkt Rezervasyon",
          description: "Aracı yok, komisyon yok. Doğrudan operatörle iletişim, hızlı onay ve net fiyat.",
        },
        {
          title: "TÜRSAB Lisanslı",
          description: "2001'den beri TÜRSAB A Grubu lisanslı seyahat acentesi olarak hizmet veriyoruz.",
        },
        {
          title: "Boğaz Uzmanı",
          description: "Gün batımı, akşam yemeği ve özel yat ürünleri için ayrı ayrı planlama uzmanlığı.",
        },
      ],
    },
    faqSection: {
      heading: "İstanbul Boğaz Turu — Sıkça Sorulan Sorular",
      intro: "Rezervasyon yapmadan önce bilmeniz gereken her şey.",
      items: [
        {
          q: "Boğaz turuna neler dahil?",
          a: "MerrySails farklı Boğaz deneyimleri sunar. Gün batımı turu 2 saatlik paylaşımlı bir altın saat yelken turudur ve pakete göre içecek, atıştırmalık ve şarap servisi içerir. Akşam yemekli tur, akşam yemeği servisi ve sahne gösterileri ekler. Özel yat kiralama ise yemek, içecek, transfer ve eğlence opsiyonlu özel paketleri kapsar.",
        },
        {
          q: "Boğaz turu ne kadar sürer?",
          a: "Gün batımı turumuz yaklaşık 2 saat, paylaşımlı akşam yemekli tur yaklaşık 3,5 saat sürer. Özel yat kiralama paketleri 2 saatten başlar ve ek süre eklenebilir.",
        },
        {
          q: "Boğaz turu nereden kalkıyor?",
          a: "Kalkış noktası ürüne göre değişir. Gün batımı turu rezervasyon sonrası bildirilen merkezi bir noktadan, akşam yemekli tur Kabataş İskelesi üzerinden (Avrupa yakası merkezi otellerden alma desteğiyle) ve özel yatlar Boğaz'daki onaylı marinalardan kalkar.",
        },
        {
          q: "Akşam yemeği, evlilik teklifi veya özel kiralama için hangi deneyim uygun?",
          a: "Ana paylaşımlı akşam deneyimi için Akşam Yemekli Boğaz Turu, özel yat rezervasyonu için Yat Kiralama İstanbul, evlilik teklifi için Evlilik Teklifi Yat Kiralama, kurumsal davetler için Kurumsal Etkinlikler ve daha kısa süreli özel kiralama için Saatlik Tekne Kiralama uygun seçeneklerdir.",
        },
        {
          q: "İstanbul'da Boğaz turu için en iyi zaman ne zaman?",
          a: "En iyi aylar Nisan–Haziran ve Eylül–Ekim'dir; sıcaklık 15–25°C, gökyüzü açık ve gün batımı ışığı muhteşemdir. Yaz aylarında (Temmuz–Ağustos) öğleden sonra sıcak olabilir, akşam turları idealdir. Kış turları atmosferik ve indirimlidir; akşam yemekli turlarda kapalı ısıtmalı yemek alanı bulunur.",
        },
      ],
    },
    bottomCta: {
      heading: "Boğaz Deneyiminizi Rezerve Edin",
      intro: "Sorularınız için WhatsApp'tan yazabilir veya online rezervasyon yapabilirsiniz.",
      bookButton: "Online Rezervasyon",
      whatsappButton: "WhatsApp ile İletişim",
    },
  },
  de: {
    htmlLang: "de-DE",
    metaTitle: "Bosporus Kreuzfahrt Istanbul | Dinner & Yacht | MerrySails",
    metaDescription:
      "Istanbuls exklusive Bosporus-Erlebnisse: Sonnenuntergangs-Kreuzfahrt, Dinner-Kreuzfahrt und private Yacht-Charter. TURSAB A-Gruppe lizenziert, 50.000+ Gäste.",
    hero: {
      tagline: "Istanbuls exklusive Bosporus-Erlebnisse",
      heading: "Erleben Sie den Bosporus auf eine besondere Art",
      subheading:
        "Sonnenuntergangs-Kreuzfahrt, Dinner-Kreuzfahrt und privater Yacht-Charter — direkte Buchung, lizenzierter Veranstalter, transparente Preise.",
      bookNow: "Jetzt Buchen",
      trustLine: "TURSAB A-Gruppe lizenziert · 50.000+ Gäste · Direkte Buchung",
      fromLabel: "Ab",
    },
    products: {
      sunset: {
        eyebrow: "Goldene Stunde",
        title: "Bosporus Sonnenuntergangs-Kreuzfahrt",
        description: "Geteilte Sonnenuntergangs-Fahrt mit klaren Preisen und festen Buchungsterminen.",
        price: "Ab €34",
      },
      dinner: {
        eyebrow: "Gemeinsamer Abend",
        title: "Bosporus Dinner-Kreuzfahrt",
        description: "Hauptangebot am Abend mit Dinner-Service, Unterhaltung und vier Paketstufen.",
        price: "Ab €30",
      },
      yacht: {
        eyebrow: "Premium Charter",
        title: "Yacht-Charter Istanbul",
        description: "Private Charter-Pakete mit Add-Ons und exklusiven Buchungsoptionen.",
        price: "Ab €280",
      },
    },
    coreSection: {
      heading: "Wählen Sie Ihr Bosporus-Erlebnis",
      intro: "Unsere drei Hauptangebote für direkte Buchungen: Sonnenuntergang, Dinner und private Yacht.",
      seeDetails: "Details ansehen →",
    },
    whyUs: {
      heading: "Warum MerrySails?",
      intro: "Als Bosporus-Spezialist in Istanbul bieten wir unseren Gästen ein klares, vertrauenswürdiges und transparentes Erlebnis.",
      cards: [
        {
          title: "Direkte Buchung",
          description: "Keine Vermittler, keine Provisionen. Direkter Kontakt mit dem Veranstalter, schnelle Bestätigung und transparente Preise.",
        },
        {
          title: "TURSAB lizenziert",
          description: "Seit 2001 als lizenzierte Reiseagentur der TURSAB A-Gruppe tätig.",
        },
        {
          title: "Bosporus-Spezialist",
          description: "Eigene Planungsexpertise für Sonnenuntergangs-, Dinner- und private Yacht-Produkte.",
        },
      ],
    },
    faqSection: {
      heading: "Bosporus-Kreuzfahrt Istanbul — Häufige Fragen",
      intro: "Alles, was Sie vor Ihrer Buchung wissen müssen.",
      items: [
        {
          q: "Was ist in der Bosporus-Kreuzfahrt enthalten?",
          a: "MerrySails bietet verschiedene Bosporus-Erlebnisse. Die Sonnenuntergangs-Kreuzfahrt ist eine zweistündige geteilte Fahrt mit Getränken, Snacks und je nach Paket Wein-Service. Die Dinner-Kreuzfahrt umfasst Dinner-Service und Bühnenunterhaltung, während der Yacht-Charter private Yacht-Pakete mit optionalen Mahlzeiten, Getränken, Transfers und Unterhaltung beinhaltet.",
        },
        {
          q: "Wie lange dauert die Bosporus-Kreuzfahrt?",
          a: "Die Sonnenuntergangs-Kreuzfahrt dauert ca. 2 Stunden, die geteilte Dinner-Kreuzfahrt ca. 3,5 Stunden, und die Yacht-Charter-Pakete beginnen bei 2 Stunden mit Option auf zusätzliche Zeit.",
        },
        {
          q: "Wo startet die Bosporus-Kreuzfahrt?",
          a: "Der Abfahrtsort hängt vom Produkt ab. Die Sonnenuntergangs-Kreuzfahrt nutzt einen zentralen Treffpunkt, der nach der Buchung bestätigt wird. Die Dinner-Kreuzfahrt startet am Kabatas-Pier mit Hotel-Abholung aus zentralen europäischen Stadtteilen, und Yacht-Charter starten von zugelassenen Bosporus-Marinas je nach Boot.",
        },
        {
          q: "Welches Erlebnis passt zu Dinner, Heiratsantrag oder privatem Charter?",
          a: "Für das geteilte Abendprogramm wählen Sie die Istanbul Dinner-Kreuzfahrt. Für private Yacht-Buchungen den Yacht-Charter Istanbul. Für einen Heiratsantrag die Antrags-Yacht-Vermietung. Für Firmen-Events Corporate Events. Für eine kürzere private Charter-Anfrage Boat Rental Istanbul.",
        },
        {
          q: "Wann ist die beste Zeit für eine Bosporus-Kreuzfahrt?",
          a: "Die besten Monate sind April–Juni und September–Oktober mit Temperaturen von 15–25°C, klarem Himmel und dramatischem Sonnenuntergangslicht. Sommer (Juli–August) ist beliebt aber nachmittags heiß — Abendfahrten sind ideal. Winterfahrten sind atmosphärisch und vergünstigt, mit beheiztem Innenbereich auf Dinner-Kreuzfahrten.",
        },
      ],
    },
    bottomCta: {
      heading: "Buchen Sie Ihr Bosporus-Erlebnis",
      intro: "Schreiben Sie uns auf WhatsApp oder buchen Sie online.",
      bookButton: "Online buchen",
      whatsappButton: "Per WhatsApp kontaktieren",
    },
  },
  fr: {
    htmlLang: "fr-FR",
    metaTitle: "Croisière Bosphore Istanbul | Dîner & Yacht | MerrySails",
    metaDescription:
      "L'expérience exclusive du Bosphore à Istanbul : croisière coucher de soleil, croisière dîner et charter de yacht privé. TURSAB Groupe A licencié, 50 000+ invités.",
    hero: {
      tagline: "L'expérience exclusive du Bosphore à Istanbul",
      heading: "Vivez le Bosphore comme jamais auparavant",
      subheading:
        "Croisière coucher de soleil, croisière dîner et charter de yacht privé — réservation directe, opérateur licencié, prix transparents.",
      bookNow: "Réserver Maintenant",
      trustLine: "TURSAB Groupe A licencié · 50 000+ invités · Réservation directe",
      fromLabel: "À partir de",
    },
    products: {
      sunset: {
        eyebrow: "Heure dorée",
        title: "Croisière Coucher de Soleil",
        description: "Croisière partagée à l'heure dorée avec tarifs transparents et créneaux fixes.",
        price: "À partir de €34",
      },
      dinner: {
        eyebrow: "Soirée partagée",
        title: "Croisière Dîner Bosphore",
        description: "Expérience principale du soir avec service dîner, animation et quatre niveaux de package.",
        price: "À partir de €30",
      },
      yacht: {
        eyebrow: "Charter premium",
        title: "Charter de Yacht Istanbul",
        description: "Packages de yacht privés avec options et réservations haut de gamme.",
        price: "À partir de €280",
      },
    },
    coreSection: {
      heading: "Choisissez Votre Expérience du Bosphore",
      intro: "Nos 3 produits principaux pour réservation directe : coucher de soleil, dîner et yacht privé.",
      seeDetails: "Voir les détails →",
    },
    whyUs: {
      heading: "Pourquoi MerrySails ?",
      intro: "En tant que spécialiste du Bosphore à Istanbul, nous offrons à nos invités une expérience claire, fiable et transparente.",
      cards: [
        {
          title: "Réservation directe",
          description: "Pas d'intermédiaire, pas de commission. Contact direct avec l'opérateur, confirmation rapide et tarifs clairs.",
        },
        {
          title: "TURSAB licencié",
          description: "Agence de voyages licenciée TURSAB Groupe A depuis 2001.",
        },
        {
          title: "Spécialiste Bosphore",
          description: "Expertise dédiée pour les produits coucher de soleil, dîner et yacht privé.",
        },
      ],
    },
    faqSection: {
      heading: "Croisière du Bosphore Istanbul — Questions Fréquentes",
      intro: "Tout ce qu'il faut savoir avant de réserver.",
      items: [
        {
          q: "Qu'est-ce qui est inclus dans la croisière du Bosphore ?",
          a: "MerrySails propose plusieurs expériences. La croisière coucher de soleil est une navigation partagée de 2 heures à l'heure dorée avec boissons, en-cas et option vin selon le package. La croisière dîner ajoute un service de dîner et un spectacle, tandis que le charter de yacht couvre des packages privés avec repas, boissons, transferts et animation en option.",
        },
        {
          q: "Combien de temps dure la croisière du Bosphore ?",
          a: "La croisière coucher de soleil dure environ 2 heures, la croisière dîner partagée environ 3,5 heures, et les packages de charter de yacht commencent à 2 heures avec possibilité d'extension.",
        },
        {
          q: "D'où part la croisière du Bosphore ?",
          a: "Le point de départ dépend du produit. La croisière coucher de soleil utilise un point de rendez-vous central confirmé après réservation, la croisière dîner part de la jetée de Kabatas avec prise en charge depuis les hôtels du centre côté européen, et les yachts privés partent des marinas approuvées du Bosphore selon le bateau.",
        },
        {
          q: "Quelle expérience choisir pour un dîner, une demande en mariage ou un charter privé ?",
          a: "Pour la soirée partagée, choisissez la Croisière Dîner Istanbul. Pour une réservation de yacht privé, le Charter de Yacht Istanbul. Pour une demande en mariage, la location de yacht pour demande. Pour un événement d'entreprise, les Événements Corporatifs. Pour une location plus courte, Boat Rental Istanbul.",
        },
        {
          q: "Quel est le meilleur moment pour une croisière du Bosphore ?",
          a: "Les meilleurs mois sont avril–juin et septembre–octobre avec des températures de 15–25°C, un ciel dégagé et une lumière de coucher de soleil spectaculaire. L'été (juillet–août) est populaire mais chaud l'après-midi — les croisières du soir sont idéales. Les croisières d'hiver sont atmosphériques et à prix réduit, avec salle de dîner intérieure chauffée.",
        },
      ],
    },
    bottomCta: {
      heading: "Réservez Votre Expérience du Bosphore",
      intro: "Contactez-nous sur WhatsApp ou réservez en ligne.",
      bookButton: "Réservation en ligne",
      whatsappButton: "Contacter via WhatsApp",
    },
  },
  nl: {
    htmlLang: "nl-NL",
    metaTitle: "Bosporus Cruise Istanbul | Diner & Jacht | MerrySails",
    metaDescription:
      "Istanbul's exclusieve Bosporus-ervaring: zonsondergangs-cruise, dinercruise en privé jachtcharter. TURSAB A Groep gelicentieerd, 50.000+ gasten.",
    hero: {
      tagline: "Istanbul's exclusieve Bosporus-ervaring",
      heading: "Beleef de Bosporus zoals nooit tevoren",
      subheading:
        "Zonsondergangs-cruise, dinercruise en privé jachtcharter — directe boeking, gelicentieerde aanbieder, transparante prijzen.",
      bookNow: "Nu Boeken",
      trustLine: "TURSAB A Groep gelicentieerd · 50.000+ gasten · Directe boeking",
      fromLabel: "Vanaf",
    },
    products: {
      sunset: {
        eyebrow: "Gouden uur",
        title: "Bosporus Zonsondergangs-Cruise",
        description: "Gedeelde zonsondergangscruise met heldere prijzen en vaste boekingstijden.",
        price: "Vanaf €34",
      },
      dinner: {
        eyebrow: "Gedeelde avond",
        title: "Bosporus Dinercruise",
        description: "Hoofdaanbod 's avonds met dinerservice, entertainment en vier pakketniveaus.",
        price: "Vanaf €30",
      },
      yacht: {
        eyebrow: "Premium charter",
        title: "Jachtcharter Istanbul",
        description: "Privé jachtpakketten met add-ons en exclusieve boekingsopties.",
        price: "Vanaf €280",
      },
    },
    coreSection: {
      heading: "Kies Uw Bosporus-Ervaring",
      intro: "Onze 3 hoofdaanbiedingen voor directe boekingen: zonsondergang, diner en privéjacht.",
      seeDetails: "Bekijk details →",
    },
    whyUs: {
      heading: "Waarom MerrySails?",
      intro: "Als Bosporus-specialist in Istanbul bieden wij onze gasten een heldere, betrouwbare en transparante ervaring.",
      cards: [
        {
          title: "Directe boeking",
          description: "Geen tussenpersonen, geen commissies. Direct contact met de aanbieder, snelle bevestiging en duidelijke prijzen.",
        },
        {
          title: "TURSAB gelicentieerd",
          description: "Sinds 2001 actief als TURSAB A Groep gelicentieerd reisbureau.",
        },
        {
          title: "Bosporus-specialist",
          description: "Aparte planningsexpertise voor zonsondergangs-, diner- en privé jachtproducten.",
        },
      ],
    },
    faqSection: {
      heading: "Bosporus Cruise Istanbul — Veelgestelde Vragen",
      intro: "Alles wat u moet weten voordat u boekt.",
      items: [
        {
          q: "Wat is inbegrepen bij de Bosporus-cruise?",
          a: "MerrySails biedt verschillende Bosporus-ervaringen. De zonsondergangs-cruise is een 2 uur durende gedeelde gouden uur-vaart met drankjes, snacks en wijnservice afhankelijk van het pakket. De dinercruise voegt dinerservice en podiumvermaak toe, terwijl de jachtcharter privé jachtpakketten omvat met optionele maaltijden, drankjes, transfers en entertainment.",
        },
        {
          q: "Hoe lang duurt de Bosporus-cruise?",
          a: "De zonsondergangs-cruise duurt ongeveer 2 uur, de gedeelde dinercruise ongeveer 3,5 uur, en de jachtcharter-pakketten beginnen bij 2 uur met optie voor extra tijd.",
        },
        {
          q: "Vanwaar vertrekt de Bosporus-cruise?",
          a: "Het vertrekpunt hangt af van het product. De zonsondergangs-cruise gebruikt een centraal ontmoetingspunt dat na boeking wordt bevestigd, de dinercruise vertrekt vanaf de Kabatas-pier met hotelpickup vanuit centrale Europese wijken, en jachtcharter vertrekt vanaf goedgekeurde Bosporus-jachthavens afhankelijk van het vaartuig.",
        },
        {
          q: "Welke ervaring past bij diner, huwelijksaanzoek of privéverhuur?",
          a: "Voor de gedeelde avondervaring kiest u de Istanbul Dinercruise. Voor privé jachtboekingen Jachtcharter Istanbul. Voor een huwelijksaanzoek de huwelijksaanzoek-jachtverhuur. Voor zakelijke evenementen Corporate Events. Voor een kortere privéhuur Boat Rental Istanbul.",
        },
        {
          q: "Wanneer is de beste tijd voor een Bosporus-cruise?",
          a: "De beste maanden zijn april–juni en september–oktober met temperaturen van 15–25°C, heldere lucht en een dramatisch zonsondergangslicht. Zomer (juli–augustus) is populair maar 's middags warm — avondvaarten zijn ideaal. Wintervaarten zijn sfeervol en goedkoper, met verwarmde binnenruimte op dinercruises.",
        },
      ],
    },
    bottomCta: {
      heading: "Boek Uw Bosporus-Ervaring",
      intro: "Neem contact op via WhatsApp of boek online.",
      bookButton: "Online boeken",
      whatsappButton: "Contact via WhatsApp",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    return {};
  }
  const t = TRANSLATIONS[locale as LocaleKey];
  if (!t) return {};

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      locale: t.htmlLang,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "MerrySails — Bosphorus Cruise Istanbul",
        },
      ],
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    notFound();
  }

  const t = TRANSLATIONS[locale as LocaleKey];
  if (!t) {
    notFound();
  }

  const products = [
    {
      key: "sunset" as const,
      href: `/${locale}/cruises/bosphorus-sunset-cruise`,
      image: "/images/sunset1.jpeg",
      content: t.products.sunset,
    },
    {
      key: "dinner" as const,
      href: `/${locale}/istanbul-dinner-cruise`,
      image: "/images/dinner-etkinlik-2.jpeg",
      content: t.products.dinner,
    },
    {
      key: "yacht" as const,
      href: `/${locale}/yacht-charter-istanbul`,
      image: "/images/tours/yacht-charter-in-istanbul/02.jpeg",
      content: t.products.yacht,
    },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.metaTitle,
    description: t.metaDescription,
    url: `${SITE_URL}/${locale}`,
    inLanguage: t.htmlLang,
    isPartOf: {
      "@type": "WebSite",
      name: "MerrySails",
      url: SITE_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.htmlLang,
    mainEntity: t.faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const reservationHref = `/${locale}/reservation`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--surface-alt)] to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-primary)] mb-4">
              {t.hero.tagline}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 max-w-3xl mx-auto leading-tight">
              {t.hero.heading}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.hero.subheading}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link
                href={reservationHref}
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-8 py-3 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {t.hero.bookNow}
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-[var(--brand-primary)]"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-xs md:text-sm text-gray-500">{t.hero.trustLine}</p>
          </div>

          {/* Hero product cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-[var(--brand-primary)]"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={p.image}
                    alt={p.content.title}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {p.content.title}
                  </h3>
                  <p className="text-xs text-[var(--brand-primary)] font-medium mt-0.5">
                    {p.content.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core booking section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            {t.coreSection.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-10">
            {t.coreSection.intro}
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="group overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white transition-colors hover:border-[var(--brand-primary)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.content.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">
                    {p.content.eyebrow}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.content.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{p.content.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">{p.content.price}</span>
                    <span className="text-sm font-semibold text-[var(--brand-primary)]">
                      {t.coreSection.seeDetails}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why MerrySails */}
      <section className="py-16 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            {t.whyUs.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-10">
            {t.whyUs.intro}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {t.whyUs.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            {t.faqSection.heading}
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">{t.faqSection.intro}</p>
          <div className="space-y-4">
            {t.faqSection.items.map((faq, i) => (
              <details
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-400 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t.bottomCta.heading}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.bottomCta.intro}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={reservationHref}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t.bottomCta.bookButton}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-[var(--brand-primary)]"
            >
              {t.bottomCta.whatsappButton}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
