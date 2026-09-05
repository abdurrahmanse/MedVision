import { Cpu } from "lucide-react"
import { MotionReveal } from "components/ui/motion-reveal"

export function HeroSection() {
  return (
    <>
      <MotionReveal delay={0.2} direction="up">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 px-4 mt-8 sm:mt-12">
          Pneumonia AI.
        </h1>
      </MotionReveal>

      <MotionReveal delay={0.3} direction="up">
        <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-600 dark:text-gray-300 mb-10 sm:mb-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4 text-center">
          <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 hidden sm:block" />
          Educational CNN computer vision model.
        </p>
      </MotionReveal>
    </>
  )
}
