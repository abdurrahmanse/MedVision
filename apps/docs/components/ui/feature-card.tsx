import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  label: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  label,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center backdrop-blur-sm transition hover:border-slate-700",
        className,
      )}
    >
      <div className="mb-3 text-3xl" role="img" aria-label={label}>
        {icon}
      </div>
      <div className="mb-1 text-sm font-semibold text-white">{label}</div>
      <div className="text-xs leading-relaxed text-slate-500">{description}</div>
    </div>
  );
}
