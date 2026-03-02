import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    // GET COURSES
    getCourses: builder.query({
      query: () => "my_courses/",
      providesTags: [{ type: "Course", id: "LIST" }],
    }),
    // GET ALL COURSES
    getALLCourses: builder.query({
      query: (page = 1) => `courses/?page=${page}`,
      providesTags: [{ type: "Course", id: "LIST" }],
    }),
    // COURSES DETAILS
    getCourseDetails: builder.query({
      query: (id) => `courses/${id}/`,

      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    // CREATE COURSE
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "courses/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    // DELETE COURSE
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    // UPDATE COURSE
    updateCourse: builder.mutation({
      query: ({ id, submitData }) => {
        return {
          url: `courses/${id}/`,
          method: "PATCH",
          body: submitData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetALLCoursesQuery,
  useGetCourseDetailsQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
