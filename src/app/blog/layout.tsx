import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruise Blog & Travel Guides — MerrySails",
  description:
    "Expert tips, detailed guides, and insider knowledge for Istanbul boat tours, dinner cruises, yacht charters, and Bosphorus travel planning. Written by local experts.",
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
      "Expert tips, guides, and insider knowledge for Istanbul boat tours and Bosphorus cruise planning.",
    url: "https://merrysails.com/blog",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Istanbul Bosphorus Cruise Blog & Travel Guides",
  description: "Expert cruise guides and travel tips for Istanbul.",
  numberOfItems: blogPosts.length,
  itemListElement: blogPosts.map((post, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/blog/${post.slug}`,
    name: post.title,
  })),
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
