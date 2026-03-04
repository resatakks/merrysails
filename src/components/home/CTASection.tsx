"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80"
        alt="İstanbul Boğazı"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-deep-navy/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
            Hayalinizdeki Boğaz Deneyimi
            <br />
            <span className="text-gold">Bir Tık Uzağınızda</span>
          </h2>
          <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto">
            Özel organizasyonlar, grup turları veya romantik bir akşam için
            hemen iletişime geçin. Size özel teklif hazırlayalım.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="/booking" size="lg">
              Hemen Rezervasyon Yap
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              <Phone className="w-5 h-5" />
              Bizi Arayın
            </Button>
            <a
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
