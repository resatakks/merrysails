"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
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
      {/* Background */}
      <Image
        src="/images/tours/bosphorus-sunset-cruise/03.jpg"
        alt="Istanbul Bosphorus"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container-main flex min-h-[78vh] w-full items-end pt-24 pb-10 sm:pt-28 sm:pb-12 md:min-h-[84vh] md:pt-36 md:pb-18">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl text-[2.45rem] font-bold leading-[1.02] text-white sm:text-5xl md:text-6xl"
            >
              Bosphorus Dinner Cruise, Sunset Cruise &amp; Yacht Charter
              <span className="text-[var(--brand-gold)]"> in Istanbul</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-white/84 sm:text-base md:text-lg"
            >
              Compare the 3 core Bosphorus products on one page, then go directly to the exact
              dinner, sunset, or yacht package that fits your plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 grid gap-2.5 md:max-w-4xl md:grid-cols-3 md:gap-3"
            >
              {heroProducts.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group rounded-[1.45rem] border border-white/70 bg-white/92 px-4 py-3.5 shadow-[0_18px_48px_rgba(11,21,58,0.14)] transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {product.meta}
                  </p>
                  <p className="mt-1.5 text-base font-semibold leading-snug text-[var(--heading)]">
                    {product.title}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-[var(--brand-gold)]">{product.price}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary)]">
                      Open page
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link href="/reservation" className="btn-cta text-base !py-3.5 !px-8">
                Open Reservation Center
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cruises"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/92 px-8 py-3.5 font-semibold text-[var(--heading)] transition-all hover:bg-white"
              >
                Explore All Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 hidden flex-wrap gap-5 text-sm text-white/74 sm:flex"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[var(--brand-gold)]" />
                <span>Shared and private cruise options</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--brand-gold)]" />
                <span>Direct booking with clear pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--brand-gold)]" />
                <span>TURSAB-licensed since 2001</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--surface-alt)] to-transparent" />
    </section>
  );
}
