import {
  getBookingMode,
  isPricingVisible,
  getTourBySlug,
  type AddOn,
  type Package,
  type PriceMode,
  type Tour,
} from "@/data/tours";
import {
  applyGroupDiscount,
  type GroupDiscountResult,
} from "@/lib/group-discount";
import { applyWeeklyDiscount, type WeeklyDiscountResult } from "@/lib/weekly-discount";

const MAX_GUESTS = 20;

/**
 * Child / infant pricing rules (per ops 2026-06-21 — child band widened
 * from 3-8 to 3-13):
 *   • 0-3 yaş (infant): completely free (€0)
 *   • 3-13 yaş (child): 50% off the per-person package price (after any
 *                        weekly weekday discount has already been applied)
 *   • 13+  (adult):     full price
 *
 * Alcoholic packages (TR "Şaraplı"/EN "Alcoholic"/"With Wine"/"Wine"/
 * "Premium Spirits") are restricted to adults — children and infants
 * cannot be booked into them. The UI must surface this; the pricing
 * layer enforces it as a validation error so server-side never accepts
 * an illegal payload.
 */
export const CHILD_DISCOUNT_RATE = 0.5;

function isAlcoholicPackage(pkg: Package | undefined): boolean {
  if (!pkg) return false;
  const haystack = `${pkg.name} ${pkg.description ?? ""}`.toLowerCase();
  return (
    haystack.includes("alcoholic") ||
    haystack.includes("alcohol") ||
    haystack.includes("with wine") ||
    haystack.includes("şaraplı") ||
    haystack.includes("saraplı") ||
    haystack.includes("şarapli") ||
    haystack.includes("mit wein") ||
    haystack.includes("avec vin") ||
    haystack.includes("met wijn") ||
    haystack.includes("unlimited alcohol") ||
    haystack.includes("premium spirits")
  );
}

export interface ReservationPricingLineItem {
  type: "package" | "addon";
  label: string;
  quantity: number;
  unitPrice: number;
  unitLabel: string;
  total: number;
}

export interface ReservationGuestBreakdown {
  /** 13+ — paying full price */
  adults: number;
  /** 3-13 — paying 50% of the (post-weekday-discount) per-person price */
  children: number;
  /** 0-3 — free */
  infants: number;
}

export interface ReservationPricingSnapshot {
  currency: "EUR";
  /** Total head count = adults + children + infants. Kept for backwards compat. */
  guests: number;
  /** Per-bucket breakdown — always present, infants/children default to 0. */
  guestBreakdown: ReservationGuestBreakdown;
  /** Total savings from the child 50% discount (€). 0 when no children booked. */
  childDiscountSavings: number;
  priceMode: PriceMode;
  lineItems: ReservationPricingLineItem[];
  subtotal: number;
  addOnsTotal: number;
  /** Total before any group discount is applied (subtotal + addOnsTotal). */
  originalTotal: number;
  /**
   * Final total the customer pays. Equals originalTotal when no group
   * discount is applied; otherwise the discounted + nice-rounded amount.
   */
  total: number;
  /** Group discount result. Always present; check `eligible` flag. */
  groupDiscount: GroupDiscountResult;
  /** Weekly (day-of-week) discount result. Always present; check `eligible` flag. */
  weeklyDiscount: WeeklyDiscountResult;
}

export interface ReservationSelectionSnapshot extends ReservationPricingSnapshot {
  tour: Tour;
  selectedPackage?: Package;
  selectedAddOns: AddOn[];
  packageName?: string;
}

export class ReservationValidationError extends Error {}

export interface ReservationItemInput {
  packageName: string;
  guests: number;
}

interface ReservationPricingInput {
  tourSlug: string;
  guests: number;
  /** 3-13 yaş — 50% indirim. Defaults to 0. */
  children?: number;
  /** 0-3 yaş — ücretsiz. Defaults to 0. */
  infants?: number;
  packageName?: string;
  addOns?: string[];
  /** ISO date string (yyyy-MM-dd) or Date object for weekday-discount resolution. */
  date?: string | Date | null;
  /**
   * Optional mixed-package breakdown. When present and has ≥2 entries the
   * snapshot produces one "package" line item per entry instead of a single
   * primary package line. Add-ons apply to the booking as a whole.
   * The sum of items[].guests MUST equal `guests`. Per-group tours can't be
   * split; the mixed branch silently degrades to legacy single-package for
   * them.
   *
   * NOTE: child/infant breakdown is NOT supported in mixed-package mode —
   * the legacy single-package path is the only one that applies the
   * 50%/free pricing tiers. Mixed bookings treat every guest as adult.
   */
  items?: ReservationItemInput[];
}

function normalizeGuests(guests: number): number {
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    throw new ReservationValidationError(
      "Guest count must be between 1 and 20."
    );
  }

  return guests;
}

function normalizeChildren(children: number | undefined, totalGuests: number): number {
  if (children == null) return 0;
  if (!Number.isInteger(children) || children < 0 || children > totalGuests) {
    throw new ReservationValidationError(
      "Children count (3-13 yaş) must be an integer between 0 and the total guest count."
    );
  }
  return children;
}

function normalizeInfants(
  infants: number | undefined,
  totalGuests: number,
  children: number,
): number {
  if (infants == null) return 0;
  if (
    !Number.isInteger(infants) ||
    infants < 0 ||
    infants > totalGuests - children
  ) {
    throw new ReservationValidationError(
      "Infants count (0-3 yaş) plus children cannot exceed total guests.",
    );
  }
  return infants;
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

  // Match "/person", "/ person", "per person", "/guest", "per guest". The brand
  // writes "EUR 50 / person" (spaces around the slash), so the old bare
  // `.includes("/person")` silently failed and per-person add-ons (the meal)
  // were billed flat instead of × guests (2026-06-26 fix).
  return /(?:\/\s*|per\s+)(?:person|guest)/.test(haystack);
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
  children: childrenInput,
  infants: infantsInput,
  packageName,
  addOns = [],
  date,
  items,
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

  // Child / infant breakdown. Only meaningful in per-person mode + single-
  // package bookings. For mixed bookings or per-group tours we force them
  // back to 0 silently so legacy callers continue to work unchanged.
  const useMixedBookingShape =
    Array.isArray(items) && items.length >= 2 && priceMode !== "perGroup";
  const childrenAllowed = priceMode === "perPerson" && !useMixedBookingShape;
  const rawChildren = childrenAllowed ? normalizeChildren(childrenInput, safeGuests) : 0;
  const rawInfants = childrenAllowed
    ? normalizeInfants(infantsInput, safeGuests, rawChildren)
    : 0;
  // Alcoholic packages: children + infants must be 0. Enforce server-side.
  if ((rawChildren > 0 || rawInfants > 0) && isAlcoholicPackage(selectedPackage)) {
    throw new ReservationValidationError(
      "Alkollü paketlere çocuk veya bebek eklenemez. Çocuk ve bebekler için lütfen alkolsüz bir paket seçin.",
    );
  }
  const childrenCount = rawChildren;
  const infantsCount = rawInfants;
  const adultsCount = Math.max(0, safeGuests - childrenCount - infantsCount);
  if (childrenAllowed && adultsCount < 1) {
    throw new ReservationValidationError(
      "Rezervasyonda en az 1 yetişkin (13+ yaş) olmalı.",
    );
  }

  if (priceMode === "custom") {
    throw new ReservationValidationError(
      "This booking needs a tailored quotation before it can be reserved online."
    );
  }

  // Mixed-package booking: only valid for per-person pricing with ≥2 distinct
  // entries whose guest counts sum to `guests`. Per-group tours fall back to
  // the legacy single-package path silently.
  // (child/infant breakdown is not supported in mixed mode — handled above.)
  const useMixed = useMixedBookingShape;
  if (useMixed) {
    const totalItemGuests = items!.reduce(
      (sum, it) => sum + (Number.isFinite(it.guests) ? Math.trunc(it.guests) : 0),
      0
    );
    if (totalItemGuests !== safeGuests) {
      throw new ReservationValidationError(
        "The package guest counts do not add up to the total guests."
      );
    }
    for (const it of items!) {
      if (!Number.isInteger(it.guests) || it.guests < 1) {
        throw new ReservationValidationError(
          "Each selected package must include at least 1 guest."
        );
      }
    }
  }

  const availableAddOns = selectedPackage?.addOns ?? tour.addOns ?? [];
  const selectedAddOns = pickAddOns(availableAddOns, addOns);

  const baseLabel = selectedPackage?.name ?? tour.nameEn;
  const weeklyDiscount = applyWeeklyDiscount(selectedPackage, date ?? null);
  const baseUnitPrice = weeklyDiscount.eligible
    ? weeklyDiscount.effectivePrice
    : (selectedPackage?.price ?? tour.priceEur);
  const baseQuantity = priceMode === "perGroup" ? 1 : safeGuests;
  const baseUnitLabel = priceMode === "perGroup" ? "/group" : "/person";

  let lineItems: ReservationPricingLineItem[];
  let subtotal: number;

  if (useMixed) {
    const packageLines: ReservationPricingLineItem[] = items!.map((entry) => {
      const pkg = pickPackage(tour, entry.packageName);
      if (!pkg) {
        throw new ReservationValidationError(
          `The selected package "${entry.packageName}" could not be verified.`
        );
      }
      const itemWeekly = applyWeeklyDiscount(pkg, date ?? null);
      const unit = itemWeekly.eligible ? itemWeekly.effectivePrice : pkg.price;
      const qty = entry.guests;
      return {
        type: "package",
        label: pkg.name,
        quantity: qty,
        unitPrice: unit,
        unitLabel: "/person",
        total: unit * qty,
      };
    });
    subtotal = packageLines.reduce((sum, l) => sum + l.total, 0);
    lineItems = packageLines;
  } else if (priceMode === "perPerson" && (childrenCount > 0 || infantsCount > 0)) {
    // Per-person path with a child/infant breakdown. One line per tier so
    // the voucher + confirmation email surface the 50%/free pricing clearly.
    const adultTotal = baseUnitPrice * adultsCount;
    const childUnit = Math.round(baseUnitPrice * CHILD_DISCOUNT_RATE * 100) / 100;
    const childTotal = childUnit * childrenCount;
    subtotal = adultTotal + childTotal;
    lineItems = [];
    if (adultsCount > 0) {
      lineItems.push({
        type: "package",
        // 2026-06-03 — Was Turkish ("Yetişkin (13+)") which leaked into the
        // English invoice/voucher PDF. Standardise on English everywhere
        // since the entire customer-facing email/PDF flow is English-only.
        // Age ranges intentionally omitted from labels (they live in the
        // Guests row already) so the invoice description column doesn't
        // wrap once the booking has ≥2 age tiers.
        label: `${baseLabel} — Adult`,
        quantity: adultsCount,
        unitPrice: baseUnitPrice,
        unitLabel: "/person",
        total: adultTotal,
      });
    }
    if (childrenCount > 0) {
      lineItems.push({
        type: "package",
        label: `${baseLabel} — Child (50% off)`,
        quantity: childrenCount,
        unitPrice: childUnit,
        unitLabel: "/person",
        total: childTotal,
      });
    }
    if (infantsCount > 0) {
      // Zero-priced line so the voucher acknowledges the infant guest count
      // without a charge. Kept as type "package" so existing renderers don't
      // need a new branch.
      lineItems.push({
        type: "package",
        label: `${baseLabel} — Infant (free)`,
        quantity: infantsCount,
        unitPrice: 0,
        unitLabel: "/person",
        total: 0,
      });
    }
  } else {
    subtotal = baseUnitPrice * baseQuantity;
    lineItems = [
      {
        type: "package",
        label: baseLabel,
        quantity: baseQuantity,
        unitPrice: baseUnitPrice,
        unitLabel: baseUnitLabel,
        total: subtotal,
      },
    ];
  }

  // Add-ons: per-person add-ons are billed against paying guests only —
  // infants (free) and children (half-priced) generally consume zero
  // add-on inventory, so the conservative rule is to charge add-ons at
  // the adult head count when a child/infant breakdown is present.
  // Bookings without a breakdown fall back to the legacy `safeGuests`
  // multiplier for full backwards compatibility.
  const addOnPayingGuests =
    childrenCount > 0 || infantsCount > 0 ? adultsCount : safeGuests;
  for (const addOn of selectedAddOns) {
    // Request-only extras (DJ, photographer, decoration…) carry no fixed price —
    // they ride along in the booking note as a quote request, never as a priced
    // line item. Skip them so parseAddOnUnitPrice never sees a price-less string.
    if (addOn.requestOnly) continue;
    const unitPrice = parseAddOnUnitPrice(addOn);
    const quantity = isPerPersonAddOn(addOn) ? addOnPayingGuests : 1;
    lineItems.push({
      type: "addon",
      label: addOn.name,
      quantity,
      unitPrice,
      unitLabel: quantity === addOnPayingGuests && quantity > 1 ? "/person" : "/group",
      total: unitPrice * quantity,
    });
  }

  const addOnsTotal = lineItems
    .filter((item) => item.type === "addon")
    .reduce((sum, item) => sum + item.total, 0);
  const originalTotal = subtotal + addOnsTotal;

  const groupDiscount = applyGroupDiscount(
    originalTotal,
    tour.slug,
    safeGuests,
  );
  const total = groupDiscount.eligible
    ? groupDiscount.discountedTotal
    : originalTotal;

  // Child discount savings (€): the amount the customer would have paid
  // if all children had been booked as adults instead of at 50% off.
  // Always 0 when there are no children. Surfaced on voucher + email.
  const childDiscountSavings =
    childrenCount > 0 ? childrenCount * baseUnitPrice * (1 - CHILD_DISCOUNT_RATE) : 0;

  return {
    tour,
    selectedPackage,
    selectedAddOns,
    packageName: selectedPackageName,
    currency: "EUR",
    guests: safeGuests,
    guestBreakdown: {
      adults: adultsCount,
      children: childrenCount,
      infants: infantsCount,
    },
    childDiscountSavings,
    priceMode,
    lineItems,
    subtotal,
    addOnsTotal,
    originalTotal,
    total,
    groupDiscount,
    weeklyDiscount,
  };
}
