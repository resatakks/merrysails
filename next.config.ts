import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        destination: "/cruises/yacht-charter-in-istanbul",
        permanent: true,
      },
      {
        source: "/bosphorus-cruise",
        destination: "/cruises",
        permanent: true,
      },
      {
        source: "/bosphorus-cruises",
        destination: "/cruises",
        permanent: true,
      },
      {
        source: "/boat-tour",
        destination: "/cruises",
        permanent: true,
      },
      {
        source: "/dinner-cruise",
        destination: "/cruises/bosphorus-dinner-cruise",
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
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
