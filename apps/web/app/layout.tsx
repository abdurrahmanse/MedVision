import { Rajdhani } from "next/font/google";
import "styles/tailwind.css";
import { QueryProvider } from "components/providers/query-provider";
import { ThemeProvider } from "components/providers/theme-provider";
import { AuroraBackground } from "components/layout/aurora-background";
import { Navbar } from "components/layout/navbar";
import { Footer } from "components/layout/footer";
import { DisclaimerBanner } from "components/layout/disclaimer-banner";

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
        <AuroraBackground />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
              <DisclaimerBanner />
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
