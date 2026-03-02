import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUserAuthSlice } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "user/refresh-token/",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUserAuthSlice());
      await baseQuery(
        {
          url: "user/logout/",
          method: "POST",
        },
        api,
        extraOptions,
      );
    }
  }

  return result;
};

export default baseQueryWithReauth;
