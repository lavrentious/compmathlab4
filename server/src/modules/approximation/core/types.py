from dataclasses import dataclass
from enum import Enum
from typing import Dict


class ApproximationMethod(Enum):
    LINEAR = "LINEAR"
    QUADRATIC = "QUADRATIC"
    POWER = "POWER"


@dataclass
class ApproximationResult:
    f_expr: str
    parameters: Dict[str, str]  # param: float as string


@dataclass
class ApproximationValidation:
    success: bool
    message: str | None
