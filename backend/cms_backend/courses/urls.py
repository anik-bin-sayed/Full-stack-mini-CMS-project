from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import CourseViewSet, MyCoursesView

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="course")

urlpatterns = router.urls + [
    path("my_courses/", MyCoursesView.as_view(), name="my-courses"),
]
