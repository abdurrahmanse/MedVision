import { Clock, FileWarning, Image as ImageIcon, Scale, ShieldAlert } from "lucide-react";

export function PredictRules() {
  const rules = [
    {
      icon: ImageIcon,
      title: "Supported Formats",
      description: "Only valid JPEG or PNG images are accepted.",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      icon: Scale,
      title: "File Size Limit",
      description: "Maximum allowed file size is exactly 5MB.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
      icon: FileWarning,
      title: "Resolution",
      description: "Images must be at least 28x28 pixels.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      icon: Clock,
      title: "Rate Limiting",
      description: "You are limited to 5 predictions per minute.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30"
    }
  ];

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800/50 dark:bg-gray-900/20">
      <div>
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <ShieldAlert className="size-5 text-gray-700 dark:text-gray-300" />
          Upload Guidelines
        </h3>
        
        <ul className="space-y-5">
          {rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl ${rule.bg}`}>
                <rule.icon className={`size-5 ${rule.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{rule.title}</h4>
                <p className="text-sm leading-snug text-gray-600 dark:text-gray-400">
                  {rule.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
        <p className="text-xs font-medium leading-relaxed text-red-800 dark:text-red-300">
          <strong className="font-bold">Important:</strong> Do not upload images containing Patient Identifiable Information (PII). This platform is strictly for educational software engineering purposes.
        </p>
      </div>
    </div>
  );
}
