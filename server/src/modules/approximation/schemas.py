from typing import Dict, List

from pydantic import BaseModel, Field, RootModel, model_validator

from modules.approximation.core.types import ApproximationMethod, ApproximationResult


class ApproximationRequest(BaseModel):
    xs: List[float] = Field(min_length=8, max_length=12)
    ys: List[float] = Field(min_length=8, max_length=12)

    @model_validator(mode="after")
    def length_match(self) -> "ApproximationRequest":
        if len(self.xs) != len(self.ys):
            raise ValueError("Lenths of xs and ys must match")
        return self


class ApproximationResultEntry(BaseModel):
    method: ApproximationMethod
    success: bool
    message: str | None = None
    data: ApproximationResult | None = None


class ApproximationResponse(
    RootModel[Dict[ApproximationMethod, ApproximationResultEntry]]
):
    pass
