"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--color-heading)]">
                €35
              </span>
              <span className="text-sm text-gray-400 line-through">€65</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/booking" className="btn-cta text-sm !py-2.5 !px-5">
              Book Now
            </Link>
            <a
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#1da851] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
