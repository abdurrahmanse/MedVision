"use client";

import { motion } from "framer-motion";
import { BookOpen, TerminalSquare, AppWindow, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const VIEWS = [
  {
    title: "Documentation",
    description: "Read the comprehensive guides on architecture, ML pipeline, and full-stack integration.",
    icon: BookOpen,
    href: "/docs",
    gradient: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "API Reference",
    description: "Explore the FastAPI Swagger UI and integrate with the AI inference endpoints.",
    icon: TerminalSquare,
    href: siteConfig.swagger,
    external: true,
    gradient: "from-amber-500/20 to-amber-500/0",
    iconColor: "text-amber-500",
    border: "group-hover:border-amber-500/50",
  },
  {
    title: "Web Platform",
    description: "Experience the Next.js frontend application natively on port 3000.",
    icon: AppWindow,
    href: "http://localhost:3000",
    external: true,
    gradient: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-500",
    border: "group-hover:border-emerald-500/50",
  },
];

export function ViewsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">Platform Entry Points</h2>
        <p className="text-lg text-muted-foreground">Navigate directly to the different layers of the MedVision ecosystem.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {VIEWS.map((view, i) => {
          const content = (
            <div className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${view.border}`}>
              <div className={`absolute left-0 top-0 h-32 w-full bg-gradient-to-b opacity-50 transition-opacity group-hover:opacity-100 ${view.gradient}`} />
              
              <div className="relative z-10">
                <div className={`mb-6 inline-flex rounded-2xl bg-background/50 p-3 shadow-sm ring-1 ring-border backdrop-blur-md ${view.iconColor}`}>
                  <view.icon size={28} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-card-foreground tracking-tight">{view.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{view.description}</p>
              </div>

              <div className="relative z-10 mt-8 flex items-center font-medium text-sm text-foreground">
                <span className="group-hover:underline underline-offset-4 decoration-border">Explore module</span>
                {view.external ? (
                  <ArrowUpRight className="ml-1 size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                ) : (
                  <ArrowUpRight className="ml-1 size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 rotate-45" />
                )}
              </div>
            </div>
          );

          return (
            <motion.div
              key={view.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              {view.external ? (
                <a href={view.href} target="_blank" rel="noreferrer" className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
                  {content}
                </a>
              ) : (
                <Link href={view.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
                  {content}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
