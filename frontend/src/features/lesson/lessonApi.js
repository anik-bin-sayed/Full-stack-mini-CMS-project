import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Lesson"],
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: (courseId) => `courses/${courseId}/lessons/`,
      providesTags: (result, error, courseId) => [
        { type: "Lesson", id: courseId },
      ],
    }),
    createLesson: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `courses/${courseId}/lessons/`,
        method: "POST",
        body: formData,
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ lessonId, formData }) => ({
        url: `lessons/${lessonId}/`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `lessons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Lesson", id: courseId },
      ],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
