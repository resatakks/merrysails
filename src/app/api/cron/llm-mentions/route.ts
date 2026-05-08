import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 300;

const KEYWORDS = [
  "best Istanbul sunset cruise",
  "Bosphorus dinner cruise",
  "Istanbul yacht charter",
  "MerrySails",
];

const BRAND_REGEX = /merrysails/i;

interface DataForSeoTaskResult {
  items?: Array<{
    se_type?: string;
    keyword?: string;
    check_url?: string;
    items?: Array<{
      type?: string;
      title?: string;
      description?: string;
      url?: string;
      rank_group?: number;
    }>;
  }>;
}

interface DataForSeoResponse {
  tasks?: Array<{
    result?: DataForSeoTaskResult[];
    status_message?: string;
    status_code?: number;
  }>;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const login = process.env.DATAFORSEO_LOGIN ?? "";
  const password = process.env.DATAFORSEO_PASSWORD ?? "";

  if (!login) {
    return NextResponse.json({ skipped: true, reason: "no_credentials" });
  }

  const credentials = Buffer.from(`${login}:${password}`).toString("base64");

  const results: {
    keyword: string;
    llm: string;
    brandMentioned: boolean;
    brandPosition: number;
    citationContext: string | null;
  }[] = [];

  const tasks = KEYWORDS.map((keyword) => ({
    keyword,
    language_code: "en",
    location_code: 2840, // United States
  }));

  try {
    const res = await fetch(
      "https://api.dataforseo.com/v3/serp/llm/organic/live/advanced",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(tasks),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `DataForSEO HTTP ${res.status}` }, { status: 502 });
    }

    const data: DataForSeoResponse = await res.json();

    for (const task of data.tasks ?? []) {
      for (const result of task.result ?? []) {
        const keyword = result.items?.[0]?.keyword ?? "";
        const seType = result.items?.[0]?.se_type ?? "unknown";

        for (const item of result.items?.[0]?.items ?? []) {
          const text = [item.title ?? "", item.description ?? ""].join(" ");
          const brandMentioned = BRAND_REGEX.test(text);
          const brandPosition = brandMentioned ? (item.rank_group ?? 0) : 0;
          const citationContext = brandMentioned
            ? text.slice(0, 500)
            : null;

          const row = {
            keyword,
            llm: seType,
            brandMentioned,
            brandPosition,
            citationContext,
          };

          results.push(row);

          await prisma.llmMention.create({ data: row });
        }
      }
    }

    return NextResponse.json({ ok: true, saved: results.length, results });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown" },
      { status: 500 }
    );
  }
}
