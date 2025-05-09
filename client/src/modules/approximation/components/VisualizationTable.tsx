import React from "react";
import { Badge, Table } from "react-bootstrap";
import { ApproximationResponse } from "../api/types";

interface VisualizationTableProps {
  result: ApproximationResponse;
}

const VisualizationTable: React.FC<VisualizationTableProps> = ({ result }) => {
  return (
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
  );
};

export default VisualizationTable;
