from django.db import models
from django.conf import settings
from courses.models import Course

User = settings.AUTH_USER_MODEL

# Create your models here.


class Enrollment(models.Model):
    student = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="enrollments"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrollments"
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress = models.FloatField(default=0, blank=True, null=True)

    class Meta:
        unique_together = ("student", "course")

    def __str__(self):
        return f"{self.student.username} enrolled in {self.course.title}"
