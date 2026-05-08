#!/usr/bin/env node
/**
 * MerrySails -- Commercial Keyword Gap Analysis
 * Uses DataForSEO Labs API:
 *   - keyword_suggestions for seed terms
 *   - ranked_keywords to check current MerrySails positions
 * Run: node scripts/keyword-gap.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LOGIN = process.env.DATAFORSEO_LOGIN || 'info@merrysails.com';
const PASSWORD = process.env.DATAFORSEO_PASSWORD || '';
const AUTH = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');
const BASE_URL = 'https://api.dataforseo.com';

async function dfsPost(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${AUTH}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

// Seeds covering all 3 clusters
const SEEDS = [
  // SUNSET
  'bosphorus sunset cruise',
  'istanbul sunset cruise',
  'sunset boat tour istanbul',
  // DINNER
  'istanbul dinner cruise',
  'bosphorus dinner cruise',
  'turkish night dinner cruise istanbul',
  // YACHT
  'yacht charter istanbul',
  'private yacht istanbul',
  'boat rental istanbul',
  // BRAND
  'MerrySails',
  'merrysails istanbul',
];

const LOCATION_CODE = 2840; // United States
const LANGUAGE_CODE = 'en';
const TARGET_DOMAIN = 'merrysails.com';

async function getKeywordSuggestions(seed) {
  const data = await dfsPost('/v3/dataforseo_labs/google/keyword_suggestions/live', [
    {
      keyword: seed,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      limit: 50,
      filters: ['keyword_info.search_volume', '>', 50],
      order_by: ['keyword_info.search_volume,desc'],
    }
  ]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

async function getRankedKeywords(domain) {
  const data = await dfsPost('/v3/dataforseo_labs/google/ranked_keywords/live', [
    {
      target: domain,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      limit: 500,
    }
  ]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

async function main() {
  console.log('[keyword-gap] Starting MerrySails keyword gap analysis...');

  // 1. Get currently ranked keywords
  console.log(`[keyword-gap] Fetching ranked keywords for ${TARGET_DOMAIN}...`);
  let rankedItems = [];
  try {
    rankedItems = await getRankedKeywords(TARGET_DOMAIN);
  } catch (err) {
    console.warn('[keyword-gap] Could not fetch ranked keywords:', err.message);
  }
  const rankedKeywordSet = new Set(
    rankedItems.map(item => item.keyword_data?.keyword?.toLowerCase() ?? '')
  );
  console.log(`[keyword-gap] Currently ranking for ${rankedKeywordSet.size} keywords.`);

  // 2. Collect suggestions from all seeds
  const allSuggestions = new Map();
  for (const seed of SEEDS) {
    console.log(`[keyword-gap] Fetching suggestions for: "${seed}"...`);
    try {
      const items = await getKeywordSuggestions(seed);
      for (const item of items) {
        const kw = item.keyword?.toLowerCase();
        if (!kw) continue;
        if (!allSuggestions.has(kw)) {
          allSuggestions.set(kw, {
            keyword: item.keyword,
            searchVolume: item.keyword_info?.search_volume ?? 0,
            cpc: item.keyword_info?.cpc ?? 0,
            competition: item.keyword_info?.competition ?? 0,
            seed,
          });
        }
      }
    } catch (err) {
      console.warn(`[keyword-gap] Suggestion fetch failed for "${seed}":`, err.message);
    }
  }

  // 3. Identify gaps (high-volume keywords NOT ranked)
  const gaps = Array.from(allSuggestions.values())
    .filter(item => !rankedKeywordSet.has(item.keyword.toLowerCase()))
    .filter(item => item.searchVolume >= 100)
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 100);

  // 4. Format output
  const date = new Date().toISOString().slice(0, 10);
  const rows = gaps.map((g, i) =>
    `| ${i + 1} | ${g.keyword} | ${g.searchVolume.toLocaleString()} | $${g.cpc.toFixed(2)} | ${(g.competition * 100).toFixed(0)}% | ${g.seed} |`
  ).join('\n');

  const report = `# MerrySails -- Commercial Keyword Gap Report
Generated: ${date}
Target domain: ${TARGET_DOMAIN}

## Summary
- Currently ranking for: ${rankedKeywordSet.size} keywords
- Suggestions analysed: ${allSuggestions.size}
- Gaps identified (volume >= 100): ${gaps.length}

## Top Keyword Gaps (not ranking, by search volume)

| # | Keyword | Monthly Volume | CPC | Competition | Seed |
|---|---------|---------------|-----|-------------|------|
${rows}

## Next Steps
1. Map each gap keyword to an existing MerrySails page or identify a new page opportunity.
2. Prioritise by: search volume x CPC x low competition.
3. For content gaps: brief a new /blog or /guides page.
4. For on-page gaps: add the keyword to the relevant page's H2/H3 and meta description.
`;

  mkdirSync(join(ROOT, 'docs'), { recursive: true });
  const outPath = join(ROOT, `docs/KEYWORD-GAP-${date}.md`);
  writeFileSync(outPath, report, 'utf8');
  console.log(`[keyword-gap] Report saved to ${outPath}`);
}

main().catch(err => {
  console.error('[keyword-gap] Fatal error:', err);
  process.exit(1);
});
