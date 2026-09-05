import { Loader2, Database } from "lucide-react"
import { ErrorAlert } from "components/ui/error-alert"

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32">
      <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 animate-spin mb-4" />
      <p className="text-gray-600 dark:text-gray-400 font-bold text-lg sm:text-xl animate-pulse">Loading history...</p>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return <ErrorAlert title="Failed to load history" message={message} />;
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl sm:rounded-[32px] border-2 border-dashed border-gray-300 dark:border-gray-700">
      <div className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-6 rounded-full mb-4 sm:mb-6">
        <Database className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-200 mb-2">No records found</h3>
      <p className="text-gray-500 dark:text-gray-400 font-semibold text-center max-w-md px-4 text-sm sm:text-base">
        You haven't run any predictions yet. Head over to the predict page to get started.
      </p>
    </div>
  )
}
