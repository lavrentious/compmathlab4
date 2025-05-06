from abc import ABC, abstractmethod
from typing import List

from modules.approximation.core.types import (
    ApproximationMethod,
    ApproximationResult,
    ApproximationValidation,
)


class BaseSolver(ABC):

    def __init__(self, x: List[float], y: List[float]):
        self.xs = x
        self.ys = y
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
