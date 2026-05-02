"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/analytics";

const STORAGE_KEY = "ms_exit_intent_shown";
const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const DISCOUNT_CODE = "SAIL10";
const WHATSAPP_NUMBER = "905370406822";

function pushEvent(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...payload });
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const dismiss = useCallback(
    (reason: "close" | "claim" | "whatsapp") => {
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
      pushEvent("exit_intent_dismissed", { reason });
      setOpen(false);
    },
    []
  );

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      pushEvent("exit_intent_code_copied", { code: DISCOUNT_CODE });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't show on admin/reservation pages
    const path = window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/reservation")) return;

    // Check storage TTL
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - Number(last) < STORAGE_TTL_MS) return;
    } catch {}

    // Mobile: trigger after 30s of inactivity OR scroll past 70% then upward
    // Desktop: trigger on mouseleave to top
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const trigger = () => {
      setOpen(true);
      pushEvent("exit_intent_shown", { device: isMobile ? "mobile" : "desktop" });
    };

    if (isMobile) {
      // Mobile fallback: 45s + scrolled past 60%
      let scrolledFar = false;
      const onScroll = () => {
        const pct =
          (window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight;
        if (pct > 0.6) scrolledFar = true;
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const timer = setTimeout(() => {
        if (scrolledFar) trigger();
      }, 45_000);

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(timer);
      };
    } else {
      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) trigger();
      };
      // Wait 5s before activating to avoid premature triggers
      const t = setTimeout(() => {
        document.addEventListener("mouseleave", onMouseLeave);
      }, 5_000);

      return () => {
        clearTimeout(t);
        document.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm md:items-center"
          onClick={() => dismiss("close")}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => dismiss("close")}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div
              className="h-32 w-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(244,114,182,0.85), rgba(251,146,60,0.85)), url('https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=70')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="px-6 pb-6 pt-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Wait! Before you leave
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Save 10% on your Bosphorus cruise
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Use this code at booking and get an instant discount on any
                shared cruise. Valid for 48 hours.
              </p>

              <button
                type="button"
                onClick={copyCode}
                className="mt-4 flex w-full items-center justify-between rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50 px-4 py-3 transition hover:bg-orange-100"
              >
                <span className="font-mono text-lg font-bold tracking-widest text-slate-900">
                  {DISCOUNT_CODE}
                </span>
                <span className="text-sm font-semibold text-orange-600">
                  {copied ? "✓ Copied" : "Copy code"}
                </span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi! I'd like to use code ${DISCOUNT_CODE} for a Bosphorus cruise.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  pushEvent("exit_intent_whatsapp_click");
                  // Fire central WhatsApp conversion (Google Ads + GA4)
                  try {
                    trackWhatsAppClick({
                      intent: "pre_booking",
                      label: "exit_intent_sail10",
                      location: "exit_intent_popup",
                    });
                  } catch {}
                  dismiss("whatsapp");
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[#1faa54]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Book on WhatsApp
              </a>

              <p className="mt-3 text-xs text-slate-500">
                Or apply code at checkout via the booking widget
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
