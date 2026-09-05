export const docsNavLinks = [
  {
    text: "GitHub",
    url: "https://github.com/abdurrahmanse/MedVision",
    external: true,
  },
  {
    text: "Swagger UI",
    url: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/docs` : "http://localhost:8000/docs",
    external: true,
  },
];
