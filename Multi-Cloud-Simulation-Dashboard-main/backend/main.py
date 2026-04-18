from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import resources

app = FastAPI(
    title="Multi-Cloud Simulation API",
    description="Backend API for simulating AWS, Azure, and GCP resources.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(resources.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Multi-Cloud Simulation API", "docs": "/docs"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
