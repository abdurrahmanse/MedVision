import { Loader2, AlertTriangle, SearchX } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-2xl sm:rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl px-4 text-center">
      <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-purple-500 mb-4 sm:mb-6" />
      <p className="text-gray-700 dark:text-gray-300 font-bold text-lg sm:text-xl">Loading history records...</p>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="p-6 sm:p-8 bg-red-400 border-[3px] sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
      <div>
        <h4 className="font-black text-xl sm:text-2xl mb-1">Failed to load history</h4>
        <p className="font-bold text-base sm:text-lg">{message}</p>
      </div>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="text-center py-20 sm:py-32 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-2xl sm:rounded-[32px] border border-white/40 dark:border-gray-700/50 shadow-2xl flex flex-col items-center px-4">
      <SearchX className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mb-4 sm:mb-6" />
      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 mb-2 sm:mb-4 tracking-tight">No records found</h3>
      <p className="text-gray-600 dark:text-gray-400 font-bold text-base sm:text-lg">You haven't made any predictions yet.</p>
    </div>
  )
}
