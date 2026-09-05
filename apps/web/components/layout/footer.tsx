import Link from "next/link"
import { Stethoscope } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30 py-6 sm:py-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-400 font-bold gap-4 sm:gap-0 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>&copy; {new Date().getFullYear()} MedVision. Educational Use Only.</span>
        </div>
        <div className="flex gap-4 sm:gap-6">
          <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
