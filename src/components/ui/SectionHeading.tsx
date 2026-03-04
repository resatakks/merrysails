interface Props { title: string; subtitle?: string; }
export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-heading font-bold">{title}</h2>
      {subtitle && <p className="text-muted mt-3 max-w-lg mx-auto">{subtitle}</p>}
    </div>
  );
}
