#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const sharedEnvPath = process.env.MERRYSAILS_SHARED_ENV_PATH || '';
const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const tokenUrl = 'https://oauth2.googleapis.com/token';
const redirectUri = process.env.GA4_REDIRECT_URI || 'http://127.0.0.1';
const tokenPath =
  process.env.GA4_TOKEN_PATH || path.join(rootDir, '.cache/google/ga4-merrysails-token.json');
const measurementId = process.env.GA4_MEASUREMENT_ID || 'G-9B3Q7FM7X8';
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

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

function clientId() {
  return process.env.GA4_CLIENT_ID || process.env.GOOGLE_ADS_CLIENT_ID;
}

function clientSecret() {
  return process.env.GA4_CLIENT_SECRET || process.env.GOOGLE_ADS_CLIENT_SECRET;
}

function requireClient() {
  if (!clientId() || !clientSecret()) {
    throw new Error(
      'Missing OAuth client. Set GA4_CLIENT_ID/GA4_CLIENT_SECRET or GOOGLE_ADS_CLIENT_ID/GOOGLE_ADS_CLIENT_SECRET.',
    );
  }
}

function buildAuthUrl() {
  requireClient();
  return `${authUrl}?${new URLSearchParams({
    client_id: clientId(),
    redirect_uri: redirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true',
    scope: scopes.join(' '),
  }).toString()}`;
}

function extractCode(input) {
  if (!input) throw new Error('Missing authorization code or redirect URL.');
  if (input.startsWith('http://') || input.startsWith('https://')) {
    const url = new URL(input);
    const code = url.searchParams.get('code');
    if (!code) throw new Error('No code parameter found in redirect URL.');
    return code;
  }
  return input;
}

async function exchange(rawInput) {
  requireClient();
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId(),
      client_secret: clientSecret(),
      code: extractCode(rawInput),
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${json.error_description || json.error || response.status}`);
  }
  if (!json.refresh_token) throw new Error('No refresh_token returned. Re-run auth-url and approve consent again.');

  const token = {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    token_uri: tokenUrl,
    client_id: clientId(),
    client_secret: clientSecret(),
    scopes,
    expiry: Date.now() + (json.expires_in || 3600) * 1000,
    measurement_id: measurementId,
  };
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
  fs.writeFileSync(tokenPath, `${JSON.stringify(token, null, 2)}\n`, { mode: 0o600 });
  console.log(`Wrote ${tokenPath}`);
}

function readToken() {
  if (!fs.existsSync(tokenPath)) {
    throw new Error(`Missing token file: ${tokenPath}. Run: node scripts/ga4-merrysails-oauth.mjs auth-url`);
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
}

async function refreshAccessToken() {
  requireClient();
  const token = readToken();
  if (token.access_token && token.expiry && token.expiry > Date.now() + 60_000) return token.access_token;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: token.client_id || clientId(),
      client_secret: token.client_secret || clientSecret(),
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
  fs.writeFileSync(tokenPath, `${JSON.stringify(next, null, 2)}\n`, { mode: 0o600 });
  return next.access_token;
}

async function googleJson(url, accessToken) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`Google API failed (${response.status}): ${JSON.stringify(json, null, 2)}`);
  return json;
}

async function discoverProperty() {
  const accessToken = await refreshAccessToken();
  const summaries = await googleJson('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', accessToken);
  const matches = [];
  for (const account of summaries.accountSummaries || []) {
    for (const property of account.propertySummaries || []) {
      const streams = await googleJson(`https://analyticsadmin.googleapis.com/v1beta/${property.property}/dataStreams`, accessToken);
      for (const stream of streams.dataStreams || []) {
        if (stream.webStreamData?.measurementId === measurementId) {
          matches.push({
            account: account.displayName,
            property: property.property,
            propertyDisplayName: property.displayName,
            stream: stream.name,
            streamDisplayName: stream.displayName,
            measurementId,
          });
        }
      }
    }
  }
  console.log(JSON.stringify({ measurementId, matches }, null, 2));
}

async function status() {
  console.log(
    JSON.stringify(
      {
        oauthClientAvailable: Boolean(clientId() && clientSecret()),
        tokenFileExists: fs.existsSync(tokenPath),
        tokenPath,
        measurementId,
        redirectUri,
        scopes,
      },
      null,
      2,
    ),
  );
}

async function main() {
  const command = process.argv[2];
  if (command === 'auth-url') {
    console.log(buildAuthUrl());
    return;
  }
  if (command === 'exchange') {
    await exchange(process.argv[3]);
    return;
  }
  if (command === 'discover-property') {
    await discoverProperty();
    return;
  }
  if (command === 'status') {
    await status();
    return;
  }
  console.error('Usage:');
  console.error('  node scripts/ga4-merrysails-oauth.mjs auth-url');
  console.error('  node scripts/ga4-merrysails-oauth.mjs exchange "<redirect-url-or-code>"');
  console.error('  node scripts/ga4-merrysails-oauth.mjs discover-property');
  console.error('  node scripts/ga4-merrysails-oauth.mjs status');
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
