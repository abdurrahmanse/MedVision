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
    <div className="max-w-5xl mx-auto py-8 w-full">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-gray-900 dark:text-gray-100 transition-colors">
        <FileSearch className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        Predict Pneumonia
      </h1>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        {!preview ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer relative">
            <UploadCloud className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-6 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Upload Chest X-Ray</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">PNG or JPG up to 5MB</p>
            <label className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm">
              <ImagePlus className="w-5 h-5" />
              Browse Files
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png, image/jpeg" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
              <img src={preview} alt="Preview" className="max-h-72 rounded-lg shadow-sm" />
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setFile(null); setPreview(null); mutation.reset(); }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 font-semibold rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Clear
              </button>
              <button 
                onClick={handlePredict}
                disabled={mutation.isPending}
                className="px-8 py-3 bg-blue-600 dark:bg-blue-500 font-bold text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-70 flex items-center gap-2 transition-colors shadow-sm"
              >
                {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                {mutation.isPending ? "Analyzing..." : "Run Prediction"}
              </button>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-400 rounded-xl flex items-start gap-4 shadow-sm transition-colors">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1 text-red-600 dark:text-red-400" />
            <div>
              <h4 className="font-bold text-lg mb-1">Prediction Failed</h4>
              <p>{mutation.error.message}</p>
            </div>
          </div>
        )}

        {mutation.isSuccess && (
          <div className={`mt-8 p-8 rounded-xl border-2 flex items-start gap-6 shadow-sm transition-all ${mutation.data.predicted_class === 'Normal' ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 text-green-900 dark:text-green-300' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800 text-orange-900 dark:text-orange-300'}`}>
            <CheckCircle2 className={`w-12 h-12 flex-shrink-0 mt-1 ${mutation.data.predicted_class === 'Normal' ? 'text-green-600 dark:text-green-500' : 'text-orange-600 dark:text-orange-500'}`} />
            <div className="w-full">
              <p className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-1">Diagnosis Result</p>
              <h3 className="text-4xl font-extrabold mb-6 tracking-tight">{mutation.data.predicted_class}</h3>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-current/20">
                <div>
                  <p className="text-sm font-semibold opacity-80 mb-1">Confidence Score</p>
                  <p className="font-bold text-2xl">{(mutation.data.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm font-semibold opacity-80 mb-1">Model Version</p>
                  <p className="font-bold text-xl">{mutation.data.model_version}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
