from modules.approximation.core.solvers.linear import LinearSolver
from modules.approximation.core.solvers.solver import BaseSolver
from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class LogarithmicSolver(BaseSolver):
    approximation_type = ApproximationMethod.LOGARITHMIC

    def validate(self) -> ApproximationValidation:
        xs_ok = all([x > 0 for x in self.xs])

        if xs_ok:
            return ApproximationValidation(success=True, message=None)
        return ApproximationValidation(
            success=False, message="All X values must be > 0"
        )

    def solve(self) -> ApproximationResult:
        log_xs = [x.ln() for x in self.xs]

        linear_approximation = LinearSolver(log_xs, self.ys).solve()

        a = linear_approximation.parameters["a"]
        b = linear_approximation.parameters["b"]

        # f(x) = a * ln(x) + b
        f = lambda x: a * x.ln() + b
        f_expr = f"a*ln(x) + b"

        return ApproximationResult(
            f=f,
            f_expr=f_expr,
            parameters={"a": a, "b": b},
        )
