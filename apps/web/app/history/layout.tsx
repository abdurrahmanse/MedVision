import { Metadata } from "next";
import { ReactNode } from "react";

import { historyMetadata } from "config/metadata";

export const metadata: Metadata = historyMetadata;

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
