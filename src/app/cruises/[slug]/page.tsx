import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";

const SITE_URL = "https://merrysails.com";

/* Keyword mapping from CSV research (volume/KD) for each tour slug */
const tourKeywords: Record<string, string[]> = {
  "bosphorus-sunset-cruise": [
    "bosphorus sunset cruise", "sunset cruise istanbul", "sunset cruise",
    "bosphorus sunset", "istanbul bosphorus sunset cruise", "boat trip istanbul",
  ],
  "bosphorus-dinner-cruise": [
    "istanbul dinner cruise", "bosphorus dinner cruise", "dinner cruise istanbul",
    "bosphorus night cruise with dinner", "bosphorus night cruise", "best dinner cruise istanbul",
    "istanbul night cruise", "bosphorus cruise dinner menu", "dinner on the bosphorus",
  ],
  "yacht-charter-in-istanbul": [
    "yacht rental istanbul", "yacht charter istanbul", "yacht charter istanbul turkey",
    "bosphorus yacht cruise", "bosphorus yacht tour", "private bosphorus cruise",
    "yacht istanbul", "bosphorus yacht", "boat rental istanbul",
  ],
  "bosphorus-sightseeing-cruise": [
    "short bosphorus cruise", "bosphorus day cruise istanbul", "bosphorus boat tour",
    "bosphorus sightseeing cruise", "bosphorus cruise tour", "bosphorus boat ride istanbul",
  ],
  "istanbul-princes-island-tour": [
    "princess island tour", "istanbul prince islands ferry", "princess island turkey tour",
    "princes island boat tour istanbul",
  ],
  "istanbul-bosphorus-lunch-cruise": [
    "bosphorus boat tour", "boat cruise istanbul", "bosphorus river cruise",
    "istanbul cruise tour", "cruise in istanbul",
  ],
  "private-bosphorus-sunset-cruise": [
    "private bosphorus cruise", "bosphorus sunset cruise on luxury yacht",
    "yacht rental istanbul", "private yacht charter",
  ],
  "corporate-event-bosphorus-cruise": [
    "party boat istanbul", "corporate event yacht istanbul", "boat trip istanbul",
  ],
  "romantic-marriage-proposal": [
    "marriage proposal yacht istanbul", "private yacht istanbul", "yacht charter bosphorus",
  ],
  "yacht-birthday-party": [
    "istanbul birthday", "party boat istanbul", "yacht birthday party istanbul",
  ],
  "private-bosphorus-dinner-yacht-cruise": [
    "private dinner cruise istanbul", "bosphorus dinner yacht", "private yacht dinner bosphorus",
    "luxury dinner cruise istanbul", "romantic dinner yacht istanbul",
  ],
  "private-bosphorus-lunch-yacht-cruise": [
    "private lunch cruise istanbul", "bosphorus lunch yacht", "private yacht lunch bosphorus",
    "luxury lunch cruise istanbul",
  ],
  "bosphorus-sightseeing-yacht-cruise": [
    "bosphorus sightseeing yacht", "private sightseeing cruise istanbul",
    "bosphorus yacht sightseeing tour", "luxury bosphorus cruise",
  ],
  "yacht-weddings": [
    "yacht wedding istanbul", "wedding on yacht bosphorus", "wedding cruise istanbul",
    "luxury wedding yacht turkey", "bosphorus wedding venue",
  ],
  "wedding-anniversary": [
    "anniversary yacht istanbul", "wedding anniversary cruise bosphorus",
    "anniversary celebration yacht", "romantic anniversary istanbul",
  ],
  "bachelorette-yacht-party": [
    "bachelorette party istanbul", "bachelorette yacht istanbul", "hen party yacht bosphorus",
    "bachelorette cruise istanbul",
  ],
  "private-yacht-swimming-tour": [
    "swimming yacht istanbul", "private swimming tour bosphorus", "yacht swimming istanbul",
    "bosphorus swimming cruise", "istanbul boat swimming",
  ],
  "full-day-istanbul-old-city-tour": [
    "istanbul old city tour", "istanbul walking tour", "full day istanbul tour",
    "sultanahmet tour", "istanbul sightseeing tour",
  ],
  "istanbul-lunch-cruise": [
    "istanbul lunch cruise", "lunch cruise bosphorus", "bosphorus lunch tour",
    "istanbul boat lunch", "midday cruise istanbul",
  ],
  "bosphorus-cruise-for-cruise-passengers": [
    "istanbul cruise port tour", "bosphorus cruise for cruise passengers",
    "istanbul cruise ship excursion", "istanbul port bosphorus tour",
  ],
  "new-years-eve-party-cruise": [
    "new years eve istanbul cruise", "nye bosphorus cruise", "istanbul new year party boat",
    "new years eve dinner cruise istanbul", "istanbul nye celebration",
  ],
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  const title = `${tour.nameEn} — From €${tour.priceEur} | Book Online`;
  const description = `${tour.description} Duration: ${tour.duration}. Capacity: ${tour.capacity}. Starting from €${tour.priceEur}/person. Free cancellation. Book your ${tour.nameEn} in Istanbul today.`;
  const url = `${SITE_URL}/cruises/${slug}`;
  const keywords = tourKeywords[slug] || [
    tour.nameEn.toLowerCase(), "bosphorus cruise", "istanbul boat tour",
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: tour.description,
      url,
      type: "website",
      images: [{ url: tour.image, width: 1200, height: 630, alt: tour.nameEn }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tour.description,
    },
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.slug !== slug && t.category === tour.category).slice(0, 4);

  // JSON-LD TouristTrip + Product schema (dual type for aggregateRating support)
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: tour.nameEn,
    description: tour.description,
    touristType: "Leisure",
    url: `${SITE_URL}/cruises/${tour.slug}`,
    image: tour.image,
    brand: {
      "@type": "Organization",
      name: "MerrySails",
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: tour.priceEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      priceValidUntil: "2026-12-31",
      url: `${SITE_URL}/cruises/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating.toString(),
      reviewCount: tour.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.highlights.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
      { "@type": "ListItem", position: 3, name: tour.nameEn, item: `${SITE_URL}/cruises/${tour.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/cruises" className="hover:text-[var(--brand-primary)]">Cruises</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{tour.nameEn}</span>
          </nav>

          <TourDetailClient tour={tour} related={related} />
        </div>
      </div>
    </>
  );
}
