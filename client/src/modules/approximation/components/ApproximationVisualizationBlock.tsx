import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import ApproximationVisualization from "./ApproximationVisualization";

const ApproximationVisualizationBlock = () => {
  const result = useSelector((state: RootState) => state.approximation.result);
  return (
    <Card>
      <Card.Header>Results</Card.Header>
      <Card.Body>
        {result ? (
          <ApproximationVisualization result={result} />
        ) : (
          <p>No results yet</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default ApproximationVisualizationBlock;
