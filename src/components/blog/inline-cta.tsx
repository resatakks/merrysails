import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";

/**
 * Per-pillar variant pools — descriptive anchors broken out of the legacy
 * generic "Compare Bosphorus Cruises" anchor that dominated inbound anchor
 * text and triggered exact-match anchor over-optimisation patterns.
 *
 * Anchor variety target: 5× lift via 4-6 anchor pool per pillar (operator
 * internal-linking implementation plan, 2026-06-08). Pick is deterministic
 * per `slug` so SSR and CSR render the same string (no hydration mismatch)
 * while different posts cycle through different anchors.
 */
type CTAVariant = "sunset" | "dinner" | "yacht" | "any";

type VariantConfig = {
  href: string;
  badge: string;
  heading: string;
  anchors: string[];
};

const VARIANTS: Record<CTAVariant, VariantConfig> = {
  sunset: {
    href: "/cruises/bosphorus-sunset-cruise",
    badge: "TURSAB Licensed Since 2001",
    heading: "Book a Bosphorus Sunset Cruise",
    anchors: [
      "Reserve Bosphorus sunset cruise",
      "Istanbul sunset cruise booking",
      "Bosphorus sunset boat tour",
      "Book sunset cruise Istanbul",
      "See sunset cruise availability",
    ],
  },
  dinner: {
    href: "/istanbul-dinner-cruise",
    badge: "TURSAB Licensed Since 2001",
    heading: "Book a Bosphorus Dinner Cruise",
    anchors: [
      "Reserve Bosphorus dinner cruise",
      "Istanbul dinner cruise booking",
      "Book Bosphorus dinner cruise",
      "See dinner cruise menu and times",
      "Bosphorus dinner cruise availability",
    ],
  },
  yacht: {
    href: "/yacht-charter-istanbul",
    badge: "TURSAB Licensed Since 2001",
    heading: "Charter a Private Yacht on the Bosphorus",
    anchors: [
      "Istanbul yacht charter rates",
      "Private yacht charter Bosphorus",
      "Book a private Bosphorus yacht",
      "See Istanbul yacht charter options",
      "Private Bosphorus yacht booking",
    ],
  },
  any: {
    href: "/bosphorus-cruise",
    badge: "TURSAB Licensed Since 2001",
    heading: "Explore Bosphorus Cruise Options",
    anchors: [
      "See Bosphorus cruise options",
      "Compare Bosphorus cruises",
      "Browse Istanbul Bosphorus tours",
      "Book a Bosphorus cruise",
      "Find your Bosphorus cruise",
      "Plan your Bosphorus cruise",
    ],
  },
};

function pickAnchor(anchors: string[], slug?: string): string {
  if (!slug) return anchors[0];
  // Deterministic FNV-1a-ish hash so SSR/CSR pick the same anchor.
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return anchors[hash % anchors.length];
}

type InlineCTAProps = {
  /**
   * Pillar the surrounding post is closest to. Drives the link target,
   * heading, and anchor pool. Defaults to "any" → generic Bosphorus hub.
   */
  variant?: CTAVariant;
  /**
   * Post slug. Used as a deterministic seed so two different posts pointing
   * at the same pillar cycle through different anchors instead of all
   * shipping the same exact-match string.
   */
  slug?: string;
};

export function InlineCTA({ variant = "any", slug }: InlineCTAProps = {}) {
  const config = VARIANTS[variant];
  const anchor = pickAnchor(config.anchors, slug);

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] p-6 md:p-8 text-center">
      <p className="text-white/90 text-sm font-medium mb-2">
        {config.badge}
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
        {config.heading}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={config.href}
          className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-bold py-3 px-6 rounded-full text-sm hover:shadow-lg transition-all"
        >
          {anchor} <ArrowRight className="w-4 h-4" />
        </Link>
        <TrackedContactLink
          href="https://wa.me/905448989812"
          kind="whatsapp"
          label="blog_inline_cta_whatsapp"
          location="blog_inline_cta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--brand-whatsapp)] text-white font-bold py-3 px-6 rounded-full text-sm hover:brightness-110 transition-all"
        >
          WhatsApp Us
        </TrackedContactLink>
      </div>
    </div>
  );
}
