import Decimal from "decimal.js";
import { Point } from "./types";

export function fExprToFunction(
  fExpr: string,
): (x: Decimal.Value) => Decimal.Value {
  // FIXME
  fExpr = fExpr.replace(/\^/g, "**");
  return (_x: Decimal.Value) => {
    const x = new Decimal(_x);
    return new Function("x", `return ${fExpr}`)(x);
  };
}
export function generatePoints(
  fn: (x: Decimal.Value) => Decimal.Value,
  points: Point[],
): { xs: Decimal.Value[]; ys: Decimal.Value[] } {
  const xMin = Math.min(...points.map((p) => +p.x));
  const xMax = Math.max(...points.map((p) => +p.x));
  const xs: Decimal.Value[] = [];
  const ys: Decimal.Value[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = new Decimal(xMin + (i / 100) * (xMax - xMin));
    xs.push(x);
    ys.push(fn(x));
  }
  return { xs, ys };
}

export function pointsToXsYs(points: Point[]): { xs: string[]; ys: string[] } {
  return {
    xs: points.map((p) => p.x),
    ys: points.map((p) => p.y),
  };
}

export function isStrictFloat(str: string): boolean {
  return /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(str.trim());
}
