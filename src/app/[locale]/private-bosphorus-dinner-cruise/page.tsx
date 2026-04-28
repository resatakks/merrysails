import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

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
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  tableHeading: string;
  tableRows: { label: string; value: string }[];
  compareHeading: string;
  ctaHeading: string;
  ctaBody: string;
  ctaWhatsapp: string;
  ctaCall: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "Boğaz'da Özel Akşam Yemeği Turu | Çift İçin Özel Tekne | MerrySails",
    metaDescription:
      "Boğaz'da özel yatta akşam yemeği turu: kendi teknenizde özel masa, esnek rota, gün batımı veya gece kalkış. Evlilik teklifi, yıl dönümü ve doğum günü için ideal.",
    canonicalPath: "/tr/private-bosphorus-dinner-cruise",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Özel Boğaz Akşam Yemeği Turu",
    eyebrow: "MerrySails İstanbul",
    heroTitle: "Boğaz'da Özel Akşam Yemeği Turu",
    heroSubtitle: "Yat sadece sizin, masa sadece sizin",
    heroDescription:
      "Özel Boğaz akşam yemeği turu; çiftler, küçük gruplar, evlilik teklifi, yıl dönümü ve doğum günü için tek masalı, sakin bir tekne deneyimidir. Saat, rota ve menü tamamen size göre planlanır.",
    whyHeading: "Neden paylaşımlı yerine özel akşam yemeği turu?",
    reasons: [
      {
        title: "Yat tamamen size ait",
        desc: "Paylaşımlı bir tekne ya da Türk gecesi gösterisi yok. Sadece sizin grubunuz, kendi masanız ve sessiz bir akşam.",
      },
      {
        title: "Esnek saat ve rota",
        desc: "Gün batımı saatinde mi yola çıkmak istersiniz, yoksa şehir ışıkları yandıktan sonra mı? Kalkış saati, durak ve süre size göre ayarlanır.",
      },
      {
        title: "Özel anlar için ideal",
        desc: "Evlilik teklifi, yıl dönümü, doğum günü veya küçük bir aile yemeği — çiçek, pasta, fotoğrafçı ve menü detayları teknede hazır olur.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        question: "Paylaşımlı akşam yemeği turundan farkı nedir?",
        answer:
          "Yat sadece sizin grubunuz için ayrılır. Yemek, saat ve teknedeki atmosfer paylaşımlı bir oturma planına göre değil, doğrudan sizin masanıza göre kurulur.",
      },
      {
        question: "Kaç kişi için uygundur?",
        answer:
          "En uygun grup boyutu çiftler ve 2–10 kişilik küçük gruplardır. Doğru yat; kişi sayısına, masa düzenine ve istenen güverte alanına göre belirlenir.",
      },
      {
        question: "Evlilik teklifi veya doğum günü için organizasyon yapılır mı?",
        answer:
          "Evet. Çiçek, pasta, fotoğrafçı, kemancı ve masa süslemesi tekne üzerinde hazırlanabilir. Tüm detayları rezervasyondan önce yazılı olarak planlarız.",
      },
      {
        question: "Sade bir akşam yemeği de mümkün mü?",
        answer:
          "Evet. Sadece özel bir masa, net bir rota ve Boğaz'da sakin bir akşam istiyorsanız kurulumu mütevazı tutabiliriz. Süslü bir organizasyon zorunlu değildir.",
      },
    ],
    tableHeading: "Hızlı Bakış",
    tableRows: [
      { label: "Tekne tipi", value: "Özel yat (sadece sizin grubunuz)" },
      { label: "Grup boyutu", value: "2–10 kişi (çift veya küçük grup)" },
      { label: "Başlangıç fiyatı", value: "€280'den itibaren paketler" },
      { label: "Kalkış saati", value: "Gün batımı veya akşam — esnek" },
      { label: "Lisans", value: "TÜRSAB A Grubu lisanslı (2001'den beri)" },
    ],
    compareHeading: "Karar vermeden önce inceleyin",
    ctaHeading: "Özel akşam yemeği turunuz için fiyat alın",
    ctaBody:
      "Tarihinizi, kişi sayısını ve özel anlarınızı yazın; size uygun yatı ve menü seçeneklerini önerelim.",
    ctaWhatsapp: "WhatsApp'tan yazın",
    ctaCall: "Bize ulaşın",
    viewInEnglish: "View in English",
  },
  de: {
    metaTitle: "Privates Bosporus-Abendessen auf der Yacht | Privatjacht-Dinner Istanbul | MerrySails",
    metaDescription:
      "Privates Abendessen auf einer eigenen Yacht am Bosporus: privater Tisch, flexible Route, Sonnenuntergang oder Abendlichter. Ideal für Heiratsantrag, Jahrestag und Geburtstag.",
    canonicalPath: "/de/private-bosphorus-dinner-cruise",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus-Tour",
    breadcrumbCurrent: "Privates Bosporus-Abendessen",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Privates Bosporus-Abendessen auf der Yacht",
    heroSubtitle: "Ihre eigene Yacht, Ihr eigener Tisch",
    heroDescription:
      "Ein privates Abendessen auf dem Bosporus für Paare, kleine Gruppen, Heiratsanträge, Jahrestage oder Geburtstage – die Yacht, der Tisch und das Timing gehören ausschließlich Ihnen. Route und Menü richten sich nach Ihren Wünschen.",
    whyHeading: "Warum privat statt geteilte Abendrundfahrt?",
    reasons: [
      {
        title: "Die Yacht gehört ganz Ihnen",
        desc: "Keine geteilten Tische, keine türkische Bühnenshow. Nur Ihre Gruppe, Ihr Tisch und ein ruhiger Abend auf dem Wasser.",
      },
      {
        title: "Flexible Zeit und Route",
        desc: "Möchten Sie zur goldenen Stunde ablegen oder erst, wenn die Stadt beleuchtet ist? Abfahrtszeit, Stopps und Dauer planen wir nach Ihrem Wunsch.",
      },
      {
        title: "Ideal für besondere Momente",
        desc: "Heiratsantrag, Jahrestag, Geburtstag oder ein kleines Familienessen – Blumen, Torte, Fotograf und Menüdetails stehen an Bord bereit.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        question: "Was unterscheidet diese Tour von einer geteilten Dinner Cruise?",
        answer:
          "Die Yacht ist ausschließlich für Ihre Gruppe reserviert. Abendessen, Timing und die Atmosphäre an Bord werden um Ihren Tisch herum gestaltet, nicht nach einem geteilten Sitzplan.",
      },
      {
        question: "Für wie viele Gäste ist die Tour geeignet?",
        answer:
          "Am besten geeignet für Paare und kleine Gruppen von 2 bis 10 Personen. Die passende Yacht hängt von Gästezahl, Tischanordnung und gewünschter Decksfläche ab.",
      },
      {
        question: "Können Heiratsantrag oder Geburtstag organisiert werden?",
        answer:
          "Ja. Blumen, Torte, Fotograf, Geiger und Tischdekoration können an Bord arrangiert werden. Alle Details werden vor der Buchung schriftlich abgestimmt.",
      },
      {
        question: "Geht es auch ganz schlicht?",
        answer:
          "Ja. Wenn Sie nur einen privaten Tisch, eine klare Route und einen ruhigen Abend auf dem Wasser wünschen, halten wir das Setup bewusst zurückhaltend.",
      },
    ],
    tableHeading: "Auf einen Blick",
    tableRows: [
      { label: "Bootstyp", value: "Privatyacht – ausschließlich für Ihre Gruppe" },
      { label: "Gruppengröße", value: "2–10 Personen (Paar oder kleine Gruppe)" },
      { label: "Ab-Preis", value: "Pakete ab €280" },
      { label: "Abfahrt", value: "Sonnenuntergang oder Abend – flexibel" },
      { label: "Lizenz", value: "TÜRSAB A-Gruppe lizenziert seit 2001" },
    ],
    compareHeading: "Vor der Buchung vergleichen",
    ctaHeading: "Preise für Ihr privates Yacht-Dinner anfragen",
    ctaBody:
      "Senden Sie uns Datum, Gästezahl und Anlass – wir schlagen Ihnen passende Yachten und Menüvarianten vor.",
    ctaWhatsapp: "Auf WhatsApp schreiben",
    ctaCall: "Kontakt aufnehmen",
    viewInEnglish: "View in English",
  },
  fr: {
    metaTitle: "Dîner Privé sur le Bosphore en Yacht | Croisière Dîner Privée Istanbul | MerrySails",
    metaDescription:
      "Dîner privé en yacht sur le Bosphore : votre propre bateau, table privée, itinéraire flexible au coucher du soleil ou en soirée. Idéal pour demande en mariage, anniversaire et anniversaire de mariage.",
    canonicalPath: "/fr/private-bosphorus-dinner-cruise",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Dîner Privé sur le Bosphore",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Dîner Privé sur le Bosphore en Yacht",
    heroSubtitle: "Votre yacht, votre table",
    heroDescription:
      "Un dîner privé en yacht sur le Bosphore pour les couples, les petits groupes, les demandes en mariage, les anniversaires de mariage et les anniversaires. Le bateau, la table et l'horaire sont entièrement à vous, et l'itinéraire est adapté à votre soirée.",
    whyHeading: "Pourquoi choisir un dîner privé plutôt qu'une croisière partagée ?",
    reasons: [
      {
        title: "Le yacht est à vous seul",
        desc: "Pas de tables partagées, pas de spectacle turc. Uniquement votre groupe, votre table et une soirée calme sur l'eau.",
      },
      {
        title: "Horaire et itinéraire flexibles",
        desc: "Souhaitez-vous partir à l'heure dorée ou une fois la ville illuminée ? Le départ, les arrêts et la durée sont organisés selon votre souhait.",
      },
      {
        title: "Idéal pour les grands moments",
        desc: "Demande en mariage, anniversaire de mariage, anniversaire ou simple dîner en famille — fleurs, gâteau, photographe et détails de table sont prêts à bord.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        question: "Quelle est la différence avec une croisière dîner partagée ?",
        answer:
          "Le yacht est réservé exclusivement à votre groupe. Le dîner, l'horaire et l'ambiance à bord sont construits autour de votre table et non d'un plan de table partagé.",
      },
      {
        question: "Pour combien de personnes la croisière est-elle prévue ?",
        answer:
          "Elle convient idéalement aux couples et aux petits groupes de 2 à 10 personnes. Le yacht adapté dépend du nombre d'invités, de la disposition de la table et de l'espace pont souhaité.",
      },
      {
        question: "Pouvez-vous organiser une demande en mariage ou un anniversaire ?",
        answer:
          "Oui. Fleurs, gâteau, photographe, violoniste et décoration de table peuvent être organisés à bord. Tous les détails sont confirmés par écrit avant la réservation.",
      },
      {
        question: "Le dîner peut-il rester simple ?",
        answer:
          "Oui. Si vous souhaitez uniquement une table privée, un itinéraire clair et une soirée tranquille sur l'eau, nous gardons l'organisation discrète et sobre.",
      },
    ],
    tableHeading: "En un coup d'œil",
    tableRows: [
      { label: "Type de bateau", value: "Yacht privé – réservé à votre groupe" },
      { label: "Taille du groupe", value: "2 à 10 personnes (couple ou petit groupe)" },
      { label: "Prix de départ", value: "Forfaits à partir de €280" },
      { label: "Heure de départ", value: "Coucher du soleil ou soirée — flexible" },
      { label: "Licence", value: "Agréé TÜRSAB Groupe A depuis 2001" },
    ],
    compareHeading: "À comparer avant de réserver",
    ctaHeading: "Recevez le prix de votre dîner privé en yacht",
    ctaBody:
      "Envoyez-nous votre date, le nombre d'invités et l'occasion — nous vous proposerons les yachts et menus les plus adaptés.",
    ctaWhatsapp: "Écrire sur WhatsApp",
    ctaCall: "Nous contacter",
    viewInEnglish: "View in English",
  },
  nl: {
    metaTitle: "Privédiner op Jacht op de Bosporus | Privé Dinercruise Istanbul | MerrySails",
    metaDescription:
      "Privédiner op een eigen jacht op de Bosporus: privétafel, flexibele route, vertrek bij zonsondergang of avondlichten. Ideaal voor huwelijksaanzoek, jubileum en verjaardag.",
    canonicalPath: "/nl/private-bosphorus-dinner-cruise",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Privédiner op de Bosporus",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Privédiner op Jacht op de Bosporus",
    heroSubtitle: "Uw eigen jacht, uw eigen tafel",
    heroDescription:
      "Een privédiner op een jacht op de Bosporus voor stellen, kleine groepen, huwelijksaanzoeken, jubilea en verjaardagen. Het jacht, de tafel en de tijd zijn volledig van u, en de route stemmen wij af op uw avond.",
    whyHeading: "Waarom privé in plaats van een gedeelde dinercruise?",
    reasons: [
      {
        title: "Het jacht is volledig van u",
        desc: "Geen gedeelde tafels en geen Turkse avondshow. Alleen uw eigen groep, uw eigen tafel en een rustige avond op het water.",
      },
      {
        title: "Flexibele tijd en route",
        desc: "Wilt u vertrekken tijdens het gouden uur of pas wanneer de stad verlicht is? Vertrektijd, stops en duur regelen wij naar uw wens.",
      },
      {
        title: "Ideaal voor bijzondere momenten",
        desc: "Huwelijksaanzoek, jubileum, verjaardag of een klein familiediner — bloemen, taart, fotograaf en tafeldetails staan aan boord klaar.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        question: "Wat is het verschil met een gedeelde dinercruise?",
        answer:
          "Het jacht is uitsluitend voor uw groep gereserveerd. Het diner, de timing en de sfeer aan boord worden rondom uw tafel ingericht, niet rondom een gedeeld zitplan.",
      },
      {
        question: "Voor hoeveel gasten is dit geschikt?",
        answer:
          "Het past het beste bij stellen en kleine groepen van 2 tot 10 personen. Het juiste jacht hangt af van het aantal gasten, de tafelopstelling en de gewenste dekruimte.",
      },
      {
        question: "Kunt u een huwelijksaanzoek of verjaardag organiseren?",
        answer:
          "Ja. Bloemen, taart, fotograaf, violist en tafelstyling kunnen aan boord worden geregeld. Alle details bevestigen wij schriftelijk vóór de boeking.",
      },
      {
        question: "Kan het diner ook eenvoudig blijven?",
        answer:
          "Ja. Wenst u alleen een privétafel, een duidelijke route en een rustige avond op het water, dan houden wij de opzet bewust ingetogen.",
      },
    ],
    tableHeading: "In één oogopslag",
    tableRows: [
      { label: "Type boot", value: "Privéjacht – uitsluitend voor uw groep" },
      { label: "Groepsgrootte", value: "2 tot 10 personen (stel of kleine groep)" },
      { label: "Vanaf-prijs", value: "Pakketten vanaf €280" },
      { label: "Vertrektijd", value: "Zonsondergang of avond — flexibel" },
      { label: "Licentie", value: "TÜRSAB A-categorie gecertificeerd sinds 2001" },
    ],
    compareHeading: "Vergelijk vóór u boekt",
    ctaHeading: "Vraag de prijs voor uw privé-dinerjacht aan",
    ctaBody:
      "Stuur ons de datum, het aantal gasten en de gelegenheid — wij stellen passende jachten en menukeuzes voor.",
    ctaWhatsapp: "Stuur een WhatsApp",
    ctaCall: "Neem contact op",
    viewInEnglish: "View in English",
  },
};

const COMPARE_LINKS_BY_LOCALE: Record<
  string,
  { href: string; title: string; description: string }[]
> = {
  tr: [
    {
      href: "/istanbul-dinner-cruise",
      title: "Paylaşımlı Akşam Yemeği Turu",
      description: "Daha uygun fiyatlı, paylaşımlı tekne ve Türk gecesi gösterili sabit paketler.",
    },
    {
      href: "/yacht-charter-istanbul",
      title: "Özel Yat Kiralama",
      description: "Dinner odaklı değil, esnek özel yat paketleri €280'den itibaren.",
    },
    {
      href: "/boat-rental-istanbul",
      title: "Tekne Kiralama İstanbul",
      description: "Önce özel tekne, sonra akşam yemeğini siz kurmak isterseniz uygun seçenek.",
    },
  ],
  de: [
    {
      href: "/istanbul-dinner-cruise",
      title: "Geteilte Dinner Cruise",
      description: "Festpreis-Pakete auf einem geteilten Schiff mit türkischer Abendshow.",
    },
    {
      href: "/yacht-charter-istanbul",
      title: "Privater Yacht-Charter",
      description: "Komplett private Yacht-Pakete ab €280 – flexibler als ein reines Dinner-Format.",
    },
    {
      href: "/boat-rental-istanbul",
      title: "Bootsverleih Istanbul",
      description: "Erst privates Boot, dann Dinner und Programm individuell aufbauen.",
    },
  ],
  fr: [
    {
      href: "/istanbul-dinner-cruise",
      title: "Croisière Dîner Partagée",
      description: "Forfaits à prix fixe sur un bateau partagé avec spectacle de nuit turque.",
    },
    {
      href: "/yacht-charter-istanbul",
      title: "Location de Yacht Privé",
      description: "Yachts entièrement privés à partir de €280, plus flexibles qu'un dîner classique.",
    },
    {
      href: "/boat-rental-istanbul",
      title: "Location de Bateau Istanbul",
      description: "D'abord un bateau privé, puis un dîner et un programme à composer librement.",
    },
  ],
  nl: [
    {
      href: "/istanbul-dinner-cruise",
      title: "Gedeelde Dinercruise",
      description: "Vaste pakketten op een gedeelde boot met Turkse avondshow.",
    },
    {
      href: "/yacht-charter-istanbul",
      title: "Privé Jachtcharter",
      description: "Volledig privé jachtpakketten vanaf €280 – flexibeler dan een vast dinerformat.",
    },
    {
      href: "/boat-rental-istanbul",
      title: "Boot Huren Istanbul",
      description: "Eerst een privéboot, daarna zelf het diner en programma samenstellen.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const hreflang = buildHreflang("/private-bosphorus-dinner-cruise");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages:
        hreflang ?? {
          "x-default": `${SITE_URL}/private-bosphorus-dinner-cruise`,
          en: `${SITE_URL}/private-bosphorus-dinner-cruise`,
          [locale]: canonicalUrl,
        },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocalePrivateBosphorusDinnerCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const compareLinks = COMPARE_LINKS_BY_LOCALE[locale] ?? [];

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
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumbCruise,
        item: `${SITE_URL}/${locale}/bosphorus-cruise`,
      },
      { "@type": "ListItem", position: 3, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.heroTitle,
    description: t.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Istanbul, Turkey",
    serviceType: "Private Yacht Dinner Cruise",
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-blue-600">
                {t.breadcrumbCruise}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{t.breadcrumbCurrent}</li>
          </ol>
        </nav>

        <section className="mb-12">
          <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 mb-4">
            {t.eyebrow}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg font-medium text-rose-700 mb-4">{t.heroSubtitle}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl">
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
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-xl border border-rose-600 px-6 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
            >
              {t.ctaCall}
            </Link>
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.whyHeading}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.reasons.map((item) => (
              <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.tableHeading}</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {t.tableRows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-200 last:border-b-0">
                    <th className="w-56 bg-gray-50 p-3 font-semibold text-gray-900 text-xs">
                      {row.label}
                    </th>
                    <td className="p-3 text-gray-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {compareLinks.length > 0 && (
          <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.compareHeading}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {compareLinks.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-rose-200 hover:bg-rose-50"
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.faqHeading}</h2>
          <div className="space-y-4">
            {t.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 group"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                  {faq.question}
                  <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-rose-600 p-8 text-center text-white mb-8">
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
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-rose-700"
            >
              {t.ctaCall}
            </Link>
          </div>
        </section>

        <p className="text-center text-sm text-gray-500">
          <Link href="/private-bosphorus-dinner-cruise" className="hover:text-rose-700 underline">
            {t.viewInEnglish}
          </Link>
        </p>
      </main>
    </>
  );
}
