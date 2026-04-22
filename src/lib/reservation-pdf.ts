import fs from "node:fs";
import path from "node:path";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import { getTourBySlug } from "@/data/tours";
import {
  ADDRESS,
  COMPANY_NAME,
  EMAIL,
  PHONE_DISPLAY,
  SITE_NAME,
  TURSAB_AGENCY_NAME,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";
import type { ReservationPricingSnapshot } from "@/lib/reservation-pricing";

interface ReservationPdfInput {
  reservationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourSlug: string;
  tourName: string;
  serviceDate: Date;
  time: string;
  guests: number;
  totalPrice: number;
  currency: string;
  packageName?: string;
  addOns?: string[];
  additionalGuests?: string[];
  privateTransferRequested?: boolean;
  notes?: string | null;
  pricing?: ReservationPricingSnapshot;
  status?: string;
}

let regularFontBase64: string | null = null;
let boldFontBase64: string | null = null;

function loadFontBase64(filename: string): string | null {
  try {
    return fs
      .readFileSync(path.join(process.cwd(), "public", "fonts", filename))
      .toString("base64");
  } catch {
    return null;
  }
}

function setupFonts(doc: jsPDF) {
  if (!regularFontBase64) {
    regularFontBase64 = loadFontBase64("Roboto-Regular.ttf");
  }

  if (!boldFontBase64) {
    boldFontBase64 = loadFontBase64("Roboto-Bold.ttf");
  }

  if (regularFontBase64 && boldFontBase64) {
    doc.addFileToVFS("Roboto-Regular.ttf", regularFontBase64);
    doc.addFileToVFS("Roboto-Bold.ttf", boldFontBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    doc.setFont("Roboto", "normal");
  }
}

function asBuffer(doc: jsPDF): Buffer {
  return Buffer.from(doc.output("arraybuffer"));
}

function safe(value?: string | null): string {
  return value?.trim() || "—";
}

function currencySymbol(currency: string): string {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "TRY":
      return "₺";
    case "GBP":
      return "£";
    default:
      return `${currency} `;
  }
}

function formatMoney(amount: number, currency: string): string {
  return `${currencySymbol(currency)}${amount.toFixed(2)}`;
}

function line(
  doc: jsPDF,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: [number, number, number] = [229, 231, 235]
) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.35);
  doc.line(x1, y1, x2, y2);
}

function writeWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 5.2
): number {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];

  lines.forEach((currentLine, index) => {
    doc.text(currentLine, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}

function writeLabelValue(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number
): number {
  doc.setTextColor(107, 114, 128);
  doc.setFont("Roboto", "bold");
  doc.setFontSize(9);
  doc.text(label.toUpperCase(), x, y);

  doc.setTextColor(17, 24, 39);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(11);
  return writeWrappedText(doc, value, x, y + 5, width, 5.1);
}

function drawBrandIcon(doc: jsPDF, x: number, y: number, size: number) {
  doc.setFillColor(12, 45, 72);
  doc.roundedRect(x, y, size, size, 3.5, 3.5, "F");
  doc.setTextColor(247, 181, 44);
  doc.setFont("Roboto", "bold");
  doc.setFontSize(11);
  doc.text("M", x + size / 2, y + size / 2 + 2, { align: "center" });
  doc.setDrawColor(247, 181, 44);
  doc.setLineWidth(0.45);
  doc.line(x + 3, y + size - 3.5, x + size / 2, y + size - 4.6);
  doc.line(x + size / 2, y + size - 4.6, x + size - 3, y + size - 3.5);
}

function drawBrandWordmark(doc: jsPDF, x: number, y: number) {
  doc.setFont("Roboto", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Merry", x, y);
  const merryWidth = doc.getTextWidth("Merry");
  doc.setTextColor(247, 181, 44);
  doc.text("Sails", x + merryWidth + 1.2, y);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(COMPANY_NAME, x, y + 5.5);
}

function writeHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, 14, 182, 36, 6, 6, "F");
  doc.setFillColor(247, 181, 44);
  doc.roundedRect(14, 42.5, 182, 7.5, 0, 0, "F");

  drawBrandIcon(doc, 20, 21, 14);
  drawBrandWordmark(doc, 38, 30);

  doc.setTextColor(203, 213, 225);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(8.8);
  doc.text(SITE_NAME, 104, 24.5);

  doc.setTextColor(255, 255, 255);
  doc.setFont("Roboto", "bold");
  doc.setFontSize(17.5);
  doc.text(title, 104, 31);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(226, 232, 240);
  doc.text(subtitle, 104, 36.8);
}

function getLineItems(input: ReservationPdfInput) {
  if (input.pricing?.lineItems?.length) {
    return input.pricing.lineItems;
  }

  return [
    {
      type: "package" as const,
      label: input.packageName || input.tourName,
      quantity: 1,
      unitPrice: input.totalPrice,
      unitLabel: "/booking",
      total: input.totalPrice,
    },
  ];
}

function getPackageDiscountContext(
  input: ReservationPdfInput,
  lineItems: ReturnType<typeof getLineItems>
) {
  const packageLine = lineItems.find((item) => item.type === "package");
  const tour = getTourBySlug(input.tourSlug);
  const selectedPackage = input.packageName
    ? tour?.packages?.find((pkg) => pkg.name === input.packageName)
    : tour?.packages?.[0];
  const originalUnitPrice = selectedPackage?.originalPrice ?? tour?.originalPriceEur;

  if (!packageLine || !originalUnitPrice || originalUnitPrice <= packageLine.unitPrice) {
    return null;
  }

  const publicValue = originalUnitPrice * packageLine.quantity;
  const directSaving = publicValue - packageLine.total;

  if (directSaving <= 0) {
    return null;
  }

  return {
    publicValue,
    directSaving,
  };
}

function drawInvoiceTable(doc: jsPDF, input: ReservationPdfInput, startY: number): number {
  const lineItems = getLineItems(input);
  const discountContext = getPackageDiscountContext(input, lineItems);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, startY, 182, 11, 4, 4, "F");
  doc.setFont("Roboto", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Description", 18, startY + 7);
  doc.text("Qty", 118, startY + 7);
  doc.text("Unit Rate", 137, startY + 7);
  doc.text("Amount", 188, startY + 7, { align: "right" });

  let cursorY = startY + 16;

  lineItems.forEach((item) => {
    doc.setFont("Roboto", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(17, 24, 39);
    const descriptionBottom = writeWrappedText(doc, item.label, 18, cursorY, 84, 4.8);
    doc.text(String(item.quantity), 118, cursorY);
    doc.text(formatMoney(item.unitPrice, input.currency), 137, cursorY);
    doc.setFont("Roboto", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(item.unitLabel, 137, cursorY + 4.4);
    doc.setFont("Roboto", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(17, 24, 39);
    doc.text(formatMoney(item.total, input.currency), 188, cursorY, { align: "right" });
    cursorY = Math.max(descriptionBottom, cursorY + 6.5) + 5.5;
    line(doc, 18, cursorY - 1, 192, cursorY - 1, [241, 245, 249]);
  });

  const subtotal = input.pricing?.subtotal ?? input.totalPrice;
  const addOnsTotal = input.pricing?.addOnsTotal ?? 0;
  const total = input.pricing?.total ?? input.totalPrice;

  let summaryY = cursorY + 4;

  doc.setFont("Roboto", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);

  if (discountContext) {
    doc.text("Public package value", 136, summaryY);
    doc.text(formatMoney(discountContext.publicValue, input.currency), 188, summaryY, {
      align: "right",
    });
    summaryY += 6;

    doc.setTextColor(22, 101, 52);
    doc.text("Direct booking saving", 136, summaryY);
    doc.text(`-${formatMoney(discountContext.directSaving, input.currency)}`, 188, summaryY, {
      align: "right",
    });
    summaryY += 6;
    doc.setTextColor(71, 85, 105);
  }

  doc.text("Package subtotal", 136, summaryY);
  doc.text(formatMoney(subtotal, input.currency), 188, summaryY, { align: "right" });
  summaryY += 6;

  doc.text("Add-ons", 136, summaryY);
  doc.text(formatMoney(addOnsTotal, input.currency), 188, summaryY, { align: "right" });

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(118, summaryY + 4, 74, 16, 5, 5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("Roboto", "bold");
  doc.setFontSize(11);
  doc.text("Total", 124, summaryY + 14);
  doc.text(formatMoney(total, input.currency), 186, summaryY + 14, { align: "right" });

  return summaryY + 26;
}

function writeFooter(doc: jsPDF, reservationId: string) {
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 262, 182, 26, 6, 6, "F");
  doc.setTextColor(71, 85, 105);
  doc.setFont("Roboto", "normal");
  doc.setFontSize(8.5);
  doc.text(
    `${COMPANY_NAME} • ${TURSAB_AGENCY_NAME} • TURSAB ${TURSAB_LICENSE_NUMBER}`,
    18,
    271
  );
  doc.text(`${EMAIL} • ${PHONE_DISPLAY}`, 18, 277);
  doc.text(`${ADDRESS}`, 18, 283);
  doc.text(`Reservation reference: ${reservationId}`, 18, 288);
}

export async function generateReservationInvoicePdf(
  input: ReservationPdfInput
): Promise<Buffer> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  setupFonts(doc);

  const tour = getTourBySlug(input.tourSlug);
  const issueDate = format(new Date(), "MMMM d, yyyy");
  const serviceDate = format(input.serviceDate, "EEEE, MMMM d, yyyy");

  writeHeader(
    doc,
    "Reservation Invoice",
    "Finance-ready summary generated from the confirmed booking."
  );

  doc.setFont("Roboto", "bold");
  doc.setTextColor(17, 24, 39);
  doc.setFontSize(10);
  doc.text(`Invoice Ref: ${input.reservationId}`, 14, 60);
  doc.text(`Issued: ${issueDate}`, 118, 60);

  let leftY = 72;
  leftY = writeLabelValue(doc, "Lead Guest", safe(input.customerName), 14, leftY, 78) + 5;
  leftY = writeLabelValue(doc, "Email", safe(input.customerEmail), 14, leftY, 78) + 5;
  leftY = writeLabelValue(doc, "Phone", safe(input.customerPhone), 14, leftY, 78) + 5;

  let rightY = 72;
  rightY = writeLabelValue(doc, "Experience", safe(input.tourName), 108, rightY, 82) + 5;
  rightY = writeLabelValue(doc, "Service Date", serviceDate, 108, rightY, 82) + 5;
  rightY = writeLabelValue(doc, "Departure", safe(input.time), 108, rightY, 82) + 5;
  rightY = writeLabelValue(
    doc,
    "Departure Point",
    safe(tour?.departurePoint),
    108,
    rightY,
    82
  ) + 5;

  const detailsBottomY = Math.max(leftY, rightY) + 4;
  line(doc, 14, detailsBottomY, 196, detailsBottomY);

  const tableEndY = drawInvoiceTable(doc, input, detailsBottomY + 8);

  const selectedOptions = [
    input.packageName ? `Package: ${input.packageName}` : null,
    input.addOns && input.addOns.length > 0 ? `Add-ons: ${input.addOns.join(", ")}` : null,
    input.privateTransferRequested
      ? "Private transfer requested. Our team will contact the guest to confirm pickup details."
      : null,
    input.additionalGuests && input.additionalGuests.length > 0
      ? `Other passengers: ${input.additionalGuests.join(", ")}`
      : null,
    input.notes ? `Guest note: ${input.notes}` : null,
  ].filter(Boolean) as string[];

  if (selectedOptions.length > 0) {
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(14, tableEndY, 182, 30, 5, 5, "F");
    doc.setFont("Roboto", "bold");
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14);
    doc.text("BOOKING NOTES", 18, tableEndY + 8);
    doc.setFont("Roboto", "normal");
      doc.setTextColor(120, 53, 15);
      writeWrappedText(doc, selectedOptions.join(" • "), 18, tableEndY + 14, 174, 4.8);
  }

  writeFooter(doc, input.reservationId);
  return asBuffer(doc);
}

export async function generateReservationVoucherPdf(
  input: ReservationPdfInput
): Promise<Buffer> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  setupFonts(doc);

  const tour = getTourBySlug(input.tourSlug);
  const serviceDate = format(input.serviceDate, "EEEE, MMMM d, yyyy");

  writeHeader(
    doc,
    "Reservation Voucher",
    "Boarding-ready document for guest check-in and operations."
  );

  doc.setFillColor(240, 253, 244);
  doc.roundedRect(14, 56, 182, 20, 6, 6, "F");
  doc.setFont("Roboto", "bold");
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(10);
  doc.text(`Reservation ID`, 20, 65);
  doc.setFontSize(18);
  doc.text(input.reservationId, 20, 72);
  doc.setFontSize(10);
  doc.text(safe(input.status ?? "Confirmed"), 184, 65, { align: "right" });

  let leftY = 88;
  leftY = writeLabelValue(doc, "Lead Guest", safe(input.customerName), 14, leftY, 82) + 5;
  leftY = writeLabelValue(doc, "Email", safe(input.customerEmail), 14, leftY, 82) + 5;
  leftY = writeLabelValue(doc, "Phone", safe(input.customerPhone), 14, leftY, 82) + 5;
  leftY = writeLabelValue(
    doc,
    "Guests",
    `${input.guests} guest${input.guests > 1 ? "s" : ""}`,
    14,
    leftY,
    82
  ) + 5;

  let rightY = 88;
  rightY = writeLabelValue(doc, "Experience", safe(input.tourName), 108, rightY, 82) + 5;
  rightY = writeLabelValue(doc, "Date", serviceDate, 108, rightY, 82) + 5;
  rightY = writeLabelValue(doc, "Departure", safe(input.time), 108, rightY, 82) + 5;
  rightY = writeLabelValue(
    doc,
    "Meeting Point",
    safe(tour?.departurePoint),
    108,
    rightY,
    82
  ) + 5;

  const optionsY = Math.max(leftY, rightY) + 6;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, optionsY, 182, 36, 6, 6, "F");
  doc.setFont("Roboto", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("Selected Booking Option", 18, optionsY + 8);
  doc.setFont("Roboto", "normal");
  doc.setTextColor(71, 85, 105);
  writeWrappedText(
    doc,
    [
      input.packageName ? `Package: ${input.packageName}` : null,
      input.addOns && input.addOns.length > 0 ? `Add-ons: ${input.addOns.join(", ")}` : null,
      input.privateTransferRequested
        ? "Private transfer requested. Our team will contact you with pickup details."
        : null,
      input.additionalGuests && input.additionalGuests.length > 0
        ? `Other passengers: ${input.additionalGuests.join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join(" • ") || "Base reservation details are stored in the booking record.",
    18,
    optionsY + 15,
    174,
    5
  );

  const noteY = optionsY + 46;
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(14, noteY, 182, 42, 6, 6, "F");
  doc.setFont("Roboto", "bold");
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(9);
  doc.text("Before You Arrive", 18, noteY + 8);
  doc.setFont("Roboto", "normal");
  doc.setTextColor(120, 53, 15);
  writeWrappedText(
    doc,
    [
      "Please arrive 15 minutes before departure for a smooth boarding flow.",
      "Keep your reservation ID and this voucher ready on your phone.",
      input.privateTransferRequested
        ? "Private transfer was requested separately. Our team will contact you with the final pickup plan."
        : null,
      input.notes ? `Guest note: ${input.notes}` : null,
    ]
      .filter(Boolean)
      .join(" "),
    18,
    noteY + 15,
    174,
    5
  );

  writeFooter(doc, input.reservationId);
  return asBuffer(doc);
}

export async function buildReservationPdfAttachments(input: ReservationPdfInput) {
  const [invoiceBuffer, voucherBuffer] = await Promise.all([
    generateReservationInvoicePdf(input),
    generateReservationVoucherPdf(input),
  ]);

  return [
    {
      filename: `${input.reservationId}-invoice.pdf`,
      content: invoiceBuffer,
      contentType: "application/pdf",
    },
    {
      filename: `${input.reservationId}-voucher.pdf`,
      content: voucherBuffer,
      contentType: "application/pdf",
    },
  ];
}
