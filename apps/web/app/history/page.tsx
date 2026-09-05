"use client";

import { useQuery } from "@tanstack/react-query";
import { getPredictions } from "lib/api/predictions";
import { History } from "lucide-react";
import { HistoryTable } from "components/features/history/history-table";
import { LoadingState, ErrorState, EmptyState } from "components/features/history/history-states";

export default function HistoryPage() {
  const { data: predictions, isLoading, isError, error } = useQuery({
    queryKey: ['predictions'],
    queryFn: getPredictions,
  });

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-2 sm:p-3 bg-purple-500 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <History className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
        </div>
        History.
      </h1>
      
      {isLoading && <LoadingState />}
      {isError && <ErrorState message={error.message} />}
      {predictions && predictions.length === 0 && <EmptyState />}
      {predictions && predictions.length > 0 && <HistoryTable predictions={predictions} />}
    </div>
  );
}
