import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Enrollments"],
  endpoints: (builder) => ({
    enrollCourse: builder.mutation({
      query: (courseId) => ({
        url: "enroll/",
        method: "POST",
        body: { course: courseId },
      }),
      invalidatesTags: ["Enrollments"],
    }),

    getEnrollments: builder.query({
      query: () => "enrollments/",
      providesTags: ["Enrollments"],
    }),
    checkEnrollments: builder.query({
      query: (courseId) => `check-enrollment/${courseId}/`,
      providesTags: ["Enrollments"],
    }),
  }),
});

export const {
  useEnrollCourseMutation,
  useGetEnrollmentsQuery,
  useCheckEnrollmentsQuery,
} = enrollmentApi;
