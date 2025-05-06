import { useCallback } from "react";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setResults } from "src/store/approximation.reducer";
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
        dispatch(setResults(data));
      });
  }, [fetch, points, dispatch, method]);

  return (
    // TODO: disable button
    <LoadingButton isLoading={isLoading} onClick={onSubmit}>
      Run
    </LoadingButton>
  );
};

export default SubmitApproximationButton;
