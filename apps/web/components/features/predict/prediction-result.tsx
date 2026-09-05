import { CheckCircle2 } from "lucide-react"
import { PredictionResult as PredictionResultType } from "types"

interface PredictionResultProps {
  result: PredictionResultType
}

export function PredictionResult({ result }: PredictionResultProps) {
  const isNormal = result.predicted_class === 'Normal'
  
  return (
    <div className={`mt-8 sm:mt-10 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-[3px] sm:border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 transition-all animate-in zoom-in-95 duration-500 text-center md:text-left ${isNormal ? 'bg-green-400 text-black' : 'bg-orange-400 text-black'}`}>
      <div className="bg-white p-3 sm:p-4 rounded-full border-2 border-black flex-shrink-0">
        <CheckCircle2 className={`w-10 h-10 sm:w-14 sm:h-14 ${isNormal ? 'text-green-600' : 'text-orange-600'}`} />
      </div>
      <div className="w-full">
        <p className="text-base sm:text-lg font-bold uppercase tracking-widest opacity-80 mb-1 sm:mb-2">Diagnosis Result</p>
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 tracking-tighter">{result.predicted_class}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t-[3px] sm:border-t-4 border-black/20">
          <div>
            <p className="text-base sm:text-lg font-bold opacity-80 mb-1 sm:mb-2">Confidence</p>
            <p className="font-black text-3xl sm:text-4xl">{(result.confidence * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold opacity-80 mb-1 sm:mb-2">Model Version</p>
            <p className="font-black text-2xl sm:text-3xl">{result.model_version}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
