import os

files = {
    "apps/web/app/about/layout.tsx": "aboutMetadata",
    "apps/web/app/history/layout.tsx": "historyMetadata",
    "apps/web/app/predict/layout.tsx": "predictMetadata",
}

for filepath, meta_var in files.items():
    with open(filepath, "r") as f:
        content = f.read()
    
    import_statement = f'import {{ {meta_var} }} from "config/metadata";\n\n'
    
    start_idx = content.find("export const metadata")
    if start_idx != -1:
        end_idx = content.find("};", start_idx) + 2
        old_metadata = content[start_idx:end_idx]
        content = content.replace(old_metadata, f"export const metadata = {meta_var};")
        
    if 'import { Metadata } from "next";' in content:
        content = content.replace('import { Metadata } from "next";', import_statement)
    else:
        content = import_statement + content
        
    with open(filepath, "w") as f:
        f.write(content)

with open("apps/web/app/layout.tsx", "r") as f:
    content = f.read()

import_layout = 'import { siteMetadata } from "config/metadata";\n'
content = content.replace('import type { Metadata, Viewport } from "next";', 'import type { Metadata, Viewport } from "next";\n' + import_layout)

start_idx = content.find("export const metadata")
end_idx = content.find("};\n", start_idx) + 2
old_metadata = content[start_idx:end_idx]
content = content.replace(old_metadata, "export const metadata: Metadata = siteMetadata;")

with open("apps/web/app/layout.tsx", "w") as f:
    f.write(content)
