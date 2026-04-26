import Link from "next/link";
import { Shield, Clock, Award, MapPin, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Free Cancellation",
    description: "Cancel up to 24 hours before departure for a full refund. No hidden fees, no questions asked.",
  },
  {
    icon: Clock,
    title: "TURSAB Licensed Since 2001",
    description: "Merry Tourism is a TURSAB A Group licensed travel agency operating Istanbul travel services since 2001.",
  },
  {
    icon: Award,
    title: "Clear Pricing",
    description: "See the listed rate before you book. If you need a private setup or extra services, we confirm the price in advance.",
  },
  {
    icon: MapPin,
    title: "Local Istanbul Experts",
    description: "Our team helps guests choose the right Bosphorus route, boarding flow, package tier, and private-service setup before booking.",
  },
  {
    icon: Headphones,
    title: "24/7 Multilingual Support",
    description: "Reach our team anytime via WhatsApp, phone (+90 537 040 68 22), or email. We respond within minutes.",
  },
  {
    icon: CreditCard,
    title: "Flexible Confirmation Flow",
    description: "Shared cruises are reserved first and paid onboard, while private yacht and event formats are confirmed manually with our team before payment timing is finalized.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Book Your Istanbul Boat Tour With Us?</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            TURSAB-licensed Bosphorus cruise and yacht-charter support from an Istanbul travel company operating since 2001.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[var(--surface-alt)] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[var(--brand-primary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--brand-primary)]/15 bg-[var(--surface-alt)] p-6">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-3">Not sure which Bosphorus plan fits your day?</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Start with the Bosphorus compare hub if you are still choosing between sunset, dinner, and private yacht.
              Move into contact and quote routing only after the brief is clearly proposal, private dinner, celebration, pickup-led, or corporate-led.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              {
                href: "/bosphorus-cruise",
                label: "Bosphorus Cruise Compare Hub",
                description: "Use this first for broad commercial intent and owner-page selection.",
              },
              {
                href: "/contact",
                label: "Contact & Quote Routing",
                description: "Use this next when the brief is already narrow and you need the right support page or quote path.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white bg-white px-4 py-4 text-sm transition-colors hover:border-[var(--brand-primary)]/40 hover:text-[var(--brand-primary)]"
              >
                <span className="block font-medium text-[var(--text-main)]">{item.label}</span>
                <span className="mt-1 block text-[var(--text-muted)]">{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
