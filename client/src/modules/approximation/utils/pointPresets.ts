import { ApproximationMethod } from "../api/types";
import { Point } from "../types";

export const pointPresets: Record<string, Point[]> = {
  [ApproximationMethod.LINEAR]: [
    { x: "1", y: "2.1" },
    { x: "2", y: "3.9" },
    { x: "3", y: "5.8" },
    { x: "4", y: "8.2" },
    { x: "5", y: "9.7" },
    { x: "6", y: "11.9" },
    { x: "7", y: "13.8" },
    { x: "8", y: "16.1" },
    { x: "9", y: "17.9" },
    { x: "10", y: "20.2" },
  ],
  [ApproximationMethod.QUADRATIC]: [
    { x: "1", y: "3.1" },
    { x: "2", y: "5.0" },
    { x: "3", y: "8.1" },
    { x: "4", y: "12.3" },
    { x: "5", y: "17.9" },
    { x: "6", y: "24.5" },
    { x: "7", y: "32.1" },
    { x: "8", y: "40.9" },
    { x: "9", y: "50.7" },
    { x: "10", y: "61.8" },
  ],
  [ApproximationMethod.POWER]: [
    { x: "1", y: "2.0" },
    { x: "2", y: "4.1" },
    { x: "3", y: "6.9" },
    { x: "4", y: "10.2" },
    { x: "5", y: "14.8" },
    { x: "6", y: "20.5" },
    { x: "7", y: "27.4" },
    { x: "8", y: "35.5" },
    { x: "9", y: "44.7" },
    { x: "10", y: "55.1" },
  ],
};
