import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import BosphorusGuideSection from "@/components/home/BosphorusGuideSection";
import CommercialIntentSection from "@/components/home/CommercialIntentSection";
import Link from "next/link";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Sunset & Dinner | MerrySails",
  description:
    "Compare the 3 core MerrySails experiences in Istanbul: Bosphorus Sunset Cruise, Bosphorus Dinner Cruise, and Yacht Charter in Istanbul.",
  keywords: [
    "istanbul cruise",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "yacht charter istanbul",
    "yacht charter in istanbul",
    "boat tour istanbul",
    "bosphorus boat tour",
    "istanbul boat trip",
    "bosphorus cruise 2026",
    "istanbul boat tour 2026",
  ],
  alternates: { canonical: "https://merrysails.com" },
  openGraph: {
    title: "Bosphorus Cruise Istanbul | Sunset & Dinner | MerrySails",
    description:
      "Find the right Bosphorus experience for Sunset Cruise, Dinner Cruise, and Yacht Charter in Istanbul.",
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
    "@id": "https://merrysails.com/#organization",
  },
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
        text: "MerrySails offers different Bosphorus experiences. The sunset cruise is a 2-hour shared golden-hour sailing with drinks, snacks, and a wine-served option depending on package. The dinner cruise adds dinner service and stage entertainment, while the yacht charter experience covers private yacht packages with optional meals, drinks, transfers, and entertainment.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The flagship sunset cruise is approximately 2 hours, the shared dinner cruise is approximately 3.5 hours, and the yacht charter base packages start at 2 hours with the option to add extra time.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the Bosphorus cruise depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Departure details depend on the product. The sunset cruise uses a central meeting point confirmed after booking, the dinner cruise is tied to the Kabatas Pier flow with hotel pickup support from central European-side zones, and yacht charters operate from approved Bosphorus marinas depending on the vessel.",
      },
    },
    {
      "@type": "Question",
      name: "Which MerrySails experience fits a dinner, proposal, or private charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the main shared evening experience, use Istanbul Dinner Cruise. For private yacht bookings, use Yacht Charter Istanbul. For a proposal setup, use Proposal Yacht Rental Istanbul. For company hosting, use Corporate Events. For a lighter private-hire brief, Boat Rental Istanbul is the closest fit.",
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

const coreBookingPages = [
  {
    href: "/cruises/bosphorus-sunset-cruise",
    eyebrow: "Golden hour",
    title: "Bosphorus Sunset Cruise",
    description: "Shared sunset sailing with clear pricing and date-led golden-hour bookings.",
    image: "/images/sunset1.jpeg",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Bosphorus Dinner Cruise",
    description: "Main shared evening experience with dinner service, entertainment, and four package levels.",
    image: "/images/dinner-etkinlik-2.jpeg",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Premium charter",
    title: "Yacht Charter Istanbul",
    description: "Private charter demand with yacht packages, add-ons, and higher-ticket booking intent.",
    image: "/images/tours/yacht-charter-in-istanbul/02.jpeg",
  },
] as const;

const supportPages = [
  {
    href: "/sunset-cruise-tickets-istanbul",
    eyebrow: "Shared sunset tickets",
    title: "Sunset Ticket Support",
    description: "Use this when the shared sunset route is already the likely fit and the remaining question is public ticket and option clarity.",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    eyebrow: "Show-led shared dinner",
    title: "Turkish Night Dinner Support",
    description: "Use this when the Turkish-night dinner format matters more than pickup or Kabatas-side boarding questions.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    eyebrow: "Pickup-led brief",
    title: "Dinner Pickup Support",
    description: "Use this when the shared dinner route is already right and the main question is hotel pickup eligibility.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    eyebrow: "Central hotel pickup",
    title: "Sultanahmet & Taksim Pickup",
    description: "Use this when the blocker is whether Sultanahmet, Taksim, Sirkeci, or Karakoy fits the dinner pickup flow.",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    eyebrow: "Hourly private hire",
    title: "Boat Rental Hourly",
    description: "Use this when the brief is shorter, lighter, and hour-led before a package-driven charter.",
  },
  {
    href: "/bosphorus-cruise-departure-points",
    eyebrow: "Waterfront logic",
    title: "Departure Points Hub",
    description: "Use this when the main question is where dinner, sunset, and private yacht products actually start in Istanbul.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    eyebrow: "Proposal coverage",
    title: "Proposal Yacht with Photographer",
    description: "Use this when discreet reveal coverage and couple portraits are part of the decision before booking.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    eyebrow: "Dinner-led company brief",
    title: "Corporate Yacht Dinner",
    description: "Use this when a private yacht dinner matters more than a broader client-hosting or launch format.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HeroSection />
      <TourGrid />

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Choose Your Bosphorus Cruise, Dinner Cruise or Yacht Charter
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            These are the 3 core booking options for direct bookings.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreBookingPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white transition-colors hover:border-[var(--brand-primary)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">{item.eyebrow}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                    See details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTour tour={tours[0]} />
      <FeaturedTour tour={tours[1]} reverse />
      <FeaturedTour tour={tours[2]} />

      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Use These Support Routes Only When The Brief Is Already Narrow
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            Broad searchers should still start with sunset, dinner, yacht charter, or the Bosphorus compare hub. These links are only for narrower pickup, corporate dinner, proposal, and departure-logic briefs.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {supportPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  See details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CommercialIntentSection compact />
      <WhyUs />

      {/* Trust notes — AI Visibility */}
      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold text-center mb-6">Bosphorus Cruise Safety & Licensing Standards</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Licensed travel-agency operation</h3>
              <p className="text-sm leading-relaxed">
                MerrySails is operated by Merry Tourism, a TURSAB A Group licensed travel agency. This keeps licensing, booking support, and guest communication tied to a named Istanbul operator.
              </p>
            </div>
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Bosphorus-specific planning</h3>
              <p className="text-sm leading-relaxed">
                Sunset, dinner, and private yacht bookings use different timing, boarding, package, and route logic. The site separates those intents so guests can choose the right product before contacting the team.
              </p>
            </div>
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Safety and boarding clarity</h3>
              <p className="text-sm leading-relaxed">
                Booking pages and confirmation messages are treated as the source of truth for exact meeting points, inclusions, timing, and vessel-specific details.
              </p>
            </div>
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
