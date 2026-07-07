import { NextRequest, NextResponse } from "next/server";

/**
 * /api/wa — ölçülebilir WhatsApp yönlendirmesi.
 *
 * Google Ads WhatsApp sitelink'leri doğrudan wa.me'ye gittiğinde site tag'i hiç
 * çalışmaz → asset tıkları dönüşüm olarak YAKALANAMAZ. Bu route araya minik bir
 * sayfa sokar: Ads conversion'ı (MS WhatsApp Click) ateşler, sonra wa.me'ye
 * geçer. Ads sitelink final URL'i olarak kullan:
 *   https://merrysails.com/api/wa?src=ads-sitelink&text=Hi%2C%20I%27d%20like%20a%20yacht%20charter%20quote
 */

const WHATSAPP_NUMBER = "905448989812";
const ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18112460958").trim();
const GA4_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-9B3Q7FM7X8").trim();
// "MS WhatsApp Click" conversion action label (env ile aynı kaynak)
const WHATSAPP_LABEL = (process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || "gnRdCPi4saEcEJ7x2LxD").trim();

export function GET(request: NextRequest): NextResponse {
  const text = (request.nextUrl.searchParams.get("text") || "").slice(0, 200);
  const src = (request.nextUrl.searchParams.get("src") || "redirect").slice(0, 50);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WhatsApp…</title>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA4_ID}',{send_page_view:false});
gtag('config','${ADS_ID}');
var done=false;
function go(){if(done)return;done=true;location.replace(${JSON.stringify(waUrl)});}
gtag('event','whatsapp_click',{event_category:'contact',event_label:${JSON.stringify(src)},send_to:'${GA4_ID}'});
gtag('event','conversion',{send_to:'${ADS_ID}/${WHATSAPP_LABEL}',value:300,currency:'TRY',event_callback:go});
setTimeout(go,800);
</script>
<style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;color:#334155}</style>
</head>
<body><p>Opening WhatsApp…</p><noscript><a href="${waUrl}">Continue to WhatsApp</a></noscript></body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
