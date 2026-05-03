import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface ClientErrorPayload {
  type: "js_error" | "promise_rejection";
  message?: string;
  source?: string;
  path?: string;
  userAgent?: string;
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClientErrorPayload;

    const message = (body.message || "unknown").slice(0, 500);
    const source = (body.source || "").slice(0, 500);
    const path = (body.path || "").slice(0, 256);
    const ua = (body.userAgent || req.headers.get("user-agent") || "").slice(0, 256);
    const lang = (body.language || req.headers.get("accept-language") || "").slice(0, 64);

    console.error(
      `[client-error] type=${body.type} path=${path} lang=${lang} ua=${ua} msg="${message}" src="${source}"`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
