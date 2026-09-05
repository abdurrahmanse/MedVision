from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../../.env"),
        env_file_encoding="utf-8",
        case_sensitive=False, extra="ignore"
    )

    # App
    environment: str = "development"
    api_port: int = 8000

    # Database
    database_url: str

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # ML Model
    model_path: str = "./ml/models/pneumonia_classifier_v1.pt"

    # Storage
    storage_path: str = "./storage/images"
    max_upload_size: int = 5242880  # 5MB

    # CORS
    cors_origins: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    return Settings()

