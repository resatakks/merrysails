import { MapPin, Navigation, Clock, MessageCircle } from "lucide-react";
import { MEETING_POINTS } from "@/data/meeting-points";

const WHATSAPP_URL = "https://wa.me/905370406822";

type Props = {
  /** Tour slug — must match a key in MEETING_POINTS */
  slug: string;
};

export default function HowToGetThere({ slug }: Props) {
  const mp = MEETING_POINTS[slug];
  if (!mp) return null;

  const { lat, lng } = mp.geo;
  const googleMaps = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
  const appleMaps = `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(mp.mapQuery)}`;

  return (
    <section
      aria-labelledby="how-to-get-there-heading"
      className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
          <MapPin className="h-5 w-5" />
        </span>
        <div>
          <h2
            id="how-to-get-there-heading"
            className="text-xl font-bold text-[var(--heading)]"
          >
            How to Get There
          </h2>
          <p className="mt-0.5 text-sm font-semibold text-[var(--brand-primary)]">
            {mp.name}
            <span className="font-medium text-[var(--text-muted)]"> · {mp.district}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {/* Address + map buttons */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Meeting point address
          </div>
          <address className="mt-2 not-italic text-sm leading-relaxed text-[var(--heading)]">
            {mp.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand-primary)] px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              Get directions
            </a>
            <a
              href={appleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white px-3.5 py-2 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]"
            >
              <MapPin className="h-4 w-4" />
              Open in Apple Maps
            </a>
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
            <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>
              The exact boarding pin is confirmed by{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--brand-primary)] hover:underline"
              >
                WhatsApp
              </a>{" "}
              after booking.
            </span>
          </p>
        </div>

        {/* Travel options */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Getting here
          </div>
          <ul className="mt-3 space-y-3">
            {mp.travelOptions.map((opt) => (
              <li key={opt.mode} className="flex gap-3 text-sm">
                <span className="mt-0.5 shrink-0 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-[var(--brand-primary)] ring-1 ring-[var(--line)]">
                  {opt.mode}
                </span>
                <span className="leading-snug text-[var(--body-text)]">
                  {opt.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
        <Clock className="h-4 w-4 shrink-0" />
        {mp.arriveTip}
      </p>
    </section>
  );
}
