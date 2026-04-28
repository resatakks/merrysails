import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";
import { guides } from "@/data/guides";
import { cleanContentText } from "@/lib/content-text";

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
  guidesHeading: string;
  guidesBody: string;
  readGuide: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonCruises: string;
  ctaButtonReservation: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "İstanbul Boğaz Turu, Tarihi Yer ve Biniş Rehberleri | MerrySails",
    description:
      "Boğaz turları, özel yat ve yat kiralama için İstanbul tarihi yer rehberleri, biniş alanı bilgileri ve rezervasyon sayfası önerileri.",
    canonicalPath: "/tr/guides",
    pageTitle: "İstanbul Boğaz Turu, Tarihi Yer ve Biniş Rehberleri",
    pageDescription:
      "İstanbul Boğaz turlarını şekillendiren tarihi yerler, sahil bölgeleri ve biniş noktaları hakkında ayrıntılı rehberler.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Rehberler",
    introHeading: "Boğaz turu için tarihi yer ve biniş rehberleri",
    introBody:
      "Bu sayfa, MerrySails'in tüm İstanbul rehber içeriklerinin İngilizce kaynaklarına bağlanır. Rehberler; Kız Kulesi, Dolmabahçe Sarayı, Ortaköy ve Rumeli Hisarı gibi tarihi yerleri ve Kabataş, Beşiktaş, Kuruçeşme gibi biniş noktalarını detaylandırır.",
    guidesHeading: "Rehberler",
    guidesBody:
      "İçeriklerin tamamı şu anda İngilizce olarak yayınlanmaktadır. Aşağıdaki bağlantılar İngilizce rehberlere yönlendirir.",
    readGuide: "Rehberi oku",
    ctaHeading: "Rezervasyon yapmaya hazır mısınız?",
    ctaBody:
      "Tarih, kişi sayısı ve istediğiniz Boğaz turu hakkında bize yazın. Doğrudan rezervasyon ve TÜRSAB A Grubu lisanslı operatör.",
    ctaButtonCruises: "Boğaz Turlarını Görüntüle",
    ctaButtonReservation: "Rezervasyon Yap",
    viewInEnglish: "English →",
  },
  de: {
    title: "Istanbul Bosporus, Sehenswürdigkeiten & Boarding-Guides | MerrySails",
    description:
      "Istanbul-Reiseführer zu Sehenswürdigkeiten, Boarding-Bereichen und den Buchungsseiten für Bosporus-Kreuzfahrten, Privatboote und Jachtcharter.",
    canonicalPath: "/de/guides",
    pageTitle: "Istanbul Bosporus, Sehenswürdigkeiten & Boarding-Guides",
    pageDescription:
      "Detaillierte Reiseführer zu Istanbuls Sehenswürdigkeiten, Uferbezirken und Boarding-Bereichen rund um eine Bosporus-Kreuzfahrt.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Reiseführer",
    introHeading: "Sehenswürdigkeiten- und Boarding-Guides für die Bosporus-Kreuzfahrt",
    introBody:
      "Diese Seite verlinkt zu allen MerrySails-Reiseführern für Istanbul auf Englisch. Die Guides decken Sehenswürdigkeiten wie Mädchenturm, Dolmabahçe-Palast, Ortaköy und Rumeli-Festung sowie Boarding-Punkte wie Kabataş, Beşiktaş und Kuruçeşme ab.",
    guidesHeading: "Reiseführer",
    guidesBody:
      "Alle Inhalte werden derzeit auf Englisch veröffentlicht. Die folgenden Links führen zu den englischen Guides.",
    readGuide: "Guide lesen",
    ctaHeading: "Bereit zu buchen?",
    ctaBody:
      "Schreiben Sie uns Datum, Gästezahl und gewünschte Bosporus-Kreuzfahrt. Direktbuchung und TÜRSAB A-Gruppe lizenzierter Betreiber.",
    ctaButtonCruises: "Bosporus-Kreuzfahrten ansehen",
    ctaButtonReservation: "Reservierung",
    viewInEnglish: "English →",
  },
  fr: {
    title: "Guides Bosphore, Monuments & Embarquement Istanbul | MerrySails",
    description:
      "Guides des monuments d'Istanbul, des zones d'embarquement et des pages de réservation pour les croisières Bosphore, bateaux privés et charter de yacht.",
    canonicalPath: "/fr/guides",
    pageTitle: "Guides Bosphore, Monuments & Embarquement Istanbul",
    pageDescription:
      "Guides approfondis des monuments d'Istanbul, des quartiers riverains et des zones d'embarquement qui structurent une croisière sur le Bosphore.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Guides",
    introHeading: "Guides des monuments et de l'embarquement pour la croisière Bosphore",
    introBody:
      "Cette page renvoie à tous les guides MerrySails pour Istanbul en anglais. Les guides couvrent les monuments tels que la Tour de Léandre, le palais de Dolmabahçe, Ortaköy et la forteresse de Roumélie, ainsi que les points d'embarquement comme Kabataş, Beşiktaş et Kuruçeşme.",
    guidesHeading: "Guides",
    guidesBody:
      "Tous les contenus sont actuellement publiés en anglais. Les liens ci-dessous renvoient vers les guides en anglais.",
    readGuide: "Lire le guide",
    ctaHeading: "Prêt à réserver ?",
    ctaBody:
      "Indiquez-nous votre date, le nombre d'invités et la croisière souhaitée. Réservation directe et opérateur agréé TÜRSAB groupe A.",
    ctaButtonCruises: "Voir les croisières Bosphore",
    ctaButtonReservation: "Réservation",
    viewInEnglish: "English →",
  },
  nl: {
    title: "Istanbul Bosporus, Bezienswaardigheden & Boarding Gidsen | MerrySails",
    description:
      "Istanbul-gidsen voor bezienswaardigheden, boarding-gebieden en boekingspagina's voor Bosporus cruises, privéboten en jachtcharters.",
    canonicalPath: "/nl/guides",
    pageTitle: "Istanbul Bosporus, Bezienswaardigheden & Boarding Gidsen",
    pageDescription:
      "Diepgaande gidsen voor de bezienswaardigheden, waterfront-wijken en boarding-gebieden die een Bosporus cruise vormgeven.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Gidsen",
    introHeading: "Bezienswaardigheden- en boarding-gidsen voor de Bosporus cruise",
    introBody:
      "Deze pagina linkt naar alle MerrySails gidsen voor Istanbul in het Engels. De gidsen behandelen bezienswaardigheden als de Meisjestoren, Dolmabahçe Paleis, Ortaköy en Rumeli Vesting, en boarding-punten zoals Kabataş, Beşiktaş en Kuruçeşme.",
    guidesHeading: "Gidsen",
    guidesBody:
      "Alle content wordt momenteel in het Engels gepubliceerd. Onderstaande links verwijzen naar de Engelstalige gidsen.",
    readGuide: "Gids lezen",
    ctaHeading: "Klaar om te boeken?",
    ctaBody:
      "Stuur ons uw datum, aantal gasten en gewenste Bosporus cruise. Directe boeking en TÜRSAB A-groep gelicentieerde operator.",
    ctaButtonCruises: "Bekijk Bosporus cruises",
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
  const languages = buildHreflang("/guides") ?? {
    "x-default": `${SITE_URL}/guides`,
    en: `${SITE_URL}/guides`,
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

export default async function LocaleGuidesPage({
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
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{c.guidesHeading}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">{c.guidesBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)] hover:border-[var(--brand-primary)] transition-colors"
                >
                  <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--brand-primary)] line-clamp-2">
                    {cleanContentText(guide.title)}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-3">
                    {cleanContentText(guide.excerpt)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)]">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.readGuide} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/guides"
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
                {c.ctaButtonCruises}
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
