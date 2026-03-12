import { Info, Lightbulb, AlertTriangle, DollarSign, Anchor } from "lucide-react";
import type { BlogSection } from "@/data/blog";
import React from "react";

const calloutConfig = {
  tip: { icon: Lightbulb, bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", label: "Pro Tip" },
  info: { icon: Info, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", label: "Good to Know" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", label: "Important" },
  price: { icon: DollarSign, bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-800", label: "Pricing" },
};

/** Parse markdown-style [text](url) links within plain text content */
function parseLinks(text: string): React.ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const isExternal = match[2].startsWith("http");
      return (
        <a
          key={i}
          href={match[2]}
          className="text-[var(--brand-primary)] underline underline-offset-2 hover:text-[var(--brand-dark)] transition-colors"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[1]}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function BlogSectionBlock({ section, index }: { section: BlogSection; index: number }) {
  return (
    <section id={`section-${index}`} className="mb-10 scroll-mt-24">
      <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">
        {section.heading}
      </h2>

      {/* Main content paragraphs */}
      <div className="text-[var(--body-text)] leading-relaxed space-y-4">
        {section.content.split("\n\n").map((para, i) => (
          <p key={i}>{parseLinks(para)}</p>
        ))}
      </div>

      {/* Callout box */}
      {section.callout && (
        <CalloutBox type={section.callout.type} text={section.callout.text} />
      )}

      {/* Bullet list */}
      {section.list && section.list.length > 0 && (
        <ul className="mt-4 space-y-2 pl-1">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[var(--body-text)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Comparison/data table */}
      {section.table && (
        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--brand-primary)] text-white">
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold first:rounded-tl-xl last:rounded-tr-xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-[var(--line)] even:bg-[var(--surface-alt)]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[var(--body-text)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* H3 Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 space-y-6">
          {section.subsections.map((sub, si) => (
            <div key={si}>
              <h3 className="text-xl font-semibold mb-3 text-[var(--heading)]">
                {sub.heading}
              </h3>
              <div className="text-[var(--body-text)] leading-relaxed space-y-4">
                {sub.content.split("\n\n").map((para, pi) => (
                  <p key={pi}>{parseLinks(para)}</p>
                ))}
              </div>
              {sub.list && sub.list.length > 0 && (
                <ul className="mt-3 space-y-2 pl-1">
                  {sub.list.map((item, li) => (
                    <li key={li} className="flex items-start gap-3 text-[var(--body-text)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pro tip / Expert quote */}
      {section.proTip && (
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-[var(--surface-alt)] p-4 border-l-4 border-[var(--brand-primary)]">
          <Anchor className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)] mb-1">
              Captain&apos;s Insight
            </p>
            <p className="text-sm text-[var(--body-text)] italic leading-relaxed">
              &ldquo;{section.proTip}&rdquo;
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function CalloutBox({ type, text }: { type: "tip" | "info" | "warning" | "price"; text: string }) {
  const cfg = calloutConfig[type];
  const Icon = cfg.icon;
  return (
    <div className={`mt-5 flex items-start gap-3 rounded-xl ${cfg.bg} ${cfg.border} border p-4`}>
      <Icon className={`w-5 h-5 ${cfg.text} shrink-0 mt-0.5`} />
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wider ${cfg.text} mb-1`}>
          {cfg.label}
        </p>
        <p className="text-sm text-[var(--body-text)] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
