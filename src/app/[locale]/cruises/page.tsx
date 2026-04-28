import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";
import { getTourPath, isPricingVisible, tours } from "@/data/tours";

export const revalidate = 3600;

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  introHeading: string;
  introBody: string;
  catalogHeading: string;
  catalogBody: string;
  fromLabel: string;
  detailsLabel: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonCompare: string;
  ctaButtonReservation: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "MerrySails Boğaz Turu Kataloğu | İstanbul 2026",
    description:
      "Gün batımı turu, akşam yemeği turu ve yat kiralama dahil tüm MerrySails Boğaz turu ve yat hizmetlerinin kataloğu.",
    canonicalPath: "/tr/cruises",
    pageTitle: "MerrySails Boğaz Turu ve Yat Kataloğu",
    pageDescription:
      "Tüm MerrySails Boğaz turlarını ve yat hizmetlerini tek bir katalogda inceleyin: gün batımı, akşam yemeği, özel yat ve tekne kiralama.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Turlar",
    introHeading: "Önce Boğaz turu karşılaştırma sayfasından başlayın",
    introBody:
      "Genel bir Boğaz turu arıyorsanız önce karşılaştırma sayfasını kullanın. Bu katalog, paylaşımlı, özel ve destek sayfalarını birlikte gösteren tam liste içindir.",
    catalogHeading: "Tüm tur ve yat sayfaları",
    catalogBody:
      "Aşağıdaki tüm bağlantılar şu anda İngilizce sayfalara yönlendirir. Yerelleştirilmiş ana ürün sayfaları için aşağıdaki düğmeleri kullanın.",
    fromLabel: "Başlangıç",
    detailsLabel: "Detayları gör",
    ctaHeading: "Hangi tur size uygun?",
    ctaBody:
      "Tarih, kişi sayısı ve istediğiniz deneyim hakkında bize yazın. Doğrudan rezervasyon ve TÜRSAB A Grubu lisanslı operatör.",
    ctaButtonCompare: "Boğaz Turlarını Karşılaştır",
    ctaButtonReservation: "Rezervasyon Yap",
    viewInEnglish: "English →",
  },
  de: {
    title: "MerrySails Bosporus-Kreuzfahrt-Katalog | Istanbul 2026",
    description:
      "Vollständiger MerrySails-Katalog mit Bosporus-Kreuzfahrten, Sonnenuntergang, Dinner-Kreuzfahrten und Jachtcharter-Angeboten in Istanbul.",
    canonicalPath: "/de/cruises",
    pageTitle: "MerrySails Bosporus-Kreuzfahrt- und Jacht-Katalog",
    pageDescription:
      "Alle Bosporus-Kreuzfahrten und Jachtangebote von MerrySails in einem Katalog: Sonnenuntergang, Dinner, Privatjacht und Bootsverleih.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kreuzfahrten",
    introHeading: "Beginnen Sie mit der Bosporus-Vergleichsseite",
    introBody:
      "Wenn Sie allgemein nach einer Bosporus-Kreuzfahrt suchen, verwenden Sie zuerst die Vergleichsseite. Dieser Katalog ist die vollständige Liste mit geteilten, privaten und unterstützenden Seiten.",
    catalogHeading: "Alle Kreuzfahrt- und Jachtseiten",
    catalogBody:
      "Alle folgenden Links führen derzeit zu englischen Seiten. Für lokalisierte Hauptproduktseiten verwenden Sie die Schaltflächen unten.",
    fromLabel: "Ab",
    detailsLabel: "Details ansehen",
    ctaHeading: "Welche Kreuzfahrt passt zu Ihnen?",
    ctaBody:
      "Schreiben Sie uns Datum, Gästezahl und das gewünschte Erlebnis. Direktbuchung und TÜRSAB A-Gruppe lizenzierter Betreiber.",
    ctaButtonCompare: "Bosporus-Kreuzfahrten vergleichen",
    ctaButtonReservation: "Reservierung",
    viewInEnglish: "English →",
  },
  fr: {
    title: "Catalogue Croisières MerrySails | Istanbul 2026",
    description:
      "Catalogue complet MerrySails des croisières Bosphore, coucher de soleil, dîner et charter de yacht à Istanbul.",
    canonicalPath: "/fr/cruises",
    pageTitle: "Catalogue Croisières et Yachts MerrySails",
    pageDescription:
      "Toutes les croisières Bosphore et services de yacht MerrySails dans un seul catalogue : coucher de soleil, dîner, yacht privé et location de bateau.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Croisières",
    introHeading: "Commencez par la page de comparaison des croisières Bosphore",
    introBody:
      "Si votre recherche est générique, utilisez d'abord la page de comparaison. Ce catalogue est la liste complète avec les pages partagées, privées et de support.",
    catalogHeading: "Toutes les pages de croisière et de yacht",
    catalogBody:
      "Tous les liens ci-dessous renvoient actuellement vers des pages en anglais. Pour les principales pages produit localisées, utilisez les boutons ci-dessous.",
    fromLabel: "À partir de",
    detailsLabel: "Voir les détails",
    ctaHeading: "Quelle croisière vous convient ?",
    ctaBody:
      "Indiquez-nous votre date, le nombre d'invités et l'expérience souhaitée. Réservation directe et opérateur agréé TÜRSAB groupe A.",
    ctaButtonCompare: "Comparer les croisières Bosphore",
    ctaButtonReservation: "Réservation",
    viewInEnglish: "English →",
  },
  nl: {
    title: "MerrySails Cruise Catalogus | Istanbul 2026",
    description:
      "Volledige MerrySails-catalogus van Bosporus cruises, zonsondergang, diner cruises en jachtcharter in Istanbul.",
    canonicalPath: "/nl/cruises",
    pageTitle: "MerrySails Bosporus Cruise- en Jachtcatalogus",
    pageDescription:
      "Alle Bosporus cruises en jachtdiensten van MerrySails in één catalogus: zonsondergang, diner, privéjacht en boothuur.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Cruises",
    introHeading: "Begin met de Bosporus cruise-vergelijkingspagina",
    introBody:
      "Als u algemeen zoekt naar een Bosporus cruise, gebruik dan eerst de vergelijkingspagina. Deze catalogus toont de volledige lijst met gedeelde, privé en ondersteunende pagina's.",
    catalogHeading: "Alle cruise- en jachtpagina's",
    catalogBody:
      "Alle onderstaande links verwijzen momenteel naar Engelstalige pagina's. Voor gelokaliseerde hoofdproductpagina's gebruikt u de knoppen hieronder.",
    fromLabel: "Vanaf",
    detailsLabel: "Bekijk details",
    ctaHeading: "Welke cruise past bij u?",
    ctaBody:
      "Stuur ons uw datum, aantal gasten en gewenste ervaring. Directe boeking en TÜRSAB A-groep gelicentieerde operator.",
    ctaButtonCompare: "Bosporus cruises vergelijken",
    ctaButtonReservation: "Reservering",
    viewInEnglish: "English →",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
  const languages = buildHreflang("/cruises") ?? {
    "x-default": `${SITE_URL}/cruises`,
    en: `${SITE_URL}/cruises`,
    [locale]: canonicalUrl,
  };

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.pageTitle }],
    },
  };
}

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export default async function LocaleCruisesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.pageTitle,
    description: c.pageDescription,
    url: canonicalUrl,
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {c.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.breadcrumbCurrent}</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">{c.pageTitle}</h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">{c.pageDescription}</p>
          </div>

          <section className="bg-white rounded-2xl border border-[var(--line)] p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{c.introHeading}</h2>
            <p className="text-[var(--body-text)] leading-relaxed">{c.introBody}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{c.catalogHeading}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">{c.catalogBody}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
              {tours.map((tour) => (
                <li key={tour.slug}>
                  <Link
                    href={getTourPath(tour)}
                    className="group block bg-white rounded-xl p-4 border border-[var(--line)] hover:border-[var(--brand-primary)] transition-colors"
                  >
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-[var(--brand-primary)]">
                      {tour.nameEn}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      {isPricingVisible(tour) ? `${c.fromLabel} €${tour.priceEur}` : c.detailsLabel}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <Link
                href="/cruises"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                {c.viewInEnglish}
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.ctaHeading}</h2>
            <p className="text-[var(--text-muted)] mb-5 max-w-2xl mx-auto">{c.ctaBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/${locale}/bosphorus-cruise`}
                className="rounded-full bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                {c.ctaButtonCompare} <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
              <Link
                href={`/${locale}/reservation`}
                className="rounded-full border border-[var(--line)] bg-white px-6 py-2.5 text-sm font-semibold text-[var(--heading)] hover:border-[var(--brand-primary)]"
              >
                {c.ctaButtonReservation}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
