"use client";

import { useState } from "react";
import { usePredictMutation } from "hooks/use-predictions";
import { FileSearch, AlertTriangle } from "lucide-react";
import { UploadZone } from "components/features/predict/upload-zone";
import { PredictionActions } from "components/features/predict/prediction-actions";
import { PredictionResult } from "components/features/predict/prediction-result";
import { MotionReveal } from "components/ui/motion-reveal";

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = usePredictMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      mutation.reset();
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    mutation.reset();
  };

  const handlePredict = () => {
    if (file) mutation.mutate(file);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-2 sm:p-3 bg-blue-500 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <FileSearch className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
        </div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">Predict.</span>
      </h1>
      
      <MotionReveal delay={0.2}>
        <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-blue-900/10 transition-colors">
          {!preview ? (
            <UploadZone onFileChange={handleFileChange} />
          ) : (
            <PredictionActions 
              previewUrl={preview} 
              isPending={mutation.isPending} 
              onClear={handleClear} 
              onPredict={handlePredict} 
            />
          )}

          {mutation.isError && (
            <div className="mt-6 sm:mt-10 p-4 sm:p-8 bg-red-400 border-[3px] sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <div>
                <h4 className="font-black text-lg sm:text-xl mb-1 sm:mb-2">Prediction Failed</h4>
                <p className="font-bold text-sm sm:text-base">{mutation.error.message}</p>
              </div>
            </div>
          )}

          {mutation.isSuccess && <PredictionResult result={mutation.data} />}
        </div>
      </MotionReveal>
    </div>
  );
}
