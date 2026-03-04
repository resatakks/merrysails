import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold",
          light ? "text-white" : "text-deep-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/70" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn("mt-4 h-1 w-16 rounded-full bg-gold", centered && "mx-auto")} />
    </div>
  );
}
