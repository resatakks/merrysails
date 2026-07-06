import type { Metadata } from "next";
import {
  callTelUrl,
  contactWhatsappUrl,
  discountWhatsappUrlFor,
} from "@/lib/review-email-constants";
import ReviewClickRedirect from "./ReviewClickRedirect";

/**
 * /track/review-click — tracked interstitial for the post-trip-review
 * email's WhatsApp/Call buttons. Those buttons don't load a webpage
 * themselves (wa.me / tel: hand off to another app), so this page is the
 * only way to record that a recipient clicked one before it redirects them
 * on to the real destination.
 *
 * Deliberately OUTSIDE app/[locale]/ so it never enters this project's
 * locale routing — see src/i18n/config.ts (ACTIVE_LOCALES / LOCALIZED_ROUTES).
 * src/proxy.ts (this project's middleware-equivalent, Next 16 renamed
 * middleware.ts → proxy.ts) has NO locale-rewrite/redirect logic at all — it
 * only does bot-detection logging + a server-action-probe guard — so this
 * route passes through it untouched regardless of matcher scope.
 *
 * noindex/nofollow: this is a transient utility redirect, never a page a
 * search engine or AI crawler should surface.
 *
 * SECURITY: the destination is ALWAYS built from this brand's own hardcoded
 * constants (review-email-constants.ts) keyed off the `to` param's 3 known
 * values. Any other `to` value — or a missing one — falls back to the safe
 * contact-row wa.me link. The raw query string is NEVER used as a URL, so
 * this page can never become an open redirect.
 */
export const metadata: Metadata = {
  title: "Continuing…",
  description: "Transient redirect page for post-trip-review email links. Not a content page — noindex.",
  robots: {
    index: false,
    follow: false,
  },
};

type ToParam = "discount" | "contact" | "call";

function isKnownTo(value: string | undefined): value is ToParam {
  return value === "discount" || value === "contact" || value === "call";
}

function resolveDestination(
  to: string | undefined,
  locale: string | undefined
): { destinationUrl: string; linkType: "whatsapp_discount" | "whatsapp_contact" | "call" } {
  const knownTo = isKnownTo(to) ? to : "contact"; // unknown/absent → safe default

  if (knownTo === "discount") {
    return {
      destinationUrl: discountWhatsappUrlFor(locale),
      linkType: "whatsapp_discount",
    };
  }
  if (knownTo === "call") {
    return { destinationUrl: callTelUrl, linkType: "call" };
  }
  return { destinationUrl: contactWhatsappUrl, linkType: "whatsapp_contact" };
}

export default async function ReviewClickPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string; locale?: string }>;
}) {
  const params = await searchParams;
  const { destinationUrl, linkType } = resolveDestination(params.to, params.locale);

  // NOTE: no <html>/<body> here — this route sits under app/layout.tsx (the
  // project's one root layout, which already renders <html>/<body> and loads
  // gtag.js), so this page only needs to render its own content.
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
      }}
    >
      <div style={{ textAlign: "center", padding: "24px" }}>
        <h1 style={{ color: "#94a3b8", fontSize: 14, fontWeight: 400, margin: "0 0 16px" }}>
          Redirecting you now…
        </h1>
        {/* Visible, immediately-tappable fallback — rendered server-side in
            the initial HTML, so it works even if JS is slow/blocked/fails. */}
        <a
          href={destinationUrl}
          style={{
            display: "inline-block",
            background: "#25D366",
            color: "#ffffff",
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Tap here to continue
        </a>
        <ReviewClickRedirect linkType={linkType} destinationUrl={destinationUrl} />
      </div>
    </div>
  );
}
