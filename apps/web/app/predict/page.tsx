"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadPrediction } from "lib/api/predictions";
import { UploadCloud, CheckCircle2, AlertTriangle, Loader2, ImagePlus, FileSearch, Trash2, ShieldAlert } from "lucide-react";

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (f: File) => uploadPrediction(f),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      mutation.reset();
    }
  };

  const handlePredict = () => {
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 w-full">
      <h1 className="text-6xl font-black mb-10 flex items-center gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-3 bg-blue-500 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <FileSearch className="w-12 h-12 text-white" />
        </div>
        Predict Pneumonia.
      </h1>
      
      {/* Glassmorphism Wrapper */}
      <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 p-10 rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-blue-900/10 transition-colors">
        {!preview ? (
          <div className="border-4 border-dashed border-gray-400 dark:border-gray-600 rounded-3xl p-20 text-center hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group cursor-pointer relative shadow-inner">
            <UploadCloud className="w-20 h-20 text-gray-500 dark:text-gray-400 mx-auto mb-8 group-hover:scale-125 group-hover:text-blue-500 transition-all duration-300" />
            <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight">Drop Chest X-Ray Here</h3>
            <p className="text-gray-600 dark:text-gray-400 font-bold mb-8 text-lg">PNG or JPG (Max 5MB)</p>
            
            {/* Neo-Brutalist Upload Button */}
            <label className="inline-flex items-center gap-3 bg-blue-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] px-8 py-4 rounded-xl font-black text-xl cursor-pointer transition-all">
              <ImagePlus className="w-6 h-6" />
              Browse Files
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png, image/jpeg" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex justify-center bg-white dark:bg-gray-800 p-6 rounded-3xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-colors">
              <img src={preview} alt="Preview" className="max-h-96 rounded-xl object-contain" />
            </div>
            
            <div className="flex justify-center gap-6">
              {/* Neo-Brutalist Clear Button */}
              <button 
                onClick={() => { setFile(null); setPreview(null); mutation.reset(); }}
                className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] font-black text-xl rounded-xl flex items-center gap-2 transition-all"
              >
                <Trash2 className="w-6 h-6" />
                Clear
              </button>
              
              {/* Neo-Brutalist Predict Button */}
              <button 
                onClick={handlePredict}
                disabled={mutation.isPending}
                className="px-10 py-4 bg-blue-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] disabled:opacity-50 disabled:cursor-not-allowed font-black text-xl rounded-xl flex items-center gap-3 transition-all"
              >
                {mutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldAlert className="w-6 h-6" />}
                {mutation.isPending ? "Analyzing..." : "Run Prediction"}
              </button>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mt-10 p-8 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-2xl mb-2">Prediction Failed</h4>
              <p className="font-bold text-lg">{mutation.error.message}</p>
            </div>
          </div>
        )}

        {mutation.isSuccess && (
          <div className={`mt-10 p-10 rounded-3xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex items-start gap-8 transition-all animate-in zoom-in-95 duration-500 ${mutation.data.predicted_class === 'Normal' ? 'bg-green-400 text-black' : 'bg-orange-400 text-black'}`}>
            <div className="bg-white p-4 rounded-full border-2 border-black">
              <CheckCircle2 className={`w-14 h-14 ${mutation.data.predicted_class === 'Normal' ? 'text-green-600' : 'text-orange-600'}`} />
            </div>
            <div className="w-full">
              <p className="text-lg font-bold uppercase tracking-widest opacity-80 mb-2">Diagnosis Result</p>
              <h3 className="text-6xl font-black mb-8 tracking-tighter">{mutation.data.predicted_class}</h3>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t-4 border-black/20">
                <div>
                  <p className="text-lg font-bold opacity-80 mb-2">Confidence Score</p>
                  <p className="font-black text-4xl">{(mutation.data.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-lg font-bold opacity-80 mb-2">Model Version</p>
                  <p className="font-black text-3xl">{mutation.data.model_version}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
