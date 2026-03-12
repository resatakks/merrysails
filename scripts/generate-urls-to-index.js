/**
 * MerrySails — GSC için indexlenecek URL listesi üretir.
 * Sitemap'ten tüm URL'leri alır; günlük kota (10–20) kadarını ayrı dosyaya yazar.
 *
 * Kullanım:
 *   node scripts/generate-urls-to-index.js
 *   SITEMAP_URL=https://merrysails.com/sitemap.xml node scripts/generate-urls-to-index.js
 *
 * Çıktı:
 *   data/urls-to-index.json     — Tüm URL'ler
 *   data/urls-to-index-today.txt — Bugün GSC'de "İndekslemeyi iste" ile gönderilecek URL'ler
 *
 * GSC kota: Google günde ~10–20 "İndekslemeyi iste" kabul eder. Daha fazla gönderirseniz
 * o gün kabul etmeyi durdurur; ertesi gün tekrar deneyebilirsiniz.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const SITEMAP_URL = process.env.SITEMAP_URL || "https://merrysails.com/sitemap.xml";
const URLS_PER_DAY = parseInt(process.env.URLS_PER_DAY || "15", 10); // GSC genelde 10–20 kabul eder
const DATA_DIR = path.join(__dirname, "..", "data");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "MerrySails-IndexScript/1.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function parseSitemapXml(xml) {
  const urls = [];
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  for (const m of matches) {
    const url = m.replace(/<\/?loc>/g, "").trim();
    if (url) urls.push(url);
  }
  return urls;
}

async function main() {
  console.log("MerrySails — GSC indexleme listesi\n");
  console.log("Sitemap:", SITEMAP_URL);
  console.log("Günlük URL sayısı:", URLS_PER_DAY, "\n");

  let xml;
  try {
    xml = await fetchUrl(SITEMAP_URL);
  } catch (e) {
    console.error("Sitemap alınamadı:", e.message);
    console.error("Örnek: SITEMAP_URL=https://merrysails.com/sitemap.xml node scripts/generate-urls-to-index.js");
    process.exit(1);
  }

  const urls = parseSitemapXml(xml);
  if (urls.length === 0) {
    console.error("Sitemap'te <loc> bulunamadı.");
    process.exit(1);
  }

  const now = new Date();
  const list = urls.map((url) => ({ url, generatedAt: now.toISOString() }));

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const jsonPath = path.join(DATA_DIR, "urls-to-index.json");
  fs.writeFileSync(jsonPath, JSON.stringify(list, null, 2), "utf-8");
  console.log("Tüm URL'ler:", jsonPath, "—", list.length, "adet\n");

  const todayUrls = list.slice(0, URLS_PER_DAY).map((e) => e.url);
  const txtPath = path.join(DATA_DIR, "urls-to-index-today.txt");
  const txtContent = [
    "# Google Search Console — İndekslemeyi iste (MerrySails)",
    "# Tarih: " + now.toISOString().split("T")[0],
    "# Toplam: " + list.length + " URL | Bugün: " + todayUrls.length + " URL",
    "# GSC'de: URL'yi incele → İndekslemeyi iste (günde ~10–20 kabul eder)",
    "",
    "## Bugün gönderilecek URL'ler",
    "",
    ...todayUrls.map((u, i) => `${i + 1}. ${u}`),
    "",
    "## Kalan: " + (list.length - todayUrls.length) + " URL",
    "Yarın bu script'i tekrar çalıştırıp yeni 'bugün' listesini kullanın.",
  ].join("\n");

  fs.writeFileSync(txtPath, txtContent, "utf-8");
  console.log("Bugün indexlenecek:", txtPath, "—", todayUrls.length, "URL\n");
  console.log("— Bugün gönderilecek URL'ler —");
  todayUrls.forEach((u, i) => console.log(`${i + 1}. ${u}`));
  console.log("\nGSC'de: search.google.com/search-console → URL'yi incele → yapıştır → İndekslemeyi iste");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
