import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "blue" | "amber" | "green";
  className?: string;
}

const variants = {
  default: "border-slate-700 bg-slate-800 text-slate-300",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  green: "border-green-500/30 bg-green-500/10 text-green-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
