import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "components/ui/glass-card";
import { NeoButton } from "components/ui/neo-button";
import { SectionTitle } from "components/ui/section-title";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonHref: string;
  buttonText: string;
  buttonVariant: "blue" | "purple" | "emerald";
  glowColor: "blue" | "purple" | "emerald";
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  buttonHref,
  buttonText,
  buttonVariant,
  glowColor,
  className = ""
}: FeatureCardProps) {
  const glowClasses = {
    blue: "bg-blue-400/20 group-hover:bg-blue-400/40",
    purple: "bg-purple-400/20 group-hover:bg-purple-400/40",
    emerald: "bg-emerald-400/20 group-hover:bg-emerald-400/40"
  };

  return (
    <GlassCard hoverEffect className={`p-6 sm:p-8 h-full flex flex-col ${className}`}>
      <div className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full blur-xl sm:blur-2xl transition-colors ${glowClasses[glowColor]}`}></div>
      
      <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
        {icon}
      </div>
      
      <SectionTitle title={title} />
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-semibold text-sm sm:text-base leading-relaxed flex-grow">
        {description}
      </p>
      
      <NeoButton href={buttonHref} variant={buttonVariant} fullWidth className="mt-auto">
        {buttonText} <ArrowRight className="w-5 h-5" />
      </NeoButton>
    </GlassCard>
  );
}
