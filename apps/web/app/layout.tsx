import { Rajdhani } from "next/font/google";
import "styles/tailwind.css";
import Link from "next/link";
import { QueryProvider } from "components/providers/query-provider";
import { ThemeProvider } from "components/providers/theme-provider";
import { ThemeToggle } from "components/theme-toggle";
import { Stethoscope, Upload, History, Info, AlertOctagon } from "lucide-react";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

export const metadata = {
  title: "MedVision",
  description: "Educational Pneumonia Detection API — NOT for clinical use.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    <Stethoscope className="w-8 h-8" />
                    <span>MedVision</span>
                  </Link>
                  <nav className="flex space-x-6 items-center">
                    <Link href="/predict" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                      <Upload className="w-5 h-5" /> Predict
                    </Link>
                    <Link href="/history" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                      <History className="w-5 h-5" /> History
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                      <Info className="w-5 h-5" /> About
                    </Link>
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                    <ThemeToggle />
                  </nav>
                </div>
              </div>
            </header>
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4 rounded-md mb-8 text-red-800 dark:text-red-400 text-sm font-semibold flex items-center justify-center gap-3 shadow-sm transition-colors duration-300">
                <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                <span>MedVision is an educational project. The predictions provided are for learning purposes only and MUST NOT be used for clinical diagnosis.</span>
              </div>
              {children}
            </main>
            
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>&copy; {new Date().getFullYear()} MedVision. Educational Use Only.</span>
                </div>
                <div className="flex gap-4">
                  <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Use</Link>
                  <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy</Link>
                </div>
              </div>
            </footer>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
