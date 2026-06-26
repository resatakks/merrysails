import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getLocalePostBySlug, getAllLocalePostSlugs, getLocaleRelatedPosts } from "@/data/blog/locale-posts";
import { getAuthor } from "@/data/team";
import { KeyTakeaways } from "@/components/blog/key-takeaways";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { AuthorCard } from "@/components/blog/author-card";
import InArticleBookingCTA from "@/components/blog/InArticleBookingCTA";
import { inferCruiseTypeFromSlug } from "@/components/blog/infer-cruise-type";
import { isActiveLocale, ACTIVE_LOCALES, type SiteLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { cleanContentText } from "@/lib/content-text";
import { localeHref, localeBlogHref } from "@/lib/locale-link";

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
  relatedHeading: string;
}> = {
  tr: {
    home: "Ana Sayfa",
    blog: "Blog",
    faqHeading: "Sıkça Sorulan Sorular",
    ctaHeading: "Rezervasyonunuzu Yapın",
    ctaBody: "TÜRSAB A Grubu lisanslı, 2001'den bu yana 50.000+ misafir. Doğrudan rezervasyon, en iyi fiyat garantisi.",
    ctaButton: "Tur Seçeneklerini İncele",
    whatsapp: "WhatsApp ile İletişim",
    relatedHeading: "Bunları da Beğenebilirsiniz",
  },
  de: {
    home: "Startseite",
    blog: "Blog",
    faqHeading: "Häufig gestellte Fragen",
    ctaHeading: "Jetzt buchen",
    ctaBody: "TÜRSAB A-Gruppe lizenziert, seit 2001 über 50.000 Gäste. Direktbuchung, bestes Preisversprechen.",
    ctaButton: "Kreuzfahrten ansehen",
    whatsapp: "WhatsApp Kontakt",
    relatedHeading: "Das könnte Sie auch interessieren",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    faqHeading: "Questions fréquentes",
    ctaHeading: "Réservez maintenant",
    ctaBody: "Licence TÜRSAB groupe A, plus de 50 000 clients depuis 2001. Réservation directe, meilleur tarif garanti.",
    ctaButton: "Voir les croisières",
    whatsapp: "Contact WhatsApp",
    relatedHeading: "Vous aimerez aussi",
  },
  nl: {
    home: "Startpagina",
    blog: "Blog",
    faqHeading: "Veelgestelde vragen",
    ctaHeading: "Boek nu",
    ctaBody: "TÜRSAB groep A vergunning, meer dan 50.000 gasten sinds 2001. Directe boeking, beste prijsgarantie.",
    ctaButton: "Bekijk cruises",
    whatsapp: "WhatsApp contact",
    relatedHeading: "Misschien vind je dit ook leuk",
  },
  ru: {
    home: "Главная",
    blog: "Блог",
    faqHeading: "Часто задаваемые вопросы",
    ctaHeading: "Забронировать",
    ctaBody: "Лицензия TÜRSAB группы A, более 50 000 гостей с 2001 года. Прямое бронирование, гарантия лучшей цены.",
    ctaButton: "Смотреть круизы",
    whatsapp: "Связаться по WhatsApp",
    relatedHeading: "Вам также может понравиться",
  },
  zh: {
    home: "首页",
    blog: "博客",
    faqHeading: "常见问题",
    ctaHeading: "立即预订",
    ctaBody: "TÜRSAB A 类许可,自 2001 年起接待超过 50,000 名客人。直接预订,保证最优价格。",
    ctaButton: "查看游船",
    whatsapp: "通过 WhatsApp 联系",
    relatedHeading: "您可能也喜欢",
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
    // absolute title with brand suffix so <title> differs from the H1
    // (Semrush "duplicate H1 and title content").
    title: { absolute: `${cleanTitle} | MerrySails` },
    description: cleanDescription,
    keywords: post.keywords,
    alternates: {
      // Locale blog posts are standalone locale-market content with no
      // cross-language equivalent. Emitting x-default → /blog was wrong:
      // /blog never reciprocates to the individual post, so Semrush flagged
      // it as a broken/incorrect hreflang. Self-referencing hreflang only.
      canonical,
      languages: {
        [locale]: canonical,
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
  // Index for the universal in-article booking CTA. Targets the 3rd→4th H2
  // boundary so the CTA lands in the upper half of long-form posts.
  const autoCtaMidIndex = Math.min(2, Math.max(0, post.sections.length - 2));
  const ctaCruiseType = inferCruiseTypeFromSlug(post.slug);
  // Same-locale related posts so every locale blog post receives ≥3 internal
  // links from siblings (Screaming Frog/SEMrush 2026-06-23: locale posts had no
  // related grid → "only one internal link"). Deterministic, spreads inlinks.
  const relatedLocalePosts = getLocaleRelatedPosts(locale, post.slug, 3);

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
            <Link href={localeHref(locale as SiteLocale, "/blog")} className="hover:text-[var(--brand-primary)] transition-colors">
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

          {/* Top in-article booking CTA — above-the-fold price + book button. */}
          {!post.disableAutoCTA && (
            <InArticleBookingCTA
              cruiseType={ctaCruiseType}
              locale={locale}
              position="top"
              slug={post.slug}
            />
          )}

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
                  {/* Auto in-article booking CTA, spliced between 3rd/4th H2. */}
                  {!post.disableAutoCTA && i === autoCtaMidIndex && (
                    <InArticleBookingCTA
                      cruiseType={ctaCruiseType}
                      locale={locale}
                      position="mid"
                      slug={post.slug}
                    />
                  )}
                  {/* Legacy localized mid-CTA — runs only when the auto CTA is
                      disabled or the mid index is elsewhere, so we never
                      double-up on long posts. */}
                  {(post.disableAutoCTA || i !== autoCtaMidIndex) && i === midPoint && (
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
                          href="https://wa.me/905448989812"
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

          {/* Bottom "Next Steps" booking panel — 3 booking options + messaging
              channel right before the FAQ where intent peaks. */}
          {!post.disableAutoCTA && (
            <InArticleBookingCTA
              cruiseType={ctaCruiseType}
              locale={locale}
              position="bottom"
              slug={post.slug}
            />
          )}

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
                href="https://wa.me/905448989812"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-white/20 transition-all justify-center"
              >
                {ui.whatsapp}
              </Link>
            </div>
          </div>

          {/* Related posts — same-locale siblings (≥3 internal links per post) */}
          {relatedLocalePosts.length > 0 && (
            <div className="max-w-4xl mt-12">
              <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
                {ui.relatedHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedLocalePosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={localeBlogHref(locale as SiteLocale, rp.slug)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={cleanContentText(rp.imageAlt || rp.title)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                        {cleanContentText(rp.title)}
                      </h3>
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rp.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="max-w-4xl mt-8">
            <Link
              href={localeHref(locale as SiteLocale, "/blog")}
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
