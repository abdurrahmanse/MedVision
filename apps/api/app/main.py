import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.logging import LoggingMiddleware, logger
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.redis import init_redis, close_redis
from app.ml.predict import PneumoniaPredictor
from app.core.errors import APIError, api_error_handler, global_exception_handler
from app.core.rate_limit import setup_rate_limiting, limiter

settings = get_settings()

def resolve_path(path: str) -> str:
    """Helper to resolve paths correctly whether running from root or apps/api."""
    if os.path.exists(path) or os.path.isabs(path):
        return os.path.abspath(path)
    # Fallback: assume path is relative to the repository root, but we are in apps/api
    root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
    if path.startswith("./"):
        return os.path.join(root_path, path[2:])
    return os.path.join(root_path, path)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info(f"MedVision API starting in '{settings.environment}' mode...")
    
    # Initialize Redis connection
    await init_redis()
    
    logger.info("Loading ML model into memory...")
    # Resolve the model path safely
    model_file_path = resolve_path(settings.model_path)
    models_dir = os.path.dirname(model_file_path)
    os.makedirs(models_dir, exist_ok=True)
    app.state.predictor = PneumoniaPredictor(models_dir=models_dir)
    
    # Ensure storage directory exists
    storage_dir = resolve_path(settings.storage_path)
    os.makedirs(storage_dir, exist_ok=True)
    yield
    # Shutdown
    logger.info("MedVision API shutting down...")
    await close_redis()

app = FastAPI(
    title="MedVision API",
    description="Educational Pneumonia Detection API — NOT for clinical use.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_exception_handler(APIError, api_error_handler)
app.add_exception_handler(Exception, global_exception_handler)
setup_rate_limiting(app)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LoggingMiddleware)

# Mount Static Files dynamically from settings
storage_dir = resolve_path(settings.storage_path)
os.makedirs(storage_dir, exist_ok=True)
app.mount("/storage/uploads", StaticFiles(directory=storage_dir), name="uploads")

# Register API routes
app.include_router(api_router, prefix="/api/v1")
