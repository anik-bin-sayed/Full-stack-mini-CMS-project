import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from "../../features/courses/courseApi";

const EditCourse = () => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading, isError } = useGetCourseDetailsQuery(id);
  const [updateCourse, { isLoading: updating }] = useUpdateCourseMutation();

  useEffect(() => {
    if (course) {
      const data = {
        title: course.title || "",
        description: course.description || "",
        thumbnail: course.thumbnail || null,
      };

      setFormData(data);

      setPreview(course.thumbnail);
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      thumbnail: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);

    if (formData.thumbnail instanceof File) {
      submitData.append("thumbnail", formData.thumbnail);
    }

    try {
      await toast.promise(updateCourse({ id, submitData }).unwrap(), {
        pending: "Updating course...",
        success: "Course updated successfully",
        error: "Update failed",
      });

      navigate(-1);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleCancel = () => {
    navigate("/instructor/my-courses");
  };

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load course
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
        <p className="text-gray-500">
          Update your course information & thumbnail
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-semibold text-gray-700">
                Course Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full mt-2 border rounded px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Description</label>

              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write course description..."
                className="w-full mt-2 border rounded px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={updating}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold transition cursor-pointer"
              >
                {updating ? "Updating..." : "Update Course"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 border hover:bg-gray-100 py-3 rounded-lg font-semibold cursor-pointer transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 md:p-8 h-fit lg:sticky lg:top-6">
          <h3 className="font-semibold text-gray-700 mb-4">
            Thumbnail Preview
          </h3>

          <div className="aspect-video border-2 border-dashed rounded overflow-hidden bg-gray-100 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400">No Thumbnail Selected</p>
            )}
          </div>

          <input
            type="file"
            onChange={handleFile}
            className="mt-5 w-full border rounded px-4 py-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
