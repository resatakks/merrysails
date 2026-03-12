import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { guides, getGuideBySlug, getAllGuideSlugs } from "@/data/guides";
import { getTourBySlug } from "@/data/tours";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: `https://merrysails.com/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `https://merrysails.com/guides/${guide.slug}`,
      type: "article",
      images: [{ url: guide.image }],
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
        name: guide.title,
        item: `https://merrysails.com/guides/${guide.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    image: guide.image,
    datePublished: "2025-09-15",
    dateModified: "2026-03-10",
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
              {guide.title}
            </span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
              <span className="text-sm font-medium text-[var(--brand-primary)]">
                Istanbul Landmark Guide
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {guide.title}
            </h1>
            <p className="text-lg text-[var(--body-text)]">{guide.excerpt}</p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {guide.sections.map((section, i) => (
              <section key={i} className="mb-8">
                <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">
                  {section.heading}
                </h2>
                <p className="text-[var(--body-text)] leading-relaxed">
                  {section.content}
                </p>
              </section>
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
                      href={`/cruises/${tour.slug}`}
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
                            From €{tour.priceEur}
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

          {/* CTA */}
          <div className="mt-12 bg-[var(--brand-dark)] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              See This Landmark on a Bosphorus Cruise
            </h2>
            <p className="text-white/70 mb-6">
              Book direct for the best price — sunset cruises from €20.
            </p>
            <Link
              href="/cruises"
              className="btn-cta !py-3 !px-8"
            >
              View All Cruises
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
