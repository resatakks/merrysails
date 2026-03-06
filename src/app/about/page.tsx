import Image from "next/image";
import { Anchor, Award, Users, Ship } from "lucide-react";

export const metadata = {
  title: "About MerrySails — TURSAB Licensed Bosphorus Cruise Operator Since 2001",
  description: "MerrySails is operated by Merry Tourism, a TURSAB-licensed A Group travel agency serving Istanbul since 2001. 50,000+ happy guests, professional guides, and the best Bosphorus cruise experience.",
  alternates: { canonical: "https://merrysails.vercel.app/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-main">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About MerrySails</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Operated by Merry Tourism, we&apos;ve been creating unforgettable Bosphorus
            experiences for over 23 years.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80"
              alt="Istanbul Bosphorus"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Since 2001, Merry Tourism has been one of Istanbul&apos;s most trusted names in 
              Bosphorus cruises and yacht services. What started as a small family operation 
              with a single boat has grown into a fleet of modern vessels serving thousands 
              of happy travelers each year.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              As a TURSAB-licensed company, we take pride in offering transparent pricing, 
              professional service, and authentic Turkish hospitality. Our team of experienced 
              captains and multilingual guides ensures every guest enjoys a safe, comfortable, 
              and memorable experience on the water.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed">
              From romantic sunset cruises to spectacular Turkish night dinner shows, from 
              intimate marriage proposals to grand corporate events — we have the experience 
              and the passion to make your Istanbul moments truly special.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Ship, value: "23+", label: "Years Experience" },
            { icon: Users, value: "50K+", label: "Happy Guests" },
            { icon: Award, value: "5.0", label: "Average Rating" },
            { icon: Anchor, value: "21", label: "Tour Options" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <stat.icon className="w-8 h-8 text-[var(--brand-primary)] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[var(--heading)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Safety First",
              description: "All vessels are regularly inspected and meet international safety standards. Life jackets and safety equipment for all passengers.",
            },
            {
              title: "Transparent Pricing",
              description: "No hidden fees, no surprises. The price you see is the price you pay. Book direct for the best rates available.",
            },
            {
              title: "Local Expertise",
              description: "Our guides and captains are Istanbul locals who know every corner of the Bosphorus and love sharing its stories.",
            },
          ].map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
