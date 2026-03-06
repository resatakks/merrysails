"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

const categories = [
  { label: "All", value: "all" },
  { label: "Cruise Guides", value: "cruise-guide" },
  { label: "Yacht Guides", value: "yacht-guide" },
  { label: "Events", value: "events" },
  { label: "Istanbul", value: "istanbul" },
  { label: "Tips", value: "tips" },
];

export default function BlogPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Istanbul Bosphorus Cruise Blog & Travel Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Expert tips, detailed guides, and insider knowledge for your
            Istanbul boat tour, dinner cruise, yacht charter, and travel
            planning.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === cat.value
                  ? "bg-[var(--brand-primary)] text-white shadow-md"
                  : "bg-white text-[var(--body-text)] hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--brand-primary)] text-white">
                      {post.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
