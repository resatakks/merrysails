# MerrySails GSC Export Drop Folder

Put Google Search Console exports here when API access is not configured.

Recommended filenames:

- `merrysails-gsc-24h.csv`
- `merrysails-gsc-7d.csv`
- `merrysails-gsc-28d.csv`
- `merrysails-gsc-3m.csv`

Preferred columns:

- `query`
- `page`
- `clicks`
- `impressions`
- `ctr`
- `position`

The rank monitor script also accepts common Search Console export labels such as `Top queries`, `Pages`, `Clicks`, `Impressions`, `CTR`, and `Position`.

Run:

```bash
npm run seo:rank-monitor
```

If API access is available, set:

```bash
GSC_ACCESS_TOKEN="paste-access-token-here"
GSC_SITE_URL="sc-domain:merrysails.com"
```

Or use a service account that has Search Console access:

```bash
GSC_SERVICE_ACCOUNT_JSON="/path/to/service-account.json"
GSC_SITE_URL="sc-domain:merrysails.com"
```

Then the script can query Search Console directly and save fresh CSV snapshots into this folder.
