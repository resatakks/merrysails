import { Mic, BookOpen } from "lucide-react";

type Props = {
  /** Brand label retained for callers, currently unused since the bottom
   *  brand-row + 12-language guide block was removed on 2026-05-27. */
  brand?: string;
};

const FEATURES = [
  {
    icon: Mic,
    title: "Live English-speaking guide",
    desc: "On-board commentary at every Bosphorus landmark.",
  },
  {
    icon: BookOpen,
    title: "Written route guide",
    desc: "Landmark-by-landmark notes you can read at your own pace.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TourFeatureStrip({ brand: _brand = "MerrySails" }: Props) {
  return (
    <section
      aria-label="Guide features"
      className="mb-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
    >
      <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-3 bg-white p-5">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-[var(--heading)]">{title}</div>
              <p className="mt-0.5 text-xs leading-snug text-[var(--text-muted)]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
