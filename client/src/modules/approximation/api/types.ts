import { Point } from "../types";

export enum ApproximationMethod {
  LINEAR = "LINEAR",
  QUADRATIC = "QUADRATIC",
}

export type ApproximationRequest = {
  method: ApproximationMethod;
  xs: string[];
  ys: string[];
};

export type ApproximationResult = {
  f_expr: string;
  parameters: Record<string, string>; // string: float as string
};

export type ApproximationResponse = {
  points: Point[];
  method: ApproximationMethod;
  success: boolean;
  message: string | null;
  data: ApproximationResult | null;
};
