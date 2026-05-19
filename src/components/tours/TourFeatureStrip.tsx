import Link from "next/link";
import { Mic, Headphones, BookOpen } from "lucide-react";

type Props = {
  /** Brand label shown on the audio-guide block */
  brand?: string;
};

const FEATURES = [
  {
    icon: Mic,
    title: "Live tour guide",
    desc: "On-board commentary at every Bosphorus landmark.",
  },
  {
    icon: Headphones,
    title: "Audio guide",
    desc: "Listen in your own language during the cruise.",
  },
  {
    icon: BookOpen,
    title: "Written route guide",
    desc: "Landmark-by-landmark notes you can read at your own pace.",
  },
];

// 12-language audio guide coverage
const LANGUAGES = [
  { flag: "🇹🇷", name: "Türkçe" },
  { flag: "🇬🇧", name: "English" },
  { flag: "🇩🇪", name: "Deutsch" },
  { flag: "🇷🇺", name: "Русский" },
  { flag: "🇫🇷", name: "Français" },
  { flag: "🇮🇹", name: "Italiano" },
  { flag: "🇪🇸", name: "Español" },
  { flag: "🇳🇱", name: "Nederlands" },
  { flag: "🇸🇦", name: "العربية" },
  { flag: "🇯🇵", name: "日本語" },
  { flag: "🇨🇳", name: "中文" },
  { flag: "🇵🇹", name: "Português" },
];

export default function TourFeatureStrip({ brand = "MerrySails" }: Props) {
  return (
    <section
      aria-label="Guide and language features"
      className="mb-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
    >
      <div className="grid gap-px bg-[var(--line)] sm:grid-cols-3">
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

      <div className="border-t border-[var(--line)] bg-[var(--surface-alt)] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-primary)]">
              {brand} Bosphorus Guide
            </span>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              · audio guide available in 12 languages
            </span>
          </div>
          <Link
            href="/bosphorus-guide"
            className="text-xs font-bold text-[var(--brand-primary)] hover:underline"
          >
            Open the interactive guide →
          </Link>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--heading)]"
            >
              <span aria-hidden className="text-sm leading-none">{lang.flag}</span>
              {lang.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
