import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMdxComponents(
  overrides?: Partial<MDXComponents>,
): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...overrides,
  } as MDXComponents;
}
