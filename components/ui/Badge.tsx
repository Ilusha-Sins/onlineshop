import React from "react";

type BadgeVariant = "neutral" | "dark" | "accent" | "sale" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-neutral-100 text-neutral-600",
  dark: "bg-neutral-950 text-white",
  accent: "bg-neutral-100 text-neutral-700",
  sale: "bg-[#8F2F24] text-white",
  outline: "border border-neutral-200 bg-white text-neutral-700",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "neutral",
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;