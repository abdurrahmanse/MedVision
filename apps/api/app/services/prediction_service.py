import time
import json
from PIL import Image
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.encoders import jsonable_encoder

from app.models.prediction import Prediction
from app.repositories.prediction_repository import PredictionRepository
from app.core.errors import APIError
from app.core.logging import logger
from app.core.redis import get_redis_client

CACHE_KEY_ALL = "predictions:all"

class PredictionService:
    """
    Business Logic Layer.
    Strictly handles orchestrating ML inference, mapping data, and Redis caching.
    """
    
    @staticmethod
    async def run_inference_and_save(
        db: AsyncSession,
        predictor,
        pil_image: Image.Image,
        prediction_id: str,
        image_url: str,
        request_id: str = "unknown"
    ) -> Prediction:
        if not predictor:
            raise APIError(code="MODEL_UNAVAILABLE", message="The inference model is currently unavailable.", status_code=503)

        logger.info("prediction started", extra={
            "request_id": request_id,
            "prediction_id": prediction_id
        })
        start_time = time.time()

        # 1. Execute Machine Learning Inference
        try:
            ml_result = predictor.predict(pil_image)
            latency_ms = (time.time() - start_time) * 1000
            
            logger.info("prediction completed", extra={
                "request_id": request_id,
                "prediction_id": prediction_id,
                "model_version": ml_result['model_version'],
                "latency_ms": round(latency_ms, 2)
            })
            
        except Exception as e:
            latency_ms = (time.time() - start_time) * 1000
            logger.error("prediction failed", extra={
                "request_id": request_id,
                "prediction_id": prediction_id,
                "error": str(e),
                "latency_ms": round(latency_ms, 2)
            })
            raise APIError(code="PREDICTION_FAILED", message=f"ML Inference failed: {str(e)}", status_code=500)
            
        # 2. Construct Domain Model
        db_pred = Prediction(
            id=prediction_id,
            image_url=image_url,
            predicted_class=ml_result["predicted_class"],
            confidence=ml_result["confidence"],
            model_version=ml_result["model_version"]
        )
        
        # 3. Delegate to Repository for Persistence
        try:
            record = await PredictionRepository.create(db, db_pred)
            
            # 4. Invalidate Cache
            redis_client = await get_redis_client()
            if redis_client:
                await redis_client.delete(CACHE_KEY_ALL)
                
            return record
        except Exception as e:
            await db.rollback()
            print(f"DB ERROR: {str(e)}"); logger.error("database operation failed", extra={
                "request_id": request_id,
                "prediction_id": prediction_id,
                "error": str(e)
            })
            raise APIError(code="DATABASE_ERROR", message="Failed to save prediction record.", status_code=500)

    @staticmethod
    async def get_all_predictions(db: AsyncSession, request_id: str = "unknown"):
        # 1. Check Redis Cache
        redis_client = await get_redis_client()
        if redis_client:
            cached_data = await redis_client.get(CACHE_KEY_ALL)
            if cached_data:
                logger.info("cache hit", extra={"request_id": request_id, "key": CACHE_KEY_ALL})
                return json.loads(cached_data)
                
        # 2. Fetch from PostgreSQL
        try:
            records = await PredictionRepository.get_all(db)
            encoded_records = jsonable_encoder(records)
            
            # 3. Store in Redis Cache
            if redis_client:
                await redis_client.set(CACHE_KEY_ALL, json.dumps(encoded_records), ex=300) # 5 min expiry
                
            return records
        except Exception as e:
            print(f"DB ERROR: {str(e)}"); logger.error("database operation failed", extra={
                "request_id": request_id,
                "error": str(e)
            })
            raise APIError(code="DATABASE_ERROR", message="Failed to fetch history.", status_code=500)

    @staticmethod
    async def get_prediction_by_id(db: AsyncSession, prediction_id: str, request_id: str = "unknown"):
        # We can also cache individual items if needed
        cache_key = f"prediction:{prediction_id}"
        redis_client = await get_redis_client()
        
        if redis_client:
            cached_data = await redis_client.get(cache_key)
            if cached_data:
                logger.info("cache hit", extra={"request_id": request_id, "key": cache_key})
                return json.loads(cached_data)

        try:
            pred = await PredictionRepository.get_by_id(db, prediction_id)
        except Exception as e:
            print(f"DB ERROR: {str(e)}"); logger.error("database operation failed", extra={
                "request_id": request_id,
                "prediction_id": prediction_id,
                "error": str(e)
            })
            raise APIError(code="DATABASE_ERROR", message="Database query failed.", status_code=500)
            
        if not pred:
            raise APIError(code="NOT_FOUND", message="Prediction not found", status_code=404)
            
        if redis_client:
            await redis_client.set(cache_key, json.dumps(jsonable_encoder(pred)), ex=3600) # 1 hr expiry
            
        return pred
