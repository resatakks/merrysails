/**
 * PricingTable — visual + AI-quotable price grid.
 *
 * Why a dedicated component:
 *   - Perplexity / Bing Copilot / Gemini reward concrete numeric tables
 *     over prose ("the price ranges from €30 to €90" gets ignored; a
 *     visible table row "Silver Soft Drinks · €30 per guest" gets
 *     quoted verbatim).
 *   - We pair the visual table with Schema.org `Table` JSON-LD via
 *     `buildPricingTableSchema()` in src/lib/travel-action-schema.ts so
 *     the same numbers exist in two AI-readable surfaces.
 *
 * Marketing copy guardrail:
 *   - Every price column uses the "From €X" pattern instead of a fixed
 *     amount.  This keeps us flexible on weekday discount handling
 *     without making the schema look like a contradictory price guide.
 */
import type { PriceRow } from "@/lib/travel-action-schema";

interface Props {
  caption: string;
  /** Optional intro shown above the table. */
  intro?: string;
  rows: readonly PriceRow[];
  /** Optional footer note shown below the table. */
  note?: string;
}

export default function PricingTable({ caption, intro, rows, note }: Props) {
  return (
    <section
      aria-label={caption}
      className="my-10 rounded-2xl border border-[var(--line)] bg-white p-5 md:p-7"
    >
      <h3 className="text-lg font-bold text-[var(--heading)] md:text-xl">
        {caption}
      </h3>
      {intro && (
        <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {intro}
        </p>
      )}
      <div className="mt-4 -mx-2 overflow-x-auto md:mx-0">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-2 pr-4">Tier</th>
              <th className="py-2 pr-4">From</th>
              <th className="py-2 pr-4">Unit</th>
              <th className="py-2 pr-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-[var(--line)]/60 last:border-0">
                <td className="py-3 pr-4 font-semibold text-[var(--heading)]">
                  {row.name}
                </td>
                <td className="py-3 pr-4 font-bold text-[var(--brand-gold)]">
                  {row.fromPrice}
                </td>
                <td className="py-3 pr-4 text-[var(--body-text)]">
                  {row.unit}
                </td>
                <td className="py-3 pr-4 text-xs text-[var(--text-muted)]">
                  {[row.note, row.includes && `incl. ${row.includes}`]
                    .filter(Boolean)
                    .join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
          {note}
        </p>
      )}
    </section>
  );
}
