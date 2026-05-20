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
    ];
  },
};

export default nextConfig;
