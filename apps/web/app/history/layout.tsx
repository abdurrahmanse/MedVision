import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "History",
  description: "View the complete log of past AI inferences, including model versions, confidence scores, and predictions.",
};

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
