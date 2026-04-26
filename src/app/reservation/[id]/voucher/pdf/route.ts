import { NextRequest, NextResponse } from "next/server";
import { getReservationDocumentPayload } from "@/lib/reservation-documents";
import { generateReservationVoucherPdf } from "@/lib/reservation-pdf";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = await getReservationDocumentPayload(id);

  if (!payload) {
    return new NextResponse("Reservation not found.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const pdfBuffer = await generateReservationVoucherPdf(payload.documentInput);
  const disposition =
    request.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${payload.reservation.reservationId}-voucher.pdf"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
