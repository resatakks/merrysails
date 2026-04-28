#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);

const siteUrl = process.env.GSC_SITE_URL || "sc-domain:merrysails.com";
const siteOrigin = process.env.GSC_SITE_ORIGIN || "https://merrysails.com";
const tokenPath = process.env.GSC_OAUTH_TOKEN_PATH || "/Users/resat/mcp-gsc/token.json";
const tokenUrl = "https://oauth2.googleapis.com/token";
const inspectionEndpoint = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const reportDir = path.join(rootDir, "docs", "seo-index-reports");

const defaultInspectionPaths = [
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/corporate-events",
  "/private-events",
  "/sunset-cruise-tickets-istanbul",
  "/turkish-night-dinner-cruise-istanbul",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/kabatas-dinner-cruise-istanbul",
  "/boat-rental-hourly-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/private-dinner-cruise-for-couples-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/client-hosting-yacht-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/team-building-yacht-istanbul",
  "/product-launch-yacht-istanbul",
  "/bosphorus-cruise-departure-points",
];

function parseArgs(argv) {
  const result = {
    urls: [],
    file: "",
    onlyNonIndexed: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--file") {
      result.file = argv[index + 1] || "";
      index += 1;
      continue;
    }
    if (arg === "--only-non-indexed") {
      result.onlyNonIndexed = true;
      continue;
    }
    result.urls.push(arg);
  }

  return result;
}

function readToken() {
  if (!fs.existsSync(tokenPath)) {
    throw new Error(`Missing GSC OAuth token: ${tokenPath}`);
  }
  return JSON.parse(fs.readFileSync(tokenPath, "utf8"));
}

async function refreshAccessToken() {
  const token = readToken();
  if (token.token && token.expiry && Date.parse(token.expiry) > Date.now() + 60_000) {
    return token.token;
  }

  const response = await fetch(token.token_uri || tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: token.client_id,
      client_secret: token.client_secret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`GSC token refresh failed: ${json.error_description || json.error || response.status}`);
  }

  const nextToken = {
    ...token,
    token: json.access_token,
    expiry: new Date(Date.now() + (json.expires_in || 3600) * 1000).toISOString(),
  };
  fs.writeFileSync(tokenPath, `${JSON.stringify(nextToken, null, 2)}\n`, { mode: 0o600 });
  return nextToken.token;
}

function normalizeUrl(input) {
  if (!input) return "";
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  return `${siteOrigin}${input.startsWith("/") ? input : `/${input}`}`;
}

function collectUrls(args) {
  const urls = new Set();

  for (const input of args.urls) {
    const normalized = normalizeUrl(input.trim());
    if (normalized) urls.add(normalized);
  }

  if (args.file) {
    const filePath = path.resolve(args.file);
    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const normalized = normalizeUrl(line.trim());
      if (normalized) urls.add(normalized);
    }
  }

  if (!urls.size) {
    for (const pagePath of defaultInspectionPaths) {
      urls.add(normalizeUrl(pagePath));
    }
  }

  return [...urls];
}

function classifyStatus(indexStatus) {
  const coverage = String(indexStatus.coverageState || "").toLowerCase();
  const verdict = String(indexStatus.verdict || "").toLowerCase();

  if (coverage.includes("noindex") || coverage.includes("excluded by")) return "blocked_noindex";
  if (coverage.includes("indexed") && !coverage.includes("not indexed")) return "indexed";
  if (coverage.includes("unknown to google")) return "unknown";
  if (coverage.includes("discovered") || coverage.includes("crawled")) return "not_indexed";
  if (verdict === "pass" && indexStatus.googleCanonical) return "indexed";
  return "unknown";
}

async function inspectUrl(accessToken, inspectionUrl) {
  const response = await fetch(inspectionEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      inspectionUrl,
      siteUrl,
      languageCode: "en-US",
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`URL inspection failed for ${inspectionUrl}: ${JSON.stringify(json)}`);
  }
  return json.inspectionResult?.indexStatusResult || {};
}

function buildMarkdown(results) {
  const lines = [];
  lines.push("# MerrySails URL Inspection");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Property: ${siteUrl}`);
  lines.push("");
  lines.push("## Non-indexed Or Unknown");
  lines.push("");

  const actionItems = results.filter((item) => item.inspectionStatus !== "indexed");
  if (actionItems.length) {
    for (const item of actionItems) {
      lines.push(
        `- \`${item.url}\` | status=\`${item.inspectionStatus}\` | coverage=\`${item.coverageState || "n/a"}\` | canonical=\`${item.googleCanonical || "n/a"}\``,
      );
    }
  } else {
    lines.push("- None");
  }

  lines.push("");
  lines.push("## Full Results");
  lines.push("");
  for (const item of results) {
    lines.push(
      `- \`${item.url}\` | status=\`${item.inspectionStatus}\` | coverage=\`${item.coverageState || "n/a"}\` | verdict=\`${item.verdict || "n/a"}\` | lastCrawl=\`${item.lastCrawlTime || "n/a"}\``,
    );
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const urls = collectUrls(args);
  const accessToken = await refreshAccessToken();

  const results = [];
  for (const url of urls) {
    try {
      const indexStatus = await inspectUrl(accessToken, url);
      results.push({
        url,
        inspectionStatus: classifyStatus(indexStatus),
        coverageState: indexStatus.coverageState || "",
        verdict: indexStatus.verdict || "",
        lastCrawlTime: indexStatus.lastCrawlTime || "",
        googleCanonical: indexStatus.googleCanonical || "",
        userCanonical: indexStatus.userCanonical || "",
        referringUrls: indexStatus.referringUrls || [],
        sitemap: indexStatus.sitemap || [],
      });
      console.error(`inspected ${url}`);
    } catch (error) {
      results.push({
        url,
        inspectionStatus: "error",
        coverageState: "",
        verdict: "",
        lastCrawlTime: "",
        googleCanonical: "",
        userCanonical: "",
        referringUrls: [],
        sitemap: [],
        error: error.message || String(error),
      });
      console.error(`failed ${url}: ${error.message || error}`);
    }
  }

  results.sort((left, right) => {
    const leftRank = left.inspectionStatus === "indexed" ? 1 : 0;
    const rightRank = right.inspectionStatus === "indexed" ? 1 : 0;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return left.url.localeCompare(right.url);
  });

  fs.mkdirSync(reportDir, { recursive: true });
  const jsonPath = path.join(reportDir, `merrysails-url-inspection-${today}.json`);
  const mdPath = path.join(reportDir, `merrysails-url-inspection-${today}.md`);

  fs.writeFileSync(jsonPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), siteUrl, results }, null, 2)}\n`);
  fs.writeFileSync(mdPath, buildMarkdown(results));

  const printable = args.onlyNonIndexed ? results.filter((item) => item.inspectionStatus !== "indexed") : results;
  console.log(JSON.stringify(printable, null, 2));
  console.error(`Wrote ${jsonPath}`);
  console.error(`Wrote ${mdPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
