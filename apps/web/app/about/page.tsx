import { Info } from "lucide-react"
import { ProjectDetails } from "components/features/about/project-details"
import { DisclaimerSection } from "components/features/about/disclaimer-section"
import { PageTitle } from "components/ui/page-title"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <PageTitle 
        icon={<Info className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />}
        iconBgColor="bg-emerald-500"
        title="About."
      />
      <ProjectDetails />
      <DisclaimerSection />
    </div>
  )
}
