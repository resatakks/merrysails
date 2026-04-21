import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";

const featuredCommercialSlugs = [
  "istanbul-sunset-cruise-experience",
  "istanbul-dinner-cruise-price-guide-2026",
  "bosphorus-cruise-boarding-points-guide-2026",
  "corporate-yacht-event-planning-istanbul",
];

const latestPosts = featuredCommercialSlugs
  .map((slug) => blogPosts.find((post) => post.slug === slug))
  .filter((post): post is (typeof blogPosts)[number] => Boolean(post));

const commercialNextSteps = [
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul for private crews and onboard service",
    description: "Private yacht charter keeps route, crew, and service details in one place for higher-intent bookings.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise for a reserved evening",
    description: "Reserved yacht dining, meal service, and a calmer Bosphorus evening stay in one place.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental Istanbul for the reveal moment",
    description: "Timing, privacy, photo flow, and celebration details stay centered on the proposal.",
  },
  {
    href: "/corporate-events",
    title: "Corporate Events for client hosting and team nights",
    description: "Company hosting, branded setup, catering, and guest flow stay organized for group bookings.",
  },
];

const searchIntentShortcuts = [
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul for a lighter private brief",
    description: "A practical private boat plan without moving into a full yacht charter setup.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul for private service and route planning",
    description: "Crew service, route planning, and a fully private yacht stay at the center.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise for a calmer evening",
    description: "Meal flow, timing, and private evening setup stay in focus.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental Istanbul for a focused reveal",
    description: "Guests who want privacy, timing, and photo flow land on the proposal setup quickly.",
  },
];

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
              Need a more specific private plan?
            </h3>
            <p className="text-[var(--text-muted)]">
              If your evening is already taking shape, these shortcuts point to
              the most relevant private setup.
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
                  See details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Explore the experience that matches your plan
            </h3>
            <p className="text-[var(--text-muted)]">
              Some guests want a simpler boat rental, a private dinner, or a
              celebration setup rather than a standard shared cruise.
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
                  See details
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
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-cta-end))] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(24,41,135,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(24,41,135,0.28)]"
          >
            View All Guides & Blog Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
