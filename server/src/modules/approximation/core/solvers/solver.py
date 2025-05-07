from abc import ABC, abstractmethod
from decimal import Decimal
from typing import List

from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class BaseSolver(ABC):

    def __init__(
        self,
        x: List[float | Decimal] | List[Decimal],
        y: List[float | Decimal] | List[Decimal],
    ):
        self.xs = [Decimal(x) for x in x]
        self.ys = [Decimal(y) for y in y]
        self.n = len(x)

        if len(x) != len(y):
            raise ValueError("X and Y must have the same length")

    @property
    @abstractmethod
    def approximation_type(self) -> ApproximationMethod: ...

    @abstractmethod
    def solve(self) -> ApproximationResult: ...

    @abstractmethod
    def validate(self) -> ApproximationValidation: ...
