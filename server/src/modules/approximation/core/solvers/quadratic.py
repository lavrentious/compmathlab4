import numpy as np
from config import FORMAT_STR, PRECISION
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class QuadraticSolver(BaseSolver):
    approximation_type = ApproximationMethod.QUADRATIC

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
        sy = sum(ys)
        sxy = sum([x * y for x, y in zip(xs, ys)])
        sx2y = sum([x**2 * y for x, y in zip(xs, ys)])

        A = np.array([[n, sx, sx2], [sx, sx2, sx3], [sx2, sx3, sx4]])
        B = np.array([sy, sxy, sx2y])
        print(f"{A=} {B=}")
        solution = np.linalg.solve(A, B)
        solution = np.round(solution, decimals=PRECISION)
        [a0, a1, a2] = solution

        parameters = {
            "a0": FORMAT_STR.format(a0),
            "a1": FORMAT_STR.format(a1),
            "a2": FORMAT_STR.format(a2),
        }

        return ApproximationResult(
            f"{parameters['a2']}*x^2 + {parameters['a1']}*x + {parameters['a0']}",
            parameters,
        )
