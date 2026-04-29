import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getLocalePostBySlug, getAllLocalePostSlugs } from "@/data/blog/locale-posts";
import { getAuthor } from "@/data/team";
import { KeyTakeaways } from "@/components/blog/key-takeaways";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { AuthorCard } from "@/components/blog/author-card";
import { isActiveLocale, ACTIVE_LOCALES, type SiteLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { cleanContentText } from "@/lib/content-text";

const DATE_LOCALE_MAP: Record<string, string> = {
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  nl: "nl-NL",
};

const UI_COPY: Record<string, {
  home: string;
  blog: string;
  faqHeading: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  whatsapp: string;
}> = {
  tr: {
    home: "Ana Sayfa",
    blog: "Blog",
    faqHeading: "Sıkça Sorulan Sorular",
    ctaHeading: "Rezervasyonunuzu Yapın",
    ctaBody: "TÜRSAB A Grubu lisanslı, 2001'den bu yana 50.000+ misafir. Doğrudan rezervasyon, en iyi fiyat garantisi.",
    ctaButton: "Tur Seçeneklerini İncele",
    whatsapp: "WhatsApp ile İletişim",
  },
  de: {
    home: "Startseite",
    blog: "Blog",
    faqHeading: "Häufig gestellte Fragen",
    ctaHeading: "Jetzt buchen",
    ctaBody: "TÜRSAB A-Gruppe lizenziert, seit 2001 über 50.000 Gäste. Direktbuchung, bestes Preisversprechen.",
    ctaButton: "Kreuzfahrten ansehen",
    whatsapp: "WhatsApp Kontakt",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    faqHeading: "Questions fréquentes",
    ctaHeading: "Réservez maintenant",
    ctaBody: "Licence TÜRSAB groupe A, plus de 50 000 clients depuis 2001. Réservation directe, meilleur tarif garanti.",
    ctaButton: "Voir les croisières",
    whatsapp: "Contact WhatsApp",
  },
  nl: {
    home: "Startpagina",
    blog: "Blog",
    faqHeading: "Veelgestelde vragen",
    ctaHeading: "Boek nu",
    ctaBody: "TÜRSAB groep A vergunning, meer dan 50.000 gasten sinds 2001. Directe boeking, beste prijsgarantie.",
    ctaButton: "Bekijk cruises",
    whatsapp: "WhatsApp contact",
  },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ACTIVE_LOCALES) {
    if (locale === "en") continue;
    for (const slug of getAllLocalePostSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getLocalePostBySlug(locale, slug);
  if (!post) return {};

  const cleanTitle = cleanContentText(post.title);
  const cleanDescription = cleanContentText(post.metaDescription);
  const canonical = `${SITE_URL}/${locale}/blog/${post.slug}`;

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords: post.keywords,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        "x-default": `${SITE_URL}/blog`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: cleanContentText(post.imageAlt || cleanTitle) }],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [post.image],
    },
  };
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const post = getLocalePostBySlug(locale, slug);
  if (!post) notFound();

  const siteLocale = locale as SiteLocale;
  const ui = UI_COPY[siteLocale] ?? UI_COPY.tr;
  const cleanTitle = cleanContentText(post.title);
  const cleanDescription = cleanContentText(post.metaDescription);
  const cleanExcerpt = cleanContentText(post.excerpt);
  const canonical = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const dateLocale = DATE_LOCALE_MAP[locale] ?? "tr-TR";

  const midPoint = Math.floor(post.sections.length / 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonical,
    headline: cleanTitle,
    description: cleanDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "MerrySails",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MerrySails",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: canonical,
  };

  const faqSchema =
    (post.faqs ?? []).length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (post.faqs ?? []).map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: ui.blog, item: `${SITE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: cleanTitle, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pt-28 pb-20">
        <div className="container-main">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6 max-w-4xl">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)] transition-colors">
              {ui.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[var(--brand-primary)] transition-colors">
              {ui.blog}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate max-w-xs">{cleanTitle}</span>
          </nav>

          {/* Header */}
          <header className="max-w-4xl mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--brand-primary)] text-white">
                {post.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
              <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.dateModified || post.date).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="blog-title text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">
              {cleanTitle}
            </h1>
            <p className="blog-intro text-lg text-[var(--body-text)] mb-6">{cleanExcerpt}</p>

            <AuthorCard authorId={post.author} variant="compact" />
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8 max-w-4xl">
            <Image
              src={post.image}
              alt={cleanContentText(post.imageAlt || cleanTitle)}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Key Takeaways */}
          <div className="max-w-4xl">
            {post.keyTakeaways && <KeyTakeaways items={post.keyTakeaways} />}
          </div>

          {/* Mobile ToC */}
          <div className="max-w-4xl">
            <TableOfContents headings={post.sections.map((s) => s.heading)} />
          </div>

          {/* Content + Sidebar */}
          <div className="flex gap-10 max-w-6xl">
            <div className="flex-1 max-w-4xl min-w-0">
              {post.sections.map((section, i) => (
                <div key={i}>
                  <BlogSectionBlock section={section} index={i} />
                  {i === midPoint && (
                    <div className="my-8 rounded-2xl bg-[var(--brand-primary)] p-6 text-center">
                      <p className="text-white font-bold text-base mb-1">{ui.ctaHeading}</p>
                      <p className="text-white/80 text-sm mb-4">{ui.ctaBody}</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          href={`/${locale}/bosphorus-cruise`}
                          className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-bold py-2.5 px-6 rounded-full text-sm hover:shadow-lg transition-all justify-center"
                        >
                          {ui.ctaButton} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="https://wa.me/905370406822"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold py-2.5 px-6 rounded-full text-sm hover:bg-white/20 transition-all justify-center"
                        >
                          {ui.whatsapp}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents headings={post.sections.map((s) => s.heading)} />
              <div className="mt-8 rounded-xl bg-[var(--brand-primary)] p-5 text-center">
                <p className="text-white font-bold text-sm mb-2">{ui.ctaHeading}</p>
                <p className="text-white/70 text-xs mb-4">{ui.ctaBody}</p>
                <Link
                  href={`/${locale}/bosphorus-cruise`}
                  className="inline-flex items-center gap-1.5 bg-white text-[var(--brand-primary)] font-bold py-2.5 px-5 rounded-full text-xs hover:shadow-lg transition-all w-full justify-center"
                >
                  {ui.ctaButton} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>

          {/* FAQ */}
          {(post.faqs ?? []).length > 0 && (
            <div className="blog-faq max-w-4xl mt-12 bg-[var(--surface-alt)] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">{ui.faqHeading}</h2>
              <div className="space-y-5">
                {(post.faqs ?? []).map((faq, i) => (
                  <details key={i} className="group bg-white rounded-xl">
                    <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-[var(--heading)] hover:text-[var(--brand-primary)] transition-colors">
                      {faq.q}
                      <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <p className="px-4 pb-4 text-[var(--body-text)] leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="max-w-4xl mt-12">
            <AuthorCard authorId={post.author} variant="full" />
          </div>

          {/* Bottom CTA */}
          <div className="max-w-4xl mt-12 rounded-2xl bg-[var(--brand-primary)] p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">{ui.ctaHeading}</h2>
            <p className="text-white/80 mb-6">{ui.ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/bosphorus-cruise`}
                className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-bold py-3 px-8 rounded-full text-sm hover:shadow-xl transition-all justify-center"
              >
                {ui.ctaButton} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-white/20 transition-all justify-center"
              >
                {ui.whatsapp}
              </Link>
            </div>
          </div>

          {/* Back link */}
          <div className="max-w-4xl mt-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {ui.blog}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
