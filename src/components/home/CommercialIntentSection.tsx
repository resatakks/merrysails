import Link from "next/link";
import { ArrowRight, LineChart, Shield, Sparkles } from "lucide-react";
import { commercialIntents } from "@/data/commercial-intents";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getLocalizedValue } from "@/i18n/localize";

const targetTypeLabels = {
  "core-product": "Featured experience",
  "service-page": "Private service",
  "commercial-guide": "Planning guide",
} as const;

interface CommercialIntentSectionProps {
  compact?: boolean;
}

export default function CommercialIntentSection({
  compact = false,
}: CommercialIntentSectionProps) {
  return (
    <section className={compact ? "py-12 bg-white" : "py-16 md:py-24 bg-white"}>
      <div className="container-main">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-alt)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            <LineChart className="h-3.5 w-3.5" />
            Cruise Selection Guide
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--heading)]">
            Find the Bosphorus cruise that fits your plan
          </h2>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
            Lead with the core experiences, then move to the private, proposal,
            and corporate options when the brief is narrower.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commercialIntents.map((intent) => {
            const keyword = getLocalizedValue(intent.keyword, DEFAULT_LOCALE);
            const title = getLocalizedValue(intent.title, DEFAULT_LOCALE);
            const description = getLocalizedValue(intent.description, DEFAULT_LOCALE);

            return (
              <Link
                key={`${intent.href}-${keyword}`}
                href={intent.href}
                className="group rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-alt)] p-6 transition-all hover:border-[var(--brand-primary)]/30 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                      {targetTypeLabels[intent.targetType]}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-[var(--heading)]">
                      {title}
                    </h3>
                  </div>
                  <div className="rounded-full bg-white p-2.5 text-[var(--brand-primary)] shadow-sm">
                    {intent.targetType === "core-product" ? (
                      <Sparkles className="h-4 w-4" />
                    ) : (
                      <Shield className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Popular Option
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                    {keyword}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {intent.preserveIndexedUrl ? "Most requested" : "Worth exploring"}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
