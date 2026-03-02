from django.db import models
from django.conf import settings
from courses.models import Course
from urllib.parse import urlparse, parse_qs

# Create your models here.


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lessons",
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=200)
    video_url = models.URLField()
    duration = models.PositiveIntegerField()
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.course.title}-{self.title}"

    def save(self, *args, **kwargs):

        parsed = urlparse(self.video_url)

        # youtube watch url
        if "youtube.com" in parsed.netloc:
            query = parse_qs(parsed.query)
            video_id = query.get("v")

            if video_id:
                self.video_url = f"https://www.youtube.com/embed/{video_id[0]}"

        # short url
        elif "youtu.be" in parsed.netloc:
            video_id = parsed.path.lstrip("/")
            self.video_url = f"https://www.youtube.com/embed/{video_id}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.course.title} - {self.title}"
