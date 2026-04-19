import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { blogPosts } from "@/data/blog";

export const metadata = {
  title: "Istanbul Landmark Guides — Bosphorus, Palaces & More",
  description:
    "Explore Istanbul's iconic landmarks and the booking pages they support, including Bosphorus dining cruises, private boats, and yacht charters.",
  keywords: [
    "istanbul landmarks guide",
    "bosphorus attractions",
    "maidens tower istanbul",
    "dolmabahce palace guide",
    "istanbul tourist attractions",
    "bosphorus cruise landmarks",
  ],
  alternates: { canonical: "https://merrysails.com/guides" },
  openGraph: {
    title: "Istanbul Landmark Guides — Bosphorus, Palaces & More",
    description:
      "In-depth guides to Istanbul's Bosphorus landmarks, plus the booking pages they support for dinner cruises, private boats, and yacht charters.",
    url: "https://merrysails.com/guides",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Istanbul Landmark & Destination Guides",
  description: "In-depth guides to Istanbul's iconic landmarks along the Bosphorus, with support for booking decisions.",
  numberOfItems: guides.length,
  itemListElement: guides.map((guide, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/guides/${guide.slug}`,
    name: guide.title,
  })),
};

const bookingPages = [
  {
    href: "/private-bosphorus-dinner-cruise",
    eyebrow: "Private dining",
    title: "Private Bosphorus Dinner Cruise",
    description: "Choose this when you want dinner on the water without sharing the boat.",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Istanbul Dinner Cruise",
    description: "Choose this for the fixed evening route with clear dinner packages.",
  },
  {
    href: "/boat-rental-istanbul",
    eyebrow: "Flexible private",
    title: "Boat Rental Istanbul",
    description: "Choose this for a simpler private boat with room to tailor the trip.",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Premium charter",
    title: "Yacht Charter Istanbul",
    description: "Choose this for the most tailored private charter setup.",
  },
] as const;

export default function GuidesPage() {
  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Istanbul Landmark & Destination Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            In-depth guides to the landmarks you&apos;ll see on a Bosphorus
            cruise — palaces, fortresses, mosques, islands, and hidden gems
            along the strait.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-3 flex-1">
                    {guide.excerpt}
                  </p>
                  <span className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--line)] pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Choose the booking page that fits the trip
            </h2>
            <p className="text-[var(--text-muted)] text-sm max-w-2xl mx-auto">
              These pages answer the booking question directly, while the guides above help you understand the landmarks and route.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {bookingPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[var(--brand-primary)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  {item.eyebrow}
                </p>
                <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                  {item.title}
                </h3>
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

        {/* Related Blog Posts for supporting reading */}
        <div className="mt-16 border-t border-[var(--line)] pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--brand-primary)]" />
              Supporting Articles & Travel Tips
            </h2>
            <p className="text-[var(--text-muted)] text-sm">
              Practical reading for routes, timing, and what to expect before you book.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts
              .filter(p => ["cruise-guide", "istanbul", "tips"].includes(p.category))
              .slice(0, 8)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline"
            >
              View All Blog Posts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
