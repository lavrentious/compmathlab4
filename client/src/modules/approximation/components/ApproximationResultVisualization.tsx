import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const ApproximationResultVisualization = () => {
  const results = useSelector(
    (state: RootState) => state.approximation.results,
  );
  return (
    <Card>
      <Card.Header>Results</Card.Header>
      <Card.Body>
        {results ? <>&lt;Tabs&gt;</> : <p>No results yet</p>}
      </Card.Body>
    </Card>
  );
};

export default ApproximationResultVisualization;
