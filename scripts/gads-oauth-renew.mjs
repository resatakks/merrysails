#!/usr/bin/env node
/**
 * Google Ads OAuth refresh-token renewal via a local loopback callback.
 * Prints an AUTH_URL — operator opens it, signs in (resatakkus10@gmail.com),
 * authorizes the adwords scope, Google redirects to localhost:8765/callback,
 * we exchange the code → refresh_token → write GOOGLE_ADS_REFRESH_TOKEN to .env.local.
 * Run: node scripts/gads-oauth-renew.mjs   (keeps running until the callback fires)
 */
import fs from "fs";
import http from "http";
import path from "path";

const root = "/Users/resat/Desktop/merrysails";
const envPath = path.join(root, ".env.local");
const env = {};
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const clientId = env.GOOGLE_ADS_CLIENT_ID;
const clientSecret = env.GOOGLE_ADS_CLIENT_SECRET;
if (!clientId || !clientSecret) { console.error("MISSING GOOGLE_ADS_CLIENT_ID/SECRET in .env.local"); process.exit(1); }

const PORT = 8765;
const redirectUri = `http://localhost:${PORT}/callback`;
const authUrl = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "https://www.googleapis.com/auth/adwords",
  access_type: "offline",
  prompt: "consent",
}).toString();

console.log("AUTH_URL:::" + authUrl);
console.log("(open the URL above, sign in as resatakkus10@gmail.com, click Allow)");

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (!u.pathname.startsWith("/callback")) { res.writeHead(404); res.end(); return; }
  const err = u.searchParams.get("error");
  if (err) { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end(`<h2>Hata: ${err}</h2>`); console.error("OAUTH_ERROR:::" + err); server.close(); process.exit(1); }
  const code = u.searchParams.get("code");
  if (!code) { res.writeHead(400); res.end("no code"); return; }
  try {
    const tr = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
    });
    const data = await tr.json();
    if (!data.refresh_token) { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end("<h2>refresh_token gelmedi (zaten yetkilendirilmiş olabilir). Tekrar dene.</h2>"); console.error("NO_REFRESH_TOKEN:::" + JSON.stringify(data)); server.close(); process.exit(1); }
    let envText = fs.readFileSync(envPath, "utf8");
    if (/^GOOGLE_ADS_REFRESH_TOKEN=/m.test(envText)) envText = envText.replace(/^GOOGLE_ADS_REFRESH_TOKEN=.*$/m, `GOOGLE_ADS_REFRESH_TOKEN=${data.refresh_token}`);
    else envText += (envText.endsWith("\n") ? "" : "\n") + `GOOGLE_ADS_REFRESH_TOKEN=${data.refresh_token}\n`;
    fs.writeFileSync(envPath, envText);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end("<h2>✅ Token kaydedildi. Bu sekmeyi kapatabilirsin.</h2>");
    console.log("REFRESH_TOKEN_SAVED:::len=" + data.refresh_token.length);
    server.close(); setTimeout(() => process.exit(0), 200);
  } catch (e) { res.writeHead(500); res.end("err"); console.error("EXCHANGE_FAILED:::" + e.message); server.close(); process.exit(1); }
});
server.listen(PORT, () => console.log("LISTENING:::" + PORT));
