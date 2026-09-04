# MedVision Development — Phase 3: Frontend & User Interface

This document covers Phases 21 through 25 of the MedVision project, focusing on the Next.js web application and API integration.

## 1. Next.js Application Structure (Phase 21)
- **Goal:** Build the user-facing web interface.
- **Pages:** Create `/` (Home), `/predict`, `/history`, and `/about`.
- **Predict UI:** Implement an interface to upload an image, preview it, trigger the prediction, show a loading state, and display the result (Prediction, Confidence, Model version, Timestamp).
- **Important:** Always include the educational/non-clinical disclaimer on the UI.

## 2. Frontend Data Layer (Phase 22)
- **Goal:** Keep HTTP logic out of React components.
- **Implementation:** Create a typed API client in `src/lib/api-client.ts`. Use TanStack Query (React Query) to manage server state. Define strict TypeScript types based on the FastAPI response contracts.

## 3. Prediction History Page (Phase 23)
- **Goal:** Display a list of past predictions fetched from the backend.
- **Features:** Show the image thumbnail, prediction, confidence, version, and date. Implement pagination, loading, empty, and error states.

## 4. Frontend UX States (Phase 24)
- **Goal:** Ensure a robust user experience that handles failures gracefully.
- **States to Implement:** Idle, Uploading, Predicting, Success, Validation Error (e.g., file too large), API Error, Network Error, and Empty History.

## 5. API Error Contract (Phase 25)
- **Goal:** Standardize how the backend communicates errors to the frontend.
- **Implementation:** Ensure the API returns structured error codes (e.g., `INVALID_IMAGE`, `FILE_TOO_LARGE`) so the frontend can display specific, helpful error messages to the user.

