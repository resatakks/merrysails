"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="mobile-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-[var(--text-muted)]">From</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[var(--heading)]">€20</span>
            <span className="text-sm text-[var(--text-muted)] line-through">€40</span>
            <span className="text-xs text-[var(--text-muted)]">/person</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/905370406822"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--brand-whatsapp)] text-white"
          >
            <Phone className="w-5 h-5" />
          </a>
          <Link href="/cruises/bosphorus-sunset-cruise">
            <button className="btn-cta text-sm !py-2.5 !px-5">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
