"use client";

import { motion } from "framer-motion";

const STACK = [
  { name: "Next.js", src: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "FastAPI", src: "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg" },
  { name: "PyTorch", src: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg" },
  { name: "PostgreSQL", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { name: "Docker", src: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
  { name: "Turborepo", src: "https://avatars.githubusercontent.com/u/101892801?s=200&v=4" },
];

export function TechStack() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 dark:bg-muted/10">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Powered by enterprise technologies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
          {STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <img 
                src={tech.src} 
                alt={tech.name} 
                className={`h-8 w-auto object-contain ${tech.name === "Next.js" ? "dark:invert" : ""}`} 
              />
              <span className="font-semibold text-foreground tracking-tight">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
