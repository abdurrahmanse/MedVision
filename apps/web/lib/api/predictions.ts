import { apiClient } from "../api-client";
import { PredictionResult } from "types";

export const getPredictions = () => 
  apiClient.get<PredictionResult[]>("/api/v1/predictions");

export const uploadPrediction = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  return apiClient.postFormData<PredictionResult>("/api/v1/predictions", formData);
};
