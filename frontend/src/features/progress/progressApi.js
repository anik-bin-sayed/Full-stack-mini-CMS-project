import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const progressApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Enrollments", "CourseProgress", "LessonProgress"],
  endpoints: (builder) => ({
    markLessonComplete: builder.mutation({
      query: (lessonId) => ({
        url: "completed/",
        method: "POST",
        body: { lesson_id: lessonId },
      }),
      invalidatesTags: ["CourseProgress", "LessonProgress"],
    }),

    getCourseProgress: builder.query({
      query: (courseId) => `course/${courseId}/`,
      providesTags: ["CourseProgress"],
    }),
  }),
});

export const { useMarkLessonCompleteMutation, useGetCourseProgressQuery } =
  progressApi;
