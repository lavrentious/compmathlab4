import { Point } from "../types";

export function xsYsToPoints(xs: number[], ys: number[]): Point[] {
  return xs.map((x, i) => ({ x, y: ys[i] }));
}
