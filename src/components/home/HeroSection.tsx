"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

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

      <div className="relative z-10 container-main flex min-h-[100svh] items-end pt-[calc(env(safe-area-inset-top)+6.9rem)] pb-[calc(env(safe-area-inset-bottom)+10rem)] max-[380px]:pt-[calc(env(safe-area-inset-top)+6.35rem)] max-[380px]:pb-[calc(env(safe-area-inset-bottom)+8.75rem)] sm:items-center sm:pt-32 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto max-w-3xl text-center max-[380px]:max-w-[19rem]"
          >
            <h1 className="text-[2.05rem] font-bold leading-[0.98] text-white max-[380px]:text-[1.76rem] max-[380px]:leading-[1.01] sm:text-5xl md:text-[4.2rem]">
              Bosphorus Dinner Cruise, Sunset Cruise &amp; Yacht Charter
              <span className="text-[var(--brand-gold)]"> in Istanbul</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/84 max-[380px]:mt-3 max-[380px]:text-[13px] sm:text-base md:text-lg">
              Choose the right Bosphorus experience first, then move straight into booking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 grid gap-3 max-[380px]:mt-5 max-[380px]:gap-2.5 md:grid-cols-3"
          >
            {heroProducts.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group rounded-[1.55rem] border border-white/45 bg-white/84 px-4 py-4 text-[var(--heading)] shadow-[0_18px_48px_rgba(11,21,58,0.14)] transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/90 max-[380px]:rounded-[1.35rem] max-[380px]:px-3.5 max-[380px]:py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] max-[380px]:text-[9px]">
                  {product.meta}
                </p>
                <h2 className="mt-2 text-[1.1rem] font-semibold leading-snug text-[var(--heading)] max-[380px]:mt-1.5 max-[380px]:text-[1rem]">
                  {product.title}
                </h2>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[var(--brand-gold)]">{product.price}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary-hover)]">
                    Open page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 flex flex-wrap justify-center gap-3 max-[380px]:mt-5"
          >
            <Link
              href="/bosphorus-cruise"
              className="btn-cta text-base !px-8 !py-3.5 max-[380px]:text-sm max-[380px]:!px-6 max-[380px]:!py-3"
            >
              Compare Cruise Options
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-8 py-3.5 text-base font-semibold text-[var(--brand-primary)] shadow-[0_16px_42px_rgba(11,21,58,0.18)] backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--brand-primary-hover)] max-[380px]:px-6 max-[380px]:py-3 max-[380px]:text-sm"
            >
              Open Reservation Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-7 hidden flex-wrap items-center justify-center gap-5 text-sm text-white/76 sm:flex"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
