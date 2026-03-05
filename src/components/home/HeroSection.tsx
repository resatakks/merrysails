"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=85"
        alt="Istanbul Bosphorus"
        fill
        className="object-cover"
        priority
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container-main w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl"
        >
          {/* Promo badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[var(--brand-gold)]/90 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4" />
            Winter Special — €20 <span className="line-through opacity-70">€40</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Bosphorus Cruise
            <br />
            <span className="text-[var(--brand-gold)]">in Istanbul</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/80 mb-8 max-w-lg"
          >
            Operated by a trusted local company — book direct and enjoy the best price
            for sunset cruises, dinner shows, and private yacht experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link href="/cruises/sunset-cruise">
              <button className="btn-cta text-base !py-3.5 !px-8">
                Book Now — €20
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/cruises">
              <button className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold py-3.5 px-8 rounded-full border border-white/25 hover:bg-white/25 transition-all">
                View All Tours
              </button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-6 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[var(--brand-gold)]" />
              <span>5.0 Rating (65+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--brand-gold)]" />
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--brand-gold)]" />
              <span>23+ Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface-alt)] to-transparent" />
    </section>
  );
}
