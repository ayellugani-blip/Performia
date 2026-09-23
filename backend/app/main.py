from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routers.employees import router as employees_router

load_dotenv()

app = FastAPI(
    title="Performia API",
    description="Backend API for the Performia performance management platform.",
    version="0.1.0",
)

# CORS configuration for Performia frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees_router, prefix="/api")


@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint — confirms the API is running."""
    return {"message": "Performia API is running"}

