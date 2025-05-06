from typing import Dict, List

from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import ApproximationMethod
from modules.approximation.schemas import (
    ApproximationRequest,
    ApproximationResponse,
)


class ApproximationService:
    async def approximate(self, data: ApproximationRequest) -> ApproximationResponse:
        print(data.xs, data.ys)
        solver: BaseSolver | None = None
        if data.method == ApproximationMethod.LINEAR:
            solver = LinearSolver(data.xs, data.ys)

        if not solver:
            raise Exception("Internal Server Error")
        validation_result = solver.validate()
        return ApproximationResponse(
            method=solver.approximation_type,
            success=validation_result.success,
            data=solver.solve() if validation_result.success else None,
            message=validation_result.message,
        )
