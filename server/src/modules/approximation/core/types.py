from dataclasses import dataclass
from decimal import Decimal
from enum import Enum
from typing import Dict


class ApproximationMethod(Enum):
    LINEAR = "LINEAR"
    QUADRATIC = "QUADRATIC"
    POWER = "POWER"
    EXPONENTIAL = "EXPONENTIAL"


@dataclass
class ApproximationResult:
    f_expr: str
    parameters: Dict[str, Decimal]


@dataclass
class ApproximationValidation:
    success: bool
    message: str | None
