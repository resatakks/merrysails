import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getBlogBySlug } from "@/content/blog";

type RoutingLink = {
  href: string;
  label: string;
};

export function BlogRoutingPanel({
  eyebrow,
  title,
  description,
  links,
  articleSlugs,
  currentSlug,
}: {
  eyebrow: string;
  title: string;
  description: string;
  links: RoutingLink[];
  articleSlugs: string[];
  currentSlug: string;
}) {
  const articles = articleSlugs
    .map(getBlogBySlug)
    .filter((post): post is NonNullable<ReturnType<typeof getBlogBySlug>> => Boolean(post))
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (!links.length && !articles.length) return null;

  return (
    <section className="max-w-4xl mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{title}</h2>
      <p className="text-[var(--body-text)] mb-6">{description}</p>

      {links.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:bg-white"
            >
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="block text-base font-semibold text-[var(--heading)] mb-1">
                {item.label}
              </span>
              <span className="block text-sm text-[var(--text-muted)]">
                Open the matching service page.
              </span>
            </Link>
          ))}
        </div>
      )}

      {articles.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-[var(--brand-primary)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--heading)]">
              Read next
            </h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {articles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-[var(--line)] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  {post.category.replace("-", " ")}
                </p>
                <h4 className="text-sm font-semibold leading-snug text-[var(--heading)]">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
