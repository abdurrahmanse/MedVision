import { ReactNode } from "react";

interface SectionTitleProps {
  icon?: ReactNode;
  title: string;
  className?: string;
  gradient?: boolean;
}

export function SectionTitle({ icon, title, className = "", gradient = true }: SectionTitleProps) {
  const textClass = gradient 
    ? "text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100"
    : "";

  return (
    <h2 className={`text-xl sm:text-2xl font-black mb-2 sm:mb-3 tracking-tight flex items-center gap-2 sm:gap-3 ${className}`}>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span className={textClass}>{title}</span>
    </h2>
  );
}
