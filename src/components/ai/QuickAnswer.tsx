import type { SiteLocale } from "@/i18n/config";
import { getQuickAnswer, type QuickAnswerKey } from "@/data/quick-answers";

/**
 * QuickAnswer — AI-citable TL;DR box rendered at the top of commercial pages.
 *
 * Goal: give Perplexity / ChatGPT / Claude / Gemini a 40-60 word
 * self-contained product summary they can quote verbatim. Each box also
 * emits inline JSON-LD with a Question + Answer pair so Google/Yandex
 * recognise the content as a direct answer to a buyer-intent query.
 *
 * Use one of:
 *   <QuickAnswer productKey="bosphorus-sunset-cruise" locale="en" />
 *   <QuickAnswer title="..." content="..." question="..." locale="en" />
 *
 * Visual: light cream card with a gold left accent border, sits between
 * the H1 / hero and the body copy. Does not replace existing hero or
 * metadata — purely additive.
 */
export type QuickAnswerProps =
  | {
      productKey: QuickAnswerKey;
      locale: SiteLocale | string;
      title?: string;
      content?: string;
      question?: string;
    }
  | {
      productKey?: undefined;
      locale: SiteLocale | string;
      title: string;
      content: string;
      question: string;
    };

const LABEL_BY_LOCALE: Record<string, string> = {
  en: "Quick answer",
  tr: "Hızlı yanıt",
  de: "Kurzantwort",
  fr: "Réponse rapide",
  nl: "Snel antwoord",
  ru: "Кратко",
  zh: "快速解答",
};

export function QuickAnswer(props: QuickAnswerProps) {
  const locale = props.locale || "en";
  let title = props.title;
  let content = props.content;
  let question = props.question;

  if (props.productKey) {
    const entry = getQuickAnswer(props.productKey, locale);
    title = title ?? entry.title;
    content = content ?? entry.content;
    question = question ?? entry.question;
  }

  if (!title || !content || !question) return null;

  const label = LABEL_BY_LOCALE[locale] ?? LABEL_BY_LOCALE.en;

  // Standalone Question + Answer JSON-LD — Google/Yandex parse this as a
  // direct answer to a user query, independent of any FAQPage on the page.
  const answerSchema = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: content,
    },
  };

  // WebPageElement + SpeakableSpecification — hints to AI / voice assistants
  // that this block is the primary answer surface on the page. The CSS
  // selector targets the rendered aside below, plus the page H1 so the
  // product name is paired with the facts.
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    isAccessibleForFree: true,
    cssSelector: ".quick-answer",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".quick-answer"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(answerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <aside
        aria-label={label}
        className="quick-answer mb-6 rounded-r-xl border-l-4 border-[#D4A857] bg-[#FFFBF0] px-5 py-4 text-sm leading-relaxed text-gray-800 shadow-sm"
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#B8881F]">
          {label}
        </p>
        <p className="font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-gray-800">{content}</p>
      </aside>
    </>
  );
}

export default QuickAnswer;
