import { getCharterFleet, getCharterFleetLocale } from "@/data/fleet";
import type { SiteLocale } from "@/i18n/config";
import BoatCard, { type BoatCardStrings } from "./BoatCard";

type FleetShowcaseStrings = BoatCardStrings & {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  pricingTableHeading: string;
  pricingTableIntro: string;
  fleetColumn: string;
  capacityColumn: string;
  hourColumnByHour: Record<number, string>;
  quoteLabel: string;
  includedHeading: string;
  includedItems: string[];
  onRequestHeading: string;
  onRequestItems: string[];
  onRequestNote: string;
};

type Props = {
  locale: SiteLocale;
  strings: FleetShowcaseStrings;
  reservationBasePath: string;
  yachtTourSlug: string;
  fleetDetailBasePath: string;
};

export default function FleetShowcase({
  locale,
  strings,
  reservationBasePath,
  yachtTourSlug,
  fleetDetailBasePath,
}: Props) {
  const fleet = getCharterFleet();
  const hourColumns = [2, 3, 4, 5, 6, 7, 8];

  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-4 md:mt-8 md:p-7"
    >
      {/* Compact eyebrow + section H2 — single line on desktop, two lines on mobile */}
      <header className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2
          id="fleet-heading"
          className="text-lg font-bold leading-tight text-[var(--heading)] md:text-xl"
        >
          {strings.sectionTitle}
        </h2>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
          {strings.sectionEyebrow}
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {fleet.map((boat) => (
          <BoatCard
            key={boat.slug}
            boat={boat}
            locale={locale}
            strings={strings}
            reservationBasePath={reservationBasePath}
            yachtTourSlug={yachtTourSlug}
            fleetDetailBasePath={fleetDetailBasePath}
          />
        ))}
      </div>

      {/* Section intro paragraph below cards — preserves SEO content but doesn't push cards below fold */}
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
        {strings.sectionIntro}
      </p>

      {/* Static pricing table — fully indexable, AI-citation-friendly */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-[var(--heading)]">
          {strings.pricingTableHeading}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
          {strings.pricingTableIntro}
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                <th className="sticky left-0 z-10 bg-[var(--surface-alt)] px-4 py-3 font-semibold text-[var(--heading)]">
                  {strings.fleetColumn}
                </th>
                <th className="px-3 py-3 text-center font-semibold text-[var(--heading)]">
                  {strings.capacityColumn}
                </th>
                {hourColumns.map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-center font-semibold text-[var(--heading)]"
                  >
                    {strings.hourColumnByHour[h]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fleet.map((boat) => {
                const t = getCharterFleetLocale(boat, locale);
                return (
                  <tr
                    key={boat.slug}
                    className="border-t border-[var(--line)] hover:bg-[var(--surface-alt)]/40"
                  >
                    <td className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-[var(--heading)]">
                      {t.label}
                    </td>
                    <td className="px-3 py-3 text-center text-[var(--text-muted)]">
                      {boat.capacity.min}–{boat.capacity.max}
                    </td>
                    {hourColumns.map((h) => {
                      const value = boat.priceByHours?.[h];
                      const discount = h >= boat.discountFromHours && boat.priceByHours;
                      return (
                        <td
                          key={h}
                          className={`px-3 py-3 text-center ${
                            discount
                              ? "font-semibold text-emerald-700"
                              : "text-[var(--heading)]"
                          }`}
                        >
                          {value != null ? `€${value}` : strings.quoteLabel}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-base font-bold text-emerald-900">{strings.includedHeading}</h3>
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
          <h3 className="text-base font-bold text-amber-900">{strings.onRequestHeading}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-amber-900">
            {strings.onRequestItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-amber-800">{strings.onRequestNote}</p>
        </div>
      </div>
    </section>
  );
}
