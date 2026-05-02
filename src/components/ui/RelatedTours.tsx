import Link from "next/link";
import { Anchor, Sunset, UtensilsCrossed, Ship, Waves } from "lucide-react";

type TourKey = "bosphorus" | "sunset" | "dinner" | "yacht" | "boat";

interface TourCard {
  key: TourKey;
  href: string;
  icon: React.ReactNode;
  label: string;
  tagline: string;
  price: string;
}

const ALL_TOURS: TourCard[] = [
  {
    key: "bosphorus",
    href: "/bosphorus-cruise",
    icon: <Anchor className="h-5 w-5 text-[var(--brand-primary)]" />,
    label: "Bosphorus Cruise Istanbul",
    tagline: "Compare all cruise types — shared, private & dinner",
    price: "From €25",
  },
  {
    key: "sunset",
    href: "/cruises/bosphorus-sunset-cruise",
    icon: <Sunset className="h-5 w-5 text-amber-500" />,
    label: "Bosphorus Sunset Cruise",
    tagline: "2-hour cruise at golden hour with open bar",
    price: "From €35",
  },
  {
    key: "dinner",
    href: "/istanbul-dinner-cruise",
    icon: <UtensilsCrossed className="h-5 w-5 text-rose-500" />,
    label: "Istanbul Dinner Cruise",
    tagline: "3-hour dinner, live show & unlimited drinks",
    price: "From €55",
  },
  {
    key: "yacht",
    href: "/yacht-charter-istanbul",
    icon: <Ship className="h-5 w-5 text-sky-500" />,
    label: "Yacht Charter Istanbul",
    tagline: "Private yacht — your route, your schedule",
    price: "From €350",
  },
  {
    key: "boat",
    href: "/boat-rental-istanbul",
    icon: <Waves className="h-5 w-5 text-teal-500" />,
    label: "Boat Rental Istanbul",
    tagline: "Hire a boat by the hour with or without captain",
    price: "From €150/hr",
  },
];

interface RelatedToursProps {
  /** Mevcut sayfanın tour key'i — kart listesinden çıkarılır */
  exclude: TourKey;
  heading?: string;
}

export default function RelatedTours({
  exclude,
  heading = "Also popular on the Bosphorus",
}: RelatedToursProps) {
  const tours = ALL_TOURS.filter((t) => t.key !== exclude);

  return (
    <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
      <h2 className="mb-6 text-xl font-bold text-[var(--heading)]">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tours.map((tour) => (
          <Link
            key={tour.key}
            href={tour.href}
            className="group flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-white"
          >
            <div className="flex items-center gap-2">
              {tour.icon}
              <span className="text-sm font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                {tour.label}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{tour.tagline}</p>
            <span className="mt-auto text-xs font-semibold text-[var(--brand-primary)]">
              {tour.price} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
