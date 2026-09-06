with open("docker-compose.yml", "r") as f:
    lines = f.readlines()

new_lines = []
in_api = False
in_ml = False

for line in lines:
    if line.strip() == "api:":
        in_api = True
    elif line.strip() == "web:":
        in_api = False
    elif line.strip() == "ml:":
        in_ml = True
    elif line.strip() == "docs:":
        in_ml = False
    
    new_lines.append(line)
    
    if line.strip() == "- .env":
        if in_api:
            new_lines.append("    environment:\n")
            new_lines.append("      - DATABASE_URL=postgresql+asyncpg://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-medvision}\n")
            new_lines.append("      - REDIS_URL=redis://cache:6379/0\n")
        elif in_ml:
            new_lines.append("    environment:\n")
            new_lines.append("      - DATABASE_URL=postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-medvision}\n")
            new_lines.append("      - REDIS_URL=redis://cache:6379/0\n")

with open("docker-compose.yml", "w") as f:
    f.writelines(new_lines)
