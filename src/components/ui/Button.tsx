import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const variants = {
  primary:
    "bg-neutral-900 text-[#f3eee3] hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
  secondary:
    "border border-neutral-900/25 bg-transparent hover:bg-neutral-900/5 dark:border-neutral-100/25 dark:hover:bg-neutral-100/5",
  ghost: "hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-100",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
