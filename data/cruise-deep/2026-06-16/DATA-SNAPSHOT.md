# 📊 Cruise Vertical — Data Snapshot 2026-06-16 (human-readable)

> Full session data archive (MS = MerrySails, GS = GoldenSunset). Companion to the JSON in this
> folder + `../TREND.md`. This is the daily-snapshot template — copy + refresh each pull to track
> over time. Windows: GSC/GA4 = 28-30d, Bing = full, Yandex = snapshot.

## 1. Search Console (GSC, 30d)
| | MS | GS |
|---|---|---|
| Clicks | 117 | 122 |
| Impressions | 16,050 | 13,887 |
| CTR | 0.73% | 0.88% |
| Avg position | 11.1 | 11.4 |
| **Pages: indexed** | 329 | 503 |
| Crawled-not-indexed | 1,258 (benign _next chunks) | 31 |
| 404 bucket | 16 (old URLs+locale variants) | 39 |

**Striking-distance (pos 4-15, page-1-push candidates):**
- MS: thin — "eminönü waterfront" 57imp pos9.4, "bosphorus sunset cruise" 13imp pos8.9, "bosphorus wedding yacht" 13imp pos12.4
- GS: **commercial cluster** — "eminönü boğaz turu fiyatları 2026" 149imp pos11.9, "istanbul bogaz turu fiyat 2026" 143imp pos9.7, "boğaz turu fiyatları 2026" 117imp pos10.9, **"bosphorus cruise price 2026" 14imp pos5.6** (nearly top), "best bosphorus dinner cruise istanbul 2026" 11imp pos7.2, "bayram 2026" 10imp pos11.7

**Top pages (clicks):** MS — homepage(39), what-to-wear blog(15), tipping blog(13), with-kids blog(11). GS — homepage(22), best-restaurants blog(15), sunset-cruise(7), best-cruise-2026(4).
**Countries:** MS — TUR 38clk, USA 15clk/5156imp (0.29% CTR), DEU 14. GS — TUR 59clk, USA 10clk/3402imp (0.29%), NLD.

## 2. GA4 (28d)
| | MS | GS |
|---|---|---|
| Sessions | 800 | 512 |
| Users | 656 | 399 |
| Key events | 229 | 8 → (fixed: now tracks begin_checkout/whatsapp/contact/lead) |
| **Funnel** | sessions 798 → begin_checkout 55 → **purchase 16** | 512 → 26 → **8** |
| WhatsApp clicks | 76 | 25 |
| contact_us | 80 | 29 |
| **Engagement** | bounce 6% · 269s · 4.0 pages/sess · 94% engaged | bounce 10% · 167s · 4.6 pages/sess · 90% |
| page_not_found | 0 | 13 (→ /ru/...premium-yacht-15 ×8, fixed) |

**Read:** excellent engagement (NOT a speed/UX problem). Booking is WhatsApp-first — MS ~156 leads (whatsapp+contact) vs 16 online. Online checkout abandons 71% (55→16) = `/reservation` dead-click friction.

## 3. GEO / AI-visibility (GA4 AI-engine traffic, 28d) — THE GOLD
| AI source | MS sessions | GS sessions |
|---|---|---|
| **chatgpt.com** | **173** (→56 key events) | **130** (→0, keyEvents now fixed) |
| perplexity | 3 | 1 |
| gemini | 2 | 1 |
| copilot | 3 | 1 |
| claude.ai | — | 5 (1 key event) |

**ChatGPT dominates** (= Bing infra → GS Bing index is the lever). AI cites **price/logistics** content most.
**Pages AI cites (lands on):** MS — homepage(44), dinner(14), yacht(13), departure-times blog(8), princes-islands blog(8). GS — **prices-detailed blog(17, #1)**, homepage(13), departure-times blog(13), best-cruise-2026(11), sunset(9).

## 4. Bing (Webmaster)
| | MS | GS |
|---|---|---|
| Clicks / Imp | 33 / 896 | 4 / 96 |
| Crawled | 6,970 | 1,247 |
| In index | 101 | **0 → 9** (post SubmitUrl 2026-06-16) |
| Crawl errors | 1,676 (1,018 are 4xx old URLs, benign) | 75 |

## 5. Yandex (Webmaster)
| | MS | GS |
|---|---|---|
| SQI | 0 | 0 |
| Site problems | 1 RECOMMENDATION | 1 RECOMMENDATION |
| Top queries | RU/TR: "поплавать по босфору", "boğaz turu kaç tl" | RU: "ужин на яхте стамбул" pos4.2, "istanbul bogaz turu kaç tl" |

**CIS-tourist opportunity** via yandex.ru (RU queries present). MS /ru live + recrawled.

## 6. Position trend (sandbox-exit signal)
MS avg pos: 56 (May 23) → 19.6 (May 27) → **11.1 (Jun 16)**. GS: 26 → 13 → **11.4**. Both exiting sandbox; CTR is the gap. (Full daily series in `../TREND.md`.)

## 7. Clone-pair status (resolved this session)
122 shared blog slugs = 51 trafficked **rewritten-distinct** (Jaccard 0.09-0.48) + 71 zero-traffic **noindexed**. Indexable shared slugs ≥0.5 Jaccard = **0**. Ratings: GS uses own brand-stats (0 MS-pattern). EXIF: MS/GS image metadata diverged.

## 8. Diagnostic verdict (for "why low organic / few reservations")
- **Speed/UX problem? NO** — engagement proves it (6-10% bounce, 4+ pages/sess, 90-94% engaged).
- **Low organic = ranking (pos 11) + CTR (0.7-0.9%) + new-domain age**, improving. Fix = CTR + climb (GEO/de-dup/CTR work done).
- **Reservations: WhatsApp-first model** (156 vs 16 online) + **/reservation dead-click leak** (Continue-booking 45, option-cards 83, date-picker 44 dead clicks → 71% online abandon). Fix in flight.

## Tool/access notes
- GA4 via indexing SA (`indexing-api-bot@kingsworld`) — properties MS 534226524 / GS 536397016. SA has analytics.edit (created GS key events).
- GSC SA works (search analytics + URL inspection API). GSC Request-Indexing UI = browser-only (Angular SPA resists automation; intermittent).
- Bing API key `975113aafd2d417c976d247ad5a0c05c`. Yandex OAuth `bae18e6118b241f4ac25e80c0ef3b623`.
- **lbm token EXPIRED** (401) — reconnect for AI-visibility monitoring. serpstat available (credits).
- PageSpeed Insights anonymous quota exhausted — needs API key for exact CWV (engagement data covers it).
