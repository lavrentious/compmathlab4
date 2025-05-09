from fastapi import APIRouter

from modules.approximation.schemas import (
    ApproximationRequest,
    ApproximationResponse,
    BestApproximationRequest,
    BestApproximationResponse,
)
from modules.approximation.service import ApproximationService

approximation_router = APIRouter(prefix="/approximation", tags=["Approximation"])


@approximation_router.post("/", response_model=ApproximationResponse)
async def approximate(data: ApproximationRequest) -> ApproximationResponse:
    service = ApproximationService()
    return await service.approximate(data)


@approximation_router.post("/best", response_model=BestApproximationResponse)
async def get_best(data: BestApproximationRequest) -> BestApproximationResponse:
    service = ApproximationService()
    return await service.get_best(data)
