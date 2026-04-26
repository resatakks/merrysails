#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const sharedEnvPath = process.env.MERRYSAILS_SHARED_ENV_PATH || '';
const tokenUrl = 'https://oauth2.googleapis.com/token';
const tokenPath =
  process.env.GA4_TOKEN_PATH || path.join(rootDir, '.cache/google/ga4-merrysails-token.json');
const cacheDir = path.join(rootDir, 'data/ads/ga4-cache');
const measurementId = process.env.GA4_MEASUREMENT_ID || 'G-9B3Q7FM7X8';

loadEnvFiles([path.join(rootDir, '.env.local'), path.join(rootDir, '.env'), sharedEnvPath]);

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

function readToken() {
  if (!fs.existsSync(tokenPath)) {
    throw new Error('Missing GA4 token. First run: node scripts/ga4-merrysails-oauth.mjs auth-url');
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
}

async function refreshAccessToken() {
  const token = readToken();
  if (token.access_token && token.expiry && token.expiry > Date.now() + 60_000) return token.access_token;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: token.client_id || process.env.GA4_CLIENT_ID || process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: token.client_secret || process.env.GA4_CLIENT_SECRET || process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`Token refresh failed: ${json.error_description || json.error || response.status}`);
  const next = {
    ...token,
    access_token: json.access_token,
    expiry: Date.now() + (json.expires_in || 3600) * 1000,
  };
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
  fs.writeFileSync(tokenPath, `${JSON.stringify(next, null, 2)}\n`, { mode: 0o600 });
  return next.access_token;
}

async function googleJson(url, accessToken, body) {
  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`Google API failed (${response.status}): ${JSON.stringify(json, null, 2)}`);
  return json;
}

async function discoverProperty(accessToken) {
  const summaries = await googleJson('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', accessToken);
  for (const account of summaries.accountSummaries || []) {
    for (const property of account.propertySummaries || []) {
      const streams = await googleJson(`https://analyticsadmin.googleapis.com/v1beta/${property.property}/dataStreams`, accessToken);
      for (const stream of streams.dataStreams || []) {
        if (stream.webStreamData?.measurementId === measurementId) return property.property.replace('properties/', '');
      }
    }
  }
  throw new Error(`Could not find a GA4 property with measurement ID ${measurementId}.`);
}

function dateRangeFromArgs() {
  const args = new Map(
    process.argv
      .slice(2)
      .filter((arg) => arg.startsWith('--') && arg.includes('='))
      .map((arg) => {
        const [key, ...rest] = arg.slice(2).split('=');
        return [key, rest.join('=')];
      }),
  );
  return {
    startDate: args.get('start') || 'yesterday',
    endDate: args.get('end') || 'today',
  };
}

async function runReport(accessToken, propertyId, name, body) {
  const response = await googleJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    accessToken,
    body,
  );
  return {
    name,
    dimensionHeaders: response.dimensionHeaders?.map((item) => item.name) || [],
    metricHeaders: response.metricHeaders?.map((item) => item.name) || [],
    rows:
      response.rows?.map((row) => ({
        dimensions: row.dimensionValues?.map((item) => item.value) || [],
        metrics: row.metricValues?.map((item) => item.value) || [],
      })) || [],
  };
}

async function main() {
  const accessToken = await refreshAccessToken();
  const token = readToken();
  const propertyId = process.env.GA4_PROPERTY_ID || token.property_id || (await discoverProperty(accessToken));
  const dateRange = dateRangeFromArgs();
  const cacheKey = `${new Date().toISOString().slice(0, 10)}-${dateRange.startDate}-${dateRange.endDate}.json`.replace(
    /[^a-zA-Z0-9._-]/g,
    '_',
  );
  const cachePath = path.join(cacheDir, cacheKey);

  if (fs.existsSync(cachePath) && !process.argv.includes('--refresh')) {
    console.log(fs.readFileSync(cachePath, 'utf8'));
    return;
  }

  const common = { dateRanges: [dateRange], limit: '50' };
  const reports = [
    await runReport(accessToken, propertyId, 'traffic_by_campaign', {
      ...common,
      dimensions: [{ name: 'date' }, { name: 'sessionSourceMedium' }, { name: 'sessionCampaignName' }],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'screenPageViews' },
        { name: 'engagedSessions' },
        { name: 'eventCount' },
        { name: 'conversions' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
    await runReport(accessToken, propertyId, 'paid_landing_pages', {
      ...common,
      dimensions: [{ name: 'landingPagePlusQueryString' }, { name: 'sessionSourceMedium' }, { name: 'sessionCampaignName' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagedSessions' }, { name: 'conversions' }],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionSourceMedium',
          stringFilter: { matchType: 'CONTAINS', value: 'google / cpc', caseSensitive: false },
        },
      },
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
    await runReport(accessToken, propertyId, 'events', {
      ...common,
      dimensions: [{ name: 'date' }, { name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'conversions' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    }),
  ];

  const output = {
    generatedAt: new Date().toISOString(),
    measurementId,
    propertyId,
    dateRange,
    reports,
  };

  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
