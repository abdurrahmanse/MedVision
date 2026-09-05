import json
import redis.asyncio as redis
from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()

redis_client = None

async def init_redis():
    global redis_client
    if not redis_client:
        try:
            # When testing locally outside docker, fallback to localhost if db host isn't 'localhost'
            url = settings.redis_url
            if settings.environment == "development" and "cache" in url:
                url = url.replace("cache", "localhost")
                
            redis_client = redis.from_url(url, encoding="utf-8", decode_responses=True)
            await redis_client.ping()
            logger.info("Connected to Redis successfully.")
        except Exception as e:
            logger.warning(f"Failed to connect to Redis: {e}. Caching will be disabled.")
            redis_client = None

async def get_redis_client():
    if not redis_client:
        await init_redis()
    return redis_client

async def close_redis():
    global redis_client
    if redis_client:
        await redis_client.aclose()
        redis_client = None
