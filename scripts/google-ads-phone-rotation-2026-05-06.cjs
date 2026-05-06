#!/usr/bin/env node
/**
 * MerrySails — Phone rotation 537 → 544 (2026-05-06)
 *
 * Replaces:
 *   - All CALL campaign-asset links across all enabled campaigns
 *   - All SITELINK campaign-asset links whose desc1/desc2 mention old phone
 *   - Single CALL_ONLY ads where the OLD phone is the call number
 *
 * Strategy: create new asset → unlink old campaign_asset → link new → leave old asset in library
 *
 * Validate:  node scripts/google-ads-phone-rotation-2026-05-06.cjs
 * Execute:   node scripts/google-ads-phone-rotation-2026-05-06.cjs --execute
 */

const fs = require("fs");

const API_VERSION = "v22";
const ENV_PATHS = [
  "/Users/resat/Desktop/merrysails/.env.local",
  "/Users/resat/Desktop/merrysails/.env",
];
const EXECUTE = process.argv.includes("--execute");

const NEW_PHONE = "+905448989812";
const OLD_PHONE_DIGITS_TAIL = "5370406822";
const OLD_PHONE_DISPLAY_FRAGMENT = "537 040";
const NEW_PHONE_DISPLAY = "+90 544 898 98 12";

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim(); if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("="); if (i === -1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

function reqEnv(n) { const v = process.env[n]; if (!v) throw new Error(`Missing env: ${n}`); return v; }

async function getAccessToken() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: reqEnv("GOOGLE_ADS_CLIENT_ID"),
      client_secret: reqEnv("GOOGLE_ADS_CLIENT_SECRET"),
      refresh_token: reqEnv("GOOGLE_ADS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`OAuth: ${JSON.stringify(j)}`);
  return j.access_token;
}

async function gads(at, suffix, body) {
  const r = await fetch(`https://googleads.googleapis.com/${API_VERSION}/${suffix}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${at}`,
      "content-type": "application/json",
      "developer-token": reqEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  const json = text ? JSON.parse(text) : null;
  if (!r.ok) throw new Error(`API ${r.status}: ${JSON.stringify(json, null, 2)}`);
  return json;
}

async function searchStream(at, cid, query) {
  const stream = await gads(at, `customers/${cid}/googleAds:searchStream`, { query });
  const rows = [];
  for (const chunk of stream || []) for (const row of chunk.results || []) rows.push(row);
  return rows;
}

function digitsOnly(s) { return (s || "").replace(/[^0-9]/g, ""); }

async function main() {
  for (const p of ENV_PATHS) loadEnv(p);
  const CUSTOMER_ID = reqEnv("GOOGLE_ADS_CUSTOMER_ID").replace(/[^0-9]/g, "");
  const at = await getAccessToken();

  console.log(`Customer: ${CUSTOMER_ID}`);
  console.log("Step 1 — Find existing CALL + WhatsApp-mention SITELINK campaign_assets…");

  const callRows = await searchStream(at, CUSTOMER_ID,
    `SELECT campaign.id, campaign.status, campaign_asset.resource_name,
            asset.resource_name, asset.call_asset.phone_number
     FROM campaign_asset
     WHERE campaign_asset.field_type = 'CALL'
       AND campaign_asset.status != 'REMOVED'
       AND campaign.status != 'REMOVED'`);

  const sitelinkRows = await searchStream(at, CUSTOMER_ID,
    `SELECT campaign.id, campaign.status, campaign_asset.resource_name,
            asset.resource_name, asset.sitelink_asset.link_text,
            asset.sitelink_asset.description1, asset.sitelink_asset.description2,
            asset.final_urls
     FROM campaign_asset
     WHERE campaign_asset.field_type = 'SITELINK'
       AND campaign_asset.status != 'REMOVED'
       AND campaign.status != 'REMOVED'`);

  const oldCallTargets = callRows.filter(r =>
    digitsOnly(r.asset?.callAsset?.phoneNumber).endsWith(OLD_PHONE_DIGITS_TAIL)
  );

  const oldSitelinkTargets = sitelinkRows.filter(r => {
    const sl = r.asset?.sitelinkAsset || {};
    const blob = `${sl.linkText || ""} ${sl.description1 || ""} ${sl.description2 || ""}`;
    return blob.includes(OLD_PHONE_DISPLAY_FRAGMENT) || blob.includes("537040");
  });

  console.log(`  CALL links: ${oldCallTargets.length}`);
  console.log(`  SITELINK links: ${oldSitelinkTargets.length}`);
  oldCallTargets.forEach(r => console.log(`    [CALL]     campaign ${r.campaign.id}  asset ${r.asset.resourceName}  phone ${r.asset.callAsset.phoneNumber}`));
  oldSitelinkTargets.forEach(r => console.log(`    [SITELINK] campaign ${r.campaign.id}  text "${r.asset.sitelinkAsset.linkText}"  desc1 "${r.asset.sitelinkAsset.description1}"  desc2 "${r.asset.sitelinkAsset.description2 || ""}"`));

  if (oldCallTargets.length === 0 && oldSitelinkTargets.length === 0) {
    console.log("✅ Nothing to update.");
    return;
  }

  // Step 2 — create assets
  console.log("\nStep 2 — Create replacement assets…");

  const assetOps = [];
  if (oldCallTargets.length > 0) {
    assetOps.push({ create: { callAsset: { countryCode: "TR", phoneNumber: NEW_PHONE } } });
  }

  const seenSitelink = new Map(); // old asset RN -> idx in assetOps
  for (const row of oldSitelinkTargets) {
    const oldRn = row.asset.resourceName;
    if (seenSitelink.has(oldRn)) continue;
    const sl = row.asset.sitelinkAsset;
    const replacePhone = (s) => (s || "")
      .replace(/\+?\s?90?\s?537\s?040\s?68\s?22/g, NEW_PHONE_DISPLAY)
      .replace(/\+?\s?90?\s?537\s?040\s?6822/g, NEW_PHONE_DISPLAY);
    seenSitelink.set(oldRn, assetOps.length);
    assetOps.push({
      create: {
        finalUrls: row.asset.finalUrls || [],
        sitelinkAsset: {
          linkText: sl.linkText,
          description1: replacePhone(sl.description1),
          description2: replacePhone(sl.description2),
        },
      },
    });
  }

  let createdRns = [];
  if (EXECUTE) {
    const r = await gads(at, `customers/${CUSTOMER_ID}/assets:mutate`, {
      operations: assetOps, validateOnly: false, partialFailure: false,
    });
    createdRns = r.results.map(x => x.resourceName);
    console.log(`  Created: ${createdRns.join(", ")}`);
  } else {
    await gads(at, `customers/${CUSTOMER_ID}/assets:mutate`, {
      operations: assetOps, validateOnly: true, partialFailure: false,
    });
    console.log(`  ✅ Asset creation would succeed (dry-run). ${assetOps.length} new assets planned.`);
  }

  // Step 3 — swap links (dedup new CALL link per campaign)
  console.log("\nStep 3 — Swap campaign_asset links…");

  const newCallRn = oldCallTargets.length > 0 ? createdRns[0] : null;
  const ops = [];
  const newCallLinkedCampaigns = new Set();

  for (const row of oldCallTargets) {
    ops.push({ campaignAssetOperation: { remove: row.campaignAsset.resourceName } });
    if (newCallRn && !newCallLinkedCampaigns.has(row.campaign.id)) {
      newCallLinkedCampaigns.add(row.campaign.id);
      ops.push({
        campaignAssetOperation: {
          create: {
            campaign: `customers/${CUSTOMER_ID}/campaigns/${row.campaign.id}`,
            asset: newCallRn, fieldType: "CALL", status: "ENABLED",
          },
        },
      });
    }
  }

  // Sitelink swaps — dedup per campaign+asset combo (each unique sitelink swapped once per campaign)
  const newSitelinkLinks = new Set();
  for (const row of oldSitelinkTargets) {
    const idx = seenSitelink.get(row.asset.resourceName);
    const newRn = idx != null && createdRns[idx] ? createdRns[idx] : null;
    ops.push({ campaignAssetOperation: { remove: row.campaignAsset.resourceName } });
    if (newRn) {
      const key = `${row.campaign.id}::${newRn}`;
      if (newSitelinkLinks.has(key)) continue;
      newSitelinkLinks.add(key);
      ops.push({
        campaignAssetOperation: {
          create: {
            campaign: `customers/${CUSTOMER_ID}/campaigns/${row.campaign.id}`,
            asset: newRn, fieldType: "SITELINK", status: "ENABLED",
          },
        },
      });
    }
  }

  console.log(`  ${ops.length} ops queued.`);

  await gads(at, `customers/${CUSTOMER_ID}/googleAds:mutate`, {
    mutateOperations: ops, validateOnly: true, partialFailure: false,
  });
  console.log("  ✅ Validation passed.");

  if (EXECUTE) {
    const r = await gads(at, `customers/${CUSTOMER_ID}/googleAds:mutate`, {
      mutateOperations: ops, validateOnly: false, partialFailure: false,
    });
    console.log(`  ✅ Executed ${r.mutateOperationResponses?.length || 0} ops.`);
  } else {
    console.log("  ℹ️  Re-run with --execute to apply.");
  }

  console.log(JSON.stringify({
    callsReplaced: oldCallTargets.length,
    sitelinksReplaced: oldSitelinkTargets.length,
    newCallAsset: newCallRn,
    newSitelinkCount: seenSitelink.size,
    executed: EXECUTE,
  }, null, 2));
}

main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
