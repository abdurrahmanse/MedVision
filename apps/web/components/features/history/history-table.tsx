"use client";

import { NeoBadge } from "components/ui/neo-badge";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import {
    ActivitySquare,
    AlertTriangle,
    ArrowDownUp,
    Calendar,
    CheckCircle2,
    ChevronLeft, ChevronRight,
    Cpu,
    Filter,
    Image as ImageIcon,
    Layers,
    LayoutGrid, List,
    Search,
    Target
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PredictionResult } from "types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface HistoryTableProps {
  predictions: PredictionResult[]
}

type ViewMode = "table" | "grid";
type FilterClass = "All" | "Normal" | "Pneumonia";
type SortField = "date" | "confidence";
type SortOrder = "asc" | "desc";

export function HistoryTable({ predictions }: HistoryTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState<FilterClass>("All");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  const itemsPerPage = viewMode === "table" ? 5 : 8;

  // Process data: Search -> Filter -> Sort
  const processedData = useMemo(() => {
    let data = [...predictions];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      data = data.filter(p => 
        p.id.toLowerCase().includes(query) || 
        new Date(p.created_at).toLocaleString().toLowerCase().includes(query)
      );
    }

    // Filter
    if (filterClass !== "All") {
      data = data.filter(p => p.predicted_class === filterClass);
    }

    // Sort
    data.sort((a, b) => {
      let comparison = 0;
      if (sortField === "date") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortField === "confidence") {
        comparison = a.confidence - b.confidence;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return data;
  }, [predictions, searchQuery, filterClass, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / itemsPerPage));
  
  // Ensure current page is valid after filtering
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePredictions = processedData.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* ─── TOOLBAR (Search, Filter, Layout) ─── */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl sm:rounded-[32px] border border-gray-200 dark:border-gray-800 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search ID or Date..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
          />
        </div>

        {/* Filters & Toggles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Class Filter */}
          <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {(["All", "Normal", "Pneumonia"] as FilterClass[]).map((c) => (
              <button
                key={c}
                onClick={() => { setFilterClass(c); setCurrentPage(1); }}
                className={cn(
                  "px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5",
                  filterClass === c 
                    ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {c === "All" && <Layers className="w-3.5 h-3.5" />}
                {c === "Normal" && <CheckCircle2 className="w-3.5 h-3.5" />}
                {c === "Pneumonia" && <AlertTriangle className="w-3.5 h-3.5" />}
                {c}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          {/* View Toggles */}
          <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl ml-auto sm:ml-0">
            <button
              onClick={() => { setViewMode("table"); setCurrentPage(1); }}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "table" ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setViewMode("grid"); setCurrentPage(1); }}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid" ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── EMPTY STATE (If filtered out) ─── */}
      {processedData.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-[32px] border border-white/40 dark:border-gray-700/50 p-12 text-center shadow-xl">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">No results found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          {/* ─── TABLE VIEW ─── */}
          {viewMode === "table" && (
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
                      <th 
                        className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => toggleSort("confidence")}
                      >
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> 
                          Confidence
                          {sortField === "confidence" && <ArrowDownUp className="w-3 h-3 text-blue-500" />}
                        </div>
                      </th>
                      <th className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> Version
                        </div>
                      </th>
                      <th 
                        className="px-4 sm:px-8 py-4 sm:py-6 text-left text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => toggleSort("date")}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" /> 
                          Date
                          {sortField === "date" && <ArrowDownUp className="w-3 h-3 text-blue-500" />}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                    <AnimatePresence mode="popLayout">
                      {visiblePredictions.map((p) => (
                        <motion.tr 
                          key={p.id}
                          layout
                          onClick={() => router.push(`/history/${p.id}`)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors group cursor-pointer"
                        >
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
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── GRID VIEW ─── */}
          {viewMode === "grid" && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visiblePredictions.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    onClick={() => router.push(`/history/${p.id}`)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group cursor-pointer relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-[24px] border-2 border-transparent hover:border-blue-500/50 p-4 shadow-xl hover:shadow-blue-500/20 transition-all flex flex-col items-center text-center overflow-hidden"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors z-0" />
                    
                    <div className="relative z-10 w-full mb-4">
                      {p.image_url ? (
                        <img 
                          src={`${API_BASE}${p.image_url}`} 
                          alt="Scan" 
                          className="w-full aspect-square object-cover rounded-2xl bg-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-1 group-hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 w-full flex flex-col gap-2 items-center">
                      <NeoBadge variant={p.predicted_class === 'Normal' ? 'success' : 'warning'}>
                        {p.predicted_class}
                      </NeoBadge>
                      <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mt-1">
                        {(p.confidence * 100).toFixed(1)}%
                      </h4>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold truncate w-full">
                        ID: {p.id.split("-")[0]}...
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── PAGINATION ─── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-2 px-2">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, processedData.length)} of {processedData.length}
              </p>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                <div className="hidden sm:flex items-center gap-1 mx-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-all",
                        currentPage === i + 1 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" 
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
