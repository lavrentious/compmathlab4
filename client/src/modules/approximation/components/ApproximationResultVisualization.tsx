import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const ApproximationResultVisualization = () => {
  const result = useSelector((state: RootState) => state.approximation.result);
  return (
    <Card>
      <Card.Header>Result</Card.Header>
      <Card.Body>{result ? <>&lt;Tabs&gt;</> : <p>No result yet</p>}</Card.Body>
    </Card>
  );
};

export default ApproximationResultVisualization;
