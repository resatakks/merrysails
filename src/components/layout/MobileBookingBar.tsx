"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="mobile-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-muted text-xs">Starting from</p>
          <p className="font-bold text-heading text-xl leading-tight">€20 <span className="text-muted text-xs font-normal line-through">€40</span></p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/booking" className="btn-cta text-sm !py-3 !px-5">Book Now</Link>
          <a href="https://wa.me/905321234567" className="w-12 h-12 bg-whatsapp rounded-xl flex items-center justify-center text-white"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  );
}
