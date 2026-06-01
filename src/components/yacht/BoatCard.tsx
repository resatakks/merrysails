"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CharterFleetItem } from "@/data/fleet";
import type { SiteLocale } from "@/i18n/config";
import { getCharterFleetLocale } from "@/data/fleet";
import { getContactChannel } from "@/lib/constants";
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
  const [imageIdx, setImageIdx] = useState(0);
  const [tab, setTab] = useState<"exterior" | "interior">("exterior");
  const [hours, setHours] = useState<number>(boat.minHours);

  const visibleImages = tab === "exterior" ? boat.exteriorImages : boat.interiorImages;
  // Auto-advance through the visible gallery every 2 s. Manual arrow clicks
  // still take effect immediately because all images are stacked with opacity
  // (see render below) — the click is an instant local opacity toggle, not a
  // network fetch.
  useEffect(() => {
    if (visibleImages.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setImageIdx((i) => (i + 1) % visibleImages.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [visibleImages.length, tab]);

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
  // Locale-aware: /ru visitors are routed to Telegram (WhatsApp blocked in
  // Russia, Feb 2026). Telegram t.me ignores the ?text= prefill silently — we
  // accept that and still open a chat with the right account.
  const channel = getContactChannel(locale);
  const whatsappHref =
    channel.icon === "telegram"
      ? channel.url
      : `${channel.url}?text=${encodeURIComponent(quotePrefill)}`;

  const detailHref = `${fleetDetailBasePath}/${boat.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--brand-primary)]/40">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-alt)]">
        <Link
          href={detailHref}
          className="absolute inset-0 z-0 block"
          aria-label={`${t.label} — ${strings.viewDetails}`}
        >
          {/* All visible images render simultaneously as a stack — the active
              one is opacity-100, others opacity-0. This makes the arrow click
              an instant opacity toggle instead of a fresh network fetch (root
              cause of the 60 dead-clicks reported by Clarity on this page:
              users clicked ›, saw nothing for ~1 s while the next image loaded,
              clicked again — Clarity recorded the wait period as a dead click).

              The first image gets `priority` so the LCP element resolves fast;
              the rest load eagerly in the background. Total payload is the
              same — we just front-load it. */}
          {visibleImages.map((src, i) => {
            const isActive = i === imageIdx % visibleImages.length;
            return (
              <Image
                key={src}
                src={src}
                alt={`${t.label} — ${boat.altDescriptor}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-300 ${
                  isActive
                    ? "opacity-100 group-hover:scale-105 transition-transform duration-500"
                    : "opacity-0"
                }`}
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                quality={75}
              />
            );
          })}
        </Link>
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-base font-semibold leading-none text-white backdrop-blur-sm transition-colors hover:bg-black/75 active:bg-black/85 md:h-9 md:w-9 md:text-sm"
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-base font-semibold leading-none text-white backdrop-blur-sm transition-colors hover:bg-black/75 active:bg-black/85 md:h-9 md:w-9 md:text-sm"
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
