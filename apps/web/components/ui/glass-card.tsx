import * as React from "react"
import { cn } from "lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        "backdrop-blur-xl bg-white/60 dark:bg-gray-900/60",
        "rounded-2xl sm:rounded-[32px]",
        "border border-white/40 dark:border-gray-700/50",
        "shadow-2xl shadow-gray-200/50 dark:shadow-black/50",
        "transition-all duration-300 group",
        hoverEffect && "hover:shadow-3xl hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-gray-800/80",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
