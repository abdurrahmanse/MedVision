# MedVision Development — Phase 4: DevOps, Testing & Prompts

This document covers Phases 26 through 48 of the MedVision project, ensuring the application is production-ready, testable, and secure.

## 1. Testing Suite (Phases 26-28)
- **Backend Tests:** Test health endpoints, invalid image uploads, oversized files, and database persistence using `pytest`. Test ML model loading and preprocessing shape.
- **Frontend Tests:** Test upload component states, validation, error rendering, and history loading.
- **E2E Test:** Validate the entire flow: Open UI → Upload Image → Predict → Backend processes → DB stores → Result displays. This is the most critical test.

## 2. Docker & Configuration (Phases 29-30)
- **Docker:** Create a `docker-compose.yml` to containerize Next.js, FastAPI, and PostgreSQL. Ensure `docker compose up` brings up the whole environment.
- **Configuration:** Create a `.env.example` mapping out variables like `DATABASE_URL`, `MODEL_PATH`, and `STORAGE_PATH`. Never commit real secrets.

## 3. Logging, Monitoring & Security (Phases 31-33)
- **Logging:** Log request IDs, latency, model versions, and errors.
- **Security:** Enforce file size limits, safe MIME types, CORS restrictions, and input validation. Ensure no real patient data is collected or exposed.

## 4. Final Review & Documentation (Phases 36, 38-39)
- **README:** Ensure the README clearly defines the problem, architecture, run instructions, and strictly states the educational, non-clinical limitations of the project.
- **Refactor:** Remove duplicated code, notebook-only logic, hard-coded paths, and debug prints.

## 5. Using the Master Prompts (Phases 41-45)
- **Workflow:** Do **not** build the entire system at once. Use the phase-specific prompts listed in `MedVision.md` (e.g., "Prompt 01 — Dataset Setup", "Prompt 11 — FastAPI") to iteratively build the project step-by-step.
- **Golden Rule:** Do not increase the dataset size (keep it at 100 images) until the *entire* pipeline from data to Next.js UI is completely functional.

