from decimal import Decimal

import numpy as np

from config import PRECISION
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class CubicSolver(BaseSolver):
    approximation_type = ApproximationMethod.CUBIC

    def validate(self) -> ApproximationValidation:
        return ApproximationValidation(success=True, message=None)

    def solve(self) -> ApproximationResult:
        n = len(self.xs)

        xs = [np.float64(x) for x in self.xs]
        ys = [np.float64(y) for y in self.ys]

        sx = sum(xs)
        sx2 = sum(x**2 for x in xs)
        sx3 = sum(x**3 for x in xs)
        sx4 = sum(x**4 for x in xs)
        sx5 = sum(x**5 for x in xs)
        sx6 = sum(x**6 for x in xs)
        sy = sum(ys)
        sxy = sum([x * y for x, y in zip(xs, ys)])
        sx2y = sum([x**2 * y for x, y in zip(xs, ys)])
        sx3y = sum([x**3 * y for x, y in zip(xs, ys)])

        A = np.array(
            [
                [n, sx, sx2, sx3],
                [sx, sx2, sx3, sx4],
                [sx2, sx3, sx4, sx5],
                [sx3, sx4, sx5, sx6],
            ]
        )
        B = np.array([sy, sxy, sx2y, sx3y])
        solution = np.linalg.solve(A, B)
        solution = np.round(solution, decimals=PRECISION)
        [a0, a1, a2, a3] = map(lambda x: Decimal(x), solution.tolist())

        parameters = {
            "a0": a0,
            "a1": a1,
            "a2": a2,
            "a3": a3,
        }

        f = lambda x: a3 * x**3 + a2 * x**2 + a1 * x + a0
        f_expr = f"a3*x^3 + a2*x^2 + a1*x + a0"

        return ApproximationResult(
            f=f,
            f_expr=f_expr,
            parameters=parameters,
        )
