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
        src="/images/sunset3.jpeg"
        alt="Bosphorus sunset cruise in Istanbul"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container-main flex min-h-[100svh] w-full items-center pt-28 pb-16 sm:min-h-[86vh] sm:pt-28 sm:pb-16 md:min-h-[88vh] md:pt-32 md:pb-18">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl md:translate-y-5"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl text-[2.1rem] font-bold leading-[1.03] text-white sm:text-5xl md:text-[4.2rem]"
            >
              Bosphorus Dinner Cruise, Sunset Cruise &amp; Yacht Charter
              <span className="text-[var(--brand-gold)]"> in Istanbul</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/84 sm:max-w-2xl sm:text-base md:text-lg"
            >
              Go straight to the exact sunset, dinner, or yacht page that fits your plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 grid gap-3 md:max-w-4xl md:grid-cols-3"
            >
              {heroProducts.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group rounded-[1.45rem] border border-white/45 bg-white/82 px-4 py-3.5 text-[var(--heading)] shadow-[0_18px_48px_rgba(11,21,58,0.14)] transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/90"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {product.meta}
                  </p>
                  <h2 className="mt-1.5 text-base font-semibold leading-snug text-[var(--heading)]">
                    {product.title}
                  </h2>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-5 flex flex-wrap gap-3"
            >
              <Link href="/reservation" className="btn-cta text-base !py-3.5 !px-8">
                Open Reservation Center
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cruises"
                className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/90 px-8 py-3.5 font-semibold text-[var(--heading)] transition-all hover:bg-white sm:inline-flex"
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
