# MedVision Final Limitations Report:

## Architectural Limitations
1. **SQLite / In-Memory Defaults**: The API testing uses `aiosqlite` for simplicity, but production relies on PostgreSQL. In highly concurrent scenarios, Redis caching alleviates load, but proper read replicas are missing.
2. **Tiny Dataset**: The model is trained on a synthetic subset of 100 images per class for educational speed. It is extremely underfit and incapable of real diagnosis.
3. **No Auth**: The system currently lacks user authentication and RBAC.

## Security Limitations
1. **Rate Limiting**: IP-based rate limiting is easily spoofable or problematic for users behind corporate NATs.

## Technical Debt
1. **Container Orchestration**: We rely on `docker-compose`. For production scale, a Kubernetes Helm chart would be necessary.
