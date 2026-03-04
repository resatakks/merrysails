import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <Image src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80" alt="Istanbul" fill className="object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">Ready for Your<br /><span className="text-secondary">Dream Cruise?</span></h2>
        <p className="text-white/60 text-lg mt-5 max-w-xl mx-auto">Contact us for private events, group tours, or special offers.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link href="/booking" className="bg-secondary hover:bg-secondary-hover text-white py-4 px-10 rounded-full font-semibold transition-all shadow-lg hover:-translate-y-0.5">Book Now</Link>
          <a href="tel:+905321234567" className="border-2 border-white/25 hover:border-white text-white py-4 px-8 rounded-full font-semibold transition-all hover:bg-white/10 inline-flex items-center gap-2"><Phone className="w-5 h-5" />Call Us</a>
          <a href="https://wa.me/905321234567" target="_blank" rel="noopener noreferrer" className="bg-whatsapp hover:bg-[#20BD5A] text-white py-4 px-8 rounded-full font-semibold transition-all shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"><MessageCircle className="w-5 h-5" />WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
