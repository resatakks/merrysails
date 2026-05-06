#!/usr/bin/env python3
"""
Conservative fix: remove aggregateRating from locale page serviceSchemas where
parent is ["TouristTrip","Service"] (Google does NOT support Review snippet
rich result on this parent type per spec).

This eliminates lint warnings + potential parser conflicts. Future session can
re-add aggregateRating via separate Product schema block.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

LOCALE_FILES = [
    "src/app/[locale]/boat-rental-istanbul/page.tsx",
    "src/app/[locale]/corporate-events/page.tsx",
    "src/app/[locale]/dinner-cruise-pickup-sultanahmet-taksim/page.tsx",
    "src/app/[locale]/dinner-cruise-with-hotel-pickup-istanbul/page.tsx",
    "src/app/[locale]/kabatas-dinner-cruise-istanbul/page.tsx",
    "src/app/[locale]/private-dinner-cruise-for-couples-istanbul/page.tsx",
    "src/app/[locale]/proposal-yacht-rental-istanbul/page.tsx",
    "src/app/[locale]/sunset-cruise-tickets-istanbul/page.tsx",
    "src/app/[locale]/team-building-yacht-istanbul/page.tsx",
    "src/app/[locale]/turkish-night-dinner-cruise-istanbul/page.tsx",
    "src/app/[locale]/yacht-charter-istanbul/page.tsx",
]


def transform(src):
    """Remove aggregateRating block (variable refs OR hardcoded values)."""
    pattern = re.compile(
        r'\n\s+aggregateRating:\s*\{\s*\n'
        r'\s*"@type":\s*"AggregateRating",\s*\n'
        r'\s*ratingValue:\s*[^,]+,\s*\n'
        r'\s*reviewCount:\s*[^,]+,\s*\n'
        r'\s*bestRating:\s*"?5"?,\s*\n'
        r'\s*worstRating:\s*"?1"?,\s*\n'
        r'\s*\},'
    )
    new_src, count = pattern.subn('', src)
    return new_src if count > 0 else None


def main():
    changed = 0
    skipped = 0
    for rel in LOCALE_FILES:
        path = ROOT / rel
        if not path.exists():
            print(f"  [MISS] {rel}")
            continue
        src = path.read_text()
        new_src = transform(src)
        if new_src is None:
            print(f"  [SKIP] {rel}")
            skipped += 1
            continue
        path.write_text(new_src)
        print(f"  [OK]   {rel}")
        changed += 1

    print(f"\n{changed} changed, {skipped} skipped")
    return 0 if changed > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
