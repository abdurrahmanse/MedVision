"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { MotionReveal } from "components/ui/motion-reveal";
import { NeoButton } from "components/ui/neo-button";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <MotionReveal delay={0.1} direction="up" className="flex flex-col items-center">
        <div className="bg-red-400 border-[4px] sm:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] max-w-2xl w-full text-black mb-8 sm:mb-12 hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Application Error
          </h2>
          <p className="font-extrabold text-lg sm:text-xl opacity-90 mb-6 bg-black/10 p-4 rounded-xl">
            {error.message || "An unexpected error occurred during rendering."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <NeoButton onClick={() => reset()} variant="gray" className="w-full sm:w-auto px-6 py-3">
            <RefreshCcw className="w-5 h-5" /> Try Again
          </NeoButton>
          <NeoButton href="/" variant="blue" className="w-full sm:w-auto px-6 py-3">
            <Home className="w-5 h-5" /> Go Home
          </NeoButton>
        </div>
      </MotionReveal>
    </div>
  );
}
