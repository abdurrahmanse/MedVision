"use client"

import { NeoBadge } from "components/ui/neo-badge"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "lib/utils"
import {
  ActivitySquare,
  AlertTriangle,
  ArrowDownUp,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Filter,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  List,
  Search,
  Target,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { PredictionResult } from "types"
import { useHistoryTable, ViewMode, FilterClass, SortField } from "hooks/use-history-table"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface HistoryTableProps {
  predictions: PredictionResult[]
}

type ViewMode = "table" | "grid"
type FilterClass = "All" | "Normal" | "Pneumonia"
type SortField = "date" | "confidence"
type SortOrder = "asc" | "desc"

export function HistoryTable({ predictions }: HistoryTableProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClass, setFilterClass] = useState<FilterClass>("All")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

  const itemsPerPage = viewMode === "table" ? 5 : 8

  // Process data: Search -> Filter -> Sort
  const processedData = useMemo(() => {
    let data = [...predictions]

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      data = data.filter(
        (p) =>
          p.id.toLowerCase().includes(query) || new Date(p.created_at).toLocaleString().toLowerCase().includes(query)
      )
    }

    // Filter
    if (filterClass !== "All") {
      data = data.filter((p) => p.predicted_class === filterClass)
    }

    // Sort
    data.sort((a, b) => {
      let comparison = 0
      if (sortField === "date") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else if (sortField === "confidence") {
        comparison = a.confidence - b.confidence
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return data
  }, [predictions, searchQuery, filterClass, sortField, sortOrder])

  const totalPages = Math.max(1, Math.ceil(processedDataCount / itemsPerPage))

  // Ensure current page is valid after filtering
  if (currentPage > totalPages) {
    setCurrentPage(totalPages)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const visiblePredictions = processedData.slice(startIndex, startIndex + itemsPerPage)

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* ─── TOOLBAR (Search, Filter, Layout) ─── */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-[32px] dark:border-gray-800 dark:bg-gray-900/60">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search ID or Date..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-xl border border-gray-200 bg-white/50 py-2.5 pr-4 pl-9 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50"
          />
        </div>

        {/* Filters & Toggles */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-4">
          {/* Class Filter */}
          <div className="flex items-center rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            {(["All", "Normal", "Pneumonia"] as FilterClass[]).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setFilterClass(c)
                  setCurrentPage(1)
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:text-sm",
                  filterClass === c
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {c === "All" && <Layers className="h-3.5 w-3.5" />}
                {c === "Normal" && <CheckCircle2 className="h-3.5 w-3.5" />}
                {c === "Pneumonia" && <AlertTriangle className="h-3.5 w-3.5" />}
                {c}
              </button>
            ))}
          </div>

          <div className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-gray-700"></div>

          {/* View Toggles */}
          <div className="ml-auto flex items-center rounded-xl bg-gray-100 p-1 sm:ml-0 dark:bg-gray-800">
            <button
              onClick={() => {
                setViewMode("table")
                setCurrentPage(1)
              }}
              className={cn(
                "rounded-lg p-2 transition-all",
                viewMode === "table"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setViewMode("grid")
                setCurrentPage(1)
              }}
              className={cn(
                "rounded-lg p-2 transition-all",
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── EMPTY STATE (If filtered out) ─── */}
      {processedDataCount === 0 ? (
        <div className="rounded-[32px] border border-white/40 bg-white/60 p-12 text-center shadow-xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/60">
          <Filter className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">No results found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          {/* ─── TABLE VIEW ─── */}
          {viewMode === "table" && (
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-2xl backdrop-blur-xl sm:rounded-[32px] dark:border-gray-700/50 dark:bg-gray-900/60">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <thead className="bg-gray-100/50 backdrop-blur-md dark:bg-gray-800/50">
                    <tr>
                      <th className="flex items-center gap-2 px-4 py-4 text-left text-xs font-black tracking-widest whitespace-nowrap text-gray-800 uppercase sm:px-8 sm:py-6 sm:text-sm dark:text-gray-200">
                        <ImageIcon className="hidden h-4 w-4 sm:block sm:h-5 sm:w-5" /> Image
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-black tracking-widest whitespace-nowrap text-gray-800 uppercase sm:px-8 sm:py-6 sm:text-sm dark:text-gray-200">
                        <div className="flex items-center gap-2">
                          <ActivitySquare className="hidden h-4 w-4 sm:block sm:h-5 sm:w-5" /> Prediction
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-4 text-left text-xs font-black tracking-widest whitespace-nowrap text-gray-800 uppercase transition-colors hover:bg-gray-200/50 sm:px-8 sm:py-6 sm:text-sm dark:text-gray-200 dark:hover:bg-gray-700/50"
                        onClick={() => toggleSort("confidence")}
                      >
                        <div className="flex items-center gap-2">
                          <Target className="hidden h-4 w-4 sm:block sm:h-5 sm:w-5" />
                          Confidence
                          {sortField === "confidence" && <ArrowDownUp className="h-3 w-3 text-blue-500" />}
                        </div>
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-black tracking-widest whitespace-nowrap text-gray-800 uppercase sm:px-8 sm:py-6 sm:text-sm dark:text-gray-200">
                        <div className="flex items-center gap-2">
                          <Cpu className="hidden h-4 w-4 sm:block sm:h-5 sm:w-5" /> Version
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-4 text-left text-xs font-black tracking-widest whitespace-nowrap text-gray-800 uppercase transition-colors hover:bg-gray-200/50 sm:px-8 sm:py-6 sm:text-sm dark:text-gray-200 dark:hover:bg-gray-700/50"
                        onClick={() => toggleSort("date")}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="hidden h-4 w-4 sm:block sm:h-5 sm:w-5" />
                          Date
                          {sortField === "date" && <ArrowDownUp className="h-3 w-3 text-blue-500" />}
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
                          className="group cursor-pointer transition-colors hover:bg-white/80 dark:hover:bg-gray-800/80"
                        >
                          <td className="px-4 py-4 whitespace-nowrap sm:px-8 sm:py-6">
                            {p.image_url ? (
                              <Image
                                src={p.image_url.startsWith("http") ? p.image_url : `${API_BASE}${p.image_url}`}
                                alt="Scan"
                                width={80}
                                height={80}
                                className="h-12 w-12 rounded-lg border-[1.5px] border-black bg-white object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-y-1 group-hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] sm:h-20 sm:w-20 sm:rounded-xl sm:border-2 sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:group-hover:shadow-[2px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:group-hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)]"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg border-[1.5px] border-black bg-gray-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-20 sm:w-20 sm:rounded-xl sm:border-2 sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-gray-700 dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                <ImageIcon className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8" />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap sm:px-8 sm:py-6">
                            <NeoBadge variant={p.predicted_class === "Normal" ? "success" : "warning"}>
                              {p.predicted_class}
                            </NeoBadge>
                          </td>
                          <td className="px-4 py-4 text-sm font-black whitespace-nowrap text-gray-900 sm:px-8 sm:py-6 sm:text-base dark:text-white">
                            {(p.confidence * 100).toFixed(1)}%
                          </td>
                          <td className="px-4 py-4 text-sm font-bold whitespace-nowrap text-gray-600 sm:px-8 sm:py-6 sm:text-base dark:text-gray-400">
                            {p.model_version}
                          </td>
                          <td className="px-4 py-4 text-sm font-bold whitespace-nowrap text-gray-700 sm:px-8 sm:py-6 sm:text-base dark:text-gray-300">
                            {new Date(p.created_at).toLocaleString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
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
            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {visiblePredictions.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    onClick={() => router.push(`/history/${p.id}`)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-[24px] border-2 border-transparent bg-white/60 p-4 text-center shadow-xl backdrop-blur-lg transition-all hover:border-blue-500/50 hover:shadow-blue-500/20 dark:bg-gray-900/60"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 transition-colors group-hover:from-blue-500/10 group-hover:to-purple-500/10" />

                    <div className="relative z-10 mb-4 w-full">
                      {p.image_url ? (
                        <Image
                          src={p.image_url.startsWith("http") ? p.image_url : `${API_BASE}${p.image_url}`}
                          alt="Scan"
                          width={400}
                          height={400}
                          className="aspect-square w-full rounded-2xl border-2 border-black bg-white object-cover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-y-1 group-hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:group-hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)]"
                        />
                      ) : (
                        <div className="flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-black bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-gray-800 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex w-full flex-col items-center gap-2">
                      <NeoBadge variant={p.predicted_class === "Normal" ? "success" : "warning"}>
                        {p.predicted_class}
                      </NeoBadge>
                      <h4 className="mt-1 text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                        {(p.confidence * 100).toFixed(1)}%
                      </h4>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                      <p className="w-full truncate text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
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
            <div className="mt-2 flex items-center justify-between px-2">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, processedDataCount)} of{" "}
                {processedDataCount}
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-200 disabled:opacity-30 dark:hover:bg-gray-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page numbers */}
                <div className="mx-2 hidden items-center gap-1 sm:flex">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-all",
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-200 disabled:opacity-30 dark:hover:bg-gray-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
