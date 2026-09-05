import os
import uuid
from io import BytesIO

from app.core.config import get_settings
from app.core.errors import APIError
from fastapi import UploadFile
from PIL import Image

settings = get_settings()

MAX_FILE_SIZE = settings.max_upload_size
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png"}

def resolve_path(path: str) -> str:
    """Helper to resolve paths correctly whether running from root or apps/api."""
    if os.path.exists(path) or os.path.isabs(path):
        return os.path.abspath(path)
    root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../"))
    if path.startswith("./"):
        return os.path.join(root_path, path[2:])
    return os.path.join(root_path, path)

# Use config storage path safely resolved
STORAGE_DIR = resolve_path(settings.storage_path)

class ImageService:
    @staticmethod
    async def process_upload(image: UploadFile) -> tuple[Image.Image, str, str]:
        """
        Validates the uploaded file, saves it to storage, and returns the PIL image and URL.
        """
        os.makedirs(STORAGE_DIR, exist_ok=True)

        if not image:
            raise APIError(code="INVALID_FILE", message="No image provided", status_code=400)
            
        if image.content_type not in ALLOWED_MIME_TYPES:
            raise APIError(code="INVALID_IMAGE", message="Invalid file type. Only JPEG and PNG are supported.", status_code=400)
            
        contents = await image.read()
        if len(contents) > MAX_FILE_SIZE:
            raise APIError(code="FILE_TOO_LARGE", message="File too large. Maximum size is 5MB.", status_code=413)
            
        try:
            pil_image = Image.open(BytesIO(contents))
            pil_image.verify()
        except Exception:
            raise APIError(code="INVALID_IMAGE", message="Invalid or corrupted image file.", status_code=400)
            
        pil_image = Image.open(BytesIO(contents))
        
        width, height = pil_image.size
        if width < 28 or height < 28:
            raise APIError(code="INVALID_IMAGE", message="Image dimensions too small (minimum 28x28).", status_code=400)

        # Save file to Cloudflare R2 or local depending on config
        prediction_id = str(uuid.uuid4())
        ext = ".png" if image.content_type == "image/png" else ".jpg"
        filename = f"{prediction_id}{ext}"
        
        if settings.cloudflare_r2_bucket_name and settings.cloudflare_r2_endpoint_url:
            import asyncio

            import boto3
            
            s3_client = boto3.client(
                's3',
                endpoint_url=settings.cloudflare_r2_endpoint_url,
                aws_access_key_id=settings.cloudflare_r2_access_key_id,
                aws_secret_access_key=settings.cloudflare_r2_secret_access_key,
                region_name='auto'
            )
            
            def upload_to_r2():
                s3_client.put_object(
                    Bucket=settings.cloudflare_r2_bucket_name,
                    Key=f"uploads/{filename}",
                    Body=contents,
                    ContentType=image.content_type
                )
                
            await asyncio.to_thread(upload_to_r2)
            
            # Use the public URL if provided, otherwise fallback to local
            base_url = settings.cloudflare_r2_public_url.rstrip('/')
            image_url = f"{base_url}/uploads/{filename}"
        else:
            # Fallback to local storage
            filepath = os.path.join(STORAGE_DIR, filename)
            with open(filepath, "wb") as f:
                f.write(contents)
            image_url = f"/storage/uploads/{filename}"
            
        return pil_image, image_url, prediction_id
