"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  trackScrollDepth,
  trackTimeOnPage,
  trackExternalLinkClick,
  trackFaqOpen,
} from "@/lib/analytics";

/**
 * Universal engagement tracker — fires scroll_depth (25/50/75/90),
 * time_on_page (10s/30s/60s/180s), external_link_click (delegated),
 * faq_open (delegated via [data-faq-trigger] or <details> toggle).
 *
 * Reset firing state on route change so SPA navigations re-track.
 */
export default function EngagementTracker() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- scroll_depth ---
    const firedScroll = new Set<number>();
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.round((window.scrollY / h) * 100) : 0;
      ([25, 50, 75, 90] as const).forEach((m) => {
        if (pct >= m && !firedScroll.has(m)) {
          firedScroll.add(m);
          trackScrollDepth(m);
        }
      });
    };
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    const scrollHandler = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(onScroll, 150);
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // --- time_on_page ---
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    ([10, 30, 60, 180] as const).forEach((s) => {
      timers.push(setTimeout(() => trackTimeOnPage(s), s * 1000));
    });

    // --- external_link_click (delegated) ---
    const currentHost = window.location.host;
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      // FAQ open detection — anchor or button with data-faq-trigger
      const faqEl = target.closest("[data-faq-trigger]") as HTMLElement | null;
      if (faqEl) {
        const q =
          faqEl.getAttribute("data-faq-trigger") ||
          faqEl.textContent?.trim().slice(0, 120) ||
          "unknown";
        trackFaqOpen(q, pathname);
      }

      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("javascript:"))
        return;

      try {
        const url = new URL(href, window.location.href);
        if (url.host && url.host !== currentHost) {
          // ignore tel: and mailto: (already covered by contact events)
          if (url.protocol === "tel:" || url.protocol === "mailto:") return;
          trackExternalLinkClick(
            url.toString(),
            anchor.textContent?.trim().slice(0, 80) || undefined
          );
        }
      } catch {
        /* ignore parse failures */
      }
    };
    document.addEventListener("click", clickHandler, { capture: true });

    // --- faq_open via native <details> toggle ---
    const detailsHandler = (e: Event) => {
      const el = e.target as HTMLDetailsElement | null;
      if (!el || el.tagName !== "DETAILS" || !el.open) return;
      const summary = el.querySelector("summary");
      const q =
        summary?.textContent?.trim().slice(0, 120) ||
        el.getAttribute("data-faq") ||
        "unknown";
      trackFaqOpen(q, pathname);
    };
    document.addEventListener("toggle", detailsHandler, { capture: true });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("click", clickHandler, { capture: true });
      document.removeEventListener("toggle", detailsHandler, { capture: true });
      timers.forEach((t) => clearTimeout(t));
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [pathname]);

  return null;
}
