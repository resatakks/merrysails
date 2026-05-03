import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";

const heroProducts = [
  {
    href: "/cruises/bosphorus-sunset-cruise",
    title: "Bosphorus Sunset Cruise",
    meta: "2 shared options",
    price: "From €34",
  },
  {
    href: "/istanbul-dinner-cruise",
    title: "Bosphorus Dinner Cruise",
    meta: "4 shared packages",
    price: "From €30",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    meta: "3 private yacht tiers",
    price: "From €280",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/sunset5.jpeg"
        alt="Bosphorus sunset cruise in Istanbul"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container-main flex min-h-[36rem] flex-col pt-24 pb-6 sm:min-h-[100svh] sm:justify-center sm:pt-32 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="hero-fade-in mx-auto max-w-3xl text-center">
            <h1 className="text-[1.6rem] font-bold leading-[1.1] text-white sm:text-5xl md:text-[4.2rem] md:leading-[0.98]">
              Bosphorus Cruise Istanbul
              <span className="mt-1 block text-[var(--brand-gold)] sm:mt-0 sm:inline"> — Dinner, Sunset & Yacht Charter</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-white/84 sm:mt-4 sm:text-base md:text-lg">
              Book direct with Istanbul&apos;s TURSAB-licensed operator — sunset from €34, dinner from €30, private yacht from €280.
            </p>
          </div>

          <div className="hero-fade-in hero-fade-in-delay-1 mt-5 grid gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-3">
            {heroProducts.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group rounded-2xl border border-white/45 bg-white/84 px-3.5 py-3 text-[var(--heading)] shadow-[0_18px_48px_rgba(11,21,58,0.14)] transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/90 sm:rounded-[1.55rem] sm:px-4 sm:py-4"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-[0.18em]">
                  {product.meta}
                </p>
                <h2 className="mt-1.5 text-[0.98rem] font-semibold leading-snug text-[var(--heading)] sm:mt-2 sm:text-[1.1rem]">
                  {product.title}
                </h2>
                <div className="mt-2.5 flex items-center justify-between gap-3 sm:mt-3">
                  <p className="text-sm font-bold text-[var(--brand-gold)]">{product.price}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary-hover)]">
                    Open page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="hero-fade-in hero-fade-in-delay-2 mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3">
            <Link
              href="/bosphorus-cruise"
              className="btn-cta text-sm !px-6 !py-3 sm:text-base sm:!px-8 sm:!py-3.5"
            >
              Compare Cruise Options
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] shadow-[0_16px_42px_rgba(11,21,58,0.18)] backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--brand-primary-hover)] sm:px-8 sm:py-3.5 sm:text-base"
            >
              Open Reservation Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="hero-fade-in hero-fade-in-delay-3 mt-7 hidden flex-wrap items-center justify-center gap-5 text-sm text-white/76 sm:flex">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>Shared and private cruise options</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>Direct booking with clear pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>TURSAB-licensed since 2001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
