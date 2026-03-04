import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/booking/payment/", "/booking/confirmation/"],
    },
    sitemap: "https://merrysails.com/sitemap.xml",
  };
}
