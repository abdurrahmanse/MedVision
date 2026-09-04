import { Rajdhani } from "next/font/google";
import "styles/tailwind.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={rajdhani.className}>{children}</body>
    </html>
  )
}
