"""
FastAPI Application Entry Point - Updated with Routes
Interactive DSA Platform Backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import logging

# Import routes
from app.routes import auth
from app.database import init_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Interactive DSA API",
    description="Backend for Interactive DSA Learning Platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted Host Middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1"],
)


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    logger.info("Initializing database...")
    init_db()
    logger.info("Database initialized successfully")


# Health Check Endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify API is running
    """
    return {
        "status": "healthy",
        "service": "Interactive DSA API",
        "version": "0.1.0",
    }


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint with API information
    """
    return {
        "message": "Welcome to Interactive DSA API",
        "docs": "/docs",
        "redoc": "/redoc",
        "version": "0.1.0",
    }


# Include routers
app.include_router(auth.router)


# Placeholder route groups (to be implemented)
@app.get("/api/v1/problems", tags=["Problems"])
async def get_problems(
    category: str = None,
    difficulty: str = None,
    skip: int = 0,
    limit: int = 10,
):
    """
    Get list of problems with filtering
    """
    return {
        "message": "Problems endpoint - Coming soon",
        "filters": {
            "category": category,
            "difficulty": difficulty,
        },
        "pagination": {
            "skip": skip,
            "limit": limit,
        },
    }


@app.post("/api/v1/submissions", tags=["Submissions"])
async def submit_code(problem_id: int, code: str, language: str):
    """
    Submit code for a problem
    """
    return {"message": "Code submission - Coming soon"}


@app.post("/api/v1/ai/hint", tags=["AI"])
async def get_ai_hint(problem_id: int, hint_level: int = 1):
    """
    Get AI hint for a problem
    """
    return {"message": "AI hint - Coming soon"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
