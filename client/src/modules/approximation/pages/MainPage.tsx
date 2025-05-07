import { Col, Container, Row } from "react-bootstrap";
import ApproximationParamsBlock from "../components/ApproximationParamsBlock";
import ApproximationVisualizationBlock from "../components/ApproximationVisualizationBlock";

import PointsFormBlock from "../components/PointsFormBlock";
import SubmitApproximationButton from "../components/SubmitApproximationButton";

const MainPage = () => {
  return (
    <Container>
      <h2>Главная</h2>
      <Row>
        <Col md={6} lg={4}>
          <PointsFormBlock />
          <ApproximationParamsBlock />
          <hr />
          <SubmitApproximationButton />
        </Col>
        <Col md={6} lg={8}>
          <ApproximationVisualizationBlock />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
