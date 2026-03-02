from django.urls import path

from .views import EnrollmentCourseView, EnrollmentListView, CheckEnrollmentView

urlpatterns = [
    path("enroll/", EnrollmentCourseView.as_view(), name="enroll-course"),
    path("enrollments/", EnrollmentListView.as_view(), name="enrollments"),
    path(
        "check-enrollment/<int:course_id>/",
        CheckEnrollmentView.as_view(),
        name="check-enrollment",
    ),
]
