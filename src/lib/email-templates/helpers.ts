export function escapeHtml(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function currencySymbol(currency: string): string {
  switch (currency) {
    case "EUR":
      return "\u20AC";
    case "USD":
      return "$";
    case "TRY":
      return "\u20BA";
    case "GBP":
      return "\u00A3";
    default:
      return currency;
  }
}
