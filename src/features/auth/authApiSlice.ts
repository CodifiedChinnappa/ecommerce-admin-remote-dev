import { apiSlice } from "../../app/api/apiSlice";
import { LoginCredentials } from "../../types";



export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials:LoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export the login mutation hook with proper types
export const { useLoginMutation } = authApiSlice;

