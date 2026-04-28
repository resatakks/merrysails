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
    metaTitle: "İstanbul Ürün Lansmanı Yat 2026 | Boğaz'da Özel Lansman Etkinliği | MerrySails",
    metaDescription:
      "İstanbul'da ürün lansmanı için özel yat: Boğaz manzarasında görsel etki, markalı kurulum ve davetli akışı planlamasıyla özel bir lansman formatı.",
    canonicalPath: "/tr/product-launch-yacht-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Ürün Lansmanı Yat İstanbul",
    eyebrow: "Kurumsal lansman etkinliği",
    heroTitle: "İstanbul Ürün Lansmanı Yat",
    heroDesc:
      "Ürün lansmanınızı Boğaz'da özel bir yat etkinliğiyle gerçekleştirin. Markalı kurulum, davetli akışı, sunum ekipmanı ve görsel etki planlama desteği brifinize göre kurgulanır.",
    whyHeading: "Neden Boğaz'da Ürün Lansmanı?",
    reasons: [
      {
        title: "Akılda kalıcı görsel etki",
        desc: "İstanbul Boğazı, ürün lansmanı için sıradan bir mekan yerine ilgi çekici ve akılda kalıcı bir görsel çerçeve sunar.",
      },
      {
        title: "Markalı kurulum desteği",
        desc: "Ekran, mikrofon, marka panosu, fotoğraf köşesi ve video desteği lansman formatına göre eklenir. Tekne tam markalama için uygun hale getirilir.",
      },
      {
        title: "Davetli akışı yönetimi",
        desc: "Daveti listesi, biniş süreci, servis akışı ve lansman programı kurumsal brifle uyumlu şekilde organize edilir.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Ürün lansmanı için kaç kişilik yat gerekir?",
        a: "Davetli sayısına göre uygun yat seçimi yapılır. Küçük VIP lansmanlardan büyük grup etkinliklerine kadar ölçeklenebilir.",
      },
      {
        q: "Sunum ekipmanı dahil mi?",
        a: "Ekran, projeksiyon ve ses sistemi gibi sunum ekipmanları taleple eklenir. Detaylar brifinizde belirtildiğinde kurulum önceden planlanır.",
      },
      {
        q: "Faturalı kurumsal hizmet veriliyor mu?",
        a: "Evet. Resmi fatura ve kurumsal ödeme sürecine uygun belgeler sağlanır.",
      },
    ],
    ctaHeading: "Lansman brifini paylaşın",
    ctaDesc: "Tarih, davetli sayısı ve kurulum ihtiyacını gönderin, teklife hızlıca dönelim.",
    ctaBtn: "WhatsApp ile Teklif Alın",
  },
  de: {
    metaTitle: "Produktlaunch Yacht Istanbul 2026 | Private Bosporus Launch-Veranstaltung | MerrySails",
    metaDescription:
      "Produktlaunch auf einer Privatyacht am Bosporus in Istanbul: Branding-Setup, Gästefluss-Management und visuelle Wirkung für eine unvergessliche Launch-Veranstaltung.",
    canonicalPath: "/de/product-launch-yacht-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Produktlaunch Yacht Istanbul",
    eyebrow: "Corporate Launch-Event",
    heroTitle: "Produktlaunch Yacht Istanbul",
    heroDesc:
      "Präsentieren Sie Ihr Produkt auf einer Privatyacht am Bosporus. Branding-Setup, Gästefluss, Präsentationstechnik und visuelle Wirkung werden nach Ihrem Brief geplant.",
    whyHeading: "Warum Produktlaunch am Bosporus?",
    reasons: [
      {
        title: "Einprägsame Bildwirkung",
        desc: "Der Istanbuler Bosporus bietet einen einzigartigen visuellen Rahmen für Produktlaunches, der weit über gewöhnliche Veranstaltungsräume hinausgeht.",
      },
      {
        title: "Branding-Setup-Support",
        desc: "Leinwand, Mikrofon, Markenwand, Fotoecke und Video-Support können je nach Launch-Format hinzugefügt werden.",
      },
      {
        title: "Gästefluss-Management",
        desc: "Gästeliste, Einschiffungsprozess, Service-Ablauf und Launch-Programm werden nach dem Corporate-Brief organisiert.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Wie viele Personen fasst die Yacht für einen Launch?",
        a: "Je nach Gästezahl wird die passende Yacht ausgewählt — von kleinen VIP-Launches bis zu größeren Gruppenveranstaltungen.",
      },
      {
        q: "Ist Präsentationstechnik inklusive?",
        a: "Bildschirm, Projektion und Tonsystem können auf Anfrage hinzugefügt werden. Details werden vorab bei der Brieferstellung geplant.",
      },
      {
        q: "Wird eine offizielle Rechnung ausgestellt?",
        a: "Ja. Offizielle Rechnungen und Unterlagen für den Firmenzahlungsprozess werden bereitgestellt.",
      },
    ],
    ctaHeading: "Launch-Brief anfragen",
    ctaDesc: "Teilen Sie Datum, Gästezahl und Setup-Anforderungen mit — wir erstellen schnell ein Angebot.",
    ctaBtn: "Angebot via WhatsApp",
  },
  fr: {
    metaTitle: "Lancement de Produit sur Yacht Istanbul 2026 | Événement Privé Bosphore | MerrySails",
    metaDescription:
      "Lancement de produit sur yacht privé au Bosphore à Istanbul : branding, gestion du flux d'invités et impact visuel pour un événement de lancement mémorable.",
    canonicalPath: "/fr/product-launch-yacht-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Lancement Produit Yacht Istanbul",
    eyebrow: "Événement corporate de lancement",
    heroTitle: "Lancement de Produit sur Yacht à Istanbul",
    heroDesc:
      "Lancez votre produit sur un yacht privé au Bosphore. Branding, flux d'invités, équipement de présentation et impact visuel sont planifiés selon votre brief.",
    whyHeading: "Pourquoi lancer sur le Bosphore ?",
    reasons: [
      {
        title: "Impact visuel mémorable",
        desc: "Le Bosphore d'Istanbul offre un cadre visuel unique et mémorable pour les lancements de produits, bien au-delà d'une salle de conférence ordinaire.",
      },
      {
        title: "Support branding",
        desc: "Écran, microphone, mur de marque, coin photo et support vidéo peuvent être ajoutés selon le format du lancement.",
      },
      {
        title: "Gestion du flux d'invités",
        desc: "Liste d'invités, processus d'embarquement, déroulement du service et programme de lancement sont organisés selon le brief corporate.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Quelle capacité de yacht pour un lancement ?",
        a: "Le yacht est sélectionné selon le nombre d'invités — des petits lancements VIP aux événements de groupe plus importants.",
      },
      {
        q: "L'équipement de présentation est-il inclus ?",
        a: "Écran, projection et système audio peuvent être ajoutés sur demande. Les détails sont planifiés en amont lors du briefing.",
      },
      {
        q: "Une facture officielle est-elle émise ?",
        a: "Oui. Des factures officielles et documents pour le processus de paiement d'entreprise sont fournis.",
      },
    ],
    ctaHeading: "Partagez votre brief de lancement",
    ctaDesc: "Envoyez la date, le nombre d'invités et les besoins en installation — nous répondons rapidement.",
    ctaBtn: "Devis via WhatsApp",
  },
  nl: {
    metaTitle: "Productlancering Jacht Istanbul 2026 | Privé Bosporus Lanceringsevenement | MerrySails",
    metaDescription:
      "Productlancering op een privéjacht aan de Bosporus in Istanbul: branding, gastenstroom en visuele impact voor een onvergetelijk lanceringsevenement.",
    canonicalPath: "/nl/product-launch-yacht-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Productlancering Jacht Istanbul",
    eyebrow: "Corporate lanceringsevenement",
    heroTitle: "Productlancering op Jacht in Istanbul",
    heroDesc:
      "Lanceer uw product op een privéjacht aan de Bosporus. Branding-opzet, gastenstroommanagement, presentatieapparatuur en visuele impact worden gepland volgens uw brief.",
    whyHeading: "Waarom lanceren aan de Bosporus?",
    reasons: [
      {
        title: "Onvergetelijke visuele impact",
        desc: "De Bosporus van Istanbul biedt een uniek en memorabel visueel kader voor productlanceringen, ver boven een gewone conferentiezaal.",
      },
      {
        title: "Branding-ondersteuning",
        desc: "Scherm, microfoon, merkwand, fotohoek en videoondersteuning kunnen worden toegevoegd op basis van het lanceringsformaat.",
      },
      {
        title: "Gastenstroommanagement",
        desc: "Gastenlijst, instapproces, serviceverloop en lanceringsprogramma worden georganiseerd volgens de corporate brief.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Hoeveel personen past het jacht voor een lancering?",
        a: "Het jacht wordt geselecteerd op basis van het aantal gasten — van kleine VIP-lanceringen tot grotere groepsevenementen.",
      },
      {
        q: "Is presentatieapparatuur inbegrepen?",
        a: "Scherm, projectie en geluidssysteem kunnen op aanvraag worden toegevoegd. Details worden vooraf gepland bij het opstellen van de brief.",
      },
      {
        q: "Wordt er een officiële factuur uitgesteld?",
        a: "Ja. Officiële facturen en documenten voor het bedrijfsbetalingsproces worden verstrekt.",
      },
    ],
    ctaHeading: "Deel uw lanceringsbrief",
    ctaDesc: "Stuur de datum, het aantal gasten en de opzetbehoeften — wij reageren snel met een offerte.",
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
  const languages = buildHreflang("/product-launch-yacht-istanbul");
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

export default async function ProductLaunchYachtLocalePage({
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
  );
}
