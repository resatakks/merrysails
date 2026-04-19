import { cn } from "@/lib/utils";

type SalePriceSize = "sm" | "md" | "lg" | "xl";
type SalePriceTone = "default" | "overlay";

interface SalePriceProps {
  price: number;
  originalPrice?: number;
  suffix?: string;
  label?: string;
  align?: "left" | "right";
  size?: SalePriceSize;
  tone?: SalePriceTone;
  showBadge?: boolean;
  showMeta?: boolean;
  badgeText?: string;
  metaText?: string;
  className?: string;
  priceClassName?: string;
}

const sizeClasses: Record<
  SalePriceSize,
  {
    badge: string;
    label: string;
    original: string;
    price: string;
    suffix: string;
    meta: string;
  }
> = {
  sm: {
    badge: "px-2 py-1 text-[10px]",
    label: "text-[10px]",
    original: "text-xs",
    price: "text-lg",
    suffix: "text-[11px]",
    meta: "text-[10px]",
  },
  md: {
    badge: "px-2.5 py-1 text-[10px]",
    label: "text-[11px]",
    original: "text-sm",
    price: "text-2xl",
    suffix: "text-xs",
    meta: "text-xs",
  },
  lg: {
    badge: "px-2.5 py-1 text-[11px]",
    label: "text-xs",
    original: "text-base",
    price: "text-4xl",
    suffix: "text-sm",
    meta: "text-xs",
  },
  xl: {
    badge: "px-3 py-1.5 text-xs",
    label: "text-xs",
    original: "text-lg",
    price: "text-5xl",
    suffix: "text-sm",
    meta: "text-sm",
  },
};

const toneClasses: Record<
  SalePriceTone,
  {
    badge: string;
    label: string;
    original: string;
    price: string;
    suffix: string;
    meta: string;
  }
> = {
  default: {
    badge:
      "border border-[var(--brand-primary)]/15 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]",
    label: "text-[var(--text-muted)]",
    original: "text-[var(--text-muted)]/75",
    price: "text-[var(--heading)]",
    suffix: "text-[var(--text-muted)]",
    meta: "text-[var(--text-muted)]",
  },
  overlay: {
    badge: "border border-white/15 bg-white/12 text-white",
    label: "text-white/75",
    original: "text-white/50",
    price: "text-[var(--brand-gold)]",
    suffix: "text-white/70",
    meta: "text-white/75",
  },
};

export default function SalePrice({
  price,
  originalPrice,
  suffix,
  label,
  align = "left",
  size = "md",
  tone = "default",
  showBadge = false,
  showMeta = false,
  badgeText,
  metaText,
  className,
  priceClassName,
}: SalePriceProps) {
  const styles = sizeClasses[size];
  const toneStyle = toneClasses[tone];
  const hasDiscount =
    typeof originalPrice === "number" && originalPrice > price;
  const safeOriginalPrice = hasDiscount ? originalPrice : undefined;
  const savingsAmount = safeOriginalPrice ? safeOriginalPrice - price : 0;
  const savingsPercent = safeOriginalPrice
    ? Math.round((savingsAmount / safeOriginalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "right" ? "items-end text-right" : "items-start",
        className
      )}
    >
      {showBadge && hasDiscount && (
        <span
          className={cn(
            "inline-flex items-center rounded-full font-bold uppercase tracking-[0.18em]",
            styles.badge,
            toneStyle.badge
          )}
        >
          {badgeText ?? `Save €${savingsAmount}`}
        </span>
      )}

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {label && (
          <span
            className={cn(
              "font-semibold uppercase tracking-[0.2em]",
              styles.label,
              toneStyle.label
            )}
          >
            {label}
          </span>
        )}
        {safeOriginalPrice && (
          <span
            className={cn("line-through", styles.original, toneStyle.original)}
          >
            €{safeOriginalPrice}
          </span>
        )}
        <span
          className={cn(
            "font-bold leading-none",
            styles.price,
            toneStyle.price,
            priceClassName
          )}
        >
          €{price}
        </span>
        {suffix && (
          <span className={cn("font-medium", styles.suffix, toneStyle.suffix)}>
            {suffix}
          </span>
        )}
      </div>

      {showMeta && hasDiscount && (
        <span className={cn("font-medium", styles.meta, toneStyle.meta)}>
          {metaText ?? `${savingsPercent}% off the standard direct fare`}
        </span>
      )}
    </div>
  );
}
