from decimal import Decimal
from typing import Dict, List, Type

from config import FORMAT_STR
from modules.approximation.core.solvers.exponential import ExponentialSolver
from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.logarithmic import LogarithmicSolver
from modules.approximation.core.solvers.power import PowerSolver
from modules.approximation.core.solvers.quadratic import QuadraticSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import ApproximationMethod
from modules.approximation.core.utils import (
    compute_determination_coefficient,
    compute_deviation_measure,
    compute_mse,
    compute_pearson_correlation_coefficient,
    get_epsilons,
)
from modules.approximation.schemas import (
    ApproximationData,
    ApproximationRequest,
    ApproximationResponse,
    BestApproximationRequest,
    BestApproximationResponse,
)


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
        elif data.method == ApproximationMethod.EXPONENTIAL:
            solver = ExponentialSolver(data.xs, data.ys)
        elif data.method == ApproximationMethod.LOGARITHMIC:
            solver = LogarithmicSolver(data.xs, data.ys)

        if not solver:
            raise Exception("Internal Server Error")
        validation_result = solver.validate()
        solution_data: ApproximationData | None = None
        if validation_result.success:
            res = solver.solve()
            r = compute_determination_coefficient(data.xs, data.ys, res.f)
            pearson_coefficient = (
                compute_pearson_correlation_coefficient(data.xs, data.ys)
                if data.method == ApproximationMethod.LINEAR
                else None
            )
            solution_data = ApproximationData(
                f_expr=res.f_expr,
                parameters=res.parameters,
                determination_coefficient=r,
                epsilons=get_epsilons(data.xs, data.ys, res.f),
                deviation_measure=compute_deviation_measure(data.xs, data.ys, res.f),
                pearson_correlation_coefficient=pearson_coefficient,
                mse=compute_mse(data.xs, data.ys, res.f),
            )

        return ApproximationResponse(
            xs=[FORMAT_STR.format(x) for x in data.xs],
            ys=[FORMAT_STR.format(y) for y in data.ys],
            method=solver.approximation_type,
            success=validation_result.success,
            data=solution_data,
            message=validation_result.message,
        )

    async def get_best(
        self, data: BestApproximationRequest
    ) -> BestApproximationResponse:
        deviation_measures: Dict[ApproximationMethod, Decimal] = {}

        solvers: List[Type[BaseSolver]] = [
            LinearSolver,
            QuadraticSolver,
            PowerSolver,
            ExponentialSolver,
            LogarithmicSolver,
        ]
        for Solver in solvers:
            solver = Solver(data.xs, data.ys)
            validation_result = solver.validate()
            if not validation_result.success:
                break
            solution = solver.solve()
            deviation_measures[solver.approximation_type] = compute_deviation_measure(
                data.xs, data.ys, solution.f
            )

        return BestApproximationResponse(deviation_measures=deviation_measures)
