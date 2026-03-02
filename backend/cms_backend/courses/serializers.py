# course/serializers.py
from rest_framework import serializers
from .models import Course
from lesson.serializers import LessonSerializer


class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField()
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ["instructor", "created_at", "updated_at"]


class CourseDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ["instructor", "created_at", "updated_at"]
