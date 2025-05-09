import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ApproximationRequest,
  ApproximationResponse,
  BestApproximationRequest,
  BestApproximationResponse,
} from "./types";
import { xsYsToPoints } from "./utils";

export const approximationApi = createApi({
  reducerPath: "approximationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_API_BASE_URL ?? "") + "/api",
  }),
  endpoints: (build) => ({
    approximate: build.mutation<ApproximationResponse, ApproximationRequest>({
      query: (data) => {
        console.log("API", data);
        return {
          url: "/approximation",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (
        response: ApproximationResponse & {
          xs: string[];
          ys: string[];
        },
      ) => {
        return {
          data: response.data,
          message: response.message,
          method: response.method,
          success: response.success,
          points: xsYsToPoints(response.xs, response.ys),
        } as ApproximationResponse;
      },
    }),
    getBestMethod: build.mutation<
      BestApproximationResponse,
      BestApproximationRequest
    >({
      query: (data) => {
        return {
          url: "/approximation/best",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useApproximateMutation, useGetBestMethodMutation } =
  approximationApi;
