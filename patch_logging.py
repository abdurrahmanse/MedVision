with open('apps/api/app/core/logging.py', 'r') as f:
    content = f.read()
content = content.replace(r'replace("[", "\[").replace("]", "\]")', r'replace("[", r"\[").replace("]", r"\]")')
with open('apps/api/app/core/logging.py', 'w') as f:
    f.write(content)
