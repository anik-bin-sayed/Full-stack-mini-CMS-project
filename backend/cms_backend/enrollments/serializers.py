from rest_framework import serializers

from courses.serializers import CourseSerializer
from .models import Enrollment


class EnrolmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = "__all__"
        read_only_fields = ["student", "enrolled_at"]
