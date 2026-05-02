import { NextRequest, NextResponse } from "next/server";

function isSuspiciousServerActionProbe(request: NextRequest): boolean {
  return (
    request.method === "POST" &&
    request.nextUrl.pathname === "/" &&
    request.headers.has("next-action")
  );
}

// Penetration-testing / attack tools — block on sight.
// Strictly tools that have no legitimate reason to access a public site.
// SEO crawlers (MJ12, PetalBot, AhrefsBot, SemrushBot, DataForSEOBot, etc.)
// are NOT included here — they may surface authority signals or fix "blocked"
// reports we rely on for analysis.
const HOSTILE_UA_FRAGMENTS = [
  "zgrab",
  "masscan",
  "nmap",
  "sqlmap",
  "nikto",
  "dirbuster",
  "gobuster",
  "wpscan",
  "hydra",
  "fimap",
  "joomscan",
  "acunetix",
  "nessus",
  "openvas",
  "qualys",
  "havij",
  "appscan",
  "webinspect",
  "skipfish",
  "wfuzz",
  "feroxbuster",
];

function shouldHardBlock(ua: string): boolean {
  const lower = ua.toLowerCase();
  for (const f of HOSTILE_UA_FRAGMENTS) if (lower.includes(f)) return true;
  return false;
}

// ─── Bot / AI crawler detection ────────────────────────────

const BOT_FINGERPRINTS: [string, string][] = [
  ["GPTBot", "openai"],
  ["ChatGPT-User", "openai"],
  ["OAI-SearchBot", "openai"],
  ["ClaudeBot", "anthropic"],
  ["Anthropic-AI", "anthropic"],
  ["Claude-Web", "anthropic"],
  ["anthropic-ai", "anthropic"],
  ["PerplexityBot", "perplexity"],
  ["Perplexity-User", "perplexity"],
  ["Google-Extended", "google-ai"],
  ["Gemini", "google-ai"],
  ["Meta-ExternalAgent", "meta"],
  ["FacebookBot", "meta"],
  ["Bytespider", "bytedance"],
  ["CCBot", "commoncrawl"],
  ["YouBot", "you"],
  ["cohere-ai", "cohere"],
  ["Diffbot", "diffbot"],
  ["AI2Bot", "ai2"],
  ["iaskBot", "iask"],
  ["Applebot-Extended", "apple-ai"],
  ["Googlebot", "googlebot"],
  ["Bingbot", "bing"],
  ["MicrosoftPreview", "bing"],
  ["YandexBot", "yandex"],
  ["SemrushBot", "semrush"],
  ["AhrefsBot", "ahrefs"],
];

function detectBot(ua: string): { agent: string; provider: string } | null {
  const lower = ua.toLowerCase();
  for (const [agent, provider] of BOT_FINGERPRINTS) {
    if (lower.includes(agent.toLowerCase())) {
      return { agent, provider };
    }
  }
  return null;
}

export function proxy(request: NextRequest) {
  if (isSuspiciousServerActionProbe(request)) {
    return new NextResponse(null, { status: 204 });
  }

  const ua = request.headers.get("user-agent") ?? "";

  if (shouldHardBlock(ua)) {
    return new NextResponse(null, {
      status: 403,
      headers: { "x-blocked-reason": "hostile-or-toxic-ua" },
    });
  }

  const bot = detectBot(ua);

  if (bot) {
    // Fire-and-forget — never blocks the crawler
    fetch(`${request.nextUrl.origin}/api/bot-visit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        provider: bot.provider,
        agent: bot.agent,
        path: request.nextUrl.pathname,
        userAgent: ua.slice(0, 512),
        ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        country: request.headers.get("x-vercel-ip-country") ?? null,
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Server Action probe guard: root only
    // Bot tracking: all public routes except static assets and the logging endpoint
    "/((?!_next/static|_next/image|favicon|api/bot-visit|.*\\.(?:ico|png|jpg|jpeg|svg|webp|woff2?|css|js)).*)",
  ],
};
