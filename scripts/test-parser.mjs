/**
 * Smoke test for the LLM parser. Reads operator-style messages from the test
 * fixtures and prints parsed output + warnings.
 *
 * Run:  node --env-file=.env.local scripts/test-parser.mjs
 */
import { parseExternalMessage } from "../src/lib/external-parser/parse";

const FIXTURES = [
  {
    label: "Sam Othman — engagement (from boss WhatsApp)",
    message: `[12.06.2026 19:56:45] Reşat: 29.06.26

Catering and food service
Table decorations
Music speaker
Professional photograph service
Engagement cake
3 hours Tour on Sunset time

2100€ nakit odeme (bir kısmı organizasyon öncesinde alınacak)

Engagement organization

Email is sam.networkzone@gmail.com

Sam Othman
+1 (832) 370-0232
[12.06.2026 19:57:26] Reşat: Ben sunset ve dinner iptal cekeyim 20 de private var bi
[12.06.2026 19:58:03] Emir Plakay: Balat
[12.06.2026 19:58:32] Emir Plakay: 18-21 veya 19-22 yapıcaz da
[12.06.2026 23:42:42] Emir Plakay: 21 kişi olacaklar`,
  },
  {
    label: "Graziella — site form (regular reservation pattern)",
    message: `Hi, I'd like to book:
Tour: Bosphorus Dinner Cruise
Date: 12 Jun 2026
Time: 20:30
Guests: 2
Package: Silver Dinner Cruise - Soft Drinks (€30/person)
Additional guests: Diorge Pedro Monteiro
Total: €60
Name: Graziella Orsida
Email: graziellaorsida@gmail.com
Phone: +353838651127`,
  },
  {
    label: "Airport transfer — operator shorthand",
    message: `15 haziran sabah 5te ist havalimani'ndan taksimde otel grand hyatte transfer
2 yetiskin 1 cocuk
50 euro nakit
müşteri Mark Johnson +44 7700 900123 mark.j@example.com`,
  },
  {
    label: "Vague — should low-confidence + ask",
    message: `önümüzdeki cuma akşam private cruise 4 kişi
ahmet abi
1500 dolar`,
  },
  {
    label: "Kakorina Daria — shared sunset (RESERVATION)",
    message: `[12.06.2026 11:45:46] Emir Merry Şirket Hattı: 23 June.
[12.06.2026 11:45:46] Emir Merry Şirket Hattı: Kakorina Daria
+79138384824
dkako82@mail.ru
[12.06.2026 11:46:24] Emir Merry Şirket Hattı: Sunset alkolsüz
Kişi başı 34€
2pax`,
  },
  {
    label: "Michel Conte — private yacht sunset (RESERVATION)",
    message: `[8.06.2026 11:41:17] Emir Merry Şirket Hattı: 12.06.26
20:00-22:00
2pax
Michel Conte

contemichel1976@gmail.com

+33 6 98 64 50 04
[8.06.2026 11:41:21] Emir Merry Şirket Hattı: Mail atalım pls
[8.06.2026 11:41:40] Reşat: özel yat mı, kaç euro
[8.06.2026 11:42:02] Emir Merry Şirket Hattı: Prıvate yat

Karaköy kalkış

200€ nakit ödeme`,
  },
  {
    label: "Igor Orlov — private yacht dinner (RESERVATION)",
    message: `[8.06.2026 16:23:22] Emir Merry Şirket Hattı: 19.06.26
2pax
19-23
yemekli

Igor Orlov
vp31082021@gmail.com

Karakoy kalkis birakilis
[8.06.2026 16:23:34] Reşat: fiyat nedir baba, tel yazayım mı
[8.06.2026 16:24:09] Emir Merry Şirket Hattı: 486€ nakit ödeme
+7 928 196‑70‑56`,
  },
  {
    label: "İbrahim Koesger — alkollü sunset, transfer yok",
    message: `[1.06.2026 15:04:12] Emir Merry Şirket Hattı: 01.06.25
2pax

Alkollü

İbrahim Koesger, ibrahim.koesger@gmail.com

+41 79 958 58 74

Ödeme sizde total 80€

Transfersiz`,
  },
  {
    label: "Kim & Robert Haddad — airport transfer (EXTERNAL)",
    message: `[7.06.2026 11:50:58] Emir Merry Şirket Hattı: Good morning 😊
We would like to book car service for two people.

1. Name: Kim & Robert Haddad
2. Flight: TK 65
3. Date: June 9th at 5:10pm
4. Airport: IST airport
5. Hotel: Ayasofya
Kucuk Ayasofya, Demarco Resit Sk. No: 14, Fatih.

Thank you 😊
[7.06.2026 11:51:08] Emir Merry Şirket Hattı: Voucher yapabilir miyiz ustamüsait olunca
[7.06.2026 12:05:42] Emir Merry Şirket Hattı: 43€`,
  },
  {
    label: "Transfer UPDATE — change date only",
    message: `[10.06.2026 16:00:26] Emir Merry Şirket Hattı: All Details (flight No + Hotel = same. Only date change: Arrival 24.06.2026
[10.06.2026 16:00:32] Emir Merry Şirket Hattı: Usta son geleni güncelleyebilir misin`,
  },
];

const argMsg = process.argv.slice(2).join(" ").trim();
const tests = argMsg
  ? [{ label: "Custom CLI input", message: argMsg }]
  : FIXTURES;

console.log(`\n🧪 LLM Parser Test — ${tests.length} fixture(s)\n`);

for (const [idx, { label, message }] of tests.entries()) {
  console.log("━".repeat(72));
  console.log(`📨 ${label}`);
  console.log("━".repeat(72));

  // Free tier 10 RPM — pace at 7s/call to stay under
  if (idx > 0) await new Promise((r) => setTimeout(r, 7000));

  const result = await parseExternalMessage(message, "merrysails");

  if (!result.ok) {
    console.log(`❌ FAIL (${result.latencyMs}ms): ${result.error}`);
    if (result.raw) console.log("Raw:", JSON.stringify(result.raw, null, 2));
    continue;
  }

  const d = result.data;
  console.log(`✅ Parsed in ${result.latencyMs}ms · confidence ${d.confidence.toFixed(2)}`);
  console.log();
  const intentTag =
    d.intent === "reservation"
      ? "🟢 RESERVATION"
      : d.intent === "external"
        ? "🟡 EXTERNAL"
        : "🔄 UPDATE";
  console.log(`Intent:      ${intentTag}${d.referenceId ? ` (ref: ${d.referenceId})` : ""}`);
  console.log(`Event type:  ${d.eventType}`);
  console.log(`Service:     ${d.serviceTitle}`);
  console.log(`Customer:    ${d.customerName}`);
  console.log(`             ${d.customerEmail ?? "(no email)"} · ${d.customerPhone ?? "(no phone)"}${d.customerCountry ? ` · ${d.customerCountry}` : ""}`);
  console.log(`Date:        ${d.jobDate ?? "(none)"}${d.jobTime ? ` · ${d.jobTime}` : ""}${d.durationHours ? ` · ${d.durationHours}h` : ""}`);
  console.log(`Pickup:      ${d.pickupPoint ?? "(none)"}${d.dropoffPoint ? `  →  ${d.dropoffPoint}` : ""}`);
  console.log(`Guests:      ${d.guests}`);
  console.log(`Amount:      ${d.amount} ${d.currency} · ${d.paymentMethod}`);
  if (d.paymentNotes) console.log(`Pay notes:   ${d.paymentNotes}`);
  if (d.inclusions.length) {
    console.log(`Inclusions:`);
    d.inclusions.forEach((i) => console.log(`  • ${i}`));
  }
  if (d.internalNote) console.log(`Internal:    ${d.internalNote}`);

  if (d.uncertainties.length) {
    console.log();
    console.log(`⚠️  Model uncertainties:`);
    d.uncertainties.forEach((u) => console.log(`  - ${u}`));
  }
  if (result.warnings.length) {
    console.log();
    console.log(`🔍 Sanity warnings:`);
    result.warnings.forEach((w) => console.log(`  - ${w}`));
  }
  console.log();
}
