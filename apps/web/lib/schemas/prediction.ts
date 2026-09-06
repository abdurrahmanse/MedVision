import { z } from "zod";

export const PredictionResultSchema = z.object({
  id: z.string().uuid(),
  predicted_class: z.enum(["Normal", "Pneumonia"]),
  confidence: z.number().min(0).max(1),
  model_version: z.string(),
  created_at: z.string().datetime({ offset: true }),
  image_url: z.string(),
});

export type PredictionResult = z.infer<typeof PredictionResultSchema>;
