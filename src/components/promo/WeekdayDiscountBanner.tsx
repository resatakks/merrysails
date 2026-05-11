import type { Package } from "@/data/tours";

type Strings = {
  eyebrow: string; // "Limited-time campaign" / "Haftalık kampanya"
  headline: string; // "Every Tuesday & Thursday — €X off"
  intro: string; // explanation
  scheduleLabel: string; // "Sailings on:"
  weekdayNames: { Tue: string; Thu: string };
  regularLabel: string; // "Regular"
  discountedLabel: string; // "Tuesday & Thursday"
  saveSuffix: string; // "save €X"
  detailsCta: string; // "How the discount works"
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

  return (
    <section
      id="weekday-discount"
      aria-labelledby="weekday-discount-heading"
      className="mt-8 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden>✦</span> {strings.eyebrow}
          </p>
          <h2
            id="weekday-discount-heading"
            className="text-2xl md:text-3xl font-bold text-emerald-900"
          >
            {strings.headline.replace("{maxSave}", String(maxSave))}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-900/90">
            {strings.intro.replace("{product}", productName)}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-900/80">
            {strings.scheduleLabel}{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                {strings.weekdayNames.Tue}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                {strings.weekdayNames.Thu}
              </span>
            </span>
          </p>
        </div>
        <div className="w-full md:w-auto md:min-w-[280px]">
          <ul className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
            {discounted.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="font-semibold text-emerald-900">{p.name}</span>
                <span>
                  <span className="text-xs text-emerald-900/60 line-through">
                    €{p.price}
                  </span>{" "}
                  <span className="text-base font-bold text-emerald-700">
                    €{p.weekdayDiscount!.discountedPrice}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-emerald-900/70">{strings.saveSuffix.replace("{maxSave}", String(maxSave))}</p>
        </div>
      </div>
    </section>
  );
}

export type { Strings as WeekdayDiscountStrings };
