import { AlertTriangle } from "lucide-react"
import { MotionReveal } from "components/ui/motion-reveal"

export function DisclaimerSection() {
  return (
    <MotionReveal delay={0.4}>
      <div className="bg-red-400 border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all duration-300">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-6 text-black flex items-center gap-2 sm:gap-3 tracking-tighter">
          <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
          Disclaimer
        </h2>
        <p className="text-black font-extrabold text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
          This system is completely unfit for real-world medical diagnosis.
        </p>
        <p className="text-black font-bold text-sm sm:text-base lg:text-lg leading-relaxed">
          The convolutional neural network was trained on an extremely limited educational dataset for a few epochs. 
          Do not upload real sensitive patient data, and do not trust the inference output for actual clinical decision-making.
        </p>
      </div>
    </MotionReveal>
  )
}
