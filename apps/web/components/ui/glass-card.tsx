import * as React from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverEffect?: boolean
}

export function GlassCard({ children, className = "", hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div 
      className={`backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-8 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-black/5 transition-all duration-300 ${hoverEffect ? 'hover:-translate-y-4 hover:bg-white/60 dark:hover:bg-gray-900/60 group' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
