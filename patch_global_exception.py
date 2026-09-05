with open("apps/api/app/core/errors.py", "r") as f:
    content = f.read()

new_handler = """
from fastapi.responses import JSONResponse
import traceback

async def global_exception_handler(request, exc: Exception):
    # Log it explicitly if needed, but LoggingMiddleware will also see a 500
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "An unexpected internal error occurred."}}
    )
"""

if "global_exception_handler" not in content:
    with open("apps/api/app/core/errors.py", "w") as f:
        f.write(content + "\n" + new_handler)
