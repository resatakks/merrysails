export function GET() {
  const robotsTxt = `# MerrySails — Bosphorus Cruise & Yacht Charter
# https://merrysails.com

User-agent: *
Allow: /
Disallow: /api/
Disallow: /reservation/*/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Yandex
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Brave-Search
Allow: /

User-agent: Bravebot
Allow: /

User-agent: MicrosoftPreview
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: iaskBot
Allow: /

User-agent: AI2Bot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: AhrefsBot
Allow: /

Host: https://merrysails.com
Sitemap: https://merrysails.com/sitemap.xml

# AI content files
# https://merrysails.com/llms.txt
# https://merrysails.com/llms-full.txt
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
