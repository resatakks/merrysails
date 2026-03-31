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
    a: "Bosphorus cruise prices start from €15 for a short sightseeing cruise, €40 for a sunset cruise, and €65 for a dinner cruise with Turkish night entertainment. Private yacht charter starts from €280 for 2 hours. All prices include basic refreshments.",
  },
  {
    q: "How do I book a Bosphorus boat tour?",
    a: "You can book directly through our website, via WhatsApp (+90 537 040 68 22), or by phone. We confirm your reservation immediately and send booking details via email. Book direct for the best price — no middleman fees.",
  },
  {
    q: "Is there a free cancellation policy?",
    a: "Yes! You can cancel for free up to 24 hours before the departure time for a full refund. Cancellations within 24 hours may be subject to a 50% fee.",
  },
  {
    q: "What is included in the Istanbul dinner cruise?",
    a: "Our Bosphorus dinner cruise includes hotel pickup and drop-off, a 4-course Turkish dinner, unlimited local drinks, live music and DJ, belly dance show, and whirling dervish performance. The cruise lasts 3.5 hours along the illuminated Bosphorus.",
  },
  {
    q: "What time does the Bosphorus sunset cruise depart?",
    a: "The sunset cruise departs from Eminönü Pier at 17:00 or 18:00 depending on the season. The cruise lasts 2.5 hours and includes welcome drinks, live commentary, snacks, and WiFi. We recommend arriving 15 minutes early.",
  },
  {
    q: "Can I rent a private yacht on the Bosphorus?",
    a: "Yes! We offer private yacht charter in Istanbul starting from €280 (Essential), €380 (Premium), and €680 (VIP). Each package includes a professional captain and crew, tea/coffee/water, and a Bluetooth sound system. You can add extras like a photographer, violinist, DJ, or food service.",
  },
  {
    q: "Where do the boats depart from?",
    a: "Shared cruises (sunset, dinner, sightseeing) depart from Eminönü Pier, easily accessible by tram (Eminönü stop). Private yacht charters depart from Kuruçeşme Marina. Exact meeting point details are sent with your booking confirmation.",
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
    a: "Absolutely! We specialize in yacht events in Istanbul — marriage proposals, birthday parties, bachelorette parties, wedding anniversaries, and corporate events. All packages include decoration, and you can add photographers, musicians, and custom cakes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept credit/debit cards (Visa, Mastercard), bank transfer, and cash (EUR, USD, TRY). Online payment is processed through our secure payment gateway.",
  },
  {
    q: "Do you offer hotel pickup for the dinner cruise?",
    a: "Hotel pickup and drop-off is included with our Bosphorus dinner cruise package at no extra cost. For other cruises, we provide detailed directions to the meeting point. VIP transfer service can also be arranged.",
  },
  {
    q: "Is MerrySails a licensed company?",
    a: "Yes, MerrySails is operated by Merry Tourism, a TURSAB-licensed A Group travel agency based in Istanbul. We have been operating since 2001 and have served over 50,000 happy guests. All our guides hold Professional Tourist Guidance Certificates.",
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
      </div>
    </div>
    </>
  );
}
