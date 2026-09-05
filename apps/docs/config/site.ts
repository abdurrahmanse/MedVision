export const siteConfig = {
  name: "MedVision",
  description:
    "Enterprise-grade pneumonia detection platform — documentation, API reference, and architecture guides.",
  url: "http://localhost:3001",
  github: "https://github.com/abdurrahmanse/MedVision",
  swagger: "http://localhost:8000/docs",
  api: "http://localhost:8000",
} as const;

export type SiteConfig = typeof siteConfig;
