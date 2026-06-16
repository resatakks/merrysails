/**
 * Brand-aware prompt builder for parsing operator/boss WhatsApp/Telegram
 * messages into a ParsedExternalJob structure.
 *
 * The prompt explicitly tells the model:
 *  - We are operating from MerrySails (Turkey-based Bosphorus cruise + yacht
 *    charter + airport transfer operator)
 *  - Today's date — so it can resolve "29.06.26" against the current year and
 *    flag past dates
 *  - Common pickup conventions (Karaköy, Kabataş, Kuruçeşme Marina, Balat, Bodrum)
 *  - Default currency EUR for cruise, optional TRY for domestic transfer
 *  - To be conservative: prefer null over guessing
 */

export interface PromptContext {
  /** ISO date "YYYY-MM-DD" — today in operator timezone (Istanbul). */
  today: string;
  /** Brand label injected into the prompt — pre-routes the LLM. */
  brand: "merrysails" | "goldensunsettour" | "merrytourism";
}

const BRAND_HINTS: Record<PromptContext["brand"], string> = {
  merrysails: [
    "Brand: MerrySails (https://merrysails.com)",
    "Vertical: Bosphorus sunset + dinner cruise, private yacht charter, engagement / wedding / birthday organization on yachts.",
    "Default currency: EUR. TRY only if the message clearly says ₺ / TL / lira.",
    "Common pickup points: Karaköy ferry pier, Kabataş iskele, Kuruçeşme Marina, Balat pier.",
    "TURSAB licensed: A-9889.",
  ].join("\n"),
  goldensunsettour: [
    "Brand: GoldenSunsetTour (https://goldensunsettour.com)",
    "Vertical: Bosphorus cruise, private yacht charter, Princes' Islands swimming tours, dinner cruise.",
    "Default currency: EUR for cruises, USD common for private yacht charters.",
    "Common pickup points: Karaköy, Kabataş, Kuruçeşme Marina, Kadıköy iskele.",
    "TURSAB licensed: A-14316 (Meryem Yıldız Travel).",
  ].join("\n"),
  merrytourism: [
    "Brand: MerryTourism (https://merrytourism.com)",
    "Vertical: Istanbul tours, transfers, day-tours, multi-city packages.",
    "Default currency: EUR for international tourists, TRY for domestic.",
    "Common pickup points: city hotels, Sabiha Gökçen airport (SAW), Istanbul airport (IST).",
  ].join("\n"),
};

const SYSTEM_INSTRUCTION = `You are a parser for a Turkish tour-operator back office.
You receive WhatsApp/Telegram forwards from the operator's boss or partner
captains — usually a mix of Turkish + English, often with WhatsApp metadata
("[12.06.2026 19:56:45] Reşat:") interleaved.

Your job: extract a single bookable job into the structured schema.

Rules — be conservative:
- Prefer null over guessing. If the message mentions "TBC" / "to be confirmed"
  or just doesn't say, return null for that field.
- Dates: WhatsApp uses Turkish format "29.06.26" = "2026-06-29". If only
  "Thursday" or "next week" is mentioned, return null and add a string to
  uncertainties explaining what was missing.
- Amounts: "€2,100 nakit" = amount 2100, currency EUR, paymentMethod
  cash_on_board. "+%20 if card" is a paymentNotes addendum, not an alternative
  amount.
- Currency words: "dolar" / "dollar" / "$" → USD. "euro" / "€" → EUR. "tl"
  / "lira" / "₺" → TRY. "pound" / "£" → GBP. NEVER assume EUR when the
  message explicitly names another currency.
- Relative dates: "önümüzdeki cuma" / "next Friday" → compute against the
  today's date in the prompt. If ambiguous (this Friday vs next Friday),
  return null and add to uncertainties — DO NOT guess.
- Transfer pickup vs dropoff: pickupPoint is where you collect the guest;
  dropoffPoint is where you drop them. For NON-transfer events leave
  dropoffPoint as null (don't duplicate pickup into it).
- Inclusions: only include explicit items ("Catering and food service",
  "Music speaker"). Don't synthesize generic "professional crew" unless the
  message mentions it.
- guests: WhatsApp messages often have BOTH an initial quote count AND a
  corrected count later in the thread ("aslında 21 olacaklar"). Use the LATEST
  corrected number. If multiple numbers and none clearly latest, return the
  highest and add to uncertainties.
- eventType: "engagement organization" / "evlilik teklifi" → engagement. "ada
  turu" → cruise. "airport pickup" / "havalimanı transfer" → transfer.
- Transfer messages have BOTH pickup AND dropoff — fill both.
- serviceTitle: short title for the voucher header ("Engagement Organization
  on Private Yacht", "Bodrum Airport → Hotel Transfer").
- confidence: 0.9+ when all required fields are clear; 0.7-0.9 when one
  uncertainty; below 0.7 when significant gaps.
- uncertainties: short bullets of what you weren't sure about — operator
  reads this and corrects in the confirm step.
- internalNote: any operator instructions you couldn't fit in other fields
  (e.g. "captain Emir confirmed", "müşteri kart isterse +%20 hatırlat").

Never invent emails or phone numbers. If not in the message, return null.

Intent classification — set "intent" to one of:
  - "reservation": shared or private cruise (sunset, dinner, private yacht
    charter, "Bosphorus cruise") with NO event-specific inclusions. Examples:
    "Sunset alkolsüz 2pax", "Private yat Karaköy 200€", "dinner cruise €30/pp".
    These go into the standard Reservation table.
  - "external": engagement / wedding / birthday / corporate / family event
    with inclusions (catering, decor, photo, cake, music) OR any airport
    transfer / car service / pickup. These go into the ExternalJob table.
  - "update": message clearly says it's modifying an EXISTING record
    ("date change", "saati 18 yap", "Only date change: 24.06.2026", "son
    geleni güncelle"). Set referenceId to the job/reservation ID if visible
    in the message, otherwise null and add an uncertainty entry.

For "reservation" intent leave inclusions empty unless the message explicitly
mentions extras. "yemekli" (with food) on a private yacht booking IS an
inclusion — add ["Dinner on board"]. "Alkolsüz" / "Alkollü" describe the
package, not an inclusion — record in internalNote, not inclusions.

Examples of currency word handling (CRITICAL — do not default to EUR):
- "1500 dolar"             → amount: 1500, currency: "USD"
- "1500$"                  → amount: 1500, currency: "USD"
- "2100€ nakit"            → amount: 2100, currency: "EUR"
- "2100 euro nakit ödeme"  → amount: 2100, currency: "EUR"
- "5000 TL"                → amount: 5000, currency: "TRY"
- "5000 lira"              → amount: 5000, currency: "TRY"
- "1200 pound"             → amount: 1200, currency: "GBP"
If the message mentions a price WITHOUT a currency word at all, default to
EUR for MerrySails. If a currency word IS present, USE IT.`;

export function buildParserPrompt(
  context: PromptContext,
  message: string
): { systemInstruction: string; userPrompt: string } {
  const brandHint = BRAND_HINTS[context.brand];

  const userPrompt = [
    `Today's date: ${context.today} (Istanbul timezone, GMT+3).`,
    "",
    `Operator brand context:\n${brandHint}`,
    "",
    "Parse the following forwarded message into the schema:",
    "----- MESSAGE -----",
    message,
    "----- END -----",
  ].join("\n");

  return { systemInstruction: SYSTEM_INSTRUCTION, userPrompt };
}

/**
 * The Gemini responseSchema (subset of OpenAPI 3.0). Keeps the model honest
 * about field types so we can validate cheaply.
 */
export const PARSER_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    confidence: { type: "number" },
    uncertainties: { type: "array", items: { type: "string" } },
    intent: {
      type: "string",
      enum: ["reservation", "external", "update"],
    },
    referenceId: { type: "string", nullable: true },
    eventType: {
      type: "string",
      enum: [
        "engagement",
        "birthday",
        "wedding",
        "corporate",
        "family",
        "transfer",
        "cruise",
        "custom",
      ],
    },
    serviceTitle: { type: "string" },
    customerName: { type: "string" },
    customerEmail: { type: "string", nullable: true },
    customerPhone: { type: "string", nullable: true },
    customerCountry: { type: "string", nullable: true },
    jobDate: {
      type: "string",
      description: "ISO date YYYY-MM-DD, or null if not in message.",
      nullable: true,
    },
    jobTime: { type: "string", nullable: true },
    durationHours: { type: "number", nullable: true },
    guests: { type: "integer" },
    pickupPoint: { type: "string", nullable: true },
    dropoffPoint: { type: "string", nullable: true },
    inclusions: { type: "array", items: { type: "string" } },
    amount: { type: "number" },
    currency: { type: "string", enum: ["EUR", "USD", "TRY", "GBP"] },
    paymentMethod: {
      type: "string",
      enum: [
        "cash_on_board",
        "card_on_board",
        "card_paid",
        "bank_transfer",
      ],
    },
    paymentNotes: { type: "string", nullable: true },
    internalNote: { type: "string", nullable: true },
  },
  required: [
    "confidence",
    "uncertainties",
    "intent",
    "eventType",
    "serviceTitle",
    "customerName",
    "guests",
    "inclusions",
    "amount",
    "currency",
    "paymentMethod",
  ],
} as const;
