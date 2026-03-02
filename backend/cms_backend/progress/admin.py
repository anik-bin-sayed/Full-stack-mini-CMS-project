from django.contrib import admin

from .models import LessonProgress

# Register your models here.


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ("student", "lesson", "completed", "completed_at")
    list_filter = ("completed", "completed_at")
    search_fields = ("student__username", "lesson__title")
    date_hierarchy = "completed_at"
