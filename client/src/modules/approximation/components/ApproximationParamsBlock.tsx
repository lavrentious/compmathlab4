import { Card, Form } from "react-bootstrap";
import { useAppDispatch } from "src/store";
import { setMethod } from "src/store/approximation.reducer";
import { ApproximationMethod } from "../api/types";

const ApproximationParamsBlock = () => {
  const dispatch = useAppDispatch();

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as ApproximationMethod;
    dispatch(setMethod(selected));
  };

  return (
    <Card className="mb-3">
      <Card.Header>Params</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Method</Form.Label>
            <Form.Select onChange={handleMethodChange}>
              {(
                Object.keys(ApproximationMethod) as Array<
                  keyof typeof ApproximationMethod
                >
              ).map((key) => (
                <option key={key} value={key}>
                  {ApproximationMethod[key]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ApproximationParamsBlock;
