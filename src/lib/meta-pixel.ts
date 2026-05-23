/**
 * Meta Pixel — client-side fbq wrapper for MerrySails.
 *
 * Pairs with src/lib/meta-capi.ts: every event we fire client-side ALSO posts to
 * /api/meta-capi with the same eventID, so Meta dedups Pixel + CAPI = 1 conversion.
 *
 * Pixel script tag is injected by src/app/layout.tsx (afterInteractive).
 * If NEXT_PUBLIC_META_PIXEL_ID is missing, the layout skips the inject and these
 * helpers no-op silently — unconfigured deploys never break.
 *
 * Imported pattern from kingsworldtransfer/src/lib/meta-pixel.ts.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
    };
    _fbq?: unknown;
  }
}

type PixelEventName =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "Lead"
  | "InitiateCheckout"
  | "AddToCart"
  | "Contact"
  | "Schedule"
  | "SubmitApplication"
  | "Purchase";

interface PixelEventParams {
  currency?: string;
  value?: number;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  predicted_ltv?: number;
  status?: string;
  search_string?: string;
  order_id?: string;
}

/** Get _fbp / _fbc from cookies (Meta browser ID + click ID). Used in CAPI for matching. */
export function getFbpFbc(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const out: { fbp?: string; fbc?: string } = {};
  const m1 = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/);
  if (m1) out.fbp = decodeURIComponent(m1[1]);
  const m2 = document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/);
  if (m2) out.fbc = decodeURIComponent(m2[1]);
  // If no _fbc cookie but URL has fbclid, synthesize one — this happens when a
  // user lands from a Meta ad before the Pixel has had a chance to drop _fbc.
  if (!out.fbc && typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) {
      out.fbc = `fb.1.${Date.now()}.${fbclid}`;
    }
  }
  return out;
}

function genEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Fire a Pixel event AND mirror it server-side via /api/meta-capi for dedup.
 * Returns the eventID (caller can stash it for later reconciliation).
 *
 * userData fields are sent ONLY to the server endpoint (hashed there before
 * hitting Graph API). Pixel client-side gets the non-PII payload only.
 */
export function trackPixel(
  eventName: PixelEventName,
  params: PixelEventParams = {},
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
  },
): string {
  const eventId = genEventId();

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", eventName, params, { eventID: eventId });
    } catch {
      /* fbq not initialized yet — server-side will still fire */
    }
  }

  // Mirror to CAPI server-side (non-blocking, fire-and-forget).
  if (typeof window !== "undefined") {
    const { fbp, fbc } = getFbpFbc();
    const payload = {
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      params,
      userData: { ...userData, fbp, fbc },
    };
    try {
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        /* ignore network errors — Pixel already fired */
      });
    } catch {
      /* ignore */
    }
  }

  return eventId;
}

/** Fired automatically by the Pixel snippet on init; exposed for SPA route changes. */
export function trackPixelPageView(): string {
  return trackPixel("PageView");
}
