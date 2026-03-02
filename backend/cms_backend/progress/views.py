# views.py
from django.utils.timezone import now
from django.shortcuts import get_object_or_404 as get

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import LessonProgress
from courses.models import Course
from lesson.models import Lesson
from core.permissions import IsStudentOnly


class MarkLessonCompletedApiView(APIView):
    permission_classes = [IsAuthenticated, IsStudentOnly]

    def post(self, request):
        lesson_id = request.data.get("lesson_id")

        if not lesson_id:
            return Response(
                {"error": "Lesson ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        lesson = get(Lesson, id=lesson_id)

        # Get or create progress object
        progress, created = LessonProgress.objects.get_or_create(
            student=request.user, lesson=lesson
        )

        progress.completed = not progress.completed
        progress.completed_at = now() if progress.completed else None
        progress.save()

        return Response(
            {"message": "Lesson marked as completed"}, status=status.HTTP_200_OK
        )


class CourseProgressView(APIView):
    permission_classes = [IsAuthenticated, IsStudentOnly]

    def get(self, request, course_id):
        course = get(Course, id=course_id)

        total_lessons = Lesson.objects.filter(course=course).count()

        completed_lessons_qs = LessonProgress.objects.filter(
            student=request.user, lesson__course=course, completed=True
        )

        completed_lessons = completed_lessons_qs.count()
        completed_ids = list(completed_lessons_qs.values_list("lesson_id", flat=True))

        progress = (completed_lessons / total_lessons * 100) if total_lessons > 0 else 0

        return Response(
            {
                "total_lessons": total_lessons,
                "completed_lessons": completed_lessons,
                "progress": round(progress, 2),
                "completed_lessons_ids": completed_ids,
            }
        )
