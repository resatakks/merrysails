import "server-only";

// Conservative: only TLDs almost exclusively used by spam farms.
// Excluded ambiguous ones (.pro, .shop, .us, .info, .work, .live) — they have
// legitimate businesses too. We rely on toxic-keyword + high spam_score for those.
export const TOXIC_TLDS = [
  ".ga", ".cf", ".tk", ".ml", ".gq",
  ".click", ".link", ".xyz", ".icu", ".top",
  ".bid", ".loan", ".review", ".win", ".party",
  ".trade", ".download", ".stream", ".science",
  ".cv", ".wf",
];

// Only patterns that are unambiguously spam-directory or PBN naming.
// Generic words like "backlinks" alone removed — too broad, can hit legit SEO sites.
export const TOXIC_KEYWORDS = [
  "skyrocket",
  "wheretobuy",
  "allexpired", "expireddomain", "newlyregdd",
  "simplewebdirectory", "urls-shortener", "shortenurls",
  "websiterace", "siterace",
  "what-happens", "belonna", "sergechel",
  "tkdlab", "musweb", "topsitenet",
  "seobacklinks", "rankgrow", "booksreadr",
  "katmoviehd", "screenshots.wiki",
  "way2check", "thebestbacklinks", "browseallexpired",
  "submiturl", "freedirect",
  "australianwebdirectory", "globalecommerce",
];

export type RefDomain = {
  domain: string;
  rank: number;
  backlinks: number;
  spamScore: number;
};

export type Classification =
  | { toxic: true; reason: string }
  | { toxic: false; review: true }
  | { toxic: false; review: false };

// Conservative policy: only disavow links the user CLEARLY did NOT pay for.
// Anything with non-trivial authority OR ambiguous spam score is preserved —
// the user buys directory packages (.com.tr etc.) and those still pass authority.
export function classifyRefDomain(d: RefDomain): Classification {
  const dom = (d.domain || "").toLowerCase();
  const spam = d.spamScore;
  if (TOXIC_TLDS.some((t) => dom.endsWith(t))) return { toxic: true, reason: "toxic-TLD" };
  if (TOXIC_KEYWORDS.some((k) => dom.includes(k))) return { toxic: true, reason: "toxic-keyword" };
  if (spam >= 60) return { toxic: true, reason: `high-spam(${spam})` };
  // Everything else — including .com.tr directories with spam 20-50 — is KEPT.
  // Authority is authority.
  return { toxic: false, review: false };
}

export async function fetchReferringDomains(target: string): Promise<RefDomain[]> {
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) throw new Error("DATAFORSEO credentials missing");
  const auth = "Basic " + Buffer.from(`${login}:${password}`).toString("base64");

  const r = await fetch("https://api.dataforseo.com/v3/backlinks/referring_domains/live", {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify([
      {
        target,
        include_subdomains: true,
        limit: 1000,
        backlinks_status_type: "live",
        order_by: ["backlinks_spam_score,desc"],
      },
    ]),
  });
  const j = await r.json();
  const items = j?.tasks?.[0]?.result?.[0]?.items ?? [];
  return items.map((it: { domain?: string; rank?: number; backlinks?: number; backlinks_spam_score?: number }) => ({
    domain: it.domain || "",
    rank: it.rank || 0,
    backlinks: it.backlinks || 0,
    spamScore: it.backlinks_spam_score ?? 0,
  }));
}

export type ToxicEntry = RefDomain & { reason: string };

export type AuditResult = {
  domain: string;
  total: number;
  toxic: ToxicEntry[];
  review: RefDomain[];
};

export async function auditDomain(target: string): Promise<AuditResult> {
  const refs = await fetchReferringDomains(target);
  const toxic: ToxicEntry[] = [];
  const review: RefDomain[] = [];
  for (const r of refs) {
    const c = classifyRefDomain(r);
    if (c.toxic) toxic.push({ ...r, reason: c.reason });
    else if (c.review) review.push(r);
  }
  return { domain: target, total: refs.length, toxic, review };
}

export function generateDisavowFile(audit: AuditResult, runAt: Date): string {
  const date = runAt.toISOString().slice(0, 10);
  const lines = [
    `# Disavow file for ${audit.domain}`,
    `# Generated: ${date}`,
    `# Total ref domains scanned: ${audit.total}`,
    `# Toxic disavowed: ${audit.toxic.length}`,
    `# Review pending (not disavowed): ${audit.review.length}`,
    "",
    ...audit.toxic.map((t) => `domain:${t.domain}`),
  ];
  return lines.join("\n") + "\n";
}

export function diffToxic(prev: ToxicEntry[] | null, curr: ToxicEntry[]): { added: ToxicEntry[]; removed: ToxicEntry[] } {
  if (!prev) return { added: curr, removed: [] };
  const prevSet = new Set(prev.map((p) => p.domain));
  const currSet = new Set(curr.map((c) => c.domain));
  const added = curr.filter((c) => !prevSet.has(c.domain));
  const removed = prev.filter((p) => !currSet.has(p.domain));
  return { added, removed };
}
