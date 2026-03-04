// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseApiHandler = () => {
  // const apiUrl = "http://206.162.244.142:5030/api/v1";
  const apiUrl = "https://webapi.royalresin.uk/api/v1";
  return apiUrl;
};

// Define the base API using RTK Query
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(),
    prepareHeaders: (headers, { getState }) => {
      // Access the token from the Redux state
      const token = (getState() as RootState).auth.token;

      if (token) {
        // If token exists, add it to the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "course", "user", "dashboard"],
});
