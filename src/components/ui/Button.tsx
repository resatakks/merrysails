import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "cta" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({ children, href, variant = "cta", size = "md", className = "", onClick, type = "button" }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all";
  const v: Record<string, string> = {
    cta: "btn-cta",
    primary: "btn-primary",
    outline: "border-2 border-border hover:border-primary text-heading rounded-xl",
    whatsapp: "btn-whatsapp",
  };
  const s: Record<string, string> = { sm: "py-2 px-4 text-sm", md: "py-3 px-6 text-sm", lg: "py-4 px-8 text-base" };
  const cls = `${base} ${v[variant]} ${s[size]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
