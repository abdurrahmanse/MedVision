# System Architecture

MedVision is designed as a modular, containerized enterprise application using a classic 3-tier architecture.

## High-Level Architecture Diagram

```text
                  ┌──────────────┐
                  │   Next.js    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   FastAPI    │
                  └──────┬───────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
         ML Model    PostgreSQL   Storage
             │
             ▼
       Prediction
```

## Complete Data Flow

1. **Client Interaction (Next.js)**
   - The user selects a chest X-ray image (JPEG/PNG) in the browser via the Next.js frontend running on port 3000.
   - The frontend validates the file size and type client-side, generates a preview, and constructs a `multipart/form-data` payload.
   - The user submits the form, which sends an HTTP POST request to the backend.

2. **API Ingestion (FastAPI)**
   - The FastAPI backend (running on port 8000) receives the request at `POST /api/v1/predictions`.
   - The `SlowAPI` rate limiter checks if the IP has exceeded the 5 requests/minute quota.
   - A unique `request_id` is assigned by the `LoggingMiddleware` for distributed tracing.

3. **Storage & Validation Layer (ImageService)**
   - The `PredictionService` delegates the raw upload to the `ImageService`.
   - The `ImageService` verifies the MIME type, ensures the file is under the 5MB limit, and writes the file to the local `/storage/images/` volume with a secure, UUID-based filename.

4. **Inference (ML Model)**
   - The saved file path is passed to the `PneumoniaPredictor` singleton.
   - The predictor loads the image, resizes it to 224x224, converts it to grayscale, normalizes the tensor, and passes it through the PyTorch TinyCNN model.
   - The model outputs logits, which are converted to a softmax probability (confidence) and a binary classification (Pneumonia vs. Normal).

5. **Persistence (PostgreSQL)**
   - The `PredictionService` collects the inference results (prediction, confidence, file path, processing time, and model version).
   - It delegates persistence to the `PredictionRepository`, which uses SQLAlchemy to insert a new `Prediction` record into the PostgreSQL database.

6. **Response & UI Update**
   - The backend serializes the prediction record using Pydantic schemas and returns a 200 OK JSON response.
   - The Next.js frontend receives the JSON, updates its React state, and renders the success UI, displaying the diagnosis and confidence score to the user.

