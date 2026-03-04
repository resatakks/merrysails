"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  return (
    <div className="mobile-booking-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-muted text-xs">Starting from</p><p className="font-bold text-heading text-lg leading-tight">€25 <span className="text-muted text-xs font-normal">/ person</span></p></div>
        <div className="flex items-center gap-2">
          <Link href="/booking" className="bg-secondary hover:bg-secondary-hover text-white py-3 px-5 rounded-full font-semibold text-sm">Book Now</Link>
          <a href="https://wa.me/905321234567" className="w-11 h-11 bg-whatsapp rounded-full flex items-center justify-center text-white"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  );
}
