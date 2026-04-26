import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const SITE_URL = "https://merrysails.com";
const ROOT = process.cwd();
const TRACKING_FILE = path.join(
  ROOT,
  "data/serp/merrysails-serp-rank-tracking-keywords-2026-04-23.csv"
);
const GSC_DIR = path.join(ROOT, "data/gsc");
const REPORT_DIR = path.join(ROOT, "docs/seo-rank-reports");
const TODAY = new Date().toISOString().slice(0, 10);

const WINDOWS = [
  { label: "24h", days: 2 },
  { label: "7d", days: 7 },
  { label: "28d", days: 28 },
  { label: "3m", days: 90 },
];

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i += 1;
    } else {
      args[key] = "true";
    }
  }
  return args;
}

function normalize(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/$/, "");
  }
  return `${SITE_URL}${raw.startsWith("/") ? raw : `/${raw}`}`.replace(/\/$/, "");
}

function parseNumber(value) {
  const raw = String(value ?? "").trim().replace("%", "").replace(",", ".");
  if (!raw) return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((item) => item.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((item) => item.trim() !== "")) rows.push(row);
  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => normalize(header));
  return rows.slice(1).map((items) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = items[index] ?? "";
    });
    return record;
  });
}

function toCsv(rows, headers) {
  const escape = (value) => {
    const raw = String(value ?? "");
    return /[",\n\r]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((key) => escape(row[key])).join(","))].join("\n");
}

function readCsv(file) {
  return parseCsv(fs.readFileSync(file, "utf8"));
}

function findColumn(row, names) {
  for (const name of names) {
    const key = Object.keys(row).find((candidate) => normalize(candidate) === normalize(name));
    if (key) return row[key];
  }
  return "";
}

function canonicalGscRow(row) {
  const query = findColumn(row, ["query", "top queries", "queries", "keyword"]);
  const page = findColumn(row, ["page", "pages", "url", "landing page"]);
  const clicks = findColumn(row, ["clicks"]);
  const impressions = findColumn(row, ["impressions"]);
  const ctr = findColumn(row, ["ctr"]);
  const position = findColumn(row, ["position", "avg position", "average position"]);
  return {
    query: normalize(query),
    page: normalizeUrl(page),
    clicks: parseNumber(clicks),
    impressions: parseNumber(impressions),
    ctr: parseNumber(ctr),
    position: parseNumber(position),
  };
}

function dateDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function fetchGscWindow(windowConfig, siteUrl, token) {
  const endDate = dateDaysAgo(1);
  const startDate = dateDaysAgo(windowConfig.days);
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query", "page"],
      type: "web",
      rowLimit: 25000,
    }),
  });

  if (!response.ok) {
    throw new Error(`GSC ${windowConfig.label} request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const rows = (data.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? "",
    page: row.keys?.[1] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ? row.ctr * 100 : 0,
    position: row.position ?? 0,
  }));

  fs.mkdirSync(GSC_DIR, { recursive: true });
  const outFile = path.join(GSC_DIR, `merrysails-gsc-${windowConfig.label}-${TODAY}.csv`);
  fs.writeFileSync(outFile, toCsv(rows, ["query", "page", "clicks", "impressions", "ctr", "position"]));
  return { file: outFile, rows };
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getServiceAccountAccessToken(credentialsPath) {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claim = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const unsignedJwt = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedJwt)
    .sign(credentials.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Service account token request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

function latestGscFile(label) {
  if (!fs.existsSync(GSC_DIR)) return "";
  const candidates = fs
    .readdirSync(GSC_DIR)
    .filter((file) => file.endsWith(".csv") && file.toLowerCase().includes(label.toLowerCase()))
    .sort()
    .reverse();
  return candidates.length ? path.join(GSC_DIR, candidates[0]) : "";
}

function loadTrackingRows(file) {
  return readCsv(file).map((row) => ({
    keyword: normalize(row.keyword),
    expectedUrl: normalizeUrl(row.expected_url || row.target_owner_url),
    ownerPath: row.target_owner_url,
    bucket: row.intent_bucket,
    volume: row.volume,
    kd: row.keyword_difficulty,
  }));
}

function summarizeRows(rows) {
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const weightedPosition =
    impressions > 0
      ? rows.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions
      : 0;
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  return { clicks, impressions, ctr, position: weightedPosition };
}

function analyzeWindow(label, rawRows, trackingRows) {
  const rows = rawRows.map(canonicalGscRow).filter((row) => row.query);
  const rowsByQuery = new Map();
  for (const row of rows) {
    if (!rowsByQuery.has(row.query)) rowsByQuery.set(row.query, []);
    rowsByQuery.get(row.query).push(row);
  }

  const matched = [];
  const cannibalization = [];
  const quickWins = [];
  const lowCtr = [];
  const missing = [];

  for (const tracked of trackingRows) {
    const queryRows = rowsByQuery.get(tracked.keyword) ?? [];
    if (!queryRows.length) {
      missing.push(tracked);
      continue;
    }

    const uniquePages = [...new Set(queryRows.map((row) => row.page).filter(Boolean))];
    for (const row of queryRows) {
      const ownerMatch = row.page === tracked.expectedUrl;
      const record = { ...tracked, ...row, ownerMatch };
      matched.push(record);
      if (!ownerMatch || uniquePages.length > 1) cannibalization.push(record);
      if (row.position >= 5 && row.position <= 20) quickWins.push(record);
      if (row.impressions >= 50 && row.ctr < 1.0) lowCtr.push(record);
    }
  }

  const byClicks = [...rows].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  const byImpressions = [...rows].sort((a, b) => b.impressions - a.impressions || a.position - b.position);
  quickWins.sort((a, b) => b.impressions - a.impressions || a.position - b.position);
  cannibalization.sort((a, b) => b.impressions - a.impressions || a.position - b.position);
  lowCtr.sort((a, b) => b.impressions - a.impressions || a.position - b.position);

  return {
    label,
    summary: summarizeRows(rows),
    matched,
    missing,
    quickWins,
    cannibalization,
    lowCtr,
    topClicks: byClicks.slice(0, 15),
    topImpressions: byImpressions.slice(0, 15),
    rowCount: rows.length,
  };
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function formatPosition(value) {
  return value ? value.toFixed(1) : "-";
}

function mdTable(headers, rows) {
  if (!rows.length) return "_No rows._\n";
  const clean = (value) => String(value ?? "").replace(/\|/g, "/");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${headers.map((header) => clean(row[header])).join(" | ")} |`),
    "",
  ].join("\n");
}

function buildReport(analyses, sources) {
  const lines = [];
  lines.push(`# MerrySails Rank & GSC Monitor - ${TODAY}`);
  lines.push("");
  lines.push("## Sources");
  lines.push("");
  for (const source of sources) {
    lines.push(`- ${source.label}: ${source.file ? source.file.replace(ROOT + path.sep, "") : "missing"}`);
  }
  lines.push("");

  lines.push("## Window Summary");
  lines.push("");
  lines.push(
    mdTable(
      ["Window", "Rows", "Clicks", "Impressions", "CTR", "Avg Position", "Matched Keywords"],
      analyses.map((analysis) => ({
        Window: analysis.label,
        Rows: analysis.rowCount,
        Clicks: analysis.summary.clicks,
        Impressions: analysis.summary.impressions,
        CTR: formatPercent(analysis.summary.ctr),
        "Avg Position": formatPosition(analysis.summary.position),
        "Matched Keywords": analysis.matched.length,
      }))
    )
  );

  for (const analysis of analyses) {
    lines.push(`## ${analysis.label} Quick Wins`);
    lines.push("");
    lines.push(
      mdTable(
        ["query", "page", "expected", "impressions", "clicks", "ctr", "position", "owner"],
        analysis.quickWins.slice(0, 20).map((row) => ({
          query: row.query,
          page: row.page,
          expected: row.expectedUrl,
          impressions: row.impressions,
          clicks: row.clicks,
          ctr: formatPercent(row.ctr),
          position: formatPosition(row.position),
          owner: row.ownerMatch ? "clean" : "wrong-url",
        }))
      )
    );

    lines.push(`## ${analysis.label} Cannibalization / Wrong URL Checks`);
    lines.push("");
    lines.push(
      mdTable(
        ["query", "page", "expected", "impressions", "clicks", "position"],
        analysis.cannibalization.slice(0, 20).map((row) => ({
          query: row.query,
          page: row.page,
          expected: row.expectedUrl,
          impressions: row.impressions,
          clicks: row.clicks,
          position: formatPosition(row.position),
        }))
      )
    );

    lines.push(`## ${analysis.label} Low CTR Pages`);
    lines.push("");
    lines.push(
      mdTable(
        ["query", "page", "impressions", "clicks", "ctr", "position"],
        analysis.lowCtr.slice(0, 20).map((row) => ({
          query: row.query,
          page: row.page,
          impressions: row.impressions,
          clicks: row.clicks,
          ctr: formatPercent(row.ctr),
          position: formatPosition(row.position),
        }))
      )
    );
  }

  lines.push("## Next Actions");
  lines.push("");
  lines.push("- For clean owner URLs in positions 5-20, test title/meta/internal links before writing new pages.");
  lines.push("- For wrong-url rows, fix internal linking and owner-page clarity before expanding content.");
  lines.push("- For missing tracked keywords, use Semrush/RankTracker to confirm whether they are outside Top 100 or simply absent from GSC export rows.");
  lines.push("- Do not request manual indexing for pages that still have unsupported claims or duplicated AI-style content.");
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  const trackingFile = args.tracking ? path.resolve(args.tracking) : TRACKING_FILE;
  const trackingRows = loadTrackingRows(trackingFile);

  const serviceAccountPath =
    process.env.GSC_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS || "";
  const token =
    process.env.GSC_ACCESS_TOKEN ||
    (serviceAccountPath && fs.existsSync(serviceAccountPath)
      ? await getServiceAccountAccessToken(serviceAccountPath)
      : "");
  const siteUrl = process.env.GSC_SITE_URL || "sc-domain:merrysails.com";
  const sources = [];
  const windowRows = [];

  for (const windowConfig of WINDOWS) {
    let file = args[`gsc-${windowConfig.label}`] ? path.resolve(args[`gsc-${windowConfig.label}`]) : "";
    let rows = [];

    if (!file && token) {
      const fetched = await fetchGscWindow(windowConfig, siteUrl, token);
      file = fetched.file;
      rows = fetched.rows;
    }

    if (!file) {
      file = latestGscFile(windowConfig.label);
    }

    if (file && fs.existsSync(file)) {
      rows = rows.length ? rows : readCsv(file);
    }

    sources.push({ label: windowConfig.label, file });
    windowRows.push({ label: windowConfig.label, rows });
  }

  const analyses = windowRows.map(({ label, rows }) => analyzeWindow(label, rows, trackingRows));
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const reportFile = args.out
    ? path.resolve(args.out)
    : path.join(REPORT_DIR, `merrysails-rank-gsc-report-${TODAY}.md`);
  fs.writeFileSync(reportFile, buildReport(analyses, sources));

  console.log(`Tracking keywords: ${trackingRows.length}`);
  for (const analysis of analyses) {
    console.log(
      `${analysis.label}: rows=${analysis.rowCount}, impressions=${analysis.summary.impressions}, clicks=${analysis.summary.clicks}, matched=${analysis.matched.length}, quickWins=${analysis.quickWins.length}, wrongUrl=${analysis.cannibalization.length}`
    );
  }
  console.log(`Report: ${reportFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
