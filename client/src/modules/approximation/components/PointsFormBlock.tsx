import { useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/store";
import {
  addPoint as addPointAction,
  deleteIthPoint as deleteIthPointAction,
  setIthPoint as setIthPointAction,
} from "src/store/approximation.reducer";
import { Point } from "../types";

const PointsFormBlock = () => {
  const dispatch = useAppDispatch();
  const points = useSelector((state: RootState) => state.approximation.points);

  const setIthPoint = useCallback(
    (index: number, point: Point) => {
      dispatch(setIthPointAction({ index, point }));
    },
    [dispatch],
  );
  const deleteIthPoint = useCallback(
    (index: number) => {
      dispatch(deleteIthPointAction(index));
    },
    [dispatch],
  );
  const addPoint = useCallback(
    (point: Point) => {
      dispatch(addPointAction(point));
    },
    [dispatch],
  );

  return (
    <Card>
      <Card.Header>Points</Card.Header>
      <Card.Body>
        {points.length > 0 ? (
          <Form>
            {points.map((point, index) => (
              <Form.Group key={index} className="d-flex">
                <Form.Control
                  className="m-1"
                  type="number"
                  value={point.x}
                  onChange={(e) =>
                    setIthPoint(index, { ...point, x: +e.target.value })
                  }
                />
                <Form.Control
                  className="m-1"
                  type="number"
                  value={point.y}
                  onChange={(e) =>
                    setIthPoint(index, { ...point, y: +e.target.value })
                  }
                />
                <Button
                  className="m-1"
                  tabIndex={-1}
                  onClick={() => deleteIthPoint(index)}
                  variant="outline-danger"
                >
                  -
                </Button>
              </Form.Group>
            ))}
          </Form>
        ) : (
          <div className="text-center">No points</div>
        )}
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => addPoint({ x: 0, y: 0 })} variant="success">
          +
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PointsFormBlock;
