import * as React from "react"

interface NeoBadgeProps {
  children: React.ReactNode
  variant: "success" | "warning"
}

export function NeoBadge({ children, variant }: NeoBadgeProps) {
  const colorClasses = variant === 'success' 
    ? 'bg-green-400 text-black' 
    : 'bg-orange-400 text-black'
    
  return (
    <span className={`px-5 py-2 inline-flex text-sm font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${colorClasses}`}>
      {children}
    </span>
  )
}
