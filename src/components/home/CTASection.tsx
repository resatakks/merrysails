import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--brand-dark)] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--brand-gold)]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-main relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Build Around the Three Core Booking Pages
        </h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
          Start with the sunset cruise, the dinner cruise, or the yacht charter page.
          Service-led requests can then flow into proposal, private dinner, boat rental,
          and corporate event pages.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/bosphorus-cruise" className="btn-cta text-base !py-3.5 !px-8">
            Compare Bosphorus Cruises
            <ArrowRight className="w-4 h-4" />
          </Link>
          <TrackedContactLink
            href="https://wa.me/905370406822"
            kind="whatsapp"
            label="homepage_cta_whatsapp"
            location="homepage_cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--brand-whatsapp)] text-white font-bold py-3.5 px-8 rounded-full hover:brightness-110 transition-all"
          >
            <Phone className="w-4 h-4" />
            WhatsApp
          </TrackedContactLink>
          <TrackedContactLink
            href="tel:+905370406822"
            kind="phone"
            label="homepage_cta_call"
            location="homepage_cta"
            className="inline-flex items-center gap-2 bg-white text-[var(--brand-dark)] font-bold py-3.5 px-8 rounded-full hover:bg-white/90 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </TrackedContactLink>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/bosphorus-cruise" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
            Bosphorus Cruise Hub
          </Link>
          <span className="text-white/30">·</span>
          <Link href="/cruises/bosphorus-sunset-cruise" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
            Bosphorus Sunset Cruise
          </Link>
          <span className="text-white/30">·</span>
          <Link href="/istanbul-dinner-cruise" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
            Bosphorus Dinner Cruise
          </Link>
          <span className="text-white/30">·</span>
          <Link href="/yacht-charter-istanbul" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
            Yacht Charter Istanbul
          </Link>
        </div>
      </div>
    </section>
  );
}
