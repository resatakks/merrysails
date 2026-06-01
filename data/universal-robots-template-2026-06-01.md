# Universal robots.txt Template — All Sister Brands

**Last refresh**: 2026-06-01
**Vertical**: Tourism / cruise / yacht charter
**Apply to**: merrysails, goldensunsettour, merrytourism, kingsworldtransfer,
              pinogare, acilkaseniz, all future brands

---

## Why universal allowlist

All non-malicious bots should be explicitly allowed across every project.
Three reasons:

1. **Crawl budget**: some engines (Naver Yeti, Sogou) crawl conservatively
   unless their UA is named in robots.txt. `User-agent: *` is not enough.

2. **AI citation surface**: blocking AI training/live-fetch crawlers makes
   our brand invisible inside Claude/ChatGPT/Perplexity answers when real
   users ask about Istanbul cruises. AI citations are the new SERP.

3. **Defensive consistency**: identical robots.txt across brands prevents
   accidental "this site is restricted" SpamBrain flags that come from
   inconsistent crawler policy across sister-brand cluster.

---

## The complete bot list (29 names + `User-agent: *`)

### Search-engine indexers
- `*` (catch-all)
- `Googlebot`
- `Bingbot`
- `YandexBot`, `Yandex` (both UAs seen in logs)
- `Yeti` (Naver, Korea)
- `Daumoa` (Daum, Korea)
- `Sogou web spider`, `Sogou inst spider` (China)
- `Baiduspider` (China — limited without ICP but allow)
- `360Spider`, `HaosouSpider` (China — Qihoo 360)
- `PetalBot` (Huawei AppGallery / Petal Search)
- `SeznamBot` (Czech)
- `Applebot`, `Applebot-Webindex` (Apple search)
- `Brave-Search`, `Bravebot` (Brave Search)
- `DuckDuckBot` (DuckDuckGo)
- `MojeekBot` (Mojeek — independent EU)
- `search.marginalia.nu` (Marginalia — independent)
- `MicrosoftPreview` (Bing preview rendering)
- `iaskBot` (iAsk AI search)

### AI live-fetch bots (CRITICAL — answer-time citation)
- `Claude-User` (Anthropic — when user prompts Claude)
- `ChatGPT-User` (OpenAI — when user prompts ChatGPT)
- `Perplexity-User` (Perplexity — when user prompts)
- `OAI-SearchBot` (ChatGPT Search index)
- `Claude-Web` (legacy Anthropic live-fetch)

### AI training crawlers (allow — measured by citation count)
- `GPTBot` (OpenAI training)
- `ClaudeBot` (Anthropic training)
- `Anthropic-AI` (legacy)
- `Google-Extended` (Google AI Overviews + Gemini)
- `PerplexityBot` (Perplexity training)
- `Applebot-Extended` (Apple Intelligence)
- `Meta-ExternalAgent` (Meta AI)
- `Bytespider` (TikTok / ByteDance)
- `Gemini` (legacy Google AI)
- `CCBot` (Common Crawl)
- `Amazonbot` (Amazon AI)
- `cohere-ai` (Cohere)
- `YouBot` (You.com)
- `AI2Bot` (Allen Institute)
- `Diffbot` (knowledge graph)
- `FacebookBot` (Meta linking)

### SEO tool crawlers (allow — they don't compete with us, they audit us)
- `SemrushBot`
- `AhrefsBot`

---

## Sister-brand rollout checklist

For each sister brand:
- [ ] Copy MerrySails' `src/app/robots.txt/route.ts` as the template
- [ ] Update the `Host:` line + `Sitemap:` URL to the brand domain
- [ ] Update the brand-name comment header
- [ ] Keep the bot list verbatim
- [ ] Verify deploy → curl `<domain>/robots.txt` to confirm

---

## NEVER block (even if you think you should)

The following bots have been intentionally allowed and should NEVER be
moved to `Disallow:`. Blocking them silently kills AI visibility:

1. `Claude-User`, `ChatGPT-User`, `Perplexity-User`, `OAI-SearchBot` —
   blocking these = our content gone from real-time AI answers.
2. `Google-Extended` — blocking = excluded from AI Overviews + Gemini.
3. `Applebot-Extended` — blocking = excluded from Apple Intelligence.
4. `Bingbot`, `Yandex`, `YandexBot` — obvious.

---

## OK to block (legitimate reasons)

- Malicious / scraper bots not in the allowlist above
- Bots that misbehave (ignore crawl-delay, hit /api/ excessively)
- Specifically: `MJ12bot`, `dotbot`, `BLEXBot` if they cause server load
- `WhatsApp`/`Twitterbot` etc — these are OK to allow but they're only
  hitting one URL at a time (link previews), not relevant for indexation
