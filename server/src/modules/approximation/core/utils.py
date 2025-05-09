from decimal import Decimal
from typing import Callable, List


def compute_determination_coefficient(
    xs: List[Decimal], ys: List[Decimal], f: Callable[[Decimal], Decimal]
) -> Decimal:
    f_avg = Decimal(sum(f(x) for x in xs) / len(xs))
    s1 = sum((y - f(x)) ** 2 for x, y in zip(xs, ys))
    s2 = sum((y - f_avg) ** 2 for y in ys)
    return Decimal(1 - s1 / s2)


def compute_pearson_correlation_coefficient(
    xs: List[Decimal], ys: List[Decimal]
) -> Decimal:
    x_avg = Decimal(sum(xs) / len(xs))
    y_avg = Decimal(sum(ys) / len(ys))

    s1 = Decimal(sum((x - x_avg) * (y - y_avg) for x, y in zip(xs, ys)))
    s2 = Decimal(sum((x - x_avg) ** 2 for x in xs)) * Decimal(
        sum((y - y_avg) ** 2 for y in ys)
    )
    return Decimal(s1 / s2.sqrt())
