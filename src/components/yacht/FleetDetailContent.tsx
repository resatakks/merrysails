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

  // Locale-aware: /ru → Telegram (WhatsApp blocked in Russia, Feb 2026).
  // Telegram t.me silently drops the prefill query.
  const channel = getContactChannel(locale);
  const whatsappHref =
    channel.icon === "telegram"
      ? channel.url
      : `${channel.url}?text=${encodeURIComponent(
          strings.whatsappPrefill
            .replace("{label}", t.label)
            .replace("{capacity}", `${boat.capacity.min}-${boat.capacity.max}`),
        )}`;

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
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
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--line)] bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {strings.capacity}
                </p>
                <p className="mt-1 text-base font-bold text-[var(--heading)]">
                  {boat.capacity.min}–{boat.capacity.max} {strings.guests}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {strings.fromPrice}
                </p>
                <p className="mt-1 text-base font-bold text-[var(--heading)]">
                  {entryPrice ? `€${entryPrice}` : "—"}
                </p>
              </div>
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
            {/* 2026-06-12: Clarity logged 124 dead clicks on these pricing tiles
                across yacht detail pages — operators tap each row expecting it
                to open the reservation flow pre-filled with that duration. Now
                every row is a Link to /reservation with tour+package+hours
                params (bookable boats) or WhatsApp deep-link (non-bookable). */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--line)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[var(--surface-alt)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                      {strings.durationColumn}
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                      {strings.totalColumn}
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                      {strings.savingsColumn}
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                      <span className="sr-only">{strings.reserveCta}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hourRows.map((h) => {
                    const value = boat.priceByHours?.[h];
                    const isDiscount = h >= boat.discountFromHours;
                    const regular = (boat.hourlyEur ?? 0) * h;
                    const saving = isDiscount && regular && value ? regular - value : 0;
                    const tierHref = boat.bookable
                      ? `${reservationBasePath}?tour=${encodeURIComponent(
                          yachtTourSlug,
                        )}&packageName=${encodeURIComponent(`${t.label} — ${h}h`)}&hours=${h}&fleet=${boat.slug}#core-booking-planner`
                      : channel.icon === "telegram"
                      ? channel.url
                      : `${channel.url}?text=${encodeURIComponent(
                          `Hi! I'm interested in the ${t.label} — ${h} hour charter (€${value}). Could you share availability?`,
                        )}`;
                    const isExternal = !boat.bookable && channel.icon !== "telegram";
                    return (
                      <tr
                        key={h}
                        className="border-t border-[var(--line)] transition-colors hover:bg-[var(--brand-primary)]/5"
                      >
                        <td className="px-4 py-3 font-semibold text-[var(--heading)]">
                          {h} {strings.duration}
                        </td>
                        <td className="px-4 py-3 font-semibold text-[var(--heading)]">
                          €{value}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {isDiscount ? (
                            <span className="font-semibold text-emerald-700">
                              −€{saving} ({boat.discountPercent}%)
                            </span>
                          ) : (
                            <span className="text-[var(--text-muted)]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {boat.bookable ? (
                            <Link
                              href={tierHref}
                              className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-xs font-bold !text-white transition-opacity hover:opacity-90"
                              style={{ color: "#ffffff" }}
                              aria-label={`${strings.reserveCta} — ${h} ${strings.duration} (€${value})`}
                            >
                              {strings.reserveCta}
                            </Link>
                          ) : (
                            <a
                              href={tierHref}
                              {...(isExternal
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold !text-white transition-opacity hover:opacity-90"
                              style={{ color: "#ffffff" }}
                              aria-label={`${strings.quoteCta} — ${h} ${strings.duration} (€${value})`}
                            >
                              {strings.quoteCta}
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">{strings.taxIncluded}</p>
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-base font-bold text-emerald-900">
              {strings.includedHeading}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-emerald-900">
              {strings.includedItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-base font-bold text-amber-900">
              {strings.onRequestHeading}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-amber-900">
              {strings.onRequestItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
