import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whyHeading: string;
  reasons: { title: string; desc: string }[];
  formatsHeading: string;
  formats: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaWhatsapp: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "Kurumsal Yat Akşam Yemeği İstanbul 2026 | Boğaz'da Şirket Yemeği | MerrySails",
    metaDescription:
      "Boğaz'da kurumsal akşam yemeği: ekip yemeği, müşteri ağırlama ve yönetici akşamları için özel yat. Faturalı kurumsal hizmet, yemek odaklı planlama.",
    canonicalPath: "/tr/corporate-yacht-dinner-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Kurumsal Yat Akşam Yemeği İstanbul",
    heroTitle: "İstanbul'da Kurumsal Yat Akşam Yemeği",
    heroSubtitle:
      "Şirket akşam yemekleri, müşteri ağırlama ve yönetim akşamları için Boğaz'da özel yat",
    heroDescription:
      "MerrySails kurumsal akşam yemeği programları; brifin merkezinde yemek olduğunda — müşteri ağırlama, yönetici akşamı, yönetim kurulu yemeği veya seçkin ekip yemeği — tüm tekneyi şirketinize tahsis eder. Misafir akışı, menü, servis ritmi ve fatura detayları brifinize göre planlanır; standart yat paketi yerine yemek odaklı kurgu sunarız.",
    whyHeading: "Kurumsal Yemek İçin Neden Yat?",
    reasons: [
      {
        title: "Mahremiyet ve ev sahipliği",
        desc: "Restoran masasına kıyasla daha kontrollü, mahrem ve markaya özgü bir akşam. Tüm yat sadece şirketiniz için ayrılır.",
      },
      {
        title: "Yemek odaklı planlama",
        desc: "Misafir sayısı, oturma düzeni, menü tercihleri ve servis temposu öncelikli olarak konumlandırılır; tekne ve ekip bunun üzerine kurgulanır.",
      },
      {
        title: "Faturalı ticari süreç",
        desc: "Resmi fatura, kurumsal sözleşme ve mali müşavir ihtiyaçlarına uygun belge düzeniyle finans ekibinizin beklediği ticari netlik sağlanır.",
      },
    ],
    formatsHeading: "Şirket Yemeği Formatları",
    formats: [
      {
        title: "Müşteri ağırlama akşam yemeği",
        desc: "Yemeğin ağırlama stratejisinin parçası olduğu, ortamın bir restorandan daha mahrem hissettirmesi gereken akşamlar için.",
      },
      {
        title: "Yönetim kurulu / liderlik yemeği",
        desc: "Zaman kontrolü, mahremiyet ve sakin gemi atmosferinin büyük bir prodüksiyondan daha önemli olduğu yönetici buluşmaları.",
      },
      {
        title: "Seçkin ekip akşamı",
        desc: "Geniş bir lansman veya kokteyl yerine, daha cilalı ve oturma düzenli bir yemek deneyimi tercih eden şirketler için ideal.",
      },
      {
        title: "Yıl sonu / kutlama yemeği",
        desc: "Şirket başarısını markaya özgü, ölçülü ve premium bir Boğaz akşamında kutlamak isteyen ekipler için.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Kurumsal yat akşam yemeği nasıl fiyatlandırılır?",
        a: "Fiyatlandırma; misafir sayısı, akşamın süresi, menü ve içecek seviyesi, transfer ve gerekli teknenin tipine göre değişir. Tüm akşam yemekleri teklif bazlı planlanır.",
      },
      {
        q: "Resmi fatura ve kurumsal ödeme yapılıyor mu?",
        a: "Evet. Şirket adına resmi fatura kesilir, kurumsal sözleşme süreci yürütülür ve finans ekibinizin ihtiyaç duyduğu belgeler eksiksiz sağlanır.",
      },
      {
        q: "Restoran yerine neden yatta yemek?",
        a: "Mahremiyet, ev sahipliği kontrolü, misafir deneyimi ve Boğaz atmosferi sabit bir mekândan daha önemli olduğunda yat çok daha güçlü bir seçenektir.",
      },
      {
        q: "Catering seçenekleri nelerdir?",
        a: "Set menü, kanepe servisi, özel şef menüsü veya kokteyl prolonge gibi farklı seviyeler kurgulanabilir. Alkollü/alkolsüz içecek paketleri brifinize göre eklenir.",
      },
    ],
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Firmen-Yacht-Dinner Istanbul 2026 | Geschäftsessen am Bosporus | MerrySails",
    metaDescription:
      "Firmen-Yacht-Dinner am Bosporus: Teamdinner, Kundenempfang und Führungsabende auf privater Jacht. Dinner-orientierte Planung, offizielle Rechnung.",
    canonicalPath: "/de/corporate-yacht-dinner-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Firmen-Yacht-Dinner Istanbul",
    heroTitle: "Firmen-Yacht-Dinner in Istanbul",
    heroSubtitle:
      "Teamdinner, Kundenempfang und Führungsabende auf privater Bosporus-Jacht",
    heroDescription:
      "MerrySails Firmen-Dinner-Programme stellen die gesamte Jacht zur Verfügung, wenn der Abend klar dinner-geführt ist — Kundenempfang, Executive-Dinner, Vorstandsdinner oder anspruchsvolles Teamdinner. Gästefluss, Menü, Servicerhythmus und Rechnungsdetails werden nach Ihrem Briefing geplant — kein Standard-Yacht-Paket, sondern ein dinner-zentriertes Konzept.",
    whyHeading: "Warum ein Firmen-Dinner an Bord?",
    reasons: [
      {
        title: "Diskretion und Gastgeberkontrolle",
        desc: "Im Vergleich zu einem Restauranttisch ein kontrollierter, privater Rahmen, ausschließlich für Ihr Unternehmen reserviert.",
      },
      {
        title: "Dinner-orientierte Planung",
        desc: "Gästezahl, Sitzordnung, Menüpräferenzen und Servicerhythmus stehen im Mittelpunkt; Jacht und Crew werden danach ausgerichtet.",
      },
      {
        title: "Rechnung und Geschäftsabwicklung",
        desc: "Offizielle Rechnungsstellung, ordnungsgemäße Belege und kommerzielle Klarheit, wie sie Ihre Finanzabteilung benötigt.",
      },
    ],
    formatsHeading: "Formate für Firmen-Dinner",
    formats: [
      {
        title: "Kundenempfang-Dinner",
        desc: "Wenn das Dinner Teil der Hospitality-Strategie ist und der Rahmen privater wirken soll als ein Restaurant.",
      },
      {
        title: "Vorstands- oder Führungsdinner",
        desc: "Wenn Zeitkontrolle, Diskretion und eine ruhige Atmosphäre wichtiger sind als eine große Eventproduktion.",
      },
      {
        title: "Anspruchsvoller Teamabend",
        desc: "Wenn Sie statt eines Launches oder Stehempfangs ein gehobenes, gesetztes Dinner bevorzugen.",
      },
      {
        title: "Jahresend- und Feierdinner",
        desc: "Für Teams, die Erfolge markenkonform, gediegen und premium am Bosporus feiern möchten.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie werden Firmen-Yacht-Dinner kalkuliert?",
        a: "Die Kalkulation richtet sich nach Gästezahl, Dauer, Menü- und Getränkeniveau, Transferbedarf und Jachttyp. Alle Dinner sind angebotsbasiert.",
      },
      {
        q: "Erhalten wir eine offizielle Rechnung?",
        a: "Ja. Firmenbuchungen werden mit offizieller Rechnung und vollständiger Vertragsdokumentation für Ihre Finanzabteilung abgewickelt.",
      },
      {
        q: "Warum ein Dinner auf der Jacht statt im Restaurant?",
        a: "Wenn Privatsphäre, Gastgeberkontrolle, Gästeerlebnis und Bosporus-Atmosphäre wichtiger sind als ein fester Veranstaltungsort, ist die Jacht klar überlegen.",
      },
      {
        q: "Welche Catering-Optionen gibt es?",
        a: "Setmenüs, Canapé-Service, Menüs eines Privatkochs oder Cocktail-Empfänge sind möglich. Getränkepakete (mit oder ohne Alkohol) nach Briefing.",
      },
    ],
    ctaWhatsapp: "Per WhatsApp anfragen",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Dîner d'Entreprise Yacht Istanbul 2026 | Dîner Privé Bosphore | MerrySails",
    metaDescription:
      "Dîner d'entreprise sur yacht à Istanbul : dîners d'équipe, réceptions clients et soirées dirigeants sur le Bosphore. Planification orientée dîner, facture officielle.",
    canonicalPath: "/fr/corporate-yacht-dinner-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Dîner d'Entreprise Yacht Istanbul",
    heroTitle: "Dîner d'Entreprise sur Yacht à Istanbul",
    heroSubtitle:
      "Dîners d'équipe, réceptions clients et dîners de direction sur le Bosphore",
    heroDescription:
      "Les dîners d'entreprise MerrySails réservent l'intégralité du yacht lorsque la soirée est clairement orientée dîner : réception clients, dîner exécutif, dîner du conseil ou soirée d'équipe soignée. Flux invités, menu, rythme de service et détails de facturation sont organisés selon votre brief — un format dîner sur mesure plutôt qu'une formule yacht générique.",
    whyHeading: "Pourquoi un dîner d'entreprise à bord ?",
    reasons: [
      {
        title: "Confidentialité et maîtrise de l'hôte",
        desc: "Un cadre plus contrôlé et privé qu'une table de restaurant, le yacht est exclusivement réservé à votre entreprise.",
      },
      {
        title: "Planification orientée dîner",
        desc: "Nombre d'invités, plan de table, préférences de menu et rythme de service sont prioritaires ; bateau et équipage suivent ensuite.",
      },
      {
        title: "Facturation et cadre commercial",
        desc: "Facture officielle, justificatifs adaptés et clarté commerciale conformes aux exigences de votre direction financière.",
      },
    ],
    formatsHeading: "Formats de dîner d'entreprise",
    formats: [
      {
        title: "Dîner de réception clients",
        desc: "Quand le dîner fait partie de la stratégie d'hospitality et doit offrir un cadre plus privé qu'un restaurant.",
      },
      {
        title: "Dîner de direction ou conseil",
        desc: "Quand la maîtrise du timing, la discrétion et une ambiance posée priment sur la production événementielle.",
      },
      {
        title: "Soirée d'équipe soignée",
        desc: "Idéal quand vous préférez un dîner servi élégant à un lancement ou un cocktail debout.",
      },
      {
        title: "Dîner de fin d'année et célébration",
        desc: "Pour les équipes qui souhaitent fêter leurs réussites dans un cadre premium et fidèle à la marque sur le Bosphore.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Comment sont tarifés les dîners d'entreprise sur yacht ?",
        a: "Le tarif dépend du nombre d'invités, de la durée, du niveau du menu et des boissons, des besoins de transfert et du type de bateau. Tous les dîners sont sur devis.",
      },
      {
        q: "Pouvons-nous obtenir une facture officielle ?",
        a: "Oui. Les réservations entreprises sont organisées avec facture officielle et toute la documentation requise par votre direction financière.",
      },
      {
        q: "Pourquoi un dîner sur yacht plutôt qu'au restaurant ?",
        a: "Quand la confidentialité, le contrôle de l'hôte, l'expérience invité et l'atmosphère du Bosphore comptent plus qu'un lieu fixe, le yacht est nettement supérieur.",
      },
      {
        q: "Quelles options de restauration proposez-vous ?",
        a: "Menus servis, service canapés, menus de chef privé ou cocktails dînatoires sont possibles. Les forfaits boissons (avec ou sans alcool) sont composés selon le brief.",
      },
    ],
    ctaWhatsapp: "Demander un devis WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Zakelijk Jachtdiner Istanbul 2026 | Bedrijfsdiner Bosporus | MerrySails",
    metaDescription:
      "Zakelijk jachtdiner Istanbul: teamdiners, klantenontvangst en directiediners op de Bosporus. Diner-gerichte planning, op offerte met officiële factuur.",
    canonicalPath: "/nl/corporate-yacht-dinner-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Zakelijk Jachtdiner Istanbul",
    heroTitle: "Zakelijk Jachtdiner in Istanbul",
    heroSubtitle:
      "Teamdiners, klantenontvangsten en directieavonden op de Bosporus",
    heroDescription:
      "MerrySails zakelijke jachtdiners reserveren het hele jacht wanneer de avond duidelijk diner-gericht is — klantenontvangst, executive-diner, directiediner of een verzorgd teamdiner. Gastenstroom, menu, serviceritme en facturatiedetails worden volgens uw briefing ingericht — geen standaard jachtpakket maar een diner-georiënteerde opzet.",
    whyHeading: "Waarom een zakelijk diner aan boord?",
    reasons: [
      {
        title: "Privacy en gastheercontrole",
        desc: "Een meer gecontroleerde en privé setting dan een restauranttafel; het jacht is exclusief voor uw bedrijf gereserveerd.",
      },
      {
        title: "Diner-gerichte planning",
        desc: "Aantal gasten, tafelschikking, menuvoorkeuren en serviceritme staan centraal; jacht en bemanning volgen die opzet.",
      },
      {
        title: "Officiële factuur en zakelijke afhandeling",
        desc: "Officiële facturatie, juiste documenten en commerciële helderheid zoals uw financiële afdeling die nodig heeft.",
      },
    ],
    formatsHeading: "Formats voor zakelijke diners",
    formats: [
      {
        title: "Klantenontvangst-diner",
        desc: "Wanneer het diner deel uitmaakt van uw hospitality-strategie en de setting privater moet aanvoelen dan een restaurant.",
      },
      {
        title: "Directie- of bestuursdiner",
        desc: "Wanneer timingcontrole, discretie en een rustige sfeer belangrijker zijn dan grote eventproductie.",
      },
      {
        title: "Verzorgde teamavond",
        desc: "Wanneer u een elegant gezeten diner verkiest boven een lancering of staande receptie.",
      },
      {
        title: "Eindejaars- of viering-diner",
        desc: "Voor teams die successen merkconform en stijlvol op de Bosporus willen vieren.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe worden zakelijke jachtdiners geprijsd?",
        a: "De prijs hangt af van aantal gasten, duur, menu- en drankniveau, transferbehoeften en jachttype. Alle diners worden op offerte gepland.",
      },
      {
        q: "Krijgen we een officiële factuur?",
        a: "Ja. Zakelijke boekingen worden afgehandeld met officiële factuur en volledige documenten voor uw financiële afdeling.",
      },
      {
        q: "Waarom een diner op een jacht in plaats van een restaurant?",
        a: "Wanneer privacy, gastheercontrole, gastenervaring en Bosporussfeer belangrijker zijn dan een vaste locatie, is het jacht duidelijk superieur.",
      },
      {
        q: "Welke catering-opties zijn er?",
        a: "Vaste menu's, hapjesservice, menu's van een privékok of cocktaildiners zijn mogelijk. Drankenpakketten (met of zonder alcohol) volgens briefing.",
      },
    ],
    ctaWhatsapp: "Vraag offerte via WhatsApp",
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

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/corporate-yacht-dinner-istanbul");

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
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.heroTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocaleCorporateYachtDinnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.heroTitle,
    description: t.heroDescription,
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.formatsHeading,
      itemListElement: t.formats.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f.title,
          description: f.desc,
        },
      })),
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
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
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

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-3xl mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
              {t.heroDescription}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
              >
                {t.ctaWhatsapp} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </header>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.whyHeading}
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
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.formatsHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.formats.map((item) => (
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
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.faqHeading}
            </h2>
            <div className="space-y-4">
              {t.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                  {t.heroTitle}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                  {t.heroSubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  {t.ctaWhatsapp} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link
              href="/corporate-yacht-dinner-istanbul"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {t.viewInEnglish}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
