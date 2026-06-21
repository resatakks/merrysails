import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { getContactChannel } from "@/lib/constants";

type Locale = "en" | "tr" | "de" | "fr" | "nl" | "ru";

export default function CTASection({ locale = "en" }: { locale?: Locale } = {}) {
  // WhatsApp is the single customer contact channel for every locale incl. ru.
  const channel = getContactChannel(locale);
  const chatLabel = "WhatsApp";
  const chatBgClass = "bg-[var(--brand-whatsapp)] hover:brightness-110";
  return (
    <section className="relative py-20 md:py-28 bg-[var(--brand-dark)] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--brand-gold)]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-main relative z-10 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
          Book direct with the operator
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to sail the Bosphorus?
        </h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
          Compare every sunset, dinner, and private yacht option side by side, or
          message the team for a tailored plan — same boat and crew, direct
          operator price, no hidden fees.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/bosphorus-cruise" className="btn-cta text-base !py-3.5 !px-8">
            Compare Bosphorus Cruises
            <ArrowRight className="w-4 h-4" />
          </Link>
          <TrackedContactLink
            href={channel.url}
            kind="whatsapp"
            label={`homepage_cta_${channel.icon}`}
            location="homepage_cta"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-full transition-all ${chatBgClass}`}
          >
            <Phone className="w-4 h-4" />
            {chatLabel}
          </TrackedContactLink>
          <TrackedContactLink
            href="tel:+905448989812"
            kind="phone"
            label="homepage_cta_call"
            location="homepage_cta"
            className="inline-flex items-center gap-2 bg-white text-[var(--brand-dark)] font-bold py-3.5 px-8 rounded-full hover:bg-white/90 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </TrackedContactLink>
        </div>
      </div>
    </section>
  );
}
