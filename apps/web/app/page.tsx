import Link from "next/link";
import { UploadCloud, History, ArrowRight, BrainCircuit, Cpu, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Playful Icon Badge */}
      <div className="bg-gradient-to-tr from-blue-400 to-purple-500 p-1 rounded-3xl mb-8 shadow-2xl shadow-blue-500/20 animate-bounce">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-[22px]">
          <HeartPulse className="w-14 h-14 text-transparent fill-blue-500 stroke-blue-600 dark:stroke-blue-400" />
        </div>
      </div>

      {/* Oversized Typography with Gradient */}
      <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300">
        Pneumonia AI.
      </h1>
      <p className="text-2xl font-bold text-gray-600 dark:text-gray-300 max-w-2xl mb-16 flex items-center justify-center gap-3">
        <Cpu className="w-8 h-8 text-purple-500" />
        Educational CNN computer vision model.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Glassmorphism Card 1 */}
        <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-8 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-black/5 hover:-translate-y-4 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300 group">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/40 transition-colors"></div>
          <UploadCloud className="w-14 h-14 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-3xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">Upload & Predict</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 font-semibold text-lg leading-relaxed">Instantly analyze chest X-rays using a Convolutional Neural Network architecture.</p>
          
          {/* Neo-Brutalist Button */}
          <Link href="/predict" className="inline-flex items-center justify-center gap-2 w-full bg-blue-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] px-6 py-4 rounded-xl font-black text-lg transition-all">
            Try it out <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Glassmorphism Card 2 */}
        <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-8 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-black/5 hover:-translate-y-4 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300 group">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl group-hover:bg-purple-400/40 transition-colors"></div>
          <History className="w-14 h-14 text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-3xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">Inference History</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 font-semibold text-lg leading-relaxed">View all your past predictions and seamlessly analyze the raw model confidence scores.</p>
          
          {/* Neo-Brutalist Button */}
          <Link href="/history" className="inline-flex items-center justify-center gap-2 w-full bg-purple-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] px-6 py-4 rounded-xl font-black text-lg transition-all">
            View history <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Glassmorphism Card 3 */}
        <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-8 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-black/5 hover:-translate-y-4 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300 group">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl group-hover:bg-emerald-400/40 transition-colors"></div>
          <BrainCircuit className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-3xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">How it Works</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 font-semibold text-lg leading-relaxed">Learn about the model architecture, MedMNIST training dataset, and tech stack.</p>
          
          {/* Neo-Brutalist Button */}
          <Link href="/about" className="inline-flex items-center justify-center gap-2 w-full bg-emerald-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] px-6 py-4 rounded-xl font-black text-lg transition-all">
            Learn more <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}
