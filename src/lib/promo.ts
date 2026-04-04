/**
 * Monthly Auto-Promo System
 * Automatically changes promo name and emoji based on the current month.
 * Always applies a 10% discount on ALL tours.
 */

interface MonthConfig {
  name: string;
  code: string;
  emoji: string;
}

const MONTH_PROMOS: MonthConfig[] = [
  { name: "New Year Special",    code: "NEWYEAR10",   emoji: "🎆" },   // January
  { name: "Valentine's Special", code: "VALENTINE10", emoji: "💕" },   // February
  { name: "Spring Awakening",    code: "SPRING10",    emoji: "🌱" },   // March
  { name: "Spring Special",      code: "SPRING10",    emoji: "🌸" },   // April
  { name: "May Day Special",     code: "MAYDAY10",    emoji: "🌷" },   // May
  { name: "Summer Kickoff",      code: "SUMMER10",    emoji: "🌞" },   // June
  { name: "Summer Special",      code: "SUMMER10",    emoji: "☀️" },   // July
  { name: "Hot Summer Deal",     code: "SUMMER10",    emoji: "🔥" },   // August
  { name: "Autumn Special",      code: "AUTUMN10",    emoji: "🍂" },   // September
  { name: "Fall Special",        code: "FALL10",      emoji: "🍁" },   // October
  { name: "Black Friday Deal",   code: "BLACKFRI10",  emoji: "🏷️" },  // November
  { name: "Holiday Special",     code: "HOLIDAY10",   emoji: "🎄" },   // December
];

const DISCOUNT_PERCENT = 10;

function getCurrentMonthConfig(): MonthConfig {
  const month = new Date().getMonth(); // 0-11
  return MONTH_PROMOS[month];
}

/** Returns the current month's promo name, e.g. "Spring Special" */
export function getPromoName(): string {
  return getCurrentMonthConfig().name;
}

/** Returns the current month's promo code, e.g. "SPRING10" */
export function getPromoCode(): string {
  return getCurrentMonthConfig().code;
}

/** Returns the discount percentage (always 10) */
export function getDiscountPercent(): number {
  return DISCOUNT_PERCENT;
}

/** Returns the price after 10% discount, rounded to nearest euro */
export function getDiscountedPrice(originalPrice: number): number {
  return Math.round(originalPrice * (1 - DISCOUNT_PERCENT / 100));
}

/** Returns true — promo is always active */
export function isPromoActive(): boolean {
  return true;
}

/** Returns a seasonal emoji for the current month */
export function getPromoEmoji(): string {
  return getCurrentMonthConfig().emoji;
}
