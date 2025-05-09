from decimal import Decimal
import decimal

from config import FORMAT_STR
from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)
from math import e


class ExponentialSolver(BaseSolver):
    approximation_type = ApproximationMethod.EXPONENTIAL

    def validate(self) -> ApproximationValidation:
        ys_ok = all([y > 0 for y in self.ys])

        if ys_ok:
            return ApproximationValidation(success=True, message=None)
        return ApproximationValidation(
            success=False, message="All Y values must be > 0"
        )

    def solve(self) -> ApproximationResult:
        log_ys = [y.ln() for y in self.ys]

        linear_approximation = LinearSolver(self.xs, log_ys).solve()

        a = linear_approximation.parameters["b"].exp()
        b = linear_approximation.parameters["a"]

        # f(x) = a * e^(bx)
        f = lambda x: a * Decimal(e) ** (b * x)
        f_expr = f"{FORMAT_STR.format(a)} * {FORMAT_STR.format(e)} ^ ({FORMAT_STR.format(b)} * x)"

        return ApproximationResult(
            f=f,
            f_expr=f_expr,
            parameters={"a": a, "b": b},
        )
