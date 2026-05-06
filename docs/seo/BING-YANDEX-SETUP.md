# Bing + Yandex Webmaster Tools Setup

**Status (2026-05-06)**: Verification code support already wired in `src/app/layout.tsx` (lines 104-110). Just needs env vars set in Vercel.

IndexNow API ✅ already pushing to both Bing + Yandex (HTTP 200 confirmed). Webmaster Tools accounts give richer analytics + manual controls.

---

## A. Bing Webmaster Tools (5 dk)

1. Go to: https://www.bing.com/webmasters
2. Sign in with Google account (or Microsoft) — recommended: same Google account as GSC for "Import from GSC" feature
3. Add site: `https://merrysails.com`
4. Choose verification method: **HTML Meta Tag** (easiest)
5. Copy the `<meta name="msvalidate.01" content="XXXXXX">` content value
6. Add to Vercel env vars:
   ```
   NEXT_PUBLIC_BING_VERIFICATION=XXXXXX
   ```
7. Re-deploy → verify in Bing Webmaster UI
8. Submit sitemap: `https://merrysails.com/sitemap.xml`

**Bonus**: After verification, click "Import from Google Search Console" → instant migration of GSC sitemap + URL list. Saves manual work.

---

## B. Yandex Webmaster (5 dk)

1. Go to: https://webmaster.yandex.com/
2. Sign in (Google login OK)
3. Add site: `https://merrysails.com`
4. Choose verification method: **Meta tag**
5. Copy the `<meta name="yandex-verification" content="XXXXXX">` content value
6. Add to Vercel:
   ```
   NEXT_PUBLIC_YANDEX_VERIFICATION=XXXXXX
   ```
7. Re-deploy → verify in Yandex UI
8. Submit sitemap: `https://merrysails.com/sitemap.xml`

**Bonus 1**: Add Yandex.Metrica (free analytics, similar to GA4) for Russian-market behavior tracking.
**Bonus 2**: Yandex IKS (sicilik) score is a credibility signal in Russian SERPs.

---

## C. Why bother?

| Source | MerrySails 7-day sessions (2026-05-06 Clarity) |
|---|---|
| google.com | 95 (organic) |
| chatgpt.com | 56 (AI direct) |
| Direct | 73 |
| **bing.com** | 1 |
| duckduckgo.com | 2 |
| openai.com | 2 |

**Bing currently 1 session/week** — verification + sitemap submit could 5-10x it (Bing gets ~10% of search market in DE/UK, key markets).

**Yandex** — Russian-speaking tourists from RU/UA/KZ are a segment. Currently invisible. RU locale not yet active but DE/EN content can rank.

---

## D. Post-verification follow-up

1. **Bing → URL Inspection**: same as GSC, batch-check 56 not-indexed URLs
2. **Yandex Webmaster → Site Quality**: monitor IKS score
3. **Both → Submit IndexNow URLs**: already automated via `scripts/indexnow-push.mjs`
4. **DataForSEO live rank tracking**: extend cron to include Bing rankings (same script, different `search_engine` param)

---

*Setup blocked on user (5-10 dk total). When done, paste the 2 verification codes here for record.*
