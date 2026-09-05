import { Settings, Database } from "lucide-react"
import { GlassCard } from "components/ui/glass-card"

export function ProjectDetails() {
  return (
    <GlassCard className="mb-8 sm:mb-12 hover:-translate-y-2 transition-transform duration-500 p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 tracking-tight">
        <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">The Project</span>
      </h2>
      <p className="text-gray-800 dark:text-gray-200 mb-6 font-bold text-lg sm:text-xl leading-relaxed">
        MedVision is an end-to-end Machine Learning project built as an educational demonstration. 
        It illustrates the full lifecycle of a computer vision product: from data exploration and model training in PyTorch, 
        to building a FastAPI backend with PostgreSQL, all the way to this Next.js frontend.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-100 dark:bg-blue-900/50 rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-colors">
        <Database className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <p className="text-gray-900 dark:text-gray-100 font-black text-base sm:text-lg leading-relaxed">
          The dataset used is a tiny 100-image subset from MedMNIST (specifically the PneumoniaMNIST subset), 
          intended purely to demonstrate technical plumbing rather than create a robust clinical tool.
        </p>
      </div>
    </GlassCard>
  )
}
