import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative min-h-[400px] w-full">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
        alt="İstanbul Boğazı gece manzarası"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0A1628]/80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Hayalinizdeki Boğaz Turu İçin Hazır mısınız?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Hemen rezervasyon yapın, unutulmaz anılar biriktirin
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/booking" className="btn-cta">
              Hemen Rezervasyon Yap
            </Link>
            <Link
              href="tel:+905321234567"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Bizi Arayın
            </Link>
            <Link
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
