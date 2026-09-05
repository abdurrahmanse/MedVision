import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import { AppProviders } from "components/providers/app-providers";
import { Navbar } from "components/layout/navbar";
import { Footer } from "components/layout/footer";
import { DisclaimerBanner } from "components/layout/disclaimer-banner";
import { AuroraBackground } from "components/layout/aurora-background";
import "styles/tailwind.css";

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "MedVision | Pneumonia AI",
    template: "%s | MedVision"
  },
  description: "An educational Convolutional Neural Network (CNN) platform demonstrating end-to-end pneumonia detection from chest X-rays.",
  keywords: ["Pneumonia", "AI", "Machine Learning", "Computer Vision", "Medical Imaging", "PyTorch", "Next.js"],
  authors: [{ name: "MedVision Team" }],
  creator: "MedVision",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medvision.dev",
    title: "MedVision | Pneumonia AI",
    description: "Educational CNN computer vision model for pneumonia detection.",
    siteName: "MedVision",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedVision | Pneumonia AI",
    description: "Educational CNN computer vision model for pneumonia detection.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.className} min-h-screen flex flex-col bg-white dark:bg-gray-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 selection:bg-blue-500 selection:text-white`}>
        <AppProviders>
          <AuroraBackground />
          <Navbar />
          <main className="flex-grow flex flex-col relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <DisclaimerBanner />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
