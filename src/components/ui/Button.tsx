import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary: "bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
  secondary: "bg-secondary hover:bg-secondary-hover text-primary hover:-translate-y-0.5",
  outline: "border-2 border-border hover:border-primary text-heading hover:bg-bg-white",
  whatsapp: "bg-whatsapp hover:bg-[#20BD5A] text-white shadow-md hover:-translate-y-0.5",
};

const sizes = {
  sm: "py-2 px-4 text-sm rounded-full",
  md: "py-3 px-6 text-sm rounded-full",
  lg: "py-4 px-8 text-base rounded-full",
};

export default function Button({
  children, href, variant = "primary", size = "md", className = "", onClick, type = "button",
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
