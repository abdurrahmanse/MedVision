from fastapi import APIRouter

from app.api.v1.endpoints import health, model, predictions

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(model.router, prefix="/model", tags=["Model"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
