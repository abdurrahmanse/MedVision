path = "apps/web/app/history/[id]/page.tsx"
with open(path, "r") as f:
    content = f.read()

content = content.replace("process.env.NEXT_PUBLIC_API_URL", "(process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL)")

with open(path, "w") as f:
    f.write(content)
