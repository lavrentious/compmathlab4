from typing import List

from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.schemas import (
    ApproximationRequest,
    ApproximationResponse,
    ApproximationResultEntry,
)


class ApproximationService:
    async def approximate(self, data: ApproximationRequest) -> ApproximationResponse:
        print(data.xs, data.ys)
        results: List[ApproximationResultEntry] = []
        for Solver in [LinearSolver]:
            solver = Solver(data.xs, data.ys)
            validation_result = solver.validate()
            results.append(
                ApproximationResultEntry(
                    method=solver.approximation_type,
                    success=validation_result.success,
                    data=solver.solve() if validation_result.success else None,
                    message=validation_result.message,
                )
            )
        return ApproximationResponse(results=results)
