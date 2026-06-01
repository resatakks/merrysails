/**
 * robots.txt for MerrySails
 *
 * AI bot policy notes (2026-05-30 audit — Perplexity research backs this up):
 *
 *   USER-TRIGGERED LIVE-FETCH BOTS (NOT training crawlers)
 *   These hit our pages only when a real user asks Claude / ChatGPT /
 *   Perplexity a question. Blocking them = our content is invisible inside
 *   the answer. Explicit Allow: / is defensive, not stylistic.
 *     - Claude-User          (Claude live search on user prompts)
 *     - ChatGPT-User         (ChatGPT live search on user prompts)
 *     - Perplexity-User      (Perplexity live fetch on user prompts)
 *     - OAI-SearchBot        (ChatGPT Search index — answers engine)
 *
 *   TRAINING / AI-OVERVIEWS CRAWLERS (separately decided)
 *   These read at scale to feed model training or AI Overviews. We allow
 *   them by default because brand visibility in AI answers is worth the
 *   reuse. Flip to Disallow if commercial copy starts showing up verbatim.
 *     - GPTBot               (OpenAI training)
 *     - ClaudeBot            (Anthropic training)
 *     - Google-Extended      (Google AI Overviews + Gemini training)
 *     - PerplexityBot        (Perplexity training)
 *     - Applebot-Extended    (Apple Intelligence training)
 *     - Meta-ExternalAgent   (Meta AI training)
 *     - Anthropic-AI, Claude-Web (legacy Anthropic UAs, still seen in logs)
 *
 *   SEARCH-ENGINE INDEXERS
 *     - Googlebot, Bingbot, YandexBot, Yandex, Applebot, Brave-Search, etc.
 */
export function GET() {
  const robotsTxt = `# MerrySails — Bosphorus Cruise & Yacht Charter
# https://merrysails.com

User-agent: *
Content-Signal: search=yes, ai-train=no, ai-input=yes
Allow: /
Disallow: /api/
# Next.js framework assets — never index these, they waste crawl budget and
# show up as "Crawled - currently not indexed" in GSC.
Disallow: /_next/static/
Disallow: /_next/data/
Disallow: /_next/image
# Private/auth surfaces — keep crawlers off entirely.
Disallow: /admin/
Disallow: /unsubscribe

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# OpenAI — training crawler (decided allow, monitor citations)
User-agent: GPTBot
Allow: /

# OpenAI — user-triggered live fetch (ChatGPT browsing on user prompts).
# MUST stay allowed or ChatGPT can't quote us in real-time answers.
User-agent: ChatGPT-User
Allow: /

# OpenAI — ChatGPT Search index (answers engine).
User-agent: OAI-SearchBot
Allow: /

# Anthropic — training crawler (decided allow, monitor citations)
User-agent: ClaudeBot
Allow: /

# Anthropic — user-triggered live fetch (Claude browsing on user prompts).
# MUST stay allowed or Claude can't quote us in real-time answers.
User-agent: Claude-User
Allow: /

# Anthropic — legacy training UA, still seen in logs
User-agent: Anthropic-AI
Allow: /

# Anthropic — legacy live-fetch UA
User-agent: Claude-Web
Allow: /

# Google — AI Overviews + Gemini training opt-in (decided allow)
User-agent: Google-Extended
Allow: /

# Perplexity — training crawler
User-agent: PerplexityBot
Allow: /

# Perplexity — user-triggered live fetch on user prompts. MUST stay allowed.
User-agent: Perplexity-User
Allow: /

User-agent: Gemini
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: YouBot
Allow: /

# Apple Intelligence training opt-in
User-agent: Applebot-Extended
Allow: /

User-agent: Applebot-Webindex
Allow: /

# Meta AI training opt-in
User-agent: Meta-ExternalAgent
Allow: /

User-agent: Yandex
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Brave-Search
Allow: /

User-agent: Bravebot
Allow: /

User-agent: MicrosoftPreview
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: iaskBot
Allow: /

User-agent: AI2Bot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: AhrefsBot
Allow: /

# === Multi-engine push (2026-06-01) ===
# East-Asia search engines + Russian/Czech/Korean — explicit Allow keeps
# crawlers active even when our default User-agent: * already permits them.
# This matters because some engines (Naver/Yeti, Sogou) crawl conservatively
# unless they see their UA listed by name.

# Naver — Korean search market leader. Korean tourists to Istanbul are a
# meaningful segment (~600k/year inbound to Türkiye).
User-agent: Yeti
Allow: /

# Daum — secondary Korean engine.
User-agent: Daumoa
Allow: /

# Sogou — Chinese search engine (3rd after Baidu and Shenma). Crawls .com
# domains without ICP licence, unlike Baidu spider.
User-agent: Sogou web spider
Allow: /

User-agent: Sogou inst spider
Allow: /

# Baidu — Chinese search market leader. Limited indexation for non-.cn
# without ICP, but BaiduSpider still crawls and ranks for some queries.
User-agent: Baiduspider
Allow: /

# 360 Search (Haosou / Qihoo) — second-tier Chinese engine.
User-agent: 360Spider
Allow: /

User-agent: HaosouSpider
Allow: /

# Seznam — Czech search engine. Slovakian / Czech tourists segment.
User-agent: SeznamBot
Allow: /

# DuckDuckGo — pulls from Bing index but has own crawler too. Privacy-
# conscious EU/US visitor segment.
User-agent: DuckDuckBot
Allow: /

# Mojeek — independent EU search engine, growing 2025-2026.
User-agent: MojeekBot
Allow: /

# Marginalia — independent search engine, frequently used by AI tools.
User-agent: search.marginalia.nu
Allow: /

# Petal — Huawei AppGallery / Petal Search (Android Asian market).
User-agent: PetalBot
Allow: /

Host: https://merrysails.com
Sitemap: https://merrysails.com/sitemap.xml

# AI content files
# https://merrysails.com/llms.txt
# https://merrysails.com/llms-full.txt
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
