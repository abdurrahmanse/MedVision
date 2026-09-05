import { Metadata } from "next";
import { ReactNode } from "react";

import { aboutMetadata } from "config/metadata";

export const metadata: Metadata = aboutMetadata;

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
