import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../features/courses/courseApi";
import { toast } from "react-toastify";

const CourseCard = ({
  course,
  user = {},
  role = "",
  handleEditData = () => {},
}) => {
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const handleDelete = async (id) => {
    try {
      await toast.promise(deleteCourse(id).unwrap(), {
        pending: "Deleting course...",
        success: "Course deleted successfully",
        error: "Failed to delete course",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="
      group
      bg-white
      rounded-md
      shadow-md
      hover:outline
      transition-all duration-300
      overflow-hidden
      flex flex-col
      "
    >
      <Link
        to={
          role === "student"
            ? `/details/${course.id}`
            : `/instructor/details/${course.id}`
        }
      >
        <div className="overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="
            w-full h-44 md:h-48
            object-cover
            transition duration-500
            "
          />
        </div>

        <div className="p-5">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1">
            {course.title}
          </h2>

          <p className="text-gray-500 mt-2 text-sm line-clamp-3">
            {course.description}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 mt-auto">
        {user?.role === "instructor" && course?.instructor === user?.email ? (
          <div className="space-y-3">
            <div className="flex gap-3">
              <Link
                to={`/instructor/edit/${course.id}`}
                onClick={() => handleEditData(course)}
                className="
                flex-1 text-center
                bg-yellow-400
                hover:bg-yellow-500
                font-semibold
                py-2 rounded
                transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(course.id)}
                disabled={isLoading}
                className="
                flex-1
                bg-red-400
                hover:bg-red-500
                font-semibold
                py-2
                rounded
                cursor-pointer
                transition
                text-white"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>

            <Link
              to={`/instructor/manage-lessons/${course.id}`}
              className="
              block text-center
              bg-gray-900
              hover:bg-black
              text-white
              font-semibold
              py-2
              rounded
              transition"
            >
              Manage Lessons
            </Link>
          </div>
        ) : user?.role === "instructor" ? (
          <button
            className="
            w-full
            bg-gray-200
            text-gray-600
            font-semibold
            py-2
            rounded"
          >
            Not Your created Course
          </button>
        ) : null}

        {user?.role === "student" && (
          <Link
            to={`/details/${course.id}`}
            className="
            block text-center
            bg-yellow-500
            hover:bg-yellow-400
            font-semibold
            py-2
            rounded
            shadow
            transition"
          >
            View Course
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
