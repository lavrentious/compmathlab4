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
}

const initialState: ApproximationState = {
  points: [
    // { x: 1, y: 2 },
    // { x: 2, y: 4 },
    // { x: 3, y: 6 },
    // { x: 4, y: 8 },
    // { x: 5, y: 10 },
    // { x: 6, y: 12 },
    // { x: 7, y: 14 },
    // { x: 8, y: 16 },
    { x: -4, y: 16 },
    { x: -3, y: 9 },
    { x: -2, y: 4 },
    { x: -1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
  ],
  result: null,
  method: ApproximationMethod.LINEAR,
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
  },
});

export const {
  setPoints,
  setIthPoint,
  deleteIthPoint,
  addPoint,
  setResult,
  setMethod,
} = approximationSlice.actions;
export default approximationSlice.reducer;
