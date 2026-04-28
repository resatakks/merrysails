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
      "Kurumsal Tekne Etkinliği İstanbul 2026 | Boğaz'da Şirket Etkinliği | MerrySails",
    metaDescription:
      "Boğaz'da kurumsal etkinlik: şirket akşam yemeği, müşteri ağırlama, lansman ve ekip toplantıları için özel yat. Teklif bazlı planlama, faturalı kurumsal hizmet.",
    canonicalPath: "/tr/corporate-events",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Kurumsal Etkinlikler",
    heroTitle: "İstanbul Kurumsal Tekne Etkinliği",
    heroSubtitle:
      "Şirket akşam yemekleri, müşteri ağırlama ve lansmanlar için Boğaz'da özel yat",
    heroDescription:
      "MerrySails kurumsal tekne etkinlikleri; ekip akşam yemeği, müşteri ağırlama, ürün lansmanı ve şirket akşamları için tüm tekneyi şirketinize tahsis eder. Konuk akışı, ikram, marka kurulumu ve faturalama detayları brifinize göre planlanır; standart yat paketi yerine etkinliğinize özel kurgu sunulur.",
    whyHeading: "Boğaz'da Kurumsal Etkinlik Neden MerrySails?",
    reasons: [
      {
        title: "Brife özel planlama",
        desc: "Konuk listesi, saat ve servis ihtiyaçları önce alınır; tekne ve ticari yapı brifinize uygun şekilde kurgulanır. Genel paket dayatılmaz.",
      },
      {
        title: "Faturalı kurumsal hizmet",
        desc: "Resmi fatura, kurumsal ödeme süreci ve mali müşavir taleplerine uygun belge düzeniyle finans ekibinizin ihtiyaç duyduğu ticari netlik sağlanır.",
      },
      {
        title: "Marka ve sahne desteği",
        desc: "Ürün lansmanı, sunum, mikrofon, ekran, marka kurulumu ve fotoğraf/video desteği etkinliğinize göre eklenir. Boğaz manzarası kurumsal hikâyenize sahne olur.",
      },
    ],
    formatsHeading: "Kurumsal Etkinlik Formatları",
    formats: [
      {
        title: "Şirket akşam yemeği",
        desc: "Ekibi tek bir özel mekânda toplamak istediğinizde ideal. Oturma düzeni, menü ve servis akışı brifinize göre planlanır.",
      },
      {
        title: "Müşteri ağırlama",
        desc: "Standart bir restoran veya otel ortamından daha akılda kalıcı bir atmosfer aradığınız müşteri akşamları için uygundur.",
      },
      {
        title: "Ürün lansmanı / showcase",
        desc: "Görsel etki, zamanlama ve markalı kurulumun mekânın kendisi kadar önemli olduğu lansman ve tanıtım organizasyonları.",
      },
      {
        title: "Yönetim kurulu / liderlik akşamı",
        desc: "Mahremiyet, zaman kontrolü ve sakin bir gemi atmosferinin ön planda olduğu yönetim kurulu ve liderlik buluşmaları.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Kurumsal tekne etkinliği nasıl fiyatlandırılır?",
        a: "Fiyatlandırma; konuk sayısı, zamanlama, ikram seviyesi, marka kurulumu ihtiyacı ve etkinlik brifine uygun teknenin tipine göre değişir. Tüm etkinliklerimiz teklif bazlı planlanır.",
      },
      {
        q: "Resmi fatura kesilebiliyor mu?",
        a: "Evet. Kurumsal rezervasyonlar resmi fatura ile düzenlenebilir; finans ekibinizin ihtiyaç duyduğu ticari belge ayrıntıları sözleşme aşamasında netleştirilir.",
      },
      {
        q: "Hangi şirket etkinlikleri tekneye uygundur?",
        a: "Ekip akşam yemekleri, müşteri ağırlama, yönetim kurulu yemekleri, ürün lansmanları, teşvik akşamları ve şirket kutlamalarının tamamı Boğaz'da rahatlıkla planlanabilir.",
      },
      {
        q: "Catering ve içecek seçenekleri nelerdir?",
        a: "Set menü, kokteyl prolonge, kanepe servisi veya özel şef menüsü gibi farklı seviyelerde catering kurgulanır. Alkollü/alkolsüz içecek paketi brifinize göre eklenir.",
      },
    ],
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Firmenveranstaltung Bosporus 2026 | Firmenevents Istanbul | MerrySails",
    metaDescription:
      "Firmenevents Istanbul auf dem Bosporus: Teamdinner, Kundenveranstaltung, Produktlaunch und Führungsabende auf privater Jacht. Angebotsbasierte Planung mit Rechnung.",
    canonicalPath: "/de/corporate-events",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Firmenveranstaltungen",
    heroTitle: "Firmenveranstaltung auf dem Bosporus",
    heroSubtitle:
      "Teamdinner, Kundenveranstaltungen und Produktlaunches auf einer privaten Jacht in Istanbul",
    heroDescription:
      "MerrySails Firmenevents stellen die gesamte Jacht für Teamdinner, Kundenveranstaltungen, Produktlaunches und Firmenabende exklusiv zur Verfügung. Gästefluss, Catering, Branding und Rechnungsdetails werden nach Ihrem Briefing geplant – statt eines Standard-Yacht-Pakets erhalten Sie ein auf Ihr Event zugeschnittenes Konzept.",
    whyHeading: "Warum MerrySails für Firmenevents in Istanbul?",
    reasons: [
      {
        title: "Briefing-basierte Planung",
        desc: "Gästeliste, Timing und Servicebedarf werden zuerst geklärt; Jacht und Vertragsstruktur passen sich dem Event an, kein generisches Paket.",
      },
      {
        title: "Rechnung und Geschäftsabwicklung",
        desc: "Offizielle Rechnungsstellung, ordnungsgemäße Belege und kommerzielle Klarheit, wie sie Finanzabteilungen benötigen.",
      },
      {
        title: "Branding und Bühnenservice",
        desc: "Produktlaunch-Setup, Präsentationen, Mikrofone, Bildschirme, Marken-Branding und Foto-/Videounterstützung sind nach Bedarf buchbar.",
      },
    ],
    formatsHeading: "Formate für Firmenveranstaltungen",
    formats: [
      {
        title: "Firmen-Teamdinner",
        desc: "Ideal, wenn das gesamte Team in einem privaten Rahmen zusammenkommen soll – mit klarer Sitzordnung, Menü und Serviceablauf.",
      },
      {
        title: "Kundenveranstaltung",
        desc: "Geeignet, wenn der Abend einen einprägsameren Rahmen braucht als ein klassisches Restaurant oder Hotel.",
      },
      {
        title: "Produktlaunch / Showcase",
        desc: "Für Launches und Showcases, bei denen visuelle Wirkung, Timing und Branding ebenso wichtig sind wie der Veranstaltungsort.",
      },
      {
        title: "Vorstands- oder Führungsabend",
        desc: "Wenn Diskretion, Zeitkontrolle und eine ruhige Atmosphäre wichtiger sind als die reine Größe der Veranstaltung.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie werden Firmenevents auf der Jacht kalkuliert?",
        a: "Die Kalkulation richtet sich nach Gästezahl, Timing, Catering-Niveau, Branding-Bedarf und der für das Briefing passenden Jacht. Alle Firmenevents sind angebotsbasiert.",
      },
      {
        q: "Erhalten wir eine offizielle Rechnung?",
        a: "Ja. Firmenbuchungen werden mit offizieller Rechnung abgewickelt; alle für Ihre Finanzabteilung erforderlichen Belege werden im Vertrag geregelt.",
      },
      {
        q: "Welche Firmenevents passen an Bord?",
        a: "Teamdinner, Kundenveranstaltungen, Vorstandsdinner, Launches, Incentive-Abende und Firmenfeiern lassen sich auf dem Bosporus sehr gut umsetzen.",
      },
      {
        q: "Welche Catering- und Getränkeoptionen gibt es?",
        a: "Setmenüs, Cocktail-Empfänge, Canapé-Service oder Menüs eines Privatkochs sind möglich. Getränkepakete (mit oder ohne Alkohol) werden nach Briefing zusammengestellt.",
      },
    ],
    ctaWhatsapp: "Per WhatsApp anfragen",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Événement d'Entreprise Bosphore 2026 | Soirée d'Entreprise Istanbul | MerrySails",
    metaDescription:
      "Événement d'entreprise sur le Bosphore : dîner d'équipe, réception clients, lancement et soirée d'entreprise sur yacht privé. Planification sur devis, facture officielle.",
    canonicalPath: "/fr/corporate-events",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Événements d'entreprise",
    heroTitle: "Événement d'Entreprise sur le Bosphore",
    heroSubtitle:
      "Dîners d'équipe, réceptions clients et lancements à Istanbul sur yacht privé",
    heroDescription:
      "Les événements d'entreprise MerrySails réservent l'intégralité du yacht pour vos dîners d'équipe, réceptions clients, lancements de produits ou soirées d'entreprise. Flux invités, restauration, signalétique de marque et facturation sont organisés selon votre brief — vous obtenez un format sur mesure plutôt qu'une formule yacht générique.",
    whyHeading: "Pourquoi MerrySails pour vos événements d'entreprise ?",
    reasons: [
      {
        title: "Planification orientée brief",
        desc: "Liste d'invités, horaires et besoins de service sont clarifiés en premier ; le yacht et la structure commerciale s'adaptent à l'événement, sans formule imposée.",
      },
      {
        title: "Facture et cadre commercial",
        desc: "Facture officielle, justificatifs adaptés et clarté commerciale conformes aux exigences de votre direction financière.",
      },
      {
        title: "Branding et support scénique",
        desc: "Installation pour lancement produit, présentations, micros, écrans, branding et soutien photo/vidéo en option selon votre événement.",
      },
    ],
    formatsHeading: "Formats d'événements d'entreprise",
    formats: [
      {
        title: "Dîner d'équipe",
        desc: "Idéal pour réunir l'ensemble de l'équipe dans un cadre privé avec une organisation simple : plan de table, menu et service à votre image.",
      },
      {
        title: "Réception clients",
        desc: "Adapté quand l'événement doit offrir une atmosphère plus mémorable qu'un restaurant ou un hôtel classique.",
      },
      {
        title: "Lancement de produit / showcase",
        desc: "Pour les lancements où l'impact visuel, le timing et l'installation brandée comptent autant que le lieu lui-même.",
      },
      {
        title: "Dîner conseil d'administration",
        desc: "Quand la confidentialité, la maîtrise du timing et une ambiance posée comptent plus que la taille de l'événement.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Comment sont tarifés les événements d'entreprise sur yacht ?",
        a: "Le tarif dépend du nombre d'invités, des horaires, du niveau de restauration, des besoins de branding et du type de bateau adapté au brief. Tous nos événements sont sur devis.",
      },
      {
        q: "Pouvons-nous obtenir une facture officielle ?",
        a: "Oui. Les réservations entreprises sont organisées avec facture officielle et l'ensemble des justificatifs requis par votre service financier.",
      },
      {
        q: "Quels types d'événements d'entreprise fonctionnent à bord ?",
        a: "Dîners d'équipe, réceptions clients, dîners de direction, lancements, soirées incentive et célébrations d'entreprise se déroulent très bien sur le Bosphore.",
      },
      {
        q: "Quelles options de restauration et boissons proposez-vous ?",
        a: "Menu servi, cocktail dînatoire, service canapés ou menu sur mesure d'un chef privé. Les forfaits boissons (avec ou sans alcool) sont composés selon votre brief.",
      },
    ],
    ctaWhatsapp: "Demander un devis WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Zakelijk Evenement Bosporus 2026 | Bedrijfsfeest Istanbul | MerrySails",
    metaDescription:
      "Zakelijk evenement op de Bosporus: teamdiner, klantenontvangst, productlancering en bedrijfsfeest Istanbul op een privéjacht. Op offerte, met officiële factuur.",
    canonicalPath: "/nl/corporate-events",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Zakelijke evenementen",
    heroTitle: "Zakelijk Evenement op de Bosporus",
    heroSubtitle:
      "Teamdiners, klantenontvangsten en productlanceringen in Istanbul op een privéjacht",
    heroDescription:
      "MerrySails zakelijke evenementen reserveren het hele jacht exclusief voor uw teamdiner, klantenontvangst, productlancering of bedrijfsavond. Gastenstroom, catering, branding en facturatie worden volgens uw briefing ingericht — geen standaard jachtpakket maar een opzet die past bij uw evenement.",
    whyHeading: "Waarom MerrySails voor uw bedrijfsevent?",
    reasons: [
      {
        title: "Planning op basis van uw briefing",
        desc: "Gastenlijst, timing en servicewensen worden eerst besproken; jacht en commerciële structuur volgen het evenement, geen standaardpakket.",
      },
      {
        title: "Officiële factuur en zakelijke afhandeling",
        desc: "Officiële facturatie, juiste documenten en commerciële helderheid zoals uw financiële afdeling die nodig heeft.",
      },
      {
        title: "Branding en podiumondersteuning",
        desc: "Setup voor productlancering, presentaties, microfoons, schermen, brand-styling en foto/video-ondersteuning volgens uw event.",
      },
    ],
    formatsHeading: "Formats voor bedrijfsevents",
    formats: [
      {
        title: "Teamdiner",
        desc: "Ideaal als u het hele team in een privésetting wilt samenbrengen met een heldere zit-, menu- en serviceflow.",
      },
      {
        title: "Klantenontvangst",
        desc: "Past wanneer het evenement een memorabelere sfeer vraagt dan een gewoon restaurant of hotel.",
      },
      {
        title: "Productlancering / showcase",
        desc: "Voor lanceringen waar visuele impact, timing en gebrande inrichting net zo belangrijk zijn als de locatie zelf.",
      },
      {
        title: "Bestuurs- of directieavond",
        desc: "Wanneer privacy, timingcontrole en een rustige sfeer aan boord belangrijker zijn dan schaal.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe worden zakelijke jachtevents geprijsd?",
        a: "De prijs hangt af van het aantal gasten, timing, het niveau van catering, brandingbehoeften en het type jacht dat bij de briefing past. Alle events worden op offerte gepland.",
      },
      {
        q: "Krijgen we een officiële factuur?",
        a: "Ja. Zakelijke boekingen worden verwerkt met een officiële factuur en alle commerciële documenten die uw financiële afdeling nodig heeft.",
      },
      {
        q: "Welke bedrijfsevents passen aan boord?",
        a: "Teamdiners, klantenontvangsten, directiediners, lanceringen, incentive-avonden en bedrijfsfeesten zijn allemaal goed te organiseren op de Bosporus.",
      },
      {
        q: "Welke catering- en drankopties zijn er?",
        a: "Een vast menu, walking dinner, hapjesservice of een op maat gemaakt menu van een privékok behoort tot de mogelijkheden. Drankenpakketten (met of zonder alcohol) worden samengesteld op basis van uw briefing.",
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
  const languages = buildHreflang("/corporate-events");

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

export default async function LocaleCorporateEventsPage({
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
              href="/corporate-events"
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
