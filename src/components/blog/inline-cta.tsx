import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InlineCTA() {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] p-6 md:p-8 text-center">
      <p className="text-white/90 text-sm font-medium mb-2">
        TURSAB Licensed Since 2001
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
        Explore Bosphorus Cruise Options
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/cruises"
          className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-bold py-3 px-6 rounded-full text-sm hover:shadow-lg transition-all"
        >
          View All Cruises <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="https://wa.me/905370406822"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--brand-whatsapp)] text-white font-bold py-3 px-6 rounded-full text-sm hover:brightness-110 transition-all"
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
