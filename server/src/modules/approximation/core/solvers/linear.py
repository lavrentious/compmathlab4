from decimal import Decimal

from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class LinearSolver(BaseSolver):
    approximation_type = ApproximationMethod.LINEAR

    def validate(self) -> ApproximationValidation:
        return ApproximationValidation(success=True, message=None)

    def solve(self) -> ApproximationResult:
        n = len(self.xs)

        sx = sum(self.xs)
        sxx = sum(x * x for x in self.xs)
        sy = sum(self.ys)
        sxy = sum(x * y for x, y in zip(self.xs, self.ys))

        d = Decimal(sxx * n - sx * sx)
        d1 = Decimal(sxy * n - sx * sy)
        d2 = Decimal(sxx * sy - sx * sxy)

        a = d1 / d
        b = d2 / d

        f = lambda x: a * x + b
        f_expr = f"a*x + b"

        return ApproximationResult(
            f=f,
            f_expr=f_expr,
            parameters={"a": a, "b": b},
        )
