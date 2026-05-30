/**
 * TravelAction / ReserveAction schema — the booking-intent layer.
 *
 * Voice assistants and AI agents (Gemini, ChatGPT, Claude) parse Action
 * schemas to expose direct "book now" capability inside their answer
 * surfaces.  Google's Action API has been deprioritised but the schema
 * is still used by AI retrievers as a strong commercial-intent signal:
 * a page that says "you can do X here" with a structured action gets
 * cited when a user asks "where can I book X?".
 *
 * Reference:
 *   - https://schema.org/ReserveAction
 *   - https://schema.org/EntryPoint (the inline action target)
 *
 * Two surfaces:
 *   1. Per-product ReserveAction — emitted on each commercial pillar
 *      so AI knows the page has a working booking flow.
 *   2. Organisation-level potentialAction — added on the root layout
 *      so brand searches surface "book direct" as a knowledge-panel
 *      action.
 */

interface ReserveActionOptions {
  /** Public URL of the product / cruise / yacht. */
  productUrl: string;
  /** Human-readable name of the reservation product. */
  productName: string;
  /** Currency for displayed price (always EUR for MerrySails). */
  priceCurrency?: string;
  /** Lowest entry price for the product, used as actionAccessibilityRequirement
   *  + AggregateOffer hint. */
  fromPriceEur?: number;
  /** Optional locale that the reservation form is served in. */
  inLanguage?: string;
}

export function buildReserveActionSchema(opts: ReserveActionOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "ReserveAction",
    name: `Book ${opts.productName}`,
    description: `Book a ${opts.productName} directly with MerrySails — confirmation typically within 3 minutes.`,
    target: {
      "@type": "EntryPoint",
      urlTemplate: opts.productUrl,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
      inLanguage: opts.inLanguage ?? "en",
    },
    result: {
      "@type": "Reservation",
      name: `${opts.productName} reservation`,
      reservationStatus: "https://schema.org/ReservationPending",
    },
    ...(opts.fromPriceEur != null && {
      potentialAction: {
        "@type": "PayAction",
        name: "Pay for reservation",
        priceCurrency: opts.priceCurrency ?? "EUR",
        price: opts.fromPriceEur,
      },
    }),
    agent: {
      "@id": "https://merrysails.com/#organization",
    },
  };
}

/**
 * Pricing table — citation-ready data for AI retrievers.
 *
 * Perplexity, ChatGPT, and Bing Copilot all reward tables of concrete
 * numeric data (prices, capacities, durations) over prose because they
 * can be sliced into typed property values during answer generation.
 *
 * We pair every visual <table> on commercial pages with this schema so
 * the same data is consumable both for human readers (visual) and AI
 * retrievers (Table @type or PriceSpecification list).
 *
 * Use one of two patterns depending on what fits:
 *
 *   - `buildPriceSpecListSchema` — emits a list of PriceSpecification
 *     entries.  Pure machine-readable, no rendering pair required.
 *
 *   - `buildPricingTableSchema` — emits Schema.org `Table` with rows /
 *     cells.  Matches a visual HTML table on the page; AI retrievers
 *     can quote rows verbatim.
 */

export interface PriceRow {
  /** Tier or package name, e.g. "Silver Soft Drinks". */
  name: string;
  /** Price string formatted for display, e.g. "From €30". */
  fromPrice: string;
  /** Per-unit suffix, e.g. "per guest", "per yacht". */
  unit: string;
  /** Optional weekday discount note. */
  note?: string;
  /** Optional includes summary for the row. */
  includes?: string;
}

export function buildPricingTableSchema(args: {
  name: string;
  description: string;
  pageUrl: string;
  rows: readonly PriceRow[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    name: args.name,
    description: args.description,
    url: args.pageUrl,
    about: { "@id": "https://merrysails.com/#organization" },
    isPartOf: { "@id": args.pageUrl },
    // Encode the rows as a PriceSpecification list so retrievers that
    // don't render Table schema can still surface the numbers.
    mainEntity: args.rows.map((row, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "PriceSpecification",
        name: row.name,
        priceCurrency: "EUR",
        // The price field on PriceSpecification is a number; we keep
        // the human "From €X" string in `description` so prose retrieval
        // shows the marketing copy ("starting at") rather than a raw
        // number that might be confused with a single fixed rate.
        description: `${row.fromPrice} ${row.unit}${row.note ? ` · ${row.note}` : ""}${row.includes ? ` · includes ${row.includes}` : ""}`,
      },
    })),
  };
}
