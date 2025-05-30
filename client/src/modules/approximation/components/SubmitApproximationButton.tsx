import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setResult } from "src/store/approximation.reducer";
import { useApproximateMutation } from "../api/api";

const SubmitApproximationButton = () => {
  const { points, method } = useSelector(
    (state: RootState) => state.approximation,
  );
  const dispatch = useAppDispatch();
  const [fetch, { isLoading }] = useApproximateMutation();

  const onSubmit = useCallback(() => {
    fetch({
      xs: points.map((point) => point.x),
      ys: points.map((point) => point.y),
      method,
    })
      .unwrap()
      .then((data) => {
        dispatch(setResult(data));
      });
  }, [fetch, points, dispatch, method]);

  const disabled = useMemo(() => {
    if (points.length < 8) return true;
    const allXsAreUnique =
      Array.from(new Set(points.map((point) => point.x))).length ===
      points.length;
    if (!allXsAreUnique) return true;
  }, [points]);

  return (
    // TODO: disable button
    <LoadingButton isLoading={isLoading} onClick={onSubmit} disabled={disabled}>
      Run
    </LoadingButton>
  );
};

export default SubmitApproximationButton;
