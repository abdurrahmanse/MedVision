from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("")
def get_model_info():
    # Use relative path from this file to locate the weights directory safely
    current_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(current_dir, "../../../ml/weights/model_config.json")
    
    if os.path.exists(config_path):
        with open(config_path, "r") as f:
            return json.load(f)
    return {"error": "Model configuration not found."}
