import { ApproximationMethod } from "../api/types";
import { Point } from "../types";

export const pointPresets: Record<ApproximationMethod, Point[]> = {
  [ApproximationMethod.LINEAR]: [
    { x: "0", y: "0" },
    { x: "1", y: "2" },
    { x: "2", y: "4" },
    { x: "3", y: "6" },
    { x: "4", y: "8" },
    { x: "5", y: "10" },
    { x: "6", y: "12" },
    { x: "7", y: "14" },
  ],
  [ApproximationMethod.QUADRATIC]: [
    { x: "-4", y: "16" },
    { x: "-3", y: "9" },
    { x: "-2", y: "4" },
    { x: "-1", y: "1" },
    { x: "0", y: "0" },
    { x: "1", y: "1" },
    { x: "2", y: "4" },
    { x: "3", y: "9" },
    { x: "4", y: "16" },
  ],
};
