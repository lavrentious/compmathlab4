from dataclasses import dataclass
from enum import Enum
from typing import Dict


class ApproximationMethod(Enum):
    LINEAR = "LINEAR"


@dataclass
class ApproximationResult:
    f_expr: str
    parameters: Dict[str, float]


@dataclass
class ApproximationValidation:
    success: bool
    message: str | None
