import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApproximationMethod,
  ApproximationResponse,
} from "src/modules/approximation/api/types";
import { Point } from "src/modules/approximation/types";

interface ApproximationState {
  points: Point[];
  result: ApproximationResponse | null;
  method: ApproximationMethod;
  importModalShown: boolean;
}

const initialState: ApproximationState = {
  points: [],
  result: null,
  method: ApproximationMethod.LINEAR,
  importModalShown: false,
};

const approximationSlice = createSlice({
  name: "approximation",
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
    },
    setIthPoint(state, action: PayloadAction<{ index: number; point: Point }>) {
      state.points[action.payload.index] = action.payload.point;
    },
    deleteIthPoint(state, action: PayloadAction<number>) {
      state.points.splice(action.payload, 1);
    },
    addPoint(state, action: PayloadAction<Point>) {
      state.points.push(action.payload);
    },
    setResult(state, action: PayloadAction<ApproximationResponse>) {
      state.result = action.payload;
    },
    setMethod(state, action: PayloadAction<ApproximationMethod>) {
      state.method = action.payload;
    },
    setImportModalShown(state, action: PayloadAction<boolean>) {
      state.importModalShown = action.payload;
    },
  },
});

export const {
  setPoints,
  setIthPoint,
  deleteIthPoint,
  addPoint,
  setResult,
  setMethod,
  setImportModalShown,
} = approximationSlice.actions;
export default approximationSlice.reducer;
