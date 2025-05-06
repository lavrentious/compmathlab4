export enum ApproximationMethod {
  LINEAR = "LINEAR",
}

export type ApproximationRequest = {
  method: ApproximationMethod;
  xs: number[];
  ys: number[];
};

export type ApproximationResult = {
  f_expr: string;
  parameters: Record<string, number>;
};

export type ApproximationResponse = {
  method: ApproximationMethod;
  success: boolean;
  message: string | null;
  data: ApproximationResult | null;
};
