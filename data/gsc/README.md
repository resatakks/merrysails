# GSC Daily Snapshots

Bu klasör Google Search Console günlük snapshot verilerini içerir.

## Dosya formatı

`gsc-snapshot-YYYY-MM-DD.json` — her gün için bir dosya.

## Nasıl üretilir?

1. **Vercel Cron** (otomatik): Her gün 07:00 UTC → `/api/gsc/snapshot` → DB'ye kaydeder + Telegram'a gönderir
2. **GitHub Actions** (otomatik): Her gün 07:10 UTC → `scripts/gsc-daily-snapshot.mjs` → bu klasöre JSON yazar → commit atar
3. **Manuel**: `node scripts/gsc-daily-snapshot.mjs` veya `node scripts/gsc-daily-snapshot.mjs --date 2026-04-20`

## GitHub Secrets (bir kez ekle)

Settings → Secrets and variables → Actions → New repository secret:
- GSC_CLIENT_ID
- GSC_CLIENT_SECRET
- GSC_REFRESH_TOKEN

## GSC Data Lag

GSC verisi ~3 gün gecikmeli. 29 Nisan'da çekilen snapshot, 26 Nisan verisini gösterir.
