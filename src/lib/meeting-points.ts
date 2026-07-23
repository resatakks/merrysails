/**
 * Known meeting-point labels → their real Google Business Profile Maps link.
 * Lets voucher/invoice PDFs and confirmation emails turn a plain pickup
 * label into a tap-to-navigate link, without asking the customer to search
 * or retype anything. Unmatched text (a one-off hotel name, etc.) just
 * renders as plain text as before.
 */
const KNOWN_MEETING_POINT_LINKS: Array<{ match: string; url: string }> = [
  { match: "Karaköy Pier", url: "https://maps.app.goo.gl/buFSuTv5EfKkA2Ws5" },
];

export function getMeetingPointMapUrl(text?: string | null): string | undefined {
  const trimmed = text?.trim();
  if (!trimmed) return undefined;
  const hit = KNOWN_MEETING_POINT_LINKS.find((entry) => trimmed.startsWith(entry.match));
  return hit?.url;
}
