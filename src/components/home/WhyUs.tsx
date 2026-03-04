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
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-light/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-[1290px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Why Choose Us</p>
          <h2 className="font-heading text-3xl md:text-[42px] font-bold text-white leading-tight">
            Your Trusted Local Operator
          </h2>
          <p className="text-white/45 mt-5 max-w-xl mx-auto text-[17px]">
            We plan every detail carefully to provide the best Bosphorus experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.1] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-secondary/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/25 transition-colors">
                <f.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2.5">{f.title}</h3>
              <p className="text-white/45 text-[15px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
