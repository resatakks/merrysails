import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fleet } from "@/data/fleet";
import { Users, Ruler, Anchor } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Fleet",
};

export default function FleetPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="min-h-[40vh] bg-primary flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Fleet
          </h1>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="section">
        <div className="max-w-[1290px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleet.map((yacht) => (
              <div
                key={yacht.name}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={yacht.image}
                    alt={yacht.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-heading mb-4">
                    {yacht.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4 text-heading/70">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      {yacht.capacity} guests
                    </span>
                    <span className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      {yacht.length}
                    </span>
                    <span className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-primary" />
                      {yacht.type}
                    </span>
                  </div>

                  {yacht.features && yacht.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {yacht.features.map((feature: string) => (
                        <span
                          key={feature}
                          className="bg-bg rounded-full px-3 py-1 text-xs text-heading/70"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-heading/70 mb-6">
              Contact us for yacht reservations
            </p>
            <Link href="/contact" className="btn-cta inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
