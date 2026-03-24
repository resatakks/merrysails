import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import BosphorusGuideSection from "@/components/home/BosphorusGuideSection";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul 2026 — Book Online | Sunset & Dinner Cruises from €20",
  description:
    "Book the best Bosphorus cruise in Istanbul for 2026. Sunset cruises from €20, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Best price guarantee — book online today.",
  keywords: [
    "bosphorus cruise",
    "istanbul cruise",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "yacht charter istanbul",
    "boat tour istanbul",
    "bosphorus boat tour",
    "istanbul boat trip",
    "bosphorus short cruise",
    "bosphorus sightseeing cruise",
    "boat hire istanbul",
    "bosphorus cruise 2026",
    "istanbul boat tour 2026",
    "book bosphorus cruise online",
    "best bosphorus cruise istanbul",
  ],
  alternates: { canonical: "https://merrysails.com" },
  openGraph: {
    title: "Bosphorus Cruise Istanbul 2026 — Book Online | From €20",
    description:
      "Sunset cruises from €20, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Book online — best price guarantee.",
    url: "https://merrysails.com",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul 2026" }],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: "https://merrysails.com",
  publisher: {
    "@type": "TravelAgency",
    "@id": "https://merrysails.com/#organization",
    name: "MerrySails",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://merrysails.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <TourGrid />
      <FeaturedTour tour={tours[0]} />
      <FeaturedTour tour={tours[1]} reverse />
      <FeaturedTour tour={tours[2]} />
      <WhyUs />

      {/* Expert References — AI Visibility */}
      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold text-center mb-6">Industry Standards</h2>
          <div className="space-y-4">
            <blockquote cite="https://www.tursab.org.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;TURSAB A Group licensed travel agencies provide comprehensive passenger protection including insurance coverage and transparent pricing. Choosing a licensed operator for boat tours ensures compliance with maritime safety regulations.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>TURSAB (Association of Turkish Travel Agencies)</cite></footer>
            </blockquote>
            <blockquote cite="https://www.ktb.gov.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;Istanbul&apos;s Bosphorus strait, connecting the Black Sea and Sea of Marmara, hosts over 2 million tourist cruise passengers annually. The strait&apos;s unique position between two continents makes it one of the world&apos;s most significant maritime tourism corridors.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>T.C. Ministry of Culture and Tourism</cite></footer>
            </blockquote>
            <blockquote cite="https://kiyiemniyeti.gov.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;All passenger vessels operating in the Bosphorus must comply with Turkish maritime safety standards, including certified crew, life-saving equipment, and regular inspections by the Coastal Safety Directorate.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>Coastal Safety Directorate</cite></footer>
            </blockquote>
          </div>
        </div>
      </section>

      <BosphorusGuideSection />
      <LatestBlogPosts />
      <Testimonials />
      <CTASection />
    </>
  );
}
