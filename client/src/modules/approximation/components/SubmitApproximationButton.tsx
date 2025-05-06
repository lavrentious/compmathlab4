import { useCallback } from "react";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setResults } from "src/store/approximation.reducer";
import { useApproximateMutation } from "../api/api";
import { pointsToRequest } from "../api/utils";

const SubmitApproximationButton = () => {
  const points = useSelector((state: RootState) => state.approximation.points);
  const dispatch = useAppDispatch();
  const [fetch, { isLoading }] = useApproximateMutation();

  const onSubmit = useCallback(() => {
    fetch(pointsToRequest(points))
      .unwrap()
      .then((data) => {
        dispatch(setResults(data));
      });
  }, [fetch, points, dispatch]);

  return (
    <LoadingButton isLoading={isLoading} onClick={onSubmit}>
      Run
    </LoadingButton>
  );
};

export default SubmitApproximationButton;
