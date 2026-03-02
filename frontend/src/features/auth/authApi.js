import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // REGISTER
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "user/register/",
        method: "POST",
        body: userData,
      }),
    }),

    // LOGIN
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "user/login/",
        method: "POST",
        body: userData,
      }),
    }),

    //REFRESH TOKEN
    refreshToken: builder.mutation({
      query: () => ({
        url: "user/refresh-token/",
        method: "POST",
      }),
    }),

    // PROFILE
    profile: builder.query({
      query: () => "user/profile/",
      providesTags: ["User"],
    }),
    // LOGOUT
    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useProfileQuery,
  useLogoutUserMutation,
} = authApi;
