"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="mobile-booking-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <p className="text-muted text-xs">Starting from</p>
          <p className="font-bold text-heading text-lg leading-tight">€20 <span className="text-muted text-xs font-normal">/ person</span></p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/booking" className="bg-accent hover:bg-accent-hover text-white py-3 px-5 rounded-xl font-semibold text-[13px] transition-all shadow-md inline-flex items-center gap-2">
            Book Now
          </Link>
          <a
            href="https://wa.me/905321234567"
            className="w-12 h-12 bg-whatsapp rounded-xl flex items-center justify-center text-white shadow-md"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
