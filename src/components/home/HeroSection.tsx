import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-clip">
      <Image src="https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=85" alt="Istanbul Bosphorus" fill className="object-cover" priority />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        <p className="text-white/70 text-sm font-medium tracking-[0.25em] uppercase mb-6 animate-fade-in">Istanbul Bosphorus Cruises</p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up">
          Unforgettable<br /><span className="text-secondary">Bosphorus</span> Experiences
        </h1>
        <p className="text-white/60 text-lg md:text-xl mt-6 max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-100">
          Premium cruise experiences by a trusted local operator. Book direct for the best prices.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up delay-200">
          <Link href="/cruises" className="bg-secondary hover:bg-secondary-hover text-white py-4 px-10 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">Explore Cruises</Link>
          <a href="https://wa.me/905321234567" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 hover:border-white/60 text-white py-4 px-8 rounded-full font-semibold text-base transition-all hover:bg-white/10">Contact Us</a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 animate-fade-in delay-400">
          <div className="text-center"><p className="text-white font-bold text-2xl">4.9<span className="text-secondary">/5</span></p><p className="text-white/50 text-xs mt-1">Guest Rating</p></div>
          <div className="w-px h-10 bg-white/15" />
          <div className="text-center"><p className="text-white font-bold text-2xl">1000<span className="text-secondary">+</span></p><p className="text-white/50 text-xs mt-1">Happy Guests</p></div>
          <div className="w-px h-10 bg-white/15" />
          <div className="text-center"><p className="text-white font-bold text-2xl">10<span className="text-secondary">+</span></p><p className="text-white/50 text-xs mt-1">Years Experience</p></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-body to-transparent" />
    </section>
  );
}
