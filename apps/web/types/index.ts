export interface PredictionResult {
  id: string;
  predicted_class: "Normal" | "Pneumonia";
  confidence: number;
  model_version: string;
  created_at: string;
  image_url: string;
}
