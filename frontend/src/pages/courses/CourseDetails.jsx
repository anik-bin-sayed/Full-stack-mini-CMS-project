import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailsQuery } from "../../features/courses/courseApi";

import { useSelector } from "react-redux";
import {
  useCheckEnrollmentsQuery,
  useEnrollCourseMutation,
} from "../../features/enrollment/enrollApi";

import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";

const CourseDetails = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isStudent = user?.role === "student";
  const isInstructor = user?.role === "instructor";

  const [selectedLesson, setSelectedLesson] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useGetCourseDetailsQuery(id);

  const [enrollCourse, { isLoading: enrolling }] = useEnrollCourseMutation();

  const { data: checkEnrollments } = useCheckEnrollmentsQuery(id, {
    skip: !isStudent,
  });

  const checkEnroll = checkEnrollments?.enrolled;

  useEffect(() => {
    if (course?.lessons?.length > 0) {
      setSelectedLesson(course.lessons[0]);
    }
  }, [course]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-500">{error?.data?.detail}</p>;

  const handleEnrollment = async () => {
    try {
      await toast.promise(enrollCourse(id).unwrap(), {
        pending: "Enrolling...",
        success: "Enrollment successful",
        error: "Enrollment failed",
      });

      navigate("/dashboard/my-courses");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLessonClick = (lesson, index) => {
    if (isInstructor) {
      setSelectedLesson(lesson);
      return;
    }

    if ((!isAuthenticated || isStudent) && !checkEnroll && index !== 0) {
      toast.warning("Please enroll to unlock all lessons");
      return;
    }

    if (!isAuthenticated) {
      toast.warning("Please login and enroll to unlock all lessons");
      return;
    }

    setSelectedLesson(lesson);
  };

  return (
    <>
      <PageTitle title="Course Details | EduMaster" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>

            <p className="mt-3 text-gray-600">{course.description}</p>

            {isStudent &&
              (!checkEnroll ? (
                <button
                  onClick={handleEnrollment}
                  disabled={enrolling}
                  className="mt-5 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-semibold cursor-pointer transition"
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              ) : (
                <button className="mt-5 bg-gray-200 text-gray-500 px-6 py-3 rounded font-semibold cursor-not-allowed ">
                  Enrolled
                </button>
              ))}
          </div>
          <div className="">
            <div className="bg-black aspect-video rounded overflow-hidden">
              {selectedLesson && (
                <iframe
                  src={selectedLesson.video_url}
                  title="Lesson Video"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>

            {isAuthenticated && (
              <h3 className="mt-5 font-semibold">Course Lessons</h3>
            )}

            {isAuthenticated ? (
              <ul className="space-y-3 h-50 mt-3 max-h-[350px] overflow-y-auto">
                {course.lessons.map((lesson, index) => {
                  const locked =
                    (!isAuthenticated || isStudent) &&
                    !checkEnroll &&
                    index !== 0;

                  return (
                    <li
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson, index)}
                      className={`
                    p-4 rounded border flex justify-between
                    ${
                      locked
                        ? "bg-gray-100 cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:shadow"
                    }
                    ${
                      selectedLesson?.id === lesson.id
                        ? "border-yellow-400 bg-yellow-100"
                        : ""
                    }
                  `}
                    >
                      <div className="flex gap-2">
                        <span>{lesson.order}.</span>
                        <span>{lesson.title}</span>
                      </div>

                      {locked && (
                        <span className="text-red-400 text-sm">Locked</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <button className="w-full border cursor-not-allowed px-4 py-2 rounded bg-yellow-100 opacity-50 mt-10">
                Please login to view full Course
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
