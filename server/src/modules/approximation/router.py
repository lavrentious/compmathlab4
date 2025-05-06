from fastapi import APIRouter

from modules.approximation.schemas import ApproximationRequest, ApproximationResponse
from modules.approximation.service import ApproximationService

approximation_router = APIRouter(prefix="/approximation", tags=["Approximation"])


@approximation_router.post("/", response_model=ApproximationResponse)
async def approximate(data: ApproximationRequest) -> ApproximationResponse:
    service = ApproximationService()
    return await service.approximate(data)
