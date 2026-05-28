"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CharterFleetItem } from "@/data/fleet";
import type { SiteLocale } from "@/i18n/config";
import { getCharterFleetLocale } from "@/data/fleet";
import { WHATSAPP_URL } from "@/lib/constants";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";

export type BoatCardStrings = {
  capacity: string;
  guests: string;
  hours: string;
  hoursShort: string;
  perHourFrom: string;
  totalLabel: string;
  saveLabel: string;
  reserve: string;
  requestQuote: string;
  viewDetails: string;
  popularBadge: string;
  eventBadge: string;
  boutiqueBadge: string;
  megaBadge: string;
  discountBadge: string;
  exteriorTab: string;
  interiorTab: string;
  whatsappPrefill: string;
  minNote: string;
};

type Props = {
  boat: CharterFleetItem;
  locale: SiteLocale;
  strings: BoatCardStrings;
  reservationBasePath: string; // "/reservation" or "/{locale}/reservation"
  yachtTourSlug: string; // "yacht-charter-in-istanbul"
  fleetDetailBasePath: string; // "/yacht-charter-istanbul" or "/{locale}/yacht-charter-istanbul"
};

const BADGE_CLASSES: Record<NonNullable<CharterFleetItem["badges"]>[number], string> = {
  popular: "bg-amber-500 text-white",
  discount: "bg-emerald-500 text-white",
  event: "bg-indigo-600 text-white",
  boutique: "bg-rose-500 text-white",
  mega: "bg-slate-800 text-white",
};

function badgeLabel(
  key: NonNullable<CharterFleetItem["badges"]>[number],
  s: BoatCardStrings,
): string {
  switch (key) {
    case "popular":
      return s.popularBadge;
    case "event":
      return s.eventBadge;
    case "boutique":
      return s.boutiqueBadge;
    case "mega":
      return s.megaBadge;
    case "discount":
      return s.discountBadge;
  }
}

export default function BoatCard({
  boat,
  locale,
  strings,
  reservationBasePath,
  yachtTourSlug,
  fleetDetailBasePath,
}: Props) {
  const t = getCharterFleetLocale(boat, locale);
  const allImages = useMemo(
    () => [...boat.exteriorImages, ...boat.interiorImages],
    [boat],
  );
  const [imageIdx, setImageIdx] = useState(0);
  const [tab, setTab] = useState<"exterior" | "interior">("exterior");
  const [hours, setHours] = useState<number>(boat.minHours);

  const visibleImages = tab === "exterior" ? boat.exteriorImages : boat.interiorImages;
  const currentImage = visibleImages[imageIdx % visibleImages.length] ?? allImages[0];
  // Auto-advance through the visible gallery every 2 s. Pauses on hover via
  // the parent <article>'s :hover state by checking a ref-less hover signal:
  // we keep it simple and always advance — manual clicks still take effect
  // immediately because setImageIdx ignores the interval's stale closure.
  useEffect(() => {
    if (visibleImages.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setImageIdx((i) => (i + 1) % visibleImages.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [visibleImages.length, tab]);
  // Preload the next image so the click-to-advance response is instant
  // instead of waiting on a cold fetch (the user reported a ~1 s lag).
  const nextImage = visibleImages[(imageIdx + 1) % visibleImages.length];

  const hourOptions = useMemo(() => {
    if (!boat.priceByHours) return [];
    return Object.keys(boat.priceByHours)
      .map(Number)
      .sort((a, b) => a - b);
  }, [boat]);

  const total = boat.priceByHours?.[hours] ?? null;
  const discountActive = hours >= boat.discountFromHours;

  const reserveHref = boat.bookable
    ? `${reservationBasePath}?tour=${encodeURIComponent(yachtTourSlug)}&packageName=${encodeURIComponent(
        `${t.label} — ${hours}h`,
      )}&hours=${hours}&fleet=${boat.slug}#core-booking-planner`
    : null;

  const quotePrefill = strings.whatsappPrefill
    .replace("{label}", t.label)
    .replace("{capacity}", `${boat.capacity.min}-${boat.capacity.max}`);
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(quotePrefill)}`;

  const detailHref = `${fleetDetailBasePath}/${boat.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--brand-primary)]/40">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-alt)]">
        <Link
          href={detailHref}
          className="absolute inset-0 z-0 block"
          aria-label={`${t.label} — ${strings.viewDetails}`}
        >
          {currentImage && (
            <Image
              src={currentImage}
              alt={`${t.label} — ${boat.altDescriptor}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
              quality={80}
            />
          )}
        </Link>
        {/* Hidden preload for the next slide so manual clicks feel instant */}
        {nextImage && nextImage !== currentImage && (
          <link
            rel="preload"
            as="image"
            href={nextImage}
            // @ts-expect-error — preload outside <head> in client components
            // is intentional here; Next.js dev mode warns but it works.
            fetchpriority="low"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[var(--brand-primary)] shadow-md backdrop-blur-sm">
            {strings.viewDetails} →
          </span>
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {boat.badges?.map((b) => (
            <span
              key={b}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${BADGE_CLASSES[b]}`}
            >
              {badgeLabel(b, strings)}
            </span>
          ))}
          {boat.bookable && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {strings.discountBadge}
            </span>
          )}
        </div>

        {visibleImages.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-30 flex items-center justify-between px-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImageIdx((i) => (i - 1 + visibleImages.length) % visibleImages.length);
              }}
              className="rounded-full bg-black/50 px-2.5 py-1 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              ‹
            </button>
            <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {(imageIdx % visibleImages.length) + 1} / {visibleImages.length}
            </span>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImageIdx((i) => (i + 1) % visibleImages.length);
              }}
              className="rounded-full bg-black/50 px-2.5 py-1 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
          <button
            type="button"
            onClick={() => {
              setTab("exterior");
              setImageIdx(0);
            }}
            className={`rounded-full px-3 py-1 transition-colors ${
              tab === "exterior"
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-[var(--surface-alt)] text-[var(--text-muted)] hover:bg-[var(--line)]"
            }`}
          >
            {strings.exteriorTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("interior");
              setImageIdx(0);
            }}
            className={`rounded-full px-3 py-1 transition-colors ${
              tab === "interior"
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-[var(--surface-alt)] text-[var(--text-muted)] hover:bg-[var(--line)]"
            }`}
          >
            {strings.interiorTab}
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold leading-tight text-[var(--heading)]">{t.label}</h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{t.tagline}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-3 text-xs">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {strings.capacity}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold text-[var(--heading)]">
              {boat.capacity.min}–{boat.capacity.max} {strings.guests}
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {strings.perHourFrom}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold text-[var(--heading)]">
              {boat.priceByHours
                ? `€${boat.priceByHours[boat.minHours]}`
                : "—"}
            </dd>
          </div>
        </dl>

        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{t.description}</p>

        {boat.bookable && boat.priceByHours ? (
          <div className="rounded-xl border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              {strings.hours}
            </label>
            <div className="mt-2 flex items-center justify-between gap-3">
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold text-[var(--heading)] focus:border-[var(--brand-primary)] focus:outline-none"
              >
                {hourOptions.map((h) => (
                  <option key={h} value={h}>
                    {h} {strings.hoursShort}
                    {h >= boat.discountFromHours ? ` (−${boat.discountPercent}%)` : ""}
                  </option>
                ))}
              </select>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {strings.totalLabel}
                </p>
                <p className="text-2xl font-bold text-[var(--heading)]">€{total}</p>
                {discountActive && (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                    {strings.saveLabel} −{boat.discountPercent}%
                  </p>
                )}
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[var(--text-muted)]">{strings.minNote}</p>
          </div>
        ) : null}

        <div className="mt-auto">
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href={`${fleetDetailBasePath}/${boat.slug}`}
              className="block w-full rounded-xl border-2 border-[var(--brand-primary)] bg-white py-3 text-center text-sm font-bold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
            >
              {strings.viewDetails}
            </Link>
            {boat.bookable && reserveHref ? (
              <Link
                href={reserveHref}
                style={{ color: "#ffffff" }}
                className="block w-full rounded-xl bg-[var(--brand-primary)] py-3 text-center text-sm font-bold !text-white transition-colors hover:bg-[var(--brand-primary-hover,var(--brand-primary))] hover:opacity-95"
              >
                {strings.reserve}
              </Link>
            ) : (
              <TrackedContactLink
                href={whatsappHref}
                kind="whatsapp"
                label="BoatCard_whatsapp"
                location="BoatCard"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
                className="block w-full rounded-xl bg-emerald-600 py-3 text-center text-sm font-bold !text-white transition-colors hover:bg-emerald-700"
              >
                {strings.requestQuote}
              </TrackedContactLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
