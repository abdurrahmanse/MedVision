import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About the Project",
  description: "Learn about the MedVision architecture, the MedMNIST dataset, and the technical implementation of this educational AI tool.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
