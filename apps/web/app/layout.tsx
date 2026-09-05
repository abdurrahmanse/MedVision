import { Rajdhani } from "next/font/google";
import "styles/tailwind.css";
import Link from "next/link";
import { QueryProvider } from "components/providers/query-provider";
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
    <html lang="en">
      <body className={`${rajdhani.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <QueryProvider>
          <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <Stethoscope className="w-8 h-8" />
                  <span>MedVision</span>
                </Link>
                <nav className="flex space-x-6">
                  <Link href="/predict" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    <Upload className="w-5 h-5" /> Predict
                  </Link>
                  <Link href="/history" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    <History className="w-5 h-5" /> History
                  </Link>
                  <Link href="/about" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors">
                    <Info className="w-5 h-5" /> About
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-8 text-red-800 text-sm font-semibold flex items-center justify-center gap-3 shadow-sm">
              <AlertOctagon className="w-5 h-5 flex-shrink-0" />
              <span>MedVision is an educational project. The predictions provided are for learning purposes only and MUST NOT be used for clinical diagnosis.</span>
            </div>
            {children}
          </main>
          
          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>&copy; {new Date().getFullYear()} MedVision. Educational Use Only.</span>
              </div>
              <div className="flex gap-4">
                <Link href="/about" className="hover:text-gray-900 transition-colors">Terms of Use</Link>
                <Link href="/about" className="hover:text-gray-900 transition-colors">Privacy</Link>
              </div>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  )
}
