import { apiClient } from "../api-client";
import { PredictionResult, PredictionResultSchema } from "../schemas/prediction";
import { z } from "zod";

export const getPredictions = async () => {
  const data = await apiClient.get<unknown[]>("/api/v1/predictions");
  // Advanced Runtime Validation
  return z.array(PredictionResultSchema).parse(data);
};

export const uploadPrediction = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const data = await apiClient.postFormData<unknown>("/api/v1/predictions", formData);
  // Advanced Runtime Validation
  return PredictionResultSchema.parse(data);
};
