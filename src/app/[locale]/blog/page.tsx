import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";
import { blogPosts } from "@/data/blog";
import { getAllLocalePostsForLocale } from "@/data/blog/locale-posts";
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
  nativePostsHeading?: string;
  postsHeading: string;
  postsBody: string;
  readArticle: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonCruises: string;
  ctaButtonReservation: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "Boğaz Turu Blog — İstanbul Seyahat Rehberleri | MerrySails",
    description:
      "İstanbul Boğaz turu rehberleri: gün batımı turu ipuçları, yat kiralama tavsiyeleri, akşam yemeği turu yorumları ve yerel seyahat içgörüleri — 2001'den bu yana TÜRSAB A Grubu lisanslı.",
    canonicalPath: "/tr/blog",
    pageTitle: "Boğaz Turu Blog — İstanbul Seyahat Rehberleri",
    pageDescription:
      "Boğaz turu, gün batımı turu, akşam yemeği turu ve yat kiralama planlaması için uzman İstanbul rehberleri.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Blog",
    introHeading: "İstanbul Boğaz turu için planlama içerikleri",
    introBody:
      "Bu sayfa, MerrySails'in tüm Boğaz turu blog içeriklerinin kaynaklarına bağlanır. Yazılar; kalkış noktası seçimi, paylaşımlı ve özel rota karşılaştırmaları, akşam yemeği paketleri ve yat kiralama planlaması üzerine odaklanır.",
    nativePostsHeading: "Türkçe rehber yazıları",
    postsHeading: "İngilizce blog yazıları",
    postsBody:
      "Daha fazla içerik İngilizce olarak da yayınlanmaktadır. Aşağıdaki bağlantılar İngilizce yazılara yönlendirir.",
    readArticle: "Yazıyı oku",
    ctaHeading: "Doğru Boğaz turunu seçmeye hazır mısınız?",
    ctaBody:
      "Tarih, kişi sayısı ve istediğiniz deneyim hakkında bize yazın. Doğrudan rezervasyon ve TÜRSAB A Grubu lisanslı operatör.",
    ctaButtonCruises: "Boğaz Turlarını Görüntüle",
    ctaButtonReservation: "Rezervasyon Yap",
    viewInEnglish: "English →",
  },
  de: {
    title: "Bosporus Kreuzfahrt Blog — Istanbul Reiseführer | MerrySails",
    description:
      "Expertenführer für Istanbul: Bosporus Sonnenuntergangs-Kreuzfahrt-Tipps, Jachtcharter-Beratung, Dinner-Kreuzfahrt-Bewertungen und lokale Reisetipps — TÜRSAB A-Gruppe lizenziert seit 2001.",
    canonicalPath: "/de/blog",
    pageTitle: "Bosporus Kreuzfahrt Blog — Istanbul Reiseführer",
    pageDescription:
      "Experten-Reiseführer für Istanbul Bosporus-Kreuzfahrten, Sonnenuntergangs-Kreuzfahrten, Dinner-Kreuzfahrten und Jachtcharter-Planung.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Blog",
    introHeading: "Planungsinhalte für Istanbul Bosporus-Kreuzfahrten",
    introBody:
      "Diese Seite verlinkt zu allen MerrySails-Blogartikeln zum Bosporus auf Englisch. Die Artikel konzentrieren sich auf Abfahrtsorte, geteilte und private Routenvergleiche, Dinner-Pakete und Jachtcharter-Planung.",
    nativePostsHeading: "Deutsche Reiseführer",
    postsHeading: "Blogbeiträge",
    postsBody:
      "Alle Inhalte werden derzeit auf Englisch veröffentlicht. Die folgenden Links führen zu den englischen Artikeln.",
    readArticle: "Artikel lesen",
    ctaHeading: "Bereit, die richtige Bosporus-Kreuzfahrt zu wählen?",
    ctaBody:
      "Schreiben Sie uns Ihr Datum, Ihre Gästezahl und das gewünschte Erlebnis. Direktbuchung und TÜRSAB A-Gruppe lizenzierter Betreiber.",
    ctaButtonCruises: "Bosporus-Kreuzfahrten ansehen",
    ctaButtonReservation: "Reservierung",
    viewInEnglish: "English →",
  },
  fr: {
    title: "Blog Croisière Bosphore — Guides Voyage Istanbul | MerrySails",
    description:
      "Guides experts pour Istanbul : conseils croisière coucher de soleil sur le Bosphore, charter de yacht, avis sur les croisières dîner et insights voyage locaux — agréé TÜRSAB groupe A depuis 2001.",
    canonicalPath: "/fr/blog",
    pageTitle: "Blog Croisière Bosphore — Guides Voyage Istanbul",
    pageDescription:
      "Guides experts pour Istanbul : croisière Bosphore, croisière coucher de soleil, croisière dîner et planification de charter de yacht.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Blog",
    introHeading: "Contenus de planification pour la croisière sur le Bosphore",
    introBody:
      "Cette page renvoie à l'ensemble du contenu blog MerrySails sur la croisière Bosphore en anglais. Les articles couvrent les points de départ, les comparaisons d'itinéraires partagés et privés, les forfaits dîner et la planification du charter de yacht.",
    postsHeading: "Articles du blog",
    postsBody:
      "Tous les contenus sont actuellement publiés en anglais. Les liens ci-dessous renvoient vers les articles en anglais.",
    readArticle: "Lire l'article",
    ctaHeading: "Prêt à choisir la bonne croisière sur le Bosphore ?",
    ctaBody:
      "Indiquez-nous votre date, le nombre d'invités et l'expérience souhaitée. Réservation directe et opérateur agréé TÜRSAB groupe A.",
    ctaButtonCruises: "Voir les croisières Bosphore",
    ctaButtonReservation: "Réservation",
    viewInEnglish: "English →",
  },
  nl: {
    title: "Bosporus Cruise Blog — Istanbul Reisgidsen | MerrySails",
    description:
      "Expertgidsen voor Istanbul: Bosporus zonsondergang cruise tips, jachtcharter advies, diner cruise reviews en lokale reisinzichten — TÜRSAB A-groep gelicentieerd sinds 2001.",
    canonicalPath: "/nl/blog",
    pageTitle: "Bosporus Cruise Blog — Istanbul Reisgidsen",
    pageDescription:
      "Expertgidsen voor Istanbul Bosporus cruises, zonsondergang cruises, diner cruises en jachtcharter planning.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Blog",
    introHeading: "Planningsinhoud voor de Bosporus cruise in Istanbul",
    introBody:
      "Deze pagina linkt naar alle MerrySails blogartikelen over de Bosporus in het Engels. De artikelen behandelen vertrekpunten, gedeelde en privé route-vergelijkingen, dinerpakketten en jachtcharterplanning.",
    postsHeading: "Blogartikelen",
    postsBody:
      "Alle content wordt momenteel in het Engels gepubliceerd. Onderstaande links verwijzen naar de Engelstalige artikelen.",
    readArticle: "Artikel lezen",
    ctaHeading: "Klaar om de juiste Bosporus cruise te kiezen?",
    ctaBody:
      "Stuur ons uw datum, aantal gasten en gewenste ervaring. Directe boeking en TÜRSAB A-groep gelicentieerde operator.",
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
  const languages = buildHreflang("/blog") ?? {
    "x-default": `${SITE_URL}/blog`,
    en: `${SITE_URL}/blog`,
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

export default async function LocaleBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

  const localePosts = getAllLocalePostsForLocale(locale);
  // Show first 24 posts as a digest with English links
  const featured = blogPosts.slice(0, 24);

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

      <div className="pt-28 pb-20">
        <div className="container-main max-w-5xl">
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

          {localePosts.length > 0 && c.nativePostsHeading && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">{c.nativePostsHeading}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {localePosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="group block bg-white rounded-xl p-4 shadow-sm border border-[var(--line)] hover:border-[var(--brand-primary)] transition-colors h-full"
                    >
                      <h3 className="text-sm font-semibold mb-2 group-hover:text-[var(--brand-primary)] line-clamp-2">
                        {cleanContentText(post.title)}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-primary)]">
                        {c.readArticle} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{c.postsHeading}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">{c.postsBody}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-xl p-4 shadow-sm border border-[var(--line)] hover:border-[var(--brand-primary)] transition-colors h-full"
                  >
                    <h3 className="text-sm font-semibold mb-2 group-hover:text-[var(--brand-primary)] line-clamp-2">
                      {cleanContentText(post.title)}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-primary)]">
                      {c.readArticle} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                {c.viewInEnglish}
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 md:p-8 text-center">
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
