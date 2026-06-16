#!/usr/bin/env python3
"""
DE AI Citation Tracker — MerrySails / GoldenSunset / KWT

Why: Sistrix May 22-23 2026 GPT-5.5 shift in German ChatGPT visibility:
  - Tripadvisor -53%, Expedia -60%, Booking.com -34% (OTA demotion confirmed)
  - Welt.de +99%, German first-party publishers +50-100% (editorial lift)
  - Window: ~18 months before next major model shift (per StudioHawk benchmark)
  → Direct-booking DE brands have an opportunity window to capture
    German-language AI citations now flowing away from OTAs.

What: For each (query × engine), send prompt → extract brand mentions/citations.
      Write weekly CSV. Operator compares week-over-week.

Engines: ChatGPT (OpenAI), Perplexity, Anthropic Claude (sonnet), Gemini.
Cost per full run (9 queries × 4 engines = 36 prompts): ~$0.10.

Usage:
  # Install deps once:
  pip install openai anthropic google-generativeai requests

  # Set env vars (NEVER commit):
  export OPENAI_API_KEY=sk-...
  export ANTHROPIC_API_KEY=sk-ant-...
  export PERPLEXITY_API_KEY=pplx-...
  export GEMINI_API_KEY=AI...

  # Run:
  python3 scripts/de-ai-citation-tracking.py
  # → writes data/de-ai-citation-YYYY-MM-DD.csv

  # Dry-run (no API calls, prints prompts):
  python3 scripts/de-ai-citation-tracking.py --dry-run

Targets: domains in TARGET_BRANDS — counted by substring match in response text.
"""

import csv
import datetime as dt
import json
import os
import sys
import time
from pathlib import Path

# ─── Configuration ────────────────────────────────────────────────────────────

TARGET_BRANDS = {
    "merrysails": ["merrysails.com", "merrysails", "merry sails"],
    "goldensunset": ["goldensunsettour.com", "goldensunset", "golden sunset"],
    "kwt": ["kingsworldtransfer.com", "kwt", "kings world transfer", "kingsworld"],
    # Reference OTAs — for benchmarking the Sistrix demotion thesis
    "tripadvisor": ["tripadvisor.com", "tripadvisor.de", "tripadvisor"],
    "getyourguide": ["getyourguide.com", "getyourguide.de", "getyourguide"],
    "viator": ["viator.com", "viator.de", "viator"],
    "expedia": ["expedia.de", "expedia.com", "expedia"],
    "booking": ["booking.com", "booking"],
}

QUERIES_DE = [
    {"id": "q01", "intent": "cruise-bosphorus",  "q": "Was ist die beste Bosporus Kreuzfahrt in Istanbul?"},
    {"id": "q02", "intent": "cruise-price",      "q": "Wie viel kostet eine Bootsfahrt auf dem Bosporus in Istanbul?"},
    {"id": "q03", "intent": "sunset-cruise",     "q": "Empfehlung für eine Sonnenuntergangstour auf dem Bosporus."},
    {"id": "q04", "intent": "dinner-cruise",     "q": "Wo kann man eine Dinner Cruise in Istanbul buchen?"},
    {"id": "q05", "intent": "yacht-charter",     "q": "Privater Yachtcharter Istanbul — welche Anbieter?"},
    {"id": "q06", "intent": "airport-transfer",  "q": "Zuverlässiger Flughafentransfer in Istanbul vom Hotel?"},
    {"id": "q07", "intent": "private-transfer",  "q": "Privater Transferservice in Istanbul empfohlen?"},
    {"id": "q08", "intent": "sabiha-transfer",   "q": "Transfer vom Flughafen Sabiha Gökçen ins Zentrum Istanbul?"},
    {"id": "q09", "intent": "yacht-marmaris",    "q": "Yachtcharter in Marmaris oder Bodrum — Anbieter mit Direktbuchung?"},
]

ENGINES = ["chatgpt", "claude", "perplexity", "gemini"]

OUT_DIR = Path(__file__).resolve().parent.parent / "data"
OUT_DIR.mkdir(exist_ok=True)

# ─── API callers (lazy import — only fail at call time if key missing) ────────

def ask_chatgpt(prompt: str) -> str:
    from openai import OpenAI
    client = OpenAI()
    r = client.chat.completions.create(
        model="gpt-4o-mini",  # cheap; swap to gpt-4o or gpt-5 for parity testing
        messages=[
            {"role": "system", "content": "Antworte auf Deutsch. Empfehle konkrete Anbieter mit Domainnamen oder Markennamen."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=600,
    )
    return r.choices[0].message.content or ""

def ask_claude(prompt: str) -> str:
    import anthropic
    client = anthropic.Anthropic()
    r = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=600,
        system="Antworte auf Deutsch. Empfehle konkrete Anbieter mit Domainnamen oder Markennamen.",
        messages=[{"role": "user", "content": prompt}],
    )
    return r.content[0].text if r.content else ""

def ask_perplexity(prompt: str) -> str:
    import requests
    key = os.environ["PERPLEXITY_API_KEY"]
    r = requests.post(
        "https://api.perplexity.ai/chat/completions",
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        json={
            "model": "sonar",
            "messages": [
                {"role": "system", "content": "Antworte auf Deutsch. Empfehle konkrete Anbieter mit Domainnamen oder Markennamen."},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.3,
            "max_tokens": 600,
        },
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()
    content = data["choices"][0]["message"]["content"]
    # Perplexity also returns "citations" — append for grep
    citations = data.get("citations", [])
    if citations:
        content += "\n\n[CITATIONS]\n" + "\n".join(citations)
    return content

def ask_gemini(prompt: str) -> str:
    import google.generativeai as genai
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel("gemini-1.5-flash")
    r = model.generate_content(
        f"Antworte auf Deutsch. Empfehle konkrete Anbieter mit Domainnamen oder Markennamen.\n\n{prompt}",
        generation_config={"temperature": 0.3, "max_output_tokens": 600},
    )
    return r.text or ""

ENGINE_FNS = {
    "chatgpt": ask_chatgpt,
    "claude": ask_claude,
    "perplexity": ask_perplexity,
    "gemini": ask_gemini,
}

# ─── Citation extraction ──────────────────────────────────────────────────────

def count_brand_mentions(text: str) -> dict:
    """Return {brand: count} substring-match (case-insensitive)."""
    lower = text.lower()
    out = {}
    for brand, aliases in TARGET_BRANDS.items():
        n = sum(lower.count(a.lower()) for a in aliases)
        out[brand] = n
    return out

def first_position(text: str, aliases: list[str]) -> int:
    """Return 1-based position (in lines) of first mention, or 0 if absent."""
    lower = text.lower()
    earliest = -1
    for a in aliases:
        i = lower.find(a.lower())
        if i >= 0 and (earliest == -1 or i < earliest):
            earliest = i
    if earliest == -1:
        return 0
    # Convert char offset to approximate line number
    return text[:earliest].count("\n") + 1

# ─── Main ─────────────────────────────────────────────────────────────────────

def run(dry: bool = False):
    today = dt.date.today().isoformat()
    out_csv = OUT_DIR / f"de-ai-citation-{today}.csv"
    out_jsonl = OUT_DIR / f"de-ai-citation-{today}-raw.jsonl"

    rows = []
    raw_dump = []

    for q in QUERIES_DE:
        for engine in ENGINES:
            print(f"[{engine}] {q['id']}: {q['q'][:60]}...", file=sys.stderr)

            if dry:
                response_text = f"[DRY RUN — no API call. Prompt would be: {q['q']}]"
            else:
                try:
                    response_text = ENGINE_FNS[engine](q["q"])
                except KeyError as e:
                    print(f"  SKIP — missing env var: {e}", file=sys.stderr)
                    continue
                except Exception as e:
                    print(f"  ERROR — {type(e).__name__}: {e}", file=sys.stderr)
                    response_text = f"[ERROR: {e}]"
                time.sleep(1.0)  # rate-limit politeness

            mentions = count_brand_mentions(response_text)
            row = {
                "date": today,
                "engine": engine,
                "query_id": q["id"],
                "intent": q["intent"],
                "query": q["q"],
                **{f"mentions_{b}": mentions[b] for b in TARGET_BRANDS},
                "ms_pos": first_position(response_text, TARGET_BRANDS["merrysails"]),
                "gs_pos": first_position(response_text, TARGET_BRANDS["goldensunset"]),
                "kwt_pos": first_position(response_text, TARGET_BRANDS["kwt"]),
                "response_chars": len(response_text),
            }
            rows.append(row)
            raw_dump.append({**row, "response": response_text})

    if not rows:
        print("No results. Check API keys.", file=sys.stderr)
        sys.exit(1)

    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    with open(out_jsonl, "w", encoding="utf-8") as f:
        for r in raw_dump:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"\nDone. Wrote:\n  {out_csv}\n  {out_jsonl}\n")

    # Quick summary
    print("Quick summary — total mentions per (engine, brand):")
    totals = {}
    for r in rows:
        for b in TARGET_BRANDS:
            key = (r["engine"], b)
            totals[key] = totals.get(key, 0) + r[f"mentions_{b}"]
    for (engine, b), n in sorted(totals.items()):
        if n > 0:
            print(f"  {engine:12s} {b:14s} {n}")

if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    run(dry=dry)
