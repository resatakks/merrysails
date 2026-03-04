"use client";

import { motion } from "framer-motion";
import { Anchor, Calendar, Users, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-clip">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
        alt="İstanbul Boğazı Gün Batımı"
        fill
        className="object-cover"
        priority
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Anchor className="w-6 h-6 text-gold" />
            <span className="text-gold font-semibold tracking-widest uppercase text-sm">
              Merry Tourism
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            İstanbul&apos;un Kalbinde
            <br />
            <span className="gradient-text">Unutulmaz Deniz Deneyimleri</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mt-6">
            MerrySails ile Boğaz&apos;ın büyüsünü keşfedin. Gün batımı turlarından
            özel yat organizasyonlarına, her anı özel kılıyoruz.
          </p>
        </motion.div>

        {/* Quick Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Tarih
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Kişi Sayısı
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n} className="bg-deep-navy">
                        {n} Kişi
                      </option>
                    ))}
                    <option value="10+" className="bg-deep-navy">
                      10+ Kişi
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Tur Tipi
                </label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option value="" className="bg-deep-navy">Tüm Turlar</option>
                  <option value="sunset" className="bg-deep-navy">Gün Batımı</option>
                  <option value="dinner" className="bg-deep-navy">Yemekli Tur</option>
                  <option value="sightseeing" className="bg-deep-navy">Keşif Turu</option>
                  <option value="private" className="bg-deep-navy">Özel Yat</option>
                  <option value="breakfast" className="bg-deep-navy">Kahvaltı Turu</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => router.push("/cruises")}
                  className="w-full bg-sunset hover:bg-sunset-light text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-sunset/25"
                >
                  <Search className="w-4 h-4" />
                  Tur Ara
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-gold">★★★★★</span> 4.9/5 Rating
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>1000+ Mutlu Misafir</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>TURSAB Lisanslı</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>Ücretsiz İptal (24 saat)</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-1.5 bg-gold rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
