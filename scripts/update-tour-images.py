#!/usr/bin/env python3
"""Update tours.ts to use local images instead of Unsplash URLs"""

import os
import re
import json

BASE = os.path.dirname(os.path.dirname(__file__))
TOURS_FILE = os.path.join(BASE, "src", "data", "tours.ts")
IMAGE_DIR = os.path.join(BASE, "public", "images", "tours")

# Read the image map
with open(os.path.join(IMAGE_DIR, "image-map.json")) as f:
    image_map = json.load(f)

# Also scan actual directories (after renames)
actual_dirs = {}
for d in os.listdir(IMAGE_DIR):
    full = os.path.join(IMAGE_DIR, d)
    if os.path.isdir(full):
        files = sorted([f for f in os.listdir(full) if not f.startswith('.')])
        if files:
            actual_dirs[d] = files

print(f"Found {len(actual_dirs)} tour image directories")

# Read tours.ts
with open(TOURS_FILE, "r") as f:
    content = f.read()

# For each tour slug that has images, update the image and gallery fields
for slug, files in actual_dirs.items():
    # Filter out png (usually logos/icons) and keep only jpg/jpeg/webp
    good_files = [f for f in files if f.endswith(('.jpg', '.jpeg', '.webp')) and not f.endswith('.png')]
    if not good_files:
        good_files = files[:6]  # fallback: use whatever we have

    # Main image = first file
    main_image = f"/images/tours/{slug}/{good_files[0]}"

    # Gallery = first 6 unique images
    gallery_files = good_files[:6]
    gallery_paths = [f"/images/tours/{slug}/{f}" for f in gallery_files]

    # Build gallery string
    gallery_str = "[\n" + ",\n".join([f'      "{p}"' for p in gallery_paths]) + ",\n    ]"

    # Find and replace image field for this slug
    # Pattern: after slug: "xxx", find image: "..." and gallery: [...]
    slug_pattern = f'slug: "{slug}"'
    if slug_pattern not in content:
        print(f"  SKIP: {slug} not found in tours.ts")
        continue

    # Find the tour block (from slug to the next tour entry or end)
    slug_pos = content.index(slug_pattern)

    # Find image field after this slug
    image_pattern = re.compile(r'(image:\s*)"[^"]*"', re.DOTALL)
    # Search from slug position
    match = image_pattern.search(content, slug_pos)
    if match and match.start() < slug_pos + 3000:  # within same tour block
        old = match.group(0)
        new = f'{match.group(1)}"{main_image}"'
        content = content[:match.start()] + new + content[match.end():]
        print(f"  {slug}: image → {main_image}")

    # Re-find slug position (may have shifted)
    slug_pos = content.index(slug_pattern)

    # Find gallery field
    gallery_pattern = re.compile(r'gallery:\s*\[([^\]]*)\]', re.DOTALL)
    match = gallery_pattern.search(content, slug_pos)
    if match and match.start() < slug_pos + 3000:
        old = match.group(0)
        new = f"gallery: {gallery_str}"
        content = content[:match.start()] + new + content[match.end():]
        print(f"  {slug}: gallery → {len(gallery_files)} images")

# Write updated file
with open(TOURS_FILE, "w") as f:
    f.write(content)

print("\nDone! tours.ts updated with local image paths.")
