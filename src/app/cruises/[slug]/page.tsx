import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";

const SITE_URL = "https://merrysails.vercel.app";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "Tour Not Found" };

  const title = `${tour.nameEn} — From €${tour.priceEur} | Book Online`;
  const description = `${tour.description} Duration: ${tour.duration}. Capacity: ${tour.capacity}. Starting from €${tour.priceEur}/person. Free cancellation. Book your ${tour.nameEn} in Istanbul today.`;
  const url = `${SITE_URL}/cruises/${tour.slug}`;

  return {
    title,
    description,
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

  // JSON-LD TouristTrip + Product schema
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.nameEn,
    description: tour.description,
    touristType: "Leisure",
    url: `${SITE_URL}/cruises/${tour.slug}`,
    image: tour.image,
    provider: {
      "@type": "TravelAgency",
      name: "MerrySails",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: tour.priceEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
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
