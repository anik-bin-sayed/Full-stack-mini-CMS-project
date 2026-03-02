from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Lesson
from .serializers import LessonSerializer
from core.permissions import IsInstructor, IsLessonOwner

# Create your views here.


from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def get_permissions(self):

        if self.action == "create":
            return [IsInstructor()]

        if self.action in ["update", "partial_update", "destroy"]:
            return [IsInstructor(), IsLessonOwner()]

        return [AllowAny()]

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]

        if course.instructor != self.request.user:
            raise PermissionDenied("You are not the instructor of this course.")

        serializer.save(instructor=self.request.user)
