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
      // SEO: legacy fleet slugs → CURRENT descriptive slugs.
      // History: y1-y6 (2026-05-12) once pointed to the gen-2 "bosphorus-*"
      // slugs, which were renamed twice (gen-2 -> boutique/premium/group/event
      // -> current). Those gen-2 destinations now 404, so every y-slug AND every
      // renamed gen-2 / gen-2.5 slug is repointed to the live slug, mapped by
      // vessel type + capacity tier (GSC "Not found (404)" 2026-06-17, 16 URLs):
      //   sailing/boutique-10 -> boutique-yacht-12
      //   sailing/premium-14  -> premium-yacht-15
      //   group-36-standard   -> group-yacht-40-standard
      //   group/signature-36  -> group-yacht-40-signature
      //   event-44            -> event-yacht-90
      //   mega-event-150      -> mega-event-yacht-150 (unchanged)
      {
        source: "/yacht-charter-istanbul/y1",
        destination: "/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y2",
        destination: "/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y3",
        destination: "/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y4",
        destination: "/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y5",
        destination: "/yacht-charter-istanbul/event-yacht-90",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/y6",
        destination: "/yacht-charter-istanbul/mega-event-yacht-150",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y1",
        destination: "/:locale/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y2",
        destination: "/:locale/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y3",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y4",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y5",
        destination: "/:locale/yacht-charter-istanbul/event-yacht-90",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/y6",
        destination: "/:locale/yacht-charter-istanbul/mega-event-yacht-150",
        permanent: true,
      },
      // Renamed gen-2 / gen-2.5 yacht-detail slugs that now 404 (GSC). Each
      // 301s to the current slug by type + capacity; locale variants too.
      {
        source: "/yacht-charter-istanbul/bosphorus-sailing-yacht-10",
        destination: "/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/bosphorus-sailing-yacht-14",
        destination: "/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/bosphorus-group-yacht-36",
        destination: "/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/bosphorus-signature-yacht-36",
        destination: "/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/bosphorus-event-yacht-44",
        destination: "/yacht-charter-istanbul/event-yacht-90",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/bosphorus-mega-event-yacht-150",
        destination: "/yacht-charter-istanbul/mega-event-yacht-150",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/boutique-yacht-10",
        destination: "/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/premium-yacht-14",
        destination: "/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/group-yacht-36-standard",
        destination: "/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/group-yacht-36-signature",
        destination: "/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/yacht-charter-istanbul/event-yacht-44",
        destination: "/yacht-charter-istanbul/event-yacht-90",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-sailing-yacht-10",
        destination: "/:locale/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-sailing-yacht-14",
        destination: "/:locale/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-group-yacht-36",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-signature-yacht-36",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-event-yacht-44",
        destination: "/:locale/yacht-charter-istanbul/event-yacht-90",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/bosphorus-mega-event-yacht-150",
        destination: "/:locale/yacht-charter-istanbul/mega-event-yacht-150",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/boutique-yacht-10",
        destination: "/:locale/yacht-charter-istanbul/boutique-yacht-12",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/premium-yacht-14",
        destination: "/:locale/yacht-charter-istanbul/premium-yacht-15",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/group-yacht-36-standard",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-standard",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/group-yacht-36-signature",
        destination: "/:locale/yacht-charter-istanbul/group-yacht-40-signature",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/yacht-charter-istanbul/event-yacht-44",
        destination: "/:locale/yacht-charter-istanbul/event-yacht-90",
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
      // EN-only single-source routes. /istanbul-cruise-faq and
      // /compare-bosphorus-cruises exist only at the root (no [locale]
      // variant). GSC "Not found (404)" 2026-06-17 shows /tr|/de|/nl/
      // istanbul-cruise-faq and /fr|/nl/compare-bosphorus-cruises being
      // crawled as dead URLs. 301 all locale variants to the EN canonical.
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/istanbul-cruise-faq",
        destination: "/istanbul-cruise-faq",
        permanent: true,
      },
      {
        source: "/:locale(tr|de|fr|nl|ru|zh)/compare-bosphorus-cruises",
        destination: "/compare-bosphorus-cruises",
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
      // DMCA recovery (2026-06-16): bare topic-slugs that have always 404'd
      // (never existed as routes — confirmed via git history) but match the
      // intent of a new clean-slug page shipped in 3f47213. 301 them to the
      // matching clean slug so any branded SERP / inbound links land on the
      // single intended canonical instead of a dead page. These are NOT the
      // DMCA-tainted pillars (those stay live, no 301 — avoids flag transfer).
      {
        source: "/private-bosphorus-sunset-cruise",
        destination: "/private-sunset-cruise-bosphorus-istanbul",
        permanent: true,
      },
      // Old flat public-sunset URL (pre-/cruises/ move) — GSC "Not found (404)"
      // 16-URL bucket 2026-06-16. 301 to the live public sunset page (not the
      // DMCA-tainted /sunset-cruise-tickets-istanbul; this flat slug was never
      // in the Lumen notice).
      {
        source: "/bosphorus-sunset-cruise",
        destination: "/cruises/bosphorus-sunset-cruise",
        permanent: true,
      },
      {
        source: "/bosphorus-dinner-cruise",
        destination: "/bosphorus-evening-dinner-cruise",
        permanent: true,
      },
      // DMCA cannibalization resolution (2026-06-16): GSC URL Inspection proved
      // the four "DMCA-tainted" pillars were NEVER deindexed — all return
      // verdict=PASS "Submitted and indexed" and serve impressions (yacht 484imp
      // pos22.9, sunset-tickets pos7.2, private-dinner pos10.9). The four clean
      // slugs shipped in 3f47213 are 0 clicks / 0 imp / ~1 day old with no
      // independent equity, so they cannibalize the established pillars. One
      // indexable URL per intent => 301 each new slug -> its pillar (content is
      // already clean ⇒ no re-file risk; consolidates the minimal freshness
      // signal onto the page that already ranks/converts).
      {
        source: "/istanbul-yacht-charter-rental",
        destination: "/yacht-charter-istanbul",
        permanent: true,
      },
      {
        source: "/istanbul-dinner-cruise-bosphorus",
        destination: "/istanbul-dinner-cruise",
        permanent: true,
      },
      {
        source: "/sunset-cruise-istanbul-tickets-booking",
        destination: "/sunset-cruise-tickets-istanbul",
        permanent: true,
      },
      {
        source: "/private-bosphorus-dinner-yacht-charter",
        destination: "/private-bosphorus-dinner-cruise",
        permanent: true,
      },
      // Chain-flatten: the dead bare slug below previously 301'd to the clean
      // slug above; now that the clean slug 301s onward to the pillar, point the
      // dead slug straight at the pillar so there is no 2-hop redirect chain.
      {
        source: "/private-bosphorus-dinner-yacht-cruise",
        destination: "/private-bosphorus-dinner-cruise",
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

  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@tabler/icons-react",
      "framer-motion",
      "date-fns",
      "dayjs",
    ],
  },
  // Next 16+: outputFileTracingExcludes moved out of experimental to top-level.
  outputFileTracingExcludes: {
    "*": [
      "data/seo/**",
      "docs/**",
      "scripts/**",
      ".next/cache/**",
      "node_modules/@swc/core-linux-x64-gnu",
      "node_modules/@swc/core-linux-x64-musl",
      "node_modules/@esbuild/**",
      "node_modules/webpack/**",
      "node_modules/terser/**",
      "node_modules/typescript/**",
      "node_modules/.cache/**",
      "node_modules/eslint/**",
      "node_modules/prettier/**",
    ],
  },
};

export default nextConfig;
