import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=85"
        alt="Istanbul Bosphorus Sunset Cruise"
        fill
        className="object-cover"
        priority
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 max-w-[1290px] mx-auto px-5 w-full pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up">
            <p className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-5">
              Istanbul Bosphorus Cruise
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Unforgettable
              <br />
              <span className="gradient-text">Bosphorus</span>
              <br />
              Experiences
            </h1>
            <p className="text-white/70 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
              Premium cruise experiences operated by a trusted local company. Book direct and enjoy the best prices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8 animate-fade-in-up delay-200">
            <Link href="/booking" className="bg-accent hover:bg-accent-hover text-white py-4 px-8 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              Book Now — from €20
            </Link>
            <Link href="/cruises" className="border-2 border-white/30 hover:border-white text-white py-4 px-8 rounded-xl font-semibold text-base transition-all inline-flex items-center gap-2 hover:bg-white/10">
              View All Cruises
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-10 text-white/60 text-sm animate-fade-in delay-400">
            <span className="flex items-center gap-1.5">
              <span className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}</span>
              4.9/5 Rating
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span>1000+ Happy Guests</span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span>TURSAB Licensed</span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span>Free Cancellation</span>
          </div>
        </div>

        <div className="hidden lg:block absolute right-8 bottom-24 w-72">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="price-box justify-center">
              <span className="currency">€</span>
              <span className="amount">20</span>
              <span className="per-person">/ person</span>
            </div>
            <div className="p-5">
              <p className="font-heading font-bold text-heading text-lg">Sunset Cruise</p>
              <p className="text-muted text-sm mt-1">Winter Special — 2 hours</p>
              <div className="flex items-center gap-1.5 mt-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
                <span className="text-xs text-muted ml-1">118 reviews</span>
              </div>
              <Link href="/cruises/sunset-cruise" className="block bg-accent hover:bg-accent-hover text-white text-center py-3 rounded-xl font-semibold text-sm transition-all mt-4">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
