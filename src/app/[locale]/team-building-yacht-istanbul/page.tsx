import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heroTitle: string;
  heroDesc: string;
  whyHeading: string;
  reasons: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaDesc: string;
  ctaBtn: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Yat Takım Oluşturma 2026 | Boğaz'da Kurumsal Etkinlik | MerrySails",
    metaDescription:
      "İstanbul'da yat üzerinde takım oluşturma etkinliği: Boğaz'da özel yat, grup dinamiklerini güçlendirme ve kurumsal bağ için özgün bir deneyim.",
    canonicalPath: "/tr/team-building-yacht-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Yat Takım Oluşturma İstanbul",
    eyebrow: "Kurumsal grup etkinliği",
    heroTitle: "İstanbul Yat Takım Oluşturma",
    heroDesc:
      "Ekibinizi Boğaz'da özel bir yat deneyimiyle bir araya getirin. Grup dinamiğini güçlendirmeye odaklanan özel bir format; standart restoran veya konferans salonunun ötesinde.",
    whyHeading: "Neden Yat Üzerinde Takım Oluşturma?",
    reasons: [
      {
        title: "Ortak deneyim",
        desc: "Boğaz'da birlikte geçirilen zaman, paylaşılan anlar ve benzersiz bir mekân, ekip bağını restoran akşam yemeğinden çok daha güçlü bir şekilde pekiştirir.",
      },
      {
        title: "Özel grup formatı",
        desc: "Tüm tekne ekibinize ayrılır; yabancılar yoktur. Aktivite, servis ve program brifinize göre şekillenir.",
      },
      {
        title: "Boğaz manzarası",
        desc: "İstanbul Boğazı köprüleri, yalılar ve siluet manzarası kurumsal buluşmaya akılda kalıcı bir arka plan sunar.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Kaç kişilik gruba uygun?",
        a: "Küçük yönetim ekiplerinden büyük departman gruplarına kadar farklı yat seçenekleri mevcuttur. Grubunuzun büyüklüğünü paylaştığınızda uygun tekne önerilir.",
      },
      {
        q: "Aktivite ve oyun organizasyonu sağlanıyor mu?",
        a: "Evet, talebe bağlı olarak takım aktiviteleri, quiz veya yarışma formatları eklenebilir. Standart akşam yemeği formatından farklı bir brifle başlamak yeterlidir.",
      },
      {
        q: "Faturalı kurumsal hizmet var mı?",
        a: "Evet. Resmi fatura ve kurumsal ödeme belgesi düzenlenir.",
      },
    ],
    ctaHeading: "Brifini paylaşın",
    ctaDesc: "Grup büyüklüğü, tarih ve etkinlik formatını gönderin, hızlıca dönelim.",
    ctaBtn: "WhatsApp ile Teklif Alın",
  },
  de: {
    metaTitle: "Teambuilding Yacht Istanbul 2026 | Bosporus Firmenveranstaltung | MerrySails",
    metaDescription:
      "Teambuilding auf einer Privatyacht am Bosporus in Istanbul: gemeinsame Erlebnisse, exklusive Gruppenformate und Firmenbindung weit über das Restaurantabend hinaus.",
    canonicalPath: "/de/team-building-yacht-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Teambuilding Yacht Istanbul",
    eyebrow: "Corporate Gruppenveranstaltung",
    heroTitle: "Teambuilding Yacht Istanbul",
    heroDesc:
      "Bringen Sie Ihr Team auf einer Privatyacht am Bosporus zusammen. Ein exklusives Format für Teamdynamik und Zusammengehörigkeit — jenseits von Konferenzraum und Restaurantabend.",
    whyHeading: "Warum Teambuilding auf einer Yacht?",
    reasons: [
      {
        title: "Gemeinsames Erlebnis",
        desc: "Die gemeinsame Zeit auf dem Bosporus, geteilte Momente und ein einzigartiger Ort stärken den Teamzusammenhalt weit mehr als ein gewöhnliches Abendessen.",
      },
      {
        title: "Exklusives Gruppenformat",
        desc: "Das gesamte Schiff gehört Ihrem Team — keine Fremden. Aktivitäten, Service und Programm werden nach Ihrem Brief gestaltet.",
      },
      {
        title: "Bosporus-Panorama",
        desc: "Brücken, Yalis und Skyline des Bosporus bieten eine einprägsame Kulisse für Ihre Firmenveranstaltung.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Für wie viele Personen ist es geeignet?",
        a: "Von kleinen Führungsteams bis zu größeren Abteilungsgruppen stehen verschiedene Yachten zur Verfügung. Teilen Sie Ihre Gruppengröße mit, und wir empfehlen das passende Schiff.",
      },
      {
        q: "Können Teamaktivitäten organisiert werden?",
        a: "Ja, auf Wunsch können Teamaktivitäten, Quiz oder Wettbewerbsformate hinzugefügt werden. Ein entsprechender Brief reicht aus.",
      },
      {
        q: "Wird eine offizielle Rechnung ausgestellt?",
        a: "Ja. Offizielle Rechnungen und Unterlagen für den Firmenzahlungsprozess werden bereitgestellt.",
      },
    ],
    ctaHeading: "Brief anfragen",
    ctaDesc: "Teilen Sie Gruppengröße, Datum und Veranstaltungsformat mit — wir antworten schnell.",
    ctaBtn: "Angebot via WhatsApp",
  },
  fr: {
    metaTitle: "Team Building Yacht Istanbul 2026 | Événement d'Entreprise Bosphore | MerrySails",
    metaDescription:
      "Team building sur yacht privé au Bosphore à Istanbul : expériences partagées, format de groupe exclusif et cohésion d'équipe bien au-delà d'un dîner en restaurant.",
    canonicalPath: "/fr/team-building-yacht-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Team Building Yacht Istanbul",
    eyebrow: "Événement groupe corporate",
    heroTitle: "Team Building sur Yacht à Istanbul",
    heroDesc:
      "Réunissez votre équipe sur un yacht privé au Bosphore. Un format exclusif pour renforcer la dynamique d'équipe et les liens — bien au-delà de la salle de conférence et du dîner en restaurant.",
    whyHeading: "Pourquoi le team building sur yacht ?",
    reasons: [
      {
        title: "Expérience partagée",
        desc: "Le temps passé ensemble sur le Bosphore, les moments partagés et un lieu unique renforcent les liens d'équipe bien plus qu'un dîner ordinaire.",
      },
      {
        title: "Format de groupe exclusif",
        desc: "Le bateau entier est réservé à votre équipe — aucun inconnu. Activités, service et programme sont façonnés selon votre brief.",
      },
      {
        title: "Panorama du Bosphore",
        desc: "Les ponts, yalıs et skyline du Bosphore offrent une toile de fond mémorable pour votre événement d'entreprise.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Pour combien de personnes est-ce adapté ?",
        a: "Des petites équipes dirigeantes aux grands groupes départementaux, différents yachts sont disponibles. Partagez la taille de votre groupe et nous recommandons le bateau approprié.",
      },
      {
        q: "Des activités de team building peuvent-elles être organisées ?",
        a: "Oui, des activités d'équipe, quiz ou formats de compétition peuvent être ajoutés sur demande. Un brief correspondant suffit.",
      },
      {
        q: "Une facture officielle est-elle émise ?",
        a: "Oui. Des factures officielles et documents pour le processus de paiement d'entreprise sont fournis.",
      },
    ],
    ctaHeading: "Partagez votre brief",
    ctaDesc: "Envoyez la taille du groupe, la date et le format de l'événement — nous répondons rapidement.",
    ctaBtn: "Devis via WhatsApp",
  },
  nl: {
    metaTitle: "Teambuilding Jacht Istanbul 2026 | Bosporus Bedrijfsevenement | MerrySails",
    metaDescription:
      "Teambuilding op een privéjacht aan de Bosporus in Istanbul: gedeelde ervaringen, exclusief groepsformaat en bedrijfscohesie ver boven een restaurantavond.",
    canonicalPath: "/nl/team-building-yacht-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Teambuilding Jacht Istanbul",
    eyebrow: "Corporate groepsevenement",
    heroTitle: "Teambuilding op Jacht in Istanbul",
    heroDesc:
      "Breng uw team samen op een privéjacht aan de Bosporus. Een exclusief format voor teamdynamiek en saamhorigheid — ver boven de vergaderzaal en het restaurantdiner.",
    whyHeading: "Waarom teambuilding op een jacht?",
    reasons: [
      {
        title: "Gedeelde ervaring",
        desc: "De gezamenlijke tijd op de Bosporus, gedeelde momenten en een unieke locatie versterken de teamband veel meer dan een gewoon diner.",
      },
      {
        title: "Exclusief groepsformaat",
        desc: "Het hele schip is voor uw team — geen vreemden. Activiteiten, service en programma worden vormgegeven op basis van uw brief.",
      },
      {
        title: "Bosporus-panorama",
        desc: "De bruggen, yalı's en skyline van de Bosporus bieden een onvergetelijke achtergrond voor uw bedrijfsevenement.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Voor hoeveel personen is het geschikt?",
        a: "Van kleine leiderschapsteams tot grotere afdelingsgroepen zijn er verschillende jachten beschikbaar. Deel uw groepsgrootte en wij bevelen het passende schip aan.",
      },
      {
        q: "Kunnen teamactiviteiten worden georganiseerd?",
        a: "Ja, op verzoek kunnen teamactiviteiten, quizzen of wedstrijdformaten worden toegevoegd. Een bijbehorende brief volstaat.",
      },
      {
        q: "Wordt er een officiële factuur uitgesteld?",
        a: "Ja. Officiële facturen en documenten voor het bedrijfsbetalingsproces worden verstrekt.",
      },
    ],
    ctaHeading: "Deel uw brief",
    ctaDesc: "Stuur de groepsgrootte, datum en het evenementformaat — wij reageren snel.",
    ctaBtn: "Offerte via WhatsApp",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TRANSLATIONS[locale];
  if (!t) return {};
  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/team-building-yacht-istanbul");
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: canonicalUrl, languages },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function TeamBuildingYachtLocalePage({
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
    "@type": ["TouristTrip", "Service"],
    name: t.heroTitle,
    description: t.metaDescription,
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    serviceType: "Team Building Yacht",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
          <span>/</span>
          <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-3">{t.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">{t.heroTitle}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">{t.heroDesc}</p>
        </div>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-5">{t.whyHeading}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.reasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{r.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-4">{t.faqHeading}</h2>
          <div className="space-y-3">
            {t.faqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                  {faq.q}
                  <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl bg-[var(--brand-primary)] p-8 text-center text-white">
          <h2 className="text-xl font-bold text-white mb-2">{t.ctaHeading}</h2>
          <p className="text-white/80 mb-5 text-sm">{t.ctaDesc}</p>
          <a
            href="https://wa.me/905370406822"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
