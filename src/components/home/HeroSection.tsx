import Image from "next/image";
import Link from "next/link";
import { Star, Anchor } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-clip">
      <Image
        src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=85"
        alt="Istanbul Bosphorus"
        fill
        className="object-cover"
        priority
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-32 pb-24">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5 mb-8">
            <Anchor className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Istanbul Bosphorus Cruise Tours</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.08]">
            Unforgettable
            <br />
            <span className="gradient-text">Bosphorus</span> Experiences
          </h1>

          <p className="text-white/65 text-lg md:text-xl mt-7 max-w-2xl mx-auto leading-relaxed">
            Discover the magic of Istanbul from the water. Premium cruises,
            gourmet dining, and private yacht charters by a trusted local operator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up delay-200">
          <Link
            href="/cruises"
            className="bg-accent hover:bg-accent-hover text-white py-4 px-10 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2.5 hover:-translate-y-0.5"
          >
            Explore Cruises — from €25
          </Link>
          <a
            href="https://wa.me/905321234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp hover:bg-[#20BD5A] text-white py-4 px-8 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2.5 hover:-translate-y-0.5"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/55 text-sm animate-fade-in delay-400">
          <span className="flex items-center gap-1.5">
            <span className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}</span>
            4.9/5 Rating
          </span>
          <span className="w-px h-4 bg-white/20 hidden sm:block" />
          <span>1000+ Happy Guests</span>
          <span className="w-px h-4 bg-white/20 hidden sm:block" />
          <span>TURSAB Licensed</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
