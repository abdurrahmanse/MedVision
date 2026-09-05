import { Database } from "lucide-react"
import { ErrorAlert } from "components/ui/error-alert"

export function LoadingState() {
  return (
    <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl sm:rounded-[32px] border border-gray-200 dark:border-gray-700/50 shadow-2xl overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
          <thead className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md">
            <tr>
              {[1, 2, 3, 4, 5].map((i) => (
                <th key={i} className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {[1, 2, 3].map((row) => (
              <tr key={row}>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-12 w-12 sm:h-20 sm:w-20 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl"></div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-24 sm:w-32"></div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-16 sm:w-20"></div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-20 sm:w-24"></div>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-32 sm:w-40"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
