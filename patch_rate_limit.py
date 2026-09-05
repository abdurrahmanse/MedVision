with open("apps/api/app/core/rate_limit.py", "r") as f:
    content = f.read()

new_logic = """
redis_url = settings.redis_url
if settings.environment == "development" and "cache" in redis_url:
    redis_url = redis_url.replace("cache", "localhost")

if redis_url.startswith("redis://"):
    pass
"""

content = content.replace('redis_url = settings.redis_url\nif redis_url.startswith("redis://"):\n    # Limits requires redis://\n    pass', new_logic)

with open("apps/api/app/core/rate_limit.py", "w") as f:
    f.write(content)
