import { HeroSection } from "components/features/home/hero-section"
import { FeatureGrid } from "components/features/home/feature-grid"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4 sm:px-0">
      <HeroSection />
      <FeatureGrid />
    </div>
  );
}
