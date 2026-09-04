# Tiny Healthcare ML Full-Stack Project — End-to-End Implementation Guide

## Project: PneumoniaMNIST Mini — Educational Chest X-Ray Classifier

> **Purpose:** This is an engineering and learning project, not a medical/clinical diagnostic system. The model must never be presented as a tool for diagnosing pneumonia or making treatment decisions.
>
> **Dataset choice:** MedMNIST's PneumoniaMNIST is a lightweight biomedical image-classification dataset. MedMNIST standardizes its 2D images to 28×28 and provides train/validation/test splits. The project explicitly states that MedMNIST is intended for research/educational purposes and **not for clinical use**.
>
> Official resources: https://medmnist.com/ and https://github.com/MedMNIST/MedMNIST

---

# 0. Project Contract

## 0.1 Learning objective

Build a complete miniature system:

```text
Dataset
  ↓
Data validation
  ↓
EDA
  ↓
Reproducible split/subset
  ↓
Preprocessing
  ↓
Baseline ML model
  ↓
Small CNN / transfer-learning experiment
  ↓
Evaluation
  ↓
Error analysis
  ↓
Model artifact
  ↓
Inference service
  ↓
FastAPI
  ↓
PostgreSQL
  ↓
Object storage/local image storage
  ↓
Next.js
  ↓
Prediction history
  ↓
Tests
  ↓
Docker
  ↓
Deployment
  ↓
Monitoring/logging
```

## 0.2 Scope constraint

Use only a **tiny teaching subset**.

Recommended first run:

- 100 images total
- 50 samples from class 0
- 50 samples from class 1
- Keep the subset fixed using a random seed.
- Keep a separate small holdout for final demonstration.
- Do not optimize for leaderboard performance.

If 100 images still feel too large, start with 50.

## 0.3 Success criteria

The project is successful when:

- the dataset can be reproduced;
- every transformation is documented;
- a baseline can be trained;
- a model can be saved and loaded;
- FastAPI can receive an image and return a prediction;
- Next.js can upload an image and display the result;
- predictions can be stored and retrieved;
- tests pass;
- the application can be run from a clean setup;
- the README explains the complete pipeline.

**Accuracy is not the primary success criterion.**

---

# 1. Phase 1 — Repository and Architecture

## 1.1 Create repository

Suggested name:

```text
MedVision
```

## 1.2 Monorepo structure

```text
MedVision/
├── apps/
│   ├── web/
│   └── api/
├── ml/
│   ├── data/
│   │   ├── raw/
│   │   ├── interim/
│   │   └── processed/
│   ├── notebooks/
│   ├── src/
│   │   ├── data/
│   │   ├── preprocessing/
│   │   ├── training/
│   │   ├── evaluation/
│   │   └── inference/
│   ├── models/
│   └── tests/
├── packages/
│   └── shared-types/
├── scripts/
├── docs/
├── .env.example
├── README.md
└── docker-compose.yml
```

## 1.3 Why

Separate:

- experimentation;
- reusable ML code;
- API code;
- frontend code;
- shared contracts.

Do not put the complete ML pipeline inside a notebook.

## 1.4 Definition of done

- repository initialized;
- folders created;
- Python environment works;
- Next.js app boots;
- FastAPI app boots;
- README has project purpose.

---

# 2. Phase 2 — Environment and Dependency Management

## 2.1 Python

Use a modern supported Python version compatible with your selected PyTorch/MedMNIST stack.

Core packages:

```text
numpy
pandas
matplotlib
seaborn
scikit-learn
pillow
torch
torchvision
medmnist
jupyter
pytest
```

Optional later:

```text
mlflow
```

## 2.2 Backend

```text
fastapi
uvicorn
pydantic
pydantic-settings
sqlalchemy
alembic
psycopg
python-multipart
```

## 2.3 Frontend

Use:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
React Hook Form
Zod
```

## 2.4 Why

Pin important dependencies so the project can be reproduced.

## 2.5 Definition of done

Run:

```text
python --version
pip list
```

and verify both applications start.

---

# 3. Phase 3 — Dataset Acquisition

## 3.1 Install MedMNIST

```bash
pip install medmnist
```

## 3.2 Download PneumoniaMNIST

Use the official MedMNIST package/download mechanism.

Do not manually scrape medical images from random websites.

## 3.3 Inspect official dataset metadata

Record:

- dataset name;
- task type;
- number of classes;
- image shape;
- modality;
- official train/validation/test split;
- license;
- citation;
- non-clinical-use disclaimer.

## 3.4 Why

Dataset provenance is part of a professional ML project.

## 3.5 Definition of done

Create:

```text
docs/dataset-card.md
```

containing the above information.

---

# 4. Phase 4 — Create a Reproducible Tiny Subset

## 4.1 Important rule

Do not randomly pick 100 images manually.

Create a script:

```text
ml/src/data/create_subset.py
```

## 4.2 Fixed seed

Example concept:

```text
SEED = 42
```

## 4.3 Sampling strategy

Create a balanced subset:

```text
Class 0 → 50
Class 1 → 50
Total   → 100
```

Use only the official training portion for training experiments.

Keep the official validation/test data conceptually separate.

## 4.4 Store the selected IDs

Create:

```text
ml/data/processed/subset_manifest.csv
```

Columns:

```text
sample_id
original_index
label
split
```

## 4.5 Why

You need to reproduce exactly the same project tomorrow.

## 4.6 Definition of done

Running the subset script twice with the same seed produces the same manifest.

---

# 5. Phase 5 — Data Validation

## 5.1 Validate shape

Check:

- image count;
- dimensions;
- channels;
- labels;
- class values.

## 5.2 Validate missing data

Check:

- missing images;
- missing labels;
- invalid labels.

## 5.3 Validate duplicates

If appropriate, compare exact image arrays/hashes.

## 5.4 Validate class balance

Expected:

```text
Class 0: 50
Class 1: 50
```

## 5.5 Create validation report

Example:

```text
Total: 100
Valid: 100
Invalid: 0
Class 0: 50
Class 1: 50
```

## 5.6 Why

A model cannot be better than the data pipeline that feeds it.

## 5.7 Definition of done

Create:

```text
ml/src/data/validate.py
```

and make it fail loudly when invalid data is found.

---

# 6. Phase 6 — EDA

Create:

```text
ml/notebooks/01_eda.ipynb
```

## 6.1 Dataset overview

Show:

- sample count;
- class count;
- image shape;
- class distribution.

## 6.2 Visual samples

Display a grid of representative images.

## 6.3 Pixel statistics

Inspect:

- minimum;
- maximum;
- mean;
- standard deviation.

## 6.4 Image dimensions

Because the standardized dataset is tiny, verify actual shape rather than assuming it.

## 6.5 Class balance chart

Create one simple chart.

## 6.6 Questions to answer

Write observations:

- Is the class distribution balanced?
- Are images visually similar?
- Are there obvious artifacts?
- Are there suspicious duplicates?
- Is the dataset too small for strong conclusions?

## 6.7 Why

EDA converts raw data into an understanding of the problem.

## 6.8 Definition of done

The notebook ends with a short "Findings" section.

---

# 7. Phase 7 — Data Splitting

## 7.1 Split before augmentation

Never augment first and then split.

## 7.2 Suggested teaching split

For the 100-image training subset:

```text
Train: 70
Validation: 15
Internal test/demo: 15
```

Use stratification where applicable.

## 7.3 Important caution

Because 100 samples are extremely small, the resulting metrics will have high variance.

Do not claim general medical performance from this experiment.

## 7.4 Why

You need unseen data to evaluate whether the model learned anything beyond the training examples.

## 7.5 Definition of done

Create a deterministic split manifest.

---

# 8. Phase 8 — Preprocessing Pipeline

Create:

```text
ml/src/preprocessing/transforms.py
```

## 8.1 Training transformations

Use a minimal pipeline:

```text
image
→ tensor
→ normalization
```

Then optionally add light augmentation:

```text
→ small rotation
→ horizontal flip only if justified
```

## 8.2 Validation/test

Use deterministic preprocessing only.

## 8.3 Why

Training can use augmentation; evaluation should represent a stable procedure.

## 8.4 Important medical-image caution

Do not blindly apply transformations that could alter medically meaningful orientation or anatomy.

## 8.5 Definition of done

The same preprocessing function is reused by training and inference.

---

# 9. Phase 9 — Baseline Model

## 9.1 Goal

Do not start with a complex neural network.

Build a baseline.

Possible baseline:

```text
Flatten pixels
→ Logistic Regression
```

or:

```text
HOG
→ Logistic Regression / SVM
```

## 9.2 Record

```text
model_name
hyperparameters
train_metric
validation_metric
runtime
seed
```

## 9.3 Why

A baseline tells you whether a complex model is actually improving the problem.

## 9.4 Definition of done

Create:

```text
ml/src/training/train_baseline.py
```

and save metrics as JSON.

---

# 10. Phase 10 — Small CNN

## 10.1 Create

```text
ml/src/training/train_cnn.py
```

## 10.2 Architecture

Keep it intentionally small:

```text
Input
↓
Conv
↓
ReLU
↓
MaxPool
↓
Conv
↓
ReLU
↓
MaxPool
↓
Flatten
↓
Linear
↓
Binary output
```

## 10.3 Training

Track:

- loss;
- training accuracy;
- validation accuracy;
- epoch;
- runtime.

## 10.4 Avoid over-engineering

No need for:

- huge ResNet;
- distributed training;
- GPU cluster;
- hyperparameter sweeps.

## 10.5 Why

The goal is to understand the training-to-serving pipeline.

## 10.6 Definition of done

A model trains locally in a short time and produces a checkpoint.

---

# 11. Phase 11 — Optional Transfer Learning Experiment

Only do this after the baseline and CNN work.

## 11.1 Experiment

Use a small pretrained architecture such as MobileNet or ResNet.

## 11.2 Compare

```text
Baseline
vs
Small CNN
vs
Transfer Learning
```

## 11.3 Learning objective

Understand:

- pretrained weights;
- freezing;
- fine-tuning;
- feature extraction.

## 11.4 Why optional

It is useful for learning, but unnecessary for the first end-to-end version.

---

# 12. Phase 12 — Evaluation

Create:

```text
ml/src/evaluation/evaluate.py
```

## 12.1 Metrics

For binary classification:

- accuracy;
- precision;
- recall;
- F1;
- confusion matrix;
- ROC-AUC when meaningful.

## 12.2 Do not optimize for accuracy

The goal is to learn evaluation mechanics.

## 12.3 Save results

```text
ml/results/
├── baseline.json
├── cnn.json
└── confusion_matrix.png
```

## 12.4 Why

Training tells you what the model did on training data.

Evaluation asks how it behaves on unseen examples.

---

# 13. Phase 13 — Error Analysis

## 13.1 Collect mistakes

Save false positives and false negatives.

## 13.2 Inspect

For each mistake record:

```text
sample_id
true_label
predicted_label
confidence
```

## 13.3 Ask

- Is the image ambiguous?
- Is the confidence low?
- Is there a data issue?
- Is the class visually difficult?
- Is the sample unusual?

## 13.4 Why

Model development should not stop at a metric.

## 13.5 Definition of done

Create:

```text
ml/notebooks/02_error_analysis.ipynb
```

with a short written conclusion.

---

# 14. Phase 14 — Model Packaging

## 14.1 Save

```text
ml/models/pneumonia_classifier_v1.pt
```

Also save:

```text
class_mapping.json
model_config.json
preprocessing_config.json
```

## 14.2 Model metadata

Example:

```json
{
  "model_name": "tiny-cnn",
  "version": "1.0.0",
  "input_size": [28, 28],
  "task": "binary-classification",
  "classes": ["class_0", "class_1"]
}
```

Use the official dataset label definitions in your real project rather than inventing clinical terminology.

## 14.3 Why

Production inference must know exactly which model and preprocessing configuration it is using.

---

# 15. Phase 15 — Standalone Inference Module

Create:

```text
ml/src/inference/predict.py
```

Function concept:

```text
load_model()
preprocess(image)
predict(image)
return class + confidence
```

## 15.1 Critical rule

Model loading should happen once when the service starts, not for every request.

## 15.2 Output contract

Example:

```json
{
  "predicted_class": "class_1",
  "confidence": 0.87,
  "model_version": "1.0.0"
}
```

## 15.3 Why

This module becomes the boundary between Data Science and Backend Engineering.

---

# 16. Phase 16 — FastAPI Foundation

Create:

```text
apps/api/
├── app/
│   ├── main.py
│   ├── api/
│   │   └── routes/
│   ├── services/
│   ├── ml/
│   ├── schemas/
│   └── core/
└── tests/
```

## 16.1 Endpoints

```text
GET  /api/v1/health
GET  /api/v1/model
POST /api/v1/predictions
GET  /api/v1/predictions
GET  /api/v1/predictions/{id}
```

## 16.2 Why

Separate API routing from ML inference logic.

---

# 17. Phase 17 — Image Upload API

## 17.1 Request

```text
POST /api/v1/predictions
Content-Type: multipart/form-data
image=<file>
```

## 17.2 Validation

Check:

- file exists;
- MIME type;
- extension;
- maximum size;
- readable image;
- dimensions.

## 17.3 Processing

```text
upload
↓
validate
↓
store
↓
preprocess
↓
model inference
↓
save prediction
↓
return response
```

## 17.4 Response

```json
{
  "id": "uuid",
  "predicted_class": "class_1",
  "confidence": 0.87,
  "model_version": "1.0.0",
  "created_at": "..."
}
```

## 17.5 Why

This is the core ML-to-API integration.

---

# 18. Phase 18 — PostgreSQL

Use PostgreSQL for application metadata.

## 18.1 Tables

### predictions

```text
id
image_url
predicted_class
confidence
model_version
created_at
```

### optional model_versions

```text
id
version
model_name
created_at
```

## 18.2 Do not store image binary in PostgreSQL

Store the image in object storage or a local development directory.

Store only its reference/URL in the database.

## 18.3 Why

Database stores structured application data; object storage handles files.

---

# 19. Phase 19 — Alembic

Create migrations.

Example flow:

```text
model definition
↓
alembic revision
↓
migration
↓
alembic upgrade head
```

## Definition of done

A new developer can create the database from migrations.

---

# 20. Phase 20 — Object Storage

For learning, start with:

```text
local storage
```

Then optionally replace it with:

```text
S3-compatible storage
```

Examples include Cloudflare R2 or AWS S3.

## Flow

```text
Browser
↓
FastAPI
↓
Object Storage
↓
URL
↓
PostgreSQL
```

## Why

This teaches storage abstraction without making the first version unnecessarily complex.

---

# 21. Phase 21 — Next.js Application

Pages:

```text
/
├── Home
├── /predict
├── /history
└── /about
```

## 21.1 Predict page

UI:

```text
Upload image
↓
Preview
↓
Predict
↓
Loading
↓
Result
```

## 21.2 Result

Show:

```text
Prediction
Confidence
Model version
Timestamp
```

Always include an educational/non-clinical disclaimer.

---

# 22. Phase 22 — Frontend Data Layer

Do not scatter raw fetch calls through components.

Create:

```text
src/
├── lib/
│   ├── api-client.ts
│   └── api/
│       └── predictions.ts
├── hooks/
└── types/
```

Use TanStack Query for server state.

## Why

You want the frontend to remain replaceable if the backend changes.

---

# 23. Phase 23 — Prediction History

Create:

```text
/history
```

Display:

```text
Image
Prediction
Confidence
Model Version
Date
```

Add:

```text
pagination
loading state
empty state
error state
```

## Why

Now the model is integrated into a real application workflow.

---

# 24. Phase 24 — Frontend UX States

Implement all states:

```text
Idle
Uploading
Predicting
Success
Validation Error
API Error
Network Error
Empty History
```

## Why

Production applications are defined as much by failure handling as success paths.

---

# 25. Phase 25 — API Error Contract

Create a consistent error structure.

Example:

```json
{
  "error": {
    "code": "INVALID_IMAGE",
    "message": "The uploaded file is not a supported image."
  }
}
```

Potential codes:

```text
INVALID_FILE
FILE_TOO_LARGE
INVALID_IMAGE
MODEL_UNAVAILABLE
PREDICTION_FAILED
DATABASE_ERROR
```

---

# 26. Phase 26 — Backend Testing

Test:

```text
health endpoint
model endpoint
valid image
invalid file
oversized file
corrupted image
prediction persistence
history retrieval
```

## ML tests

Test:

```text
model loads
preprocessing output shape
prediction output shape
class mapping
```

## Why

Testing prevents changes in one layer from silently breaking another.

---

# 27. Phase 27 — Frontend Testing

Test:

```text
upload component
validation
loading state
success result
error state
history rendering
```

---

# 28. Phase 28 — End-to-End Test

The most important test:

```text
Open Next.js
↓
Upload image
↓
Click Predict
↓
Frontend calls FastAPI
↓
FastAPI validates image
↓
Model predicts
↓
Database stores result
↓
API returns result
↓
Frontend displays result
↓
History shows the prediction
```

If this works, you have completed the core project.

---

# 29. Phase 29 — Docker

Create containers for:

```text
Next.js
FastAPI
PostgreSQL
```

ML model is packaged with the API for the first version.

## Development flow

```text
docker compose up
```

## Why

You learn reproducible application environments.

---

# 30. Phase 30 — Configuration Management

Create:

```text
.env.example
```

Variables:

```text
DATABASE_URL=
MODEL_PATH=
MAX_UPLOAD_SIZE=
CORS_ORIGINS=
STORAGE_PATH=
```

Never commit real secrets.

---

# 31. Phase 31 — Logging

Log important events:

```text
request received
prediction started
prediction completed
prediction failed
database operation failed
```

Include:

```text
request_id
model_version
latency
```

Do not log unnecessary sensitive information.

---

# 32. Phase 32 — Basic Monitoring

Track:

```text
request count
error count
prediction latency
API latency
model inference latency
```

A simple structured log is enough for the first project.

Do not build a complicated observability platform yet.

---

# 33. Phase 33 — Security

Implement:

- file type validation;
- file size limits;
- safe filenames;
- CORS restrictions;
- input validation;
- rate limiting if exposed publicly;
- no secrets in Git;
- dependency updates.

## Medical-data rule

Do not collect real patient-identifiable information for this educational project.

Use only the public benchmark data and synthetic/application metadata.

---

# 34. Phase 34 — Model Versioning

Use:

```text
v1.0.0
v1.1.0
```

Prediction records should store:

```text
model_version
```

This allows you to answer:

> Which model generated this prediction?

---

# 35. Phase 35 — Reproducibility

Create one command/process for:

```text
download
↓
subset
↓
validate
↓
train
↓
evaluate
```

Save:

```text
seed
dataset version
code version
model version
preprocessing configuration
```

---

# 36. Phase 36 — Documentation

README must contain:

## Problem

What are you trying to demonstrate?

## Dataset

Where did it come from?

## Architecture

How does data move through the system?

## ML

What preprocessing/model/evaluation did you use?

## API

What endpoints exist?

## Frontend

What can the user do?

## Database

What is stored?

## Run locally

Exact commands.

## Testing

Exact test commands.

## Limitations

State clearly:

- tiny sample;
- educational purpose;
- not clinically validated;
- metrics are not representative of real-world diagnostic performance.

---

# 37. Phase 37 — Architecture Diagram

Create:

```text
docs/architecture.md
```

Include:

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

Then add the complete data flow.

---

# 38. Phase 38 — Final Refactor

Before calling the project complete:

## Remove

- duplicated code;
- notebook-only logic;
- hard-coded paths;
- hard-coded secrets;
- debug prints;
- unnecessary dependencies.

## Improve

- typing;
- error handling;
- API contracts;
- configuration;
- naming;
- tests;
- README.

---

# 39. Phase 39 — Final Acceptance Checklist

## Data

- [ ] Dataset source documented
- [ ] License documented
- [ ] Dataset card created
- [ ] Tiny subset reproducible
- [ ] Validation script works
- [ ] No accidental leakage

## ML

- [ ] EDA complete
- [ ] Baseline complete
- [ ] CNN complete
- [ ] Evaluation complete
- [ ] Error analysis complete
- [ ] Model artifact saved
- [ ] Model version recorded
- [ ] Inference module independent of notebook

## Backend

- [ ] FastAPI starts
- [ ] Health endpoint works
- [ ] Model endpoint works
- [ ] Prediction endpoint works
- [ ] Image validation works
- [ ] Database persistence works
- [ ] History endpoint works
- [ ] API tests pass

## Frontend

- [ ] Upload works
- [ ] Preview works
- [ ] Loading state works
- [ ] Result works
- [ ] Error state works
- [ ] History works
- [ ] API layer is separated from UI

## DevOps

- [ ] Environment variables documented
- [ ] Docker works
- [ ] Migrations work
- [ ] Logging works
- [ ] README complete

---

# 40. Phase 40 — Optional Advanced Extensions

Only after the core project is complete.

## Extension A — MLflow

Track:

```text
experiment
parameters
metrics
model
```

## Extension B — Model comparison dashboard

Show:

```text
Baseline
CNN
Transfer Learning
```

## Extension C — Explainability

Experiment with an educational visualization such as Grad-CAM.

Important: explainability visualizations must not be presented as proof that a model's prediction is medically correct.

## Extension D — CI/CD

Pipeline:

```text
push
↓
lint
↓
test
↓
build
↓
deploy
```

## Extension E — Model registry

Maintain:

```text
v1
v2
v3
```

and select the active production model through configuration.

---

# 41. Recommended Implementation Order

Do NOT implement all phases simultaneously.

Follow this exact order:

```text
1. Repository
2. Environment
3. Dataset
4. Tiny subset
5. Validation
6. EDA
7. Split
8. Preprocessing
9. Baseline
10. CNN
11. Evaluation
12. Error analysis
13. Model packaging
14. Inference module
15. FastAPI
16. Prediction endpoint
17. PostgreSQL
18. Storage
19. Next.js
20. Frontend API layer
21. Prediction UI
22. History
23. Backend tests
24. Frontend tests
25. E2E test
26. Docker
27. Configuration
28. Logging
29. Security
30. Documentation
31. Final refactor
32. Deployment
```

---

# 42. The Most Important Learning Rule

For every phase, answer these five questions before moving forward:

### 1. What am I building?

Write the artifact.

### 2. Why am I building it?

Write the engineering/data-science reason.

### 3. What goes in?

Define input.

### 4. What comes out?

Define output.

### 5. How do I know it works?

Define a test or acceptance criterion.

Example:

```text
Phase:
Inference

Input:
Image

Process:
Preprocess + model

Output:
Class + confidence + model version

Test:
Same image produces valid output with correct schema.
```

---

# 43. Prompt Engineering Workflow

Use one prompt per phase rather than asking an AI coding agent to build the entire system at once.

For each phase, give the agent:

```text
Context
↓
Current architecture
↓
Current phase
↓
Requirements
↓
Constraints
↓
Files allowed to change
↓
Acceptance criteria
↓
Tests
```

Never ask:

> "Build my entire medical AI application."

Instead ask:

> "Implement Phase 5 Data Validation only. Do not modify the API or frontend. First inspect the existing repository, identify the current dataset structure, implement validation, add tests, run them, and report what changed."

This keeps the project understandable and prevents AI-generated architectural drift.

---

# 44. Master Prompt Template

Use this template for every implementation phase:

```text
You are working on a small educational healthcare ML + full-stack project.

PROJECT:
PneumoniaMNIST Tiny Educational Classifier

GOAL:
Learn the complete Data Science → ML → API → Frontend → Database → Deployment workflow.

IMPORTANT:
This is NOT a clinical diagnostic application.
Do not make medical claims.
Do not introduce patient-identifiable data.
Do not optimize for production medical accuracy.

CURRENT PHASE:
[PHASE NAME]

CURRENT SUB-PHASE:
[SUB-PHASE NAME]

OBJECTIVE:
[WHAT THIS SUB-PHASE MUST ACHIEVE]

INPUT:
[INPUT]

EXPECTED OUTPUT:
[OUTPUT]

WHY:
[ENGINEERING / DATA SCIENCE REASON]

IMPLEMENTATION REQUIREMENTS:
1. Inspect the existing code before modifying anything.
2. Preserve the existing architecture.
3. Make the smallest clean change necessary.
4. Use typed, maintainable code.
5. Do not duplicate existing utilities.
6. Add or update tests.
7. Do not modify unrelated modules.
8. Do not introduce unnecessary dependencies.
9. Keep configuration environment-based.
10. Document important decisions.

ACCEPTANCE CRITERIA:
[LIST]

TESTS:
[LIST]

BEFORE FINISHING:
- Run relevant tests.
- Check formatting/linting where configured.
- Verify the feature manually if possible.
- Summarize changed files.
- Explain why each changed file was needed.
- Report any remaining limitation.

Do not proceed to the next phase automatically.
Stop after this phase is complete.
```

---

# 45. Phase-Specific Prompt Sequence

## Prompt 01 — Dataset Setup

```text
Implement only the dataset acquisition and metadata layer.

Inspect the repository first.

Set up PneumoniaMNIST using the official MedMNIST package/source.
Create a dataset card documenting provenance, task, image format, labels, license, citation, and non-clinical-use limitation.

Do not build the model, API, database, or frontend.

Acceptance:
- dataset can be downloaded/reproduced;
- metadata is documented;
- dataset path is configuration-driven;
- no raw data is committed to Git.
```

## Prompt 02 — Tiny Subset

```text
Implement only a reproducible 100-image balanced subset pipeline.

Select 50 samples per class from the permitted training data using a fixed seed.
Create a manifest containing original index, sample ID, label, and split.
Running the pipeline twice with the same seed must produce the same manifest.

Do not change the API or frontend.
Add tests for reproducibility and class counts.
```

## Prompt 03 — Validation

```text
Implement dataset validation.

Validate sample count, image shape, labels, missing values, corrupted samples, and class distribution.

Create a clear validation report.
The script must fail with a useful error when invalid data is detected.

Do not implement training or inference.
Add tests.
```

## Prompt 04 — EDA

```text
Create the first EDA notebook.

Analyze the tiny dataset's class distribution, image shape, pixel statistics, and representative image samples.

End with written findings and limitations.

Do not train a model in this notebook.
```

## Prompt 05 — Preprocessing

```text
Implement a reusable preprocessing module.

Create separate deterministic validation/test transforms and training transforms.
Keep augmentation minimal and justified.

The same core preprocessing behavior must be reusable by inference.

Add tests for output shape and numeric validity.
```

## Prompt 06 — Baseline

```text
Implement a reproducible baseline classifier.

Use a simple model such as Logistic Regression on flattened normalized pixels.

Save metrics, configuration, seed, and model artifact.

Do not modify the API/frontend.
```

## Prompt 07 — CNN

```text
Implement a very small CNN suitable for a 100-image educational dataset.

Do not optimize for maximum accuracy.
Track training and validation loss/metrics.
Save the best checkpoint and training configuration.

Add a reproducible training command.
```

## Prompt 08 — Evaluation

```text
Implement model evaluation.

Calculate accuracy, precision, recall, F1, confusion matrix, and ROC-AUC when valid.

Save machine-readable results and a confusion matrix visualization.

Explicitly state that metrics from this tiny educational subset are not clinically meaningful.
```

## Prompt 09 — Error Analysis

```text
Create an error-analysis workflow.

Identify false positives and false negatives.
Save their IDs, true labels, predicted labels, and confidence.
Create a notebook that visualizes mistakes and explains possible data/model causes.

Do not make medical interpretations.
```

## Prompt 10 — Inference

```text
Create a standalone inference module.

It must:
- load the model once;
- apply the same preprocessing contract;
- accept an image;
- return predicted class, confidence, and model version.

It must not depend on notebook state.

Add unit tests.
```

## Prompt 11 — FastAPI

```text
Implement only the FastAPI ML service.

Add:
GET /api/v1/health
GET /api/v1/model
POST /api/v1/predictions

Validate uploaded files.
Load the model during application startup/lifespan rather than per request.
Return a stable response schema.

Add API tests.
Do not build the frontend.
```

## Prompt 12 — Database

```text
Implement PostgreSQL persistence for prediction metadata.

Create SQLAlchemy models and Alembic migrations.
Store image reference, prediction, confidence, model version, and timestamp.

Do not store image binaries in PostgreSQL.

Add repository/service tests.
```

## Prompt 13 — Storage

```text
Implement an image-storage abstraction.

Start with local development storage.
Define an interface that can later support S3-compatible storage.

Do not couple the prediction service directly to a specific storage provider.
Add tests.
```

## Prompt 14 — Next.js Prediction UI

```text
Implement only the prediction page.

Requirements:
- image selection;
- preview;
- file validation;
- upload;
- loading state;
- result state;
- API error state;
- educational/non-clinical disclaimer.

Do not implement authentication or unrelated pages.
```

## Prompt 15 — Frontend API Layer

```text
Create a typed API client for the prediction endpoints.

Keep HTTP details outside UI components.
Use TanStack Query for server state where appropriate.
Define request/response types from the backend contract.

Do not duplicate fetch logic.
```

## Prompt 16 — History

```text
Implement the prediction history page.

Fetch history through the typed API layer.
Add loading, empty, error, and success states.
Display image reference, prediction, confidence, model version, and timestamp.

Do not modify the ML model.
```

## Prompt 17 — Testing

```text
Implement the project's test suite.

Cover:
- data validation;
- preprocessing;
- model loading;
- inference;
- API endpoints;
- database persistence;
- frontend upload;
- frontend result;
- history;
- critical end-to-end prediction flow.

Do not add tests that merely assert implementation details.
Prefer behavior-based tests.
```

## Prompt 18 — Docker

```text
Containerize the application.

Provide a reproducible development environment for:
- Next.js;
- FastAPI;
- PostgreSQL.

Ensure environment variables are configurable.
Ensure migrations can run.
Do not add unnecessary infrastructure.
```

## Prompt 19 — Security

```text
Perform a focused security pass.

Check:
- file validation;
- file-size limits;
- safe storage;
- CORS;
- secrets;
- dependency configuration;
- error leakage;
- unsafe filenames.

Fix only issues relevant to this application.
Add regression tests for security-sensitive behavior.
```

## Prompt 20 — Final Review

```text
Perform a complete architecture and implementation review.

Check the flow:

Dataset
→ validation
→ preprocessing
→ training
→ evaluation
→ model artifact
→ inference
→ FastAPI
→ storage
→ PostgreSQL
→ Next.js
→ tests
→ Docker

Identify:
1. bugs;
2. architectural problems;
3. duplicated logic;
4. reproducibility issues;
5. security issues;
6. performance issues;
7. documentation gaps.

Do not rewrite working code unnecessarily.

Produce a prioritized improvement list and implement only high-confidence fixes.
```

---

# 46. What You Should Learn From This Project

The final learning outcome is not:

```text
"I built a pneumonia classifier."
```

It is:

```text
"I learned how to take a small biomedical dataset
and turn it into a reproducible,
testable,
versioned,
servable,
full-stack ML application."
```

That distinction should guide every engineering decision in this project.

---

# 47. Final Project Deliverables

At completion, your repository should contain:

```text
1. Dataset card
2. Reproducible subset script
3. Data validation pipeline
4. EDA notebook
5. Preprocessing module
6. Baseline model
7. CNN model
8. Evaluation pipeline
9. Error analysis notebook
10. Model artifact
11. Inference module
12. FastAPI service
13. PostgreSQL schema
14. Alembic migrations
15. Storage abstraction
16. Next.js prediction UI
17. Prediction history
18. Automated tests
19. Docker configuration
20. Environment configuration
21. Logging
22. Architecture documentation
23. README
24. Final limitations report
```

---

# 48. The Golden Rule

**Do not increase the dataset until you understand the pipeline.**

Start with:

```text
100 images
```

Then:

```text
100 images
→ complete pipeline
```

Only after the complete pipeline works:

```text
100
→ 500
→ 1,000
→ larger dataset
```

This keeps the computational cost low while forcing you to learn the entire engineering lifecycle.

