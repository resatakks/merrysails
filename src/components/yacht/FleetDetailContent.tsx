import Link from "next/link";
import type { CharterFleetItem } from "@/data/fleet";
import { getCharterFleetLocale } from "@/data/fleet";
import type { SiteLocale } from "@/i18n/config";
import { getContactChannel } from "@/lib/constants";
import FleetGallery from "./FleetGallery";
import FleetHeroImage from "./FleetHeroImage";

type DetailStrings = {
  breadcrumbHome: string;
  breadcrumbCharter: string;
  pricingHeading: string;
  pricingIntro: string;
  durationColumn: string;
  totalColumn: string;
  savingsColumn: string;
  galleryHeading: string;
  galleryExterior: string;
  galleryInterior: string;
  includedHeading: string;
  includedItems: string[];
  onRequestHeading: string;
  onRequestItems: string[];
  bestForHeading: string;
  bestForByTier: {
    boutique: string[];
    medium: string[];
    event: string[];
  };
  whyThisSize: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  reserveCta: string;
  quoteCta: string;
  backToFleet: string;
  capacity: string;
  capacityLabel: string;
  guests: string;
  duration: string;
  fromPrice: string;
  twoHourMin: string;
  taxIncluded: string;
  campaignLine: string;
  whatsappPrefill: string;
  reassurance: string[];
};

type Props = {
  boat: CharterFleetItem;
  locale: SiteLocale;
  strings: DetailStrings;
  reservationBasePath: string;
  yachtTourSlug: string;
  homeHref: string;
  charterHref: string;
};

function getTier(boat: CharterFleetItem): "boutique" | "medium" | "event" {
  if (!boat.bookable) return "event";
  if (boat.capacity.max <= 14) return "boutique";
  return "medium";
}

export default function FleetDetailContent({
  boat,
  locale,
  strings,
  reservationBasePath,
  yachtTourSlug,
  homeHref,
  charterHref,
}: Props) {
  const t = getCharterFleetLocale(boat, locale);
  const tier = getTier(boat);
  const bestForList = strings.bestForByTier[tier];
  const entryPrice = boat.priceByHours?.[boat.minHours] ?? null;
  const hourRows = boat.priceByHours
    ? Object.keys(boat.priceByHours)
        .map(Number)
        .sort((a, b) => a - b)
    : [];

  const reserveHref = `${reservationBasePath}?tour=${encodeURIComponent(
    yachtTourSlug,
  )}&packageName=${encodeURIComponent(`${t.label} — ${boat.minHours}h`)}&hours=${boat.minHours}&fleet=${boat.slug}#core-booking-planner`;

  // WhatsApp is the single customer contact channel for every locale incl. ru.
  const channel = getContactChannel(locale);
  const whatsappHref = `${channel.url}?text=${encodeURIComponent(
    strings.whatsappPrefill
      .replace("{label}", t.label)
      .replace("{capacity}", `${boat.capacity.min}-${boat.capacity.max}`),
  )}`;

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)] overflow-x-clip">
      <div className="container-main">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
        >
          <Link href={homeHref} className="hover:text-[var(--brand-primary)]">
            {strings.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href={charterHref} className="hover:text-[var(--brand-primary)]">
            {strings.breadcrumbCharter}
          </Link>
          <span>/</span>
          <span className="text-[var(--heading)] truncate">{t.label}</span>
        </nav>

        <header className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-8 mb-8">
          {/* Image first on mobile (order-1), right column on desktop */}
          <FleetHeroImage
            images={[...boat.exteriorImages, ...boat.interiorImages]}
            alt={`${t.label} — ${boat.altDescriptor}`}
            className="aspect-[4/3] w-full order-1 lg:order-2 lg:aspect-auto lg:min-h-[24rem]"
          />
          <div className="order-2 lg:order-1 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
              {strings.capacityLabel} · {boat.capacity.min}–{boat.capacity.max} {strings.guests}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] tracking-tight">
              {t.label}
            </h1>
            <p className="mt-2 text-base md:text-lg text-[var(--text-muted)]">{t.tagline}</p>
            {/* 2026-06-12: stat tiles were dead-click magnets (capacity 31,
                price 31). Wrapped in Link/anchor to feed taps into the same
                CTA destinations as the buttons below. */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {boat.bookable ? (
                <Link
                  href={reserveHref}
                  className="rounded-xl border border-[var(--line)] bg-white p-3 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-colors"
                  aria-label={`${strings.capacity}: ${boat.capacity.min}–${boat.capacity.max} ${strings.guests} — ${strings.reserveCta}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {strings.capacity}
                  </p>
                  <p className="mt-1 text-base font-bold text-[var(--heading)]">
                    {boat.capacity.min}–{boat.capacity.max} {strings.guests}
                  </p>
                </Link>
              ) : (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--line)] bg-white p-3 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-colors"
                  aria-label={`${strings.capacity}: ${boat.capacity.min}–${boat.capacity.max} ${strings.guests} — ${strings.quoteCta}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {strings.capacity}
                  </p>
                  <p className="mt-1 text-base font-bold text-[var(--heading)]">
                    {boat.capacity.min}–{boat.capacity.max} {strings.guests}
                  </p>
                </a>
              )}
              {boat.bookable ? (
                <Link
                  href={reserveHref}
                  className="rounded-xl border border-[var(--line)] bg-white p-3 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-colors"
                  aria-label={`${strings.fromPrice} ${entryPrice ? `€${entryPrice}` : ""} — ${strings.reserveCta}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {strings.fromPrice}
                  </p>
                  <p className="mt-1 text-base font-bold text-[var(--heading)]">
                    {entryPrice ? `€${entryPrice}` : "—"}
                  </p>
                </Link>
              ) : (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--line)] bg-white p-3 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-colors"
                  aria-label={`${strings.fromPrice} ${entryPrice ? `€${entryPrice}` : ""} — ${strings.quoteCta}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {strings.fromPrice}
                  </p>
                  <p className="mt-1 text-base font-bold text-[var(--heading)]">
                    {entryPrice ? `€${entryPrice}` : "—"}
                  </p>
                </a>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {boat.bookable ? (
                <Link
                  href={reserveHref}
                  style={{ color: "#ffffff" }}
                  className="rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold !text-white transition-opacity hover:opacity-90"
                >
                  {strings.reserveCta}
                </Link>
              ) : (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffffff" }}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold !text-white transition-opacity hover:opacity-90"
                >
                  {strings.quoteCta}
                </a>
              )}
              <Link
                href={charterHref}
                className="rounded-xl border border-[var(--brand-primary)] bg-white px-5 py-3 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                {strings.backToFleet}
              </Link>
            </div>
            {/* 2026-06-26: trust strip at the detail-page CTA (competitor
                research decision-moment pattern) — localized via fleet-detail
                strings so DE/FR/NL/TR users see it in their language too. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-[var(--text-muted)]">
              {strings.reassurance.map((line) => (
                <span key={line} className="inline-flex items-center gap-1">
                  <span aria-hidden className="font-bold text-emerald-600">✓</span> {line}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              {t.description}
            </p>
          </div>
        </header>

        {boat.priceByHours && (
          <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)]">
              {strings.pricingHeading}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              {strings.pricingIntro}
            </p>
            {/* 2026-06-12 (v2): Previous fix wrapped only the small Reserve pill
                — Clarity still logged 124+ dead clicks on row body cells (€720
                amount, "5 hours" label). Operators tap the row, not the pill.
                Rebuilt as a list of Link cards so the entire row is one tap
                target. Removed table semantics (no longer columnar). */}
            <ul className="mt-4 grid gap-2">
              {hourRows.map((h) => {
                const value = boat.priceByHours?.[h];
                const isDiscount = h >= boat.discountFromHours;
                const regular = (boat.hourlyEur ?? 0) * h;
                const saving = isDiscount && regular && value ? regular - value : 0;
                const tierHref = boat.bookable
                  ? `${reservationBasePath}?tour=${encodeURIComponent(
                      yachtTourSlug,
                    )}&packageName=${encodeURIComponent(`${t.label} — ${h}h`)}&hours=${h}&fleet=${boat.slug}#core-booking-planner`
                  : `${channel.url}?text=${encodeURIComponent(
                      `Hi! I'm interested in the ${t.label} — ${h} hour charter (€${value}). Could you share availability?`,
                    )}`;
                const isExternal = !boat.bookable;
                const ariaLabel = `${
                  boat.bookable ? strings.reserveCta : strings.quoteCta
                } — ${h} ${strings.duration} (€${value})`;
                const rowClass =
                  "group flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-white px-3 py-3 sm:px-4 transition-colors hover:bg-[var(--brand-primary)]/5 hover:border-[var(--brand-primary)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]";
                // 2026-06-26: the three price spans + the wide Reserve pill were
                // all `whitespace-nowrap`, so a single row overran 360–390px
                // viewports and pushed the page (and the fixed WhatsApp/Call
                // buttons) off-screen on real iOS. Left group now wraps; the
                // pill is shrink-0 with min-w-0 siblings so nothing overflows.
                const rowBody = (
                  <>
                    <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
                      <span className="font-semibold text-[var(--heading)]">
                        {h} {strings.duration}
                      </span>
                      <span className="font-semibold text-[var(--heading)]">
                        €{value}
                      </span>
                      {isDiscount ? (
                        <span className="font-semibold text-emerald-700 text-xs sm:text-sm">
                          −€{saving} ({boat.discountPercent}%)
                        </span>
                      ) : null}
                    </div>
                    <span
                      aria-hidden
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-opacity group-hover:opacity-90 ${
                        boat.bookable ? "bg-[var(--brand-primary)]" : "bg-emerald-600"
                      }`}
                      style={{ color: "#ffffff" }}
                    >
                      {boat.bookable ? strings.reserveCta : strings.quoteCta} →
                    </span>
                  </>
                );
                return (
                  <li key={h}>
                    {boat.bookable ? (
                      <Link
                        href={tierHref}
                        className={rowClass}
                        aria-label={ariaLabel}
                      >
                        {rowBody}
                      </Link>
                    ) : (
                      <a
                        href={tierHref}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={rowClass}
                        aria-label={ariaLabel}
                      >
                        {rowBody}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-[var(--text-muted)]">{strings.taxIncluded}</p>
          </section>
        )}

        {/* 2026-06-12: Clarity logged 124 dead clicks on "Included" list +
            62 on "On request" — users tap each ✓/+ row expecting to toggle
            extras. Lists stay informational (cursor-default removes pointer
            affordance) and each panel gets a real CTA at the bottom routing
            to reservation/WhatsApp so taps inside the panel land somewhere. */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col">
            <h2 className="text-base font-bold text-emerald-900">
              {strings.includedHeading}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-emerald-900 cursor-default">
              {strings.includedItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-emerald-200">
              {boat.bookable ? (
                <Link
                  href={reserveHref}
                  className="inline-flex items-center gap-1 text-sm font-bold text-emerald-900 hover:text-emerald-700"
                >
                  {strings.reserveCta} →
                </Link>
              ) : (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-emerald-900 hover:text-emerald-700"
                >
                  {strings.quoteCta} →
                </a>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex flex-col">
            <h2 className="text-base font-bold text-amber-900">
              {strings.onRequestHeading}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-amber-900 cursor-default">
              {strings.onRequestItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-amber-900 hover:text-amber-700"
              >
                {strings.quoteCta} →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
            {strings.bestForHeading}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] mb-4">
            {strings.whyThisSize}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm text-[var(--text-muted)]">
            {bestForList.map((item) => (
              <li key={item} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
            {strings.galleryHeading}
          </h2>
          <FleetGallery
            exteriorImages={boat.exteriorImages}
            interiorImages={boat.interiorImages}
            altPrefix={t.label}
            altDescriptor={boat.altDescriptor}
            exteriorLabel={strings.galleryExterior}
            interiorLabel={strings.galleryInterior}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{strings.faqHeading}</h2>
          <div className="space-y-3">
            {strings.faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-[var(--line)] p-4"
              >
                <summary className="cursor-pointer font-semibold text-[var(--heading)]">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
            {strings.campaignLine}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)]">
                {t.label}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {strings.twoHourMin}
                {entryPrice && (
                  <>
                    {" · "}
                    <span className="font-semibold text-[var(--heading)]">€{entryPrice}</span>{" "}
                    / {boat.minHours} {strings.duration}
                  </>
                )}
              </p>
            </div>
            {boat.bookable ? (
              <Link
                href={reserveHref}
                style={{ color: "#ffffff" }}
                className="rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-sm font-bold !text-white text-center transition-opacity hover:opacity-90"
              >
                {strings.reserveCta}
              </Link>
            ) : (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold !text-white text-center transition-opacity hover:opacity-90"
              >
                {strings.quoteCta}
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
