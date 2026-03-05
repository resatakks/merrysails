"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CreditCard, RotateCcw } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Local Bosphorus Operator" },
  { icon: CreditCard, label: "No Middlemen — Direct Booking" },
  { icon: RotateCcw, label: "Free Cancellation" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=85"
        alt="Bosphorus cruise in Istanbul"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="hero-bg absolute inset-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Promo Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-block bg-secondary/90 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-pulse">
            ✨ Winter Special — €20 <s>€40</s>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-tight mb-4"
        >
          Bosphorus Cruise in Istanbul
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
          Operated by a trusted local company — book direct and enjoy the best price
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <Link href="/booking" className="btn-cta inline-block">
            Book Now – €20
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/80 text-sm">
              <Icon className="w-4 h-4 text-secondary" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
