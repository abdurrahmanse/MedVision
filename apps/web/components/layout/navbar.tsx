import Link from "next/link"
import { Stethoscope, Upload, History, Info, Menu } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-slate-800 to-blue-600 text-white rounded-lg sm:rounded-xl shadow-lg shadow-blue-900/30">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">MedVision</span>
          </Link>
          <nav className="flex space-x-2 sm:space-x-4 lg:space-x-6 items-center">
            <Link href="/predict" className="flex items-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm sm:text-base transition-colors group">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" /> <span className="hidden sm:inline">Predict</span>
            </Link>
            <Link href="/history" className="flex items-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm sm:text-base transition-colors group">
              <History className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" /> <span className="hidden sm:inline">History</span>
            </Link>
            <Link href="/about" className="flex items-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm sm:text-base transition-colors group">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" /> <span className="hidden sm:inline">About</span>
            </Link>
            <div className="w-px h-6 sm:h-8 bg-gray-300/50 dark:bg-gray-600/50 mx-1 sm:mx-2"></div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
