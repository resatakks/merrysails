"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TourCard from "@/components/tours/TourCard";
import Button from "@/components/ui/Button";
import { tours } from "@/data/tours";
import { ArrowRight } from "lucide-react";

export default function PopularTours() {
  const popularTours = tours.slice(0, 6);

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Popüler Turlarımız"
          subtitle="İstanbul Boğazı'nda en çok tercih edilen cruise deneyimlerimizi keşfedin"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {popularTours.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TourCard tour={tour} featured={i === 0} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Button href="/cruises" variant="primary" size="lg">
            Tüm Turları Gör
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
