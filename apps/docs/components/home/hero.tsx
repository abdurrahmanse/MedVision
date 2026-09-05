"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
      {/* Enhanced Premium Glow Effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-background to-background" />
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] opacity-40 mix-blend-screen" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-md transition-all hover:bg-blue-500/20">
            <Sparkles className="size-4 text-blue-500" />
            <span>Educational platform — Not for clinical use</span>
          </div>
        </motion.div>

        <motion.h1
          className="mb-8 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl text-foreground drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Diagnose with <br className="hidden sm:block" />
          <span className="bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Intelligence
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          An enterprise-grade, end-to-end platform demonstrating PyTorch CNN pneumonia detection deployed within a production FastAPI & Next.js ecosystem.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/docs"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 text-base font-semibold text-background transition-all hover:scale-105 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/10 sm:w-auto"
          >
            Start Exploring
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={siteConfig.swagger}
            target="_blank"
            rel="noreferrer"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background/50 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-muted sm:w-auto"
          >
            <Terminal className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            Try the API
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
