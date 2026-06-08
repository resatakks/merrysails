#!/usr/bin/env python3
"""
cross-brand-similarity-audit.py
================================

Cross-brand similarity audit for a 13-brand portfolio.

Workflow:
  1. Read URL list (brand, url, vertical, page_type) from input file.
  2. Fetch each URL, strip nav/footer/script/style, extract main text.
  3. Hash content (skip re-embedding if unchanged from previous run).
  4. Embed via OpenAI text-embedding-3-small.
       MODEL LOCKED: text-embedding-3-small  (locked 2026-06-08).
       Thresholds below are calibrated to THIS model. If you change models
       (e.g. text-embedding-3-large), the threshold matrix MUST be re-calibrated
       — cosine distributions are not portable across embedding models.
  5. Compute pairwise cosine. Filter: same vertical + different brand + cos >= 0.75.
  6. Emit CSV + Markdown action queue. Optional Claude Opus adjudication
       for the gray zone (0.85-0.92) — OFF by default to save cost.

Threshold matrix (same vertical, different brand):
  cos >= 0.92        => REWRITE-or-410+301   (paraphrase/scaled-content risk)
  0.85 <= cos < 0.92 => 5-AXIS-DIFFERENTIATE (tier, scope, geo, demo, voice)
  0.75 <= cos < 0.85 => SOFT-WATCH           (review at next quarter)
  cos < 0.75         => OK (topically distinct)

Caveats (read before acting on output):
  - Thresholds are heuristic, NOT a Google decision boundary. Google's
    QualityCopiaFireflySiteSignal (Mar 2026 leak) uses site-level
    numOfArticles8/numOfUrls + pogo-stick + velocity — not page-pair cosine.
  - "Severity not volume" (Lily Ray Jan 20 2026): a single highly-paraphrased
    section can trigger a classifier even if whole-page cosine is moderate.
    Whole-page cosine MISSES section-level paraphrase. Section-level chunking
    is a v2 enhancement — current script is whole-page only.
  - Cross-language pairs (EN page vs DE page vs TR page) are NOT meaningful
    with text-embedding-3-small. For multilingual similarity, run a separate
    pass with paraphrase-multilingual-mpnet-base-v2. This script filters
    cross-locale pairs out of the action queue by default (see SAME_LOCALE_ONLY).
  - Embeddings + thresholds give a PRIORITY queue. Final REWRITE/DELETE
    decision needs a human reading both pages.

Usage:
  python cross-brand-similarity-audit.py --urls data/cross-brand-audit-urls.txt
  python cross-brand-similarity-audit.py --urls data/cross-brand-audit-urls.txt --force
  python cross-brand-similarity-audit.py --urls data/cross-brand-audit-urls.txt --adjudicate
  python cross-brand-similarity-audit.py --urls data/cross-brand-audit-urls.txt --confirm

Requires env var: OPENAI_API_KEY
Optional env var: ANTHROPIC_API_KEY (only if --adjudicate)
Dependencies: see requirements-audit.txt
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import json
import os
import re
import sys
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable

import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
from sklearn.metrics.pairwise import cosine_similarity

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

EMBED_MODEL = "text-embedding-3-small"       # LOCKED 2026-06-08
EMBED_DIM = 1536
EMBED_PRICE_PER_1M_TOKENS = 0.02              # USD, OpenAI 2026-06 pricing
MAX_URLS_PER_RUN = 200                        # safety cap
FETCH_TIMEOUT = 20                            # seconds
FETCH_RETRIES = 2
COST_CONFIRM_THRESHOLD_USD = 1.00
SAME_LOCALE_ONLY = True                       # cross-language pairs filtered out

# Threshold matrix
T_REWRITE = 0.92
T_DIFFERENTIATE = 0.85
T_SOFT_WATCH = 0.75

USER_AGENT = "MerryAudit/1.0 (+cross-brand-similarity-audit; ops@merrysails.com)"

BRAND_REGISTRY_PATH = Path.home() / ".agents" / "skills" / "daily-ops" / "brand-registry.json"

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)

TODAY = dt.date.today().isoformat()


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

@dataclass
class UrlRow:
    brand: str
    url: str
    vertical: str
    page_type: str  # pillar | commercial | blog

    @property
    def locale(self) -> str:
        """Infer locale from URL path: /tr/..., /de/..., else 'en'."""
        m = re.search(r"://[^/]+/([a-z]{2})(/|$)", self.url)
        if m:
            code = m.group(1)
            if code in {"tr", "de", "fr", "nl", "ru", "ar", "zh", "ja", "ko", "es", "it"}:
                return code
        return "en"


# ---------------------------------------------------------------------------
# Brand registry
# ---------------------------------------------------------------------------

def load_brand_registry() -> dict:
    """Read ~/.agents/skills/daily-ops/brand-registry.json if present.

    Used only to validate that brand IDs in the URL list are known.
    Missing registry is non-fatal — we warn and continue.
    """
    if not BRAND_REGISTRY_PATH.exists():
        print(f"[warn] brand registry not found at {BRAND_REGISTRY_PATH}; skipping validation")
        return {}
    try:
        return json.loads(BRAND_REGISTRY_PATH.read_text())
    except Exception as e:
        print(f"[warn] could not parse brand registry: {e}")
        return {}


# ---------------------------------------------------------------------------
# Input parsing
# ---------------------------------------------------------------------------

def parse_url_file(path: Path) -> list[UrlRow]:
    rows: list[UrlRow] = []
    with path.open() as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = [p.strip() for p in line.split(",")]
            if len(parts) < 4:
                print(f"[warn] skipping malformed line (need 4 cols): {line}")
                continue
            brand, url, vertical, page_type = parts[:4]
            rows.append(UrlRow(brand=brand, url=url, vertical=vertical, page_type=page_type))
    if len(rows) > MAX_URLS_PER_RUN:
        print(f"[error] {len(rows)} URLs exceeds safety cap of {MAX_URLS_PER_RUN}")
        sys.exit(2)
    return rows


# ---------------------------------------------------------------------------
# Fetch + extract main content
# ---------------------------------------------------------------------------

# tags whose content we drop entirely
STRIP_TAGS = ["script", "style", "nav", "footer", "header", "aside", "form", "noscript", "svg", "iframe"]


def fetch_html(url: str) -> str | None:
    """Fetch URL with retry. Returns HTML text or None on failure."""
    for attempt in range(FETCH_RETRIES + 1):
        try:
            r = requests.get(
                url,
                headers={"User-Agent": USER_AGENT, "Accept-Language": "en;q=0.9"},
                timeout=FETCH_TIMEOUT,
            )
            if r.status_code == 200:
                return r.text
            print(f"[warn] {url} -> HTTP {r.status_code}")
            return None
        except requests.RequestException as e:
            if attempt < FETCH_RETRIES:
                time.sleep(1 + attempt)
                continue
            print(f"[warn] fetch failed for {url}: {e}")
            return None


def extract_main_text(html: str) -> str:
    """Strip nav/footer/script/style, return concatenated visible text."""
    soup = BeautifulSoup(html, "html.parser")
    for tag in STRIP_TAGS:
        for el in soup.find_all(tag):
            el.decompose()
    # Prefer <main> or <article> if present, else <body>
    container = soup.find("main") or soup.find("article") or soup.body or soup
    text = container.get_text(separator=" ", strip=True)
    # Normalize whitespace
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# ---------------------------------------------------------------------------
# Embedding
# ---------------------------------------------------------------------------

def estimate_tokens(texts: Iterable[str]) -> int:
    """Cheap heuristic: ~1 token per 4 chars. Good enough for cost guard."""
    return sum(len(t) // 4 for t in texts)


def embed_texts(texts: list[str], openai_client) -> list[list[float]]:
    """Batched embedding call. text-embedding-3-small accepts up to ~8K tokens/input."""
    # Truncate each text to ~30K chars (~7500 tokens) to stay under the limit.
    truncated = [t[:30000] for t in texts]
    out: list[list[float]] = []
    BATCH = 50
    for i in range(0, len(truncated), BATCH):
        chunk = truncated[i : i + BATCH]
        resp = openai_client.embeddings.create(model=EMBED_MODEL, input=chunk)
        out.extend([d.embedding for d in resp.data])
    return out


# ---------------------------------------------------------------------------
# Action classification
# ---------------------------------------------------------------------------

def classify(cos: float) -> str:
    if cos >= T_REWRITE:
        return "REWRITE_or_410+301"
    if cos >= T_DIFFERENTIATE:
        return "5-AXIS_DIFFERENTIATE"
    if cos >= T_SOFT_WATCH:
        return "SOFT_WATCH"
    return "OK"


# ---------------------------------------------------------------------------
# Optional Claude Opus adjudicator (off by default)
# ---------------------------------------------------------------------------

ADJUDICATOR_PROMPT = """You are reviewing two URLs from a tourism/transfer brand portfolio for
"scaled content abuse" risk per Google's Mar 2024 spam policy + Mar 2026 leaked
QualityCopiaFireflySiteSignal classifier.

Page A ({brand_a}): {url_a}
Page B ({brand_b}): {url_b}
Cosine similarity: {cos:.3f}
Vertical: {vertical}

Excerpt A (first 1500 chars):
{text_a}

Excerpt B (first 1500 chars):
{text_b}

Decide the action:
- REWRITE: pages are near-paraphrases; one should be rewritten with distinct first-party
  data, voice, and angle.
- 410+301: weaker page is dead weight; 410 it (or 301 to stronger sibling).
- 5-AXIS_DIFFERENTIATE: pages cover the same vertical but with overlap; differentiate via
  tier / scope / geo / demographic / voice (need at least 2 axes distinct).
- KEEP: pages are sufficiently distinct; cosine overstates similarity.

Reply in 3 lines:
ACTION: <one of the above>
WHY: <one sentence>
WHICH_PAGE_LOSES: <url or "neither">
"""


def adjudicate_pair(row, anthropic_client) -> dict:
    """Optional human-level review for 0.85-0.92 cosine pairs."""
    msg = anthropic_client.messages.create(
        model="claude-opus-4-7",
        max_tokens=300,
        messages=[{"role": "user", "content": ADJUDICATOR_PROMPT.format(**row)}],
    )
    text = msg.content[0].text
    out = {"adjudicator_raw": text}
    for line in text.splitlines():
        if line.startswith("ACTION:"):
            out["adjudicator_action"] = line.split(":", 1)[1].strip()
        elif line.startswith("WHY:"):
            out["adjudicator_why"] = line.split(":", 1)[1].strip()
        elif line.startswith("WHICH_PAGE_LOSES:"):
            out["adjudicator_loser"] = line.split(":", 1)[1].strip()
    return out


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def load_prior_embeddings() -> dict | None:
    """Today's embeddings file — used for idempotency."""
    path = DATA_DIR / f"embeddings-{TODAY}.json"
    if path.exists():
        return json.loads(path.read_text())
    return None


def save_embeddings(records: list[dict]) -> Path:
    path = DATA_DIR / f"embeddings-{TODAY}.json"
    path.write_text(json.dumps({"model": EMBED_MODEL, "date": TODAY, "records": records}, indent=2))
    return path


def build_pair_dataframe(records: list[dict]) -> pd.DataFrame:
    """All same-vertical, different-brand, same-locale pairs with cosine >= T_SOFT_WATCH."""
    if not records:
        return pd.DataFrame()
    vecs = np.array([r["embedding"] for r in records], dtype=np.float32)
    sims = cosine_similarity(vecs)
    rows = []
    n = len(records)
    for i in range(n):
        for j in range(i + 1, n):
            a, b = records[i], records[j]
            if a["brand"] == b["brand"]:
                continue
            if a["vertical"] != b["vertical"]:
                continue
            if SAME_LOCALE_ONLY and a["locale"] != b["locale"]:
                continue
            cos = float(sims[i, j])
            if cos < T_SOFT_WATCH:
                continue
            rows.append(
                {
                    "brand_a": a["brand"],
                    "url_a": a["url"],
                    "brand_b": b["brand"],
                    "url_b": b["url"],
                    "vertical": a["vertical"],
                    "locale": a["locale"],
                    "page_type_a": a["page_type"],
                    "page_type_b": b["page_type"],
                    "cosine": round(cos, 4),
                    "recommended_action": classify(cos),
                }
            )
    df = pd.DataFrame(rows)
    if not df.empty:
        df = df.sort_values("cosine", ascending=False).reset_index(drop=True)
    return df


def write_csv(df: pd.DataFrame) -> Path:
    path = DATA_DIR / f"cross-brand-similarity-{TODAY}.csv"
    df.to_csv(path, index=False, quoting=csv.QUOTE_MINIMAL)
    return path


def write_markdown(df: pd.DataFrame) -> Path:
    path = DATA_DIR / f"cross-brand-similarity-actions-{TODAY}.md"
    lines: list[str] = []
    lines.append(f"# Cross-Brand Similarity Audit — {TODAY}")
    lines.append("")
    lines.append(f"- Embedding model: `{EMBED_MODEL}` (locked)")
    lines.append(f"- Pairs in soft-watch zone or higher: **{len(df)}**")
    if not df.empty:
        for tier in ["REWRITE_or_410+301", "5-AXIS_DIFFERENTIATE", "SOFT_WATCH"]:
            n = int((df["recommended_action"] == tier).sum())
            lines.append(f"  - {tier}: {n}")
    lines.append("")
    lines.append("## Threshold matrix")
    lines.append("")
    lines.append("| cosine | action |")
    lines.append("|--------|--------|")
    lines.append(f"| >= {T_REWRITE} | REWRITE or 410+301 |")
    lines.append(f"| {T_DIFFERENTIATE}-{T_REWRITE} | 5-axis differentiate |")
    lines.append(f"| {T_SOFT_WATCH}-{T_DIFFERENTIATE} | soft watch |")
    lines.append(f"| < {T_SOFT_WATCH} | OK |")
    lines.append("")
    lines.append("## Top 20 priority pairs")
    lines.append("")
    if df.empty:
        lines.append("_No pairs above soft-watch threshold. Portfolio is topically distinct._")
    else:
        lines.append("| # | cos | action | A | B | vertical |")
        lines.append("|---|-----|--------|---|---|----------|")
        for i, row in df.head(20).iterrows():
            lines.append(
                f"| {i + 1} | {row['cosine']:.3f} | {row['recommended_action']} | "
                f"{row['brand_a']}: {row['url_a']} | {row['brand_b']}: {row['url_b']} | "
                f"{row['vertical']} |"
            )
    lines.append("")
    lines.append("## Caveats")
    lines.append("")
    lines.append("- Cosine is a priority heuristic, not Google's decision boundary.")
    lines.append("- Whole-page cosine misses section-level paraphrase (Lily Ray 'severity not volume').")
    lines.append("- Cross-locale pairs are filtered out — run a multilingual pass separately.")
    lines.append("- Final REWRITE/DELETE decision needs a human reading both pages.")
    path.write_text("\n".join(lines))
    return path


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(description="Cross-brand similarity audit")
    ap.add_argument("--urls", default="data/cross-brand-audit-urls.txt", help="Path to URL list")
    ap.add_argument("--force", action="store_true", help="Re-embed even if today's cache exists")
    ap.add_argument("--adjudicate", action="store_true", help="Run Claude Opus on 0.85-0.92 pairs")
    ap.add_argument("--confirm", action="store_true", help="Skip the >$1 cost prompt")
    args = ap.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("[error] OPENAI_API_KEY env var not set")
        return 2

    url_path = Path(args.urls)
    if not url_path.is_absolute():
        url_path = ROOT / url_path
    if not url_path.exists():
        print(f"[error] URL file not found: {url_path}")
        return 2

    load_brand_registry()  # validation only; warn-and-continue if absent
    rows = parse_url_file(url_path)
    print(f"[info] {len(rows)} URLs queued")

    # Idempotency: reuse today's embeddings unless --force
    prior = None if args.force else load_prior_embeddings()
    if prior:
        print(f"[info] reusing today's embeddings ({len(prior['records'])} records); pass --force to regenerate")
        records = prior["records"]
    else:
        # Fetch + extract
        fetched: list[dict] = []
        for i, row in enumerate(rows, 1):
            print(f"[fetch {i}/{len(rows)}] {row.url}")
            html = fetch_html(row.url)
            if not html:
                continue
            text = extract_main_text(html)
            if len(text) < 200:
                print(f"[warn] very short content ({len(text)} chars) — skipping {row.url}")
                continue
            fetched.append(
                {
                    "brand": row.brand,
                    "url": row.url,
                    "vertical": row.vertical,
                    "page_type": row.page_type,
                    "locale": row.locale,
                    "text": text,
                    "content_hash": content_hash(text),
                }
            )

        if not fetched:
            print("[error] no URLs fetched successfully")
            return 1

        # Cost guard
        est_tokens = estimate_tokens(r["text"] for r in fetched)
        est_cost = (est_tokens / 1_000_000) * EMBED_PRICE_PER_1M_TOKENS
        print(f"[cost] ~{est_tokens} tokens, est. ${est_cost:.4f} on {EMBED_MODEL}")
        if est_cost > COST_CONFIRM_THRESHOLD_USD and not args.confirm:
            print(f"[abort] estimated cost ${est_cost:.4f} > ${COST_CONFIRM_THRESHOLD_USD}; pass --confirm to proceed")
            return 3

        # Embed
        try:
            from openai import OpenAI
        except ImportError:
            print("[error] `pip install openai` first")
            return 2
        client = OpenAI()
        print(f"[embed] calling {EMBED_MODEL} for {len(fetched)} docs")
        vectors = embed_texts([r["text"] for r in fetched], client)
        for r, v in zip(fetched, vectors):
            r["embedding"] = v
            # drop the heavy raw text from saved JSON to keep file small
            r.pop("text", None)
        records = fetched
        save_path = save_embeddings(records)
        print(f"[saved] embeddings -> {save_path}")

    # Pairwise similarity
    df = build_pair_dataframe(records)

    # Optional Claude adjudication for 0.85-0.92 zone
    if args.adjudicate and not df.empty:
        if not os.environ.get("ANTHROPIC_API_KEY"):
            print("[warn] --adjudicate set but ANTHROPIC_API_KEY missing; skipping")
        else:
            try:
                import anthropic
            except ImportError:
                print("[warn] `pip install anthropic` to use --adjudicate; skipping")
            else:
                # Need text again for adjudication — re-fetch only the gray zone pages.
                # Keep cost bounded: only top 10 gray-zone pairs.
                gray = df[df["recommended_action"] == "5-AXIS_DIFFERENTIATE"].head(10)
                print(f"[adjudicate] running Opus on {len(gray)} gray-zone pairs")
                client = anthropic.Anthropic()
                adj_rows = []
                for _, row in gray.iterrows():
                    html_a = fetch_html(row["url_a"]) or ""
                    html_b = fetch_html(row["url_b"]) or ""
                    text_a = extract_main_text(html_a)[:1500]
                    text_b = extract_main_text(html_b)[:1500]
                    payload = {
                        "brand_a": row["brand_a"],
                        "url_a": row["url_a"],
                        "brand_b": row["brand_b"],
                        "url_b": row["url_b"],
                        "cos": row["cosine"],
                        "vertical": row["vertical"],
                        "text_a": text_a,
                        "text_b": text_b,
                    }
                    try:
                        adj = adjudicate_pair(payload, client)
                    except Exception as e:
                        print(f"[warn] adjudicator failed for {row['url_a']} vs {row['url_b']}: {e}")
                        continue
                    adj_rows.append({**row.to_dict(), **adj})
                if adj_rows:
                    adj_path = DATA_DIR / f"cross-brand-similarity-adjudicated-{TODAY}.json"
                    adj_path.write_text(json.dumps(adj_rows, indent=2))
                    print(f"[saved] adjudication -> {adj_path}")

    # Outputs
    csv_path = write_csv(df)
    md_path = write_markdown(df)

    # Executive summary
    print()
    print("=" * 60)
    print(f"Cross-Brand Similarity Audit — {TODAY}")
    print("=" * 60)
    print(f"URLs embedded:        {len(records)}")
    print(f"Pairs (cos >= {T_SOFT_WATCH}):    {len(df)}")
    if not df.empty:
        for tier in ["REWRITE_or_410+301", "5-AXIS_DIFFERENTIATE", "SOFT_WATCH"]:
            n = int((df["recommended_action"] == tier).sum())
            print(f"  {tier:24s} {n}")
        print()
        print("Top 5 pairs:")
        for _, row in df.head(5).iterrows():
            print(f"  {row['cosine']:.3f}  {row['recommended_action']:24s}  "
                  f"{row['brand_a']} vs {row['brand_b']}  ({row['vertical']})")
    print()
    print(f"CSV:      {csv_path}")
    print(f"Actions:  {md_path}")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
