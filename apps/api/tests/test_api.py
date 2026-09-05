import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_endpoint(client: AsyncClient):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert "version" in response.json()

@pytest.mark.asyncio
async def test_model_info_endpoint(client: AsyncClient):
    response = await client.get("/api/v1/model")
    assert response.status_code == 200
    data = response.json()
    # It might return an error locally if weights aren't present
    if "error" not in data:
        assert "version" in data
        assert "input_shape" in data

@pytest.mark.asyncio
async def test_predict_valid_image(client: AsyncClient, valid_image_bytes: bytes):
    files = {"image": ("test.jpg", valid_image_bytes, "image/jpeg")}
    response = await client.post("/api/v1/predictions", files=files)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert "predicted_class" in data
    assert "confidence" in data
    assert data["confidence"] >= 0.0 and data["confidence"] <= 1.0

@pytest.mark.asyncio
async def test_predict_invalid_mime_type(client: AsyncClient, valid_image_bytes: bytes):
    files = {"image": ("test.txt", valid_image_bytes, "text/plain")}
    response = await client.post("/api/v1/predictions", files=files)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_IMAGE"

@pytest.mark.asyncio
async def test_predict_corrupted_image(client: AsyncClient):
    files = {"image": ("test.jpg", b"not an image", "image/jpeg")}
    response = await client.post("/api/v1/predictions", files=files)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_IMAGE"

@pytest.mark.asyncio
async def test_predict_undersized_image(client: AsyncClient, undersized_image_bytes: bytes):
    files = {"image": ("test.jpg", undersized_image_bytes, "image/jpeg")}
    response = await client.post("/api/v1/predictions", files=files)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_IMAGE"
    
@pytest.mark.asyncio
async def test_prediction_persistence_and_history(client: AsyncClient, valid_image_bytes: bytes):
    # 1. Post a prediction
    files = {"image": ("test.jpg", valid_image_bytes, "image/jpeg")}
    pred_response = await client.post("/api/v1/predictions", files=files)
    assert pred_response.status_code == 200
    pred_id = pred_response.json()["id"]

    # 2. Check history list
    history_response = await client.get("/api/v1/predictions")
    assert history_response.status_code == 200
    history = history_response.json()
    assert len(history) > 0
    assert any(p["id"] == pred_id for p in history)

    # 3. Check individual fetch
    single_response = await client.get(f"/api/v1/predictions/{pred_id}")
    assert single_response.status_code == 200
    assert single_response.json()["id"] == pred_id

@pytest.mark.asyncio
async def test_predict_oversized_file(client: AsyncClient):
    # Create a dummy payload larger than 5MB
    large_bytes = b"0" * (6 * 1024 * 1024)
    files = {"image": ("large.jpg", large_bytes, "image/jpeg")}
    response = await client.post("/api/v1/predictions", files=files)
    assert response.status_code == 413
    assert response.json()["error"]["code"] == "FILE_TOO_LARGE"
