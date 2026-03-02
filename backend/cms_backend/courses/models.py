from django.db import models

from accounts.models import User


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Course(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="thumbnail/", blank=True, null=True)
    instructor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="course_teacher",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_banned = models.CharField(
        max_length=200,
        default=False,
    )

    def __str__(self):
        return self.title
