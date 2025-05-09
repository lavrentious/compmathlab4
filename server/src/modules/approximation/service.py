from config import FORMAT_STR
from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.power import PowerSolver
from modules.approximation.core.solvers.quadratic import QuadraticSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import ApproximationMethod
from modules.approximation.schemas import ApproximationRequest, ApproximationResponse


class ApproximationService:
    async def approximate(self, data: ApproximationRequest) -> ApproximationResponse:
        print(data.xs, data.ys)
        solver: BaseSolver | None = None
        if data.method == ApproximationMethod.LINEAR:
            solver = LinearSolver(data.xs, data.ys)
        elif data.method == ApproximationMethod.QUADRATIC:
            solver = QuadraticSolver(data.xs, data.ys)
        elif data.method == ApproximationMethod.POWER:
            solver = PowerSolver(data.xs, data.ys)

        if not solver:
            raise Exception("Internal Server Error")
        validation_result = solver.validate()
        return ApproximationResponse(
            xs=[FORMAT_STR.format(x) for x in data.xs],
            ys=[FORMAT_STR.format(y) for y in data.ys],
            method=solver.approximation_type,
            success=validation_result.success,
            data=solver.solve() if validation_result.success else None,
            message=validation_result.message,
        )
