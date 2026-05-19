import type { Package } from "@/data/tours";

type Strings = {
  eyebrow: string; // short tag — "Midweek deal"
  headline: string; // "Midweek sailings from €{fromPrice} per ticket"
  intro: string; // one-line explanation
  weekdayNames: { Mon: string; Tue: string; Thu: string };
  saveSuffix: string; // "save up to €{maxSave}"
  faqQuestion: string;
  faqAnswer: string;
};

type Props = {
  packages: Package[];
  productName: string;
  strings: Strings;
};

function maxSavings(packages: Package[]): number {
  let max = 0;
  for (const p of packages) {
    if (p.weekdayDiscount) {
      const diff = p.price - p.weekdayDiscount.discountedPrice;
      if (diff > max) max = diff;
    }
  }
  return max;
}

export default function WeekdayDiscountBanner({ packages, productName, strings }: Props) {
  const discounted = packages.filter((p) => p.weekdayDiscount);
  if (discounted.length === 0) return null;
  const maxSave = maxSavings(packages);
  const fromPrice = Math.min(
    ...discounted.map((p) => p.weekdayDiscount!.discountedPrice)
  );
  const fill = (s: string) =>
    s
      .replace("{maxSave}", String(maxSave))
      .replace("{fromPrice}", String(fromPrice))
      .replace("{product}", productName);

  return (
    <section
      id="weekday-discount"
      aria-labelledby="weekday-discount-heading"
      className="mb-6 flex flex-col gap-3 rounded-xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-teal-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white"
          aria-hidden
        >
          %
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              {strings.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1">
              {[
                strings.weekdayNames.Mon,
                strings.weekdayNames.Tue,
                strings.weekdayNames.Thu,
              ].map((d) => (
                <span
                  key={d}
                  className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 ring-1 ring-emerald-200"
                >
                  {d}
                </span>
              ))}
            </span>
          </div>
          <h2
            id="weekday-discount-heading"
            className="mt-1 text-sm font-bold leading-snug text-emerald-900"
          >
            {fill(strings.headline)}
          </h2>
          <p className="mt-0.5 text-xs leading-snug text-emerald-700">
            {fill(strings.intro)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-stretch border-t border-emerald-200/70 pt-2 sm:flex-col sm:items-end sm:self-center sm:border-t-0 sm:pt-0">
        <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-base font-bold text-white">
          €{fromPrice}
        </span>
        <span className="text-[11px] font-medium text-emerald-700">
          {fill(strings.saveSuffix)}
        </span>
      </div>
    </section>
  );
}

export type { Strings as WeekdayDiscountStrings };
