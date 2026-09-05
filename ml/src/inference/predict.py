import os
import json
import torch
import torch.nn as nn
from PIL import Image
import torchvision.transforms as transforms

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
        x = self.features(x)
        return self.classifier(x)

class PneumoniaPredictor:
    def __init__(self, models_dir: str):
        self.models_dir = models_dir
        self.model = None
        self.model_config = None
        self.class_mapping = None
        self.transform = None
        self.load_model()

    def load_model(self):
        # Load configs
        with open(os.path.join(self.models_dir, 'model_config.json'), 'r') as f:
            self.model_config = json.load(f)
        with open(os.path.join(self.models_dir, 'class_mapping.json'), 'r') as f:
            self.class_mapping = json.load(f)

        # Initialize and load weights
        self.model = TinyCNN()
        weights_path = os.path.join(self.models_dir, self.model_config['pytorch_checkpoint'])
        self.model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu')))
        self.model.eval()

        # Define preprocessing
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5], std=[0.5])
        ])

    def preprocess(self, image: Image.Image):
        # Ensure grayscale and 28x28
        image = image.convert('L').resize((28, 28))
        tensor = self.transform(image)
        return tensor.unsqueeze(0)  # Add batch dimension (1, 1, 28, 28)

    def predict(self, image: Image.Image) -> dict:
        if self.model is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")

        tensor = self.preprocess(image)

        with torch.no_grad():
            output = self.model(tensor)
            prob = torch.sigmoid(output).item()

        predicted_idx = 1 if prob >= 0.5 else 0
        confidence = prob if predicted_idx == 1 else (1 - prob)

        return {
            "predicted_class": self.class_mapping[str(predicted_idx)],
            "confidence": round(confidence, 4),
            "model_version": self.model_config['version']
        }
