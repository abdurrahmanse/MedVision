"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadPrediction } from "lib/api/predictions";
import { UploadCloud, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

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
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Predict Pneumonia</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        {!preview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors">
            <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Chest X-Ray</h3>
            <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB</p>
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
              Browse Files
              <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="max-h-64 rounded-md border" />
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setFile(null); setPreview(null); mutation.reset(); }}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
              <button 
                onClick={handlePredict}
                disabled={mutation.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {mutation.isPending ? "Analyzing..." : "Run Prediction"}
              </button>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Prediction Failed</h4>
              <p className="text-sm">{mutation.error.message}</p>
            </div>
          </div>
        )}

        {mutation.isSuccess && (
          <div className={`mt-6 p-6 rounded-lg border-2 flex items-start gap-4 ${mutation.data.predicted_class === 'Normal' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-orange-50 border-orange-200 text-orange-900'}`}>
            <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-1">{mutation.data.predicted_class}</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm opacity-75">Confidence</p>
                  <p className="font-semibold text-lg">{(mutation.data.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Model Version</p>
                  <p className="font-semibold">{mutation.data.model_version}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
