import { FeatureCard } from "@/components/ui/feature-card";

const FEATURES = [
  {
    icon: "🧠",
    label: "PyTorch TinyCNN",
    description: "Binary classification of chest X-rays",
  },
  {
    icon: "⚡",
    label: "FastAPI + uv",
    description: "Async ASGI server with structured logging",
  },
  {
    icon: "🗄️",
    label: "PostgreSQL",
    description: "Persistent prediction history with Alembic",
  },
  {
    icon: "🐳",
    label: "Docker Compose",
    description: "One-command full-stack deployment",
  },
  {
    icon: "🔒",
    label: "Rate Limited",
    description: "5 req/min per IP via SlowAPI",
  },
  {
    icon: "📊",
    label: "Structured Logs",
    description: "JSON telemetry with request_id tracing",
  },
  {
    icon: "🧪",
    label: "Fully Tested",
    description: "Pytest, Vitest & Playwright suites",
  },
  {
    icon: "📦",
    label: "Turborepo",
    description: "Monorepo with pnpm workspace caching",
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 pb-28 sm:grid-cols-4">
      {FEATURES.map((f) => (
        <FeatureCard key={f.label} {...f} />
      ))}
    </section>
  );
}
