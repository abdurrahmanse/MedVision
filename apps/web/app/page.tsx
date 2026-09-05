import Link from "next/link";
import { UploadCloud, Activity, History, ArrowRight, BrainCircuit, ShieldAlert, Cpu, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-6">
        <HeartPulse className="w-16 h-16 text-blue-600" />
      </div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
        Pneumonia Detection AI
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-12 flex items-center justify-center gap-2">
        <Cpu className="w-6 h-6 text-gray-400" />
        An educational machine learning tool demonstrating CNNs in action.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow group">
          <UploadCloud className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Upload & Predict</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Upload a chest X-ray image and get real-time inference from our CNN model architecture.</p>
          <Link href="/predict" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
            Try it out <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow group">
          <History className="w-12 h-12 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Inference History</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">View past predictions and seamlessly analyze the confidence scores of the model.</p>
          <Link href="/history" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800 transition-colors">
            View history <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow group">
          <BrainCircuit className="w-12 h-12 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold mb-3 text-gray-800">How it Works</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Learn about the model architecture, training dataset (MedMNIST), and limitations.</p>
          <Link href="/about" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
            Learn more <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
