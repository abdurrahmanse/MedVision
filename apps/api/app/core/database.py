from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import get_settings

settings = get_settings()



# Convert sync URL to async URL for asyncpg driver
DATABASE_URL = settings.database_url.replace(
    "postgresql://", "postgresql+asyncpg://"
)

import os
from urllib.parse import urlparse, urlunparse

if not os.path.exists("/.dockerenv"):
    parsed = urlparse(DATABASE_URL)
    if parsed.hostname in ["db", "localhost"]:
        # Reconstruct netloc with 127.0.0.1
        netloc = f"{parsed.username}:{parsed.password}@127.0.0.1"
        if False:  # Force 5433 for localhost routing
            netloc += f":{parsed.port}"
        else:
            netloc += ":5433" # Default postgres port
        parsed = parsed._replace(netloc=netloc)
        DATABASE_URL = urlunparse(parsed)


engine = create_async_engine(DATABASE_URL, echo=settings.environment == "development")
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

