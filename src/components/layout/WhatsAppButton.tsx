"use client";

import { MessageCircle, Phone } from "lucide-react";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <>
      <a
        href={`tel:${PHONE}`}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:bottom-6 md:left-6 md:h-14 md:w-14"
        aria-label={`Call ${PHONE_DISPLAY}`}
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
      </a>
      <a
        href={`${WHATSAPP_URL}?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20Bosphorus%20cruise%20tours.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:bottom-6 md:right-6 md:h-14 md:w-14"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </>
  );
}
