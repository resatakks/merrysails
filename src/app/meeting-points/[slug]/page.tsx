import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin, Shield, Bus } from "lucide-react";
import {
  getExperienceSupportGuide,
  type ExperienceSupportGuide,
} from "@/lib/experience-support";

const supportedSlugs = ["bosphorus-sunset-cruise", "bosphorus-dinner-cruise"] as const;

export async function generateStaticParams() {
  return supportedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getExperienceSupportGuide(slug);

  if (!guide) {
    return {
      title: "Meeting Point Guide",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: guide.pageTitle,
    description: guide.pageDescription,
    robots: { index: false, follow: false },
  };
}

function SupportFacts({ guide }: { guide: ExperienceSupportGuide }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {guide.facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-[1.5rem] border border-[var(--line)] bg-white p-4 shadow-sm"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {fact.label}
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--heading)]">
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function MeetingPointGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getExperienceSupportGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-4">
        <section className="overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-6 shadow-sm md:p-8">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              {guide.supportLabel}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
              {guide.heroTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              {guide.heroBody}
            </p>
          </div>

          <div className="mt-8">
            <SupportFacts guide={guide} />
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[var(--surface-alt)] p-2.5">
                  <MapPin className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--heading)]">Meeting details</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">
                    {guide.summary}
                  </p>
                </div>
              </div>

              {guide.directions && (
                <div className="mt-6 space-y-3">
                  {guide.directions.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm leading-relaxed text-[var(--body-text)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {guide.mapUrl && (
                <div className="mt-5">
                  <a
                    href={guide.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    {guide.mapLabel ?? "Open meeting point map"}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            {guide.shuttleRows && (
              <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[var(--surface-alt)] p-2.5">
                    <Bus className="h-5 w-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--heading)]">Free shuttle service</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">
                      {guide.shuttleNote}
                    </p>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[var(--line)]">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-[var(--surface-alt)]">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-[var(--text-muted)]">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-[var(--text-muted)]">
                          Transportation time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {guide.shuttleRows.map((row) => (
                        <tr key={row.location} className="border-t border-[var(--line)]">
                          <td className="px-4 py-3 font-medium text-[var(--heading)]">
                            {row.location}
                          </td>
                          <td className="px-4 py-3 text-[var(--body-text)]">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {guide.shuttleExtraNote && (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
                    {guide.shuttleExtraNote}
                  </div>
                )}
              </div>
            )}

            {(guide.included || guide.excluded) && (
              <div className="grid gap-6 md:grid-cols-2">
                {guide.included && (
                  <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[var(--heading)]">Included</h2>
                    <ul className="mt-4 space-y-3">
                      {guide.included.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-[var(--body-text)]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {guide.excluded && (
                  <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[var(--heading)]">Excluded</h2>
                    <ul className="mt-4 space-y-3">
                      {guide.excluded.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-[var(--body-text)]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[var(--surface-alt)] p-2.5">
                  <Clock className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--heading)]">Before you arrive</h2>
                  <div className="mt-4 space-y-3">
                    {guide.beforeArrival.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[var(--surface-alt)] px-4 py-3 text-sm leading-relaxed text-[var(--body-text)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[var(--surface-alt)] p-2.5">
                  <Shield className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--heading)]">Need extra transport?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                    If you requested private transfer or need help from an area outside the shared
                    boarding plan, contact the MerrySails team before departure so the final route
                    can be confirmed.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-6 text-white shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                Reservation Center
              </p>
              <h2 className="mt-3 text-2xl font-bold">Track your booking anytime</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/74">
                Use your reservation ID for voucher, invoice, and boarding updates.
              </p>
              <div className="mt-5">
                <Link
                  href="/reservation"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--heading)] transition-all hover:brightness-95"
                >
                  Open reservation center
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
