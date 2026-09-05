import { AlertCircle, ArrowLeft } from "lucide-react";
import { MotionReveal } from "components/ui/motion-reveal";
import { NeoButton } from "components/ui/neo-button";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <MotionReveal delay={0.1} direction="up" className="flex flex-col items-center">
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border-4 sm:border-8 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400">
              404
            </h1>
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-bold text-base sm:text-lg max-w-md mb-8 sm:mb-12">
          The page you are looking for doesn't exist or has been moved. Check the URL or head back home.
        </p>

        <NeoButton href="/" variant="blue" className="px-6 py-3 sm:px-8 sm:py-4">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" /> Back to Home
        </NeoButton>
      </MotionReveal>
    </div>
  );
}
