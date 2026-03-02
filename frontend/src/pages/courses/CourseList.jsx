import React, { useEffect, useState } from "react";
import { getCourse } from "../../features/courses/courseApi";
import CourseCard from "../../components/courses/CourseCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourse().then((data) => {
      setCourses(data.results);
    });
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
