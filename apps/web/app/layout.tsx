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
      <body className={`${rajdhani.className} bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-500`}>
        {/* Subtle Aurora Background Overlay */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px]" />
        </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            {/* Glassmorphism Navbar */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-700/30 transition-colors duration-500">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                  <Link href="/" className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/30">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <span>MedVision</span>
                  </Link>
                  <nav className="flex space-x-6 items-center">
                    <Link href="/predict" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-lg transition-colors group">
                      <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> Predict
                    </Link>
                    <Link href="/history" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-lg transition-colors group">
                      <History className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> History
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-lg transition-colors group">
                      <Info className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> About
                    </Link>
                    <div className="w-px h-8 bg-gray-300/50 dark:bg-gray-600/50 mx-2"></div>
                    <ThemeToggle />
                  </nav>
                </div>
              </div>
            </header>
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
              {/* Neo-Brutalist Disclaimer Banner */}
              <div className="bg-yellow-300 dark:bg-yellow-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 rounded-xl mb-10 text-black font-extrabold flex items-center justify-center gap-4 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default">
                <AlertOctagon className="w-7 h-7 flex-shrink-0 animate-bounce" />
                <span className="text-lg uppercase tracking-wide">MedVision is an educational project. NOT for clinical diagnosis!</span>
              </div>
              {children}
            </main>
            
            <footer className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30 py-8 mt-auto relative z-10">
              <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-gray-600 dark:text-gray-400 font-bold">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  <span>&copy; {new Date().getFullYear()} MedVision. Educational Use Only.</span>
                </div>
                <div className="flex gap-6">
                  <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Terms of Use</Link>
                  <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
                </div>
              </div>
            </footer>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
