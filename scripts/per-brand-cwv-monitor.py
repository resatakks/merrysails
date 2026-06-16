#!/usr/bin/env python3
"""
Per-brand CWV monitor — 13-brand portfolio performance baseline + daily drift alerts.

Usage:
    python3 scripts/per-brand-cwv-monitor.py [--key API_KEY]

Outputs:
    data/cwv-monitoring-YYYY-MM-DD.csv  (one row per brand × strategy × page)
    data/cwv-alerts-YYYY-MM-DD.json     (any metric >20% worse than previous run)

Cost:
    PageSpeed Insights API: 25,000 queries/day free with API key
    12 brands × 2 pages × 2 strategies = 48 queries/run — trivial daily cost

Env:
    GOOGLE_PSI_API_KEY  Required. Fetch from console.cloud.google.com or read from
                        merrysails .env.local (already set there).

Schedule:
    crontab -e
    0 7 * * * cd /Users/resat/Desktop/merrysails && python3 scripts/per-brand-cwv-monitor.py >> data/cwv-cron.log 2>&1
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import glob
import json
import os
import pathlib
import sys
import time
import urllib.parse
import urllib.request

# ---------------------------------------------------------------------------
# Brand registry — homepage + 1 commercial pillar each
# ---------------------------------------------------------------------------

BRANDS: list[dict[str, str]] = [
    {"brand": "merrysails",          "home": "https://merrysails.com/",                "pillar": "https://merrysails.com/bosphorus-cruise"},
    {"brand": "goldensunsettour",    "home": "https://goldensunsettour.com/",          "pillar": "https://goldensunsettour.com/bosphorus-cruise"},
    {"brand": "kwt",                 "home": "https://kingsworldtransfer.com/",        "pillar": "https://kingsworldtransfer.com/en/istanbul-airport-transfer"},
    {"brand": "merrytourism",        "home": "https://www.merrytourism.com/",          "pillar": "https://www.merrytourism.com/en/istanbul-hotel-transfer"},
    {"brand": "tourthese",           "home": "https://tourthese.com/",                 "pillar": "https://tourthese.com/en/istanbul"},
    {"brand": "acilkaseniz",         "home": "https://acilkaseniz.com/",               "pillar": "https://acilkaseniz.com/kategori/otomatik-kase"},
    {"brand": "ersintattoo",         "home": "https://ersintattoo.com/",               "pillar": "https://ersintattoo.com/istanbul-dovme"},
    {"brand": "pinogare",            "home": "https://pinogareroofrestaurant.com/",    "pillar": "https://pinogareroofrestaurant.com/en/menu"},
    {"brand": "pickupspoint",        "home": "https://www.pickupspoint.com/",          "pillar": "https://www.pickupspoint.com/en/become-carrier"},
    {"brand": "pgpremium",           "home": "https://www.pgarackaplama.com/",         "pillar": "https://www.pgarackaplama.com/arac-kaplama"},
    {"brand": "pakbodrum",           "home": "https://www.pakbodrum.com/",             "pillar": "https://www.pakbodrum.com/fiyatlar"},
    {"brand": "baskitasarla",        "home": "https://baskitasarla.com/",              "pillar": "https://baskitasarla.com/iletisim"},
]

STRATEGIES = ["mobile", "desktop"]

PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
ALERT_THRESHOLD = 0.20  # metric regressed >=20% triggers alert

OUT_DIR = pathlib.Path(__file__).resolve().parent.parent / "data"
OUT_DIR.mkdir(exist_ok=True)


# ---------------------------------------------------------------------------
# PSI fetch
# ---------------------------------------------------------------------------

def fetch_psi(url: str, strategy: str, api_key: str, *, timeout: int = 90) -> dict:
    params = {
        "url": url,
        "strategy": strategy,
        "category": "performance",
        "key": api_key,
    }
    full = f"{PSI_URL}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(full, headers={"User-Agent": "merrysails-cwv-monitor/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read())
    except Exception as exc:
        return {"error": {"message": str(exc)}}


def extract_metrics(psi: dict) -> dict:
    if "error" in psi:
        return {"error": psi["error"].get("message", "unknown")[:200]}
    lr = psi.get("lighthouseResult", {})
    audits = lr.get("audits", {})
    cats = lr.get("categories", {})

    def num(audit_key: str) -> float | None:
        a = audits.get(audit_key, {})
        v = a.get("numericValue")
        return float(v) if v is not None else None

    return {
        "perf_score":    (cats.get("performance", {}).get("score") or 0) * 100,
        "lcp_ms":        num("largest-contentful-paint"),
        "cls":           num("cumulative-layout-shift"),
        "tbt_ms":        num("total-blocking-time"),
        "fcp_ms":        num("first-contentful-paint"),
        "si_ms":         num("speed-index"),
        "tti_ms":        num("interactive"),
        "lcp_display":   audits.get("largest-contentful-paint", {}).get("displayValue", ""),
        "cls_display":   audits.get("cumulative-layout-shift", {}).get("displayValue", ""),
    }


# ---------------------------------------------------------------------------
# Categorization (Google official Core Web Vitals thresholds)
# ---------------------------------------------------------------------------

def categorize_lcp(ms: float | None) -> str:
    if ms is None: return "?"
    if ms < 2500: return "GOOD"
    if ms < 4000: return "NEEDS"
    return "POOR"

def categorize_cls(v: float | None) -> str:
    if v is None: return "?"
    if v < 0.1: return "GOOD"
    if v < 0.25: return "NEEDS"
    return "POOR"

def categorize_tbt(ms: float | None) -> str:
    # TBT is a lab proxy for INP. Field INP <200ms ≈ Lab TBT <200ms is rough but useful.
    if ms is None: return "?"
    if ms < 200: return "GOOD"
    if ms < 600: return "NEEDS"
    return "POOR"


# ---------------------------------------------------------------------------
# Alert: compare with previous run
# ---------------------------------------------------------------------------

def previous_csv() -> pathlib.Path | None:
    files = sorted(glob.glob(str(OUT_DIR / "cwv-monitoring-*.csv")))
    today = dt.date.today().isoformat()
    files = [f for f in files if today not in f]
    return pathlib.Path(files[-1]) if files else None


def load_csv(path: pathlib.Path) -> dict[tuple[str, str, str], dict[str, float | None]]:
    out: dict[tuple[str, str, str], dict[str, float | None]] = {}
    with open(path) as fh:
        for row in csv.DictReader(fh):
            key = (row["brand"], row["strategy"], row["page_type"])
            out[key] = {
                "lcp_ms": float(row["lcp_ms"]) if row.get("lcp_ms") not in ("", None) else None,
                "cls":    float(row["cls"])    if row.get("cls")    not in ("", None) else None,
                "tbt_ms": float(row["tbt_ms"]) if row.get("tbt_ms") not in ("", None) else None,
                "perf_score": float(row["perf_score"]) if row.get("perf_score") not in ("", None) else None,
            }
    return out


def compute_alerts(current: list[dict], previous: dict) -> list[dict]:
    alerts: list[dict] = []
    for row in current:
        key = (row["brand"], row["strategy"], row["page_type"])
        prev = previous.get(key)
        if not prev:
            continue
        for metric in ("lcp_ms", "cls", "tbt_ms"):
            cur_v = row.get(metric)
            prev_v = prev.get(metric)
            if cur_v is None or prev_v is None or prev_v == 0:
                continue
            # for these "lower is better" metrics, regression = increase
            delta = (cur_v - prev_v) / max(prev_v, 1)
            if delta >= ALERT_THRESHOLD:
                alerts.append({
                    "brand": row["brand"],
                    "strategy": row["strategy"],
                    "page_type": row["page_type"],
                    "url": row["url"],
                    "metric": metric,
                    "previous": prev_v,
                    "current": cur_v,
                    "delta_pct": round(delta * 100, 1),
                })
        # perf score regression = decrease
        if row.get("perf_score") is not None and prev.get("perf_score"):
            delta = (prev["perf_score"] - row["perf_score"]) / prev["perf_score"]
            if delta >= ALERT_THRESHOLD:
                alerts.append({
                    "brand": row["brand"],
                    "strategy": row["strategy"],
                    "page_type": row["page_type"],
                    "url": row["url"],
                    "metric": "perf_score",
                    "previous": prev["perf_score"],
                    "current": row["perf_score"],
                    "delta_pct": round(-delta * 100, 1),
                })
    return alerts


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--key", default=os.environ.get("GOOGLE_PSI_API_KEY"),
                        help="PageSpeed Insights API key")
    parser.add_argument("--dry-run", action="store_true", help="No HTTP; print plan")
    parser.add_argument("--brand", help="Only run for one brand id")
    args = parser.parse_args()

    if not args.key and not args.dry_run:
        # Try .env.local fallback
        envfile = pathlib.Path(__file__).resolve().parent.parent / ".env.local"
        if envfile.exists():
            for line in envfile.read_text().splitlines():
                if line.startswith("GOOGLE_PSI_API_KEY"):
                    args.key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    if not args.key and not args.dry_run:
        print("ERROR: GOOGLE_PSI_API_KEY required", file=sys.stderr)
        return 1

    brands = [b for b in BRANDS if not args.brand or b["brand"] == args.brand]
    rows: list[dict] = []
    started = dt.datetime.utcnow()

    for b in brands:
        for page_type, url in (("home", b["home"]), ("pillar", b["pillar"])):
            for strategy in STRATEGIES:
                if args.dry_run:
                    print(f"DRY-RUN {b['brand']:<18} {strategy:<7} {page_type:<6} {url}")
                    continue
                print(f"[{b['brand']:<18}] {strategy:<7} {page_type:<6} fetching ...", flush=True)
                psi = fetch_psi(url, strategy, args.key)
                m = extract_metrics(psi)
                row = {
                    "ts_utc": started.isoformat(),
                    "brand": b["brand"],
                    "page_type": page_type,
                    "strategy": strategy,
                    "url": url,
                    "lcp_category": categorize_lcp(m.get("lcp_ms")),
                    "cls_category": categorize_cls(m.get("cls")),
                    "tbt_category": categorize_tbt(m.get("tbt_ms")),
                    **m,
                }
                rows.append(row)
                # gentle rate-limit
                time.sleep(0.5)

    if args.dry_run:
        return 0

    today = dt.date.today().isoformat()
    csv_path = OUT_DIR / f"cwv-monitoring-{today}.csv"
    fields = ["ts_utc", "brand", "page_type", "strategy", "url",
              "perf_score", "lcp_ms", "lcp_display", "lcp_category",
              "cls", "cls_display", "cls_category",
              "tbt_ms", "tbt_category",
              "fcp_ms", "si_ms", "tti_ms", "error"]
    with open(csv_path, "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"wrote {csv_path}")

    prev = previous_csv()
    if prev:
        print(f"comparing with {prev.name}")
        alerts = compute_alerts(rows, load_csv(prev))
        if alerts:
            alerts_path = OUT_DIR / f"cwv-alerts-{today}.json"
            json.dump(alerts, open(alerts_path, "w"), indent=2)
            print(f"ALERTS ({len(alerts)}): wrote {alerts_path}")
            for a in alerts:
                print(f"  {a['brand']:<18} {a['strategy']:<7} {a['page_type']:<6} "
                      f"{a['metric']:<10} {a['previous']:.1f} -> {a['current']:.1f} "
                      f"({a['delta_pct']:+.1f}%)")
        else:
            print("no alerts: all metrics within 20% of previous run")
    else:
        print("no previous CSV; this is the baseline run")

    return 0


if __name__ == "__main__":
    sys.exit(main())
