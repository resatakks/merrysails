import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "cta" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<string, string> = {
  cta: "btn-cta",
  primary: "btn-primary",
  outline:
    "border-2 border-[var(--color-border)] hover:border-[var(--color-gold)] text-heading rounded-xl",
  whatsapp: "btn-whatsapp",
};

const sizeClasses: Record<string, string> = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-sm",
  lg: "py-4 px-8 text-base",
};

export default function Button({
  children,
  href,
  variant = "cta",
  size = "md",
  className = "",
  onClick,
  type,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
