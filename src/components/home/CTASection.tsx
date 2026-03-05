import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--brand-dark)] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--brand-gold)]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-main relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Sail the Bosphorus?
        </h2>
        <p className="text-white/70 mb-8 max-w-lg mx-auto">
          Book your Istanbul cruise experience today. Best price guaranteed when you book direct.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/cruises/sunset-cruise">
            <button className="btn-cta text-base !py-3.5 !px-8">
              Book Now — €20
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <a
            href="https://wa.me/905524638498"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--brand-whatsapp)] text-white font-semibold py-3.5 px-8 rounded-full hover:brightness-110 transition-all"
          >
            <Phone className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="tel:+905524638498"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold py-3.5 px-8 rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
