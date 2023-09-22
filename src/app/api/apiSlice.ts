import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { RootState } from "../../types";

let BASE_URL = "http://localhost:3500/api/v1/";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

if (development) BASE_URL = "https://remotedev-backend.onrender.com/api/v1/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const authState = (getState() as RootState).persisted;
    const token = authState?.auth?.accessToken || "";
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
