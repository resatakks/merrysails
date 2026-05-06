#!/usr/bin/env python3
"""
Re-add Product schema to 11 locale files where aggregateRating was previously
stripped (commit ddbf757). Surfaces Review snippet rich result via Google's
supported Product parent type without conflicting with TouristTrip+Service.

Original rating data (recovered from git):
  - 10 files used hardcoded "4.9" / "312"
  - yacht-charter-istanbul used yachtTour.rating / yachtTour.reviewCount
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# (path, rating_value_expr, review_count_expr, name_expr_hint, image_expr_hint, slug_for_sku, category)
FILES = [
    ("src/app/[locale]/boat-rental-istanbul/page.tsx", '"4.9"', '"312"', "boat-rental-istanbul", "Bosphorus Boat Rental"),
    ("src/app/[locale]/corporate-events/page.tsx", '"4.9"', '"312"', "corporate-events", "Corporate Yacht Event"),
    ("src/app/[locale]/dinner-cruise-pickup-sultanahmet-taksim/page.tsx", '"4.9"', '"312"', "dinner-cruise-pickup-sultanahmet-taksim", "Bosphorus Dinner Cruise with Pickup"),
    ("src/app/[locale]/dinner-cruise-with-hotel-pickup-istanbul/page.tsx", '"4.9"', '"312"', "dinner-cruise-with-hotel-pickup-istanbul", "Bosphorus Dinner Cruise with Hotel Pickup"),
    ("src/app/[locale]/kabatas-dinner-cruise-istanbul/page.tsx", '"4.9"', '"312"', "kabatas-dinner-cruise-istanbul", "Kabataş Pier Dinner Cruise"),
    ("src/app/[locale]/private-dinner-cruise-for-couples-istanbul/page.tsx", '"4.9"', '"312"', "private-dinner-cruise-for-couples-istanbul", "Private Dinner Cruise for Couples"),
    ("src/app/[locale]/proposal-yacht-rental-istanbul/page.tsx", '"4.9"', '"312"', "proposal-yacht-rental-istanbul", "Proposal Yacht Rental"),
    ("src/app/[locale]/sunset-cruise-tickets-istanbul/page.tsx", '"4.9"', '"312"', "sunset-cruise-tickets-istanbul", "Bosphorus Sunset Cruise Tickets"),
    ("src/app/[locale]/team-building-yacht-istanbul/page.tsx", '"4.9"', '"312"', "team-building-yacht-istanbul", "Team Building Yacht Charter"),
    ("src/app/[locale]/turkish-night-dinner-cruise-istanbul/page.tsx", '"4.9"', '"312"', "turkish-night-dinner-cruise-istanbul", "Turkish Night Dinner Cruise"),
    ("src/app/[locale]/yacht-charter-istanbul/page.tsx", "yachtTour.rating", "yachtTour.reviewCount", "yacht-charter-istanbul", "Private Yacht Charter Istanbul"),
]


def find_service_schema_end(src):
    """Find the position right after `const serviceSchema = { ... };` closing."""
    start = src.find("const serviceSchema = {")
    if start == -1:
        return -1
    depth = 0
    in_string = None
    i = start
    while i < len(src):
        ch = src[i]
        if in_string:
            if ch == in_string and src[i - 1] != "\\":
                in_string = None
        elif ch in ('"', "'", "`"):
            in_string = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                # Look for `;` after
                j = i + 1
                while j < len(src) and src[j] in " \t":
                    j += 1
                if j < len(src) and src[j] == ";":
                    return j + 1
                return i + 1
        i += 1
    return -1


def extract_field_from_service(src, end_pos, field):
    """Extract a field value from the serviceSchema block."""
    start = src.find("const serviceSchema = {")
    block = src[start:end_pos]
    pattern = rf'\b{field}:\s*([^,\n]+(?:`[^`]*`)?)\s*,'
    m = re.search(pattern, block)
    return m.group(1).strip() if m else None


def transform(src, slug, category, rating_expr, review_expr):
    if "productSchema" in src:
        return None, "productSchema already present"

    end_pos = find_service_schema_end(src)
    if end_pos == -1:
        return None, "serviceSchema not found"

    # Extract name, description, image from serviceSchema
    name_expr = extract_field_from_service(src, end_pos, "name") or '""'
    desc_expr = extract_field_from_service(src, end_pos, "description") or '""'
    image_expr = extract_field_from_service(src, end_pos, "image") or '""'

    # Detect packages access pattern (yacht etc.)
    svc_block = src[src.find("const serviceSchema = {"):end_pos]
    has_packages = "packages?" in svc_block
    tour_var_match = re.search(r"(\w+)\.packages\?", svc_block)
    if has_packages and tour_var_match:
        tour_var = tour_var_match.group(1)
        offers = (
            "{\n"
            '      "@type": "AggregateOffer",\n'
            '      priceCurrency: "EUR",\n'
            f"      lowPrice: Math.min(...({tour_var}.packages?.map((p) => p.price) ?? [{tour_var}.priceEur])),\n"
            f"      highPrice: Math.max(...({tour_var}.packages?.map((p) => p.price) ?? [{tour_var}.priceEur])),\n"
            f"      offerCount: {tour_var}.packages?.length ?? 1,\n"
            '      availability: "https://schema.org/InStock",\n'
            "      seller: { \"@id\": `${SITE_URL}/#organization` },\n"
            "    }"
        )
    else:
        offers = (
            "{\n"
            '      "@type": "Offer",\n'
            '      priceCurrency: "EUR",\n'
            '      availability: "https://schema.org/InStock",\n'
            "      seller: { \"@id\": `${SITE_URL}/#organization` },\n"
            "    }"
        )

    product_block = (
        "\n\n"
        "  // Separate Product schema for Google Review snippet rich result\n"
        "  // (Service/TouristTrip parent is not supported per Google's spec)\n"
        "  const productSchema = {\n"
        '    "@context": "https://schema.org",\n'
        '    "@type": "Product",\n'
        f"    name: {name_expr},\n"
        f"    description: {desc_expr},\n"
        f"    image: {image_expr},\n"
        '    brand: { "@type": "Brand", name: "MerrySails" },\n'
        f"    sku: `merrysails-{slug}-${{locale}}`,\n"
        f'    category: "{category}",\n'
        "    aggregateRating: {\n"
        '      "@type": "AggregateRating",\n'
        f"      ratingValue: {rating_expr},\n"
        f"      reviewCount: {review_expr},\n"
        "      bestRating: 5,\n"
        "      worstRating: 1,\n"
        "    },\n"
        f"    offers: {offers},\n"
        "  };"
    )

    new_src = src[:end_pos] + product_block + src[end_pos:]

    # Add script tag after serviceSchema script — handle both single-line and multi-line
    # Single-line variant
    sl_pattern = re.compile(
        r'(<script type="application/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(serviceSchema\)\s*\}\}\s*/>)'
    )
    # Multi-line variant
    ml_pattern = re.compile(
        r'(<script\s*\n\s*type="application/ld\+json"\s*\n\s*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(serviceSchema\)\s*\}\}\s*\n?\s*/>)'
    )

    sl = sl_pattern.search(new_src)
    if sl:
        product_script = '\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />'
        new_src = new_src[: sl.end()] + product_script + new_src[sl.end():]
    else:
        ml = ml_pattern.search(new_src)
        if ml:
            indent_match = re.match(r"\s*", ml.group(0))
            indent = indent_match.group(0) if indent_match else "      "
            product_script = (
                f"\n{indent}<script\n"
                f'{indent}  type="application/ld+json"\n'
                f"{indent}  dangerouslySetInnerHTML={{{{ __html: JSON.stringify(productSchema) }}}}\n"
                f"{indent}/>"
            )
            new_src = new_src[: ml.end()] + product_script + new_src[ml.end():]
        else:
            return None, "serviceSchema script tag not found (single or multi-line)"

    return new_src, "ok"


def main():
    changed = 0
    skipped = 0
    for path_rel, rating_expr, review_expr, slug, category in FILES:
        path = ROOT / path_rel
        if not path.exists():
            print(f"  [MISS] {path_rel}")
            continue
        src = path.read_text()
        new_src, msg = transform(src, slug, category, rating_expr, review_expr)
        if new_src is None:
            print(f"  [SKIP] {path_rel} — {msg}")
            skipped += 1
            continue
        path.write_text(new_src)
        print(f"  [OK]   {path_rel}")
        changed += 1
    print(f"\n{changed} changed, {skipped} skipped")
    return 0 if changed > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
