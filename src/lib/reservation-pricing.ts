import {
  getBookingMode,
  isPricingVisible,
  getTourBySlug,
  type AddOn,
  type Package,
  type PriceMode,
  type Tour,
} from "@/data/tours";

const MAX_GUESTS = 20;

export interface ReservationPricingLineItem {
  type: "package" | "addon";
  label: string;
  quantity: number;
  unitPrice: number;
  unitLabel: string;
  total: number;
}

export interface ReservationPricingSnapshot {
  currency: "EUR";
  guests: number;
  priceMode: PriceMode;
  lineItems: ReservationPricingLineItem[];
  subtotal: number;
  addOnsTotal: number;
  total: number;
}

export interface ReservationSelectionSnapshot extends ReservationPricingSnapshot {
  tour: Tour;
  selectedPackage?: Package;
  selectedAddOns: AddOn[];
  packageName?: string;
}

export class ReservationValidationError extends Error {}

interface ReservationPricingInput {
  tourSlug: string;
  guests: number;
  packageName?: string;
  addOns?: string[];
}

function normalizeGuests(guests: number): number {
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    throw new ReservationValidationError(
      "Guest count must be between 1 and 20."
    );
  }

  return guests;
}

function pickPackage(tour: Tour, packageName?: string): Package | undefined {
  if (!tour.packages || tour.packages.length === 0) {
    return undefined;
  }

  if (!packageName?.trim()) {
    return tour.packages[0];
  }

  const selectedPackage = tour.packages.find(
    (pkg) => pkg.name === packageName.trim()
  );

  if (!selectedPackage) {
    throw new ReservationValidationError(
      "The selected package could not be verified. Please reopen the booking page and try again."
    );
  }

  return selectedPackage;
}

function parseAddOnUnitPrice(addOn: AddOn): number {
  const priceMatch = addOn.price.match(/(\d+(?:[.,]\d+)?)/);

  if (!priceMatch) {
    throw new ReservationValidationError(
      `The add-on price for "${addOn.name}" could not be verified.`
    );
  }

  return Number.parseFloat(priceMatch[1].replace(",", "."));
}

function isPerPersonAddOn(addOn: AddOn): boolean {
  const haystack = `${addOn.name} ${addOn.price}`.toLowerCase();

  return (
    haystack.includes("/person") ||
    haystack.includes("/guest") ||
    haystack.includes("per person")
  );
}

function pickAddOns(availableAddOns: AddOn[], requestedAddOns: string[]): AddOn[] {
  if (requestedAddOns.length === 0) {
    return [];
  }

  const normalizedAvailable = new Map(
    availableAddOns.map((addOn) => [addOn.name, addOn] as const)
  );

  return [...new Set(requestedAddOns.map((requestedName) => requestedName.trim()))]
    .filter(Boolean)
    .map((cleanedName) => {
      const selectedAddOn = normalizedAvailable.get(cleanedName);

      if (!selectedAddOn) {
        throw new ReservationValidationError(
          `The add-on "${cleanedName}" could not be verified for the selected booking.`
        );
      }

      return selectedAddOn;
    });
}

export function buildReservationPricingSnapshot({
  tourSlug,
  guests,
  packageName,
  addOns = [],
}: ReservationPricingInput): ReservationSelectionSnapshot {
  const tour = getTourBySlug(tourSlug);

  if (!tour) {
    throw new ReservationValidationError(
      "The selected experience could not be verified."
    );
  }

  if (getBookingMode(tour) !== "book" || !isPricingVisible(tour)) {
    throw new ReservationValidationError(
      "This page is currently handled as a service enquiry, not a direct reservation."
    );
  }

  const safeGuests = normalizeGuests(guests);
  const selectedPackage = pickPackage(tour, packageName);
  const selectedPackageName = selectedPackage?.name;
  const priceMode = tour.priceMode ?? "perPerson";

  if (priceMode === "custom") {
    throw new ReservationValidationError(
      "This booking needs a tailored quotation before it can be reserved online."
    );
  }

  const availableAddOns = selectedPackage?.addOns ?? tour.addOns ?? [];
  const selectedAddOns = pickAddOns(availableAddOns, addOns);

  const baseLabel = selectedPackage?.name ?? tour.nameEn;
  const baseUnitPrice = selectedPackage?.price ?? tour.priceEur;
  const baseQuantity = priceMode === "perGroup" ? 1 : safeGuests;
  const baseUnitLabel = priceMode === "perGroup" ? "/group" : "/person";
  const subtotal = baseUnitPrice * baseQuantity;

  const lineItems: ReservationPricingLineItem[] = [
    {
      type: "package",
      label: baseLabel,
      quantity: baseQuantity,
      unitPrice: baseUnitPrice,
      unitLabel: baseUnitLabel,
      total: subtotal,
    },
  ];

  for (const addOn of selectedAddOns) {
    const unitPrice = parseAddOnUnitPrice(addOn);
    const quantity = isPerPersonAddOn(addOn) ? safeGuests : 1;
    lineItems.push({
      type: "addon",
      label: addOn.name,
      quantity,
      unitPrice,
      unitLabel: quantity === safeGuests ? "/person" : "/group",
      total: unitPrice * quantity,
    });
  }

  const addOnsTotal = lineItems
    .slice(1)
    .reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + addOnsTotal;

  return {
    tour,
    selectedPackage,
    selectedAddOns,
    packageName: selectedPackageName,
    currency: "EUR",
    guests: safeGuests,
    priceMode,
    lineItems,
    subtotal,
    addOnsTotal,
    total,
  };
}
