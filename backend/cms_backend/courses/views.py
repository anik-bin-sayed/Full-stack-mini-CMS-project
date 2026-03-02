from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Course
from .serializers import CourseSerializer
from core.permissions import IsInstructor, IsCourseOwner

# Create your views here.


class CourseViewSet(viewsets.ModelViewSet):
    queryset = (
        Course.objects.select_related("instructor")
        .prefetch_related("lessons")
        .order_by("-created_at")
    )

    serializer_class = CourseSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    ordering_fields = ["created_at"]

    search_fields = [
        "title",
        "description",
        "instructor__username",
    ]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def get_permissions(self):

        if self.action == "create":
            return [IsInstructor()]

        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsInstructor(), IsCourseOwner()]
        return [AllowAny()]


class MyCoursesView(ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(instructor=user).order_by("-created_at")
