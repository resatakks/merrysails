import Link from "next/link";
import { getAuthor } from "@/data/team";
import { Shield } from "lucide-react";

export function AuthorCard({ authorId, variant = "compact" }: { authorId?: string; variant?: "compact" | "full" }) {
  const author = getAuthor(authorId || "editorial");
  if (!author) return null;

  const initials = author.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  // Authors with a dedicated profile page get a real <a href> byline so
  // Google + AI retrievers can resolve the Person entity. Editorial team
  // (group byline) stays as plain text — no page exists for them.
  const authorHref =
    author.id === "captain-ahmet" ? "/authors/captain-ahmet" : null;

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
          <span className="text-[var(--brand-primary)] font-bold text-sm">{initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--heading)]">
            {authorHref ? (
              <Link
                href={authorHref}
                className="hover:text-[var(--brand-primary)] hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          <p className="text-xs text-[var(--text-muted)]">{author.credential}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-[var(--line)] pt-6 flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
        <span className="text-[var(--brand-primary)] font-bold text-lg">{initials}</span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--heading)]">
            {authorHref ? (
              <Link
                href={authorHref}
                className="hover:text-[var(--brand-primary)] hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </span>
          <Shield className="w-4 h-4 text-[var(--brand-primary)]" />
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{author.role}</p>
        <p className="text-sm text-[var(--body-text)] mt-2 leading-relaxed">{author.bio}</p>
        <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
          Learn more <Link href="/about" className="text-[var(--brand-primary)] hover:underline">about MerrySails</Link> &amp; our <Link href="/about/team" className="text-[var(--brand-primary)] hover:underline">licensed crew</Link>, or{" "}
          <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">contact us</Link> to plan your Bosphorus trip.
        </p>
      </div>
    </div>
  );
}
