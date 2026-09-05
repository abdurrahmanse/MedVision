from fastapi import Request
from fastapi.responses import JSONResponse

class APIError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400):
        self.code = code
        self.message = message
        self.status_code = status_code

async def api_error_handler(request: Request, exc: APIError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message
            }
        }
    )


from fastapi.responses import JSONResponse
import traceback

async def global_exception_handler(request, exc: Exception):
    # Log it explicitly if needed, but LoggingMiddleware will also see a 500
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "An unexpected internal error occurred."}}
    )
