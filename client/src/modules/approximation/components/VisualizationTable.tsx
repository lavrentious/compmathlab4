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
            <tr>
              <td>determination coefficient</td>
              <td>{result.data.determination_coefficient}</td>
            </tr>
            <tr>
              <td>epsilons</td>
              <td>
                {result.data.epsilons.map((e) => (
                  <div key={e}>{e}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>deviation measure</td>
              <td>{result.data.deviation_measure}</td>
            </tr>
            <tr>
              <td>MSE</td>
              <td>{result.data.mse}</td>
            </tr>
            {result.data.pearson_correlation_coefficient && (
              <tr>
                <td>pearson correlation coefficient</td>
                <td>{result.data.pearson_correlation_coefficient}</td>
              </tr>
            )}
          </>
        )}
        {result.message && (
          <tr>
            <td>message</td>
            <td>{result.message}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VisualizationTable;
