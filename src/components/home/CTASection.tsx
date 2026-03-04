import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
        alt="Istanbul Bosphorus"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/82" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
        <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-4">Get In Touch</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
          Your Dream Bosphorus
          <br />
          <span className="text-secondary">Experience Awaits</span>
        </h2>
        <p className="text-white/55 text-lg mt-6 max-w-xl mx-auto">
          For private organizations, group tours, or a romantic evening — contact us now and let us prepare a special offer for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link href="/booking" className="bg-accent hover:bg-accent-hover text-white py-4 px-10 rounded-full font-semibold text-base transition-all shadow-lg inline-flex items-center gap-2 hover:-translate-y-0.5">
            Book Now
          </Link>
          <a href="tel:+905321234567" className="border-2 border-white/25 hover:border-white text-white py-4 px-8 rounded-full font-semibold text-base transition-all inline-flex items-center gap-2 hover:bg-white/10">
            <Phone className="w-5 h-5" />
            Call Us
          </a>
          <a
            href="https://wa.me/905321234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp hover:bg-[#20BD5A] text-white py-4 px-8 rounded-full font-semibold text-base transition-all shadow-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
