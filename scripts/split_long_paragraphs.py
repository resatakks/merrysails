#!/usr/bin/env python3
"""
Split content strings in BlogSection that exceed 80 words.
The renderer already splits on \\n\\n, so we just insert \\n\\n at sentence
boundaries within the `content:` string values.

Strategy:
- Find all  content: "..."  strings (across single-line section objects)
- For any paragraph segment (already split by \\n\\n) that exceeds MAX_WORDS,
  find the best sentence boundary near the midpoint and insert \\n\\n there
- Write back atomically; run tsc --noEmit after each file

Does NOT touch: expertQuote.text, callout.text, proTip, answerCapsule, FAQ answers
"""

import re
import sys
import subprocess
import pathlib
from pathlib import Path

POSTS_DIR = Path('/Users/resat/Desktop/merrysails/src/data/blog/posts')
MAX_WORDS = 80
TSC = 'npx'
TSC_ARGS = ['tsc', '--noEmit', '-p', '/Users/resat/Desktop/merrysails/tsconfig.json']

# ─────────────────────────────────────────────────────────────────────────────
# Core splitting logic
# ─────────────────────────────────────────────────────────────────────────────

def split_para(text: str) -> list[str]:
    """
    Split a paragraph string into <=MAX_WORDS chunks at sentence boundaries.
    Returns a list of paragraph strings (1 item = no split needed).
    A single sentence >MAX_WORDS is left as-is (can't split safely).
    """
    words = text.split()
    if len(words) <= MAX_WORDS:
        return [text]

    # Split text into sentences (keep trailing space as delimiter info)
    # Pattern: split AFTER ./?/! followed by whitespace (not inside abbreviations heuristically)
    sentence_re = re.compile(r'(?<=[.!?])\s+')
    sentences = sentence_re.split(text)

    # Re-attach any trailing punctuation lost (shouldn't happen but safety)
    # sentences is a list of sentence strings without trailing spaces

    if len(sentences) == 1:
        # Single sentence > 80 words — cannot split at sentence boundary
        return [text]

    chunks = []
    current_sentences = []
    current_words = 0

    for s in sentences:
        s_words = len(s.split())
        # If adding this sentence would exceed limit AND we already have content, flush
        if current_words + s_words > MAX_WORDS and current_sentences:
            chunks.append(' '.join(current_sentences))
            current_sentences = [s]
            current_words = s_words
        else:
            current_sentences.append(s)
            current_words += s_words

    if current_sentences:
        chunks.append(' '.join(current_sentences))

    # Filter out empty chunks
    chunks = [c for c in chunks if c.strip()]

    # Verify: if only 1 chunk, no actual split happened
    if len(chunks) == 1:
        return [text]

    return chunks


def process_content_value(content_str: str) -> tuple[str, int]:
    """
    Take the raw string value of a content field (without outer quotes),
    split long paragraphs, return (new_string, count_of_splits).

    In the TS source file, paragraph breaks are represented as the 4-byte
    sequence: backslash + n + backslash + n  (i.e. the escape \\n\\n).
    When the JS runtime parses the string, it becomes two actual newlines,
    which is what section.content.split('\\n\\n') operates on.
    """
    # The separator as it appears in the raw file text (4 bytes: \, n, \, n)
    SEP = chr(92) + 'n' + chr(92) + 'n'

    # Content may already have \\n\\n paragraph breaks — respect them
    existing_paras = content_str.split(SEP)
    new_paras = []
    splits = 0

    for para in existing_paras:
        chunks = split_para(para)
        if len(chunks) > 1:
            splits += len(chunks) - 1
        new_paras.extend(chunks)

    return SEP.join(new_paras), splits


# ─────────────────────────────────────────────────────────────────────────────
# File-level processing
# The content field in these TS files always looks like:
#   content: "..."  (double-quoted, on one line or across a few lines)
# We locate content: "..." patterns and replace the string value.
#
# We match:  content: "..."  where ... may contain escaped characters
# We do NOT match callout/expertQuote/proTip text fields.
# ─────────────────────────────────────────────────────────────────────────────

# This regex matches the `content: "..."` field in section objects.
# It captures:
#   group 1: everything before the opening quote (including `content: `)
#   group 2: the raw string content (no outer quotes)
#
# We use a non-greedy match and handle escaped quotes inside.
# Note: in the TS files, backtick template literals are NOT used for content.
CONTENT_FIELD_RE = re.compile(
    r'(?<!\w)(content)(\s*:\s*)"((?:[^"\\]|\\.)*)"',
    re.DOTALL
)

def process_file(filepath: Path) -> tuple[int, int]:
    """
    Process one file. Returns (paragraphs_split, sections_modified).
    """
    original = filepath.read_text(encoding='utf-8')
    total_splits = 0
    sections_modified = 0

    def replacer(m: re.Match) -> str:
        nonlocal total_splits, sections_modified
        field_name = m.group(1)    # "content"
        sep = m.group(2)           # ": " or similar
        raw_value = m.group(3)     # the string content (with escape sequences)

        new_value, splits = process_content_value(raw_value)
        if splits > 0:
            total_splits += splits
            sections_modified += 1
            return f'{field_name}{sep}"{new_value}"'
        return m.group(0)  # unchanged

    new_text = CONTENT_FIELD_RE.sub(replacer, original)

    if new_text != original:
        filepath.write_text(new_text, encoding='utf-8')
        print(f'  Modified: {filepath.name} — {sections_modified} sections, {total_splits} splits')
    else:
        print(f'  Unchanged: {filepath.name}')

    return total_splits, sections_modified


def run_tsc() -> bool:
    """Run TypeScript type check. Returns True if clean."""
    result = subprocess.run(
        [TSC] + TSC_ARGS,
        capture_output=True,
        text=True,
        cwd='/Users/resat/Desktop/merrysails'
    )
    if result.returncode == 0:
        print('  TSC: OK (0 errors)')
        return True
    else:
        # Show only relevant errors
        lines = (result.stdout + result.stderr).splitlines()
        relevant = [l for l in lines if 'blog/posts' in l or 'error TS' in l][:20]
        print(f'  TSC: FAILED\n' + '\n'.join(relevant))
        return False


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    files = sorted(POSTS_DIR.glob('*.ts'))
    print(f'Found {len(files)} blog post files\n')

    grand_total_splits = 0
    grand_total_sections = 0
    grand_files_modified = 0

    for f in files:
        print(f'Processing {f.name}...')
        splits, sections = process_file(f)
        grand_total_splits += splits
        grand_total_sections += sections
        if splits > 0:
            grand_files_modified += 1

    print(f'\n{"="*60}')
    print(f'TOTAL: {grand_total_splits} paragraph splits across {grand_total_sections} sections in {grand_files_modified} files')

    if grand_files_modified > 0:
        print('\nRunning TypeScript check...')
        ok = run_tsc()
        if not ok:
            print('\nWARNING: TSC errors detected — review before committing!')
            sys.exit(1)
    else:
        print('\nNo files modified — nothing to type-check.')

    print('\nDone.')


if __name__ == '__main__':
    main()
