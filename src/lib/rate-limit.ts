interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

declare global {
  var __merrysailsRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const store =
  globalThis.__merrysailsRateLimitStore ??
  (globalThis.__merrysailsRateLimitStore = new Map<string, RateLimitEntry>());

function pruneExpiredEntries(now: number) {
  if (store.size < 500) {
    return;
  }

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function consumeRateLimit(
  scope: string,
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  pruneExpiredEntries(now);

  const normalizedScope = scope.trim().toLowerCase() || "default";
  const normalizedKey = key.trim().toLowerCase() || "anonymous";
  const storeKey = `${normalizedScope}:${normalizedKey}`;
  const existing = store.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    store.set(storeKey, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      remaining: Math.max(options.limit - 1, 0),
      resetAt,
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  store.set(storeKey, existing);

  return {
    allowed: true,
    remaining: Math.max(options.limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}
