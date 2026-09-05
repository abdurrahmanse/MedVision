import { BookOpen } from "lucide-react"
import { ProjectDetails } from "components/features/about/project-details"
import { DisclaimerSection } from "components/features/about/disclaimer-section"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-2 sm:p-3 bg-blue-600 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
        </div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">About.</span>
      </h1>
      <ProjectDetails />
      <DisclaimerSection />
    </div>
  )
}
