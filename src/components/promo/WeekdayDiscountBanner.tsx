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
      className="relative mb-6 overflow-hidden rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-6 md:p-8 shadow-lg"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white blur-3xl" />
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-amber-300 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            <span aria-hidden>✦</span> {strings.eyebrow}
          </p>
          <h2
            id="weekday-discount-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          >
            {strings.headline.replace("{maxSave}", String(maxSave))}
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-white/95">
            {strings.intro.replace("{product}", productName)}
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/90">
            {strings.scheduleLabel}{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm">
                {strings.weekdayNames.Tue}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm">
                {strings.weekdayNames.Thu}
              </span>
            </span>
          </p>
        </div>
        <div className="w-full md:w-auto md:min-w-[300px]">
          <ul className="space-y-2 rounded-xl bg-white p-4 shadow-xl">
            {discounted.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="font-semibold text-emerald-900 truncate pr-2">{p.name}</span>
                <span className="whitespace-nowrap">
                  <span className="text-xs text-gray-400 line-through">
                    €{p.price}
                  </span>{" "}
                  <span className="text-base font-bold text-emerald-700">
                    €{p.weekdayDiscount!.discountedPrice}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] font-medium text-white/90">{strings.saveSuffix.replace("{maxSave}", String(maxSave))}</p>
        </div>
      </div>
    </section>
  );
}

export type { Strings as WeekdayDiscountStrings };
