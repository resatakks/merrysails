import type { Metadata } from "next";
import Link from "next/link";
import { buildHreflang } from "@/lib/hreflang";
import { BOSPHORUS_LANDMARKS } from "@/data/bosphorus-guide";
import BosphorusGuideClient from "@/components/guide/BosphorusGuideClient";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  title: "Bosphorus Landmarks Guide & Map",
  description:
    "Interactive Bosphorus guide: 12 palaces, fortresses, mosques and bridges from Karaköy to the second bridge — with a tap-to-explore strait map and a free audio guide.",
  alternates: {
    canonical: `${SITE_URL}/bosphorus-guide`,
    languages: buildHreflang("/bosphorus-guide"),
  },
  openGraph: {
    title: "Bosphorus Landmarks Guide & Map",
    description:
      "Explore 12 Bosphorus landmarks — Dolmabahçe, Maiden's Tower, Rumeli Fortress and more — on an interactive strait map with a free audio guide.",
    url: `${SITE_URL}/bosphorus-guide`,
    type: "article",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bosphorus Landmarks Guide",
  description:
    "Palaces, fortresses, mosques and bridges along the Istanbul Bosphorus, south to north.",
  numberOfItems: BOSPHORUS_LANDMARKS.length,
  itemListElement: BOSPHORUS_LANDMARKS.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "TouristAttraction",
      name: l.text.en.name,
      description: l.text.en.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bosphorus Guide",
      item: `${SITE_URL}/bosphorus-guide`,
    },
  ],
};

export default function BosphorusGuidePage() {
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

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]"
          >
            <Link href="/" className="hover:text-[var(--brand-primary)]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Bosphorus Guide</span>
          </nav>

          <header className="mb-8 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
              Free interactive guide
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)] md:text-4xl">
              Bosphorus Landmarks Guide
            </h1>
            <p className="mt-3 text-[var(--body-text)] leading-relaxed">
              Twelve palaces, fortresses, mosques and bridges line the Istanbul
              Bosphorus between Karaköy and the second bridge. Tap any point on
              the strait map to read its story — and use the built-in audio
              guide to listen as you sail.
            </p>
          </header>

          <BosphorusGuideClient />

          <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)]">
              See these landmarks from the water
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--body-text)]">
              Every landmark in this guide is on the route of our shared
              Bosphorus cruises. The 2-hour sunset cruise covers the southern
              corridor through to Rumeli Fortress, with a live guide and a
              12-language on-board audio system.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold !text-white transition-opacity hover:opacity-90"
              >
                Bosphorus sunset cruise
              </Link>
              <Link
                href="/istanbul-dinner-cruise"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]"
              >
                Bosphorus dinner cruise
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
