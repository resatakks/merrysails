export interface BlogSubsection {
  heading: string;
  content: string;
  list?: string[];
}

export interface BlogSection {
  heading: string;
  content: string;
  answerCapsule?: string;
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  callout?: { type: "tip" | "info" | "warning" | "price"; text: string };
  proTip?: string;
  expertQuote?: { text: string; author: string; title: string };
  subsections?: BlogSubsection[];
}

export interface BlogPost {
  slug: string;
  locale?: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: "cruise-guide" | "yacht-guide" | "events" | "istanbul" | "tips";
  date: string;
  dateModified?: string;
  readTime: string;
  image: string;
  imageAlt?: string;
  keywords: string[];
  author?: string;
  keyTakeaways?: string[];
  sections: BlogSection[];
  faqs?: { q: string; a: string }[];
  relatedTours?: string[];
  relatedPosts?: string[];
  proTip?: string;
  dataTable?: string;
  calloutText?: string;
  /**
   * Mark a post as noindex to free crawl budget for higher-priority pages.
   * Set true on tangential / off-brand posts that earn impressions but no
   * commercial intent.  Page still renders normally; only the meta robots
   * tag and sitemap behaviour change.
   */
  noIndex?: boolean;
}
