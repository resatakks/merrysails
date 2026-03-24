import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts, getBlogBySlug, getAllBlogSlugs } from "@/data/blog";
import { getTourBySlug } from "@/data/tours";
import { getAuthor } from "@/data/team";
import { KeyTakeaways } from "@/components/blog/key-takeaways";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { AuthorCard } from "@/components/blog/author-card";
import { InlineCTA } from "@/components/blog/inline-cta";
import { RelatedPosts } from "@/components/blog/related-posts";

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
      title: post.title,
      description: post.metaDescription,
      url: `https://merrysails.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
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

  const author = getAuthor(post.author || "editorial");
  const relatedTours = post.relatedTours
    .map(getTourBySlug)
    .filter(Boolean)
    .slice(0, 3);

  const midPoint = Math.floor(post.sections.length / 2);

  // Schema: Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      "@type": "Person",
      name: author?.name || "MerrySails Editorial Team",
      url: "https://merrysails.com/about",
      jobTitle: author?.role || "Local Istanbul Travel Experts",
      description: author?.credential,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails",
      url: "https://merrysails.com",
      logo: { "@type": "ImageObject", url: "https://merrysails.com/logo.svg" },
    },
    mainEntityOfPage: `https://merrysails.com/blog/${post.slug}`,
    articleSection: post.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };

  // Schema: FAQ
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

  // Schema: Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://merrysails.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://merrysails.com/blog/${post.slug}` },
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
            <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[var(--brand-primary)] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate max-w-xs">{post.title}</span>
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
                {new Date(post.dateModified || post.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">
              {post.title}
            </h1>
            <p className="text-lg text-[var(--body-text)] mb-6">{post.excerpt}</p>

            <AuthorCard authorId={post.author} variant="compact" />
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8 max-w-4xl">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
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

          {/* Content + Sidebar Layout */}
          <div className="flex gap-10 max-w-6xl">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl min-w-0">
              {post.sections.map((section, i) => (
                <div key={i}>
                  <BlogSectionBlock section={section} index={i} />
                  {i === midPoint && <InlineCTA />}
                </div>
              ))}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents headings={post.sections.map((s) => s.heading)} />

              {/* Sidebar CTA */}
              <div className="mt-8 rounded-xl bg-[var(--brand-primary)] p-5 text-center">
                <p className="text-white font-bold text-sm mb-2">Best Price Guaranteed</p>
                <p className="text-white/70 text-xs mb-4">Book direct — no middleman fees</p>
                <Link
                  href="/cruises"
                  className="inline-flex items-center gap-1.5 bg-white text-[var(--brand-primary)] font-bold py-2.5 px-5 rounded-full text-xs hover:shadow-lg transition-all w-full justify-center"
                >
                  View Cruises <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <div className="max-w-4xl mt-12 bg-[var(--surface-alt)] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group bg-white rounded-xl">
                    <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-[var(--heading)] hover:text-[var(--brand-primary)] transition-colors">
                      {faq.q}
                      <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <p className="px-4 pb-4 text-[var(--body-text)] leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio (full) */}
          <div className="max-w-4xl">
            <AuthorCard authorId={post.author} variant="full" />
          </div>

          {/* Related Blog Posts */}
          <div className="max-w-4xl">
            <RelatedPosts
              slugs={post.relatedPosts}
              currentSlug={post.slug}
              category={post.category}
            />
          </div>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <div className="max-w-4xl mt-12">
              <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">Related Tours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTours.map((tour) =>
                  tour ? (
                    <Link
                      key={tour.slug}
                      href={`/cruises/${tour.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
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
          <div className="max-w-4xl mt-12 bg-[var(--brand-dark)] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Book Your Istanbul Experience?
            </h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Best price guaranteed when you book direct. No middleman fees. TURSAB licensed since 2001.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/cruises"
                className="btn-cta !py-3 !px-6 text-sm"
              >
                View All Cruises <ArrowRight className="w-4 h-4" />
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
          <div className="max-w-4xl mt-8">
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
