"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

// Initialize QueryClient outside component to avoid recreation
const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster 
            richColors 
            toastOptions={{ 
              className: "border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-bold rounded-xl" 
            }} 
          />
        </ThemeProvider>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
