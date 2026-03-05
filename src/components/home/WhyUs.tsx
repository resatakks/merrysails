import { Ship, Users, UtensilsCrossed, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Ship,
    title: "Private Fleet",
    description:
      "Our own fleet of well-maintained vessels ensures comfort, safety, and a premium cruise experience every time.",
  },
  {
    icon: Users,
    title: "Professional Crew",
    description:
      "Experienced captains and friendly crew members dedicated to making your journey memorable and enjoyable.",
  },
  {
    icon: UtensilsCrossed,
    title: "Delicious Cuisine",
    description:
      "Savor freshly prepared Turkish dishes and international flavors while cruising along the stunning Bosphorus.",
  },
  {
    icon: Shield,
    title: "Safe & Licensed",
    description:
      "Fully licensed and insured operations with strict safety protocols, so you can relax and enjoy the ride.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description:
      "Multiple departure times throughout the day to fit your schedule, with private charter options available.",
  },
  {
    icon: Award,
    title: "5-Star Service",
    description:
      "1000+ happy guests and counting. Our dedication to excellence has earned us top ratings across platforms.",
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-white">
      <div className="max-w-[1290px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-3">
            Why Choose MerrySails?
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4" />
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            We are a trusted local operator offering direct bookings with the best prices and
            unmatched service quality.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-bg rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-heading font-bold text-lg mb-2">{title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
