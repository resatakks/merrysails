import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const sunsetTour = getTourBySlug("bosphorus-sunset-cruise");
if (!sunsetTour) throw new Error("Sunset cruise data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-dinner-cruise"),
  getTourBySlug("yacht-charter-in-istanbul"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCruise: string;
  breadcrumbCurrent: string;
  aboutTitle: string;
  aboutBody: string[];
  trustSignal: string;
  tableRows: [string, string][];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  otherOptionsTitle: string;
  otherOptions: { href: string; title: string; desc: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBookLabel: string;
  ctaWhatsappLabel: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    title: "Boğaz Gün Batımı Turu İstanbul — €34'dan başlayan fiyatlar | MerrySails",
    description:
      "İstanbul'da Boğaz gün batımı turu €34'ten başlıyor. 2 saatlik paylaşımlı lüks yat turu, canlı rehber, hafif ikramlar ve şarap seçeneği. Hemen rezervasyon.",
    h1: "Boğaz Gün Batımı Turu",
    canonicalPath: "/tr/cruises/bosphorus-sunset-cruise",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Gün Batımı Turu",
    aboutTitle: "Boğaz Gün Batımı Turu Hakkında",
    aboutBody: [
      "MerrySails Boğaz Gün Batımı Turu, İstanbul'un en ikonik manzaralarını altın saat ışığında izlemek isteyen misafirler için tasarlanmış 2 saatlik paylaşımlı lüks yat deneyimidir. Tur, €34 (şarapsız) ve €40 (şaraplı) olmak üzere iki net seçenek sunar.",
      "Güzergah Boğaz'ın güney kesimini kapsar; Dolmabahçe Sarayı, Ortaköy Camii ve Boğaz Köprüleri yat üzerinden izlenir. Canlı rehber eşliğinde, 12 dilde sesli rehber, çay, Türk kahvesi, limonata, su, atıştırmalık ve meyve tabağı ikramları dahildir. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir.",
    ],
    trustSignal:
      "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism, 50.000'den fazla misafiri ağırlamış deneyimiyle güvenilir hizmet sunmaktadır. Kalkış noktası Kabataş bölgesindedir; tam adres rezervasyon onayından sonra paylaşılır.",
    tableRows: [
      ["Süre", "~2 saat"],
      ["Tekne tipi", "Paylaşımlı lüks yat"],
      ["Şarapsız", "€34 / kişi"],
      ["Şaraplı", "€40 / kişi (2 kadeh)"],
      ["Rehber", "Canlı rehber + 12 dil sesli"],
      ["İkramlar", "Çay, kahve, limonata, atıştırmalık, meyve"],
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Gün batımı turu kaç saat sürer?",
        a: "Tur yaklaşık 2 saat sürer. Güzergah Boğaz'ın güney kesimini kapsar; Dolmabahçe Sarayı, Ortaköy Camii ve köprüleri geçerek geri döner.",
      },
      {
        q: "Şaraplı ve şarapsız seçenek arasındaki fark nedir?",
        a: "İki seçenek de aynı 2 saatlik güzergahı, canlı rehberi ve standart ikramları kapsar. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir; fiyat €34'ten €40'a çıkar.",
      },
      {
        q: "Tur nereden başlıyor?",
        a: "Kalkış Kabataş bölgesinden yapılır. Tam buluşma noktası ve saat, rezervasyon onayından sonra yazılı olarak iletilir.",
      },
      {
        q: "Akşam yemeği turu yerine gün batımı turu ne zaman tercih edilmeli?",
        a: "Türk gecesi eğlencesi ve uzun yemekli program yerine daha kısa, sakin ve hafif bir deneyim isteyenler için gün batımı turu idealdir. Çiftler, fotoğraf meraklıları ve İstanbul'a ilk kez gelenler için önerilir.",
      },
    ],
    otherOptionsTitle: "Diğer Seçenekler",
    otherOptions: [
      {
        href: "/tr/istanbul-dinner-cruise",
        title: "Akşam Yemeği Turu",
        desc: "€30'dan başlayan 3,5 saatlik Türk gecesi yemekli turu.",
      },
      {
        href: "/tr/yacht-charter-istanbul",
        title: "Özel Yat Kiralama",
        desc: "€280'den başlayan tam özel yat deneyimi.",
      },
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
    ctaTitle: "Hemen Yerinizi Ayırın",
    ctaSubtitle: "Boğaz'da altın saat manzarası için online rezervasyon yapın.",
    ctaBookLabel: "Online Rezervasyon →",
    ctaWhatsappLabel: "WhatsApp ile Yaz",
  },
  de: {
    title: "Bosporus Sonnenuntergangs-Kreuzfahrt Istanbul — Ab €34 | MerrySails",
    description:
      "Bosporus Sonnenuntergang Kreuzfahrt Istanbul ab €34. 2 Stunden Luxusjacht, Live-Guide, Erfrischungen. Mit Wein ab €40. TÜRSAB-lizenziert. Direkt buchen.",
    h1: "Bosporus Sonnenuntergang Kreuzfahrt",
    canonicalPath: "/de/cruises/bosphorus-sunset-cruise",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus Kreuzfahrt",
    breadcrumbCurrent: "Sonnenuntergang Kreuzfahrt",
    aboutTitle: "Über die Bosporus Sonnenuntergang Kreuzfahrt",
    aboutBody: [
      "Die MerrySails Bosporus Sonnenuntergang Kreuzfahrt ist ein zweistündiges Erlebnis auf einer geteilten Luxusjacht – ideal für Gäste, die Istanbuls berühmte Skyline im goldenen Licht der Abendstunde erleben möchten. Sie wählen zwischen zwei klaren Paketen: €34 ohne Wein oder €40 inklusive zwei Gläsern Wein pro Person.",
      "Die Route führt durch den südlichen Bosporus, vorbei am Dolmabahçe-Palast, der Ortaköy-Moschee und den beleuchteten Brücken. An Bord erwarten Sie ein Live-Guide, ein Audio-Guide in 12 Sprachen sowie Tee, türkischer Kaffee, Limonade, Wasser, Snacks und ein Obstteller.",
    ],
    trustSignal:
      "Merry Tourism ist seit 2001 TÜRSAB-A-lizenziert und hat über 50.000 Gäste begrüßt – Sie buchen also bei einem geprüften, erfahrenen Anbieter. Abfahrt ist im Bereich Kabataş; die genaue Adresse erhalten Sie nach der Buchungsbestätigung.",
    tableRows: [
      ["Dauer", "ca. 2 Stunden"],
      ["Bootstyp", "Geteilte Luxusjacht"],
      ["Ohne Wein", "€34 / Person"],
      ["Mit Wein", "€40 / Person (2 Gläser)"],
      ["Reiseleitung", "Live-Guide + 12-Sprachen-Audio"],
      ["Erfrischungen", "Tee, Kaffee, Limonade, Snacks, Obst"],
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie lange dauert die Sonnenuntergang Kreuzfahrt?",
        a: "Die Tour dauert etwa 2 Stunden. Die Route umfasst den südlichen Bosporus, vorbei am Dolmabahçe-Palast, der Ortaköy-Moschee und unter den Brücken hindurch.",
      },
      {
        q: "Was ist der Unterschied zwischen Option mit und ohne Wein?",
        a: "Beide Optionen beinhalten dieselbe 2-stündige Route, denselben Live-Guide und dieselben Standard-Erfrischungen. Die Option mit Wein enthält zusätzlich 2 Gläser Wein pro Person; der Preis steigt von €34 auf €40.",
      },
      {
        q: "Wo startet die Tour?",
        a: "Die Abfahrt erfolgt im Bereich Kabataş auf der europäischen Seite. Den genauen Treffpunkt und die Uhrzeit erhalten Sie schriftlich nach der Buchungsbestätigung.",
      },
      {
        q: "Sonnenuntergang oder Dinner-Kreuzfahrt – was passt besser?",
        a: "Wenn Sie ein kürzeres, ruhigeres Erlebnis ohne Show- und Dinner-Programm bevorzugen, ist die Sonnenuntergangstour ideal. Besonders empfohlen für Paare, Fotofans und Istanbul-Erstbesucher.",
      },
    ],
    otherOptionsTitle: "Weitere Optionen",
    otherOptions: [
      {
        href: "/de/istanbul-dinner-cruise",
        title: "Dinner-Kreuzfahrt",
        desc: "3,5-stündige Türkische-Nacht-Dinner-Tour ab €30.",
      },
      {
        href: "/de/yacht-charter-istanbul",
        title: "Private Yachtcharter",
        desc: "Komplett private Yacht-Erlebnisse ab €280.",
      },
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
    ctaTitle: "Jetzt buchen",
    ctaSubtitle: "Sichern Sie sich Ihren Platz für die Bosporus Sonnenuntergang-Kreuzfahrt.",
    ctaBookLabel: "Online buchen →",
    ctaWhatsappLabel: "Per WhatsApp anfragen",
  },
  fr: {
    title: "Croisière Coucher de Soleil Bosphore Istanbul — À partir de €34 | MerrySails",
    description:
      "Croisière coucher de soleil sur le Bosphore à Istanbul à partir de €34. 2 heures en yacht de luxe, guide live, rafraîchissements. Avec vin dès €40. Réservez.",
    h1: "Croisière Coucher de Soleil Bosphore",
    canonicalPath: "/fr/cruises/bosphorus-sunset-cruise",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Croisière Coucher de Soleil",
    aboutTitle: "À propos de la Croisière Coucher de Soleil",
    aboutBody: [
      "La Croisière Coucher de Soleil sur le Bosphore de MerrySails est une expérience de 2 heures à bord d'un yacht de luxe partagé, conçue pour admirer les panoramas iconiques d'Istanbul à l'heure dorée. Deux formules claires sont proposées : €34 sans vin ou €40 avec vin (2 verres par personne).",
      "L'itinéraire couvre la partie sud du Bosphore et passe devant le palais de Dolmabahçe, la mosquée d'Ortaköy et les ponts illuminés. À bord, vous bénéficiez d'un guide en direct, d'un audio-guide en 12 langues, ainsi que de thé, café turc, citronnade, eau, encas salés et plateau de fruits.",
    ],
    trustSignal:
      "Merry Tourism est licencié TÜRSAB Groupe A depuis 2001 et a accueilli plus de 50 000 voyageurs – vous réservez auprès d'un prestataire reconnu et expérimenté. Le départ se fait dans le quartier de Kabataş ; l'adresse exacte est communiquée après la confirmation de réservation.",
    tableRows: [
      ["Durée", "~2 heures"],
      ["Type de bateau", "Yacht de luxe partagé"],
      ["Sans vin", "€34 / personne"],
      ["Avec vin", "€40 / personne (2 verres)"],
      ["Guide", "Guide live + audio 12 langues"],
      ["Rafraîchissements", "Thé, café, citronnade, encas, fruits"],
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Combien de temps dure la croisière au coucher du soleil ?",
        a: "La croisière dure environ 2 heures. L'itinéraire couvre la partie sud du Bosphore : palais de Dolmabahçe, mosquée d'Ortaköy et passage sous les ponts.",
      },
      {
        q: "Quelle est la différence entre l'option avec et sans vin ?",
        a: "Les deux formules incluent le même itinéraire de 2 heures, le même guide live et les mêmes rafraîchissements standards. L'option avec vin ajoute 2 verres de vin par personne ; le tarif passe de €34 à €40.",
      },
      {
        q: "D'où part la croisière ?",
        a: "Le départ a lieu dans le quartier de Kabataş, sur la rive européenne. Le point de rendez-vous précis et l'horaire vous sont envoyés par écrit après confirmation de la réservation.",
      },
      {
        q: "Coucher de soleil ou croisière dîner – laquelle choisir ?",
        a: "Si vous préférez une expérience plus courte et plus calme, sans programme de spectacle et de dîner, la croisière au coucher du soleil est idéale. Particulièrement recommandée aux couples, aux passionnés de photo et aux primo-visiteurs d'Istanbul.",
      },
    ],
    otherOptionsTitle: "Autres options",
    otherOptions: [
      {
        href: "/fr/istanbul-dinner-cruise",
        title: "Croisière Dîner",
        desc: "Soirée turque de 3h30 avec dîner à partir de €30.",
      },
      {
        href: "/fr/yacht-charter-istanbul",
        title: "Yacht Privé",
        desc: "Expérience entièrement privée à partir de €280.",
      },
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
    ctaTitle: "Réservez maintenant",
    ctaSubtitle: "Réservez votre place pour la croisière coucher de soleil sur le Bosphore.",
    ctaBookLabel: "Réserver en ligne →",
    ctaWhatsappLabel: "Contacter par WhatsApp",
  },
  nl: {
    title: "Bosporus Zonsondergang Cruise Istanbul — Vanaf €34 | MerrySails",
    description:
      "Bosporus zonsondergang cruise Istanbul vanaf €34. 2 uur op luxe jacht, live gids, versnaperingen. Met wijn vanaf €40. Direct boeken bij TÜRSAB-gecertificeerd bedrijf.",
    h1: "Bosporus Zonsondergang Cruise",
    canonicalPath: "/nl/cruises/bosphorus-sunset-cruise",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Zonsondergang Cruise",
    aboutTitle: "Over de Bosporus Zonsondergang Cruise",
    aboutBody: [
      "De MerrySails Bosporus Zonsondergang Cruise is een 2 uur durende ervaring op een gedeeld luxe jacht, perfect voor wie Istanbul tijdens het gouden uur wil zien. U kiest tussen twee duidelijke opties: €34 zonder wijn of €40 met wijn (2 glazen per persoon).",
      "De route volgt het zuidelijke deel van de Bosporus en vaart langs het Dolmabahçe-paleis, de Ortaköy-moskee en de verlichte bruggen. Aan boord zijn een live gids, een audiogids in 12 talen en versnaperingen inbegrepen: thee, Turkse koffie, limonade, water, hapjes en een fruitschaal.",
    ],
    trustSignal:
      "Merry Tourism is sinds 2001 TÜRSAB A-gelicenseerd en heeft meer dan 50.000 gasten verwelkomd – u boekt dus bij een bewezen en ervaren aanbieder. Vertrek is bij Kabataş; het exacte adres ontvangt u na bevestiging van de boeking.",
    tableRows: [
      ["Duur", "~2 uur"],
      ["Type boot", "Gedeeld luxe jacht"],
      ["Zonder wijn", "€34 / persoon"],
      ["Met wijn", "€40 / persoon (2 glazen)"],
      ["Gids", "Live gids + audio in 12 talen"],
      ["Versnaperingen", "Thee, koffie, limonade, hapjes, fruit"],
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe lang duurt de zonsondergang cruise?",
        a: "De cruise duurt ongeveer 2 uur. De route omvat het zuidelijke deel van de Bosporus: Dolmabahçe-paleis, Ortaköy-moskee en onder de bruggen door.",
      },
      {
        q: "Wat is het verschil tussen de optie met en zonder wijn?",
        a: "Beide opties hebben dezelfde route van 2 uur, dezelfde live gids en dezelfde standaardversnaperingen. De optie met wijn voegt 2 glazen wijn per persoon toe; de prijs gaat van €34 naar €40.",
      },
      {
        q: "Waar vertrekt de cruise?",
        a: "Vertrek is in de wijk Kabataş aan de Europese kant. Het exacte verzamelpunt en tijdstip krijgt u schriftelijk na bevestiging van de boeking.",
      },
      {
        q: "Zonsondergang of dinercruise – wat past beter?",
        a: "Wilt u een kortere, rustigere ervaring zonder lang dinerprogramma en show, dan is de zonsondergang cruise ideaal. Vooral aanbevolen voor stellen, fotografieliefhebbers en eerste bezoekers van Istanbul.",
      },
    ],
    otherOptionsTitle: "Andere opties",
    otherOptions: [
      {
        href: "/nl/istanbul-dinner-cruise",
        title: "Dinercruise",
        desc: "3,5 uur Turkse avond met diner vanaf €30.",
      },
      {
        href: "/nl/yacht-charter-istanbul",
        title: "Privé Jachtcharter",
        desc: "Volledig privé jachtervaring vanaf €280.",
      },
      {
        href: "/cruises/bosphorus-sunset-cruise",
        title: "English Page",
        desc: "View this tour in English.",
      },
    ],
    ctaTitle: "Reserveer nu",
    ctaSubtitle: "Boek uw plek voor de Bosporus zonsondergang cruise.",
    ctaBookLabel: "Online reserveren →",
    ctaWhatsappLabel: "WhatsApp sturen",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!sunsetTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
        en: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
        tr: `${SITE_URL}/tr/cruises/bosphorus-sunset-cruise`,
        de: `${SITE_URL}/de/cruises/bosphorus-sunset-cruise`,
        fr: `${SITE_URL}/fr/cruises/bosphorus-sunset-cruise`,
        nl: `${SITE_URL}/nl/cruises/bosphorus-sunset-cruise`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: sunsetTour.image, width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [sunsetTour.image],
    },
  };
}

export default async function LocaleSunsetCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!sunsetTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: t.h1,
    alternateName: ["Bosphorus Sunset Cruise", "Boğaz Gün Batımı Turu", "Bosporus Sonnenuntergang Kreuzfahrt", "Croisière Coucher de Soleil Bosphore"],
    description: sunsetTour.description,
    touristType: "Cultural Tourism",
    url: canonicalUrl,
    image: sunsetTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: sunsetTour.rating,
      reviewCount: sunsetTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
      highPrice: Math.max(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: sunsetTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.breadcrumbCruise, item: `${SITE_URL}/${locale}/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbCruise}</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <TourDetailClient tour={sunsetTour} related={relatedTours} />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.aboutTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                {t.aboutBody.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
                <p>
                  <strong>{t.trustSignal}</strong>
                </p>
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
              {t.otherOptions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-[var(--brand-primary)]">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{t.ctaTitle}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/reservation`}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-primary)] shadow hover:bg-white/90 transition-colors"
            >
              {t.ctaBookLabel}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {t.ctaWhatsappLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
