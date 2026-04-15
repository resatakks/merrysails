import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";

const latestPosts = blogPosts.slice(0, 4);

const commercialNextSteps = [
  {
    href: "/yacht-charter-istanbul",
    title: "Ready for a private yacht instead of a general guide?",
    description: "Use the yacht charter page when you want to compare route, crew setup, and onboard service in one place.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Want a dinner cruise with a private setup?",
    description: "The private dinner page is the better fit when you want a reserved yacht, meal service, and a calmer evening plan.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Planning a proposal or special moment?",
    description: "The proposal page keeps the route, timing, photo flow, and celebration details focused on one goal.",
  },
  {
    href: "/corporate-events",
    title: "Hosting a company or client event?",
    description: "For team hosting, client entertainment, or brand events, the corporate page explains the setup more clearly.",
  },
];

const searchIntentShortcuts = [
  {
    href: "/boat-rental-istanbul",
    title: "Boat rental option",
    description: "Choose this page when you want a practical private boat plan without moving into a full yacht charter setup.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht charter option",
    description: "Choose this page when crew service, route planning, and a fully private yacht matter most.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Dinner or sunset option",
    description: "This page explains the meal flow, timing, and private evening setup in more useful detail.",
  },
  {
    href: "/private-events",
    title: "Birthday and celebration option",
    description: "Private event plans work better on a page that focuses on guests, decoration, timing, and celebration flow.",
  },
];

export default function LatestBlogPosts() {
  return (
    <section className="py-16 md:py-24 bg-[var(--surface-alt)]">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Latest Blog Posts & Travel Guides
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Expert tips, insider knowledge, and detailed guides to help you plan
            the perfect Bosphorus cruise and Istanbul experience.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
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

        <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Start with a guide, then move to the page that matches your cruise plan
            </h3>
            <p className="text-[var(--text-muted)]">
              Travel guides help you compare options, but the next step should feel more specific than a general article.
              These shortcuts take you to the pages built around charter, dinner, proposal, and company-event planning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commercialNextSteps.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5 hover:border-[var(--brand-primary)]/30 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--text-muted)] mb-4">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                  Open this page
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Pick the page that matches the kind of cruise you want
            </h3>
            <p className="text-[var(--text-muted)]">
              Some guests want a practical boat rental, some want a full yacht charter, and others want a dinner or celebration plan.
              Choosing the more specific page early makes the next step faster and clearer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchIntentShortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5 hover:border-[var(--brand-primary)]/30 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--text-muted)] mb-4">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                  View this option
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--brand-primary)] text-white font-semibold text-sm hover:shadow-lg transition-all"
          >
            View All Blog Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
