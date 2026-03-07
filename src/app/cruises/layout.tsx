import type { Metadata } from "next";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours — MerrySails",
  description:
    "Book sunset cruises, dinner cruises with live Turkish show, private yacht charters, and guided Bosphorus boat tours in Istanbul. Best price guaranteed — book direct with MerrySails.",
  keywords: [
    "bosphorus cruise istanbul",
    "istanbul yacht charter",
    "sunset cruise istanbul",
    "dinner cruise bosphorus",
    "istanbul boat tour",
    "private yacht rental istanbul",
    "bosphorus tour",
  ],
  alternates: { canonical: "https://merrysails.com/cruises" },
  openGraph: {
    title: "Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours",
    description:
      "Sunset cruises, dinner cruises, private yacht rentals, and guided Bosphorus tours. Best price guaranteed.",
    url: "https://merrysails.com/cruises",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours",
  description: "Browse all Bosphorus cruises, yacht charters, and boat tours in Istanbul.",
  numberOfItems: tours.length,
  itemListElement: tours.map((tour, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/cruises/${tour.slug}`,
    name: tour.nameEn,
  })),
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
