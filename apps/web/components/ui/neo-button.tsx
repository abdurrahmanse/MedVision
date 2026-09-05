import * as React from "react"
import Link from "next/link"
import { cn } from "lib/utils"

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: "blue" | "purple" | "emerald" | "gray"
  fullWidth?: boolean
  children: React.ReactNode
}

export function NeoButton({ children, href, variant = "blue", fullWidth = false, className, ...props }: NeoButtonProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    gray: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
  }
  
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "border-2 border-black dark:border-white",
    "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
    "hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px]",
    "px-5 py-2.5 rounded-lg font-extrabold text-base transition-all",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0",
    "disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:disabled:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
    colorClasses[variant],
    fullWidth && "w-full",
    variant !== "gray" && "text-white",
    className
  )

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
