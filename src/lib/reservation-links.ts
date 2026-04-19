import {
  getBookingMode,
  getTourBySlug,
  getTourPath,
  isCoreProduct,
} from "@/data/tours";
import { SITE_URL } from "@/lib/constants";

export interface ReservationLinkContext {
  bookingLabel: string;
  invoiceUrl: string;
  pageLabel: string;
  reservationUrl: string;
  tourPath: string;
  tourUrl: string;
  voucherUrl: string;
}

function joinSiteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path}`;
}

export function getReservationDetailUrl(reservationId: string): string {
  return joinSiteUrl(`/reservation/${encodeURIComponent(reservationId)}`);
}

export function getReservationVoucherUrl(reservationId: string): string {
  return joinSiteUrl(`/reservation/${encodeURIComponent(reservationId)}/voucher`);
}

export function getReservationInvoiceUrl(reservationId: string): string {
  return joinSiteUrl(`/reservation/${encodeURIComponent(reservationId)}/invoice`);
}

export function getTourUrlBySlug(tourSlug: string): string {
  const tour = getTourBySlug(tourSlug);

  if (!tour) {
    return SITE_URL;
  }

  return joinSiteUrl(getTourPath(tour));
}

export function getReservationLinkContext(
  tourSlug: string,
  reservationId: string
): ReservationLinkContext {
  const tour = getTourBySlug(tourSlug);
  const tourPath = tour ? getTourPath(tour) : "/";

  return {
    bookingLabel: tour
      ? getBookingMode(tour) === "quote"
        ? "Quote-led request"
        : "Direct booking page"
      : "Custom request",
    invoiceUrl: getReservationInvoiceUrl(reservationId),
    pageLabel: tour
      ? isCoreProduct(tour)
        ? "Core product"
        : "Service page"
      : "Custom request",
    reservationUrl: getReservationDetailUrl(reservationId),
    tourPath,
    tourUrl: joinSiteUrl(tourPath),
    voucherUrl: getReservationVoucherUrl(reservationId),
  };
}
