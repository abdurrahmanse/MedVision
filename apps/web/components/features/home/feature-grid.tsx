import { UploadCloud, History, BrainCircuit } from "lucide-react"
import { MotionReveal } from "components/ui/motion-reveal"
import { FeatureCard } from "./feature-card"

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full px-4 sm:px-0">
      <MotionReveal delay={0.4} direction="up" className="h-full">
        <FeatureCard 
          icon={<UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />}
          title="Upload & Predict"
          description="Instantly analyze chest X-rays using a Convolutional Neural Network architecture."
          buttonHref="/predict"
          buttonText="Try it out"
          buttonVariant="blue"
          glowColor="blue"
        />
      </MotionReveal>
      
      <MotionReveal delay={0.5} direction="up" className="h-full">
        <FeatureCard 
          icon={<History className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400" />}
          title="Inference History"
          description="View all your past predictions and seamlessly analyze the raw model confidence scores."
          buttonHref="/history"
          buttonText="View history"
          buttonVariant="purple"
          glowColor="purple"
        />
      </MotionReveal>
      
      <MotionReveal delay={0.6} direction="up" className="h-full">
        <FeatureCard 
          icon={<BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />}
          title="How it Works"
          description="Learn about the model architecture, MedMNIST training dataset, and tech stack."
          buttonHref="/about"
          buttonText="Learn more"
          buttonVariant="emerald"
          glowColor="emerald"
          className="md:col-span-2 lg:col-span-1"
        />
      </MotionReveal>
    </div>
  )
}
