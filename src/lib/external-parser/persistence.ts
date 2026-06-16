/**
 * Wraps parseExternalMessage with ParseLog persistence (audit trail) and
 * ParseSession creation (state machine). Returns the session id which the
 * bot uses in callback_data.
 *
 * Idempotency: same (chatId, messageHash) within 1 hour returns the existing
 * pending session rather than creating a new one. Prevents accidental
 * double-forwards from creating duplicate parses.
 */

import { createHash } from "crypto";
import { prisma } from "@/lib/db";
import { parseExternalMessage } from "./parse";
import type { ParsedExternalJob } from "./schema";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const DEDUP_WINDOW_MS = 60 * 60 * 1000; // 1h

// Per-token pricing — auto-selected from model id, defaults to Haiku 3.5.
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  "claude-3-5-haiku-20241022": { input: 0.8, output: 4.0 },
  "claude-3-haiku-20240307": { input: 0.25, output: 1.25 },
  "claude-haiku-4-5-20251001": { input: 1.0, output: 5.0 },
  "claude-sonnet-4-6-20250101": { input: 3.0, output: 15.0 },
};
const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MODEL_NAME =
  process.env.ANTHROPIC_PARSER_MODEL?.trim() || DEFAULT_MODEL;
const PRICING = MODEL_PRICING[MODEL_NAME] ?? MODEL_PRICING[DEFAULT_MODEL];
const COST_PER_INPUT_TOKEN_USD = PRICING.input / 1_000_000;
const COST_PER_OUTPUT_TOKEN_USD = PRICING.output / 1_000_000;
// Prompt-cache pricing modifiers (Anthropic standard):
const CACHE_WRITE_MULTIPLIER = 1.25; // first call seeds cache, costs extra
const CACHE_READ_MULTIPLIER = 0.1; // hits cost 10% of normal input

export interface ParseAndPersistResult {
  sessionId: string;
  /** True when an existing pending session was returned (idempotency). */
  reused: boolean;
  data: ParsedExternalJob;
  warnings: string[];
}

export interface ParseAndPersistFailure {
  error: string;
  logId: string;
}

export type ParseAndPersistOutcome =
  | { ok: true; result: ParseAndPersistResult }
  | { ok: false; failure: ParseAndPersistFailure };

function hashMessage(message: string): string {
  return createHash("sha256").update(normalizeForHash(message)).digest("hex").slice(0, 32);
}

/**
 * Normalize whitespace + WhatsApp metadata before hashing so trivially-
 * different forwards (different timestamp prefix, extra newlines) dedup
 * against each other.
 */
function normalizeForHash(message: string): string {
  return message
    .replace(/\[\d{1,2}\.\d{1,2}\.\d{2,4}[^\]]*\]/g, "") // strip [12.06.2026 11:45:46]
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const LLM_CACHE_LOOKBACK_MS = 24 * 60 * 60 * 1000; // 24h — skip LLM if same hash succeeded recently

function approxTokens(text: string): number {
  // Cheap heuristic — actual Anthropic billing reports come back via the API
  // response.usage block, but we don't always have it (errors).
  return Math.ceil(text.length / 4);
}

/**
 * Retry policy: Anthropic occasionally returns 5xx (server-side hiccup) or
 * 529 (overload). We retry up to 2 times with exponential backoff. 4xx
 * (e.g. rate limit 429, auth 401) is NOT retried — those indicate
 * configuration issues the operator should see immediately.
 */
async function parseWithRetry(
  message: string,
  brand: "merrysails" | "goldensunsettour" | "merrytourism"
) {
  const maxAttempts = 3;
  let lastResult: Awaited<ReturnType<typeof parseExternalMessage>> | null = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    lastResult = await parseExternalMessage(message, brand);
    if (lastResult.ok) return lastResult;
    const errStr = lastResult.error ?? "";
    // Retry only on transient signals.
    const retryable =
      errStr.includes("HTTP 5") || errStr.includes("529") || errStr.includes("Network error");
    if (!retryable || attempt === maxAttempts) return lastResult;
    // Exponential backoff: 500ms, 1500ms.
    await new Promise((r) => setTimeout(r, 500 * Math.pow(3, attempt - 1)));
  }
  return lastResult!;
}

export async function parseAndPersist(
  message: string,
  chatId: string,
  brand: "merrysails" | "goldensunsettour" | "merrytourism" = "merrysails"
): Promise<ParseAndPersistOutcome> {
  const messageHash = hashMessage(message);

  // ── Idempotency 1: same operator, same content, still in pending state ──
  const dedupSince = new Date(Date.now() - DEDUP_WINDOW_MS);
  const existing = await prisma.parseSession.findFirst({
    where: {
      chatId,
      messageHash,
      state: "pending",
      createdAt: { gte: dedupSince },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    return {
      ok: true,
      result: {
        sessionId: existing.id,
        reused: true,
        data: existing.parsedData as unknown as ParsedExternalJob,
        warnings: [],
      },
    };
  }

  // ── Cache layer: skip LLM if same hash was successfully parsed in the
  //    last 24h (any operator). Reuses the parsedJson and creates a fresh
  //    session for THIS operator. Saves an LLM call entirely. ──
  const cacheSince = new Date(Date.now() - LLM_CACHE_LOOKBACK_MS);
  const cachedLog = await prisma.parseLog.findFirst({
    where: {
      messageHash,
      brand,
      outcome: { not: "error" },
      parsedJson: { not: { equals: null } },
      createdAt: { gte: cacheSince },
    },
    orderBy: { createdAt: "desc" },
  });

  if (cachedLog?.parsedJson) {
    const cached = cachedLog.parsedJson as unknown as ParsedExternalJob;
    const session = await prisma.parseSession.create({
      data: {
        chatId,
        brand,
        originalMessage: message,
        messageHash,
        parsedData: cached as unknown as object,
        intent: cached.intent,
        referenceId: cached.referenceId,
        state: "pending",
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });
    // Log the cache hit (zero cost) so /yenis_maliyet shows accurate stats.
    await prisma.parseLog.create({
      data: {
        chatId,
        brand,
        messageHash,
        messageText: message,
        model: MODEL_NAME + " [cache]",
        latencyMs: 0,
        confidence: cached.confidence,
        inputTokens: 0,
        outputTokens: 0,
        costUsd: 0,
        parsedJson: cached as unknown as object,
        warnings: ["Cache hit — LLM not called"],
        outcome: "pending",
      },
    });
    return {
      ok: true,
      result: {
        sessionId: session.id,
        reused: false,
        data: cached,
        warnings: [
          "♻️ Aynı içerik son 24 saat içinde parse edilmiş — cache kullanıldı (LLM çağrılmadı).",
        ],
      },
    };
  }

  // ── Run parse with retry-on-5xx ──
  const result = await parseWithRetry(message, brand);

  if (!result.ok) {
    const log = await prisma.parseLog.create({
      data: {
        chatId,
        brand,
        messageHash,
        messageText: message,
        model: MODEL_NAME,
        latencyMs: result.latencyMs,
        errorMessage: result.error,
        outcome: "error",
      },
    });
    return {
      ok: false,
      failure: { error: result.error, logId: log.id },
    };
  }

  // ── Log + create session in one transaction ──
  // Prefer Anthropic's reported usage; fall back to character-based heuristic
  // if the response payload didn't include it (unusual path, e.g. cached).
  const inputTokens =
    result.usage?.inputTokens ?? approxTokens(message) + 600;
  const outputTokens =
    result.usage?.outputTokens ?? approxTokens(JSON.stringify(result.raw));
  const cacheCreationTokens = result.usage?.cacheCreationTokens ?? 0;
  const cacheReadTokens = result.usage?.cacheReadTokens ?? 0;
  const costUsd =
    inputTokens * COST_PER_INPUT_TOKEN_USD +
    cacheCreationTokens * COST_PER_INPUT_TOKEN_USD * CACHE_WRITE_MULTIPLIER +
    cacheReadTokens * COST_PER_INPUT_TOKEN_USD * CACHE_READ_MULTIPLIER +
    outputTokens * COST_PER_OUTPUT_TOKEN_USD;

  const [session] = await prisma.$transaction([
    prisma.parseSession.create({
      data: {
        chatId,
        brand,
        originalMessage: message,
        messageHash,
        parsedData: result.data as unknown as object,
        intent: result.data.intent,
        referenceId: result.data.referenceId,
        state: "pending",
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    }),
    prisma.parseLog.create({
      data: {
        chatId,
        brand,
        messageHash,
        messageText: message,
        model: MODEL_NAME,
        latencyMs: result.latencyMs,
        confidence: result.data.confidence,
        inputTokens,
        outputTokens,
        costUsd,
        parsedJson: result.data as unknown as object,
        warnings: result.warnings,
        outcome: "pending",
      },
    }),
  ]);

  return {
    ok: true,
    result: {
      sessionId: session.id,
      reused: false,
      data: result.data,
      warnings: result.warnings,
    },
  };
}

/**
 * Merge operator overrides on top of the original parse before finalizing.
 * Overrides are field-keyed JSON written when operator edits a value.
 */
export function applyOverrides(
  base: ParsedExternalJob,
  overrides: Record<string, unknown>
): ParsedExternalJob {
  return { ...base, ...overrides } as ParsedExternalJob;
}

/**
 * Mark session + log outcome after operator decision. Idempotent — calling
 * twice with same outcome is a no-op.
 */
export async function recordOutcome(
  sessionId: string,
  outcome: "confirmed" | "edited" | "cancelled",
  details?: { createdRecordId?: string; createdRecordType?: "reservation" | "external" }
): Promise<void> {
  const session = await prisma.parseSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) return;

  await prisma.$transaction([
    prisma.parseSession.update({
      where: { id: sessionId },
      data: {
        state: outcome === "edited" ? "pending" : outcome,
        createdRecordId: details?.createdRecordId ?? session.createdRecordId,
        createdRecordType:
          details?.createdRecordType ?? session.createdRecordType,
      },
    }),
    prisma.parseLog.updateMany({
      where: {
        chatId: session.chatId,
        messageHash: session.messageHash,
        outcome: "pending",
      },
      data: { outcome },
    }),
  ]);
}
