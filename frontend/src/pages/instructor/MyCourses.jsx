import React from "react";
import { useSelector } from "react-redux";

// Local Import
import { useGetCoursesQuery } from "../../features/courses/courseApi";
import CourseCard from "../../components/courses/CourseCard";

const MyCourses = () => {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, error, data } = useGetCoursesQuery();

  if (isLoading) return <p className="text-center mt-20">Loading courses...</p>;

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load courses</p>
    );

  const courses = data?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        <p className="text-gray-500 mt-1">
          Manage all your created courses here.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No courses created yet.
          </p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              user={user}
              role="instructor"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
