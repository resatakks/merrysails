import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { blogPosts } from "@/data/blog";
import { cleanContentText } from "@/lib/content-text";

export const metadata = {
  title: "Istanbul Cruise, Landmark & Boarding Guides",
  description:
    "Explore Istanbul landmark guides, boarding-area help, and the booking pages they support for Bosphorus cruises, private boats, and yacht charters.",
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
    title: "Istanbul Cruise, Landmark & Boarding Guides",
    description:
      "In-depth guides to Istanbul landmarks, boarding areas, and the booking pages they support for dinner cruises, private boats, and yacht charters.",
    url: "https://merrysails.com/guides",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Istanbul Cruise, Landmark & Boarding Guides",
  description: "In-depth guides to Istanbul landmarks, boarding areas, and Bosphorus booking decisions.",
  numberOfItems: guides.length,
  itemListElement: guides.map((guide, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/guides/${guide.slug}`,
    name: cleanContentText(guide.title),
  })),
};

const bookingPages = [
  {
    href: "/bosphorus-cruise",
    eyebrow: "Main comparison",
    title: "Bosphorus Cruise Istanbul",
    description: "Choose this first when you are still comparing shared sightseeing, sunset, dinner, and private upgrades.",
  },
  {
    href: "/cruises/bosphorus-sunset-cruise",
    eyebrow: "Golden hour",
    title: "Bosphorus Sunset Cruise",
    description: "Choose this for landmark views at the best light with a shorter shared premium route.",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Istanbul Dinner Cruise",
    description: "Choose this for the fixed evening route with clear dinner packages.",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Premium charter",
    title: "Yacht Charter Istanbul",
    description: "Choose this for the most tailored private charter setup.",
  },
  {
    href: "/bosphorus-cruise-departure-points",
    eyebrow: "Waterfront logic",
    title: "Departure Points Hub",
    description: "Choose this when the product is already close and the main question is where each Bosphorus format starts.",
  },
] as const;

const boardingSupportPages = [
  {
    href: "/sunset-cruise-tickets-istanbul",
    eyebrow: "Shared sunset tickets",
    title: "Sunset Ticket Support",
    description: "Use this when the sunset route is already chosen and the remaining question is the shared ticket and option fit.",
  },
  {
    href: "/kabatas-dinner-cruise-istanbul",
    eyebrow: "Dinner boarding",
    title: "Kabatas Dinner Support",
    description: "Use this when the main concern is Kabatas-side arrival flow for the shared dinner product.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    eyebrow: "Pickup logic",
    title: "Dinner Pickup Support",
    description: "Use this when the shared dinner route is already right but pickup eligibility is still unclear.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    eyebrow: "Central hotel pickup",
    title: "Sultanahmet & Taksim Pickup",
    description: "Use this when the question is whether Sultanahmet, Taksim, Sirkeci, or Karakoy fits the dinner pickup flow.",
  },
  {
    href: "/kurucesme-marina-yacht-charter",
    eyebrow: "Private marina",
    title: "Kurucesme Marina Yacht",
    description: "Use this when the private-yacht choice is close and the real question is Kurucesme-side boarding confidence.",
  },
] as const;

const supportArticleSlugs = [
  "bosphorus-cruise-boarding-points-guide-2026",
  "bosphorus-sunset-cruise-vs-dinner-cruise",
  "bosphorus-dinner-cruise-what-to-expect",
  "private-yacht-departure-points-istanbul",
  "proposal-yacht-rental-istanbul-planning-guide",
  "corporate-yacht-events-on-the-bosphorus",
] as const;

export default function GuidesPage() {
  const supportArticles = supportArticleSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Istanbul Cruise, Landmark & Boarding Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            In-depth guides to the landmarks, waterfront districts, and boarding
            areas that shape a Bosphorus cruise in Istanbul.
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
                    alt={cleanContentText(guide.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                    {cleanContentText(guide.title)}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-3 flex-1">
                    {cleanContentText(guide.excerpt)}
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

        <div className="mt-10 rounded-3xl border border-[var(--line)] bg-white p-5 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Use a boarding support page when the product is already clear
            </h2>
            <p className="text-[var(--text-muted)] text-sm max-w-2xl mx-auto">
              These pages are not the first click for broad demand. They only help when the route is already chosen and the remaining question is pickup or marina flow.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {boardingSupportPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-[var(--surface-alt)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[var(--brand-primary)]"
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
                  Open support page <ArrowRight className="w-3.5 h-3.5" />
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
            {supportArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                      {cleanContentText(post.title)}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">{cleanContentText(post.excerpt)}</p>
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
