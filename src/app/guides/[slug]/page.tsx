import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, BookOpen } from "lucide-react";
import { guides, getGuideBySlug, getAllGuideSlugs } from "@/data/guides";
import { getTourBySlug, getTourPath, isPricingVisible } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { getAuthor } from "@/data/team";
import { cleanContentText } from "@/lib/content-text";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_LAST_MODIFIED } from "@/lib/freshness";

const defaultGuideSupportSlugs = [
  "bosphorus-cruise-boarding-points-guide-2026",
  "bosphorus-sunset-cruise-vs-dinner-cruise",
  "bosphorus-dinner-cruise-what-to-expect",
  "private-yacht-departure-points-istanbul",
] as const;

const guideSupportPostMap: Record<string, readonly string[]> = {
  "kabatas-pier": [
    "bosphorus-cruise-boarding-points-guide-2026",
    "bosphorus-dinner-cruise-what-to-expect",
    "bosphorus-sunset-cruise-vs-dinner-cruise",
    "bosphorus-cruise-departure-points",
  ],
  "karakoy-waterfront": [
    "istanbul-sunset-cruise-experience",
    "bosphorus-sunset-cruise-vs-dinner-cruise",
    "bosphorus-cruise-boarding-points-guide-2026",
    "bosphorus-cruise-departure-points",
  ],
  "kurucesme-marina": [
    "private-yacht-departure-points-istanbul",
    "boat-rental-vs-yacht-charter-istanbul",
    "corporate-yacht-events-on-the-bosphorus",
    "proposal-yacht-rental-istanbul-planning-guide",
  ],
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const cleanTitle = cleanContentText(guide.title);
  const cleanDescription = cleanContentText(guide.metaDescription);

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: `https://merrysails.com/guides/${guide.slug}`,
      languages: buildHreflang(`/guides/${guide.slug}`),
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
      url: `https://merrysails.com/guides/${guide.slug}`,
      type: "article",
      images: [{ url: guide.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [guide.image],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const cleanTitle = cleanContentText(guide.title);
  const cleanDescription = cleanContentText(guide.metaDescription);
  const cleanExcerpt = cleanContentText(guide.excerpt);

  const relatedTours = guide.relatedTours
    .map((s) => getTourBySlug(s))
    .filter(Boolean)
    .slice(0, 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://merrysails.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://merrysails.com/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cleanTitle,
        item: `https://merrysails.com/guides/${guide.slug}`,
      },
    ],
  };

  // Authorship + freshness signal — author resolves through team.ts to a
  // named Person (Captain Ahmet by default); Google's Article spec wants
  // author as an array of Person objects, not an Organization/Thing merge.
  const guideAuthor = getAuthor(guide.author ?? "captain-ahmet");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cleanTitle,
    description: cleanDescription,
    image: guide.image,
    datePublished: "2025-09-15",
    dateModified: guide.dateModified ?? SITE_LAST_MODIFIED,
    author: [
      {
        "@type": "Person",
        name: guideAuthor?.name ?? "Captain Ahmet Yıldız",
        jobTitle: guideAuthor?.role ?? "Senior Captain",
        description: guideAuthor?.bio,
        worksFor: {
          "@type": "Organization",
          "@id": "https://merrysails.com/#organization",
          name: "MerrySails",
          url: "https://merrysails.com",
        },
      },
    ],
    publisher: {
      "@type": "Organization",
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails",
      url: "https://merrysails.com",
      logo: {
        "@type": "ImageObject",
        url: "https://merrysails.com/logo.svg",
      },
    },
    mainEntityOfPage: `https://merrysails.com/guides/${guide.slug}`,
  };

  const placeSchema = guide.geo ? {
    "@context": "https://schema.org",
    "@type": "Place",
    name: cleanTitle,
    description: cleanExcerpt,
    geo: {
      "@type": "GeoCoordinates",
      latitude: guide.geo.lat,
      longitude: guide.geo.lng,
    },
    url: `https://merrysails.com/guides/${guide.slug}`,
    containedInPlace: {
      "@type": "City",
      name: "Istanbul",
    },
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {placeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
        />
      )}

      <article className="pt-28 pb-20">
        <div className="container-main max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link
              href="/"
              className="hover:text-[var(--brand-primary)] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/guides"
              className="hover:text-[var(--brand-primary)] transition-colors"
            >
              Guides
            </Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[var(--text-muted)] truncate max-w-xs">
              {cleanTitle}
            </span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
              <span className="text-sm font-medium text-[var(--brand-primary)]">
                Istanbul Cruise & Location Guide
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {cleanTitle}
            </h1>
            <p className="text-lg text-[var(--body-text)]">{cleanExcerpt}</p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10">
            <Image
              src={guide.image}
              alt={cleanTitle}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Inline commercial CTA — ChatGPT/Perplexity entry traffic conversion */}
          {relatedTours.length > 0 && relatedTours[0] && (
            <div className="mb-10 rounded-2xl border border-[var(--brand-primary)]/20 bg-gradient-to-br from-[var(--brand-primary)]/5 via-white to-[var(--brand-gold)]/5 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)] mb-2">
                    See it from the water
                  </p>
                  <p className="text-base font-semibold text-[var(--heading)] leading-snug">
                    Experience {guide.title.split("—")[0].trim()} on a Bosphorus cruise — TURSAB-licensed, direct booking, free 24h cancellation.
                  </p>
                  {isPricingVisible(relatedTours[0]) && (
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      From <strong className="text-[var(--brand-primary)]">€{relatedTours[0].priceEur}</strong> · {relatedTours[0].duration} · MerrySails since 2001
                    </p>
                  )}
                </div>
                <Link
                  href={getTourPath(relatedTours[0])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-primary)]/90 sm:shrink-0"
                >
                  View cruise <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="max-w-none">
            {guide.sections.map((section, i) => (
              <BlogSectionBlock key={i} section={section} index={i} />
            ))}
          </div>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Experience It on a Cruise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTours.map((tour) =>
                  tour ? (
                    <Link
                      key={tour.slug}
                      href={getTourPath(tour)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={tour.image}
                          alt={tour.nameEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                          {tour.nameEn}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">
                            {isPricingVisible(tour) ? `From €${tour.priceEur}` : "Service page"}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[var(--brand-primary)]" />
                        </div>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Related Blog Posts */}
          {(() => {
            const relatedBlog = (guideSupportPostMap[guide.slug] || defaultGuideSupportSlugs)
              .map((relatedSlug) => blogPosts.find((post) => post.slug === relatedSlug))
              .filter((post): post is NonNullable<(typeof blogPosts)[number]> => Boolean(post))
              .slice(0, 4);
            if (relatedBlog.length === 0) return null;
            return (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--brand-primary)]" />
                  Related Blog Posts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedBlog.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-3 bg-[var(--surface-alt)] rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={post.image}
                          alt={cleanContentText(post.imageAlt || post.title)}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                          {cleanContentText(post.title)}
                        </h3>
                        <span className="text-xs text-[var(--text-muted)]">{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Other Guides */}
          {(() => {
            const otherGuides = guides.filter(g => g.slug !== slug).slice(0, 4);
            return (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Explore More Istanbul Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {otherGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={g.image}
                          alt={cleanContentText(g.title)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                          {cleanContentText(g.title)}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* CTA */}
          <div className="mt-12 bg-[var(--brand-dark)] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Compare the Right Bosphorus Cruise Route
            </h2>
            <p className="text-white/70 mb-6">
              Use the main compare hub first, then move to the owner page or support page that matches your real intent.
            </p>
            <Link href="/bosphorus-cruise" className="btn-cta !py-3 !px-8">
              Compare Bosphorus Cruises
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
