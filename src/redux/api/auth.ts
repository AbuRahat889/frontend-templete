import { baseApi } from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  login user
    loginAdmin: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getMe: build.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useLoginAdminMutation, useGetMeQuery } = AuthApi;
export default AuthApi;
