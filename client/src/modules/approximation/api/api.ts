import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApproximationRequest, ApproximationResponse } from "./types";

export const approximationApi = createApi({
  reducerPath: "approximationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_API_BASE_URL ?? "") + "/api",
  }),
  endpoints: (build) => ({
    approximate: build.mutation<ApproximationResponse, ApproximationRequest>({
      query: (data) => ({
        url: "/approximation",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useApproximateMutation } = approximationApi;
