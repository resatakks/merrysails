import { Ship, Shield, Utensils, Users, Clock, Star } from "lucide-react";

const items = [
  { icon: Ship, title: "Luxury Fleet", desc: "Modern, well-maintained yachts" },
  { icon: Shield, title: "TURSAB Licensed", desc: "Fully insured and audited" },
  { icon: Utensils, title: "Gourmet Cuisine", desc: "Award-winning chefs on board" },
  { icon: Users, title: "Expert Team", desc: "10+ years experienced crew" },
  { icon: Clock, title: "Flexible Times", desc: "Morning to night tours" },
  { icon: Star, title: "4.9/5 Rating", desc: "1000+ excellent reviews" },
];

export default function WhyUs() {
  return (
    <section className="section bg-white">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-heading font-bold">Why Choose MerrySails</h2>
          <p className="text-muted mt-3 max-w-lg mx-auto">We plan every detail for the best Bosphorus experience</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((f) => (
            <div key={f.title} className="bg-bg rounded-2xl p-6 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                <f.icon className="w-5 h-5 text-primary group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-heading font-semibold text-base !font-bold">{f.title}</h3>
              <p className="text-muted text-sm mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
