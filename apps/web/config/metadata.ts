import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "MedVision | Enterprise AI Pneumonia Detection",
  description: "Enterprise-grade chest X-ray classification powered by PyTorch, FastAPI, and Next.js.",
  keywords: ["AI", "Healthcare", "Pneumonia", "Deep Learning", "Next.js"],
};

export const aboutMetadata: Metadata = {
  title: "About the Project",
  description: "Learn about the MedVision architecture, the MedMNIST dataset, and the technical implementation of this educational AI tool.",
};

export const historyMetadata: Metadata = {
  title: "History",
  description: "View the complete log of past AI inferences, including model versions, confidence scores, and predictions.",
};

export const predictMetadata: Metadata = {
  title: "Predict",
  description: "Upload a chest X-ray image and run it through the MedVision AI model for instant pneumonia detection inference.",
};
