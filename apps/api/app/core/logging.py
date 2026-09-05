import logging
import sys
import uuid
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable
from pythonjsonlogger import jsonlogger
from rich.logging import RichHandler
from rich.console import Console
from app.core.config import get_settings

settings = get_settings()

# ─── Professional Logging Configuration ─────────────────────────────────────
logger = logging.getLogger("medvision")
logger.setLevel(logging.INFO)

# Remove any existing handlers
for handler in logger.handlers[:]:
    logger.removeHandler(handler)

if settings.environment == "production":
    # Structured JSON for Datadog / Cloud Logging in production
    log_handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        '%(asctime)s %(levelname)s %(name)s %(message)s'
    )
    log_handler.setFormatter(formatter)
    logger.addHandler(log_handler)
else:
    # Beautiful Rich terminal logging for development
    console = Console(color_system="truecolor", force_terminal=True)
    rich_handler = RichHandler(
        console=console, 
        show_time=True, 
        show_path=False, 
        markup=True,
        rich_tracebacks=True
    )
    # Simple formatter, let Rich handle the presentation
    rich_formatter = logging.Formatter("%(message)s")
    rich_handler.setFormatter(rich_formatter)
    logger.addHandler(rich_handler)

    # Hijack uvicorn access logs to also use Rich
    uvicorn_logger = logging.getLogger("uvicorn.access")
    for handler in uvicorn_logger.handlers[:]:
        uvicorn_logger.removeHandler(handler)
    uvicorn_logger.addHandler(rich_handler)


class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Intercepts all HTTP requests to generate a request_id and log telemetry.
    """
    async def dispatch(self, request: Request, call_next: Callable):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
        start_time = time.time()
        
        if settings.environment == "development":
            # Compact colorful log for dev
            logger.info(f"[bold blue]INBOUND[/bold blue] [cyan]{request.method}[/cyan] {request.url.path}")
        else:
            logger.info(
                "request received",
                extra={
                    "request_id": request_id,
                    "method": request.method,
                    "path": request.url.path
                }
            )
        
        try:
            response = await call_next(request)
            latency_ms = (time.time() - start_time) * 1000
            
            if settings.environment == "development":
                status_color = "green" if response.status_code < 400 else "red" if response.status_code >= 500 else "yellow"
                logger.info(f"[bold {status_color}]OUTBOUND[/bold {status_color}] [cyan]{request.method}[/cyan] {request.url.path} [bold]({response.status_code})[/bold] in {latency_ms:.2f}ms")
            else:
                logger.info(
                    "request completed",
                    extra={
                        "request_id": request_id,
                        "status_code": response.status_code,
                        "latency_ms": round(latency_ms, 2)
                    }
                )
            
            # Inject request ID into response for client tracking
            response.headers["X-Request-ID"] = request_id
            return response
            
        except Exception as e:
            latency_ms = (time.time() - start_time) * 1000
            if settings.environment == "development":
                logger.error(f"[bold red]FAILED[/bold red] [cyan]{request.method}[/cyan] {request.url.path} in {latency_ms:.2f}ms: {str(e).replace("[", r"\[").replace("]", r"\]")}")
            else:
                logger.error(
                    "request failed",
                    extra={
                        "request_id": request_id,
                        "error": str(e).replace("[", r"\[").replace("]", r"\]"),
                        "latency_ms": round(latency_ms, 2)
                    }
                )
            raise e
