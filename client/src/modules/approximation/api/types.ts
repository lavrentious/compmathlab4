export enum ApproximationMethod {
  LINEAR = "LINEAR",
}

export type ApproximationRequest = {
  xs: number[];
  ys: number[];
};

export type ApproximationResult = {
  f_expr: string;
  parameters: Record<string, number>;
};

export type ApproximationResultEntry = {
  method: ApproximationMethod;
  success: boolean;
  message: string | null;
  data: ApproximationResult | null;
};

export type ApproximationResponse = Record<
  ApproximationMethod,
  ApproximationResultEntry
>;
