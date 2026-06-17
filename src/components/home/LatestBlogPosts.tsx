import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { cleanContentText } from "@/lib/content-text";

const featuredCommercialSlugs = [
  "bosphorus-sunset-cruise-vs-dinner-cruise",
  "bosphorus-dinner-cruise-what-to-expect",
  "bosphorus-cruise-boarding-points-guide-2026",
  "private-yacht-departure-points-istanbul",
];

const latestPosts = featuredCommercialSlugs
  .map((slug) => blogPosts.find((post) => post.slug === slug))
  .filter((post): post is (typeof blogPosts)[number] => Boolean(post));
const normalizedLatestPosts = latestPosts.map((post) => ({
  ...post,
  title: cleanContentText(post.title),
  excerpt: cleanContentText(post.excerpt),
  imageAlt: post.imageAlt ? cleanContentText(post.imageAlt) : post.imageAlt,
}));

export default function LatestBlogPosts() {
  return (
    <section className="py-16 md:py-24 bg-[var(--surface-alt)]">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Guides That Help You Choose the Right Cruise
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            These articles answer the questions people usually ask before booking
            a sunset cruise, dinner cruise, private yacht, or corporate yacht
            event in Istanbul.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {normalizedLatestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-md bg-[var(--brand-primary)] text-white">
                      {post.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(
                          post.dateModified || post.date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-cta-end))] px-8 py-3 text-sm font-semibold !text-white shadow-[0_16px_36px_rgba(24,41,135,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(24,41,135,0.34)]"
          >
            View All Guides & Blog Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
