#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const cacheRoot = path.join(rootDir, 'data/ads/clarity-cache');
const clarityUrl = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';

loadEnvFiles([path.join(rootDir, '.env.local'), path.join(rootDir, '.env')]);

function loadEnvFiles(files) {
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function arg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function metricBlocks(data) {
  return Array.isArray(data) ? data : data?.data || data?.metrics || [];
}

function metricRows(data, metricName) {
  const wanted = metricName.toLowerCase();
  const block = metricBlocks(data).find((item) => String(item.metricName || item.name || '').toLowerCase() === wanted);
  return block?.information || block?.data || block?.rows || [];
}

function dims(row) {
  if (Array.isArray(row.dimensions)) return row.dimensions.map(String);
  return [row.dimension1, row.dimension2, row.dimension3, row.url, row.source, row.medium, row.campaign]
    .filter(Boolean)
    .map(String);
}

function firstNumber(row, names) {
  for (const name of names) {
    const value = row[name];
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) return Number(value);
  }
  if (Array.isArray(row.metrics)) {
    const value = row.metrics.find((item) => typeof item === 'number' || (typeof item === 'string' && !Number.isNaN(Number(item))));
    if (value !== undefined) return Number(value);
  }
  return 0;
}

function isPaidRow(row) {
  const haystack = dims(row).join(' ').toLowerCase();
  return haystack.includes('paidsearch') || haystack.includes('google / cpc') || haystack.includes('googleads');
}

function summarize(data) {
  const trafficRows = metricRows(data, 'Traffic');
  const deadRows = metricRows(data, 'DeadClickCount');
  const quickRows = metricRows(data, 'QuickbackClick');
  const scrollRows = metricRows(data, 'ScrollDepth');
  const scriptRows = metricRows(data, 'ScriptErrorCount');

  const paidTraffic = trafficRows.filter(isPaidRow);
  const topTraffic = paidTraffic.slice(0, 20).map((row) => ({
    dimensions: dims(row),
    sessions: firstNumber(row, ['sessions', 'sessionsCount', 'totalSessionCount', 'count', 'value']),
    users: firstNumber(row, ['distinctUserCount', 'users', 'userCount']),
    pagesPerSession: firstNumber(row, ['pagesPerSession']),
  }));

  return {
    paidRowsFound: paidTraffic.length,
    topTraffic,
    paidDeadClickRows: deadRows
      .filter(isPaidRow)
      .slice(0, 20)
      .map((row) => ({ dimensions: dims(row), value: firstNumber(row, ['deadClickCount', 'count', 'value']) })),
    paidQuickbackRows: quickRows
      .filter(isPaidRow)
      .slice(0, 20)
      .map((row) => ({ dimensions: dims(row), value: firstNumber(row, ['quickbackClick', 'quickbackClickCount', 'count', 'value']) })),
    paidScrollRows: scrollRows
      .filter(isPaidRow)
      .slice(0, 20)
      .map((row) => ({ dimensions: dims(row), value: firstNumber(row, ['averageScrollDepth', 'scrollDepth', 'value']) })),
    paidScriptErrorRows: scriptRows
      .filter(isPaidRow)
      .slice(0, 20)
      .map((row) => ({ dimensions: dims(row), value: firstNumber(row, ['scriptErrorCount', 'count', 'value']) })),
  };
}

async function fetchClarity(name, params, token) {
  const dateDir = path.join(cacheRoot, today());
  const cachePath = path.join(dateDir, `${name}.json`);
  if (fs.existsSync(cachePath) && !process.argv.includes('--refresh')) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }

  const url = `${clarityUrl}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await response.text();
  if (response.status === 429 && fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Clarity API returned non-JSON (${response.status}): ${text.slice(0, 500)}`);
  }
  if (!response.ok) throw new Error(`Clarity API failed (${response.status}): ${JSON.stringify(json)}`);

  fs.mkdirSync(dateDir, { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(json, null, 2)}\n`);
  return json;
}

async function main() {
  const token = process.env.CLARITY_EXPORT_TOKEN || process.env.CLARITY_API_TOKEN;
  if (!token) {
    throw new Error('Missing CLARITY_EXPORT_TOKEN. Put it in .env.local or run with CLARITY_EXPORT_TOKEN=...');
  }

  const numOfDays = arg('days', '1');
  const datasets = {
    source_medium_campaign: await fetchClarity(
      'source-medium-campaign',
      { numOfDays, dimension1: 'Source', dimension2: 'Medium', dimension3: 'Campaign' },
      token,
    ),
    url_source_campaign: await fetchClarity(
      'url-source-campaign',
      { numOfDays, dimension1: 'URL', dimension2: 'Source', dimension3: 'Campaign' },
      token,
    ),
    device_source_campaign: await fetchClarity(
      'device-source-campaign',
      { numOfDays, dimension1: 'Device', dimension2: 'Source', dimension3: 'Campaign' },
      token,
    ),
  };

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        numOfDays,
        summaries: Object.fromEntries(Object.entries(datasets).map(([name, data]) => [name, summarize(data)])),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
