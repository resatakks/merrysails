"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Search } from "lucide-react";
import { blogPosts } from "@/data/blog";

const categories = [
  { label: "All", value: "all" },
  { label: "Cruise Guides", value: "cruise-guide" },
  { label: "Yacht Guides", value: "yacht-guide" },
  { label: "Events", value: "events" },
  { label: "Istanbul", value: "istanbul" },
  { label: "Tips", value: "tips" },
];

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [shown, setShown] = useState(POSTS_PER_PAGE);

  const filtered = blogPosts.filter((p) => {
    const matchCategory = active === "all" || p.category === active;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = blogPosts[0];
  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Istanbul Bosphorus Cruise Blog & Travel Guides",
    description: "Expert cruise guides and travel tips for Istanbul.",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://merrysails.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://merrysails.com/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--heading)]">
            Istanbul Bosphorus Cruise Blog & Travel Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
            Expert tips, detailed guides, and insider knowledge for your
            Istanbul boat tour, dinner cruise, yacht charter, and travel
            planning.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShown(POSTS_PER_PAGE); }}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[var(--line)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 focus:border-[var(--brand-primary)] transition-all"
            />
          </div>
        </div>

        {/* Featured Post */}
        {!search && active === "all" && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row">
              <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt || featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--brand-primary)] text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] w-fit mb-3">
                  {featured.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[var(--brand-primary)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.dateModified || featured.date).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setActive(cat.value); setShown(POSTS_PER_PAGE); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === cat.value
                  ? "bg-[var(--brand-primary)] text-white shadow-md"
                  : "bg-white text-[var(--body-text)] hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-sm text-[var(--text-muted)] text-center mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-md bg-[var(--brand-primary)] text-white">
                      {post.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
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
                        {new Date(post.dateModified || post.date).toLocaleDateString("en-US", {
                          month: "short", day: "numeric",
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

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShown((s) => s + POSTS_PER_PAGE)}
              className="px-8 py-3 rounded-full bg-[var(--brand-primary)] text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              Load More Articles ({filtered.length - shown} remaining)
            </button>
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-[var(--text-muted)]">No articles found.</p>
            <button
              onClick={() => { setSearch(""); setActive("all"); }}
              className="mt-4 text-[var(--brand-primary)] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
