import Link from "next/link";
import { UploadCloud, Activity, History } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Pneumonia Detection AI</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-12">
        An educational machine learning tool designed to demonstrate how Convolutional Neural Networks (CNNs) 
        can be used to classify chest X-rays.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-left">
          <UploadCloud className="w-10 h-10 text-blue-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Upload & Predict</h2>
          <p className="text-gray-600 mb-4">Upload a chest X-ray image and get real-time inference from our CNN model.</p>
          <Link href="/predict" className="text-blue-600 font-semibold hover:underline">Try it out &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-left">
          <History className="w-10 h-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Inference History</h2>
          <p className="text-gray-600 mb-4">View past predictions and analyze the confidence scores of the model.</p>
          <Link href="/history" className="text-purple-600 font-semibold hover:underline">View history &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-left">
          <Activity className="w-10 h-10 text-green-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">How it Works</h2>
          <p className="text-gray-600 mb-4">Learn about the model architecture, training data, and the limitations.</p>
          <Link href="/about" className="text-green-600 font-semibold hover:underline">Learn more &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
