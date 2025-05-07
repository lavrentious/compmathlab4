import React, { useMemo } from "react";
import { Badge, Table } from "react-bootstrap";
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
    console.log("generated points", points);
    return points;
  }, [result, fn]);
  const { originalXs, originalYs } = useMemo(() => {
    const { xs, ys } = pointsToXsYs(result.points || []);
    return { originalXs: xs, originalYs: ys };
  }, [result]);

  return (
    <>
      <Plot
        data={[
          {
            x: xs.map((x) => +x),
            y: ys.map((y) => +y),
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
      <Table bordered striped>
        <tbody>
          <tr>
            <td>status</td>
            <td>
              {result.success ? (
                <Badge bg="success">success</Badge>
              ) : (
                <Badge bg="danger">failed</Badge>
              )}
            </td>
          </tr>
          <tr>
            <td>used method</td>
            <td>{result.method}</td>
          </tr>
          {result.data && (
            <>
              <tr>
                <td>params</td>
                <td>
                  {Object.entries(result.data.parameters).map(([k, v]) => (
                    <div key={k}>
                      {k}: {v}
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td>function</td>
                <td>{result.data.f_expr}</td>
              </tr>
            </>
          )}
          <tr>
            <td>message</td>
            <td>
              {result.message ? (
                result.message
              ) : (
                <span className="text-muted fst-italic">n/a</span>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ApproximationVisualization;
