"use client";

import { FileSearch } from "lucide-react";
import { UploadZone } from "components/features/predict/upload-zone";
import { PredictionActions } from "components/features/predict/prediction-actions";
import { PredictionResult } from "components/features/predict/prediction-result";
import { PredictRules } from "components/features/predict/predict-rules";
import { MotionReveal } from "components/ui/motion-reveal";
import { PageTitle } from "components/ui/page-title";
import { ErrorAlert } from "components/ui/error-alert";
import { usePredictForm } from "hooks/use-predict-form";

export default function PredictPage() {
  const { 
    preview, 
    mutation, 
    handleFileChange, 
    handleClear, 
    handlePredict 
  } = usePredictForm();

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <PageTitle 
        icon={<FileSearch className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />}
        iconBgColor="bg-blue-500"
        title="Predict."
      />
      
      <MotionReveal delay={0.2}>
        <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-blue-900/10 transition-colors">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col justify-center">
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

              {mutation.isError && <div className="mt-6"><ErrorAlert title="Prediction Failed" message={mutation.error.message} /></div>}
              {mutation.isSuccess && <div className="mt-6"><PredictionResult result={mutation.data} /></div>}
            </div>
            
            <div className="lg:col-span-1">
              <PredictRules />
            </div>
          </div>
          
        </div>
      </MotionReveal>
    </div>
  );
}
