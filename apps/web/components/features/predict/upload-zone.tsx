import { ImagePlus, UploadCloud } from "lucide-react"

interface UploadZoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function UploadZone({ onFileChange }: UploadZoneProps) {
  return (
    <div className="border-[3px] sm:border-4 border-dashed border-gray-400 dark:border-gray-600 rounded-xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-center hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group cursor-pointer relative shadow-inner">
      <UploadCloud className="w-16 h-16 sm:w-20 sm:h-20 text-gray-500 dark:text-gray-400 mx-auto mb-4 sm:mb-8 group-hover:scale-125 group-hover:text-blue-500 transition-all duration-300" />
      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 tracking-tight">Drop Chest X-Ray Here</h3>
      <p className="text-gray-600 dark:text-gray-400 font-bold mb-6 sm:mb-8 text-sm sm:text-base">PNG or JPG (Max 5MB)</p>
      
      <label className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-blue-500 text-white border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-extrabold text-base cursor-pointer transition-all">
        <ImagePlus className="w-5 h-5" />
        Browse Files
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png, image/jpeg" onChange={onFileChange} />
      </label>
    </div>
  )
}
