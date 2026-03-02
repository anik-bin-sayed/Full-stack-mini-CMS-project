from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .models import Enrollment
from .serializers import EnrolmentSerializer
from courses.models import Course
from core.permissions import IsStudentOnly

# Create your views here.


class EnrollmentCourseView(generics.CreateAPIView):
    serializer_class = EnrolmentSerializer
    permission_classes = [IsAuthenticated, IsStudentOnly]

    def create(self, request, *args, **kwargs):
        course_id = request.data.get("course")

        if not course_id:
            raise ValidationError("Course ID is required")

        course = Course.objects.get(id=course_id)

        enrolled = Enrollment.objects.filter(
            student=request.user, course=course
        ).exists()

        if enrolled:
            raise ValidationError("You are already enrolled in this course")

        enrollment = Enrollment.objects.create(student=request.user, course=course)

        serializer = self.get_serializer(enrollment)

        return Response(serializer.data)


class EnrollmentListView(generics.ListAPIView):
    serializer_class = EnrolmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user).select_related(
            "course"
        )


class CheckEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        user = request.user

        enrolled = Enrollment.objects.filter(student=user, course_id=course_id).exists()

        return Response({"enrolled": enrolled})
