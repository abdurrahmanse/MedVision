// @ts-nocheck
import { default as __fd_glob_6 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_5 from "../content/docs/testing.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/ml-pipeline.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/architecture.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/api.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.doc("docs", "content/docs", {"api.mdx": __fd_glob_0, "architecture.mdx": __fd_glob_1, "getting-started.mdx": __fd_glob_2, "index.mdx": __fd_glob_3, "ml-pipeline.mdx": __fd_glob_4, "testing.mdx": __fd_glob_5, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_6, });