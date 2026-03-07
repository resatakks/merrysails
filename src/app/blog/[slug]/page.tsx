import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { blogPosts, getBlogBySlug, getAllBlogSlugs } from "@/data/blog";
import { getTourBySlug } from "@/data/tours";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://merrysails.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://merrysails.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const relatedTours = post.relatedTours
    .map(getTourBySlug)
    .filter(Boolean)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "MerrySails Editorial Team",
      url: "https://merrysails.com/about",
      jobTitle: "Local Istanbul Travel Experts",
    },
    publisher: {
      "@type": "Organization",
      name: "MerrySails",
      url: "https://merrysails.com",
      logo: {
        "@type": "ImageObject",
        url: "https://merrysails.com/logo.png",
      },
    },
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://merrysails.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://merrysails.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://merrysails.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              href="/blog"
              className="hover:text-[var(--brand-primary)] transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--brand-primary)] text-white">
                {post.category
                  .replace("-", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
              <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-[var(--body-text)]">{post.excerpt}</p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, i) => (
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

          {/* Author Bio */}
          <div className="mt-10 border-t border-[var(--line)] pt-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
              <span className="text-[var(--brand-primary)] font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-semibold text-[var(--heading)]">MerrySails Editorial Team</div>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Written by local Istanbul maritime experts with 10+ years of experience operating Bosphorus cruises and yacht charters. Our team lives and breathes Istanbul&apos;s waterways.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <div className="mt-12 bg-[var(--surface-alt)] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-[var(--heading)] mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-[var(--body-text)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Tours CTA */}
          {relatedTours.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Tours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                          {tour.nameEn}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[var(--heading)]">
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

          {/* Bottom CTA */}
          <div className="mt-12 bg-[var(--brand-dark)] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Book Your Istanbul Experience?
            </h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Best price guaranteed when you book direct. No middleman fees.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/cruises"
                className="btn-cta !py-3 !px-6 text-sm"
              >
                View All Cruises
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--brand-whatsapp)] text-white font-bold py-3 px-6 rounded-full text-sm hover:brightness-110 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
