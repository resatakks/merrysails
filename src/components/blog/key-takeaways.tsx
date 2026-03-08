import { Lightbulb } from "lucide-react";

export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="my-8 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 p-6 md:p-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--heading)] mb-4">
        <Lightbulb className="w-5 h-5 text-[var(--brand-primary)]" />
        Key Takeaways
      </h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[var(--body-text)]">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
