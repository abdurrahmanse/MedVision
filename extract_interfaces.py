import re
import glob

files = glob.glob("apps/web/components/**/*.tsx", recursive=True)

types_file_content = """import React, { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { PredictionResult } from "@/types";

"""

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()
    
    # Find interface block
    # Simple regex to capture interface until the closing brace
    # Assuming interfaces are well-formed and don't have nested complex braces that break simple parsing
    match = re.search(r'(export )?interface (\w+Props).*?\{.*?\n\}', content, re.DOTALL)
    if match:
        interface_block = match.group(0)
        interface_name = match.group(2)
        
        # Ensure it's exported in the types file
        if not interface_block.startswith("export "):
            exported_block = "export " + interface_block
        else:
            exported_block = interface_block
            
        types_file_content += exported_block + "\n\n"
        
        # Replace in original file
        new_content = content.replace(interface_block, f'import {{ {interface_name} }} from "@/types/components";')
        
        with open(filepath, "w") as f:
            f.write(new_content)

with open("apps/web/types/components.ts", "w") as f:
    f.write(types_file_content)

