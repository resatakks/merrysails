#!/usr/bin/env python3
"""
Add Product schema to locale variant pages that have aggregateRating on
["TouristTrip","Service"]. This surfaces Review snippet rich result via Google's
supported parent type without conflicting with TouristTrip+Service tour metadata.

Strategy:
  1. Find `aggregateRating: { ... }` block inside serviceSchema
  2. Extract tour variable name (e.g. yachtTour, dinnerTour) from rating reference
  3. Remove aggregateRating from serviceSchema
  4. Insert `productSchema` constant after serviceSchema
  5. Add `<script>` tag for productSchema in JSX render

Conservative: skips files that don't match the expected pattern.
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


def transform(src, file_label):
    """Returns new content or None if pattern doesn't match safely."""

    # 1. Find aggregateRating block inside serviceSchema
    agg_pattern = re.compile(
        r"(\s+)aggregateRating:\s*\{\s*\n"
        r'\s*"@type":\s*"AggregateRating",\s*\n'
        r"\s*ratingValue:\s*([\w\.]+)\.rating,\s*\n"
        r"\s*reviewCount:\s*([\w\.]+)\.reviewCount,\s*\n"
        r"\s*bestRating:\s*5,\s*\n"
        r"\s*worstRating:\s*1,\s*\n"
        r"\s*\},\s*\n",
        re.MULTILINE,
    )
    match = agg_pattern.search(src)
    if not match:
        print(f"  [SKIP] {file_label} — aggregateRating pattern not found")
        return None

    tour_var = match.group(2)
    if tour_var != match.group(3):
        print(f"  [SKIP] {file_label} — inconsistent tour variable: {match.group(2)} vs {match.group(3)}")
        return None

    # Skip if productSchema already exists
    if "productSchema" in src:
        print(f"  [SKIP] {file_label} — productSchema already present")
        return None

    # 2. Remove aggregateRating block
    new_src = src[: match.start()] + src[match.end() :]

    # 3. Find end of serviceSchema and insert productSchema after it
    # Look for `};` after `const serviceSchema = {`
    svc_start = new_src.find("const serviceSchema = {")
    if svc_start == -1:
        print(f"  [SKIP] {file_label} — serviceSchema declaration not found")
        return None

    # Walk braces to find matching `};`
    depth = 0
    pos = svc_start
    found_end = -1
    in_string = None
    i = pos
    while i < len(new_src):
        ch = new_src[i]
        if in_string:
            if ch == in_string and new_src[i - 1] != "\\":
                in_string = None
        elif ch in ('"', "'", "`"):
            in_string = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                # Expect `;` or `,` next (after maybe whitespace)
                rest = new_src[i + 1 :].lstrip(" ")
                if rest.startswith(";"):
                    found_end = i + 1 + (len(new_src[i + 1 :]) - len(rest)) + 1  # past `;`
                    break
                else:
                    break
        i += 1

    if found_end == -1:
        print(f"  [SKIP] {file_label} — couldn't find serviceSchema closing")
        return None

    # Detect "name" field to use in productSchema
    svc_block = new_src[svc_start:found_end]
    name_match = re.search(r"name:\s*([^,\n]+),", svc_block)
    desc_match = re.search(r"description:\s*([^,\n]+),", svc_block)
    image_match = re.search(r"image:\s*([^,\n]+),", svc_block)
    name_expr = name_match.group(1) if name_match else f'"{file_label}"'
    desc_expr = desc_match.group(1) if desc_match else "undefined"
    image_expr = image_match.group(1) if image_match else "undefined"

    # Detect packages access (some files have packages?, some not)
    has_packages = f"{tour_var}.packages" in svc_block

    # SKU from filename
    slug = Path(file_label).parent.name
    sku = f"merrysails-{slug}-${{locale}}"

    # Detect category from filename
    if "dinner" in slug:
        category = "Bosphorus Dinner Cruise"
    elif "yacht" in slug:
        category = "Private Yacht Charter Istanbul"
    elif "sunset" in slug:
        category = "Bosphorus Sunset Cruise"
    elif "boat-rental" in slug:
        category = "Bosphorus Boat Rental"
    elif "proposal" in slug:
        category = "Proposal Yacht Rental"
    elif "corporate" in slug or "team-building" in slug:
        category = "Corporate Yacht Event"
    elif "kabatas" in slug:
        category = "Kabataş Pier Dinner Cruise"
    elif "turkish-night" in slug:
        category = "Turkish Night Dinner Cruise"
    else:
        category = "Bosphorus Tour"

    # Build productSchema block
    if has_packages:
        offers = f"""{{
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: Math.min(...({tour_var}.packages?.map((p) => p.price) ?? [{tour_var}.priceEur])),
      highPrice: Math.max(...({tour_var}.packages?.map((p) => p.price) ?? [{tour_var}.priceEur])),
      offerCount: {tour_var}.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
      seller: {{ "@id": `${{SITE_URL}}/#organization` }},
    }}"""
    else:
        offers = f"""{{
      "@type": "Offer",
      price: {tour_var}.priceEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {{ "@id": `${{SITE_URL}}/#organization` }},
    }}"""

    product_block = f"""

  // Separate Product schema to surface AggregateRating as Google Review snippet
  // (Service/TouristTrip parent type is not supported by Google for Review snippet rich result)
  const productSchema = {{
    "@context": "https://schema.org",
    "@type": "Product",
    name: {name_expr},
    description: {desc_expr},
    image: {image_expr},
    brand: {{ "@type": "Brand", name: "MerrySails" }},
    sku: `{sku}`,
    category: "{category}",
    aggregateRating: {{
      "@type": "AggregateRating",
      ratingValue: {tour_var}.rating,
      reviewCount: {tour_var}.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }},
    offers: {offers},
  }};"""

    new_src = new_src[:found_end] + product_block + new_src[found_end:]

    # 4. Add productSchema script tag — find the serviceSchema script and insert after it
    svc_script_pattern = re.compile(
        r'(<script type="application/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(serviceSchema\)\s*\}\}\s*/>)'
    )
    svc_script = svc_script_pattern.search(new_src)
    if not svc_script:
        print(f"  [SKIP] {file_label} — serviceSchema script tag not found")
        return None

    product_script = '\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />'
    new_src = (
        new_src[: svc_script.end()] + product_script + new_src[svc_script.end() :]
    )

    return new_src


def main():
    changed = 0
    skipped = 0
    for rel in LOCALE_FILES:
        path = ROOT / rel
        if not path.exists():
            print(f"  [MISS] {rel}")
            continue
        src = path.read_text()
        new_src = transform(src, rel)
        if new_src is None:
            skipped += 1
            continue
        path.write_text(new_src)
        print(f"  [OK]   {rel}")
        changed += 1

    print(f"\n{changed} changed, {skipped} skipped")
    return 0 if changed > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
