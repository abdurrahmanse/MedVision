import { AlertTriangle } from "lucide-react";
import { MotionReveal } from "./motion-reveal";

interface ErrorAlertProps {
  title?: string;
  message: string;
}

export function ErrorAlert({ title = "Error", message }: ErrorAlertProps) {
  return (
    <MotionReveal delay={0.1}>
      <div className="mt-6 sm:mt-10 p-4 sm:p-8 bg-red-400 border-[3px] sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-all">
        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
        <div>
          <h4 className="font-black text-lg sm:text-xl mb-1 sm:mb-2">{title}</h4>
          <p className="font-bold text-sm sm:text-base">{message}</p>
        </div>
      </div>
    </MotionReveal>
  );
}
