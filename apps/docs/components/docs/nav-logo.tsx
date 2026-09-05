import { siteConfig } from "@/config/site";

export function NavLogo() {
  return (
    <span className="font-bold text-blue-600">
      {siteConfig.name}{" "}
      <span className="font-normal text-foreground/50">Docs</span>
    </span>
  );
}
