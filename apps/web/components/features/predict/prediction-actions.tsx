import { Trash2, Loader2, ShieldAlert } from "lucide-react"

interface PredictionActionsProps {
  previewUrl: string
  isPending: boolean
  onClear: () => void
  onPredict: () => void
}

export function PredictionActions({ previewUrl, isPending, onClear, onPredict }: PredictionActionsProps) {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex justify-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-3xl border-[3px] sm:border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-colors">
        <img src={previewUrl} alt="Preview" className="max-h-64 sm:max-h-96 rounded-lg sm:rounded-xl object-contain" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <button 
          onClick={onClear}
          className="w-full sm:w-auto justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] sm:hover:translate-y-[4px] sm:hover:translate-x-[4px] font-black text-lg sm:text-xl rounded-lg sm:rounded-xl flex items-center gap-2 transition-all"
        >
          <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
          Clear
        </button>
        
        <button 
          onClick={onPredict}
          disabled={isPending}
          className="w-full sm:w-auto justify-center px-6 py-3 sm:px-10 sm:py-4 bg-blue-500 text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] sm:hover:translate-y-[4px] sm:hover:translate-x-[4px] disabled:opacity-50 disabled:cursor-not-allowed font-black text-lg sm:text-xl rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 transition-all"
        >
          {isPending ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />}
          {isPending ? "Analyzing..." : "Run Prediction"}
        </button>
      </div>
    </div>
  )
}
