import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import BosphorusGuideSection from "@/components/home/BosphorusGuideSection";
import Link from "next/link";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Private Yacht & Dinner Cruises 2026",
  description:
    "Book the best Bosphorus cruise in Istanbul for 2026. Sunset cruises from €40, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Best price guarantee — book online today.",
  keywords: [
    "bosphorus cruise",
    "bosphorus cruise istanbul",
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
    title: "Bosphorus Cruise Istanbul | Private Yacht & Dinner Cruises 2026",
    description:
      "Sunset cruises from €40, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Book online — best price guarantee.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "TravelAgency"],
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: "https://merrysails.com",
  logo: "https://merrysails.com/images/logo.png",
  image: "https://merrysails.com/og-image.jpg",
  description:
    "TURSAB A Group licensed Bosphorus cruise operator in Istanbul. Private yacht charters, dinner cruises, sunset cruises and boat tours since 2001.",
  foundingDate: "2001",
  telephone: "+905370406822",
  email: "info@merrysails.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ortaköy Marina",
    addressLocality: "Istanbul",
    addressRegion: "Istanbul",
    postalCode: "34347",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0483,
    longitude: 29.0278,
  },
  openingHours: "Mo-Su 07:00-23:00",
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bosphorus Cruise Istanbul Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Bosphorus Sightseeing Cruise",
        price: "15",
        priceCurrency: "EUR",
        url: "https://merrysails.com/bosphorus-cruise",
      },
      {
        "@type": "Offer",
        name: "Istanbul Dinner Cruise",
        price: "65",
        priceCurrency: "EUR",
        url: "https://merrysails.com/istanbul-dinner-cruise",
      },
      {
        "@type": "Offer",
        name: "Boat Rental Istanbul",
        price: "280",
        priceCurrency: "EUR",
        url: "https://merrysails.com/boat-rental-istanbul",
      },
    ],
  },
  sameAs: [
    "https://www.tripadvisor.com/merrysails",
    "https://www.instagram.com/merrysails",
  ],
};

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Bosphorus cruises include a guided sailing through the strait passing iconic landmarks like Dolmabahçe Palace, Ortaköy Mosque, and the Bosphorus Bridges. Our sunset cruise (€40) includes welcome drinks, live commentary, and Wi-Fi. The dinner cruise (€65) adds an open buffet dinner, unlimited local drinks, live Turkish music and dance show, and hotel pickup/drop-off. Private yacht charters include a dedicated captain and crew, and a fully customisable route.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bosphorus cruise durations vary by type: the sightseeing cruise is 1.5–2 hours; the sunset cruise is approximately 2.5 hours; the dinner cruise is 3–3.5 hours including hotel pickup. Private yacht charters start from 2 hours and can be extended to a full day.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the Bosphorus cruise depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails cruises depart from Ortaköy Marina and Eminönü Pier in Istanbul. Hotel pickup is included with the dinner cruise from all major areas including Taksim, Sultanahmet, Beşiktaş, Şişli, and Kadıköy.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price of a Bosphorus cruise in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bosphorus cruise prices start from €15 per person for a standard sightseeing cruise. Sunset cruises are from €40. Dinner cruises with all-inclusive food and drinks are from €65. Private yacht charter prices start from €280 for a 2-hour charter for up to 15 guests.",
      },
    },
    {
      "@type": "Question",
      name: "When is the best time for a Bosphorus cruise in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best months for a Bosphorus cruise are April–June and September–October when temperatures are 15–25°C, skies are clear, and sunset light is dramatic. Summer (July–August) is popular but hot in the afternoon — evening cruises are ideal. Winter cruises are atmospheric and discounted, with heated indoor dining on dinner cruises.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
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

      {/* FAQ Section — homepage */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            Bosphorus Cruise Istanbul — Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Everything you need to know before booking your cruise
          </p>
          <div className="space-y-4">
            {homepageFaqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.name}
                  <span className="text-gray-400 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2"
            >
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
