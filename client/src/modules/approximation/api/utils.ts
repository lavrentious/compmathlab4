import { Point } from "../types";
import { ApproximationRequest } from "./types";

export function pointsToRequest(points: Point[]): ApproximationRequest {
  return {
    xs: points.map((point) => point.x),
    ys: points.map((point) => point.y),
  };
}
