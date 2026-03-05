"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="mobile-bar fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        {/* Price Area */}
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-heading">&euro;20</span>
            <span className="text-sm text-text-light line-through">&euro;40</span>
          </div>
          <span className="text-[11px] text-text-light">per person</span>
        </div>

        {/* Book Now CTA */}
        <Link href="/contact" className="btn-cta flex-1 text-center py-3 text-sm font-semibold">
          Book Now
        </Link>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/905524638498"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  );
}
