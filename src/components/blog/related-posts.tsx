import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { getBlogBySlug, blogPosts } from "@/content/blog";

export function RelatedPosts({
  slugs,
  prioritySlugs,
  currentSlug,
  category,
}: {
  slugs?: string[];
  prioritySlugs?: string[];
  currentSlug: string;
  category: string;
}) {
  const deduped = new Set<string>();
  const toPosts = (items?: string[]) =>
    items
      ?.map(getBlogBySlug)
      .filter((post): post is NonNullable<ReturnType<typeof getBlogBySlug>> => Boolean(post))
      .filter((post) => post.slug !== currentSlug && !deduped.has(post.slug))
      .filter((post) => {
        deduped.add(post.slug);
        return true;
      }) || [];

  let posts = [...toPosts(prioritySlugs), ...toPosts(slugs)];

  // Fallback: same category posts
  if (posts.length < 3) {
    const fallbacks = blogPosts
      .filter(
        (p) =>
          p.category === category &&
          p.slug !== currentSlug &&
          !deduped.has(p.slug) &&
          !slugs?.includes(p.slug) &&
          !prioritySlugs?.includes(p.slug)
      )
      .slice(0, 3 - posts.length);
    posts = [...posts, ...fallbacks];
  }

  if (!posts.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.slice(0, 3).map((post) =>
          post ? (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 left-2">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-[var(--brand-primary)] text-white">
                    {post.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
