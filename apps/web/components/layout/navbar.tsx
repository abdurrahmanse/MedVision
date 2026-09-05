"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import { ChevronRight, History, Info, Menu, MessageSquare, Stethoscope, Upload, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";

const NAV_ITEMS = [
  { name: "Predict", href: "/predict", icon: Upload },
  { name: "History", href: "/history", icon: History },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: MessageSquare },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-gray-200/50 bg-white/70 shadow-sm backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/70"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo (Shared) */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-xl font-extrabold tracking-tight transition-opacity hover:opacity-90"
          >
            <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Stethoscope className="size-5" />
            </div>
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
              MedVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    )}
                  >
                    <item.icon className={cn("size-4 transition-transform group-hover:-translate-y-0.5", isActive ? "opacity-100" : "opacity-70")} />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="desktop-active-indicator"
                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm dark:bg-black/60 md:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 right-0 top-0 z-[70] w-4/5 max-w-sm border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800/50">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-6">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl p-4 transition-all",
                          isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "flex size-10 items-center justify-center rounded-xl transition-colors",
                            isActive 
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                              : "bg-white text-slate-500 shadow-sm dark:bg-slate-950 dark:text-slate-400"
                          )}>
                            <item.icon className="size-5" />
                          </div>
                          <span className="font-semibold">{item.name}</span>
                        </div>
                        <ChevronRight className={cn(
                          "size-5 transition-transform group-hover:translate-x-1",
                          isActive ? "text-blue-500 dark:text-blue-400" : "text-slate-300 dark:text-slate-600"
                        )} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="absolute bottom-8 left-6 right-6">
                 <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-center dark:border-blue-900/30 dark:bg-blue-900/10">
                   <p className="text-sm font-medium text-blue-800 dark:text-blue-300">MedVision Platform</p>
                   <p className="mt-1 text-xs text-blue-600/70 dark:text-blue-400/70">Educational &middot; Not for clinical use</p>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
