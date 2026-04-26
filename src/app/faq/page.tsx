import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ — Bosphorus Cruise Questions Answered",
  description:
    "Frequently asked questions about Istanbul Bosphorus cruises: booking, cancellation policy, what's included, departure points, and group discounts.",
  keywords: [
    "bosphorus cruise faq",
    "istanbul cruise questions",
    "bosphorus tour cancellation",
    "cruise booking faq",
    "istanbul boat tour prices",
  ],
  alternates: { canonical: "https://merrysails.com/faq" },
  openGraph: {
    title: "FAQ — Istanbul Bosphorus Cruise Questions",
    description:
      "Answers to common questions about booking, cancellation, prices, and what to expect on Bosphorus cruises.",
    url: "https://merrysails.com/faq",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const faqs = [
  {
    q: "How much does a Bosphorus cruise cost in Istanbul?",
    a: "Prices depend on the experience you choose. The Bosphorus Sunset Cruise currently starts from EUR 34 for the Without Wine option and EUR 40 for the wine-served option, the Bosphorus Dinner Cruise spans EUR 30 to EUR 90 across four shared packages, and Yacht Charter Istanbul starts from EUR 280 per yacht. Proposal, private dinner, boat rental, and corporate events are priced according to the setup you request.",
  },
  {
    q: "How do I book a Bosphorus boat tour?",
    a: "You can send a reservation request through our website, via WhatsApp (+90 537 040 68 22), or by phone. We create a reservation ID and send the booking details by email.",
  },
  {
    q: "Is there a free cancellation policy?",
    a: "Yes. You can cancel free of charge up to 24 hours before departure. Within the final 24 hours, changes or cancellations need manual review by our team.",
  },
  {
    q: "What is included in the Istanbul dinner cruise?",
    a: "The Bosphorus dinner cruise is offered in four shared evening packages: Silver Soft Drinks, Silver Alcoholic Drinks, Gold Soft Drinks, and Gold Unlimited Alcohol. The experience includes dinner service, a shared 3.5-hour evening sailing, stage entertainment, and hotel pickup support from central European-side zones.",
  },
  {
    q: "What time does the Bosphorus sunset cruise depart?",
    a: "The sunset cruise departs around the seasonal sunset window. The current public structure is a shared 2-hour golden-hour cruise, and final timing is confirmed with the booking.",
  },
  {
    q: "Can I rent a private yacht on the Bosphorus?",
    a: "Yes. Yacht Charter Istanbul shows three private yacht packages, and you can add meals, drinks, transfer, decoration, or entertainment depending on the kind of event you want to host.",
  },
  {
    q: "Where do the boats depart from?",
    a: "Departure details depend on the product. The sunset cruise uses a central meeting point confirmed after booking, the dinner cruise is tied to the Kabatas Pier boarding plan, and private yacht departures depend on the selected vessel and marina.",
  },
  {
    q: "Are the boat tours suitable for children?",
    a: "Yes, most of our Bosphorus boat tours are family-friendly. Children under 6 travel free on shared cruises. For private yacht charters, there are no age restrictions.",
  },
  {
    q: "What should I bring on the cruise?",
    a: "We recommend bringing a light jacket (it can get breezy on the water), comfortable shoes, sunglasses, and a camera. Sunscreen is recommended for daytime Bosphorus cruises.",
  },
  {
    q: "Can I organize a birthday party or marriage proposal on a yacht?",
    a: "Absolutely! We specialize in yacht events in Istanbul — marriage proposals, birthday parties, bachelorette parties, wedding anniversaries, and corporate events. Decorations, photographers, musicians, catering, and custom cakes can all be added depending on the yacht package and event plan.",
  },
  {
    q: "What payment methods do you accept?",
    a: "For the current shared-cruise booking flow, payment is collected onboard by cash or card. If a private event or custom charter needs a different confirmation method, our team explains that directly during the planning process.",
  },
  {
    q: "Do you offer hotel pickup for the dinner cruise?",
    a: "Yes. Shared dinner-cruise packages include hotel pickup and drop-off for central European-side zones, although some streets may require a nearby meeting point instead of door pickup. For other cruises, we provide detailed meeting instructions and optional transfer can be arranged when needed.",
  },
  {
    q: "Is MerrySails a licensed company?",
    a: "Yes, MerrySails is operated by Merry Tourism, a TURSAB-licensed A Group travel agency based in Istanbul. The site uses Merry Tourism's licensing and since-2001 operating history as its main trust signals.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://merrysails.com/faq" },
  ],
};

const routeCards = [
  {
    href: "/bosphorus-cruise",
    eyebrow: "Still comparing",
    title: "Bosphorus Cruise Hub",
    description: "Use this first when you still need to compare sightseeing, sunset, dinner, and private formats.",
  },
  {
    href: "/cruises/bosphorus-sunset-cruise",
    eyebrow: "Golden hour",
    title: "Bosphorus Sunset Cruise",
    description: "Best fit when the light, skyline, and shorter shared format matter most.",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Istanbul Dinner Cruise",
    description: "Best fit when the plan revolves around dinner service, hotel pickup support, and a longer evening.",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Private hire",
    title: "Yacht Charter Istanbul",
    description: "Best fit when you already know the trip should stay private and package-led.",
  },
  {
    href: "/sunset-cruise-tickets-istanbul",
    eyebrow: "Shared sunset booking",
    title: "Sunset Ticket Support",
    description: "Best fit when the shared sunset cruise is already right and the real question is ticket fit, package choice, and reserve-direct clarity.",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    eyebrow: "Show-led dinner fit",
    title: "Turkish Night Dinner Support",
    description: "Best fit when the shared dinner route is already right and the real question is Turkish-night show format and package fit.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    eyebrow: "Pickup help",
    title: "Dinner Pickup Support",
    description: "Best fit when the shared dinner route is already right but hotel pickup eligibility is the main question.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    eyebrow: "Central pickup",
    title: "Sultanahmet & Taksim Pickup",
    description: "Best fit when the dinner route is right and the main question is central hotel pickup around Sultanahmet, Taksim, Sirkeci, or Karakoy.",
  },
  {
    href: "/kabatas-dinner-cruise-istanbul",
    eyebrow: "Kabatas boarding",
    title: "Kabatas Dinner Support",
    description: "Best fit when the dinner route is already right and the real question is Kabatas-side arrival flow.",
  },
  {
    href: "/bosphorus-cruise-departure-points",
    eyebrow: "Boarding clarity",
    title: "Departure Points Hub",
    description: "Best fit when the real question is where sunset, dinner, and private yacht products start in Istanbul.",
  },
] as const;

export default function FAQPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Bosphorus Cruise FAQ</h1>
          <p className="text-[var(--text-muted)]">
            Everything you need to know about booking a boat tour, dinner cruise, yacht rental, and more in Istanbul.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-[var(--line)] last:border-0">
                <AccordionTrigger className="text-left font-semibold text-[var(--heading)] hover:text-[var(--brand-primary)] py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--body-text)] leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {routeCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-[var(--line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:shadow-md"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                {card.eyebrow}
              </p>
              <h2 className="mb-2 text-lg font-semibold text-[var(--heading)]">{card.title}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5 text-sm leading-relaxed text-[var(--body-text)]">
          Need a licensed operator check, boarding clarification, or a direct quote path? Start with{" "}
          <Link href="/tursab" className="text-[var(--brand-primary)] hover:underline">
            TURSAB license details
          </Link>{" "}
          or move to{" "}
          <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">
            contact
          </Link>{" "}
          when the question is already about date, guests, or the right product page.
        </div>
      </div>
    </div>
    </>
  );
}
