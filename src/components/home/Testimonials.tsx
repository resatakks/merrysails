"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Misafirlerimizden"
          subtitle="MerrySails deneyimini yaşayan misafirlerimizin yorumları"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-cream rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gold/20" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-ocean-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-deep-navy">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.country}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>

              <p className="text-xs text-gold font-semibold mt-4">{item.tour}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
