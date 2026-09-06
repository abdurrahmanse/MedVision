import { NeoBadge } from "components/ui/neo-badge"
import { PageTitle } from "components/ui/page-title"
import { ActivitySquare, ArrowLeft, Clock, Cpu, Fingerprint, ShieldCheck, Stethoscope } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PredictionResult, PredictionResultSchema } from "lib/schemas/prediction"

interface PredictionDetailProps {
  params: Promise<{ id: string }>
}

async function getPrediction(id: string): Promise<PredictionResult | { error: string; status: number }> {
  const baseUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

  try {
    const res = await fetch(`${baseUrl}/api/v1/predictions/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Fetch failed: ${res.status} ${res.statusText}`)
      const text = await res.text()
      console.error(`Response body: ${text}`)
      return { error: `HTTP ${res.status}: ${text}`, status: res.status }
    }

    const data = await res.json()
    return PredictionResultSchema.parse(data)
  } catch (e: any) {
    console.error("Fetch Exception:", e)
    return { error: e.message, status: 500 }
  }
}

export default async function PredictionDetailPage({ params }: PredictionDetailProps) {
  const resolvedParams = await params
  const prediction = await getPrediction(resolvedParams.id)

  if (prediction && "error" in prediction) {
    return (
      <div className="mx-auto mt-20 max-w-7xl py-8 text-center text-2xl font-bold text-red-500">
        <h2>Diagnostic Error Page</h2>
        <p>
          Tried to fetch: {process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}
          /api/v1/predictions/{resolvedParams.id}
        </p>
        <p>Error details: {prediction.error}</p>
      </div>
    )
  }

  if (!prediction) {
    notFound()
  }

  const isNormal = prediction.predicted_class === "Normal"
  const API_BASE = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-0 sm:py-12">
      <Link
        href="/history"
        className="group mb-8 inline-flex w-fit items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-5 py-2.5 font-bold text-gray-700 shadow-sm transition-all hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-white dark:hover:text-white dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
      >
        <div className="rounded-lg bg-gray-100 p-1.5 transition-colors group-hover:bg-black dark:bg-gray-800 dark:group-hover:bg-white">
          <ArrowLeft className="h-4 w-4 text-gray-500 transition-colors group-hover:text-white dark:text-gray-400 dark:group-hover:text-black" />
        </div>
        Back to History
      </Link>

      <PageTitle
        icon={<ActivitySquare className="h-6 w-6 text-white sm:h-8 sm:w-8 lg:h-10 lg:w-10" />}
        iconBgColor={isNormal ? "bg-green-500" : "bg-orange-500"}
        title="Prediction Details."
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Col: Image */}
        <div className="flex flex-col items-center rounded-[32px] border-2 border-black bg-white/60 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-8 dark:border-white dark:bg-gray-900/60 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-black bg-gray-100 shadow-inner dark:border-white dark:bg-gray-800">
            {prediction.image_url ? (
              <img
                src={
                  prediction.image_url.startsWith("http") ? prediction.image_url : `${API_BASE}${prediction.image_url}`
                }
                alt="X-ray scan"
                className="h-full w-full object-cover"
              />
            ) : (
              <Stethoscope className="h-24 w-24 text-gray-300 opacity-50 dark:text-gray-600" />
            )}
          </div>
          <div className="mt-6 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
            <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <Fingerprint className="h-4 w-4" /> UUID:
            </span>
            <span className="max-w-[200px] truncate font-mono text-sm text-gray-900 dark:text-white">
              {prediction.id}
            </span>
          </div>
        </div>

        {/* Right Col: Details Grid */}
        <div className="flex flex-col gap-6">
          <div
            className={`flex flex-col items-center rounded-[32px] border-2 p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] ${isNormal ? "border-green-600 bg-green-100 dark:bg-green-900/30" : "border-orange-500 bg-orange-100 dark:bg-orange-900/30"}`}
          >
            <div className="mb-4">
              <NeoBadge variant={isNormal ? "success" : "warning"}>{prediction.predicted_class}</NeoBadge>
            </div>
            <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
              {(prediction.confidence * 100).toFixed(2)}%
            </h2>
            <p className="mt-2 text-sm font-bold text-gray-600 dark:text-gray-400">Confidence Score</p>
          </div>

          <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col justify-center rounded-[24px] border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-3 text-blue-500">
                <Cpu className="h-6 w-6" />
                <h3 className="font-bold text-gray-900 dark:text-white">Model Info</h3>
              </div>
              <p className="text-3xl font-black text-gray-800 dark:text-gray-200">{prediction.model_version}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">PyTorch TinyCNN Architecture</p>
            </div>

            <div className="flex flex-col justify-center rounded-[24px] border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-3 text-purple-500">
                <Clock className="h-6 w-6" />
                <h3 className="font-bold text-gray-900 dark:text-white">Timestamp</h3>
              </div>
              <p className="text-xl font-black text-gray-800 dark:text-gray-200">
                {new Date(prediction.created_at).toLocaleDateString()}
              </p>
              <p className="mt-1 text-sm font-bold text-gray-500">
                {new Date(prediction.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-[24px] border border-blue-200 bg-blue-50 p-6 dark:border-blue-800/50 dark:bg-blue-900/20">
            <ShieldCheck className="h-8 w-8 shrink-0 text-blue-500" />
            <div>
              <h4 className="mb-1 font-bold text-blue-900 dark:text-blue-100">Medical Disclaimer</h4>
              <p className="text-sm leading-relaxed font-medium text-blue-700 dark:text-blue-300">
                This prediction was generated by an educational AI model and should not be used for diagnostic purposes.
                Always consult a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
