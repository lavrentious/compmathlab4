import "katex/dist/katex.min.css";
import React, { useMemo } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";
import { BlockMath } from "react-katex";
import { ApproximationResponse } from "../api/types";
import { fExprToKatex, hydrateFExpr } from "../utils/utils";

interface VisualizationTableProps {
  result: ApproximationResponse;
  precision?: number;
}

const formatNumber = (value: string, precision = 4): string => {
  const num = parseFloat(value);
  return isNaN(num) ? String(value) : num.toFixed(precision);
};

const VisualizationTable: React.FC<VisualizationTableProps> = ({
  result,
  precision = 16,
}) => {
  const rQuality: { color: string; precision: string } | null = useMemo(() => {
    if (!result.data?.determination_coefficient) return null;
    if (+result.data?.determination_coefficient >= 0.95)
      return { color: "green", precision: "high" };
    if (+result.data?.determination_coefficient >= 0.75)
      return { color: "gold", precision: "medium" };
    if (+result.data?.determination_coefficient >= 0.5)
      return { color: "indianred", precision: "low" };
    return { color: "crimson", precision: "insufficient" };
  }, [result]);

  return (
    <Table bordered hover responsive className="mb-0">
      <tbody>
        <tr>
          <th>Status</th>
          <td>
            {result.success ? (
              <Badge bg="success">Success</Badge>
            ) : (
              <Badge bg="danger">Failed</Badge>
            )}
          </td>
        </tr>
        <tr>
          <th>Used Method</th>
          <td>{result.method}</td>
        </tr>

        {result.data && (
          <>
            <tr>
              <th>Parameters</th>
              <td>
                <ul className="mb-0 ps-3">
                  {Object.entries(result.data.parameters).map(([k, v]) => (
                    <li key={k}>
                      <strong>{k}</strong>: {formatNumber(v, precision)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Function</th>
              <td>
                <BlockMath
                  math={fExprToKatex(
                    hydrateFExpr(result.data.f_expr, result.data.parameters, 8),
                  )}
                />
              </td>
            </tr>
            <tr>
              <th>Determination Coefficient (R²)</th>
              <td
                className="d-flex justify-content-between"
                style={{ color: rQuality?.color || undefined }}
              >
                {formatNumber(result.data.determination_coefficient, precision)}
                <Button variant="outline-info" size="sm">
                  <BiInfoCircle
                    onClick={() =>
                      toast(`R quality: ${rQuality?.precision || "n/a"}`)
                    }
                  />
                </Button>
              </td>
            </tr>
            <tr>
              <th>Epsilons</th>
              <td>
                <ul className="mb-0 ps-3">
                  {result.data.epsilons.map((e, idx) => (
                    <li key={idx}>{formatNumber(e, precision)}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Deviation Measure</th>
              <td>{formatNumber(result.data.deviation_measure, precision)}</td>
            </tr>
            <tr>
              <th>MSE</th>
              <td>{formatNumber(result.data.mse, precision)}</td>
            </tr>
            {result.data.pearson_correlation_coefficient && (
              <tr>
                <th>Pearson Correlation Coefficient</th>
                <td>
                  {formatNumber(
                    result.data.pearson_correlation_coefficient,
                    precision,
                  )}
                </td>
              </tr>
            )}
          </>
        )}

        {result.message && (
          <tr>
            <th>Message</th>
            <td>{result.message}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VisualizationTable;
