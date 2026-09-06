"use client"

import { FileSearch } from "lucide-react"
import { UploadZone } from "components/features/predict/upload-zone"
import { PredictionActions } from "components/features/predict/prediction-actions"
import { PredictionResult } from "components/features/predict/prediction-result"
import { PredictRules } from "components/features/predict/predict-rules"
import { MotionReveal } from "components/ui/motion-reveal"
import { PageTitle } from "components/ui/page-title"
import { ErrorAlert } from "components/ui/error-alert"
import { usePredictForm } from "hooks/use-predict-form"

export default function PredictPage() {
  const { preview, mutation, handleFileChange, handleFileDrop, handleClear, handlePredict } = usePredictForm()

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-0 sm:py-12">
      <PageTitle
        icon={<FileSearch className="h-6 w-6 text-white sm:h-8 sm:w-8 lg:h-10 lg:w-10" />}
        iconBgColor="bg-blue-500"
        title="Predict."
      />

      <MotionReveal delay={0.2}>
        <div className="rounded-2xl border border-white/40 bg-white/50 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl transition-colors sm:rounded-[32px] sm:p-8 lg:p-10 dark:border-gray-700/50 dark:bg-gray-900/50">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col justify-center lg:col-span-2">
              {!preview ? (
                <UploadZone onFileChange={handleFileChange} onFileDrop={handleFileDrop} />
              ) : (
                <PredictionActions
                  previewUrl={preview}
                  isPending={mutation.isPending}
                  onClear={handleClear}
                  onPredict={handlePredict}
                />
              )}

              {mutation.isError && (
                <div className="mt-6">
                  <ErrorAlert title="Prediction Failed" message={mutation.error.message} />
                </div>
              )}
              {mutation.isSuccess && (
                <div className="mt-6">
                  <PredictionResult result={mutation.data} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <PredictRules />
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
