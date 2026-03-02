from rest_framework.permissions import BasePermission


class IsInstructor(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "instructor"


class IsCourseOwner(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.instructor == request.user


class IsLessonOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.instructor == request.user


class IsStudentOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "student" and request.user.is_authenticated
