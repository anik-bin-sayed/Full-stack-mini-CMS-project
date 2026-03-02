import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetALLCoursesQuery } from "../../features/courses/courseApi";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} from "../../features/lesson/lessonApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ManageLesson = () => {
  const { user } = useSelector((state) => state.auth);

  const { id: courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    duration: "",
    order: "",
  });

  const [updateData, setUpdateData] = useState(null);

  const { data } = useGetALLCoursesQuery();

  const [createLesson, { isLoading: creating }] = useCreateLessonMutation();
  const [deleteLesson, { isLoading: deleting }] = useDeleteLessonMutation();
  const [updateLesson, { isLoading: updating }] = useUpdateLessonMutation();

  const courses = data?.results || [];

  const selectedCourse = courses.find(
    (course) => String(course.id) === courseId,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setUpdateData(null);
    setFormData({
      title: "",
      video_url: "",
      duration: "",
      order: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateData) {
        await toast.promise(
          updateLesson({
            courseId,
            lessonId: updateData.id,
            formData: { ...formData, course: courseId },
          }).unwrap(),
          {
            pending: "Updating...",
            success: "Lesson Updated",
            error: "Update Failed",
          },
        );
      } else {
        await toast.promise(
          createLesson({
            courseId,
            formData: { ...formData, course: courseId },
          }).unwrap(),
          {
            pending: "Creating...",
            success: "Lesson Added",
            error: "Creation Failed",
          },
        );
      }

      resetForm();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (lessonId) => {
    try {
      await deleteLesson(lessonId).unwrap();
      toast.success("Lesson Deleted");
    } catch {
      toast.error("Delete Failed");
    }
  };

  const handleUpdate = (lesson) => {
    setUpdateData(lesson);
    setFormData({
      title: lesson.title,
      video_url: lesson.video_url,
      duration: lesson.duration,
      order: lesson.order,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-6 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {updateData ? "Update Lesson" : "Add Lesson"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Lesson Title"
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="YouTube URL"
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (min)"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              placeholder="Lesson Order"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <div className="flex gap-3">
              <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold">
                {updateData
                  ? updating
                    ? "Updating..."
                    : "Update"
                  : creating
                    ? "Adding..."
                    : "Add Lesson"}
              </button>

              {updateData && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCourse?.title} Lessons
          </h2>

          {selectedCourse?.lessons?.length > 0 ? (
            selectedCourse.lessons.map((lesson) => {
              const isOwner = lesson.instructor === user?.id;

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="aspect-video">
                    <iframe
                      src={lesson.video_url}
                      title={lesson.title}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg">{lesson.title}</h3>

                    <div className="flex gap-4">
                      <p className="text-gray-500">
                        Duration: {lesson.duration} min
                      </p>
                      <p className="text-gray-500">Order: {lesson.order}</p>
                    </div>

                    {isOwner && (
                      <div className="flex gap-3 pt-3">
                        <button
                          onClick={() => handleUpdate(lesson)}
                          className="bg-yellow-400 px-4 py-2 rounded"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(lesson.id)}
                          className="bg-red-400 text-white px-4 py-2 rounded"
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No lessons added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLesson;
