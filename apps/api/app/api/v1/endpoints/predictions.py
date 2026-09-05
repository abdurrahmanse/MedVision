from typing import List
from fastapi import APIRouter, File, UploadFile, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.prediction import PredictionResponse
from app.services.image_service import ImageService
from app.services.prediction_service import PredictionService

from app.core.rate_limit import limiter

router = APIRouter()

@router.post("", response_model=PredictionResponse)
@limiter.limit("5/minute")
async def create_prediction(
    request: Request, 
    image: UploadFile = File(...), 
    db: AsyncSession = Depends(get_db)
):
    """
    Upload a chest X-ray image, run it through the Pneumonia CNN, and store the result.
    """
    request_id = getattr(request.state, "request_id", "unknown")
    
    # 1. Validate and store the image
    pil_image, image_url, prediction_id = await ImageService.process_upload(image)
    
    # 2. Run inference and save to database
    predictor = request.app.state.predictor
    db_pred = await PredictionService.run_inference_and_save(
        db=db,
        predictor=predictor,
        pil_image=pil_image,
        prediction_id=prediction_id,
        image_url=image_url,
        request_id=request_id
    )
    
    return db_pred

@router.get("", response_model=List[PredictionResponse])
@limiter.limit("30/minute")
async def get_predictions(request: Request, db: AsyncSession = Depends(get_db)):
    """
    Retrieve the historical inference log, ordered by newest first.
    """
    request_id = getattr(request.state, "request_id", "unknown")
    return await PredictionService.get_all_predictions(db, request_id)

@router.get("/{id}", response_model=PredictionResponse)
async def get_prediction(id: str, request: Request, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a specific prediction record by its UUID.
    """
    request_id = getattr(request.state, "request_id", "unknown")
    return await PredictionService.get_prediction_by_id(db, id, request_id)
