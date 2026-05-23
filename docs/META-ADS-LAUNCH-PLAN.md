# Meta Ads Launch Plan — MerrySails

**Drafted:** 2026-05-23
**Budget:** ₺1,000–₺1,500 / day total
**Owner:** Reşat (account creation), Bot (tracking + creatives + ongoing optimisation)

---

## 1. Pre-launch checklist (5 items, before any ad goes live)

| # | Task | Who | Status |
|---|------|-----|---|
| 1 | Create new Meta Business Account from scratch with `info@merrysails.com` | Reşat | ⏳ |
| 2 | Create Facebook Page "MerrySails" (logo: `public/logo.svg`, cover: `public/ads/meta/branded/yacht_bodrum_goldenhour_2026-05-22_BRANDED.png`) | Reşat | ⏳ |
| 3 | Add `merrysails.com` as a verified domain (DNS TXT record) | Reşat | ⏳ |
| 4 | Create new Meta Pixel inside Events Manager → copy the 16-digit Pixel ID | Reşat | ⏳ |
| 5 | Generate a System User permanent access token for CAPI (Events Manager → Settings → Conversions API) | Reşat | ⏳ |

After step 4-5, set Vercel env vars and the site auto-fires Pixel + CAPI (code already deployed):

```env
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456     # public, fine to expose
META_CAPI_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxx     # server-only secret
META_CAPI_TEST_EVENT_CODE=TEST12345            # OPTIONAL — dry-run testing
```

**Verify CAPI is live** by hitting `https://merrysails.com/api/meta-capi` (GET) — must return `{"ok": true, "configured": true}`.

---

## 2. Tracking architecture (already deployed)

### What fires automatically once env vars are set

| User action | Pixel event | CAPI event | Conversion value | Notes |
|---|---|---|---:|---|
| Page load (any) | `PageView` | `PageView` | — | Auto-fires on init |
| Booking modal opens | `InitiateCheckout` | mirror | tour price × guests | with content_ids, num_items |
| Booking submit success | `Purchase` | mirror (PII hashed) | total | email/phone hashed server-side |
| Booking abandoned | `AddToCart` | mirror | tour value | retargeting signal |
| Contact form submitted | `Lead` | mirror | ₺10 (config) | with email + name |
| WhatsApp button clicked | `Lead` | mirror | ₺15 (config) | high-intent signal |
| Phone button clicked | `Contact` | mirror | ₺5 (config) | |

### Why CAPI is critical

Pixel-only conversion tracking on iOS 14+ loses **30–60%** of events to ATT, ad blockers, and 3rd-party cookie restrictions. The CAPI mirror sends the **same event_id** server-to-server, recovering 60–75% of that lost signal. Meta dedups Pixel+CAPI as a single conversion — no double-counting.

### Match keys we pass (hashed SHA-256 server-side)

- `em` (email) — when collected
- `ph` (phone E.164) — when collected
- `fn`/`ln` (first/last name) — when collected
- `external_id` — reservation ID for purchases
- `_fbp` cookie — browser ID (never hashed)
- `_fbc` cookie — click ID from fbclid (never hashed)
- `client_ip_address` + `client_user_agent` — auto-extracted from request

**WhatsApp click attribution preserved**: when a user lands from a Meta ad and clicks WhatsApp, the `fbc` cookie travels server-side via CAPI — Meta credits the conversion even though the user leaves the browser.

---

## 3. Creative assets (READY)

5 × 1080×1080 branded images at `public/ads/meta/branded/`:

| Product | File | Headline | CTA |
|---|---|---|---|
| **Sunset cruise** | `captain_helm_sunset_2026-05-22_BRANDED.png` | "BOSPHORUS SUNSET CRUISE — From €30" | BOOK ON MERRYSAILS.COM |
| **Dinner cruise** | `yacht_deck_dinner_2026-05-22_BRANDED.png` | "LÜKS YEMEKLİ YAT TURU" | HEMEN FİYAT AL |
| **Yacht charter Bodrum** | `yacht_bodrum_goldenhour_2026-05-22_BRANDED.png` | "PRIVATE YACHT CHARTER" | WHATSAPP'TAN REZERVE ET |
| **Gulet (Marmaris)** | `gulet_marmaris_bay_2026-05-22_BRANDED.png` | "GULET KİRALAMA" | WHATSAPP'TAN SOR |
| **Proposal / Anniversary** | `yacht_couple_champagne_2026-05-22_BRANDED.png` | "PROPOSAL · ANNIVERSARY" | PRIVATE QUOTE ON WHATSAPP |

Logo: `public/logo.svg` (vector) · `public/logo-1024.png` (raster fallback).

To regenerate / iterate: `node /Users/resat/Desktop/kingsworldtransfer/scripts/_brand-overlay.mjs`.

---

## 4. Campaign structure — ₺1,000–₺1,500 / day

### Three campaigns, three products (Advantage+ disabled — manual CBO)

```
Campaign A — SUNSET CRUISE          (₺400/day)  Objective: Sales (Purchase)
  ├─ Ad set A1: TR Istanbul        ₺100  intl city interest + lookalike
  ├─ Ad set A2: TR major cities    ₺100  Antalya, Bodrum, Izmir
  ├─ Ad set A3: UK + DE + NL       ₺100  travel intent + Istanbul interest
  └─ Ad set A4: US + AU + CA       ₺100  travel intent + age 25-45

Campaign B — DINNER CRUISE          (₺400/day)  Objective: Sales (Purchase)
  ├─ Ad set B1: TR all            ₺200  Turkish-night, music, gastronomy interests
  └─ Ad set B2: EU + UK + US      ₺200  evening travel, special-occasion intent

Campaign C — YACHT CHARTER          (₺400/day)  Objective: Leads (WhatsApp)
  ├─ Ad set C1: TR HNW            ₺150  proposal, anniversary, corporate intent
  ├─ Ad set C2: DE + UK + NL      ₺150  yacht charter + Istanbul travel intent
  └─ Ad set C3: GCC (UAE, SA, QA) ₺100  premium travel + Istanbul affinity
```

Toplam: **₺1,200/day** baseline · ramp to ₺1,500 once each ad set has 50+ purchases attributed.

### Why "Sales (Purchase)" not "Leads (DM)"

User explicitly wants **NO Meta DM messages** — leads land in our site (booking modal) or WhatsApp (managed by ops team), NOT in Messenger inbox. So:

- **Sunset + Dinner** → Conversion campaigns optimised for `Purchase` event (with `AddToCart` as the 7-day backup signal during learning phase).
- **Yacht charter** → Lead campaign optimised for `Lead` event (the WhatsApp click) — high-value, longer consideration cycle.

Meta will auto-optimise toward whoever actually books / messages WhatsApp, not whoever opens Messenger. The CTA button on every ad is **Send WhatsApp Message** with a `https://wa.me/905370406822?text=...` deep link (NOT the Messenger one).

### Bidding strategy

- Phase 1 (first 7 days): Highest volume / lowest cost — let Meta find buyers
- Phase 2 (after 50 conversions per ad set): Switch to **Cost per result goal** at 75–80% of Phase 1 CPA
- Phase 3 (after 200 conversions): Add **Value optimisation** — Meta will favour ₺2000+ yacht charters over ₺30 sunsets

### Daily caps

`META_DAILY_CAP_TRY=1500` enforced by ad set lifetime budgets, not daily — prevents day-end overrun.

---

## 5. Audiences

### Custom Audiences (built from CAPI data)

| Audience | Source | Use case |
|---|---|---|
| `Site visitors 30d` | Pixel `PageView` | Retargeting, lookalike seed |
| `Cruise viewers 60d` | Pixel `ViewContent` (cruise pages) | Retargeting, ad set 1st-party |
| `Cart abandoners 30d` | Pixel `AddToCart` (booking_abandonment) | Retargeting at higher bid |
| `Purchasers 180d` | Pixel `Purchase` | Lookalike 1% seed, exclusion list |
| `WhatsApp leads 90d` | Pixel `Lead` (whatsapp_click) | Retargeting + lookalike |

### Lookalike Audiences (after 100+ source events)

| LAL | Source | Geography |
|---|---|---|
| `Purchasers 1%` | Purchasers 180d | TR + UK + DE + NL + US |
| `WhatsApp leads 1%` | WhatsApp leads 90d | TR + UK + DE |
| `High-value purchasers 2%` | Purchases ≥ €100 | TR + DE + UK |

### Interest targeting (warm-start, until lookalike is ready)

- **Travel intent**: Bosphorus, Istanbul, Turkey vacation
- **Cruise & sailing**: Boat tour, yacht charter, sailing, gulet
- **Special occasion**: Proposal ideas, anniversary travel, honeymoon
- **Demographic**: 25-55 age range, engaged shoppers, frequent travellers
- **Exclude**: Already engaged with merrysails.com last 30d (avoid re-targeting at acquisition prices)

---

## 6. Ad copy (per product)

### Sunset cruise — primary text

```
🌅 Boğaz'da Gün Batımı — €30'dan başlayan fiyatlarla

· 2 saatlik paylaşımlı sunset cruise
· Pazartesi · Salı · Perşembe €30 weekday indirimi (sabit)
· Snacks + Türk kahvesi + lemonade dahil
· Canlı İngilizce rehber
· Ödeme gemide — ön ödeme yok
· 50.000+ misafir ağırladık, TURSAB A Group lisansı (2001'den beri)

Hemen rezervasyon: merrysails.com
```

Headline: `Bosphorus Sunset Cruise — From €30`
Description: `2h cruise · Mon/Tue/Thu €30 weekday deal · Pay onboard · Free cancel 24h`
CTA button: **Book Now**
Destination: `https://merrysails.com/cruises/bosphorus-sunset-cruise?utm_source=meta&utm_medium=cpc&utm_campaign=sunset-cruise&utm_content={{ad.id}}`

### Dinner cruise — primary text

```
🍽️ Boğaz Yemekli Tekne Turu — €30 Silver'dan €90 Gold Unlimited'a

· 3.5 saatlik aydınlatılmış Boğaz rotası
· 4 paket seçeneği: Silver Soft €30 → Silver Alkollü €45 → Gold Soft €80 → Gold Unlimited €90
· Türk gecesi şovu — folklor + canlı müzik
· Otel transfer desteği (Sultanahmet, Taksim, Beşiktaş)
· Türk + Akdeniz menüsü
· Ödeme gemide — ön ödeme yok

Hemen yer ayır: merrysails.com
```

Headline: `Istanbul Dinner Cruise — From €30`
Description: `3.5h · 4 packages · Turkish night show · Hotel pickup support`
CTA button: **Book Now**
Destination: `/istanbul-dinner-cruise?utm_source=meta&utm_medium=cpc&utm_campaign=dinner-cruise&utm_content={{ad.id}}`

### Yacht charter — primary text

```
⚓ Özel Boğaz Yatı Kiralama — €280'den başlayan fiyatlarla

· 2 saatlik özel yat (sadece sizin grubunuz)
· Essential €280 / Premium €380 / VIP €680
· 10-150 misafir kapasite (filo: 6 tekne)
· Marriage proposal · doğum günü · kurumsal · aile turu
· Şampanya + dekor + fotoğrafçı opsiyonları
· Kaptan + ekip dahil
· TURSAB A Group lisanslı, 2001'den beri

WhatsApp'tan teklif al: wa.me/905370406822
```

Headline: `Private Yacht Charter Istanbul — From €280`
Description: `2h whole-yacht · Captain & crew · Proposal · Anniversary · Corporate`
CTA button: **Send WhatsApp Message**
Destination: `https://wa.me/905370406822?text=Hi%2C%20I'd%20like%20a%20yacht%20charter%20quote%20{{ad.id}}` (NOT Messenger)

---

## 7. WhatsApp lead handoff (no Meta DM)

Every "Send WhatsApp Message" CTA button uses `wa.me/905370406822?text=...` with the ad ID baked into the message — when the user lands in WhatsApp, ops sees the ad context immediately.

**Standard prefilled message per product:**

- Sunset cruise: `Merhaba, sunset cruise için fiyat ve müsaitlik bilgisi alabilir miyim? [ad:{{ad.id}}]`
- Dinner cruise: `Merhaba, dinner cruise paketleri için bilgi alabilir miyim? [ad:{{ad.id}}]`
- Yacht charter: `Merhaba, özel yat kiralama teklifi alabilir miyim? [ad:{{ad.id}}]`

Ops team should ask **at minimum**: name, email, date, guest count — these become the match keys when CAPI fires the `Lead` event from the WhatsApp click.

---

## 8. Attribution: did this lead really come from Meta?

The site already tracks `fbclid` from URL params and persists it in `sessionStorage` (via `getStoredAttribution()`). When a reservation is created, `trafficChannel` / `fbclid` / `utmSource` are written to the DB row. The reservation Telegram notification will show:

```
📊 Kaynak: Meta Ads (fbclid)
🎯 Kampanya: sunset-cruise
🆔 Ad: {ad_id_here}
```

So ops can verify in real time — every booking with `gad_source=meta` is Meta-attributed. The CAPI server-side post also lets us re-attribute later by reservation ID via Events Manager → Test Events.

---

## 9. Competitor scan (Facebook Ads Library)

Before launching, audit competitor creatives at:

- https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=TR&q=bosphorus%20cruise
- https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=TR&q=istanbul%20dinner%20cruise
- https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=TR&q=yacht%20charter%20istanbul

Look for: **average days a creative stays live** (proxy for performance), CTA style, hook angle, video vs static, language mix.

Known competitors running Meta ads (verify in library):
- bosphorustour.com
- sunsetbosphorus.com
- sunsetcruiseistanbul.com
- istanbulyachtcharter.com

If 80%+ of competitors run video, we should add 2-3 video creatives in Phase 2 (current 5 statics are sufficient for Phase 1 baseline).

---

## 10. Day-7 + Day-30 review playbook

### Day 7 (after launch)

- [ ] Pixel + CAPI Events Manager: confirm Purchase + Lead events firing with quality score ≥7/10 (Match quality)
- [ ] Per ad set: Did we hit ≥10 conversions? If not, expand audience size (broader interest or remove demographic narrowing)
- [ ] Top performing creative — duplicate into a new ad set with different audience (creative refresh)
- [ ] Cost per Purchase: TR target ≤ ₺200, intl target ≤ ₺300

### Day 30

- [ ] Lookalike 1% built from Purchasers 30d — pause interest-based ad sets, shift budget to lookalike
- [ ] Refresh creatives — Meta creative fatigue after 4-6 weeks
- [ ] Audit `AddToCart → Purchase` conversion rate — if <10%, fix booking flow not ads
- [ ] Value optimisation — switch to bid for value, not cost-per-purchase

---

## 11. Sequence of events to ship this

1. Reşat: Steps 1-5 (Business Account, Page, Domain, Pixel, CAPI token) — **30 min**
2. Reşat sends `META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN` to bot
3. Bot: adds env vars to Vercel, triggers deploy, verifies via `/api/meta-capi` GET
4. Reşat: uploads the 5 branded images to Meta Ads Manager creative library
5. Reşat + Bot: build the 3 campaigns from the structure in Section 4
6. Bot: writes a `scripts/meta-daily-snapshot.mjs` script (cron to log spend + CPA — separate task)
7. Launch.

---

## 12. Bot can help with (after Pixel ID is set)

- Drafting more ad copy variations per product (multilingual: EN/TR/DE/FR/NL)
- Auditing competitor ads (Facebook Ads Library scrape)
- Writing creative-rotation logic for the booking modal so different UTM `ad_id`s show different package recommendations
- Wiring a server-side webhook from Meta into Telegram notifications
- A/B testing framework for landing pages (sunset cruise vs sunset cruise variant)

**Bot cannot do (without API access)**:
- Create the Business Account / Pixel itself
- Upload creatives to Ads Manager (no API for this without long manual OAuth)
- Approve ads for review
- Pay the bills
