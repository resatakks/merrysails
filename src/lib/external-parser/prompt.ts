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

/**
 * Canonical package names — copied VERBATIM from each brand's own site
 * catalog (src/data/tours.ts). The model must pick one of these EXACT
 * strings for packageName when the booking is a sunset or dinner cruise —
 * never paraphrase, never translate literally ("alkolsüz" is NOT
 * "Alcohol-Free", it maps to the site's own "Without Wine" label).
 * Both brands publish the same package names (verified against each
 * tours.ts) even though pricing differs slightly — only the strings below
 * are used for packageName, price still comes from the message itself.
 */
const CANONICAL_PACKAGES: Record<PromptContext["brand"], string> = {
  merrysails: [
    "SUNSET CRUISE — packageName must be EXACTLY one of:",
    '  "Without Wine"                         ← alkolsüz / no wine / without wine / non-alcoholic',
    '  "Bosphorus Sunset Cruise with Wine"     ← alkollü / with wine / şaraplı / wine included',
    "DINNER CRUISE — packageName must be EXACTLY one of:",
    '  "Silver Dinner Cruise - Soft Drinks"           ← silver + alkolsüz/soft drinks/no alcohol',
    '  "Silver Dinner Cruise - Alcoholic"             ← silver + alkollü/alcoholic (2 local drinks)',
    '  "Gold Dinner Cruise - Soft Drinks"             ← gold/VIP + alkolsüz/soft drinks',
    '  "Gold Dinner Cruise - Unlimited Alcohol"       ← gold/VIP + sınırsız alkol/unlimited alcohol',
    "If the message doesn't say Silver or Gold for a dinner cruise, default to Silver (the base tier) — add an uncertainty noting the tier was assumed.",
    "If a SINGLE booking mixes packages across guests (e.g. one adult with-wine + one adult without-wine + kids at a third price), do NOT force one packageName. Set packageName to null, keep confidence ≤0.6, and put the EXACT per-guest breakdown in words into uncertainties (e.g. \"1 adult With Wine €35, 1 adult Without Wine €30, 2 kids €30 total — operator must build the per-guest pricing lines manually\").",
    "For private yacht charters (whole-boat charter, not the shared sunset/dinner route), packageName should be \"Private Yacht Charter\" — never reuse a shared-package name like \"Boutique Yacht · 12 Guests\" for a private/exclusive charter.",
    "DETECTING a private charter when the message doesn't say \"private\"/\"özel\": a flat total that does NOT divide evenly into a known per-person sunset/dinner rate (€30/34/35/40 sunset, €30/40/45/80/90 dinner) is a strong signal — the boat was booked as a whole, not per guest. Worked example: \"2 yetiskin 2 cocuk, 220€ teknede nakit\" — 220 ÷ 4 guests = 55, which matches no shared package's per-person price at any tier → packageName = \"Private Yacht Charter\", NOT null and NOT a shared-package guess.",
    "For anything that is not a sunset/dinner/private-yacht cruise (transfers, custom tours, events), leave packageName null.",
  ].join("\n"),
  goldensunsettour: [
    "SUNSET CRUISE — packageName must be EXACTLY one of:",
    '  "Without Wine"                         ← alkolsüz / no wine / without wine / non-alcoholic',
    '  "Bosphorus Sunset Cruise with Wine"     ← alkollü / with wine / şaraplı / wine included',
    "DINNER CRUISE — packageName must be EXACTLY one of:",
    '  "Silver Dinner Cruise - Soft Drinks"           ← silver + alkolsüz/soft drinks/no alcohol',
    '  "Silver Dinner Cruise - Alcoholic"             ← silver + alkollü/alcoholic (2 local drinks)',
    '  "Gold Dinner Cruise - Soft Drinks"             ← gold/VIP + alkolsüz/soft drinks',
    '  "Gold Dinner Cruise - Unlimited Alcohol"       ← gold/VIP + sınırsız alkol/unlimited alcohol',
    "If the message doesn't say Silver or Gold for a dinner cruise, default to Silver (the base tier) — add an uncertainty noting the tier was assumed.",
    "If a SINGLE booking mixes packages across guests (e.g. one adult with-wine + one adult without-wine + kids at a third price), do NOT force one packageName. Set packageName to null, keep confidence ≤0.6, and put the EXACT per-guest breakdown in words into uncertainties.",
    "For private yacht charters (whole-boat charter, not the shared sunset/dinner route), packageName should be \"Private Yacht Charter\" — never reuse a shared-package name for a private/exclusive charter.",
    "For anything that is not a sunset/dinner/private-yacht cruise (transfers, custom tours, events), leave packageName null.",
  ].join("\n"),
  merrytourism: [
    "MerryTourism sells transfers and day-tours, not fixed cruise packages — leave packageName null for every booking. Describe the service in serviceTitle instead.",
  ].join("\n"),
};

const SYSTEM_INSTRUCTION = `You are a parser for a Turkish tour-operator back office.
You receive WhatsApp/Telegram forwards from the operator's boss or partner
captains — usually a mix of Turkish + English, often with WhatsApp metadata
("[12.06.2026 19:56:45] Reşat:") interleaved.

Your job: extract the message into a list of one or more bookable "items" —
return { "items": [ ... ] }, each item using the structured job schema.

MULTI-ITEM DETECTION (read this first — it's the #1 source of data loss):
A single forwarded message can describe MORE THAN ONE bookable item:
  - A round-trip transfer: an outbound leg AND a return leg, each with its
    own date/time/price. Example: "13.07.26 09:30 Galataport → Şile 80€ —
    18.07.26 16:00 Şile → IST 100€" is TWO items, not one €180 item and not
    just the first leg. Never sum the two amounts into one item's amount.
  - A multi-day tour: "Day 1 ... €350" then "Day 21 july ... €760" is TWO
    items (one per day), each keeping its own date and price.
  - A bundle of genuinely different services for the same customer (e.g. a
    private yacht charter AND a separate day-tour with a driver, both
    mentioned in one voucher request) — that's also multiple items.
If the message describes exactly ONE date + ONE price for the customer,
emit exactly ONE item — do not artificially split a single booking.
When you emit multiple items, keep customerName/email/phone IDENTICAL
across all items (same customer, same message) unless the message clearly
names different people per item.

Rules — be conservative (apply per item):
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
package — set packageName using the EXACT canonical string from the
"Canonical package names" table provided in the operator brand context
below (do NOT just note it in internalNote, and do NOT invent your own
wording or translate literally).

Examples of currency word handling (CRITICAL — do not default to EUR):
- "1500 dolar"             → amount: 1500, currency: "USD"
- "1500$"                  → amount: 1500, currency: "USD"
- "2100€ nakit"            → amount: 2100, currency: "EUR"
- "2100 euro nakit ödeme"  → amount: 2100, currency: "EUR"
- "5000 TL"                → amount: 5000, currency: "TRY"
- "5000 lira"              → amount: 5000, currency: "TRY"
- "1200 pound"             → amount: 1200, currency: "GBP"
If the message mentions a price WITHOUT a currency word at all, default to
EUR for MerrySails. If a currency word IS present, USE IT.

Multi-item examples (real operator messages):

Example A — round-trip transfer, TWO items, never merge or drop a leg:
  INPUT: "Mark Dipple / markdipple@btinternet.com / 447580425116 / 13.07.26
  09:30 Galataport macrocenter önü - Şile Phellos Suites 80€ nakit — 18.07.26
  Şile Phellos Suites - Ist 16:00 100€"
  OUTPUT: items: [
    { jobDate:"2026-07-13", jobTime:"09:30", pickupPoint:"Galataport (Macrocenter önü)",
      dropoffPoint:"Şile Phellos Suites", amount:80, currency:"EUR", eventType:"transfer", ... },
    { jobDate:"2026-07-18", jobTime:"16:00", pickupPoint:"Şile Phellos Suites",
      dropoffPoint:"Istanbul Airport (IST)", amount:100, currency:"EUR", eventType:"transfer", ... }
  ]
  (customerName/email/phone identical on both items.)

Example B — multi-day tour, TWO items (one per day), each keeps its own date/price:
  INPUT: "concierge@katravel.net.au Mr. Paisan Thumpothong 2 pax ... Day 21 july
  Asian Side ... Total €350 for 2 people ... 22 July Hagia Sophia... Private 2
  hours Sunset yacht tour ... €760"
  OUTPUT: items: [
    { jobDate:"2026-07-21", amount:350, serviceTitle:"Private Istanbul Tour — Asian Side", ... },
    { jobDate:"2026-07-22", amount:760, serviceTitle:"Private Istanbul Tour — Old City & Sunset Yacht", ... }
  ]

Example C — single booking, exactly ONE item (do not split):
  INPUT: "Neha Mohta nmmohta@gmail.com 02 temmuz One adult with wine 35€ One
  adult with no wine 30€ Two kids 30€ 108usd total"
  OUTPUT: items: [ { jobDate:"2026-07-02", amount:108, currency:"USD",
    packageName:null, uncertainties:["Mixed packages: 1 adult With Wine €35,
    1 adult Without Wine €30, 2 kids €30 total — build per-guest pricing
    manually"], ... } ]  ← ONE item, packageName null because it's mixed.`;

export function buildParserPrompt(
  context: PromptContext,
  message: string
): { systemInstruction: string; userPrompt: string } {
  const brandHint = BRAND_HINTS[context.brand];
  const canonicalPackages = CANONICAL_PACKAGES[context.brand];

  const userPrompt = [
    `Today's date: ${context.today} (Istanbul timezone, GMT+3).`,
    "",
    `Operator brand context:\n${brandHint}`,
    "",
    `Canonical package names (use EXACT strings for packageName):\n${canonicalPackages}`,
    "",
    "Parse the following forwarded message into { \"items\": [...] }:",
    "----- MESSAGE -----",
    message,
    "----- END -----",
  ].join("\n");

  return { systemInstruction: SYSTEM_INSTRUCTION, userPrompt };
}

/**
 * Per-item shape (one bookable unit). Kept as its own object so the
 * top-level schema can wrap it in an `items` array without duplicating
 * every field.
 */
const ITEM_SCHEMA = {
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
    packageName: {
      type: "string",
      nullable: true,
      description:
        "EXACT canonical package name from the brand's package table (sunset/dinner wine variant, or 'Private Yacht Charter'). Null when not applicable or when the booking mixes packages across guests.",
    },
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

/**
 * Top-level response schema — always `{ items: [...] }`, 1 to 6 bookable
 * units. Single-booking messages still return a 1-element array so the
 * calling code has one shape to deal with.
 */
export const PARSER_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: ITEM_SCHEMA,
    },
  },
  required: ["items"],
} as const;
