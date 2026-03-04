import Image from "next/image";
import Link from "next/link";
import { Shield, CreditCard, RotateCcw } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-clip">
      <Image src="https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=85" alt="Istanbul Bosphorus" fill className="object-cover" priority />
      <div className="hero-bg absolute inset-0" />

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        <div className="fade-up">
          <div className="inline-block bg-gold/90 text-white text-sm font-bold px-4 py-2 rounded-lg mb-6">
            Winter Special — €20 <span className="line-through opacity-70 ml-1">€40</span>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1]">
            Bosphorus Cruise
            <br />in Istanbul
          </h1>

          <p className="text-white/60 text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
            Operated by a trusted local company — book direct and enjoy the best price
          </p>
        </div>

        <div className="mt-8 fade-up delay-2">
          <Link href="/booking" className="btn-cta text-base !py-4 !px-10">
            Book Now – €20
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 fade-in delay-4">
          {[
            { icon: Shield, text: "Local Bosphorus Operator" },
            { icon: CreditCard, text: "No Middlemen — Direct Booking" },
            { icon: RotateCcw, text: "Free Cancellation" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
              <Icon className="w-4 h-4 text-gold" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
