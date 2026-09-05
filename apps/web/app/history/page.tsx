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
    <div className="max-w-5xl mx-auto py-12 w-full">
      <h1 className="text-6xl font-black mb-10 flex items-center gap-4 text-gray-900 dark:text-gray-100 tracking-tighter">
        <div className="p-3 bg-purple-500 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <History className="w-12 h-12 text-white" />
        </div>
        Prediction History.
      </h1>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl">
          <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-6" />
          <p className="text-gray-700 dark:text-gray-300 font-bold text-xl">Loading history records...</p>
        </div>
      )}

      {isError && (
        <div className="p-8 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-2xl flex items-center gap-6">
          <AlertTriangle className="w-10 h-10 flex-shrink-0" />
          <div>
            <h4 className="font-black text-2xl mb-1">Failed to load history</h4>
            <p className="font-bold text-lg">{error.message}</p>
          </div>
        </div>
      )}

      {predictions && predictions.length === 0 && (
        <div className="text-center py-32 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl flex flex-col items-center">
          <SearchX className="w-20 h-20 text-gray-400 mb-6" />
          <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tight">No records found</h3>
          <p className="text-gray-600 dark:text-gray-400 font-bold text-lg">You haven't made any predictions yet.</p>
        </div>
      )}

      {predictions && predictions.length > 0 && (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> Image
                </th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="w-5 h-5" /> Prediction
                  </div>
                </th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" /> Confidence
                  </div>
                </th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {predictions.map((p) => (
                <tr key={p.id} className="hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors group cursor-default">
                  <td className="px-8 py-6 whitespace-nowrap">
                    {p.image_url ? (
                      <img 
                        src={`${API_BASE}${p.image_url}`} 
                        alt="Scan" 
                        className="h-20 w-20 object-cover rounded-xl bg-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-1 group-hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`px-5 py-2 inline-flex text-sm font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      p.predicted_class === 'Normal' ? 'bg-green-400 text-black' : 'bg-orange-400 text-black'
                    }`}>
                      {p.predicted_class}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xl font-black text-gray-900 dark:text-white">
                    {(p.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-700 dark:text-gray-300 font-bold">
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
