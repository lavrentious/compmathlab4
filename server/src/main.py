import decimal

from config import PRECISION

decimal.setcontext(decimal.Context(prec=PRECISION))

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules.approximation.router import approximation_router

api_router = APIRouter(prefix="/api")
api_router.include_router(approximation_router)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
