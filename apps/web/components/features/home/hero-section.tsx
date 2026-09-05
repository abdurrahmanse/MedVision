import { Cpu, HeartPulse } from "lucide-react"

export function HeroSection() {
  return (
    <>
      <div className="bg-gradient-to-tr from-slate-700 to-blue-600 p-1 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-xl sm:shadow-2xl shadow-blue-500/20 animate-bounce">
        <div className="bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-xl sm:rounded-[22px]">
          <HeartPulse className="w-10 h-10 sm:w-14 sm:h-14 text-transparent fill-blue-500 stroke-blue-600 dark:stroke-blue-400" />
        </div>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 px-4">
        Pneumonia AI.
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-600 dark:text-gray-300 max-w-2xl mb-10 sm:mb-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4 text-center">
        <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 hidden sm:block" />
        Educational CNN computer vision model.
      </p>
    </>
  )
}
