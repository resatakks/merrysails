"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CreditCard, RotateCcw, Star } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "TURSAB Lisanslı" },
  { icon: Star, label: "4.9/5 — 1000+ Yorum" },
  { icon: CreditCard, label: "Doğrudan Rezervasyon" },
  { icon: RotateCcw, label: "Ücretsiz İptal" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=85"
        alt="İstanbul Boğazı manzarası"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="hero-gradient absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Promo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/90 px-5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
            <span className="animate-pulse">✦</span>
            Winter Special — 50% OFF
            <span className="animate-pulse">✦</span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          İstanbul&apos;un Kalbinde Unutulmaz Deniz Deneyimleri
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto"
        >
          MerrySails ile Boğaz&apos;ın büyüsünü keşfedin. Gün batımı turlarından
          özel yat organizasyonlarına, her anı özel kılıyoruz.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/cruises" className="btn-cta">
            Turları Keşfet
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3 text-white font-medium transition-all hover:bg-white hover:text-heading"
          >
            Hemen Rezervasyon Yap
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-white/70 text-sm"
            >
              <badge.icon className="h-4 w-4 text-gold" />
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
}
