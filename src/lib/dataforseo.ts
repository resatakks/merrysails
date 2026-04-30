/**
 * DataForSEO API wrapper
 * Docs: https://docs.dataforseo.com
 *
 * Usage across projects: copy this file, change KEYWORDS config below.
 * Auth: Basic auth (login:password Base64-encoded)
 */

const BASE_URL = "https://api.dataforseo.com/v3";

function authHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN ?? "";
  const password = process.env.DATAFORSEO_PASSWORD ?? "";
  return "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
}

async function dfsPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

async function dfsGet<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────

export interface SerpResult {
  keyword: string;
  locationCode: number;
  languageCode: string;
  rank: number | null;       // 1-based position in organic results (null = not in top 100)
  url: string | null;
  title: string | null;
  snippet: string | null;
  totalResults: number;
  checkedAt: string;         // ISO timestamp
}

export interface RankingRow {
  keyword: string;
  rank: number | null;
  url: string | null;
  change: number | null;     // vs previous check
}

// ─── SERP — Organic rank check ────────────────────────────────

/**
 * Check where a domain ranks for given keywords.
 * Returns one SerpResult per keyword.
 *
 * locationCode: 2792 = Turkey, 2826 = UK, 2840 = US
 * languageCode: "tr", "en"
 */
export async function checkRankings(
  domain: string,
  keywords: string[],
  locationCode = 2792,
  languageCode = "tr"
): Promise<SerpResult[]> {
  // DataForSEO accepts up to 100 tasks per request
  const tasks = keywords.map((kw) => ({
    keyword: kw,
    location_code: locationCode,
    language_code: languageCode,
    device: "desktop",
    os: "windows",
    depth: 100, // check top 100 results
  }));

  type DfsResponse = {
    tasks?: Array<{
      data?: { keyword?: string; location_code?: number; language_code?: string };
      result?: Array<{
        total_count?: number;
        items?: Array<{
          type?: string;
          rank_absolute?: number;
          url?: string;
          title?: string;
          description?: string;
        }>;
      }>;
    }>;
  };

  const response = await dfsPost<DfsResponse>(
    "/serp/google/organic/live/advanced",
    tasks
  );

  const now = new Date().toISOString();

  return (response.tasks ?? []).map((task) => {
    const keyword = task.data?.keyword ?? "";
    const resultItems = task.result?.[0]?.items ?? [];
    const totalResults = task.result?.[0]?.total_count ?? 0;

    // Find the first organic result matching the domain
    const match = resultItems.find(
      (item) =>
        item.type === "organic" &&
        item.url &&
        item.url.includes(domain)
    );

    return {
      keyword,
      locationCode: task.data?.location_code ?? locationCode,
      languageCode: task.data?.language_code ?? languageCode,
      rank: match?.rank_absolute ?? null,
      url: match?.url ?? null,
      title: match?.title ?? null,
      snippet: match?.description ?? null,
      totalResults,
      checkedAt: now,
    };
  });
}

// ─── Backlinks — domain backlink summary ─────────────────────

export interface BacklinkSummary {
  domain: string;
  totalBacklinks: number;
  referringDomains: number;
  domainRank: number;
  checkedAt: string;
}

export async function getBacklinkSummary(
  domain: string
): Promise<BacklinkSummary> {
  type BLResponse = {
    tasks?: Array<{
      result?: Array<{
        total_count?: number;
        referring_domains?: number;
        rank?: number;
      }>;
    }>;
  };

  const response = await dfsPost<BLResponse>(
    "/backlinks/summary/live",
    [{ target: domain, limit: 1 }]
  );

  const result = response.tasks?.[0]?.result?.[0];
  return {
    domain,
    totalBacklinks: result?.total_count ?? 0,
    referringDomains: result?.referring_domains ?? 0,
    domainRank: result?.rank ?? 0,
    checkedAt: new Date().toISOString(),
  };
}

// ─── LLM Mentions — AI visibility ────────────────────────────

export interface LlmMention {
  query: string;
  model: string;
  mentioned: boolean;
  rank: number | null;
  snippet: string | null;
  checkedAt: string;
}

/**
 * Check if brand appears in AI/LLM responses.
 * Requires LLM Mentions API access (paid add-on).
 */
export async function checkLlmMentions(
  brand: string,
  queries: string[]
): Promise<LlmMention[]> {
  type LLMResponse = {
    tasks?: Array<{
      data?: { keyword?: string };
      result?: Array<{
        type?: string;
        items?: Array<{
          type?: string;
          domain?: string;
          title?: string;
          rank_absolute?: number;
          description?: string;
        }>;
      }>;
    }>;
  };

  const tasks = queries.map((q) => ({
    keyword: q,
    se_type: "perplexity", // or "chatgpt", "gemini"
    device: "desktop",
  }));

  const response = await dfsPost<LLMResponse>(
    "/serp/perplexity/organic/live/advanced",
    tasks
  );

  const now = new Date().toISOString();

  return (response.tasks ?? []).map((task) => {
    const query = task.data?.keyword ?? "";
    const items = task.result?.[0]?.items ?? [];
    const match = items.find(
      (item) => item.domain && item.domain.includes(brand)
    );

    return {
      query,
      model: "perplexity",
      mentioned: !!match,
      rank: match?.rank_absolute ?? null,
      snippet: match?.description ?? null,
      checkedAt: now,
    };
  });
}

// ─── Account balance check ────────────────────────────────────

export async function getBalance(): Promise<{ balance: number; currency: string }> {
  const r = await dfsGet<{ money?: { balance?: number; currency?: string } }>(
    "/appendix/user_data"
  );
  return {
    balance: r.money?.balance ?? 0,
    currency: r.money?.currency ?? "USD",
  };
}
