import { useMemo, useState } from "react";
import { PredictionResult } from "types";

export type ViewMode = "table" | "grid";
export type FilterClass = "All" | "Normal" | "Pneumonia";
export type SortField = "date" | "confidence";
export type SortOrder = "asc" | "desc";

export function useHistoryTable(predictions: PredictionResult[]) {
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
  const safeCurrentPage = currentPage > totalPages ? totalPages : currentPage;

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const visiblePredictions = processedData.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  const handleFilter = (filter: FilterClass) => {
    setFilterClass(filter);
    setCurrentPage(1);
  };

  return {
    currentPage: safeCurrentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery: handleSearch,
    filterClass,
    setFilterClass: handleFilter,
    sortField,
    sortOrder,
    toggleSort,
    totalPages,
    visiblePredictions,
    processedDataCount: processedData.length
  };
}
