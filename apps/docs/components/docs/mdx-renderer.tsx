import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ApiUrl } from "../api-url";

export function getMdxComponents(
  overrides?: Partial<MDXComponents>,
): MDXComponents {
  return {
    ...defaultMdxComponents,
    ApiUrl,
    ...overrides,
  } as MDXComponents;
}
