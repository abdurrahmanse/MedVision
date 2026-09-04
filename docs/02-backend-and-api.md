# MedVision Development — Phase 2: Backend API & Database

This document covers Phases 15 through 20 of the MedVision project, guiding you through serving the ML model via a robust FastAPI backend.

## 1. Standalone Inference Module (Phase 15)
- **Goal:** Create an inference boundary between Data Science and Backend Engineering.
- **Deliverable:** `ml/src/inference/predict.py`. It must load the model *once* on startup, apply identical preprocessing, and return a JSON contract with `predicted_class`, `confidence`, and `model_version`.

## 2. FastAPI Foundation (Phase 16)
- **Goal:** Set up the backend routing and structure separate from ML logic.
- **Endpoints:** Create standard endpoints (`GET /api/v1/health`, `GET /api/v1/model`).
- **Structure:** Organize the API into `routes/`, `services/`, `schemas/`, and `core/`.

## 3. Image Upload API (Phase 17)
- **Goal:** Handle incoming image predictions.
- **Endpoint:** `POST /api/v1/predictions` accepting `multipart/form-data`.
- **Flow:** Validate File → Store File → Preprocess → Run Inference → Save to DB → Return JSON response.

## 4. PostgreSQL Database (Phase 18)
- **Goal:** Store prediction metadata. Do **not** store image binaries in the database.
- **Schema:** Create a `predictions` table containing `id`, `image_url`, `predicted_class`, `confidence`, `model_version`, and `created_at`.

## 5. Alembic Migrations (Phase 19)
- **Goal:** Version control the database schema.
- **Deliverable:** Generate and apply Alembic migrations so a new developer can create the database from scratch (`alembic upgrade head`).

## 6. Object Storage (Phase 20)
- **Goal:** Handle the physical image files safely.
- **Implementation:** Start with local storage for development. Build an abstraction that takes an image from FastAPI, saves it locally, and returns a URL to store in PostgreSQL.

