import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

const yachtTour = getTourBySlug("yacht-charter-in-istanbul");
if (!yachtTour) throw new Error("Yacht charter data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("bosphorus-dinner-cruise"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
  title: string;
  subtitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  whyChooseHeading: string;
  reasons: { title: string; desc: string }[];
  howItWorks: { heading: string; steps: string[] };
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  tableHeading: string;
  tableRows: { label: string; value: string }[];
  ctaWhatsapp: string;
  ctaPhone: string;
  breadcrumbHome: string;
  breadcrumbCruise: string;
  breadcrumbCurrent: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Yat Kiralama — €380'dan başlayan fiyatlar | MerrySails",
    metaDescription:
      "İstanbul'da özel yat kiralama €280'den başlıyor. Tüm tekne size özel, Boğaz güzergahı, kaptanlı ve yemek seçeneğiyle. Evlilik teklifi, doğum günü ve kurumsal etkinlikler.",
    canonicalPath: "/tr/yacht-charter-istanbul",
    title: "İstanbul Özel Yat Kiralama",
    subtitle: "Boğaz'da tamamen size özel 2 saatlik yat deneyimi",
    description:
      "MerrySails özel yat kiralama, Boğaz'ın eşsiz manzarası eşliğinde tüm tekneyi grubunuza tahsis eder. Güzergah, kalkış saati ve içerik tamamen sizin tercihinize göre özelleştirilir; evlilik teklifi, doğum günü, yıl dönümü veya kurumsal etkinlikler için ideal bir seçimdir.",
    whyChooseHeading: "İstanbul Özel Yat Kiralama Neden Tercih Edilir?",
    reasons: [
      {
        title: "Tüm tekne size özel",
        desc: "Paylaşımlı turların aksine yat tamamen sizin grubunuza ayrılır. Güzergahı, kalkış saatini ve müziği siz belirlersiniz.",
      },
      {
        title: "Özel anlar için ideal",
        desc: "Evlilik teklifi, doğum günü, yıl dönümü ve kurumsal etkinlikler için en uygun seçenek. Çiçek, pasta, fotoğrafçı ve özel dekor talep edilebilir.",
      },
      {
        title: "Net paket yapısı",
        desc: "Essential €280, Premium €380 ve VIP €680 olmak üzere üç şeffaf paket. Tüm fiyatlar 2 saatlik özel tur içindir, isteğe bağlı uzatma yapılabilir.",
      },
    ],
    howItWorks: {
      heading: "Rezervasyon Nasıl Yapılır?",
      steps: [
        "WhatsApp veya telefon üzerinden tarih, saat ve katılımcı sayısını paylaşarak müsaitlik kontrolü yaptırın.",
        "Ekibimiz size en uygun paketi (Essential, Premium veya VIP) sunar; özel istekleriniz (pasta, çiçek, fotoğrafçı) eklenir.",
        "Onayın ardından depozito ile rezervasyonunuz garantilenir; tur günü Kabataş veya talep ettiğiniz iskeleden hareket edersiniz.",
      ],
    },
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        question: "Yat kiralama ne kadar sürer?",
        answer:
          "Standart paketlerimiz 2 saatlik özel tur olarak planlanır. Talebe göre 3, 4 saat veya tam günlük uzatma seçenekleri mevcuttur.",
      },
      {
        question: "Yatta kaç kişi konaklayabilir?",
        answer:
          "Pakete bağlı olarak 8 ile 30 kişi arasında konaklama mümkündür. Daha büyük gruplar için lütfen WhatsApp üzerinden ulaşın; uygun teknemizi öneririz.",
      },
      {
        question: "Evlilik teklifi düzenlemesi yapılır mı?",
        answer:
          "Evet. Çiçek süsleme, pasta, romantik müzik listesi ve profesyonel fotoğrafçı paketlerimize eklenebilir. Sürpriz organizasyonu için en az 48 saat öncesinden bilgi vermenizi rica ederiz.",
      },
      {
        question: "Yiyecek ve içecek dahil mi?",
        answer:
          "Premium ve VIP paketlerde aperatif tabağı, meyve ve içecekler dahildir. Essential pakette içecekler isteğe bağlı eklenebilir; tam menü dinner yacht turlarımızda sunulur.",
      },
    ],
    tableHeading: "Hızlı Bilgi",
    tableRows: [
      { label: "Süre", value: "2 saat (uzatılabilir)" },
      { label: "Kalkış", value: "Kabataş / Beşiktaş / Bebek" },
      { label: "Başlangıç fiyatı", value: "€280 (Essential)" },
      { label: "En yüksek paket", value: "€680 (VIP)" },
      { label: "Lisans", value: "TÜRSAB A Grubu (2001'den beri)" },
    ],
    ctaWhatsapp: "WhatsApp ile Bilgi Al",
    ctaPhone: "Telefonla Ara",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Yat Kiralama",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle: "Yachtcharter Istanbul ab €280 — Private Bosporus-Jacht | MerrySails",
    metaDescription:
      "Yachtcharter Istanbul ab €280. Exklusive Privatjacht auf dem Bosporus mit Kapitän. Ideal für Heiratsantrag, Geburtstag und Firmenevents. TÜRSAB-lizenziert.",
    canonicalPath: "/de/yacht-charter-istanbul",
    title: "Privater Yachtcharter Istanbul",
    subtitle: "Zwei Stunden exklusive Bosporus-Rundfahrt mit Ihrer eigenen Jacht",
    description:
      "Beim privaten Yachtcharter von MerrySails steht die gesamte Jacht ausschließlich Ihrer Gruppe zur Verfügung. Route, Abfahrtszeit und Bordprogramm gestalten Sie ganz nach Wunsch – die ideale Lösung für Heiratsanträge, Geburtstage, Hochzeitstage oder Firmenevents auf dem Bosporus.",
    whyChooseHeading: "Warum einen privaten Yachtcharter in Istanbul wählen?",
    reasons: [
      {
        title: "Die ganze Jacht für Sie allein",
        desc: "Anders als bei geteilten Touren steht Ihnen die komplette Jacht exklusiv zur Verfügung. Route, Startzeit und Musik bestimmen Sie selbst.",
      },
      {
        title: "Perfekt für besondere Anlässe",
        desc: "Ideal für Heiratsanträge, Geburtstage, Jubiläen und Firmenevents. Blumen, Torte, Fotograf und individuelle Dekoration sind auf Wunsch buchbar.",
      },
      {
        title: "Klare Paketstruktur",
        desc: "Drei transparente Pakete: Essential €280, Premium €380 und VIP €680 – jeweils für eine 2-stündige Privatfahrt, mit Verlängerungsoption.",
      },
    ],
    howItWorks: {
      heading: "So buchen Sie",
      steps: [
        "Senden Sie uns Datum, Uhrzeit und Teilnehmerzahl per WhatsApp oder Telefon, damit wir die Verfügbarkeit prüfen.",
        "Unser Team empfiehlt das passende Paket (Essential, Premium oder VIP) und ergänzt Sonderwünsche wie Blumen, Torte oder Fotograf.",
        "Nach Bestätigung sichern wir Ihre Buchung mit einer Anzahlung. Am Tourtag legen Sie ab Kabataş oder einem von Ihnen gewünschten Anleger ab.",
      ],
    },
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        question: "Wie lange dauert ein Yachtcharter?",
        answer:
          "Unsere Standardpakete umfassen eine 2-stündige private Bosporus-Rundfahrt. Auf Anfrage sind Verlängerungen auf 3, 4 oder 8 Stunden möglich.",
      },
      {
        question: "Wie viele Personen passen an Bord?",
        answer:
          "Je nach Paket finden 8 bis 30 Personen Platz. Für größere Gruppen kontaktieren Sie uns bitte per WhatsApp – wir empfehlen Ihnen die passende Jacht.",
      },
      {
        question: "Organisieren Sie Heiratsanträge?",
        answer:
          "Ja. Blumendekoration, Torte, romantische Musikliste und ein professioneller Fotograf können hinzugebucht werden. Bitte informieren Sie uns mindestens 48 Stunden im Voraus.",
      },
      {
        question: "Sind Speisen und Getränke inklusive?",
        answer:
          "In den Premium- und VIP-Paketen sind Aperitifteller, Obst und Getränke enthalten. Beim Essential-Paket sind Getränke optional buchbar; volle Menüs bieten wir auf unseren Dinner-Jacht-Touren an.",
      },
    ],
    tableHeading: "Auf einen Blick",
    tableRows: [
      { label: "Dauer", value: "2 Stunden (verlängerbar)" },
      { label: "Abfahrt", value: "Kabataş / Beşiktaş / Bebek" },
      { label: "Ab-Preis", value: "€280 (Essential)" },
      { label: "Top-Paket", value: "€680 (VIP)" },
      { label: "Lizenz", value: "TÜRSAB A-Gruppe (seit 2001)" },
    ],
    ctaWhatsapp: "Per WhatsApp anfragen",
    ctaPhone: "Jetzt anrufen",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus-Tour",
    breadcrumbCurrent: "Yachtcharter",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle: "Location Yacht Istanbul — À partir de €380 | MerrySails",
    metaDescription:
      "Location yacht Istanbul à partir de €280. Yacht privé exclusif sur le Bosphore avec capitaine. Demande en mariage, anniversaire, événements d'entreprise. Certifié TÜRSAB.",
    canonicalPath: "/fr/yacht-charter-istanbul",
    title: "Location de Yacht Privé à Istanbul",
    subtitle: "Croisière privée de 2 heures sur le Bosphore, rien que pour vous",
    description:
      "La location de yacht privé MerrySails met l'intégralité du bateau à la disposition exclusive de votre groupe. Vous personnalisez l'itinéraire, l'horaire de départ et le déroulement à bord — la formule idéale pour une demande en fiançailles, un anniversaire, un anniversaire de mariage ou un événement d'entreprise sur le Bosphore.",
    whyChooseHeading: "Pourquoi choisir un yacht privé à Istanbul ?",
    reasons: [
      {
        title: "Le yacht entièrement pour vous",
        desc: "Contrairement aux croisières partagées, le bateau est exclusivement réservé à votre groupe. Vous décidez de l'itinéraire, de l'heure et de la musique.",
      },
      {
        title: "Parfait pour les grandes occasions",
        desc: "Idéal pour une demande en fiançailles, un anniversaire, un mariage ou un événement d'entreprise. Fleurs, gâteau, photographe et décoration sur mesure disponibles.",
      },
      {
        title: "Trois formules claires",
        desc: "Essential €280, Premium €380 et VIP €680 : trois formules transparentes pour une croisière privée de 2 heures, avec possibilité de prolongation.",
      },
    ],
    howItWorks: {
      heading: "Comment réserver",
      steps: [
        "Envoyez-nous date, horaire et nombre de participants par WhatsApp ou par téléphone afin que nous vérifiions la disponibilité.",
        "Notre équipe vous propose la formule la plus adaptée (Essential, Premium ou VIP) et ajoute vos demandes spéciales (fleurs, gâteau, photographe).",
        "Après confirmation, votre réservation est garantie par un acompte. Le jour J, vous embarquez à Kabataş ou à l'embarcadère de votre choix.",
      ],
    },
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        question: "Combien de temps dure une location de yacht ?",
        answer:
          "Nos formules standard couvrent une croisière privée de 2 heures. Sur demande, vous pouvez prolonger à 3, 4 heures ou à la journée complète.",
      },
      {
        question: "Combien de personnes peuvent monter à bord ?",
        answer:
          "Selon la formule, le yacht accueille de 8 à 30 personnes. Pour des groupes plus importants, contactez-nous via WhatsApp : nous vous proposerons un bateau adapté.",
      },
      {
        question: "Organisez-vous les demandes en fiançailles ?",
        answer:
          "Oui. Décoration florale, gâteau, playlist romantique et photographe professionnel peuvent être ajoutés. Merci de nous prévenir au moins 48 heures à l'avance pour une organisation surprise.",
      },
      {
        question: "Le repas et les boissons sont-ils inclus ?",
        answer:
          "Les formules Premium et VIP incluent un plateau d'apéritif, des fruits et des boissons. Sur l'Essential, les boissons sont en option ; un menu complet est servi sur nos croisières dîner-yacht.",
      },
    ],
    tableHeading: "En un coup d'œil",
    tableRows: [
      { label: "Durée", value: "2 heures (prolongeable)" },
      { label: "Départ", value: "Kabataş / Beşiktaş / Bebek" },
      { label: "Prix de départ", value: "€280 (Essential)" },
      { label: "Formule la plus haute", value: "€680 (VIP)" },
      { label: "Licence", value: "TÜRSAB Groupe A (depuis 2001)" },
    ],
    ctaWhatsapp: "Contacter via WhatsApp",
    ctaPhone: "Appeler maintenant",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Location de Yacht",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle: "Jachthuur Istanbul — Vanaf €380 | MerrySails",
    metaDescription:
      "Jachthuur Istanbul vanaf €280. Exclusief privéjacht op de Bosporus met kapitein. Huwelijksaanzoek, verjaardag en bedrijfsevenementen. TÜRSAB-gecertificeerd.",
    canonicalPath: "/nl/yacht-charter-istanbul",
    title: "Privé Jachtcharter Istanbul",
    subtitle: "Twee uur exclusief op de Bosporus met uw eigen privéjacht",
    description:
      "Bij de privé jachtcharter van MerrySails is het hele jacht exclusief voor uw gezelschap. U bepaalt zelf de route, het vertrektijdstip en de invulling aan boord — de perfecte keuze voor een huwelijksaanzoek, verjaardag, trouwdag of bedrijfsevenement op de Bosporus.",
    whyChooseHeading: "Waarom kiezen voor een privé jachtcharter in Istanbul?",
    reasons: [
      {
        title: "Het hele jacht voor u alleen",
        desc: "Anders dan bij gedeelde tochten is het jacht volledig voorbehouden aan uw gezelschap. U bepaalt route, vertrektijd en muziek.",
      },
      {
        title: "Perfect voor bijzondere momenten",
        desc: "Ideaal voor een huwelijksaanzoek, verjaardag, jubileum of bedrijfsevenement. Bloemen, taart, fotograaf en decoratie zijn op verzoek mogelijk.",
      },
      {
        title: "Heldere pakketstructuur",
        desc: "Drie transparante pakketten: Essential €280, Premium €380 en VIP €680 — telkens voor een privétocht van 2 uur, verlenging mogelijk.",
      },
    ],
    howItWorks: {
      heading: "Zo boekt u",
      steps: [
        "Stuur ons datum, tijdstip en groepsgrootte via WhatsApp of telefoon zodat wij de beschikbaarheid kunnen controleren.",
        "Ons team adviseert het passende pakket (Essential, Premium of VIP) en voegt uw speciale wensen toe — bloemen, taart of fotograaf.",
        "Na bevestiging wordt uw boeking gegarandeerd met een aanbetaling. Op de dag zelf vertrekt u vanaf Kabataş of een door u gekozen aanlegsteiger.",
      ],
    },
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        question: "Hoe lang duurt een jachtcharter?",
        answer:
          "Onze standaardpakketten zijn een privétocht van 2 uur. Op verzoek kunt u verlengen naar 3, 4 uur of een hele dag.",
      },
      {
        question: "Hoeveel personen kunnen aan boord?",
        answer:
          "Afhankelijk van het pakket nemen wij 8 tot 30 personen mee. Voor grotere groepen kunt u via WhatsApp contact opnemen; wij dragen dan een passend jacht aan.",
      },
      {
        question: "Organiseert u huwelijksaanzoeken?",
        answer:
          "Ja. Bloemversiering, taart, een romantische muzieklijst en een professionele fotograaf kunnen worden toegevoegd. Voor een verrassing vragen wij minimaal 48 uur vooraf bericht.",
      },
      {
        question: "Zijn eten en drinken inbegrepen?",
        answer:
          "In de Premium- en VIP-pakketten zijn een aperitiefschotel, fruit en drankjes inbegrepen. Bij Essential zijn drankjes optioneel; volledige menu's bieden wij op onze diner-jachttochten.",
      },
    ],
    tableHeading: "In één oogopslag",
    tableRows: [
      { label: "Duur", value: "2 uur (te verlengen)" },
      { label: "Vertrek", value: "Kabataş / Beşiktaş / Bebek" },
      { label: "Vanaf-prijs", value: "€280 (Essential)" },
      { label: "Topcategorie", value: "€680 (VIP)" },
      { label: "Licentie", value: "TÜRSAB A-categorie (sinds 2001)" },
    ],
    ctaWhatsapp: "Contact via WhatsApp",
    ctaPhone: "Bel nu",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Jachtcharter",
    viewInEnglish: "View in English →",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!yachtTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/yacht-charter-istanbul");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: yachtTour.image, width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [yachtTour.image],
    },
  };
}

export default async function LocaleYachtCharterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!yachtTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: t.title,
    alternateName: [
      "İstanbul Yat Kiralama",
      "Özel Yat Turu İstanbul",
      "Boğaz Özel Yat",
      "Istanbul Yacht Charter",
    ],
    description: t.description,
    url: canonicalUrl,
    image: yachtTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: yachtTour.rating,
      reviewCount: yachtTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(yachtTour.packages?.map((p) => p.price) ?? [yachtTour.priceEur])),
      highPrice: Math.max(...(yachtTour.packages?.map((p) => p.price) ?? [yachtTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: yachtTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumbCruise,
        item: `${SITE_URL}/${locale}/bosphorus-cruise`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t.breadcrumbCurrent,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/bosphorus-cruise`}
              className="hover:text-[var(--brand-primary)]"
            >
              {t.breadcrumbCruise}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-[var(--text-muted)]">{t.subtitle}</p>
          </header>

          <TourDetailClient tour={yachtTour} related={relatedTours} />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>{t.description}</p>
                <p className="text-[var(--heading)] font-medium">
                  {locale === "tr"
                    ? "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism tarafından sunulmaktadır. 50.000'den fazla misafir ağırlandı."
                    : locale === "de"
                    ? "Veranstalter Merry Tourism – seit 2001 TÜRSAB-A-Gruppe lizenziert. Über 50.000 Gäste begrüßt."
                    : locale === "fr"
                    ? "Croisière opérée par Merry Tourism, agréée TÜRSAB Groupe A depuis 2001. Plus de 50 000 clients accueillis."
                    : "Aangeboden door Merry Tourism — TÜRSAB A-categorie gecertificeerd sinds 2001. Meer dan 50.000 gasten verwelkomd."}
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <div className="bg-[var(--surface-alt)] px-4 py-3 border-b border-[var(--line)]">
                  <h2 className="text-sm font-bold text-[var(--heading)]">
                    {t.tableHeading}
                  </h2>
                </div>
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {t.tableRows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-[var(--line)] last:border-b-0"
                      >
                        <th className="w-44 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">
                          {row.label}
                        </th>
                        <td className="p-3 text-[var(--text-muted)]">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.whyChooseHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.reasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.ctaWhatsapp}
              </a>
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="btn-secondary"
              >
                {t.ctaPhone} — {PHONE_DISPLAY}
              </a>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.howItWorks.heading}
            </h2>
            <ol className="space-y-3">
              {t.howItWorks.steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.faqHeading}</h2>
            <div className="space-y-4">
              {t.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-[var(--line)] p-4"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--heading)]">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link
              href="/yacht-charter-istanbul"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {t.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
