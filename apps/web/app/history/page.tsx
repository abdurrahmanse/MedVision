"use client";

import { useQuery } from "@tanstack/react-query";
import { getPredictions } from "lib/api/predictions";
import { Loader2, AlertTriangle, Image as ImageIcon, History, SearchX, Calendar, Target, ActivitySquare } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function HistoryPage() {
  const { data: predictions, isLoading, isError, error } = useQuery({
    queryKey: ['predictions'],
    queryFn: getPredictions,
  });

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-gray-900 dark:text-gray-100 transition-colors">
        <History className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        Prediction History
      </h1>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 dark:text-purple-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading history records...</p>
        </div>
      )}

      {isError && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-400 rounded-xl flex items-center gap-4 shadow-sm transition-colors">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <h4 className="font-bold text-lg">Failed to load history</h4>
            <p>{error.message}</p>
          </div>
        </div>
      )}

      {predictions && predictions.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center transition-colors">
          <SearchX className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No records found</h3>
          <p className="text-gray-500 dark:text-gray-400">You haven't made any predictions yet.</p>
        </div>
      )}

      {predictions && predictions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-colors">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900 transition-colors">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="w-4 h-4" /> Prediction
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" /> Confidence
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
              {predictions.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.image_url ? (
                      <img 
                        src={`${API_BASE}${p.image_url}`} 
                        alt="Scan" 
                        className="h-16 w-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-300 dark:text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full border ${
                      p.predicted_class === 'Normal' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                    }`}>
                      {p.predicted_class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {(p.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">
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
      )}
    </div>
  );
}
