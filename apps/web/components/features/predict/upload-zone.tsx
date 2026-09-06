import { ImagePlus, UploadCloud, AlertCircle } from "lucide-react"
import { useDragAndDrop } from "../../../hooks/use-drag-and-drop"
import { cn } from "../../../lib/utils"

interface UploadZoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFileDrop: (file: File) => void
}

export function UploadZone({ onFileChange, onFileDrop }: UploadZoneProps) {
  const { isDragging, error, dragProps } = useDragAndDrop({
    onFileDrop,
    accept: ["image/jpeg", "image/png"],
    maxSizeMB: 5
  });

  return (
    <div 
      {...dragProps}
      className={cn(
        "border-[3px] sm:border-4 border-dashed rounded-xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-center transition-colors group cursor-pointer relative shadow-inner",
        isDragging 
          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" 
          : "border-gray-400 dark:border-gray-600 hover:bg-white/60 dark:hover:bg-gray-800/60"
      )}
    >
      <UploadCloud className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-8 transition-all duration-300",
        isDragging ? "scale-125 text-blue-500" : "text-gray-500 dark:text-gray-400 group-hover:scale-125 group-hover:text-blue-500"
      )} />
      
      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 tracking-tight">
        {isDragging ? "Drop it!" : "Drop Chest X-Ray Here"}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 font-bold mb-6 sm:mb-8 text-sm sm:text-base">
        PNG or JPG (Max 5MB)
      </p>
      
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-red-600 bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      
      <label className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-blue-500 text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-extrabold text-base cursor-pointer transition-all">
        <ImagePlus className="w-5 h-5" />
        Browse Files
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png, image/jpeg" onChange={onFileChange} />
      </label>
    </div>
  )
}
