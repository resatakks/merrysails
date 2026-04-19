"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import type { BlogCollection, BlogPost } from "@/data/blog";

type CategoryFilterValue = "all" | BlogPost["category"];

type BlogIndexClientProps = {
  blogPosts: BlogPost[];
  blogCollections: BlogCollection[];
  commercialSupportPosts: BlogPost[];
};

const categories: Array<{ label: string; value: CategoryFilterValue }> = [
  { label: "All", value: "all" },
  { label: "Cruise Guides", value: "cruise-guide" },
  { label: "Yacht Guides", value: "yacht-guide" },
  { label: "Events", value: "events" },
  { label: "Istanbul", value: "istanbul" },
  { label: "Tips", value: "tips" },
];

const POSTS_PER_PAGE = 12;

const bookingPages = [
  {
    href: "/cruises/bosphorus-sunset-cruise",
    eyebrow: "Golden hour",
    title: "Bosphorus Sunset Cruise",
    description: "For shared sunset demand, 2 clear options, and fast date-led booking intent.",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Bosphorus Dinner Cruise",
    description: "For the main evening route with fixed dinner packages and clear inclusions.",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Premium charter",
    title: "Yacht Charter Istanbul",
    description: "For larger private charters and the most tailored onboard setup.",
  },
] as const;

function formatCategoryLabel(category: BlogPost["category"]) {
  return category.replace("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function BlogIndexClient({
  blogPosts,
  blogCollections,
  commercialSupportPosts,
}: BlogIndexClientProps) {
  const [active, setActive] = useState<CategoryFilterValue>("all");
  const [search, setSearch] = useState("");
  const [shown, setShown] = useState(POSTS_PER_PAGE);

  const filtered = blogPosts.filter((post) => {
    const matchCategory = active === "all" || post.category === active;
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const groupedCollections = useMemo(() => {
    const postIndex = new Map(blogPosts.map((post) => [post.slug, post]));

    return blogCollections.map((collection) => ({
      ...collection,
      posts: collection.postSlugs
        .map((slug) => postIndex.get(slug))
        .filter((post): post is BlogPost => Boolean(post)),
    }));
  }, [blogCollections, blogPosts]);

  const featured = blogPosts[0];
  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--heading)]">
            Istanbul Bosphorus Cruise Blog & Travel Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
            Expert tips and route guides that help you choose between the 3 core products first,
            then move into proposal, boat-rental, corporate, and other support pages only when the
            brief needs them.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShown(POSTS_PER_PAGE);
              }}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[var(--line)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 focus:border-[var(--brand-primary)] transition-all"
            />
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-[var(--line)] bg-white p-5 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-[var(--heading)]">
              Start with the booking page first
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Use these 3 pages first when you already know the trip is about sunset, dinner, or
              private yacht charter.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {bookingPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  {item.eyebrow}
                </p>
                <h2 className="text-base font-semibold mb-2 text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)]">
                  Open booking page <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-[var(--line)] bg-white p-5 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-[var(--heading)]">
              Blog clusters before the language rollout
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-3xl mx-auto">
              The blog is now split into clear content clusters so English can stay commercially
              focused, internal linking can stay cleaner, and future locales can inherit the same
              structure without rewriting the taxonomy from scratch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groupedCollections.map((collection) => (
              <a
                key={collection.slug}
                href={`#cluster-${collection.slug}`}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                      {formatCategoryLabel(collection.primaryCategory)}
                    </p>
                    <h2 className="text-lg font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {collection.title}
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] border border-[var(--line)]">
                    {collection.posts.length} posts
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {collection.description}
                </p>
                <p className="text-sm text-[var(--body-text)] leading-relaxed">
                  {collection.intent}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)]">
                  Jump to cluster <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-5 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-[var(--heading)]">
              Planning reads for higher-intent requests
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              These are the pieces to open when the booking is already leaning toward dinner, a
              proposal, a charter, or a corporate brief.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commercialSupportPosts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-[var(--line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:shadow-md"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {formatCategoryLabel(post.category)}
                </p>
                <h2 className="mb-2 text-lg font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)]">
                  Read the guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {!search && active === "all" && featured ? (
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
                  {formatCategoryLabel(featured.category)}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[var(--brand-primary)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.dateModified || featured.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ) : null}

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setActive(category.value);
                setShown(POSTS_PER_PAGE);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === category.value
                  ? "bg-[var(--brand-primary)] text-white shadow-md"
                  : "bg-white text-[var(--body-text)] hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {search ? (
          <p className="text-sm text-[var(--text-muted)] text-center mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        ) : null}

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
                      {formatCategoryLabel(post.category)}
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

        {hasMore ? (
          <div className="text-center mt-10">
            <button
              onClick={() => setShown((count) => count + POSTS_PER_PAGE)}
              className="px-8 py-3 rounded-full bg-[var(--brand-primary)] text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              Load More Articles ({filtered.length - shown} remaining)
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[var(--text-muted)]">No articles found.</p>
            <button
              onClick={() => {
                setSearch("");
                setActive("all");
              }}
              className="mt-4 text-[var(--brand-primary)] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        <nav aria-label="All blog articles" className="mt-16 border-t border-[var(--line)] pt-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-xl font-bold mb-3 text-[var(--heading)]">All Articles by Cluster</h2>
            <p className="text-sm text-[var(--text-muted)]">
              This grouped index keeps the blog easier to browse, easier to localize, and easier to
              connect with the main booking themes without flattening everything into one long list.
            </p>
          </div>
          <div className="space-y-10">
            {groupedCollections.map((collection) => (
              <section
                key={collection.slug}
                id={`cluster-${collection.slug}`}
                className="scroll-mt-32"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                      {formatCategoryLabel(collection.primaryCategory)}
                    </p>
                    <h2 className="text-lg md:text-xl font-bold text-[var(--heading)]">
                      {collection.title}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{collection.description}</p>
                    <p className="mt-2 text-sm text-[var(--body-text)]">{collection.intent}</p>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                    {collection.posts.length} posts
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  {collection.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
