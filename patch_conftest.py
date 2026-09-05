import re
with open("apps/api/tests/conftest.py", "r") as f:
    content = f.read()

content = content.replace('from unittest.mock import patch', '')
content = content.replace('@pytest.fixture(autouse=True)\ndef mock_redis():\n    with patch("app.services.prediction_service.get_redis_client", return_value=None):\n        yield', '')

new_mock = """
from unittest.mock import AsyncMock, patch

@pytest.fixture(autouse=True)
def mock_redis():
    with patch("app.services.prediction_service.get_redis_client", new_callable=AsyncMock, return_value=None):
        yield
"""

with open("apps/api/tests/conftest.py", "w") as f:
    f.write(content + new_mock)
