import React, { useMemo } from "react";
import Plot from "react-plotly.js";
import { ApproximationResponse } from "../api/types";
import { fExprToFunction, generatePoints, pointsToXsYs } from "../utils";

interface ApproximationVisualizationProps {
  result: ApproximationResponse;
}

const ApproximationVisualization: React.FC<ApproximationVisualizationProps> = ({
  result,
}) => {
  const fn = useMemo(() => {
    if (!result.data) return null;
    return fExprToFunction(result.data.f_expr);
  }, [result]);
  const { xs, ys } = useMemo(() => {
    if (!fn || !result.points) return { xs: [], ys: [] };
    const points = generatePoints(fn, result.points);
    return points;
  }, [result, fn]);
  const { originalXs, originalYs } = useMemo(() => {
    const { xs, ys } = pointsToXsYs(result.points || []);
    return { originalXs: xs, originalYs: ys };
  }, [result]);

  return (
    <>
      results: todo
      <Plot
        data={[
          {
            x: xs,
            y: ys,
            type: "scatter",
            mode: "lines",
            line: { color: "blue" },
            name: "ф(x)",
          },
          {
            x: originalXs || [],
            y: originalYs || [],
            type: "scatter",
            mode: "markers",
            marker: { color: "red", size: 8 },
            name: "input points",
          },
        ]}
        layout={{
          title: { text: "Result" },
          xaxis: { title: { text: "x" } },
          yaxis: { title: { text: "ф(x)" } },
        }}
      />
    </>
  );
};

export default ApproximationVisualization;
