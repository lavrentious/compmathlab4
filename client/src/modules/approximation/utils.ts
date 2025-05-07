import { Point } from "./types";

export function fExprToFunction(fExpr: string) {
  fExpr = fExpr.replace("^", "**");
  return new Function("x", `return ${fExpr}`) as (x: number) => number;
}

export function generatePoints(
  fn: (x: number) => number,
  points: Point[],
): { xs: number[]; ys: number[] } {
  const xMin = Math.min(...points.map((p) => p.x));
  const xMax = Math.max(...points.map((p) => p.x));
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = xMin + (i / 100) * (xMax - xMin);
    xs.push(x);
    ys.push(fn(x));
  }
  return { xs, ys };
}

export function pointsToXsYs(points: Point[]): { xs: number[]; ys: number[] } {
  return {
    xs: points.map((p) => p.x),
    ys: points.map((p) => p.y),
  };
}
