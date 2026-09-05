import { BookOpen, Database, Settings, ShieldAlert } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 w-full">
      <h1 className="text-6xl font-black mb-10 flex items-center gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        About MedVision.
      </h1>
      
      <section className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 p-10 rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl mb-12 hover:-translate-y-2 transition-transform duration-500">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-900 dark:text-white tracking-tight">
          <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          The Project
        </h2>
        <p className="text-gray-800 dark:text-gray-200 mb-6 font-bold text-xl leading-relaxed">
          MedVision is an end-to-end Machine Learning project built as an educational demonstration. 
          It illustrates the full lifecycle of a computer vision product: from data exploration and model training in PyTorch, 
          to building a FastAPI backend with PostgreSQL, all the way to this Next.js frontend.
        </p>
        <div className="flex items-start gap-4 mt-8 p-6 bg-blue-100 dark:bg-blue-900/50 rounded-2xl border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-colors">
          <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-gray-900 dark:text-gray-100 font-black text-lg leading-relaxed">
            The dataset used is a tiny 100-image subset from MedMNIST (specifically the PneumoniaMNIST subset), 
            intended purely to demonstrate technical plumbing rather than create a robust clinical tool.
          </p>
        </div>
      </section>

      <section className="bg-red-400 p-10 rounded-[32px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500">
        <h2 className="text-4xl font-black mb-6 text-black flex items-center gap-3 tracking-tighter">
          <ShieldAlert className="w-10 h-10" />
          Disclaimer
        </h2>
        <p className="text-black font-extrabold text-2xl leading-relaxed">
          This system is completely unfit for medical diagnosis. It is trained on an artificially small dataset 
          for educational purposes. Do not use this application to make healthcare decisions.
        </p>
      </section>
    </div>
  );
}
