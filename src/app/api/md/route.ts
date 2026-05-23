/**
 * Markdown for Agents endpoint.
 * Serves public/agents.md with text/markdown content-type when agents send
 * `Accept: text/markdown`. Routed via next.config.ts rewrites().
 *
 * Specs:
 *  - https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
 *  - https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  try {
    const filePath = path.join(process.cwd(), "public", "agents.md");
    const content = await readFile(filePath, "utf-8");
    return new Response(content, {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
        "x-content-source": "public/agents.md",
      },
    });
  } catch {
    return new Response("# MerrySails\n\nAgent reference temporarily unavailable.\n", {
      status: 503,
      headers: { "content-type": "text/markdown; charset=utf-8" },
    });
  }
}
