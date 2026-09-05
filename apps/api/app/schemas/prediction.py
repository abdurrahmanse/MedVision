from pydantic import BaseModel
from datetime import datetime

class PredictionResponse(BaseModel):
    id: str
    predicted_class: str
    confidence: float
    model_version: str
    created_at: datetime
    image_url: str

    class Config:
        from_attributes = True
