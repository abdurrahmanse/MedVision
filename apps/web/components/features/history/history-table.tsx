"use client";

import { useState } from "react"
import { Image as ImageIcon, ActivitySquare, Target, Calendar, Cpu, ChevronLeft, ChevronRight } from "lucide-react"
import { NeoBadge } from "components/ui/neo-badge"
import { PredictionResult } from "types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface HistoryTableProps {
  predictions: PredictionResult[]
}

export function HistoryTable({ predictions }: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(predictions.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePredictions = predictions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl sm:rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
          <thead className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md">
            <tr>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Image
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Prediction
                </div>
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Confidence
                </div>
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Version
                </div>
              </th>
              <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Date
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {visiblePredictions.map((p) => (
              <tr key={p.id} className="hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors group cursor-default">
                <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                  {p.image_url ? (
                    <img 
                      src={`${API_BASE}${p.image_url}`} 
                      alt="Scan" 
                      className="h-12 w-12 sm:h-20 sm:w-20 object-cover rounded-lg sm:rounded-xl bg-white border-[1.5px] sm:border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-1 group-hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[2px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:group-hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="h-12 w-12 sm:h-20 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl border-[1.5px] sm:border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                  <NeoBadge variant={p.predicted_class === 'Normal' ? 'success' : 'warning'}>
                    {p.predicted_class}
                  </NeoBadge>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap text-sm sm:text-base font-black text-gray-900 dark:text-white">
                  {(p.confidence * 100).toFixed(1)}%
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap text-sm sm:text-base font-bold text-gray-600 dark:text-gray-400">
                  {p.model_version}
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap text-sm sm:text-base text-gray-700 dark:text-gray-300 font-bold">
                  {new Date(p.created_at).toLocaleString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, predictions.length)} of {predictions.length}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
