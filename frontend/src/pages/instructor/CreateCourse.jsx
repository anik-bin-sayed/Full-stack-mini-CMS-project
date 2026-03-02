import { useState } from "react";

import { toast } from "react-toastify";

import { useCreateCourseMutation } from "../../features/courses/courseApi";

const CreateCourse = () => {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, thumbnail: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.thumbnail) {
      toast.error("All fields required");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("thumbnail", form.thumbnail);

    try {
      await toast.promise(createCourse(data).unwrap(), {
        pending: "Creating course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });

      setForm({
        title: "",
        description: "",
        thumbnail: null,
      });

      setPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Create New Course
        </h1>
        <p className="text-gray-500 mt-2">
          Add course information and upload thumbnail
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="React Masterclass..."
                className="w-full border rounded px-4 py-3 
                focus:ring-2 focus:ring-yellow-400 
                outline-none transition"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Course Description
              </label>

              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write course description..."
                className="w-full border rounded px-4 py-3
                focus:ring-2 focus:ring-yellow-400
                outline-none resize-none transition"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500
              active:scale-[0.98]
              transition-all duration-200
              font-semibold py-3 rounded cursor-pointer shadow-md"
            >
              {isLoading ? "Creating..." : "Create Course"}
            </button>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-3 block">
              Course Thumbnail
            </label>

            <div
              className="
              border-2 border-dashed
              rounded-2xl
              h-72 md:h-96
              flex items-center justify-center
              overflow-hidden
              bg-gray-100
              hover:border-yellow-400
              transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-lg">Upload Thumbnail</p>
                  <p className="text-sm">PNG / JPG Recommended</p>
                </div>
              )}
            </div>

            <input
              type="file"
              onChange={handleFile}
              className="
              mt-4 w-full
              border rounded
              px-4 py-2
              cursor-pointer
              border-yellow-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
