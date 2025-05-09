from decimal import Decimal
from typing import List, Union, Dict

from pydantic import BaseModel, Field, field_validator, model_validator

from modules.approximation.core.types import ApproximationMethod, ApproximationResult


class ApproximationRequest(BaseModel):
    xs: List[Decimal] = Field(min_length=8, max_length=12)
    ys: List[Decimal] = Field(min_length=8, max_length=12)
    method: ApproximationMethod

    @field_validator("xs", "ys", mode="before")
    @classmethod
    def coerce_to_decimal(cls, values: List[Union[str, float]]) -> List[Decimal]:
        try:
            return [Decimal(v) for v in values]
        except Exception:
            raise ValueError(
                "All coordinates must be floats or strings representing floats"
            )

    @model_validator(mode="after")
    def length_match(self) -> "ApproximationRequest":
        if len(self.xs) != len(self.ys):
            raise ValueError("Lengths of xs and ys must match")
        return self


class ApproximationData(BaseModel):
    f_expr: str
    parameters: Dict[str, Decimal]
    determination_coefficient: Decimal


class ApproximationResponse(BaseModel):
    xs: List[str] = Field(min_length=8, max_length=12)
    ys: List[str] = Field(min_length=8, max_length=12)
    method: ApproximationMethod
    success: bool
    message: str | None = None
    data: ApproximationData | None = None
