import { NextRequest, NextResponse } from "next/server";

function isSuspiciousServerActionProbe(request: NextRequest): boolean {
  return (
    request.method === "POST" &&
    request.nextUrl.pathname === "/" &&
    request.headers.has("next-action")
  );
}

export function proxy(request: NextRequest) {
  if (isSuspiciousServerActionProbe(request)) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
