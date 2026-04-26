#!/usr/bin/env node

const BASE_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";

function parseArgs(argv) {
  const args = {};

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [key, value = ""] = arg.slice(2).split("=");
    args[key] = value;
  }

  return args;
}

function getToken(args) {
  const raw = args.token || process.env.CLARITY_EXPORT_TOKEN || "";
  const match = raw.match(/(eyJ[^\s]+\.[^\s]+\.[^\s]+)/);

  if (!match) {
    throw new Error(
      "Missing valid Clarity JWT. Pass --token=<jwt> or set CLARITY_EXPORT_TOKEN."
    );
  }

  return match[1];
}

async function fetchInsights(token, params) {
  const url = new URL(BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  let json = null;

  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = text;
    }
  }

  if (!response.ok) {
    const suffix = response.status === 403
      ? " Token may be invalid, revoked, or tied to a different Clarity project."
      : "";
    throw new Error(
      `Clarity request failed (${response.status}).${suffix} Response: ${
        typeof json === "string" ? json : JSON.stringify(json)
      }`
    );
  }

  return json;
}

function printSection(title, data) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const token = getToken(args);
  const numOfDays = args.days || "1";

  const [urls, channels, devices, urlByDevice] = await Promise.all([
    fetchInsights(token, { numOfDays, dimension1: "URL" }),
    fetchInsights(token, { numOfDays, dimension1: "Channel" }),
    fetchInsights(token, { numOfDays, dimension1: "Device" }),
    fetchInsights(token, { numOfDays, dimension1: "URL", dimension2: "Device" }),
  ]);

  printSection("URL", urls);
  printSection("Channel", channels);
  printSection("Device", devices);
  printSection("URL x Device", urlByDevice);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
