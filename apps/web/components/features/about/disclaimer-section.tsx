import { ShieldAlert } from "lucide-react"

export function DisclaimerSection() {
  return (
    <section className="bg-red-400 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 text-black flex items-center gap-2 sm:gap-3 tracking-tighter">
        <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10" />
        Disclaimer
      </h2>
      <p className="text-black font-extrabold text-lg sm:text-xl lg:text-2xl leading-relaxed">
        This system is completely unfit for medical diagnosis. It is trained on an artificially small dataset 
        for educational purposes. Do not use this application to make healthcare decisions.
      </p>
    </section>
  )
}
