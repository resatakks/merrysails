"use client";

import { motion } from "framer-motion";
import { Ship, Shield, Utensils, Users, Clock, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Ship,
    title: "Lüks Filo",
    description: "Modern ve bakımlı yat filosu ile konforlu ve güvenli yolculuk",
  },
  {
    icon: Shield,
    title: "TURSAB Lisanslı",
    description: "Tam sigortalı, lisanslı ve denetlenen profesyonel hizmet",
  },
  {
    icon: Utensils,
    title: "Gurme Menü",
    description: "Ödüllü şeflerimizin hazırladığı özel Türk ve dünya mutfağı",
  },
  {
    icon: Users,
    title: "Deneyimli Ekip",
    description: "10+ yıl tecrübeli, çok dilli profesyonel mürettebat",
  },
  {
    icon: Clock,
    title: "Esnek Zamanlama",
    description: "Sabah, öğle, akşam ve gece turları ile her saate uygun seçenek",
  },
  {
    icon: Star,
    title: "4.9 ★ Puan",
    description: "1000+ misafirden mükemmel puanlama ve olumlu geri bildirim",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-deep-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-blue/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Neden MerrySails?"
          subtitle="Boğaz'da en iyi deneyimi sunmak için her detayı özenle planlıyoruz"
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-white/15 transition-all group"
            >
              <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
