# MerrySails Parser Flow — Setup Checklist

Bot Telegram'dan WhatsApp mesajı forward et → LLM parse et → preview kart →
operatör onaylar → Reservation veya ExternalJob oluşur.

## Vercel env vars

`vercel env add ANTHROPIC_API_KEY production` (sk-ant-...)

Diğerleri zaten set: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`,
`TELEGRAM_WEBHOOK_SECRET`.

## Lokal test (anahtar ekledikten sonra)

```bash
# 1) Parser smoke — Sam + Graziella + Transfer + Vague + 5 fixture
npx tsx scripts/test-parser.mjs

# 2) E2E DB flow (Anthropic'siz, mock parsed data)
npx tsx scripts/test-parse-flow-mock.mjs
```

## Telegram bot komutları

| Komut | Ne yapar |
|---|---|
| Forward WhatsApp mesajı | Otomatik parse + preview |
| `/yenis [mesaj]` | Manuel paste parse |
| `/yenis_son` | Son 10 parse + state badge |
| `/yenis_bekleyen` | Onay bekleyen parse |
| `/yenis_maliyet` | Anthropic API spend (ay + son 30 gün) |
| `/yardim` | Tüm komut listesi |

## Preview keyboard butonları

İlk satır: **✅ Reservation/External Oluştur** — finalize çağrılır
2. satır: **🔄 Çevir** — intent toggle (R ↔ E)
3-4: Field editleri — Tarih · Saat · Pax · Tutar · Pickup · İsim · Email · Telefon · Ödeme
Son: **🔁 Tekrar Parse** (LLM'i baştan çalıştır) · **❌ İptal**

Field edit → bot "Yeni değer:" sorar, operatör cevap yazar, preview otomatik refresh.

## Akış (sequence)

```
Operatör → Telegram bot (forward WhatsApp mesajı)
          ↓
Bot     → "🔄 Mesaj analiz ediliyor..."
          ↓ (Anthropic ~5s)
Bot     → Preview kart + inline keyboard
          (ParseSession saved · ParseLog cost tracked)
          ↓
Operatör → [✅ Reservation/External]
          ↓
finalize() → Reservation/ExternalJob row create
          ↓
Bot     → Voucher + Invoice URL butonları
          (recordOutcome marks session confirmed)
```

## Trust safeguards

1. **Always confirm** — LLM hiç direkt yazmaz; preview adımı zorunlu
2. **Confidence badge** — ≥85% ✅, 70-85% ⚠️, <70% ❌
3. **Sanity checks** — büyük tutar, geçmiş tarih, eksik dropoff vs.
4. **Currency safety net** — deterministic regex "dolar/€/TL/lira" override
5. **Idempotency** — aynı mesaj 1 saat içinde 2× forward edilirse aynı session döner
6. **Session TTL** — 24h sonra callback expire
7. **Permission gate** — sadece TelegramUser tablosundaki active operatörler
8. **Audit trail** — ParseLog her çağrıyı saklar (model, latency, cost, outcome)

## Maliyet

Claude Haiku 4.5: $1/M input, $5/M output.
Tipik mesaj: ~1k input, ~400 output → **$0.003/parse**.
Günde 15 parse × 30 = **~$1.35/ay**.

`/yenis_maliyet` ile canlı takip.

## Sonraki sprint (deferred)

1. Update flow (`/guncelle EXT-MRY-XXXX saati 18 yap`)
2. GoldenSunsetTour aynı yapı (kütüphane shared, brand-config injection)
3. MerryTourism aynı yapı
4. Voice message → Whisper → parser (V2)
5. Recurring parse stats dashboard `/admin/parser-stats`
