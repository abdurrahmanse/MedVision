from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import FastAPI
from app.core.config import get_settings

settings = get_settings()

# Initialize rate limiter using Redis for distributed storage
# Fix: Ensure redis driver is specified if missing, though slowapi supports redis:// directly



redis_url = settings.redis_url
import os
from urllib.parse import urlparse, urlunparse
if not os.path.exists("/.dockerenv"):
    parsed = urlparse(redis_url)
    if parsed.hostname in ["cache", "localhost"]:
        netloc = "127.0.0.1"
        if parsed.port:
            netloc += f":{parsed.port}"
        else:
            netloc += ":6379"
        parsed = parsed._replace(netloc=netloc)
        redis_url = urlunparse(parsed)

if redis_url.startswith("redis://"):
    pass




try:
    limiter = Limiter(
        key_func=get_remote_address,
        storage_uri=redis_url,
        strategy="fixed-window"
    )
except Exception:
    # Fallback to memory if Redis is improperly formatted
    limiter = Limiter(key_func=get_remote_address)

def setup_rate_limiting(app: FastAPI):
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
