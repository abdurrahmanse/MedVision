import { AlertOctagon } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="bg-yellow-300 dark:bg-yellow-500 border-[3px] sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 rounded-lg sm:rounded-xl mb-6 sm:mb-10 text-black font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default text-center">
      <AlertOctagon className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 animate-bounce" />
      <span className="text-sm sm:text-base lg:text-lg uppercase tracking-wide">MedVision is an educational project. NOT for clinical diagnosis!</span>
    </div>
  )
}
