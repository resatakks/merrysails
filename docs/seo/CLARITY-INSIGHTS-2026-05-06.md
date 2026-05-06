# Clarity Behavioral Insights — 2026-05-06

**Source**: Microsoft Clarity 25-session sample, 2026-05-06.
**Total session count today**: ~25 unique recordings.

## 🚨 Critical UX bugs (fix this week)

### 1. Language switcher DEAD CLICKS (top priority)
- **Symptom**: Multiple sessions, users repeatedly click language menu but expected change doesn't occur
- **Affected sessions**: #19 (Turkey, 23 sec) and others noted in summary
- **Root cause hypothesis**: 
  - Locale switch may be slow due to Next.js route transition
  - Or visual feedback missing during loading
  - Or click target not registering (z-index?)
- **Action**:
  - Add loading spinner inside language menu when click triggers
  - Check `<select>` z-index in mobile (Safari especially)
  - Verify `router.push(/${locale}${pathname})` handler is wired
  - Add toast "Switching to Türkçe..." for user reassurance
- **Files to check**: `src/components/layout/Header.tsx`, language selector component

### 2. Reservation form RAGE CLICKS — departure time + transfer (conversion blocker)
- **Symptom**: Repeated clicks on departure-time / transfer-selection fields with no response
- **Root cause hypothesis**:
  - Custom select component slow render
  - Race condition: option list not ready when user clicks
  - Touch handler missing for mobile (rage clicks were on iOS Safari per session list)
- **Action**:
  - Audit `src/components/booking/` for time/transfer inputs
  - Replace custom `<div role=button>` with native `<select>` on mobile
  - Add visible loading state if options fetched async
  - **Conversion impact**: blocks payment flow, direct revenue
- **Verify after fix**: Clarity rage-click count for `/reservation` should drop to <2/week

### 3. Image gallery → no CTA conversion (lost intent)
- **Symptom**: Users click "tüm fotoğrafları görüntüle" repeatedly, browse 14+ images, then leave without booking action
- **Affected**: Sessions #14 (UK, 5:30, 45 clicks), #18 (Bosnia, 21:21, 35 clicks)
- **Action**: Add **floating sticky "Book Now"** CTA visible during gallery view
- **Quick win**: 1-2 days dev, potential booking lift 5-10%

---

## 📊 Traffic & Behavior Patterns

### Top entry pages (today)
| URL | Sessions | Avg duration |
|---|---|---|
| / (homepage) | 11 | varies (1s-21min) |
| /cruises/bosphorus-sunset-cruise | 3 (entry) + many exits | High (5:30 UK) |
| /istanbul-dinner-cruise | 2 entries + many exits | 5:50 (Poland ChatGPT) |
| /guides/ortakoy-mosque | 2 (both ChatGPT referrals!) | 1-5 sec (bounce) |
| /yacht-charter-istanbul | 2 entries | varies |
| /contact | 1 | 1:58 (Malaysia, 23 clicks) |

### 🌍 Geographic spread (positive — global reach growing)
- Turkey: 5 (mostly bounces, brand checks?)
- USA: 3
- UK: 3 (high-quality long sessions ✓)
- Mobile: ~70% (consistent with travel niche)
- Quality long sessions: UK x2, Bosnia, India, Poland (all >5 minutes)

### 🤖 ChatGPT-cited pages (NEW insight)
Today's sessions #1, #4, #16 all came via `?utm_source=chatgpt.com`:
- /guides/ortakoy-mosque — 2 sessions but BOUNCED (1-5 sec)
- /istanbul-dinner-cruise — 5:50 quality session

**Critical finding**: ChatGPT cites `/guides/ortakoy-mosque` but users bounce immediately because the **guide doesn't lead to commercial action**.

**Fix**: Add commercial CTA inside guide pages — "See this on a Bosphorus cruise" → /cruises/bosphorus-sunset-cruise

---

## 💡 SEO + GEO + AI Visibility action items

### SEO (organic search)
1. **Cannibalization fix** (already noted in KEYWORD-OPPORTUNITIES doc):
   - `/blog/best-bosphorus-cruise-istanbul-guide` ranking pos 48 for "bosphorus cruise" — should redirect or canonical to `/bosphorus-cruise` pillar

2. **Internal linking from /guides → commercial pages** (Clarity reveals AI-driven traffic to guides)

3. **Title rewrite** for low-CTR pages identified in GSC (>50 impressions, <2% CTR)

### GEO (geographic targeting)
1. **TR locale URLs not indexed** — IndexNow pushed today, monitor
2. **DE/FR/NL locale variants** — same priority
3. **UK + USA top quality traffic** — confirm hreflang en-GB, en-US served correctly
4. **Yandex** — Russian/Ukrainian/Kazakh markets visible, after Yandex Webmaster verify add Yandex.Metrica for behavioral data

### AI Visibility (LLM citations) — NEW DATA POINTS

| Platform | Brand search | Generic search | Verified |
|---|---|---|---|
| Perplexity | ✅ Detailed (10 sources) | ❌ | Today |
| **Yandex Yazeka** | ✅ **3-of-4 cited** | (untested) | Today |
| **Bing** | ✅ #1 organic | ❌ | Today |
| ChatGPT | ✅ Direct traffic 56/7d | ❌ | Today |

**4 of 4 AI providers** cite MerrySails for brand queries. **0 of 4** cite for generic intent.

**Root cause** (from earlier audit):
- TripAdvisor 1,300+ reviews barrier
- Brand-keyword fusion (competitor name = exact keyword)
- Aggregator listing absence (GetYourGuide deferred per user)

**Critical action**: TripAdvisor business claim is the highest-ROI single move.

---

## 🎯 Concrete next-week tasks

| P | Task | Owner | Est. impact |
|---|---|---|---|
| P0 | Fix language switcher dead clicks | Dev | +5-10% mobile UX |
| P0 | Fix reservation form rage clicks (time + transfer) | Dev | +direct revenue |
| P0 | TripAdvisor business claim + email past customers for reviews | User | +AI generic visibility |
| P1 | Add sticky "Book Now" CTA in image gallery | Dev | +5-10% conversion |
| P1 | Add commercial CTA in /guides/* pages (ChatGPT entry pages) | Dev | +AI traffic conversion |
| P2 | Cannibalization fix: blog → pillar canonical | SEO | top 10 within 4 weeks |
| P2 | Yandex.Metrica install (Russian market behavioral data) | SEO | new market visibility |

---

## 📈 Trend to monitor weekly (Clarity dashboard)

- **Rage clicks per session** — target <0.1/session (today ~0.4 on /reservation)
- **Dead clicks per page** — target <0.05 on language switcher
- **ChatGPT referral conversion** — currently 1 booking out of 56 sessions = 1.8% (bench: 3-5% target)
- **Geographic diversity** — DACH (DE/AT/CH) growth post Bing/Yandex verify
- **Image gallery → reservation rate** — need event tracking
