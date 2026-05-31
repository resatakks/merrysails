/**
 * Server-safe helper: map a blog slug to a best-fit cruise type for the
 * universal `InArticleBookingCTA`. Kept in a non-client module so it can be
 * called from server components (the blog `[slug]/page.tsx` files) without
 * tripping the "client function called from server" runtime error.
 */
export type InferredCruiseType = "sunset" | "dinner" | "yacht" | "any";

export function inferCruiseTypeFromSlug(slug: string): InferredCruiseType {
  const s = slug.toLowerCase();
  if (s.includes("yacht") || s.includes("charter") || s.includes("private")) return "yacht";
  if (s.includes("dinner") || s.includes("akşam") || s.includes("aksam")) return "dinner";
  if (
    s.includes("sunset") ||
    s.includes("departure-time") ||
    s.includes("best-bosphorus") ||
    s.includes("vs-ferry") ||
    s.includes("with-kids") ||
    s.includes("what-to-wear")
  ) {
    return "sunset";
  }
  return "any";
}
