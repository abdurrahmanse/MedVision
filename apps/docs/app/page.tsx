import { HeroSection } from "@/components/home/hero";
import { TechStack } from "@/components/home/stack";
import { ViewsSection } from "@/components/home/views";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-blue-500/30">
      {/* Premium subtle grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <TechStack />
        <ViewsSection />
      </main>
      <Footer />
    </div>
  );
}
