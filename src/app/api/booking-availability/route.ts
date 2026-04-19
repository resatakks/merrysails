import { NextRequest, NextResponse } from "next/server";
import { getTourBySlug } from "@/data/tours";
import { getPublicTourOperationSnapshot } from "@/lib/tour-operations";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const tourSlug = request.nextUrl.searchParams.get("tourSlug")?.trim() ?? "";

  if (!tourSlug || !getTourBySlug(tourSlug)) {
    return NextResponse.json(
      { success: false, error: "Invalid tour slug.", operations: [] },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  const operations = await getPublicTourOperationSnapshot(tourSlug);

  return NextResponse.json(
    {
      success: true,
      operations,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
