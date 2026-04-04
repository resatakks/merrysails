"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getPromoName, getPromoCode, getPromoEmoji } from "@/lib/promo";

const DISMISS_KEY = "promo-banner-dismissed";
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (raw) {
      const ts = parseInt(raw, 10);
      if (Date.now() - ts < DISMISS_DURATION) {
        setDismissed(true);
        return;
      }
    }
    setDismissed(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setDismissed(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPromoCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = getPromoCode();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (dismissed) return null;

  const emoji = getPromoEmoji();
  const promoName = getPromoName();
  const promoCode = getPromoCode();

  return (
    <div className="bg-[var(--brand-primary)] text-white text-center text-sm py-1.5 px-4 relative">
      <span>
        {emoji} {promoName}: 10% Discount on All Purchases! Code:{" "}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 font-bold text-[var(--brand-gold)] hover:underline cursor-pointer"
          aria-label={`Copy promo code ${promoCode}`}
        >
          {promoCode}{" "}
          <span className="text-base" aria-hidden="true">
            {copied ? "✅" : "📋"}
          </span>
        </button>
      </span>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/20 rounded"
        aria-label="Dismiss promo banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
