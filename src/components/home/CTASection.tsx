import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Image src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80" alt="Istanbul" fill className="object-cover" />
      <div className="absolute inset-0 bg-dark/80" />
      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">Ready for Your<br /><span className="text-gold">Dream Cruise?</span></h2>
        <p className="text-white/50 text-lg mt-4">Contact us for special offers, group tours, or private events.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/booking" className="btn-cta !py-4 !px-10">Book Now</Link>
          <a href="tel:+905321234567" className="border-2 border-white/20 hover:border-white/50 text-white py-3.5 px-8 rounded-xl font-semibold transition-all inline-flex items-center gap-2 hover:bg-white/10"><Phone className="w-5 h-5" />Call Us</a>
          <a href="https://wa.me/905321234567" target="_blank" rel="noopener noreferrer" className="btn-whatsapp !py-3.5 !px-8"><MessageCircle className="w-5 h-5" />WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
