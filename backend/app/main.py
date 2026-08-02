from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import auth, dashboard, ml

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-Powered Retail Analytics API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(ml.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI-Powered Retail Analytics API"}
