import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCruise: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whyHeading: string;
  reasons: { title: string; desc: string }[];
  addOnsHeading: string;
  addOns: string[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  tableHeading: string;
  tableRows: { label: string; value: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaWhatsapp: string;
  ctaCall: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "Evlilik Teklifi Yat Kiralama İstanbul | Boğaz'da Sürpriz Teklif | MerrySails",
    metaDescription:
      "İstanbul'da evlilik teklifi için özel yat kiralama. Gün batımında Boğaz'da çiftinize özel rota, çiçek, fotoğrafçı, kemancı ve dekorasyon. Hemen WhatsApp.",
    canonicalPath: "/tr/proposal-yacht-rental-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Evlilik Teklifi Yat Kiralama",
    eyebrow: "Evlilik teklifi yat kiralama",
    heroTitle: "İstanbul'da Evlilik Teklifi Yat Kiralama",
    heroSubtitle: "Sürpriz teklifin ortamı, baştan sona size özel.",
    heroDescription:
      "İstanbul Boğazı'nda tamamen size özel bir yatta, evlilik teklifi anına göre kurgulanmış bir deneyim sunuyoruz. Mahremiyet, gün batımı zamanlaması ve tüm sahne — yalnızca o ana göre planlanır.",
    whyHeading: "Neden bu kiralama evlilik teklifi için doğru seçim",
    reasons: [
      {
        title: "Yalnızca size özel yat",
        desc: "Yatta başka misafir yoktur — teklif anına kadar tüm güverte ve kabin çift için ayrılır, böylece sürpriz tamamen korunur.",
      },
      {
        title: "Gün batımı veya köprü ışıkları rotası",
        desc: "Ortaköy ve 1. Boğaz Köprüsü çevresinde yumuşak gün batımı ışığı, ya da akşam köprü ışıkları altında sessiz bir koy seçilebilir.",
      },
      {
        title: "Sahnesi hazırlanmış teklif anı",
        desc: "Çiçek, dekorasyon, fotoğrafçı, kemancı ve pastaya kadar her detay teklif anına göre kurulur — siz yalnızca \"evet\" cevabını dinlersiniz.",
      },
    ],
    addOnsHeading: "Eklenebilecek hizmetler",
    addOns: [
      "Çiçek ve buket",
      "Teklif dekorasyonu (mum, gül yaprağı, ışıklandırma)",
      "Profesyonel fotoğrafçı",
      "Videograf",
      "Canlı kemancı",
      "Özel pasta",
      "Akşam yemeği menüsü",
      "Şampanya servisi",
    ],
    faqHeading: "Sıkça sorulan sorular",
    faqs: [
      {
        question: "Bu kiralama standart yat kiralamadan farkı nedir?",
        answer:
          "Rezervasyon önce teklif anına göre kurgulanır; mahremiyet, rota zamanlaması ve sahne genel bir gezi yerine evlilik teklifi anına göre şekillendirilir.",
      },
      {
        question: "Fiyat ne kadar?",
        answer:
          "Teklif yatı fiyatı; yat tipine, zamanlamaya, mahremiyet düzeyine ve teklif anı için seçilen dekorasyon, fotoğrafçı, kemancı gibi eklere göre değişir.",
      },
      {
        question: "Çiçek, fotoğrafçı veya kemancı ayarlanabilir mi?",
        answer:
          "Evet. Teklif dekorasyonu, buket, fotoğrafçı, videograf, kemancı, pasta ve akşam yemeği sunumu ayarlanabilir.",
      },
      {
        question: "Evlilik teklifi için hangi rota uygun?",
        answer:
          "Gün batımı teklifleri genellikle Ortaköy ve 1. Boğaz Köprüsü çevresinde, akşam teklifleri ise daha sessiz koylarda ve köprü ışıkları altında iyi sonuç verir.",
      },
      {
        question: "Ne zaman önceden rezervasyon yapmalıyım?",
        answer:
          "Yaz sezonunda ve haftasonlarında en az 1–2 hafta önceden rezervasyon önerilir; özel dekorasyon ve fotoğrafçı için ek hazırlık süresi gerekir.",
      },
    ],
    tableHeading: "Hızlı bilgiler",
    tableRows: [
      { label: "Mahremiyet düzeyi", value: "Tamamen özel — yatta başka misafir yok" },
      { label: "Rota", value: "Gün batımında Ortaköy & 1. Boğaz Köprüsü veya akşam köprü ışıkları" },
      { label: "Tipik süre", value: "1.5–3 saat (kısa teklif veya yemek dahil)" },
      { label: "Eklenebilir paketler", value: "Çiçek, fotoğrafçı, kemancı, pasta, dekorasyon, akşam yemeği" },
    ],
    ctaHeading: "Evlilik teklifini birlikte planlayalım",
    ctaBody:
      "Tarihinizi, ideal saatinizi ve istediğiniz dekorasyon düzeyini gönderin; teklif planınıza uygun yat seçeneklerini iletelim.",
    ctaWhatsapp: "WhatsApp ile yaz",
    ctaCall: "Hemen ara",
    viewInEnglish: "View in English",
  },
  de: {
    metaTitle: "Heiratsantrag auf der Jacht Istanbul | Privater Bosporus-Antrag | MerrySails",
    metaDescription:
      "Privater Heiratsantrag auf einer Jacht in Istanbul. Antrag auf dem Bosporus bei Sonnenuntergang mit Blumen, Fotograf, Geiger und Dekoration. Romantische Überraschung.",
    canonicalPath: "/de/proposal-yacht-rental-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus-Tour",
    breadcrumbCurrent: "Heiratsantrag auf der Jacht",
    eyebrow: "Heiratsantrag auf der Jacht",
    heroTitle: "Heiratsantrag auf der Jacht in Istanbul",
    heroSubtitle: "Eine romantische Überraschung — vom ersten Detail bis zum Antragsmoment.",
    heroDescription:
      "Eine private Jacht auf dem Bosporus, ausschließlich für das Paar, mit einer Inszenierung rund um den Antragsmoment. Privatsphäre, Sonnenuntergangs-Timing und Bühne werden gezielt für den Antrag geplant.",
    whyHeading: "Warum diese Buchung für einen Heiratsantrag passt",
    reasons: [
      {
        title: "Ausschließlich für das Paar",
        desc: "Keine weiteren Gäste an Bord — die gesamte Jacht bleibt bis zum Antragsmoment privat, damit die Überraschung gewahrt bleibt.",
      },
      {
        title: "Sonnenuntergang oder Brückenlichter",
        desc: "Weiches Sonnenuntergangslicht rund um Ortaköy und die erste Bosporus-Brücke oder eine ruhige Bucht unter den abendlichen Brückenlichtern.",
      },
      {
        title: "Vorbereitete Antrags-Inszenierung",
        desc: "Blumen, Dekoration, Fotograf, Geiger und Torte — alles wird für den Antragsmoment vorbereitet, sodass Sie nur noch das Ja hören.",
      },
    ],
    addOnsHeading: "Verfügbare Zusatzleistungen",
    addOns: [
      "Blumen und Brautstrauß",
      "Antrags-Dekoration (Kerzen, Rosenblätter, Lichter)",
      "Professioneller Fotograf",
      "Videograf",
      "Live-Geiger",
      "Individuelle Torte",
      "Abendmenü",
      "Champagner-Service",
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        question: "Was unterscheidet diese Buchung von einem normalen Yacht-Charter?",
        answer:
          "Die Buchung wird zuerst rund um den Antragsmoment geplant — Privatsphäre, Routen-Timing und Setup richten sich nach dem Antrag, nicht nach einem allgemeinen Ausflug.",
      },
      {
        question: "Wie viel kostet das?",
        answer:
          "Der Preis hängt vom Yacht-Typ, Timing, Grad der Privatsphäre sowie den gewünschten Zusatzleistungen wie Dekoration und Fotograf ab.",
      },
      {
        question: "Können Blumen, Fotograf oder Geiger arrangiert werden?",
        answer:
          "Ja. Antrags-Dekoration, Brautstrauß, Fotograf, Videograf, Geiger, Torte und Abendessen können organisiert werden.",
      },
      {
        question: "Welche Route eignet sich für einen Antrag?",
        answer:
          "Anträge bei Sonnenuntergang funktionieren rund um Ortaköy und die erste Bosporus-Brücke gut, abendliche Anträge eher in ruhigen Buchten unter den Brückenlichtern.",
      },
      {
        question: "Wie früh sollte ich buchen?",
        answer:
          "In der Hauptsaison und an Wochenenden empfehlen wir eine Buchung mindestens 1–2 Wochen im Voraus, da Dekoration und Fotograf Vorlauf benötigen.",
      },
    ],
    tableHeading: "Schnell-Übersicht",
    tableRows: [
      { label: "Privatsphäre", value: "Vollständig privat — keine weiteren Gäste an Bord" },
      { label: "Route", value: "Sonnenuntergang Ortaköy & 1. Brücke oder abendliche Brückenlichter" },
      { label: "Typische Dauer", value: "1,5–3 Stunden (kurzer Antrag oder mit Dinner)" },
      { label: "Optionale Pakete", value: "Blumen, Fotograf, Geiger, Torte, Dekoration, Dinner" },
    ],
    ctaHeading: "Planen wir den Antrag gemeinsam",
    ctaBody:
      "Senden Sie uns Ihr Datum, Ihre Wunschzeit und das gewünschte Setup-Niveau — wir schlagen passende Yacht-Optionen für Ihren Antragsplan vor.",
    ctaWhatsapp: "Auf WhatsApp planen",
    ctaCall: "Jetzt anrufen",
    viewInEnglish: "View in English",
  },
  fr: {
    metaTitle: "Demande en Mariage en Yacht Istanbul | Surprise Bosphore | MerrySails",
    metaDescription:
      "Demande en mariage en yacht privé à Istanbul. Surprise romantique sur le Bosphore au coucher de soleil avec fleurs, photographe, violoniste et décoration.",
    canonicalPath: "/fr/proposal-yacht-rental-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Demande en Mariage en Yacht",
    eyebrow: "Demande en mariage en yacht",
    heroTitle: "Demande en Mariage en Yacht à Istanbul",
    heroSubtitle: "Une surprise romantique sur le Bosphore, organisée autour du moment clé.",
    heroDescription:
      "Un yacht entièrement privé sur le Bosphore, réservé au couple, avec une mise en scène pensée pour la demande. Intimité, coucher de soleil et décor sont organisés autour de l'instant de la demande.",
    whyHeading: "Pourquoi cette location convient à une demande en mariage",
    reasons: [
      {
        title: "Yacht réservé au couple",
        desc: "Aucun autre invité à bord — le yacht entier reste privé jusqu'au moment de la demande, afin de préserver la surprise.",
      },
      {
        title: "Coucher de soleil ou lumières des ponts",
        desc: "Lumière douce du coucher de soleil autour d'Ortaköy et du 1er pont du Bosphore, ou crique tranquille sous les lumières des ponts en soirée.",
      },
      {
        title: "Mise en scène prête",
        desc: "Fleurs, décoration, photographe, violoniste, gâteau — tout est préparé autour de la demande pour que vous n'ayez qu'à écouter le \"oui\".",
      },
    ],
    addOnsHeading: "Options disponibles",
    addOns: [
      "Fleurs et bouquet",
      "Décoration de demande (bougies, pétales, lumières)",
      "Photographe professionnel",
      "Vidéaste",
      "Violoniste live",
      "Gâteau personnalisé",
      "Menu dîner",
      "Service champagne",
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        question: "Qu'est-ce qui différencie cette location d'une location de yacht classique ?",
        answer:
          "La réservation est d'abord construite autour du moment de la demande : intimité, horaire de route et mise en scène sont calés sur la demande, pas sur une sortie générale.",
      },
      {
        question: "Combien ça coûte ?",
        answer:
          "Le prix dépend du type de yacht, du timing, du niveau d'intimité et des options choisies pour la mise en scène (décoration, photographe, etc.).",
      },
      {
        question: "Pouvez-vous organiser fleurs, photographe ou violoniste ?",
        answer:
          "Oui. Décoration, bouquet, photographe, vidéaste, violoniste, gâteau et dîner peuvent être organisés.",
      },
      {
        question: "Quel itinéraire convient à une demande ?",
        answer:
          "Les demandes au coucher de soleil fonctionnent bien autour d'Ortaköy et du 1er pont, tandis que celles du soir conviennent aux criques tranquilles sous les lumières des ponts.",
      },
      {
        question: "Quand faut-il réserver ?",
        answer:
          "En haute saison et le week-end, nous recommandons de réserver au moins 1 à 2 semaines à l'avance ; la décoration et le photographe demandent un délai de préparation.",
      },
    ],
    tableHeading: "En bref",
    tableRows: [
      { label: "Niveau d'intimité", value: "Entièrement privé — aucun autre invité à bord" },
      { label: "Itinéraire", value: "Ortaköy & 1er pont au coucher de soleil ou lumières des ponts en soirée" },
      { label: "Durée habituelle", value: "1h30 à 3h (demande courte ou avec dîner)" },
      { label: "Options ajoutables", value: "Fleurs, photographe, violoniste, gâteau, décoration, dîner" },
    ],
    ctaHeading: "Planifions la demande ensemble",
    ctaBody:
      "Envoyez-nous votre date, l'horaire idéal et le niveau de mise en scène souhaité — nous reviendrons avec des options de yacht adaptées à votre plan.",
    ctaWhatsapp: "Planifier sur WhatsApp",
    ctaCall: "Appeler maintenant",
    viewInEnglish: "View in English",
  },
  nl: {
    metaTitle: "Huwelijksaanzoek op Jacht Istanbul | Privé Bosporus Aanzoek | MerrySails",
    metaDescription:
      "Privé huwelijksaanzoek op een jacht in Istanbul. Romantische verrassing op de Bosporus bij zonsondergang met bloemen, fotograaf, violist en decoratie.",
    canonicalPath: "/nl/proposal-yacht-rental-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Huwelijksaanzoek op Jacht",
    eyebrow: "Huwelijksaanzoek op jacht",
    heroTitle: "Huwelijksaanzoek op Jacht in Istanbul",
    heroSubtitle: "Een romantische verrassing op de Bosporus, opgebouwd rondom het aanzoek-moment.",
    heroDescription:
      "Een volledig privé jacht op de Bosporus, alleen voor het paar, met alles afgestemd op het aanzoek. Privacy, zonsondergang-timing en setting worden gepland rondom het moment van het aanzoek.",
    whyHeading: "Waarom dit de juiste keuze is voor een aanzoek",
    reasons: [
      {
        title: "Jacht alleen voor het paar",
        desc: "Geen andere gasten aan boord — het hele jacht blijft privé tot het aanzoek-moment, zodat de verrassing volledig bewaard blijft.",
      },
      {
        title: "Zonsondergang of bruglichten",
        desc: "Zacht zonsondergangslicht rond Ortaköy en de 1e Bosporusbrug, of een rustige baai onder de bruglichten in de avond.",
      },
      {
        title: "Aanzoek-setting kant-en-klaar",
        desc: "Bloemen, decoratie, fotograaf, violist en taart — alles wordt voorbereid rond het aanzoek, zodat u alleen nog naar het \"ja\" hoeft te luisteren.",
      },
    ],
    addOnsHeading: "Beschikbare extra's",
    addOns: [
      "Bloemen en boeket",
      "Aanzoek-decoratie (kaarsen, rozenblaadjes, lichtjes)",
      "Professionele fotograaf",
      "Videograaf",
      "Live violist",
      "Persoonlijke taart",
      "Dinermenu",
      "Champagneservice",
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        question: "Wat is het verschil met een gewone jachtcharter?",
        answer:
          "De boeking wordt eerst rond het aanzoek-moment gebouwd — privacy, route-timing en setting worden afgestemd op het aanzoek, niet op een gewone tocht.",
      },
      {
        question: "Hoeveel kost het?",
        answer:
          "De prijs hangt af van het jachttype, de timing, het privacyniveau en de gekozen extra's zoals decoratie en fotograaf.",
      },
      {
        question: "Kunnen bloemen, fotograaf of violist geregeld worden?",
        answer:
          "Ja. Aanzoek-decoratie, boeket, fotograaf, videograaf, violist, taart en diner kunnen worden geregeld.",
      },
      {
        question: "Welke route past bij een aanzoek?",
        answer:
          "Aanzoeken bij zonsondergang werken goed rond Ortaköy en de 1e Bosporusbrug; avondaanzoeken passen beter bij rustige baaien onder de bruglichten.",
      },
      {
        question: "Hoe ver vooraf moet ik boeken?",
        answer:
          "In het hoogseizoen en in het weekend raden we aan om minstens 1–2 weken vooraf te boeken; decoratie en fotograaf vragen voorbereidingstijd.",
      },
    ],
    tableHeading: "Snel overzicht",
    tableRows: [
      { label: "Privacyniveau", value: "Volledig privé — geen andere gasten aan boord" },
      { label: "Route", value: "Ortaköy & 1e brug bij zonsondergang of bruglichten in de avond" },
      { label: "Gebruikelijke duur", value: "1,5–3 uur (kort aanzoek of inclusief diner)" },
      { label: "Toe te voegen pakketten", value: "Bloemen, fotograaf, violist, taart, decoratie, diner" },
    ],
    ctaHeading: "Laten we het aanzoek samen plannen",
    ctaBody:
      "Stuur ons uw datum, gewenste tijdstip en setting-niveau — wij komen terug met jachtopties die bij uw aanzoekplan passen.",
    ctaWhatsapp: "Plan op WhatsApp",
    ctaCall: "Bel nu",
    viewInEnglish: "View in English",
  },
};

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "de" }, { locale: "fr" }, { locale: "nl" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflang("/proposal-yacht-rental-istanbul"),
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: t.heroTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocaleProposalYachtRentalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.breadcrumbCruise, item: `${SITE_URL}/${locale}/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.heroTitle,
    description: t.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    serviceType: "Proposal Yacht Rental",
    url: canonicalUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 py-12 pt-28">
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href={`/${locale}`} className="hover:text-rose-600">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-rose-600">
                {t.breadcrumbCruise}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{t.breadcrumbCurrent}</li>
          </ol>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start mb-12">
          <div>
            <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 mb-4">
              {t.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-3 max-w-2xl">
              {t.heroSubtitle}
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-2xl">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
              >
                {t.ctaWhatsapp}
              </a>
              <a
                href="tel:+905370406822"
                className="inline-flex items-center justify-center rounded-xl border border-rose-600 px-6 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                {t.ctaCall}
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.tableHeading}</h2>
            <table className="w-full text-left text-sm">
              <tbody>
                {t.tableRows.map((row) => (
                  <tr key={row.label} className="border-b border-rose-100 last:border-b-0">
                    <th className="py-2 pr-3 align-top font-semibold text-gray-900 text-xs uppercase tracking-wide">
                      {row.label}
                    </th>
                    <td className="py-2 text-gray-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </aside>
        </section>

        <section className="mb-12 rounded-2xl border border-rose-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.whyHeading}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.reasons.map((reason) => (
              <div key={reason.title} className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.addOnsHeading}</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {t.addOns.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 font-bold text-rose-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.faqHeading}</h2>
          <div className="space-y-4">
            {t.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                  {faq.question}
                  <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-3xl bg-rose-600 p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">{t.ctaHeading}</h2>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              {t.ctaWhatsapp}
            </a>
            <a
              href="tel:+905370406822"
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-rose-700"
            >
              {t.ctaCall}
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/proposal-yacht-rental-istanbul" className="text-sm text-gray-500 underline hover:text-rose-600">
            {t.viewInEnglish}
          </Link>
        </div>
      </main>
    </>
  );
}
