interface SectionHeadingProps { label?: string; title: string; subtitle?: string; light?: boolean; center?: boolean; }

export default function SectionHeading({ label, title, subtitle, light, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {label && <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">{label}</p>}
      <h2 className={`font-heading text-3xl md:text-4xl font-bold ${light ? "text-white" : "text-heading"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 max-w-lg ${center ? "mx-auto" : ""} ${light ? "text-white/50" : "text-muted"}`}>{subtitle}</p>}
    </div>
  );
}
