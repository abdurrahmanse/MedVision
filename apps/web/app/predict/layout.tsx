import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Predict",
  description: "Upload a chest X-ray image and run it through the MedVision AI model for instant pneumonia detection inference.",
};

export default function PredictLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
