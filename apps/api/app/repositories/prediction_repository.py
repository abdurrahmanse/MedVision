from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.models.prediction import Prediction

class PredictionRepository:
    """
    Data Access Layer (Repository Pattern) for Predictions.
    Strictly handles database I/O (SQLAlchemy).
    """
    
    @staticmethod
    async def create(db: AsyncSession, prediction: Prediction) -> Prediction:
        db.add(prediction)
        await db.commit()
        await db.refresh(prediction)
        return prediction

    @staticmethod
    async def get_all(db: AsyncSession) -> List[Prediction]:
        result = await db.execute(select(Prediction).order_by(Prediction.created_at.desc()))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, prediction_id: str) -> Optional[Prediction]:
        result = await db.execute(select(Prediction).where(Prediction.id == prediction_id))
        return result.scalar_one_or_none()
