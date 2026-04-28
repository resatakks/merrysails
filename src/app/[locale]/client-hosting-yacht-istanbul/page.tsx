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
      "Müşteri Ağırlama Yatı İstanbul 2026 | Boğaz'da Özel Misafir Akşamı | MerrySails",
    metaDescription:
      "İstanbul'da müşteri ağırlama için özel yat: yatırımcı, partner ve VIP misafir akşamları için Boğaz'da kurumsal hospitality. Faturalı, brife özel planlama.",
    canonicalPath: "/tr/client-hosting-yacht-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Müşteri Ağırlama Yatı İstanbul",
    heroTitle: "İstanbul'da Müşteri Ağırlama Yatı",
    heroSubtitle:
      "VIP müşteri, yatırımcı ve partner akşamları için Boğaz'da özel yat",
    heroDescription:
      "MerrySails müşteri ağırlama programları; misafir deneyimi, ev sahipliği kontrolü ve kurumsal izlenim ön planda olduğunda Boğaz'da tüm tekneyi şirketinize tahsis eder. Yönetici akşam yemekleri, yatırımcı ağırlama ve partner buluşmaları; konuk akışı, ikram ve transfer detayları brifinize göre özel olarak kurgulanır.",
    whyHeading: "Müşteri Ağırlama İçin Neden MerrySails?",
    reasons: [
      {
        title: "Misafir deneyimi odaklı planlama",
        desc: "Konuğunuzun ne hissetmesini, neyi fark etmesini ve neyi hatırlamasını istediğinizden başlarız; tekne ve servis kurgusu bu deneyim hedefine göre şekillenir.",
      },
      {
        title: "Mahremiyet ve ev sahipliği kontrolü",
        desc: "Restoran veya otel ortamından farklı olarak misafir listenize özel, dış akışın olmadığı sakin bir ev sahipliği ortamı sunarız. Zamanlama tamamen sizin kontrolünüzdedir.",
      },
      {
        title: "Kurumsal belge ve faturalama",
        desc: "Resmi fatura, kurumsal sözleşme ve mali müşavir taleplerine uygun belge düzeniyle yatırımcı ve partner ağırlamasının ticari yanı eksiksiz çözülür.",
      },
    ],
    formatsHeading: "Müşteri Ağırlama Formatları",
    formats: [
      {
        title: "Yönetici ağırlama akşam yemeği",
        desc: "Üst düzey, küçük misafir listelerinde mahremiyet, zamanlama ve servis ritminin ön planda olduğu özel akşamlar için ideal.",
      },
      {
        title: "İlişki odaklı Boğaz turu",
        desc: "Boğaz manzarasının ve sakin atmosferin deneyimin büyük kısmını taşıdığı, daha hafif tempolu ev sahipliği formatları.",
      },
      {
        title: "Yatırımcı ve partner ağırlama",
        desc: "Kamuya açık bir aktiviteye dönüşmeden, kontrollü ve premium bir ortamda yatırımcı veya iş ortağı buluşmaları.",
      },
      {
        title: "Akşam yemeği + ağırlama programı",
        desc: "Hem oturma düzenli yemek hem de misafirlerle özel görüşme zamanı isteyen kurumsal akşamlar.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Müşteri ağırlama nasıl fiyatlandırılır?",
        a: "Fiyatlandırma; misafir sayısı, akşamın tempo ve resmiyeti, ikram seviyesi ve gerekli teknenin tipine göre değişir. Tüm ağırlama programları teklif bazlı planlanır.",
      },
      {
        q: "Resmi fatura ve kurumsal sözleşme yapılabilir mi?",
        a: "Evet. Şirket adına resmi fatura kesilir; finans ekibinizin ihtiyaç duyduğu sözleşme ve belge detayları sözleşme aşamasında netleştirilir.",
      },
      {
        q: "Hangi ağırlama formatları yat üzerinde işler?",
        a: "Yönetici akşam yemekleri, özel ağırlama turları, yatırımcı buluşmaları, partner akşamları ve ilişki odaklı küçük şirket akşamları Boğaz'da rahatlıkla planlanabilir.",
      },
      {
        q: "Her ağırlama büyük markalı kurulum gerektirir mi?",
        a: "Hayır. Bazı ağırlama programları kasıtlı olarak sade ve mahrem tutulur; bazıları ise daha güçlü ikram, branding veya transfer desteği gerektirebilir. Brifinize göre kurgulanır.",
      },
    ],
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Kundenempfang Jacht Istanbul 2026 | VIP-Hospitality am Bosporus | MerrySails",
    metaDescription:
      "Privater Kundenempfang am Bosporus: Investorenabende, Partner-Hospitality und VIP-Gästeempfänge auf privater Jacht in Istanbul. Briefingbasiert, mit Rechnung.",
    canonicalPath: "/de/client-hosting-yacht-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kundenempfang Jacht Istanbul",
    heroTitle: "Kundenempfang auf privater Jacht in Istanbul",
    heroSubtitle:
      "VIP-Gäste, Investoren und Geschäftspartner am Bosporus stilvoll empfangen",
    heroDescription:
      "MerrySails Hospitality-Programme stellen die gesamte Jacht exklusiv zur Verfügung, wenn Gästeerlebnis, Gastgeberkontrolle und unternehmerischer Eindruck im Vordergrund stehen. Executive-Abendessen, Investorenempfänge und Partnerveranstaltungen werden mit individuell geplantem Gästefluss, Catering und Transferkonzept umgesetzt – kein Standardpaket.",
    whyHeading: "Warum MerrySails für den Kundenempfang?",
    reasons: [
      {
        title: "Gästeerlebnis-orientierte Planung",
        desc: "Wir starten mit der Frage, was Ihre Gäste wahrnehmen, fühlen und mitnehmen sollen. Jacht und Servicekonzept richten sich danach.",
      },
      {
        title: "Diskretion und Gastgeberkontrolle",
        desc: "Anders als in Restaurant oder Hotel haben Sie volle Kontrolle über Gästeliste, Timing und Atmosphäre – ohne Fremdverkehr an Bord.",
      },
      {
        title: "Rechnung und Geschäftsabwicklung",
        desc: "Offizielle Rechnungsstellung, ordnungsgemäße Vertragsdokumente und kommerzielle Klarheit für Ihre Finanzabteilung.",
      },
    ],
    formatsHeading: "Hospitality-Formate",
    formats: [
      {
        title: "Executive-Empfangsdinner",
        desc: "Ideal für kleinere Senior-Gästegruppen, bei denen Privatsphäre, Timing und Servicerhythmus wichtiger sind als die Größe der Veranstaltung.",
      },
      {
        title: "Beziehungsorientierte Bosporus-Fahrt",
        desc: "Für leichtere Hospitality-Formate, in denen vor allem die Bosporus-Atmosphäre selbst die Erfahrung trägt.",
      },
      {
        title: "Investoren- und Partner-Empfang",
        desc: "Premium und kontrolliert – ohne öffentliche Aktivierung. Geeignet für strategische Investoren- oder Partnerabende.",
      },
      {
        title: "Dinner und Hospitality-Programm",
        desc: "Wenn sowohl ein gesetztes Dinner als auch Zeit für persönliche Gespräche im privaten Rahmen Teil des Abends sind.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie wird Kundenempfang an Bord kalkuliert?",
        a: "Die Kalkulation richtet sich nach Gästezahl, Dauer und Format des Abends, Catering-Niveau und passender Jacht. Alle Hospitality-Anfragen sind angebotsbasiert.",
      },
      {
        q: "Erhalten wir eine offizielle Rechnung?",
        a: "Ja. Firmenbuchungen werden mit offizieller Rechnung und allen für Ihre Finanzabteilung erforderlichen Vertragsunterlagen abgewickelt.",
      },
      {
        q: "Welche Hospitality-Formate funktionieren an Bord?",
        a: "Executive-Dinner, private Hospitality-Fahrten, Investorenempfang, Partnerabende und kleinere beziehungsorientierte Firmenabende sind auf einer privaten Bosporus-Jacht sehr gut umsetzbar.",
      },
      {
        q: "Brauchen alle Empfänge ein großes Branding-Setup?",
        a: "Nein. Manche Hospitality-Briefings bleiben bewusst zurückhaltend und privat; andere benötigen stärkeres Catering, Branding oder Transfersupport rund um die Gästeerfahrung.",
      },
    ],
    ctaWhatsapp: "Per WhatsApp anfragen",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Yacht Réception Clients Istanbul 2026 | Hospitality VIP sur le Bosphore | MerrySails",
    metaDescription:
      "Réception clients sur yacht privé à Istanbul : soirées investisseurs, hospitality partenaires et accueil VIP sur le Bosphore. Sur devis, facture officielle.",
    canonicalPath: "/fr/client-hosting-yacht-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Yacht Réception Clients Istanbul",
    heroTitle: "Yacht Privé pour Réception Clients à Istanbul",
    heroSubtitle:
      "Soirées VIP, investisseurs et partenaires sur le Bosphore en cadre privé",
    heroDescription:
      "Les programmes d'hospitality MerrySails réservent l'intégralité du yacht lorsque l'expérience invitée, le contrôle de l'hôte et l'image d'entreprise comptent avant tout. Dîners exécutifs, réceptions investisseurs et soirées partenaires sont organisés selon votre brief : flux invités, restauration et logistique de transfert sur mesure, pas de formule standard.",
    whyHeading: "Pourquoi MerrySails pour vos réceptions clients ?",
    reasons: [
      {
        title: "Planification centrée sur l'invité",
        desc: "Nous partons de ce que vous voulez que vos invités ressentent et retiennent ; le yacht et le service s'adaptent à cette intention.",
      },
      {
        title: "Discrétion et maîtrise de l'hôte",
        desc: "Contrairement à un restaurant ou un hôtel, vous gardez le contrôle total sur la liste, le rythme et l'atmosphère, sans autres convives à bord.",
      },
      {
        title: "Facturation et cadre commercial",
        desc: "Facture officielle, documentation conforme et clarté commerciale pour votre direction financière.",
      },
    ],
    formatsHeading: "Formats de réception clients",
    formats: [
      {
        title: "Dîner exécutif d'accueil",
        desc: "Idéal pour les listes restreintes de cadres supérieurs où la confidentialité, le timing et le rythme du service priment sur l'échelle.",
      },
      {
        title: "Croisière relationnelle",
        desc: "Pour des formats plus légers où le Bosphore lui-même porte l'essentiel de l'expérience.",
      },
      {
        title: "Hospitality investisseurs et partenaires",
        desc: "Premium et contrôlé, sans devenir une activation publique. Adapté aux soirées stratégiques avec investisseurs ou partenaires clés.",
      },
      {
        title: "Dîner et soirée hospitality",
        desc: "Pour combiner un dîner servi et un temps d'échange privé avec les invités.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Comment sont tarifées les réceptions clients ?",
        a: "Le tarif dépend du nombre d'invités, du format de la soirée, du niveau de restauration et du type de bateau adapté au brief. Toutes les demandes hospitality sont sur devis.",
      },
      {
        q: "Pouvons-nous obtenir une facture officielle ?",
        a: "Oui. Les réservations entreprises sont organisées avec facture officielle et l'ensemble des documents requis par votre service financier.",
      },
      {
        q: "Quels formats hospitality fonctionnent à bord ?",
        a: "Dîners exécutifs, croisières d'hospitality privée, réceptions investisseurs, soirées partenaires et soirées d'entreprise relationnelles fonctionnent très bien sur un yacht privé du Bosphore.",
      },
      {
        q: "Faut-il toujours un dispositif de marque imposant ?",
        a: "Non. Certaines réceptions sont volontairement sobres et privées ; d'autres demandent un catering renforcé, un branding ou un soutien transfert plus structuré.",
      },
    ],
    ctaWhatsapp: "Demander un devis WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Klantenontvangst Jacht Istanbul 2026 | VIP-hospitality Bosporus | MerrySails",
    metaDescription:
      "Klantenontvangst op een privéjacht in Istanbul: investeerdersavonden, partner-hospitality en VIP-ontvangsten op de Bosporus. Op offerte, met officiële factuur.",
    canonicalPath: "/nl/client-hosting-yacht-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Klantenontvangst Jacht Istanbul",
    heroTitle: "Klantenontvangst op een Privéjacht in Istanbul",
    heroSubtitle:
      "VIP-gasten, investeerders en partners op de Bosporus in een privésetting ontvangen",
    heroDescription:
      "MerrySails hospitality-programma's reserveren het hele jacht exclusief wanneer gastenervaring, gastheercontrole en bedrijfsindruk vooropstaan. Executive-diners, investeerdersontvangsten en partnerbijeenkomsten worden volgens uw briefing ingericht — gastenstroom, catering en transferplanning op maat, geen standaardpakket.",
    whyHeading: "Waarom MerrySails voor klantenontvangst?",
    reasons: [
      {
        title: "Planning vanuit gastenervaring",
        desc: "We beginnen bij wat uw gasten moeten ervaren en onthouden; jacht en service worden daarop afgestemd.",
      },
      {
        title: "Discretie en gastheercontrole",
        desc: "Anders dan bij een restaurant of hotel houdt u volledige controle over gastenlijst, timing en sfeer, zonder andere bezoekers aan boord.",
      },
      {
        title: "Officiële factuur en zakelijke afhandeling",
        desc: "Officiële facturatie, juiste contractdocumenten en commerciële helderheid voor uw financiële afdeling.",
      },
    ],
    formatsHeading: "Hospitality-formats",
    formats: [
      {
        title: "Executive ontvangstdiner",
        desc: "Ideaal voor kleinere senior gastenlijsten waar privacy, timing en serviceritme belangrijker zijn dan schaal.",
      },
      {
        title: "Relatie-georiënteerde Bosporusvaart",
        desc: "Voor lichtere hospitality-formats waarbij vooral de Bosporussfeer de ervaring draagt.",
      },
      {
        title: "Investeerders- en partnerontvangst",
        desc: "Premium en gecontroleerd, zonder publieke activatie. Geschikt voor strategische avonden met investeerders of belangrijke partners.",
      },
      {
        title: "Diner met hospitality-avond",
        desc: "Voor wie zowel een gezeten diner als ruimte voor persoonlijke gesprekken in een privésetting wil.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe wordt klantenontvangst aan boord geprijsd?",
        a: "De prijs hangt af van aantal gasten, het formaat van de avond, het cateringniveau en het passende jachttype. Alle hospitality-aanvragen worden op offerte gepland.",
      },
      {
        q: "Krijgen we een officiële factuur?",
        a: "Ja. Zakelijke boekingen worden verwerkt met officiële factuur en alle documenten die uw financiële afdeling nodig heeft.",
      },
      {
        q: "Welke hospitality-formats werken aan boord?",
        a: "Executive-diners, privé hospitality-vaarten, investeerdersontvangst, partneravonden en kleinere relatiegerichte bedrijfsavonden zijn allemaal goed te organiseren.",
      },
      {
        q: "Heeft elke ontvangst een grote brandinginrichting nodig?",
        a: "Nee. Sommige hospitality-briefings blijven bewust ingetogen en privé; andere vragen om uitgebreidere catering, branding of transfersupport.",
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
  const languages = buildHreflang("/client-hosting-yacht-istanbul");

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

export default async function LocaleClientHostingYachtPage({
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
              href="/client-hosting-yacht-istanbul"
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
