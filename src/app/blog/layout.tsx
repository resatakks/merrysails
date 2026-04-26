import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruise Blog & Travel Guides",
  description:
    "Practical guides for Istanbul boat tours, dinner cruises, yacht charters, and Bosphorus travel planning, built around MerrySails booking and route-planning knowledge.",
  keywords: [
    "istanbul cruise blog",
    "bosphorus travel guide",
    "istanbul boat tour tips",
    "dinner cruise guide",
    "yacht charter advice",
    "istanbul travel blog",
    "bosphorus insider tips",
  ],
  alternates: { canonical: "https://merrysails.com/blog" },
  openGraph: {
    title: "Istanbul Bosphorus Cruise Blog & Travel Guides",
    description:
      "Practical guides for Istanbul boat tours, dinner cruises, yacht charters, and Bosphorus cruise planning.",
    url: "https://merrysails.com/blog",
    type: "website",
    images: [
      {
        url: "https://merrysails.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MerrySails Blog — Istanbul Bosphorus Cruise Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Istanbul Bosphorus Cruise Blog & Travel Guides",
    description:
      "Practical guides for Istanbul boat tours, dinner cruises, yacht charters, and Bosphorus cruise planning.",
    images: ["https://merrysails.com/og-image.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
