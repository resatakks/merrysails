import { Shield, Clock, Award, MapPin, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Free Cancellation",
    description: "Cancel up to 24 hours before departure for a full refund.",
  },
  {
    icon: Clock,
    title: "23+ Years Experience",
    description: "Serving travelers since 2001 with thousands of happy guests.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Book direct for the best rates — no middleman fees.",
  },
  {
    icon: MapPin,
    title: "Local Company",
    description: "Operated by Merry Tourism, a licensed local Turkish company.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Reach us anytime via WhatsApp, phone, or email.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay online securely or onboard. Multiple payment options.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Book Your Istanbul Boat Tour With Us?</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Over 50,000 happy guests since 2001. TURSAB-licensed Bosphorus cruise operator trusted by travelers worldwide.
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
      </div>
    </section>
  );
}
