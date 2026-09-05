import { Metadata } from "next";
import { ReactNode } from "react";

import { predictMetadata } from "config/metadata";

export const metadata: Metadata = predictMetadata;

export default function PredictLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
