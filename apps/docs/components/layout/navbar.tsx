"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/60 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 font-bold tracking-tight hover:opacity-80 transition-opacity">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <LayoutDashboard size={18} />
          </div>
          <span className="text-xl hidden sm:inline-block tracking-tighter">{siteConfig.name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/docs" className="transition-colors hover:text-foreground">Documentation</Link>
          <a href={siteConfig.api} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">API Reference</a>
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/docs/getting-started"
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background shadow-sm transition hover:scale-105 hover:bg-foreground/90 sm:block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
