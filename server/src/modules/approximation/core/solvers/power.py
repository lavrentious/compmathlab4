from decimal import Decimal

from config import FORMAT_STR
from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class PowerSolver(BaseSolver):
    approximation_type = ApproximationMethod.POWER

    def validate(self) -> ApproximationValidation:
        xs_ok = all([x > 0 for x in self.xs])
        ys_ok = all([y > 0 for y in self.ys])

        if xs_ok and ys_ok:
            return ApproximationValidation(success=True, message=None)
        return ApproximationValidation(
            success=False, message="All X and Y values must be > 0"
        )

    def solve(self) -> ApproximationResult:
        log_xs = [x.ln() for x in self.xs]
        log_ys = [y.ln() for y in self.ys]

        linear_approximation = LinearSolver(log_xs, log_ys).solve()

        a = linear_approximation.parameters["b"].exp()
        b = linear_approximation.parameters["a"]

        f = lambda x: a * x**b
        f_expr = f"{FORMAT_STR.format(a)} * x ^ {FORMAT_STR.format(b)}"

        return ApproximationResult(
            f=f,
            f_expr=f_expr,
            parameters={"a": a, "b": b},
        )
