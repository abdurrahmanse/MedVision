#!/bin/bash
set -e

# Run database migrations
echo "Running Alembic migrations..."
uv run alembic upgrade head

# Start the application
echo "Starting FastAPI on port ${PORT:-8000}..."
exec uv run uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
