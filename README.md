# MedVision — Tiny Healthcare ML Full-Stack Platform 🩻

> **🚨 IMPORTANT DISCLAIMER:** This is strictly an engineering and educational learning project, not a medical or clinical diagnostic system. The model and its predictions must **never** be presented as a tool for diagnosing pneumonia or making any treatment decisions.

**MedVision** is a lightweight, end-to-end full-stack Machine Learning project designed to demonstrate how to build, deploy, and serve a deep learning image classifier. It integrates a Convolutional Neural Network (CNN) with a modern web application, showcasing the complete lifecycle from data processing to a user-facing application.

## 📖 Problem Statement

The goal of this project is to implement a complete ML-to-production pipeline using a miniature system. It demonstrates how to train a model on a reproducible dataset, serve it via a robust API, store prediction metadata, and provide a seamless web interface for interaction.

## 📊 Dataset

This project uses **PneumoniaMNIST**, a lightweight biomedical image classification dataset provided by [MedMNIST](https://medmnist.com/). 
- **Modality:** Chest X-Ray
- **Task:** Binary Classification (Normal vs. Pneumonia)
- **Constraint:** We use a tiny, reproducible subset (e.g., 100 images) with a fixed random seed.
- **License/Usage:** Intended strictly for research and educational purposes.

## 🏗️ Architecture

The project is structured as a monorepo (using Turborepo) to separate ML experimentation, API routing, and frontend code while sharing types and configurations.

```text
                  ┌──────────────┐
                  │   Next.js    │ (Web Frontend)
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   FastAPI    │ (Backend API)
                  └──────┬───────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
         ML Model    PostgreSQL   Storage
             │
             ▼
       Prediction Result
```

## 🧠 Machine Learning (ML)

- **Framework:** PyTorch
- **Preprocessing:** Minimal transformations (image → tensor → normalization).
- **Models:** Includes a baseline (Logistic Regression) and a tiny custom CNN for binary output.
- **Evaluation:** Evaluated on a separate validation split for accuracy, precision, recall, and F1-score. Includes a dedicated error analysis phase.
- **Artifacts:** Models are packaged with metadata (version, input size, class mapping) for robust inference.

## 🔌 API (FastAPI)

A standalone backend service handling image uploads and model inference.
- **Endpoints:**
  - `GET /api/v1/health`
  - `GET /api/v1/model`
  - `POST /api/v1/predictions` (Handles multipart form-data image uploads)
  - `GET /api/v1/predictions`
  - `GET /api/v1/predictions/{id}`
- **Flow:** Image Upload → Validation → Storage → Preprocessing → Inference → Database Persistence.

## 💻 Frontend (Next.js)

A React-based web application providing a clean UI for end-users.
- **Pages:** Home, Predict (upload & preview), History (past predictions).
- **Tech:** TypeScript, Tailwind CSS, TanStack Query.
- **UX:** Handles all states securely, including uploading, processing, success, and structured API/network errors.

## 🗄️ Database & Storage

- **Database:** PostgreSQL (managed via Alembic migrations) stores prediction metadata (ID, image URL, predicted class, confidence, model version, timestamp).
- **Storage:** Images are stored in an object storage abstraction (local storage or S3-compatible) to keep binary files out of the relational database.

## 🚀 Run Locally

### Prerequisites
- Node.js (v18+) and pnpm (v8+)
- Python (modern version compatible with PyTorch)
- Docker & Docker Compose (for database and containerized local running)

### Setup & Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MedVision.git
   cd MedVision
   ```
2. **Install frontend/monorepo dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in the required values (Database URL, Storage paths).
4. **Start the database (Docker):**
   ```bash
   docker compose up -d
   ```
5. **Run the development servers:**
   ```bash
   pnpm dev
   ```

## 🧪 Testing

- **Backend/API:** Use `pytest` to test endpoints, file validations, prediction logic, and database persistence.
- **Frontend:** Component testing for upload states, history rendering, and error handling.
- **Run tests:**
  *(Add your specific test script commands here, e.g., `pnpm test` or `pytest`)*

## ⚠️ Limitations

- **Tiny Sample Size:** Trained on a heavily restricted subset of data for educational speed and simplicity.
- **Educational Purpose:** The architecture and model are designed to teach system integration, not to maximize clinical accuracy.
- **Not Clinically Validated:** No real patient data should be processed.
- **Metrics:** Training and validation metrics shown in this project are strictly indicative and do not represent real-world diagnostic performance.
