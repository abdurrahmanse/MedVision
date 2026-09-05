import * as React from "react"
import Link from "next/link"

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: "blue" | "purple" | "emerald" | "gray"
  fullWidth?: boolean
  children: React.ReactNode
}

export function NeoButton({ children, href, variant = "blue", fullWidth = false, className = "", ...props }: NeoButtonProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    gray: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
  }
  
  const baseClasses = `inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] px-6 py-4 rounded-xl font-black text-lg transition-all ${colorClasses[variant]} ${fullWidth ? 'w-full' : ''} ${variant !== 'gray' ? 'text-white' : ''} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:disabled:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${className}`

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  )
}
