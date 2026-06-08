/**
 * WhatsApp Click v2 — centralized dataLayer event for Clarity attribution.
 *
 * Background: Clarity dashboards show 0 whatsapp clicks while wa.me anchors
 * are demonstrably clicked. Root cause is that the existing trackWhatsAppClick
 * only fires from anchors that opt in via onClick — most page-level `<a
 * href="https://wa.me/...">` tags ship without an onClick at all.
 *
 * This module exposes:
 *  - `nowEpoch()`   — testable timestamp source (no inline Date in the push).
 *  - `pushWhatsAppClickV2()` — single dataLayer.push for the v2 event.
 *  - `installGlobalWhatsAppListener()` — document-level click listener that
 *    catches EVERY `a[href*="wa.me"]` click, including legacy raw anchors
 *    that never wired up tracking. Mounted once from SiteChrome.
 *
 * Event shape (matches the spec passed by ops):
 *   event:           "whatsapp_click_v2"
 *   whatsapp_source: short page-key, e.g. "home-hero", "sticky-cta"
 *   whatsapp_label:  human button label, e.g. "Chat on WhatsApp"
 *   page_path:       window.location.pathname
 *   ts:              epoch ms (from nowEpoch())
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    __waClickV2Installed?: boolean;
  }
}

/**
 * Epoch-ms helper so consumers never inline `Date.now()` at the call site.
 * Exported separately so tests can mock it.
 */
export function nowEpoch(): number {
  return Date.now();
}

export interface WhatsAppClickV2Payload {
  whatsapp_source: string;
  whatsapp_label: string;
  page_path?: string;
}

/**
 * Push the v2 event to dataLayer. SSR-safe (no-op on server).
 */
export function pushWhatsAppClickV2(payload: WhatsAppClickV2Payload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click_v2",
    whatsapp_source: payload.whatsapp_source,
    whatsapp_label: payload.whatsapp_label,
    page_path: payload.page_path ?? window.location.pathname,
    ts: nowEpoch(),
  });
}

/**
 * Infer a short source key from the clicked anchor: data-wa-source > nearest
 * `[data-wa-source]` ancestor > heuristic from pathname.
 */
function inferSource(anchor: HTMLAnchorElement): string {
  const explicit = anchor.getAttribute("data-wa-source");
  if (explicit) return explicit;
  const ancestor = anchor.closest<HTMLElement>("[data-wa-source]");
  if (ancestor?.dataset.waSource) return ancestor.dataset.waSource;

  const path = window.location.pathname;
  if (path === "/" || path.match(/^\/[a-z]{2}\/?$/)) return "home";
  if (path.includes("/contact")) return "contact-page";
  if (path.includes("/reservation")) return "reservation-page";
  if (path.includes("/blog/")) return "blog-post";
  if (path.includes("/cruises/")) return "cruise-detail";
  return "page-link";
}

/**
 * Infer the human-readable label from the anchor: aria-label > visible text >
 * fallback "WhatsApp".
 */
function inferLabel(anchor: HTMLAnchorElement): string {
  const aria = anchor.getAttribute("aria-label");
  if (aria) return aria;
  const text = anchor.textContent?.trim();
  if (text) return text.slice(0, 80);
  return "WhatsApp";
}

/**
 * Document-level click listener. Idempotent — installs at most once per page
 * load, guarded by `window.__waClickV2Installed`.
 */
export function installGlobalWhatsAppListener(): void {
  if (typeof window === "undefined") return;
  if (window.__waClickV2Installed) return;
  window.__waClickV2Installed = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!anchor) return;
      pushWhatsAppClickV2({
        whatsapp_source: inferSource(anchor),
        whatsapp_label: inferLabel(anchor),
      });
    },
    { capture: true }
  );
}
