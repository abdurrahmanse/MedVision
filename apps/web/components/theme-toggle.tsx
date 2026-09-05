"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all dark:-rotate-90 dark:scale-0 text-gray-600 dark:text-gray-300" />
      <Moon className="absolute h-5 w-5 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-gray-600 dark:text-gray-300" />
    </button>
  );
}
