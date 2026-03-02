from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import LessonViewSet

router = DefaultRouter()

router.register(r"lessons", LessonViewSet, basename="lessons")


lesson_list = LessonViewSet.as_view(
    {
        "get": "list",
        "post": "create",
    }
)

urlpatterns = [
    path("", include(router.urls)),
    path("courses/<int:course_id>/lessons/", lesson_list, name="course-lessons"),
]
