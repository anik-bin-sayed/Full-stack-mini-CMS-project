import { useState } from "react";
import { useSelector } from "react-redux";

import CourseCard from "../../components/courses/CourseCard";
import { useGetALLCoursesQuery } from "../../features/courses/courseApi";
import Loader from "../../components/Loader";

const AllCourses = () => {
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetALLCoursesQuery(page);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load courses</p>
    );

  const courses = data?.results || [];

  const handleEditData = (course) => {
    console.log(course);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">All Courses</h1>
        <p className="text-gray-500">Browse all available courses</p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No courses found
          </p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              user={user}
              role="instructor"
              handleEditData={handleEditData}
            />
          ))
        )}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={!data.previous}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          disabled={!data.next}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-yellow-400 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCourses;
