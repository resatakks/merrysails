import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { blogCollections, blogPosts } from "@/data/blog";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";

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
