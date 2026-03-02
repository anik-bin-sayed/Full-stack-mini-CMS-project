import React from "react";
import { Link } from "react-router-dom";
import { useGetCourseProgressQuery } from "../../features/progress/progressApi";

const StudentCourseCard = ({ enroll }) => {
  const { data: progressData } = useGetCourseProgressQuery(enroll.course.id);

  const courseId = enroll.course.id;

  const title =
    enroll.course.title.length > 40
      ? enroll.course.title.slice(0, 40) + "..."
      : enroll.course.title;

  return (
    <Link to={`/dashboard/my-courses/${courseId}`} className="block h-full">
      <div
        className="
        bg-white dark:bg-gray-800
        rounded-md shadow-md overflow-hidden
        flex flex-col h-full
        hover:outline transition duration-300
      "
      >
        <img
          src={enroll.course.thumbnail}
          alt={enroll.course.title}
          className="w-full h-44 object-cover"
        />

        <div className="p-4 flex flex-col flex-grow">
          <div className="min-h-[72px]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enrolled at: {new Date(enroll.enrolled_at).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-auto pt-4">
            {progressData ? (
              <>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${progressData.progress}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {progressData.completed_lessons}/{progressData.total_lessons}{" "}
                  lessons completed
                </p>
              </>
            ) : (
              <div className="h-8"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCourseCard;
