import numpy as np
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
        sx = sum(self.xs)
        sx2 = sum(x**2 for x in self.xs)
        sx3 = sum(x**3 for x in self.xs)
        sx4 = sum(x**4 for x in self.xs)
        sy = sum(self.ys)
        sxy = sum([x * y for x, y in zip(self.xs, self.ys)])
        sx2y = sum([x**2 * y for x, y in zip(self.xs, self.ys)])

        A = np.array([[n, sx, sx2], [sx, sx2, sx3], [sx2, sx3, sx4]])
        B = np.array([sy, sxy, sx2y])
        [a0, a1, a2] = np.linalg.solve(A, B)

        return ApproximationResult(
            f"{a2}*x^2 + {a1}*x + {a0}", {"a0": a0, "a1": a1, "a2": a2}
        )
