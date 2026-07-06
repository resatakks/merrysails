"use client";

import { useEffect } from "react";
import { trackReviewEmailClick } from "@/lib/analytics";

type LinkType = "whatsapp_discount" | "whatsapp_contact" | "call";

const LINK_TYPE_TO_EVENT: Record<LinkType, Parameters<typeof trackReviewEmailClick>[0]> = {
  whatsapp_discount: "whatsapp_discount",
  whatsapp_contact: "whatsapp_contact",
  call: "call",
};

/**
 * Client-side half of the /track/review-click interstitial. Fires the
 * review_email_click analytics event, then redirects to `destinationUrl`
 * (already resolved server-side from hardcoded brand constants — this
 * component never sees or constructs the destination from query params).
 *
 * The visible "Tap here to continue" link is rendered by the SERVER
 * component (page.tsx) in the initial HTML, not here — so it is present and
 * tappable even if this script never runs (JS blocked/slow/failed).
 */
export default function ReviewClickRedirect({
  linkType,
  destinationUrl,
}: {
  linkType: LinkType;
  destinationUrl: string;
}) {
  useEffect(() => {
    try {
      trackReviewEmailClick(LINK_TYPE_TO_EVENT[linkType]);
    } catch {
      // Tracking must never block the redirect.
    }
    window.location.replace(destinationUrl);
  }, [linkType, destinationUrl]);

  return null;
}
