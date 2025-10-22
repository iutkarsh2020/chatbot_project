from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

app = FastAPI(
    title = "Chatbot Langchain backend",
    version = "1.0"
)
frontend_origin = os.getenv("FRONTEND_DEV_ORIGIN")
origins = [
    frontend_origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)