import type { Metadata } from "next";
import { getTourPath, tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruises 2026 | 3 Core Products & Service Pages",
  description:
    "Browse the MerrySails cruise index with 3 flagship booking pages plus supporting Bosphorus service and guide pages.",
  keywords: [
    "bosphorus cruise istanbul",
    "istanbul yacht charter",
    "sunset cruise istanbul",
    "dinner cruise bosphorus",
    "istanbul boat tour",
    "private yacht rental istanbul",
    "bosphorus tour",
    "bosphorus sightseeing cruise",
    "bosphorus short cruise",
    "boat hire istanbul",
    "bosphorus cruise 2026",
  ],
  alternates: { canonical: "https://merrysails.com/cruises" },
  openGraph: {
    title: "Istanbul Bosphorus Cruises 2026 | 3 Core Products & Service Pages",
    description:
      "Cruise index for Bosphorus sunset cruise, Bosphorus dinner cruise, yacht charter, and supporting Bosphorus service pages.",
    url: "https://merrysails.com/cruises",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruises Istanbul 2026" }],
  },
};

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours",
  description: "Browse all Bosphorus cruises, yacht charters, and boat tours in Istanbul from MerrySails, part of TURSAB-licensed Merry Tourism since 2001.",
  numberOfItems: tours.length,
  itemListElement: tours.map((tour, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${getTourPath(tour)}`,
    name: tour.nameEn,
    image: tour.image,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
  ],
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  );
}
