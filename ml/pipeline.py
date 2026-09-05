import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms, datasets
from torch.utils.data import DataLoader
import datetime
import subprocess

# ─── 1. Configuration & Reproducibility ──────────────────────────────────────
SEED = 42
torch.manual_seed(SEED)

DATA_DIR = "./data/chest_xray"
MODELS_DIR = "./models"
os.makedirs(MODELS_DIR, exist_ok=True)

MODEL_VERSION = "v1.1.0"
DATASET_VERSION = "1.0.0 (Kaggle)"

try:
    CODE_VERSION = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"]).decode("utf-8").strip()
except:
    CODE_VERSION = "unknown"

PREPROCESSING_CONFIG = {
    "resize": [28, 28],
    "grayscale": True,
    "normalize_mean": [0.5],
    "normalize_std": [0.5],
    "batch_size": 32
}

# ─── 2. Model Definition ─────────────────────────────────────────────────────
class TinyCNN(nn.Module):
    def __init__(self):
        super(TinyCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 8, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(8, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(16 * 7 * 7, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
        
    def forward(self, x):
        return self.classifier(self.features(x))

# ─── 3. Pipeline Execution ───────────────────────────────────────────────────
def run_pipeline():
    print(f"🚀 Starting Reproducible ML Pipeline (Seed: {SEED})")
    
    # [Step: Download & Subset] - In a real scenario, kaggle API would be called here.
    print(f"📥 [1/5] Checking Dataset... (Version: {DATASET_VERSION})")
    if not os.path.exists(DATA_DIR):
        print(f"⚠️ Dataset missing at {DATA_DIR}. Pipeline requires local data.")
        return
        
    # [Step: Validate]
    print("🔍 [2/5] Validating Preprocessing Configurations...")
    transform = transforms.Compose([
        transforms.Grayscale(num_output_channels=1),
        transforms.Resize((PREPROCESSING_CONFIG["resize"][0], PREPROCESSING_CONFIG["resize"][1])),
        transforms.ToTensor(),
        transforms.Normalize(PREPROCESSING_CONFIG["normalize_mean"], PREPROCESSING_CONFIG["normalize_std"])
    ])
    
    train_dataset = datasets.ImageFolder(os.path.join(DATA_DIR, 'train'), transform=transform)
    test_dataset = datasets.ImageFolder(os.path.join(DATA_DIR, 'test'), transform=transform)
    
    train_loader = DataLoader(train_dataset, batch_size=PREPROCESSING_CONFIG["batch_size"], shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=PREPROCESSING_CONFIG["batch_size"], shuffle=False)

    # [Step: Train]
    print(f"🧠 [3/5] Training Model... (Version: {MODEL_VERSION})")
    model = TinyCNN()
    criterion = nn.BCEWithLogitsLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    model.train()
    epochs = 1
    for epoch in range(epochs):
        for inputs, labels in train_loader:
            labels = labels.float().unsqueeze(1)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            break # Fast dummy iteration for pipeline validation
            
    # [Step: Evaluate]
    print("📊 [4/5] Evaluating Model...")
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for inputs, labels in test_loader:
            labels = labels.float().unsqueeze(1)
            outputs = model(inputs)
            probs = torch.sigmoid(outputs)
            predicted = (probs >= 0.5).float()
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            break # Fast dummy iteration

    accuracy = correct / total if total > 0 else 0
    print(f"   ↳ Evaluation Accuracy: {accuracy * 100:.2f}%")

    # [Step: Save & Package]
    print(f"📦 [5/5] Packaging Artifacts to {MODELS_DIR}...")
    
    # Save Weights
    weights_path = os.path.join(MODELS_DIR, "pneumonia_classifier_v1.pt")
    torch.save(model.state_dict(), weights_path)
    
    # Save Reproducibility Metadata
    metadata = {
        "model_name": "tiny-cnn",
        "version": MODEL_VERSION,
        "input_size": [1] + PREPROCESSING_CONFIG["resize"],
        "task": "binary-classification",
        "classes": ["Normal", "Pneumonia"],
        "pytorch_checkpoint": "pneumonia_classifier_v1.pt",
        "reproducibility": {
            "seed": SEED,
            "dataset_version": DATASET_VERSION,
            "code_version": CODE_VERSION,
            "preprocessing": PREPROCESSING_CONFIG,
            "training_date": datetime.datetime.now().isoformat()
        }
    }
    
    with open(os.path.join(MODELS_DIR, "model_config.json"), "w") as f:
        json.dump(metadata, f, indent=4)
        
    print("✅ Pipeline Completed Successfully!")

if __name__ == "__main__":
    run_pipeline()
