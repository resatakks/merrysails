import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, BookOpen } from "lucide-react";
import { guides, getGuideBySlug, getAllGuideSlugs } from "@/data/guides";
import { getTourBySlug, getTourPath, isPricingVisible } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { cleanContentText } from "@/lib/content-text";
import { BlogSectionBlock } from "@/components/blog/blog-section";

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
    .map(getTourBySlug)
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cleanTitle,
    description: cleanDescription,
    image: guide.image,
    datePublished: "2025-09-15",
    dateModified: "2026-04-23",
    author: {
      "@type": "Organization",
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails",
      url: "https://merrysails.com",
    },
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
            <span className="text-[var(--heading)] truncate max-w-xs">
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
