/**
 * Single entry point — parseExternalMessage(message, brand) → ParsedExternalJob.
 *
 * Uses Anthropic Claude Haiku 4.5 with JSON-mode (forced tool use) for
 * structured output. Anthropic billing sits with the operator's existing
 * Claude Code account; no new vendor.
 *
 * Roughly $0.0005 per call at the volume + token shape we see (1k input,
 * 400 output tokens) → ~$0.50/month for 1000 parses. No daily-quota cliff
 * like the Gemini free tier.
 */

import { buildParserPrompt, PARSER_RESPONSE_SCHEMA, type PromptContext } from "./prompt";
import { validateParsed, sanityCheck, type ParsedExternalJob } from "./schema";

// Model is env-driven so we can A/B test cheaper variants without redeploy.
// Defaults to Haiku 4.5 (verified accuracy 4/4 on real fixtures). Set
// ANTHROPIC_PARSER_MODEL=claude-3-haiku-20240307 to drop to 4× cheaper
// variant — verify accuracy on test-parser-parallel.mjs before flipping.
const ANTHROPIC_MODEL =
  process.env.ANTHROPIC_PARSER_MODEL?.trim() || "claude-haiku-4-5-20251001";
const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const PARSER_TOOL_NAME = "submit_parsed_job";

export interface ParseSuccess {
  ok: true;
  data: ParsedExternalJob;
  warnings: string[];
  raw: unknown;
  latencyMs: number;
  /** Real input/output tokens reported by Anthropic — for cost auditing. */
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
  };
}

export interface ParseFailure {
  ok: false;
  error: string;
  raw: unknown;
  latencyMs: number;
}

export type ParseResult = ParseSuccess | ParseFailure;

export async function parseExternalMessage(
  message: string,
  brand: PromptContext["brand"] = "merrysails"
): Promise<ParseResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "ANTHROPIC_API_KEY missing in env.",
      raw: null,
      latencyMs: 0,
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  const { systemInstruction, userPrompt } = buildParserPrompt(
    { today, brand },
    message
  );

  // Force structured output by defining a single tool and requiring it.
  // Anthropic's tool_use is more reliable than freeform JSON when the schema
  // is rich.
  //
  // Prompt caching: system instruction + tool schema are identical across
  // calls (only the user message varies), so we mark them cache_control:
  // ephemeral. 5-minute TTL. Cache hits cost 10% of normal input; cache
  // writes cost 125%. Break-even at 2 calls/5min, pure savings after.
  const body = {
    model: ANTHROPIC_MODEL,
    max_tokens: 1024,
    temperature: 0.2,
    system: [
      {
        type: "text",
        text: systemInstruction,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [
      {
        name: PARSER_TOOL_NAME,
        description:
          "Submit the structured parse result for the operator's forwarded message.",
        input_schema: PARSER_RESPONSE_SCHEMA,
        cache_control: { type: "ephemeral" },
      },
    ],
    tool_choice: { type: "tool", name: PARSER_TOOL_NAME },
    messages: [{ role: "user", content: userPrompt }],
  };

  const start = Date.now();
  let response: Response;
  try {
    response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        // Enable prompt caching for system + tools (GA but still needs beta
        // header on the 2023-06-01 API version).
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return {
      ok: false,
      error: `Network error: ${(err as Error).message}`,
      raw: null,
      latencyMs: Date.now() - start,
    };
  }

  const latencyMs = Date.now() - start;

  if (!response.ok) {
    const errText = await response.text();
    return {
      ok: false,
      error: `Anthropic HTTP ${response.status}: ${errText.slice(0, 400)}`,
      raw: null,
      latencyMs,
    };
  }

  const payload = (await response.json()) as {
    content?: Array<{
      type: string;
      name?: string;
      input?: unknown;
      text?: string;
    }>;
    stop_reason?: string;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      cache_creation_input_tokens?: number;
      cache_read_input_tokens?: number;
    };
  };

  const usage = payload.usage
    ? {
        inputTokens: payload.usage.input_tokens ?? 0,
        outputTokens: payload.usage.output_tokens ?? 0,
        cacheCreationTokens:
          payload.usage.cache_creation_input_tokens ?? 0,
        cacheReadTokens: payload.usage.cache_read_input_tokens ?? 0,
      }
    : undefined;

  const toolUse = payload.content?.find(
    (block) => block.type === "tool_use" && block.name === PARSER_TOOL_NAME
  );
  if (!toolUse || !toolUse.input) {
    return {
      ok: false,
      error: `Anthropic returned no tool_use (stop_reason=${payload.stop_reason}).`,
      raw: payload,
      latencyMs,
    };
  }

  const validation = validateParsed(toolUse.input);
  if (!validation.ok || !validation.data) {
    return {
      ok: false,
      error: `Schema validation failed: ${validation.errors.join("; ")}`,
      raw: toolUse.input,
      latencyMs,
    };
  }

  const enforced = enforceCurrencyFromMessage(message, validation.data);

  return {
    ok: true,
    data: enforced.data,
    warnings: [...sanityCheck(enforced.data), ...enforced.warnings],
    raw: toolUse.input,
    latencyMs,
    usage,
  };
}

const CURRENCY_PATTERNS: Array<{
  re: RegExp;
  currency: "EUR" | "USD" | "TRY" | "GBP";
}> = [
  { re: /\$|\busd\b|\bdolar\b|\bdollar(s)?\b/i, currency: "USD" },
  { re: /€|\beur\b|\beuro(s)?\b/i, currency: "EUR" },
  { re: /₺|\btry\b|\btl\b|\blira\b/i, currency: "TRY" },
  { re: /£|\bgbp\b|\bpound(s)?\b|\bsterlin\b/i, currency: "GBP" },
];

function enforceCurrencyFromMessage(
  message: string,
  data: import("./schema").ParsedExternalJob
): {
  data: import("./schema").ParsedExternalJob;
  warnings: string[];
} {
  const detected = new Set<"EUR" | "USD" | "TRY" | "GBP">();
  for (const { re, currency } of CURRENCY_PATTERNS) {
    if (re.test(message)) detected.add(currency);
  }
  if (detected.size !== 1) return { data, warnings: [] };
  const [only] = Array.from(detected);
  if (only === data.currency) return { data, warnings: [] };
  return {
    data: { ...data, currency: only },
    warnings: [
      `Currency overridden from ${data.currency} to ${only} based on the message text — verify before saving.`,
    ],
  };
}
