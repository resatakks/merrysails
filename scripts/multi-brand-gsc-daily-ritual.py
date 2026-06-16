#!/usr/bin/env python3
"""multi-brand-gsc-daily-ritual.py

Daily GSC URL Inspection sweep across the 13-brand portfolio.

Quota math (verified 2026-06-11 against Google docs):
  - URL Inspection API: 2000 QPD / property, 600 QPM. 10M QPD / project, 15K QPM.
  - Indexing API: 200 QPD / project — RESTRICTED to JobPosting + BroadcastEvent (ToS).
    DO NOT use for our cruise/tattoo/restaurant pages — scope violation = key revoke.
  - GSC UI "Request Indexing" button (manual): ~10/property/day historical informal cap.

Operator daily target: ~10 URL/brand × 12 brands ≈ 120 URL/day.
Headroom: 4% of per-property ceiling. Safe to expand to 20/brand if needed.

Conservative default per operator preference 2026-06-11:
  *"kota dahilinde günde 10 yapsak yeter bize"* — tier 1 only (10/brand).
  Tier 1+2 mode requires explicit opt-in via `--all` (or `--tier 1,2`).
  Daily total stays well under per-property safety cap (50).

Inputs:
  - ~/.agents/skills/daily-ops/templates/per-brand-gsc-priority-queue.json
      (Tier 1-4 URL list per brand)
  - ~/.agents/state/brands.json
      (GSC property + domain mapping)
  - /Users/resat/mcp-gsc/token.json
      (single OAuth user, multi-property; resatakkus10@gmail.com)

Output:
  - data/multi-brand-monitoring/gsc-daily/gsc-daily-YYYY-MM-DD.csv
      Columns: brand, url, status, coverage_state, verdict, last_crawl, google_canonical, action

Action codes (mapped from inspection result):
  - OK            → indexed + recent crawl (<60d). Next.
  - REFRESH       → indexed but stale crawl (>60d). IndexNow + dateModified bump.
  - CLASSIFIER    → crawled, not indexed. Content gate 7-question audit; rewrite or 410.
  - LINK          → discovered, not indexed. Internal linking audit; add 2+ contextual links.
  - SUBMIT        → unknown to Google. submit_sitemap + IndexNow + manual GSC Request Indexing.
  - NOINDEX       → blocked by noindex (verify intent; skip if intentional).
  - ROBOTS        → blocked by robots.txt (check if accidental).
  - REDIRECT      → redirect chain; fix internal links if 307/302.
  - ERROR         → fetch/auth/quota error; investigate.

Usage:
  python3 scripts/multi-brand-gsc-daily-ritual.py                    # all brands, tier 1 (operator default — 10/brand)
  python3 scripts/multi-brand-gsc-daily-ritual.py --brand merrysails # single brand, tier 1
  python3 scripts/multi-brand-gsc-daily-ritual.py --all              # opt-in tier 1+2 (heavier sweep)
  python3 scripts/multi-brand-gsc-daily-ritual.py --tier 1,2         # equivalent to --all
  python3 scripts/multi-brand-gsc-daily-ritual.py --dry-run          # plan only, no API calls

Cron suggestion (daily 06:30 local, after Yandex quota reset 00:00 UTC):
  30 6 * * *  cd /Users/resat/Desktop/merrysails && /usr/bin/python3 scripts/multi-brand-gsc-daily-ritual.py >> data/multi-brand-monitoring/gsc-daily/cron.log 2>&1
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# ----- Constants -----
HOME = Path.home()
REPO_ROOT = Path(__file__).resolve().parent.parent
TOKEN_PATH = Path(os.environ.get("GSC_OAUTH_TOKEN_PATH", HOME / "mcp-gsc" / "token.json"))
PRIORITY_QUEUE_PATH = HOME / ".agents" / "skills" / "daily-ops" / "templates" / "per-brand-gsc-priority-queue.json"
BRANDS_REGISTRY_PATH = HOME / ".agents" / "state" / "brands.json"
OUTPUT_DIR = REPO_ROOT / "data" / "multi-brand-monitoring" / "gsc-daily"

OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"
INSPECT_ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"

# Per-property safety ceiling. Real Google ceiling is 2000 QPD / property — we cap far below.
PER_PROPERTY_SAFETY_CAP = 50
# Inter-call delay (ms) — well under 600 QPM per-property limit.
INTER_CALL_DELAY_S = 0.4

STALE_CRAWL_DAYS = 60


# ----- OAuth -----
def load_token() -> dict:
    if not TOKEN_PATH.exists():
        raise FileNotFoundError(f"Missing GSC OAuth token: {TOKEN_PATH}")
    return json.loads(TOKEN_PATH.read_text())


def save_token(token: dict) -> None:
    TOKEN_PATH.write_text(json.dumps(token, indent=2) + "\n")
    os.chmod(TOKEN_PATH, 0o600)


def refresh_access_token() -> str:
    token = load_token()
    expiry = token.get("expiry")
    if token.get("token") and expiry:
        try:
            exp_dt = datetime.fromisoformat(expiry.replace("Z", "+00:00"))
            if exp_dt.timestamp() > time.time() + 60:
                return token["token"]
        except Exception:
            pass

    body = urllib.parse.urlencode({
        "client_id": token["client_id"],
        "client_secret": token["client_secret"],
        "refresh_token": token["refresh_token"],
        "grant_type": "refresh_token",
    }).encode()
    req = urllib.request.Request(
        token.get("token_uri", OAUTH_TOKEN_URL),
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    new_token = {
        **token,
        "token": data["access_token"],
        "expiry": datetime.fromtimestamp(time.time() + data.get("expires_in", 3600), tz=timezone.utc).isoformat(),
    }
    save_token(new_token)
    return new_token["token"]


# ----- Inspection -----
def inspect_url(access_token: str, inspection_url: str, site_url: str) -> dict:
    body = json.dumps({
        "inspectionUrl": inspection_url,
        "siteUrl": site_url,
        "languageCode": "en-US",
    }).encode()
    req = urllib.request.Request(
        INSPECT_ENDPOINT,
        data=body,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        return data.get("inspectionResult", {}).get("indexStatusResult", {}) or {}
    except urllib.error.HTTPError as e:
        body_txt = e.read().decode(errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {body_txt[:300]}")


def classify_action(index_status: dict) -> str:
    coverage = (index_status.get("coverageState") or "").lower()
    verdict = (index_status.get("verdict") or "").lower()
    robots = (index_status.get("robotsTxtState") or "").lower()
    last_crawl = index_status.get("lastCrawlTime") or ""

    if "noindex" in coverage:
        return "NOINDEX"
    if "blocked by robots" in coverage or "disallowed" in robots:
        return "ROBOTS"
    if "redirect" in coverage:
        return "REDIRECT"
    if "unknown to google" in coverage:
        return "SUBMIT"
    if "discovered" in coverage and "not indexed" in coverage:
        return "LINK"
    if "crawled" in coverage and "not indexed" in coverage:
        return "CLASSIFIER"
    if verdict == "pass" or "indexed" in coverage:
        # Check freshness
        if last_crawl:
            try:
                crawl_dt = datetime.fromisoformat(last_crawl.replace("Z", "+00:00"))
                age_days = (datetime.now(timezone.utc) - crawl_dt).days
                if age_days > STALE_CRAWL_DAYS:
                    return "REFRESH"
            except Exception:
                pass
        return "OK"
    return "ERROR"


# ----- Brand loading -----
def load_brands() -> dict:
    brands_reg = json.loads(BRANDS_REGISTRY_PATH.read_text()) if BRANDS_REGISTRY_PATH.exists() else {"brands": {}}
    queue = json.loads(PRIORITY_QUEUE_PATH.read_text())
    merged = {}
    for slug, qdata in queue.get("brands", {}).items():
        reg = brands_reg.get("brands", {}).get(slug, {})
        merged[slug] = {
            "site_origin": qdata["site_origin"],
            "gsc_property": qdata.get("gsc_property") or reg.get("gsc_property"),
            "daily_quota_target": qdata.get("daily_quota_target", 10),
            "tier_1": qdata.get("tier_1", []),
            "tier_2": qdata.get("tier_2", []),
            "tier_3": qdata.get("tier_3", []),
            "priority": reg.get("priority", "P2"),
            "note": qdata.get("_note", ""),
        }
    return merged


def select_urls_for_brand(brand: dict, tiers: list[int]) -> list[str]:
    urls = []
    for t in tiers:
        urls.extend(brand.get(f"tier_{t}", []))
    # Cap at daily quota target
    cap = min(brand["daily_quota_target"], PER_PROPERTY_SAFETY_CAP)
    return urls[:cap]


# ----- Main -----
def main() -> int:
    parser = argparse.ArgumentParser(description="Multi-brand GSC URL Inspection daily ritual")
    parser.add_argument("--brand", help="Single brand slug (default: all)")
    parser.add_argument("--tier", default="1", help="Comma-separated tiers to inspect (default: 1 — operator preference 10/brand)")
    parser.add_argument("--all", action="store_true", help="Opt-in tier 1+2 heavier sweep (overrides --tier)")
    parser.add_argument("--dry-run", action="store_true", help="Print plan, no API calls")
    parser.add_argument("--output-dir", default=str(OUTPUT_DIR))
    args = parser.parse_args()

    tier_arg = "1,2" if args.all else args.tier
    tiers = [int(t.strip()) for t in tier_arg.split(",") if t.strip()]
    today = datetime.now().strftime("%Y-%m-%d")
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    csv_path = output_dir / f"gsc-daily-{today}.csv"
    summary_path = output_dir / f"gsc-daily-{today}.json"

    brands = load_brands()
    if args.brand:
        if args.brand not in brands:
            print(f"Unknown brand: {args.brand}. Known: {sorted(brands)}", file=sys.stderr)
            return 2
        brands = {args.brand: brands[args.brand]}

    # Filter brands with valid gsc_property
    brands = {k: v for k, v in brands.items() if v.get("gsc_property")}

    plan = []
    total = 0
    for slug, b in brands.items():
        urls = select_urls_for_brand(b, tiers)
        plan.append((slug, b, urls))
        total += len(urls)

    print(f"[plan] {today} | tiers={tiers} | brands={len(plan)} | total_urls={total}", file=sys.stderr)
    for slug, b, urls in plan:
        print(f"  {slug} ({b['priority']}) {len(urls)} URL → {b['gsc_property']}", file=sys.stderr)

    if args.dry_run:
        print(f"[dry-run] would write {csv_path}", file=sys.stderr)
        return 0

    access_token = refresh_access_token()

    rows = []
    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "tiers": tiers,
        "brand_counts": {},
        "action_counts": {},
    }

    with csv_path.open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "brand", "url", "action", "coverage_state", "verdict",
            "last_crawl", "google_canonical", "user_canonical",
        ])

        for slug, b, urls in plan:
            site_url = b["gsc_property"]
            origin = b["site_origin"].rstrip("/")
            brand_actions = {}
            for path in urls:
                full_url = path if path.startswith("http") else origin + (path if path.startswith("/") else "/" + path)
                try:
                    idx = inspect_url(access_token, full_url, site_url)
                    action = classify_action(idx)
                except Exception as e:
                    idx = {}
                    action = "ERROR"
                    print(f"  [err] {slug} {full_url}: {e}", file=sys.stderr)

                row = [
                    slug,
                    full_url,
                    action,
                    idx.get("coverageState", ""),
                    idx.get("verdict", ""),
                    idx.get("lastCrawlTime", ""),
                    idx.get("googleCanonical", ""),
                    idx.get("userCanonical", ""),
                ]
                writer.writerow(row)
                rows.append(row)
                brand_actions[action] = brand_actions.get(action, 0) + 1
                summary["action_counts"][action] = summary["action_counts"].get(action, 0) + 1
                print(f"  [{slug}] {action:<10} {full_url}", file=sys.stderr)
                time.sleep(INTER_CALL_DELAY_S)
            summary["brand_counts"][slug] = brand_actions

    summary_path.write_text(json.dumps(summary, indent=2) + "\n")
    print(f"[wrote] {csv_path}", file=sys.stderr)
    print(f"[wrote] {summary_path}", file=sys.stderr)

    # Print top-line action summary to stdout
    print(f"\n=== GSC Daily Ritual {today} — Tier {tiers} ===")
    print(f"Total URL inspected: {len(rows)}")
    for action, count in sorted(summary["action_counts"].items(), key=lambda x: -x[1]):
        print(f"  {action:<12} {count}")
    print(f"\nCSV: {csv_path}")

    # Exit non-zero if classifier-fatal actions present
    bad = sum(summary["action_counts"].get(a, 0) for a in ("CLASSIFIER", "ERROR"))
    return 1 if bad > total * 0.20 else 0


if __name__ == "__main__":
    sys.exit(main())
