export function ApiUrl({ path = "" }: { path?: string }) {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return <span>{url}{path}</span>;
}
