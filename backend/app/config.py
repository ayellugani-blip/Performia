"""
app/config.py
-------------
Centralised settings loaded from the .env file.
All values are read at startup; missing required vars raise a clear error.
"""

import os
from dotenv import load_dotenv

# Load .env from the backend root (one level above this file's package dir)
load_dotenv()


def _require(name: str) -> str:
    """Return the env var value, raising a descriptive error if absent."""
    value = os.getenv(name)
    if not value:
        raise EnvironmentError(
            f"Required environment variable '{name}' is not set. "
            "Check backend/.env and make sure it contains this key."
        )
    return value


class Settings:
    # ── App ──────────────────────────────────────────────────────────────────
    APP_ENV: str = os.getenv("APP_ENV", "development")
    APP_HOST: str = os.getenv("APP_HOST", "127.0.0.1")
    APP_PORT: int = int(os.getenv("APP_PORT", "8000"))

    # ── Supabase ──────────────────────────────────────────────────────────────
    SUPABASE_URL: str = _require("SUPABASE_URL")
    SUPABASE_KEY: str = _require("SUPABASE_KEY")   # anon/publishable key only


settings = Settings()
