import pytest
import pytest_asyncio
import asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os
import io
from PIL import Image

from app.main import app
from app.core.database import Base, get_db

# Setup an in-memory SQLite database for testing
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestingSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

async def override_get_db():
    async with TestingSessionLocal() as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest_asyncio.fixture(autouse=True)
async def prepare_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

class MockPredictor:
    def predict(self, image: Image.Image) -> dict:
        return {
            "predicted_class": "Pneumonia",
            "confidence": 0.95,
            "model_version": "v1-mock"
        }

@pytest_asyncio.fixture(autouse=True)
def mock_app_state_predictor():
    app.state.limiter.enabled = False
    app.state.predictor = MockPredictor()

@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def valid_image_bytes():
    img = Image.new('RGB', (100, 100), color = 'white')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    return img_byte_arr.getvalue()

@pytest.fixture
def undersized_image_bytes():
    img = Image.new('RGB', (20, 20), color = 'white')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    return img_byte_arr.getvalue()





from unittest.mock import AsyncMock, patch

@pytest.fixture(autouse=True)
def mock_redis():
    with patch("app.services.prediction_service.get_redis_client", new_callable=AsyncMock, return_value=None):
        yield
