#!/usr/bin/env python3
"""Scrape tour images from bosphorussunset.com and save to public/images/tours/{slug}/"""

import urllib.request
import urllib.error
import re
import os
import sys
import time
import ssl
from html.parser import HTMLParser

BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "images", "tours")

TOURS = [
    "bosphorus-sunset-cruise",
    "bosphorus-dinner-cruise",
    "yacht-charter-in-istanbul",
    "bosphorus-sightseeing-yacht-cruise",
    "istanbul-princes-island-tour",
    "istanbul-lunch-cruise-two-continents-tour",
    "byzantine-relics-full-day-istanbul-tour",
    "full-day-istanbul-old-city-tour",
    "private-bosphorus-sunset-cruise",
    "private-bosphorus-dinner-yacht-cruise",
    "private-bosphorus-lunch-yacht-cruise",
    "private-istanbul-bosphorus-yacht-cruise",
    "private-istanbul-yacht-swimming-tour",
    "romantic-marriage-proposal",
    "yacht-birthday-party",
    "yacht-weddings",
    "wedding-anniversary",
    "bachelorette-yacht-party",
    "corporate-event-bosphorus-cruise",
    "new-years-eve-party-cruise-istanbul",
]

class ImageExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []

    def handle_starttag(self, tag, attrs):
        if tag == "img":
            attrs_dict = dict(attrs)
            src = attrs_dict.get("src", "")
            srcset = attrs_dict.get("srcset", "")
            data_src = attrs_dict.get("data-src", "")
            data_lazy = attrs_dict.get("data-lazy-src", "")

            # Collect all possible image sources
            for url in [src, data_src, data_lazy]:
                if url and "wp-content/uploads" in url and not self._is_tiny(url):
                    self.images.append(url)

            # Parse srcset for highest resolution
            if srcset and "wp-content/uploads" in srcset:
                parts = srcset.split(",")
                for part in parts:
                    part = part.strip()
                    url = part.split(" ")[0]
                    if url and "wp-content/uploads" in url and not self._is_tiny(url):
                        self.images.append(url)

        # Also check for background images in style attrs
        if tag in ("div", "section", "a"):
            style = dict(attrs).get("style", "")
            urls = re.findall(r'url\(["\']?(https?://[^"\')\s]+)["\']?\)', style)
            for url in urls:
                if "wp-content/uploads" in url and not self._is_tiny(url):
                    self.images.append(url)

    def _is_tiny(self, url):
        """Filter out thumbnails and tiny images"""
        tiny_patterns = ["-150x150", "-100x100", "-50x50", "-75x75", "logo", "favicon", "icon"]
        return any(p in url.lower() for p in tiny_patterns)


def fetch_page(url):
    """Fetch a URL and return HTML content"""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return ""


def download_image(url, filepath):
    """Download an image to a local path"""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = resp.read()
            with open(filepath, "wb") as f:
                f.write(data)
            return len(data)
    except Exception as e:
        print(f"  ERROR downloading {url}: {e}")
        return 0


def clean_url(url):
    """Remove size suffixes from WordPress URLs to get full-size image"""
    # Remove WordPress resize suffixes like -300x200, -1024x768 etc.
    url = re.sub(r'-\d{2,4}x\d{2,4}(?=\.\w{3,4}(?:\?|$))', '', url)
    # Remove query params
    url = url.split("?")[0]
    return url


def get_extension(url):
    """Get file extension from URL"""
    path = url.split("?")[0]
    ext = os.path.splitext(path)[1].lower()
    if ext in ('.jpg', '.jpeg', '.png', '.webp', '.gif'):
        return ext
    return '.jpg'


def main():
    os.makedirs(BASE_DIR, exist_ok=True)
    total_images = 0
    results = {}

    for slug in TOURS:
        url = f"https://bosphorussunset.com/tour/{slug}/"
        print(f"\n{'='*60}")
        print(f"Fetching: {slug}")
        print(f"{'='*60}")

        html = fetch_page(url)
        if not html:
            print(f"  SKIPPED - could not fetch page")
            continue

        # Extract images
        parser = ImageExtractor()
        parser.feed(html)

        # Also find images in data attributes and script tags
        extra_urls = re.findall(
            r'https?://bosphorussunset\.com/wp-content/uploads/[^\s"\'<>]+\.(?:jpg|jpeg|png|webp|gif)',
            html, re.IGNORECASE
        )
        all_urls = parser.images + extra_urls

        # Clean and deduplicate
        cleaned = []
        seen = set()
        for img_url in all_urls:
            clean = clean_url(img_url)
            if clean not in seen and "logo" not in clean.lower():
                seen.add(clean)
                cleaned.append(clean)

        print(f"  Found {len(cleaned)} unique images")

        if not cleaned:
            continue

        # Create directory
        tour_dir = os.path.join(BASE_DIR, slug)
        os.makedirs(tour_dir, exist_ok=True)

        # Download images
        downloaded = []
        for i, img_url in enumerate(cleaned):
            ext = get_extension(img_url)
            filename = f"{i+1:02d}{ext}"
            filepath = os.path.join(tour_dir, filename)

            # Skip if already downloaded
            if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
                print(f"  [{i+1}/{len(cleaned)}] SKIP (exists): {filename}")
                downloaded.append(filename)
                continue

            size = download_image(img_url, filepath)
            if size > 1000:  # At least 1KB
                kb = size / 1024
                print(f"  [{i+1}/{len(cleaned)}] OK: {filename} ({kb:.0f}KB)")
                downloaded.append(filename)
                total_images += 1
            else:
                # Remove tiny/failed files
                if os.path.exists(filepath):
                    os.remove(filepath)
                print(f"  [{i+1}/{len(cleaned)}] FAILED: too small or error")

            time.sleep(0.3)  # Be polite

        results[slug] = downloaded
        print(f"  Total downloaded for {slug}: {len(downloaded)}")

    # Save results mapping
    results_path = os.path.join(BASE_DIR, "image-map.json")
    import json
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\n{'='*60}")
    print(f"DONE! Total new images: {total_images}")
    print(f"Results saved to: {results_path}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
