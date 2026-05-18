#!/usr/bin/env node
/**
 * Mini-test: ask 3 LLMs about a brand query, see if the brand is mentioned.
 * Usage: node --env-file=.env.local scripts/ai-visibility-test.mjs "<prompt>" "<brand>"
 * Example: node --env-file=.env.local scripts/ai-visibility-test.mjs "best sunset cruise istanbul" "merrysails"
 */

const key = process.env.OPENROUTER_API_KEY;
if (!key) {
  console.error("OPENROUTER_API_KEY not set in .env.local");
  process.exit(1);
}

const [prompt, brand] = process.argv.slice(2);
if (!prompt || !brand) {
  console.error('Usage: ai-visibility-test.mjs "<prompt>" "<brand>"');
  process.exit(1);
}

const MODELS = [
  "openai/gpt-4o-mini",
  "anthropic/claude-haiku-4.5",
  "perplexity/sonar",
];

async function askModel(model, prompt) {
  const start = Date.now();
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://merrysails.com",
        "X-Title": "MerrySails AI Visibility Test",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { model, error: data.error?.message ?? `HTTP ${res.status}`, ms: Date.now() - start };
    }
    const text = data.choices?.[0]?.message?.content ?? "";
    const usage = data.usage ?? {};
    return { model, text, usage, ms: Date.now() - start };
  } catch (e) {
    return { model, error: String(e), ms: Date.now() - start };
  }
}

const KNOWN_COMPETITORS = [
  "viator", "getyourguide", "tripadvisor", "klook", "expedia",
  "sehir hatlari", "şehir hatları", "bosphorustour", "sefa marin",
  "marmaramarine", "bosphorus.com", "istanbul cruise", "halic tur",
];

function analyze(text, brand) {
  if (!text) return { mentioned: false, position: null, competitors: [] };
  const lower = text.toLowerCase();
  const brandLower = brand.toLowerCase();
  const mentioned = lower.includes(brandLower);
  const idx = lower.indexOf(brandLower);
  const competitors = KNOWN_COMPETITORS.filter((c) => lower.includes(c));
  return { mentioned, position: idx, competitors };
}

console.log(`\n🔎 Prompt: "${prompt}"`);
console.log(`🏷  Tracking brand: "${brand}"\n`);

let totalIn = 0, totalOut = 0;

const results = await Promise.all(MODELS.map((m) => askModel(m, prompt)));

for (const r of results) {
  console.log(`\n${"=".repeat(70)}`);
  console.log(`MODEL: ${r.model}  (${r.ms} ms)`);
  if (r.error) {
    console.log(`❌ ERROR: ${r.error}`);
    continue;
  }
  const a = analyze(r.text, brand);
  console.log(`Tokens: ${r.usage.prompt_tokens ?? 0} in + ${r.usage.completion_tokens ?? 0} out`);
  totalIn += r.usage.prompt_tokens ?? 0;
  totalOut += r.usage.completion_tokens ?? 0;
  console.log(`Brand mentioned: ${a.mentioned ? "✅ YES" : "❌ NO"} ${a.position !== null && a.position >= 0 ? `(char pos ${a.position})` : ""}`);
  console.log(`Competitors detected: ${a.competitors.length ? a.competitors.join(", ") : "(none in known list)"}`);
  console.log(`\n--- Full response ---\n${r.text}\n`);
}

console.log(`\n${"=".repeat(70)}`);
console.log(`📊 Token totals: ${totalIn} in + ${totalOut} out across ${MODELS.length} models`);
console.log(`💸 Rough cost estimate: gpt-4o-mini $0.001 + claude-haiku $0.005 + perplexity-sonar $0.005 ≈ ~$0.01-0.03 for this query`);
