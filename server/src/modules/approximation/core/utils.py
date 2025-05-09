from decimal import Decimal
from typing import Callable, List


def compute_determination_coefficient(
    xs: List[Decimal], ys: List[Decimal], f: Callable[[Decimal], Decimal]
) -> Decimal:
    f_avg = Decimal(sum(f(x) for x in xs) / len(xs))
    s1 = sum((y - f(x)) ** 2 for x, y in zip(xs, ys))
    s2 = sum((y - f_avg) ** 2 for y in ys)
    return Decimal(1 - s1 / s2)
