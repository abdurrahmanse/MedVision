import { UploadCloud, History, BrainCircuit, ArrowRight } from "lucide-react"
import { GlassCard } from "components/ui/glass-card"
import { NeoButton } from "components/ui/neo-button"

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full px-4 sm:px-0">
      <GlassCard hoverEffect className="p-6 sm:p-8">
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400/20 rounded-full blur-xl sm:blur-2xl group-hover:bg-blue-400/40 transition-colors"></div>
        <UploadCloud className="w-10 h-10 sm:w-14 sm:h-14 text-blue-600 dark:text-blue-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 tracking-tight">Upload & Predict</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-semibold text-base sm:text-lg leading-relaxed">Instantly analyze chest X-rays using a Convolutional Neural Network architecture.</p>
        
        <NeoButton href="/predict" variant="blue" fullWidth className="py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg">
          Try it out <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </NeoButton>
      </GlassCard>
      
      <GlassCard hoverEffect className="p-6 sm:p-8">
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-purple-400/20 rounded-full blur-xl sm:blur-2xl group-hover:bg-purple-400/40 transition-colors"></div>
        <History className="w-10 h-10 sm:w-14 sm:h-14 text-purple-600 dark:text-purple-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 tracking-tight">Inference History</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-semibold text-base sm:text-lg leading-relaxed">View all your past predictions and seamlessly analyze the raw model confidence scores.</p>
        
        <NeoButton href="/history" variant="purple" fullWidth className="py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg">
          View history <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </NeoButton>
      </GlassCard>
      
      <GlassCard hoverEffect className="p-6 sm:p-8 md:col-span-2 lg:col-span-1">
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-emerald-400/20 rounded-full blur-xl sm:blur-2xl group-hover:bg-emerald-400/40 transition-colors"></div>
        <BrainCircuit className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-600 dark:text-emerald-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 tracking-tight">How it Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-semibold text-base sm:text-lg leading-relaxed">Learn about the model architecture, MedMNIST training dataset, and tech stack.</p>
        
        <NeoButton href="/about" variant="emerald" fullWidth className="py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg">
          Learn more <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </NeoButton>
      </GlassCard>
    </div>
  )
}
