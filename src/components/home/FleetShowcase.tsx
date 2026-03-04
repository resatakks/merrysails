"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Ruler, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fleet } from "@/data/fleet";

export default function FleetShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Filomuz"
          subtitle="Modern, bakımlı ve güvenli yatlarımızla Boğaz'da konforlu bir yolculuk"
        />

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {fleet.map((yacht, i) => (
            <motion.div
              key={yacht.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex-shrink-0 w-80 snap-start"
            >
              <Link
                href={`/fleet`}
                className="group block bg-cream rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={yacht.image}
                    alt={yacht.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="320px"
                  />
                  <div className="absolute bottom-3 left-3 glass-dark rounded-lg px-3 py-1">
                    <span className="text-white text-xs font-semibold">{yacht.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-deep-navy group-hover:text-sunset transition-colors">
                    {yacht.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {yacht.capacity} kişi
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      {yacht.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {yacht.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-white text-ocean-blue px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-sunset hover:text-sunset-light font-semibold transition-colors"
          >
            Tüm Filoyu İncele
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
