"use client";

import { usePredictions } from "hooks/use-predictions";
import { History } from "lucide-react";
import { HistoryTable } from "components/features/history/history-table";
import { EmptyState, ErrorState, LoadingState } from "components/features/history/history-states";
import { MotionReveal } from "components/ui/motion-reveal";
import { PageTitle } from "components/ui/page-title";


export default function HistoryPage() {
  const { data: predictions, isLoading, isError, error } = usePredictions();

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <PageTitle 
        icon={<History className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />}
        iconBgColor="bg-purple-500"
        title="History."
      />
      
      <MotionReveal delay={0.2}>
      {isLoading && <LoadingState />}
      {isError && <ErrorState message={error.message} />}
      {predictions && predictions.length === 0 && <EmptyState />}
      {predictions && predictions.length > 0 && <HistoryTable predictions={predictions} />}
      </MotionReveal>
    </div>
  );
}
