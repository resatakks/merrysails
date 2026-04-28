import type { Metadata } from "next";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { blogCollections, blogPosts } from "@/data/blog";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruise Blog & Travel Guides | MerrySails",
  description:
    "Planning articles, route guides, and travel tips for Istanbul Bosphorus cruises, dinner cruises, and private yacht charters.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Istanbul Bosphorus Cruise Blog & Travel Guides | MerrySails",
    description:
      "Planning articles, route guides, and travel tips for Istanbul Bosphorus cruises, dinner cruises, and private yacht charters.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Istanbul Bosphorus Cruise Blog & Travel Guides | MerrySails",
    description:
      "Planning articles, route guides, and travel tips for Istanbul Bosphorus cruises.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function BlogPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Istanbul Bosphorus Cruise Blog & Travel Guides",
    description: "Planning articles that support the main Bosphorus booking pages in Istanbul.",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://merrysails.com/blog/${post.slug}`,
      name: cleanContentText(post.title),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://merrysails.com/blog" },
    ],
  };

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
      <BlogIndexClient
        blogPosts={blogPosts}
        blogCollections={blogCollections}
        commercialSupportPosts={commercialSupportPosts}
      />
    </>
  );
}
