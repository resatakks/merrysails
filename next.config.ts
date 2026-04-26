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
