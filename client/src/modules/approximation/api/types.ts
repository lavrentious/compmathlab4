import { Point } from "../types";

export enum ApproximationMethod {
  LINEAR = "LINEAR",
  QUADRATIC = "QUADRATIC",
  POWER = "POWER",
  EXPONENTIAL = "EXPONENTIAL",
  LOGARITHMIC = "LOGARITHMIC",
}

export type ApproximationRequest = {
  method: ApproximationMethod;
  xs: string[];
  ys: string[];
};

export type ApproximationData = {
  f_expr: string;
  parameters: Record<string, string>; // string: float as string
  determination_coefficient: string;
  pearson_correlation_coefficient: string | null;
};

export type ApproximationResponse = {
  points: Point[];
  method: ApproximationMethod;
  success: boolean;
  message: string | null;
  data: ApproximationData | null;
};
