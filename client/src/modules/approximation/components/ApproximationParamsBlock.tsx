import { useCallback, useMemo } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setMethod } from "src/store/approximation.reducer";
import { useGetBestMethodMutation } from "../api/api";
import { ApproximationMethod } from "../api/types";

const ApproximationParamsBlock = () => {
  const dispatch = useAppDispatch();
  const { points, method } = useSelector(
    (state: RootState) => state.approximation,
  );
  const [fetch, { isLoading }] = useGetBestMethodMutation();

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as ApproximationMethod;
    dispatch(setMethod(selected));
  };

  const autoSelectMethod = useCallback(() => {
    fetch({
      xs: points.map((point) => point.x),
      ys: points.map((point) => point.y),
    })
      .unwrap()
      .then(({ deviation_measures }) => {
        let minR: number = Infinity;
        let bestMethod: ApproximationMethod | null = null;
        for (const method in ApproximationMethod) {
          const r = +deviation_measures[method as ApproximationMethod];
          if (r < minR) {
            minR = r;
            bestMethod = method as ApproximationMethod;
          }
        }
        if (bestMethod) {
          dispatch(setMethod(bestMethod));
          toast.success(`Auto selected method: ${bestMethod}`);
        }
      });
  }, [fetch, dispatch, points]);

  const disabled = useMemo(() => {
    if (points.length < 8) return true;
  }, [points]);

  return (
    <Card className="mb-3">
      <Card.Header>Params</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Method</Form.Label>
            <InputGroup>
              <Form.Select onChange={handleMethodChange} value={method}>
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
              <LoadingButton
                disabled={disabled}
                onClick={autoSelectMethod}
                isLoading={isLoading}
                variant="secondary"
              >
                auto
              </LoadingButton>
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ApproximationParamsBlock;
