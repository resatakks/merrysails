import { Ship, Shield, Utensils, Users, Clock, Star } from "lucide-react";

const features = [
  { icon: Ship, title: "Luxury Fleet", desc: "Modern, well-maintained yachts for a comfortable and safe voyage" },
  { icon: Shield, title: "TURSAB Licensed", desc: "Fully insured, licensed and professionally audited service" },
  { icon: Utensils, title: "Gourmet Cuisine", desc: "Award-winning chefs prepare Turkish and international dishes" },
  { icon: Users, title: "Expert Team", desc: "10+ years experienced, multilingual professional crew" },
  { icon: Clock, title: "Flexible Scheduling", desc: "Morning, afternoon, evening and night tours available" },
  { icon: Star, title: "4.9 Star Rating", desc: "1000+ guests with excellent reviews and feedback" },
];

export default function WhyUs() {
  return (
    <section className="section-padding">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Why Choose Us</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">Your Trusted Local Operator</h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">We plan every detail carefully for the best Bosphorus experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-bg-white rounded-2xl p-8 border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/15 transition-colors">
                <f.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-bold text-heading mb-2">{f.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
