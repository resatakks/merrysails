import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
        alt="Istanbul Bosphorus view"
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/80" />

      {/* Content */}
      <div className="relative z-10 w-full text-center px-4 py-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          Ready for Your Dream Cruise?
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
          Book now and create unforgettable memories on the Bosphorus
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Book Now */}
          <Link href="/booking" className="btn-cta inline-block">
            Book Now
          </Link>

          {/* Call Us */}
          <Link
            href="tel:+905524638498"
            className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/905524638498"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
