#!/usr/bin/env node

const MICROS_PER_UNIT = 1_000_000n;

function parseAmount(raw) {
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    throw new Error(`Invalid amount: ${raw}`);
  }

  const [whole, fraction = ""] = raw.split(".");
  return BigInt(whole) * MICROS_PER_UNIT + BigInt(fraction.padEnd(6, "0"));
}

function formatMicros(amount) {
  return amount.toString();
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log("Usage: node scripts/google-ads-budget-helper.mjs <daily-budget-tl> [more...]");
  console.log("Example: node scripts/google-ads-budget-helper.mjs 417 167");
  process.exit(args.length === 0 ? 1 : 0);
}

for (const raw of args) {
  const micros = parseAmount(raw);
  const minimum = 50n * MICROS_PER_UNIT;

  if (micros < minimum) {
    throw new Error(
      `Suspicious budget ${raw} TL is below 50 TL. Refusing to output micros.`
    );
  }

  console.log(`${raw} TL = ${formatMicros(micros)} micros`);
}
