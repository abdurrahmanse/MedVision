export const siteConfig = {
  name: "MedVision",
  description:
    "Enterprise-grade pneumonia detection platform — documentation, API reference, and architecture guides.",
  url: "http://localhost:3001",
  github: "https://github.com/abdurrahmanse/MedVision",
  swagger: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/docs`,
  api: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};

export type SiteConfig = typeof siteConfig;
