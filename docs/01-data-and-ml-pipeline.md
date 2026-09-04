# MedVision Development — Phase 1: Data & Machine Learning Pipeline

This document covers Phases 3 through 14 of the MedVision project, guiding you from data acquisition through model packaging.

## 1. Dataset Acquisition (Phase 3)
- **Goal:** Install and download the PneumoniaMNIST dataset using the official `medmnist` pip package.
- **Deliverable:** `docs/dataset-card.md` containing dataset metadata, license, and the non-clinical-use disclaimer. Do not scrape images manually.

## 2. Tiny Reproducible Subset (Phase 4)
- **Goal:** Select exactly 100 images (50 Class 0, 50 Class 1) using a fixed random seed (e.g., `SEED = 42`).
- **Deliverable:** `ml/src/data/create_subset.py` and `ml/data/processed/subset_manifest.csv`.

## 3. Data Validation & EDA (Phases 5-6)
- **Validation:** Create `ml/src/data/validate.py` to assert image shapes, missing data, and class balance. Fail loudly if invalid.
- **EDA:** Create `ml/notebooks/01_eda.ipynb` to visualize class distribution, pixel statistics, and representative images.

## 4. Splitting & Preprocessing (Phases 7-8)
- **Split:** Divide the 100 images deterministically (e.g., 70 Train / 15 Validation / 15 Test).
- **Preprocessing:** Create `ml/src/preprocessing/transforms.py`. Use minimal transformations (Image → Tensor → Normalize) and keep training augmentation light.

## 5. Model Training (Phases 9-11)
- **Baseline:** Create `ml/src/training/train_baseline.py`. Train a simple Logistic Regression model on flattened pixels.
- **Tiny CNN:** Create `ml/src/training/train_cnn.py`. Build a very small, non-complex CNN. Track loss and accuracy. 
- *(Optional: Experiment with transfer learning only after the baseline and CNN work).*

## 6. Evaluation & Error Analysis (Phases 12-13)
- **Evaluation:** Create `ml/src/evaluation/evaluate.py`. Calculate accuracy, precision, recall, F1, and confusion matrix. Save results to `ml/results/`.
- **Error Analysis:** Create `ml/notebooks/02_error_analysis.ipynb`. Identify false positives/negatives without making clinical interpretations.

## 7. Model Packaging (Phase 14)
- **Goal:** Save the trained model and its configuration for production inference.
- **Deliverable:** Save `ml/models/pneumonia_classifier_v1.pt` along with `class_mapping.json` and `model_config.json`.

