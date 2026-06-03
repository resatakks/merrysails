import path from "node:path";
import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" ? "'unsafe-eval' " : ""}https:`,
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https: ws: wss:",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.merrysails.com" }],
        destination: "https://merrysails.com/:path*",
        permanent: true,
      },
      // SEO: redirect common mistyped/old URLs to correct pages
      {
        source: "/yacht-charter",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      // /bosphorus-guide parked 2026-05-26 — 301 to the commercial pillar so
      // backlinks + email-template links keep their weight.  Locale variants
      // covered by the wildcard below.
      {
        source: "/bosphorus-guide",
        destination: "/bosphorus-cruise",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/bosphorus-guide",
        destination: "/:locale/bosphorus-cruise",
        permanent: true,
      },
      // SEO: legacy short fleet slugs → descriptive slugs (2026-05-12)
      {
        source: "/yacht-charter-istanbul/y1",
        destination: "/yacht-charter-istanbul/bosphorus-sailing-yacht-10",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y2",
        destination: "/yacht-charter-istanbul/bosphorus-sailing-yacht-14",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y3",
        destination: "/yacht-charter-istanbul/bosphorus-group-yacht-36",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y4",
        destination: "/yacht-charter-istanbul/bosphorus-signature-yacht-36",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y5",
        destination: "/yacht-charter-istanbul/bosphorus-event-yacht-44",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y6",
        destination: "/yacht-charter-istanbul/bosphorus-mega-event-yacht-150",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y1",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-sailing-yacht-10",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y2",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-sailing-yacht-14",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y3",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-group-yacht-36",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y4",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-signature-yacht-36",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y5",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-event-yacht-44",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl)/yacht-charter-istanbul/y6",
        destination: "/:locale/yacht-charter-istanbul/bosphorus-mega-event-yacht-150",
        permanent: true,
      },
      {
        source: "/cruises/bosphorus-dinner-cruise",
        destination: "/istanbul-dinner-cruise",
        permanent: true,
      },
      {
        source: "/cruises/yacht-charter-in-istanbul",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      {
        source: "/bosphorus-cruises",
        destination: "/bosphorus-cruise",
        permanent: true,
      },
      {
        source: "/boat-tour",
        destination: "/bosphorus-cruise",
        permanent: true,
      },
      {
        source: "/dinner-cruise",
        destination: "/istanbul-dinner-cruise",
        permanent: true,
      },
      {
        source: "/sunset-cruise",
        destination: "/cruises/bosphorus-sunset-cruise",
        permanent: true,
      },
      {
        source: "/bosphorus-cruise-prices",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/prices",
        destination: "/pricing",
        permanent: true,
      },
      // Legacy / common-typo URLs that were 404-ing — discovered via GSC
      // "Bulunamadı (404)" report on 2026-05-30.  Permanent 301 to the
      // canonical commercial sibling so any inbound links / branded SERP
      // listings recover their authority.
      {
        source: "/private-yacht-charter",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      {
        source: "/private-yacht",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      {
        source: "/yacht-rental",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      {
        source: "/bosphorus-cruise-tour",
        destination: "/bosphorus-cruise",
        permanent: true,
      },
      {
        source: "/istanbul-cruise",
        destination: "/bosphorus-cruise",
        permanent: true,
      },
      {
        source: "/turkish-night",
        destination: "/turkish-night-dinner-cruise-istanbul",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/private-events",
        permanent: true,
      },
      {
        source: "/private-event",
        destination: "/private-events",
        permanent: true,
      },
      {
        source: "/corporate-event",
        destination: "/corporate-events",
        permanent: true,
      },
      {
        source: "/weddings",
        destination: "/private-events",
        permanent: true,
      },
      {
        source: "/istanbul-boat-rental",
        destination: "/boat-rental-istanbul",
        permanent: true,
      },
      // /pricing is a single-source machine-readable route (Markdown for AI
      // agents per /llms.txt). Locale variants of it return 404; redirect
      // them all to the canonical so /tr/pricing, /de/pricing etc. stop
      // being indexable dead URLs.
      {
        source: "/:locale(tr|de|fr|nl|ru)/pricing",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/cruises/bachelorette-yacht-party",
        destination: "/proposal-yacht-rental-istanbul",
        permanent: true,
      },
      {
        source: "/cruises/bosphorus-sightseeing-yacht-cruise",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      {
        source: "/cruises/private-bosphorus-lunch-yacht-cruise",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      {
        source: "/cruises/private-bosphorus-sunset-cruise",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      {
        source: "/cruises/private-yacht-swimming-tour",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      {
        source: "/cruises/wedding-anniversary",
        destination: "/proposal-yacht-rental-istanbul",
        permanent: true,
      },
      {
        source: "/cruises/yacht-birthday-party",
        destination: "/proposal-yacht-rental-istanbul",
        permanent: true,
      },
      {
        source: "/cruises/yacht-weddings",
        destination: "/proposal-yacht-rental-istanbul",
        permanent: true,
      },
      {
        source: "/cruises/corporate-event-bosphorus-cruise",
        destination: "/corporate-events",
        permanent: true,
      },
      {
        source: "/cruises/romantic-marriage-proposal",
        destination: "/proposal-yacht-rental-istanbul",
        permanent: true,
      },
      {
        source: "/cruises/private-bosphorus-dinner-yacht-cruise",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      // Cannibalization fix (GSC 30d): /blog/bosphorus-cruise-departure-points
      // outranks the canonical /bosphorus-cruise-departure-points (pos 2.5 vs 6)
      // for "bosphorus cruise departure points istanbul" — 301 the blog to the
      // canonical so all equity consolidates on the page meant to convert.
      {
        source: "/blog/bosphorus-cruise-departure-points",
        destination: "/bosphorus-cruise-departure-points",
        permanent: true,
      },
    ];
  },
  async headers() {
    const sharedHeaders = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
      { key: "Origin-Agent-Cluster", value: "?1" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(self)",
      },
      // Link header — declares sitemap relation for agent crawlers (RFC 8288)
      {
        key: "Link",
        value: '<https://merrysails.com/sitemap.xml>; rel="sitemap"',
      },
    ];

    if (process.env.NODE_ENV === "production") {
      sharedHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: sharedHeaders,
      },
      // RFC 9727 Linkset — agent API catalog
      {
        source: "/.well-known/api-catalog",
        headers: [
          { key: "Content-Type", value: "application/linkset+json" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      // OpenAPI document
      {
        source: "/openapi.json",
        headers: [
          { key: "Content-Type", value: "application/vnd.oai.openapi+json;version=3.1" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      // Explicit text/markdown for agents.md
      {
        source: "/agents.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      // 2026-06-03 — X-Robots-Tag: noindex for Next.js framework chunks.
      // GSC was reporting 948 "Crawled - currently not indexed" URLs under
      // /_next/static/chunks/*.{js,css}?dpl=… because robots.txt Disallow
      // tells Googlebot "don't crawl" but doesn't tell it "don't show as
      // not-indexed in your report". X-Robots-Tag noindex is the right
      // signal — Google still won't crawl (per robots), and when it does
      // see one of these URLs from a referrer it removes it from the
      // index report. Belt-and-braces approach.
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/_next/data/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  // Markdown for Agents — content negotiation on homepage.
  // When Accept: text/markdown, route "/" to /api/md (serves public/agents.md).
  // Spec: https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "header", key: "accept", value: "(.*)text/markdown(.*)" }],
          destination: "/api/md",
        },
      ],
    };
  },
};

export default nextConfig;
