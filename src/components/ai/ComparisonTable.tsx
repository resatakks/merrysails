import { cn } from "@/lib/utils";

/**
 * ComparisonTable
 * --------------------------------
 * AI-extractable semantic comparison table.
 *
 * Perplexity, ChatGPT, Claude and Yandex parse <table> markup directly
 * and reproduce rows in their answers. This wrapper guarantees the
 * AI-critical signals are always present:
 *
 *   - <caption> (read by AI to label the data set)
 *   - <thead> + <th scope="col"> (column-axis association)
 *   - <tbody> + <tr> + <td>
 *   - role="table" (explicit ARIA for safety in custom UAs)
 *   - horizontal-scroll wrapper for mobile
 *   - optional ReactNode cell values for rich content (links, badges)
 *
 * Pair this component with a `Table` JSON-LD block on the page —
 * see existing usages for the schema-emission pattern.
 */
export type ComparisonTableProps = {
  caption: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
  /** Optional ISO locale code, used for AI/screen-reader hinting. */
  locale?: string;
  /** Show the caption visually (default true). Caption is always in the DOM. */
  visibleCaption?: boolean;
  /** Extra utility classes for the outer wrapper. */
  className?: string;
  /** Aria label for the scroll wrapper. */
  ariaLabel?: string;
  /** Minimum width before horizontal scroll kicks in. */
  minWidth?: string;
};

export default function ComparisonTable({
  caption,
  headers,
  rows,
  locale,
  visibleCaption = true,
  className,
  ariaLabel,
  minWidth = "640px",
}: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-[var(--line)] bg-white",
        className,
      )}
      role="region"
      aria-label={ariaLabel ?? caption}
      tabIndex={0}
    >
      <table
        role="table"
        lang={locale}
        className="w-full border-collapse text-left text-sm"
        style={{ minWidth }}
      >
        <caption
          className={cn(
            "px-4 pt-4 text-left text-sm font-semibold text-[var(--heading)]",
            !visibleCaption && "sr-only",
          )}
        >
          {caption}
        </caption>
        <thead className="bg-[var(--surface-alt)]">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-[var(--line)] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--heading)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)]">
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="align-top transition-colors hover:bg-[var(--surface-alt)]/40"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)]",
                    ci === 0 && "font-semibold text-[var(--heading)]",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Emit a Table JSON-LD block. Use inside a `<script type="application/ld+json">`
 * on any page that uses ComparisonTable so Yandex picks it up.
 */
export function buildTableSchema({
  about,
  url,
  name,
}: {
  about: string;
  url: string;
  name?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    about,
    url,
    ...(name ? { name } : {}),
  };
}
