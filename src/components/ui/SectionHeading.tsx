interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <div className="h-1 w-16 bg-[var(--color-gold)] rounded-full mx-auto mb-4" />
      <h2
        className={`font-heading font-bold ${
          light ? "text-white" : "text-heading"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-lg mx-auto ${
            light ? "text-white/60" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
