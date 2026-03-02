from django.urls import path

from .views import MarkLessonCompletedApiView, CourseProgressView

urlpatterns = [
    path("completed/", MarkLessonCompletedApiView.as_view(), name="completed-lesson"),
    path(
        "course/<int:course_id>/",
        CourseProgressView.as_view(),
        name="course-progress",
    ),
]
