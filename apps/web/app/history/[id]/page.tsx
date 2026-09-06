import { NeoBadge } from "components/ui/neo-badge";
import { PageTitle } from "components/ui/page-title";
import { ActivitySquare, ArrowLeft, Clock, Cpu, Fingerprint, ShieldCheck, Stethoscope } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PredictionResult } from "types";

interface PredictionDetailProps {
  params: Promise<{ id: string }>
}

async function getPrediction(id: string): Promise<PredictionResult | { error: string, status: number }> {
  const baseUrl = (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL) || "http://127.0.0.1:8000"
  
  try {
    const res = await fetch(`${baseUrl}/api/v1/predictions/${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      console.error(`Fetch failed: ${res.status} ${res.statusText}`)
      const text = await res.text()
      console.error(`Response body: ${text}`)
      return { error: `HTTP ${res.status}: ${text}`, status: res.status }
    }
    
    return await res.json() as PredictionResult
  } catch (e: any) {
    console.error("Fetch Exception:", e)
    return { error: e.message, status: 500 }
  }
}

export default async function PredictionDetailPage({ params }: PredictionDetailProps) {
  const resolvedParams = await params
  const prediction = await getPrediction(resolvedParams.id)
  
  if (prediction && 'error' in prediction) {
    return (
      <div className="max-w-7xl mx-auto py-8 text-center text-red-500 font-bold text-2xl mt-20">
        <h2>Diagnostic Error Page</h2>
        <p>Tried to fetch: {(process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL) || "http://127.0.0.1:8000"}/api/v1/predictions/{resolvedParams.id}</p>
        <p>Error details: {prediction.error}</p>
      </div>
    )
  }
  
  if (!prediction) {
    notFound()
  }

  const isNormal = prediction.predicted_class === "Normal"
  const API_BASE = (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL) || "http://127.0.0.1:8000"

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      
      <Link 
        href="/history" 
        className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white rounded-xl shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all font-bold group w-fit"
      >
        <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg group-hover:bg-black dark:group-hover:bg-white transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
        </div>
        Back to History
      </Link>

      <PageTitle 
        icon={<ActivitySquare className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />}
        iconBgColor={isNormal ? "bg-green-500" : "bg-orange-500"}
        title="Prediction Details."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Image */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center">
          <div className="w-full relative aspect-square rounded-2xl overflow-hidden border-2 border-black dark:border-white shadow-inner bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {prediction.image_url ? (
              <img 
                src={prediction.image_url.startsWith("http") ? prediction.image_url : `${API_BASE}${prediction.image_url}`} 
                alt="X-ray scan"
                className="w-full h-full object-cover"
              />
            ) : (
              <Stethoscope className="w-24 h-24 text-gray-300 dark:text-gray-600 opacity-50" />
            )}
          </div>
          <div className="mt-6 w-full flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-bold text-gray-500 flex items-center gap-2">
              <Fingerprint className="w-4 h-4" /> UUID:
            </span>
            <span className="text-sm font-mono text-gray-900 dark:text-white truncate max-w-[200px]">
              {prediction.id}
            </span>
          </div>
        </div>

        {/* Right Col: Details Grid */}
        <div className="flex flex-col gap-6">
          
          <div className={`p-8 rounded-[32px] border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center text-center ${isNormal ? 'bg-green-100 dark:bg-green-900/30 border-green-600' : 'bg-orange-100 dark:bg-orange-900/30 border-orange-500'}`}>
            <div className="mb-4">
              <NeoBadge variant={isNormal ? 'success' : 'warning'}>
                {prediction.predicted_class}
              </NeoBadge>
            </div>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              {(prediction.confidence * 100).toFixed(2)}%
            </h2>
            <p className="mt-2 text-sm font-bold text-gray-600 dark:text-gray-400">
              Confidence Score
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-[24px] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-3 text-blue-500 mb-3">
                <Cpu className="w-6 h-6" />
                <h3 className="font-bold text-gray-900 dark:text-white">Model Info</h3>
              </div>
              <p className="text-3xl font-black text-gray-800 dark:text-gray-200">{prediction.model_version}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">PyTorch TinyCNN Architecture</p>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-[24px] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-3 text-purple-500 mb-3">
                <Clock className="w-6 h-6" />
                <h3 className="font-bold text-gray-900 dark:text-white">Timestamp</h3>
              </div>
              <p className="text-xl font-black text-gray-800 dark:text-gray-200">
                {new Date(prediction.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm font-bold text-gray-500 mt-1">
                {new Date(prediction.created_at).toLocaleTimeString()}
              </p>
            </div>

          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[24px] border border-blue-200 dark:border-blue-800/50 flex gap-4">
            <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Medical Disclaimer</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                This prediction was generated by an educational AI model and should not be used for diagnostic purposes. Always consult a qualified healthcare professional.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
