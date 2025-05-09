from dataclasses import dataclass
from decimal import Decimal
from enum import Enum
from typing import Callable, Dict


class ApproximationMethod(Enum):
    LINEAR = "LINEAR"
    QUADRATIC = "QUADRATIC"
    POWER = "POWER"
    EXPONENTIAL = "EXPONENTIAL"
    LOGARITHMIC = "LOGARITHMIC"


@dataclass
class ApproximationResult:
    f: Callable[[Decimal], Decimal]
    f_expr: str
    parameters: Dict[str, Decimal]


@dataclass
class ApproximationValidation:
    success: bool
    message: str | None
