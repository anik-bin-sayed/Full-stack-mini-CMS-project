import React from "react";
import { useSelector } from "react-redux";

import { useGetEnrollmentsQuery } from "../../features/enrollment/enrollApi";

import StudentCourseCard from "./StudentCourseCard";

const StudentEnrolledCourses = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isError } = useGetEnrollmentsQuery();

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load enrollments
      </p>
    );

  const enrollments = Array.isArray(data?.results) ? data.results : [];
  const enrolledCourses = enrollments.filter(
    (enroll) => enroll.student === user?.id,
  );

  if (!enrolledCourses.length)
    return (
      <p className="text-center text-gray-500 mt-10">
        You have not enrolled in any courses yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Enrolled Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((enroll) => (
          <StudentCourseCard key={enroll.id} enroll={enroll} />
        ))}
      </div>
    </div>
  );
};

export default StudentEnrolledCourses;
