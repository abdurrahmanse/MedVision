import { BookOpen, Database, Settings, ShieldAlert, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-gray-900">
        <BookOpen className="w-10 h-10 text-blue-600" />
        About MedVision
      </h1>
      
      <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <Settings className="w-6 h-6 text-gray-500" />
          The Project
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          MedVision is an end-to-end Machine Learning project built as an educational demonstration. 
          It illustrates the full lifecycle of a computer vision product: from data exploration and model training in PyTorch, 
          to building a FastAPI backend with PostgreSQL, all the way to this Next.js frontend.
        </p>
        <div className="flex items-start gap-3 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <p className="text-gray-800 text-sm leading-relaxed">
            The dataset used is a tiny 100-image subset from MedMNIST (specifically the PneumoniaMNIST subset), 
            intended purely to demonstrate technical plumbing rather than create a robust clinical tool.
          </p>
        </div>
      </section>

      <section className="bg-red-50 p-8 rounded-xl shadow-sm border border-red-200">
        <h2 className="text-2xl font-bold mb-4 text-red-700 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6" />
          Disclaimer
        </h2>
        <p className="text-red-900 font-medium leading-relaxed">
          This system is completely unfit for medical diagnosis. It is trained on an artificially small dataset 
          for educational purposes. Do not use this application to make healthcare decisions.
        </p>
      </section>
    </div>
  );
}
