"""
app/database.py
---------------
Supabase client singleton.

Usage (in a route file):
    from app.database import supabase
    data = supabase.table("some_table").select("*").execute()
"""

from supabase import create_client, Client
from app.config import settings

supabase: Client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,  # anon key — never the service_role key
)
