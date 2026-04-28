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
  mainPageLabel: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Türk Gecesi Akşam Yemeği Turu 2026 | Boğaz'da Türk Gecesi | MerrySails",
    metaDescription:
      "İstanbul Türk gecesi akşam yemeği turu: Boğaz'da Türk müziği, halk oyunları gösterisi ve akşam yemeğiyle paylaşımlı gece turu. Paket karşılaştırması ve rezervasyon.",
    canonicalPath: "/tr/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Türk Gecesi Akşam Yemeği Turu",
    eyebrow: "Paylaşımlı akşam yemeği turu",
    heroTitle: "İstanbul Türk Gecesi Akşam Yemeği Turu",
    heroDesc:
      "Boğaz'da Türk gecesi gösterisi, akşam yemeği servisi ve Istanbul silueti eşliğinde paylaşımlı bir gece. Türk gecesini ana karar noktası olarak değerlendiriyorsanız bu sayfadan başlayın.",
    whyHeading: "Türk Gecesi Akşam Yemeği Turu Neden?",
    reasons: [
      {
        title: "Türk gecesi gösterisi",
        desc: "Halk oyunları, Türk müziği, derviş gösterisi ve eğlenceli sahne programı paylaşımlı gece turuna dahildir.",
      },
      {
        title: "Akşam yemeği servisi",
        desc: "Farklı seviyelerde akşam yemeği paketi seçenekleri sunar: masada servis, açık büfe veya içecek dahil paketler arasında karşılaştırma yapılabilir.",
      },
      {
        title: "Boğaz manzarası",
        desc: "Gece boyunca İstanbul köprülerinin ışıltısı ve Boğaz manzarası eşliğinde yaklaşık 3,5 saatlik keyifli bir gece deneyimi.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Türk gecesi akşam yemeği turu ne içerir?",
        a: "Paylaşımlı Boğaz akşam yemeği turuna Türk gecesi sahne programı, akşam yemeği servisi (pakete göre değişir), karşılama içeceği ve Boğaz manzarası dahildir.",
      },
      {
        q: "Hangi paket Türk gecesi gösterisini içerir?",
        a: "Tüm paylaşımlı akşam yemeği turu paketleri Türk gecesi sahne programını içerir. Paketler arasındaki fark yemek servisi seviyesi ve içecek dahilindeki farklılıktır.",
      },
      {
        q: "Gösteriyi anlamak için Türkçe bilmem gerekiyor mu?",
        a: "Hayır. Halk oyunları, müzik ve sahne gösterileri dil bariyeri olmadan keyifle izlenebilir.",
      },
    ],
    ctaHeading: "Rezervasyon için iletişime geçin",
    ctaDesc: "Tarih ve misafir sayısını paylaşın, hızla yanıt alalım.",
    ctaBtn: "WhatsApp ile Rezervasyon",
    mainPageLabel: "Tam Akşam Yemeği Turu Sayfasına Git",
  },
  de: {
    metaTitle: "Türkische Nacht Dinner-Kreuzfahrt Istanbul 2026 | Bosporus | MerrySails",
    metaDescription:
      "Türkische Nacht Dinner-Kreuzfahrt auf dem Bosporus: Folkloreshow, türkische Musik und Abenddinner auf einer geteilten Kreuzfahrt mit Istanbul-Skyline.",
    canonicalPath: "/de/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Türkische Nacht Dinner-Kreuzfahrt",
    eyebrow: "Geteilte Dinner-Kreuzfahrt",
    heroTitle: "Türkische Nacht Dinner-Kreuzfahrt Istanbul",
    heroDesc:
      "Eine geteilte Nacht auf dem Bosporus mit türkischer Nacht-Show, Abenddinner-Service und Blick auf die Istanbuler Skyline. Diese Seite ist ideal, wenn die türkische Nacht Ihr Hauptentscheidungskriterium ist.",
    whyHeading: "Warum die türkische Nacht Dinner-Kreuzfahrt?",
    reasons: [
      {
        title: "Türkische Nacht-Show",
        desc: "Folkloretänze, türkische Musik, Derwisch-Darbietung und ein unterhaltsames Bühnenprogramm sind Teil der geteilten Abendkreuzfahrt.",
      },
      {
        title: "Abenddinner-Service",
        desc: "Verschiedene Paketoptionen mit unterschiedlichen Dinner-Leistungen: Tischservice, Buffet oder Getränke-inklusive-Pakete sind vergleichbar.",
      },
      {
        title: "Bosporus-Panorama",
        desc: "Ca. 3,5 Stunden auf dem Bosporus mit glitzernden Brückenlichtern und Istanbuler Skyline-Panorama bei Nacht.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Was ist in der türkischen Nacht-Dinner-Kreuzfahrt enthalten?",
        a: "Türkische Nacht-Bühnenprogramm, Abenddinner (je nach Paket), Willkommensgetränk und Bosporus-Panorama sind inklusive.",
      },
      {
        q: "Welches Paket enthält die türkische Nacht-Show?",
        a: "Alle Pakete der geteilten Dinner-Kreuzfahrt beinhalten das türkische Nacht-Bühnenprogramm. Der Unterschied liegt im Dinner-Service-Niveau und Getränkeinclusive.",
      },
      {
        q: "Brauche ich Türkischkenntnisse für die Show?",
        a: "Nein. Folkloretänze, Musik und Bühnenshows können ohne Sprachkenntnisse genossen werden.",
      },
    ],
    ctaHeading: "Reservierung anfragen",
    ctaDesc: "Teilen Sie Datum und Personenzahl mit — wir antworten schnell.",
    ctaBtn: "Via WhatsApp buchen",
    mainPageLabel: "Zur vollständigen Dinner-Kreuzfahrt-Seite",
  },
  fr: {
    metaTitle: "Croisière Dîner Nuit Turque Istanbul 2026 | Bosphore Spectacle | MerrySails",
    metaDescription:
      "Croisière dîner nuit turque sur le Bosphore : spectacle folklorique, musique turque et dîner servi lors d'une croisière partagée avec vue sur Istanbul.",
    canonicalPath: "/fr/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Croisière Dîner Nuit Turque",
    eyebrow: "Croisière dîner partagée",
    heroTitle: "Croisière Dîner Nuit Turque à Istanbul",
    heroDesc:
      "Une soirée partagée sur le Bosphore avec spectacle nuit turque, service dîner et vue sur la skyline d'Istanbul. Cette page est idéale si le spectacle nuit turque est votre principal critère de choix.",
    whyHeading: "Pourquoi la croisière dîner nuit turque ?",
    reasons: [
      {
        title: "Spectacle nuit turque",
        desc: "Danses folkloriques, musique turque, spectacle de derviches tourneurs et programme de scène animé inclus dans la croisière partagée.",
      },
      {
        title: "Service dîner",
        desc: "Différentes options de forfaits dîner : service à table, buffet ou boissons comprises — à comparer selon vos préférences.",
      },
      {
        title: "Panorama du Bosphore",
        desc: "Environ 3h30 sur le Bosphore avec les ponts illuminés et la skyline nocturne d'Istanbul.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Qu'est-ce qui est inclus dans la croisière dîner nuit turque ?",
        a: "Programme de scène nuit turque, dîner servi (selon le forfait), boisson de bienvenue et panorama du Bosphore sont inclus.",
      },
      {
        q: "Quel forfait inclut le spectacle nuit turque ?",
        a: "Tous les forfaits de la croisière dîner partagée incluent le programme nuit turque. La différence porte sur le niveau de service dîner et les boissons.",
      },
      {
        q: "Faut-il parler turc pour apprécier le spectacle ?",
        a: "Non. Les danses folkloriques, la musique et les spectacles de scène se savourent sans barrière linguistique.",
      },
    ],
    ctaHeading: "Demander une réservation",
    ctaDesc: "Partagez la date et le nombre de convives — nous répondons rapidement.",
    ctaBtn: "Réserver via WhatsApp",
    mainPageLabel: "Voir la page complète de la croisière dîner",
  },
  nl: {
    metaTitle: "Turkse Nacht Dinercruise Istanbul 2026 | Bosporus Folkloreshow | MerrySails",
    metaDescription:
      "Turkse nacht dinercruise op de Bosporus: folkloreshow, Turkse muziek en dinerdienst tijdens een gedeelde cruise met uitzicht op Istanbul.",
    canonicalPath: "/nl/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Turkse Nacht Dinercruise",
    eyebrow: "Gedeelde dinercruise",
    heroTitle: "Turkse Nacht Dinercruise Istanbul",
    heroDesc:
      "Een gedeelde avond op de Bosporus met Turkse nacht-show, dinerdienst en uitzicht op de skyline van Istanbul. Deze pagina is ideaal als de Turkse nacht-show uw belangrijkste keuzecriterium is.",
    whyHeading: "Waarom de Turkse nacht dinercruise?",
    reasons: [
      {
        title: "Turkse nacht-show",
        desc: "Folkloreoptredens, Turkse muziek, derwisjen-show en een animerend podiumsprogramma zijn inbegrepen bij de gedeelde avondcruise.",
      },
      {
        title: "Dinerdienst",
        desc: "Verschillende pakketopties met uiteenlopende diner-inclusies: tafelservice, buffet of dranken inbegrepen — te vergelijken op de hoofdpagina.",
      },
      {
        title: "Bosporus-panorama",
        desc: "Ongeveer 3,5 uur op de Bosporus met verlichte bruggen en het nachtelijk panorama van Istanbul.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Wat is inbegrepen in de Turkse nacht dinercruise?",
        a: "Turkse nacht-podiumshow, dinner (afhankelijk van het pakket), welkomstdrankje en Bosporus-panorama zijn inbegrepen.",
      },
      {
        q: "Welk pakket bevat de Turkse nacht-show?",
        a: "Alle pakketten van de gedeelde dinercruise bevatten het Turkse nacht-podiumsprogramma. Het verschil zit in het niveau van de dinerdienst en dranken.",
      },
      {
        q: "Moet ik Turks spreken om de show te begrijpen?",
        a: "Nee. Folkloreoptredens, muziek en podiumshows zijn te genieten zonder taalbarrière.",
      },
    ],
    ctaHeading: "Reservering aanvragen",
    ctaDesc: "Deel de datum en het aantal gasten — wij reageren snel.",
    ctaBtn: "Reserveren via WhatsApp",
    mainPageLabel: "Naar de volledige dinercruise-pagina",
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
  const languages = buildHreflang("/turkish-night-dinner-cruise-istanbul");
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

export default async function TurkishNightDinnerCruiseLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  return (
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
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] mb-6">{t.heroDesc}</p>
          <Link href={`/${locale}/istanbul-dinner-cruise`} className="btn-secondary">
            {t.mainPageLabel} →
          </Link>
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
  );
}
