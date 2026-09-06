import re

with open("docker-compose.yml", "r") as f:
    content = f.read()

# For api
api_env = """    env_file:
      - .env
    environment:
      - DATABASE_URL=postgresql+asyncpg://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-medvision}
      - REDIS_URL=redis://cache:6379/0"""

content = re.sub(r"    env_file:\n      - \.env", api_env, content, count=1)

# For ml
ml_env = """    env_file:
      - .env
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-medvision}
      - REDIS_URL=redis://cache:6379/0"""

content = re.sub(r"    env_file:\n      - \.env", ml_env, content, count=1)

with open("docker-compose.yml", "w") as f:
    f.write(content)
