import React from "react";
import { useParams } from "react-router-dom";

// Local Import
import { useGetCourseDetailsQuery } from "../../../features/courses/courseApi";
import {
  useGetCourseProgressQuery,
  useMarkLessonCompleteMutation,
} from "../../../features/progress/progressApi";

const Course = () => {
  const { id } = useParams();

  const { data: courseData, isLoading, isError } = useGetCourseDetailsQuery(id);

  const { data: progressData, refetch } = useGetCourseProgressQuery(id);

  const [toggleLessonComplete] = useMarkLessonCompleteMutation();

  const handleComplete = async (lessonId) => {
    try {
      await toggleLessonComplete(lessonId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading lessons...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading lessons</p>
    );

  const lessons = courseData?.lessons || [];

  const totalLessons = lessons.length;
  const completedLessons = progressData?.completed_lessons_ids?.length || 0;

  const progressPercent =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {progressPercent.toFixed(0)}%
          </span>

          <span className="text-sm text-gray-500">
            {completedLessons} / {totalLessons} lessons
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-yellow-400 h-3 rounded transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch ">
        {lessons.map((lesson) => {
          const completed = progressData?.completed_lessons_ids?.includes(
            lesson.id,
          );

          return (
            <div
              key={lesson.id}
              className={`
                bg-white dark:bg-gray-800
                rounded-xl shadow-md
                flex flex-col h-full
                overflow-hidden
                transition duration-300
                hover:outline
                ${completed ? " border-green-500 border-2" : ""}
              `}
            >
              <div className="aspect-video w-full">
                <iframe
                  src={lesson.video_url}
                  title={lesson.title}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="min-h-[60px]">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {lesson.title}
                  </h3>
                </div>

                <div className="mt-auto">
                  <span className="text-sm m-2">
                    Duration : {lesson.duration} min
                  </span>
                  <button
                    onClick={() => handleComplete(lesson.id)}
                    className={`w-full px-3 py-2 text-sm rounded font-medium transition cursor-pointer ${
                      completed
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {completed ? "Completed" : "Mark as Complete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Course;
