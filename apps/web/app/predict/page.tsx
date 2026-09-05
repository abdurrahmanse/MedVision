"use client";

import { FileSearch } from "lucide-react";
import { UploadZone } from "components/features/predict/upload-zone";
import { PredictionActions } from "components/features/predict/prediction-actions";
import { PredictionResult } from "components/features/predict/prediction-result";
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

          {mutation.isError && <ErrorAlert title="Prediction Failed" message={mutation.error.message} />}

          {mutation.isSuccess && <PredictionResult result={mutation.data} />}
        </div>
      </MotionReveal>
    </div>
  );
}
