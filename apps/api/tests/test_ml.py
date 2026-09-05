import pytest
import os
import json
import torch
import tempfile
from PIL import Image
import io
from app.ml.predict import PneumoniaPredictor, TinyCNN

@pytest.fixture
def dummy_models_dir():
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create dummy configs
        model_config = {
            "version": "1.0",
            "pytorch_checkpoint": "dummy_weights.pth"
        }
        with open(os.path.join(temp_dir, 'model_config.json'), 'w') as f:
            json.dump(model_config, f)
            
        class_mapping = {
            "0": "Normal",
            "1": "Pneumonia"
        }
        with open(os.path.join(temp_dir, 'class_mapping.json'), 'w') as f:
            json.dump(class_mapping, f)
            
        # Create dummy weights
        dummy_model = TinyCNN()
        torch.save(dummy_model.state_dict(), os.path.join(temp_dir, 'dummy_weights.pth'))
        
        yield temp_dir

@pytest.fixture
def predictor(dummy_models_dir):
    return PneumoniaPredictor(models_dir=dummy_models_dir)

def test_model_loads(predictor: PneumoniaPredictor):
    assert predictor.model is not None
    assert predictor.model_config is not None
    assert predictor.class_mapping is not None
    assert "0" in predictor.class_mapping
    assert "1" in predictor.class_mapping

def test_preprocessing_output_shape(predictor: PneumoniaPredictor):
    img = Image.new('RGB', (100, 100), color = 'white')
    tensor = predictor.preprocess(img)
    # Expected shape: (batch_size=1, channels=1, height=28, width=28)
    assert tensor.shape == (1, 1, 28, 28)

def test_prediction_output_shape(predictor: PneumoniaPredictor):
    img = Image.new('RGB', (100, 100), color = 'white')
    tensor = predictor.preprocess(img)
    
    with torch.no_grad():
        output = predictor.model(tensor)
    
    # Expected shape: (batch_size=1, outputs=1)
    assert output.shape == (1, 1)

def test_class_mapping(predictor: PneumoniaPredictor):
    assert predictor.class_mapping["0"] == "Normal"
    assert predictor.class_mapping["1"] == "Pneumonia"
