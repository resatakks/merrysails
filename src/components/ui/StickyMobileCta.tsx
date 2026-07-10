"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getContactChannel } from "@/lib/constants";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import type { SiteLocale } from "@/i18n/config";

/**
 * Mobile-only sticky bottom CTA bar.
 *
 * Why this exists (2026-06-01, Clarity diagnosis):
 *   Cruise/yacht entry pages have 90% bounce + 12-25% scroll on mobile.
 *   The Reserve CTA lives 2-3 scrolls below the fold. Most mobile visitors
 *   never see it. A persistent bottom bar means the booking intent is
 *   answerable at any scroll depth without thumb-stretching.
 *
 * Behavior:
 *   - Hidden on desktop (md:hidden)
 *   - Appears after user scrolls 200px (avoids covering hero CTA on initial view)
 *   - Two-action: "Reserve from €X" left (primary), WhatsApp icon right
 *   - safe-area-inset-bottom padding for iOS notch
 *
 * Variants:
 *   - tour-specific: links to /reservation?tour=<slug>#core-booking-planner
 *   - generic: when no tour selected, links to /reservation hub
 */
type Props = {
  reserveHref: string;
  reserveLabel: string; // e.g. "Reserve from €30"
  locale?: SiteLocale;
  whatsappLocation?: string; // for Clarity / GA4 tracking
  whatsappPrefill?: string; // pre-fill text e.g. "Hi, I'm interested in the sunset cruise — what dates are available?"
};

export default function StickyMobileCta({
  reserveHref,
  reserveLabel,
  locale = "en",
  whatsappLocation = "sticky_mobile_cta",
  whatsappPrefill,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after 200 px scroll — past the hero so we don't crowd the top CTA.
      setVisible(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const channel = getContactChannel(locale);
  const whatsappHref = whatsappPrefill
    ? `${channel.url}?text=${encodeURIComponent(whatsappPrefill)}`
    : channel.url;

  return (
    <div
      role="region"
      aria-label="Quick booking actions"
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-[640px] border-t border-[var(--line)] bg-white shadow-[0_-8px_24px_rgba(11,21,58,0.10)]">
        <div className="flex items-center gap-2 p-2">
          <Link
            href={reserveHref}
            translate="no"
            className="btn-cta flex-1 !justify-center !rounded-xl !py-3 !text-sm !font-bold"
            data-track="sticky_cta_reserve"
          >
            {reserveLabel}
          </Link>
          <TrackedContactLink
            href={whatsappHref}
            kind="whatsapp"
            label="sticky_mobile_whatsapp"
            location={whatsappLocation}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
          >
            <MessageCircle className="h-5 w-5" />
          </TrackedContactLink>
        </div>
      </div>
    </div>
  );
}
