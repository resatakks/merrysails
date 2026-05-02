import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const dinnerTour = getTourBySlug("bosphorus-dinner-cruise");
if (!dinnerTour) throw new Error("Dinner cruise data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("yacht-charter-in-istanbul"),
  getTourBySlug("private-bosphorus-dinner-yacht-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  canonicalPath: string;
  homeLabel: string;
  bosphorusLabel: string;
  aboutTitle: string;
  aboutBody: string[];
  trustSignal: string;
  tableRows: [string, string][];
  packageSectionTitle: string;
  perPerson: string;
  packages: { name: string; price: string; items: string[] }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  otherOptionsTitle: string;
  otherOptions: { href: string; title: string; desc: string }[];
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    title: "İstanbul Akşam Yemeği Turu — €30'dan başlayan fiyatlar | MerrySails",
    description:
      "İstanbul'da Boğaz akşam yemeği turu paketleri €30'dan başlıyor. Türk gecesi eğlencesi, otel transfer desteği ve 4 farklı paket seçeneği. Hemen rezervasyon yapın.",
    h1: "İstanbul Akşam Yemeği Turu",
    breadcrumb: "Akşam Yemeği Turu",
    canonicalPath: "/tr/istanbul-dinner-cruise",
    homeLabel: "Ana Sayfa",
    bosphorusLabel: "Boğaz Turu",
    aboutTitle: "İstanbul Boğaz Akşam Yemeği Turu Nedir?",
    aboutBody: [
      "MerrySails İstanbul Akşam Yemeği Turu, Boğaz'ın en güzel manzaralarını izlerken akşam yemeği ve Türk gecesi eğlencesinin bir arada sunulduğu paylaşımlı tekne deneyimidir. Tur yaklaşık 3,5 saat sürer, Kabataş İskelesi'nden hareket eder ve dört farklı paket seçeneği sunar: €30, €45, €80 ve €90.",
      "Her paketin içeriği — koltuk tipi, içecek çeşitleri ve yemek menüsü düzeyi — net olarak ayrılmıştır. 50.000'den fazla misafiri ağırladık.",
      "Bazı merkezi Avrupa yakası otelleri için servis transferi mevcuttur. Transfer detayları rezervasyon onayından sonra yazılı olarak iletilir.",
    ],
    trustSignal: "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism tarafından sunulmaktadır.",
    tableRows: [
      ["Süre", "~3,5 saat"],
      ["Kalkış", "Kabataş (20:30)"],
      ["En düşük fiyat", "€30 (Silver Soft Drinks)"],
      ["En yüksek fiyat", "€90 (Gold Unlimited Alkol)"],
      ["Paket sayısı", "4 farklı paket"],
      ["Transfer desteği", "Uygun oteller için mevcut"],
    ],
    packageSectionTitle: "Paket Karşılaştırması",
    perPerson: "kişi başı",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€30",
        items: ["Standart koltuk", "Sınırsız alkolsüz içecek", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
      },
      {
        name: "Silver Alcoholic",
        price: "€45",
        items: ["Standart koltuk", "Yerel alkollü içecekler", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€80",
        items: ["VIP sahne yakını koltuk", "Sınırsız alkolsüz içecek", "Premium yemek menüsü", "Türk gecesi + DJ"],
      },
      {
        name: "Gold Unlimited Alkol",
        price: "€90",
        items: ["VIP sahne yakını koltuk", "Sınırsız alkol dahil", "Premium yemek menüsü", "Türk gecesi + DJ"],
      },
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Akşam yemeği turu ne kadar sürer?",
        a: "Tur yaklaşık 3,5 saat sürer. Kabataş'tan saat 20:30'da hareket eder.",
      },
      {
        q: "Otel transferi dahil mi?",
        a: "Merkezi Avrupa yakası otellerinin büyük bölümü için servis transferi mevcuttur. Kesin transfer detayları rezervasyon onayından sonra yazılı olarak iletilir.",
      },
      {
        q: "Paketler arasındaki fark nedir?",
        a: "Farklar koltuk tipi (standart / VIP sahne yakını), içecek kapsamı ve yemek menüsü düzeyidir. Güzergah ve tur süresi tüm paketlerde aynıdır.",
      },
      {
        q: "Ne zaman rezervasyon yapmalıyım?",
        a: "Yaz sezonunda (Mayıs–Eylül) en az 3–5 gün öncesinden rezervasyon yapmanızı öneririz. Turlar çoğunlukla dolup taşmaktadır.",
      },
    ],
    otherOptionsTitle: "Diğer Seçenekler",
    otherOptions: [
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "Boğaz Gün Batımı Turu",
        desc: "€34'ten başlayan 2 saatlik altın saat gün batımı turu.",
      },
      {
        href: "/yacht-charter-istanbul",
        title: "Özel Yat Kiralama",
        desc: "€280'den başlayan tam özel yat deneyimi.",
      },
      {
        href: "/istanbul-dinner-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
  },
  de: {
    title: "Istanbul Dinner Kreuzfahrt ab €30 — Türkische Nacht & Bosporus | MerrySails",
    description:
      "Bosporus Dinner Cruise Istanbul ab €30. Türkische Abendunterhaltung, 4 Pakete bis €90, Hoteltransfer möglich. TÜRSAB-lizenziert seit 2001. Jetzt buchen.",
    h1: "Istanbul Dinner-Kreuzfahrt",
    breadcrumb: "Dinner-Kreuzfahrt",
    canonicalPath: "/de/istanbul-dinner-cruise",
    homeLabel: "Startseite",
    bosphorusLabel: "Bosporus-Tour",
    aboutTitle: "Was ist die Istanbul Dinner Cruise?",
    aboutBody: [
      "Die MerrySails Dinner Cruise ist eine geteilte Bootsfahrt auf dem Bosporus, die Abendessen, türkische Live-Show und einen unvergleichlichen Blick auf das beleuchtete Istanbul kombiniert. Die Fahrt dauert rund 3,5 Stunden, startet am Anleger Kabataş und bietet vier Pakete zur Auswahl: €30, €45, €80 und €90.",
      "Jedes Paket ist klar abgegrenzt – nach Sitzplatzkategorie, Getränkeumfang und Menüstufe. Wir haben bereits über 50.000 Gäste an Bord begrüßt.",
      "Für viele zentrale Hotels auf der europäischen Seite bieten wir einen Shuttle-Service an. Die genauen Abholzeiten erhalten Sie schriftlich nach Buchungsbestätigung.",
    ],
    trustSignal: "Veranstalter Merry Tourism – seit 2001 TÜRSAB-A-Gruppe lizenziert.",
    tableRows: [
      ["Dauer", "ca. 3,5 Stunden"],
      ["Abfahrt", "Kabataş (20:30 Uhr)"],
      ["Niedrigster Preis", "€30 (Silver Soft Drinks)"],
      ["Höchster Preis", "€90 (Gold Unlimited Alkohol)"],
      ["Pakete", "4 verschiedene Optionen"],
      ["Hoteltransfer", "Für ausgewählte Hotels verfügbar"],
    ],
    packageSectionTitle: "Paketvergleich",
    perPerson: "pro Person",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€30",
        items: [
          "Standard-Sitzplatz",
          "Alkoholfreie Getränke unbegrenzt",
          "Abendmenü",
          "Türkische Abendshow",
        ],
      },
      {
        name: "Silver Alcoholic",
        price: "€45",
        items: [
          "Standard-Sitzplatz",
          "Lokale alkoholische Getränke",
          "Abendmenü",
          "Türkische Abendshow",
        ],
      },
      {
        name: "Gold Soft Drinks",
        price: "€80",
        items: [
          "VIP-Sitzplatz nahe der Bühne",
          "Alkoholfreie Getränke unbegrenzt",
          "Premium-Menü",
          "Türkische Show + DJ",
        ],
      },
      {
        name: "Gold Unlimited Alkohol",
        price: "€90",
        items: [
          "VIP-Sitzplatz nahe der Bühne",
          "Alkohol unbegrenzt inklusive",
          "Premium-Menü",
          "Türkische Show + DJ",
        ],
      },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie lange dauert die Dinner Cruise?",
        a: "Die Tour dauert rund 3,5 Stunden und startet um 20:30 Uhr am Anleger Kabataş.",
      },
      {
        q: "Ist der Hoteltransfer inklusive?",
        a: "Für die meisten zentralen Hotels auf der europäischen Seite bieten wir einen kostenlosen Shuttle-Service. Die genauen Abholzeiten erhalten Sie schriftlich nach der Buchungsbestätigung.",
      },
      {
        q: "Worin unterscheiden sich die Pakete?",
        a: "Die Pakete unterscheiden sich in der Sitzplatzkategorie (Standard oder VIP nahe der Bühne), beim Getränkeumfang und beim Menü. Route und Dauer sind in allen Paketen identisch.",
      },
      {
        q: "Wann sollte ich buchen?",
        a: "In der Hochsaison (Mai bis September) empfehlen wir eine Buchung mindestens 3–5 Tage im Voraus. Die Touren sind häufig ausgebucht.",
      },
    ],
    otherOptionsTitle: "Weitere Optionen",
    otherOptions: [
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "Bosporus Sonnenuntergang-Tour",
        desc: "2-stündige Tour zur goldenen Stunde ab €34.",
      },
      {
        href: "/yacht-charter-istanbul",
        title: "Privater Yacht-Charter",
        desc: "Komplett private Yacht-Erlebnisse ab €280.",
      },
      {
        href: "/istanbul-dinner-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
  },
  fr: {
    title: "Croisière Dîner Istanbul — À partir de €30 | MerrySails",
    description:
      "Croisière dîner sur le Bosphore à Istanbul à partir de €30. 4 formules jusqu'à €90, spectacle de nuit turque, transfert hôtel disponible. Réservez maintenant.",
    h1: "Croisière Dîner Istanbul",
    breadcrumb: "Croisière Dîner",
    canonicalPath: "/fr/istanbul-dinner-cruise",
    homeLabel: "Accueil",
    bosphorusLabel: "Croisière Bosphore",
    aboutTitle: "Qu'est-ce que la croisière dîner sur le Bosphore ?",
    aboutBody: [
      "La croisière dîner MerrySails est une expérience partagée à bord d'un bateau qui réunit dîner, spectacle de nuit turque et vue panoramique sur Istanbul illuminé. La croisière dure environ 3h30, part de l'embarcadère de Kabataş et propose quatre formules au choix : €30, €45, €80 et €90.",
      "Chaque formule se distingue clairement par la catégorie de place, l'offre de boissons et le niveau du menu. Nous avons accueilli plus de 50 000 clients à bord.",
      "Un service de navette est proposé pour de nombreux hôtels du centre rive européenne. Les détails du transfert vous sont communiqués par écrit après la confirmation de réservation.",
    ],
    trustSignal: "Croisière opérée par Merry Tourism, agréée TÜRSAB Groupe A depuis 2001.",
    tableRows: [
      ["Durée", "environ 3h30"],
      ["Départ", "Kabataş (20h30)"],
      ["Prix minimum", "€30 (Silver Soft Drinks)"],
      ["Prix maximum", "€90 (Gold Alcool Illimité)"],
      ["Formules", "4 options disponibles"],
      ["Transfert hôtel", "Disponible pour hôtels éligibles"],
    ],
    packageSectionTitle: "Comparatif des formules",
    perPerson: "par personne",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€30",
        items: [
          "Place standard",
          "Boissons sans alcool à volonté",
          "Menu dîner",
          "Spectacle de nuit turque",
        ],
      },
      {
        name: "Silver Alcoholic",
        price: "€45",
        items: [
          "Place standard",
          "Boissons alcoolisées locales",
          "Menu dîner",
          "Spectacle de nuit turque",
        ],
      },
      {
        name: "Gold Soft Drinks",
        price: "€80",
        items: [
          "Place VIP proche de la scène",
          "Boissons sans alcool à volonté",
          "Menu premium",
          "Spectacle turque + DJ",
        ],
      },
      {
        name: "Gold Alcool Illimité",
        price: "€90",
        items: [
          "Place VIP proche de la scène",
          "Alcool à volonté inclus",
          "Menu premium",
          "Spectacle turque + DJ",
        ],
      },
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Combien de temps dure la croisière dîner ?",
        a: "La croisière dure environ 3h30 et part de Kabataş à 20h30.",
      },
      {
        q: "Le transfert depuis l'hôtel est-il inclus ?",
        a: "Une navette est disponible pour la plupart des hôtels centraux de la rive européenne. Les horaires précis vous sont envoyés par écrit après confirmation de réservation.",
      },
      {
        q: "Quelle est la différence entre les formules ?",
        a: "Les formules diffèrent par la catégorie de place (standard ou VIP proche de la scène), l'offre de boissons et le niveau du menu. L'itinéraire et la durée sont identiques pour toutes les formules.",
      },
      {
        q: "Quand faut-il réserver ?",
        a: "En haute saison (mai à septembre), nous recommandons de réserver au moins 3 à 5 jours à l'avance. Les croisières affichent souvent complet.",
      },
    ],
    otherOptionsTitle: "Autres options",
    otherOptions: [
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "Croisière Coucher de Soleil",
        desc: "Croisière de 2 heures à l'heure dorée à partir de €34.",
      },
      {
        href: "/yacht-charter-istanbul",
        title: "Location de Yacht Privé",
        desc: "Expérience yacht 100 % privée à partir de €280.",
      },
      {
        href: "/istanbul-dinner-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
  },
  nl: {
    title: "Istanbul Dinner Cruise — Vanaf €30 | MerrySails",
    description:
      "Bosporus diner cruise Istanbul vanaf €30. Turkse avondshow, 4 pakketten tot €90, hotelophaal mogelijk. Boek direct bij TÜRSAB-gecertificeerd bedrijf.",
    h1: "Istanbul Dinner Cruise",
    breadcrumb: "Dinner Cruise",
    canonicalPath: "/nl/istanbul-dinner-cruise",
    homeLabel: "Home",
    bosphorusLabel: "Bosporus Cruise",
    aboutTitle: "Wat is de Istanbul Dinner Cruise?",
    aboutBody: [
      "De MerrySails Dinner Cruise is een gedeelde boottocht over de Bosporus met diner, een Turkse avondshow en uitzicht op het verlichte Istanbul. De tocht duurt ongeveer 3,5 uur, vertrekt vanaf Kabataş en heeft vier pakketten: €30, €45, €80 en €90.",
      "Elk pakket heeft een duidelijk verschil in stoeltype, drankenaanbod en menu. We hebben inmiddels meer dan 50.000 gasten aan boord verwelkomd.",
      "Voor veel centrale hotels aan de Europese kant is een gratis shuttle beschikbaar. De exacte ophaaltijd ontvangt u schriftelijk na bevestiging van uw boeking.",
    ],
    trustSignal: "Aangeboden door Merry Tourism – TÜRSAB A-categorie gecertificeerd sinds 2001.",
    tableRows: [
      ["Duur", "ca. 3,5 uur"],
      ["Vertrek", "Kabataş (20:30)"],
      ["Vanaf-prijs", "€30 (Silver Soft Drinks)"],
      ["Hoogste prijs", "€90 (Gold Onbeperkt Alcohol)"],
      ["Pakketten", "4 opties"],
      ["Hotelophaal", "Beschikbaar voor geschikte hotels"],
    ],
    packageSectionTitle: "Pakketvergelijking",
    perPerson: "per persoon",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€30",
        items: [
          "Standaard zitplaats",
          "Onbeperkt frisdrank",
          "Dinermenu",
          "Turkse avondshow",
        ],
      },
      {
        name: "Silver Alcoholic",
        price: "€45",
        items: [
          "Standaard zitplaats",
          "Lokale alcoholische dranken",
          "Dinermenu",
          "Turkse avondshow",
        ],
      },
      {
        name: "Gold Soft Drinks",
        price: "€80",
        items: [
          "VIP-stoel dicht bij het podium",
          "Onbeperkt frisdrank",
          "Premium menu",
          "Turkse show + DJ",
        ],
      },
      {
        name: "Gold Onbeperkt Alcohol",
        price: "€90",
        items: [
          "VIP-stoel dicht bij het podium",
          "Onbeperkt alcohol inbegrepen",
          "Premium menu",
          "Turkse show + DJ",
        ],
      },
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe lang duurt de dinner cruise?",
        a: "De cruise duurt ongeveer 3,5 uur en vertrekt om 20:30 vanaf Kabataş.",
      },
      {
        q: "Is hotelophaal inbegrepen?",
        a: "Voor de meeste centrale hotels aan de Europese kant is een shuttle beschikbaar. De exacte ophaaltijd krijgt u schriftelijk na bevestiging van uw boeking.",
      },
      {
        q: "Wat is het verschil tussen de pakketten?",
        a: "De pakketten verschillen in stoeltype (standaard of VIP dicht bij het podium), drankenaanbod en menuniveau. De route en duur zijn voor alle pakketten gelijk.",
      },
      {
        q: "Wanneer moet ik boeken?",
        a: "In het hoogseizoen (mei tot september) raden we aan om minstens 3 tot 5 dagen vooraf te boeken. De cruises zitten regelmatig vol.",
      },
    ],
    otherOptionsTitle: "Andere opties",
    otherOptions: [
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "Bosporus Zonsondergang Cruise",
        desc: "Cruise van 2 uur tijdens het gouden uur vanaf €34.",
      },
      {
        href: "/yacht-charter-istanbul",
        title: "Privé Jachtcharter",
        desc: "Volledig private jachtervaring vanaf €280.",
      },
      {
        href: "/istanbul-dinner-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!dinnerTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/istanbul-dinner-cruise`,
        en: `${SITE_URL}/istanbul-dinner-cruise`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: dinnerTour.image, width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [dinnerTour.image],
    },
  };
}

export default async function LocaleDinnerCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!dinnerTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: t.h1,
    alternateName: ["Istanbul Dinner Cruise", "Bosphorus Dinner Cruise", "İstanbul Akşam Yemeği Turu", "Bosporus Dinner Kreuzfahrt"],
    description: dinnerTour.description,
    touristType: "Cultural Tourism",
    url: canonicalUrl,
    image: dinnerTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: dinnerTour.rating,
      reviewCount: dinnerTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
      highPrice: Math.max(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: dinnerTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.homeLabel, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.bosphorusLabel, item: `${SITE_URL}/${locale}/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: t.breadcrumb, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.homeLabel}</Link>
            <span>/</span>
            <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">{t.bosphorusLabel}</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumb}</span>
          </nav>

          <TourDetailClient tour={dinnerTour} related={relatedTours} />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.aboutTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                {t.aboutBody.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
                <p className="text-[var(--heading)] font-medium">{t.trustSignal}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {t.tableRows.map(([label, value]) => (
                      <tr key={label} className="border-b border-[var(--line)] last:border-b-0">
                        <th className="w-44 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">{label}</th>
                        <td className="p-3 text-[var(--text-muted)]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.packageSectionTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.packages.map((pkg) => (
                <div key={pkg.name} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <div className="mb-3">
                    <p className="font-bold text-[var(--heading)]">{pkg.name}</p>
                    <p className="text-xl font-bold text-[var(--brand-primary)]">{pkg.price}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.perPerson}</p>
                  </div>
                  <ul className="space-y-1">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-0.5 text-[var(--brand-primary)]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faqs.map(({ q, a }) => (
                <details key={q} className="rounded-xl border border-[var(--line)] p-4">
                  <summary className="cursor-pointer font-semibold text-[var(--heading)]">{q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.otherOptionsTitle}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.otherOptions.map((item) => {
                const href = item.href.startsWith("/istanbul-dinner-cruise")
                  ? item.href
                  : `/${locale}${item.href}`;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
