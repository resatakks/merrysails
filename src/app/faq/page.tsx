import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MerrySails Istanbul Bosphorus cruises.",
};

const faqs = [
  {
    q: "How do I book a cruise?",
    a: "You can book directly through our website, or contact us via WhatsApp or phone. We'll confirm your reservation immediately and send you booking details via email.",
  },
  {
    q: "Is there a free cancellation policy?",
    a: "Yes! You can cancel for free up to 24 hours before the departure time for a full refund. Cancellations within 24 hours may be subject to a 50% fee.",
  },
  {
    q: "What should I bring on the cruise?",
    a: "We recommend bringing a light jacket (it can get breezy on the water), comfortable shoes, sunglasses, and a camera. Sunscreen is also recommended for daytime cruises.",
  },
  {
    q: "Are the cruises suitable for children?",
    a: "Yes, most of our cruises are family-friendly. Children under 6 travel free on shared cruises. For private yacht charters, there are no age restrictions.",
  },
  {
    q: "Where is the departure point?",
    a: "Most cruises depart from Eminönü Pier, easily accessible by tram (Eminönü stop). Private yacht charters typically depart from Kuruçeşme Marina. Exact meeting point details are sent with your booking confirmation.",
  },
  {
    q: "Can I customize a private cruise?",
    a: "Absolutely! Private yacht charters are fully customizable. You can choose your route, duration, catering, entertainment, and decorations. Contact us to discuss your requirements.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept credit/debit cards (Visa, Mastercard), bank transfer, and cash (EUR, USD, TRY). Online payment is processed through our secure payment gateway.",
  },
  {
    q: "Do you offer hotel pickup?",
    a: "Hotel pickup and drop-off is included with our Dinner Cruise package. For other cruises, we provide detailed directions to the meeting point. Transfer service can be arranged for an additional fee.",
  },
];

export default function FAQPage() {
  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-[var(--text-muted)]">
            Everything you need to know about our Bosphorus cruises.
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
  );
}
