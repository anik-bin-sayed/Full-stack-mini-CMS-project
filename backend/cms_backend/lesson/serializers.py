from rest_framework import serializers
from .models import Lesson
from urllib.parse import urlparse, parse_qs


class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = "__all__"
        read_only_fields = ["instructor"]

    def validate_video_url(self, value):

        parsed_url = urlparse(value)

        if "youtube.com" in parsed_url.netloc:
            query = parse_qs(parsed_url.query)
            video_id = query.get("v")

            if video_id:
                return f"https://www.youtube.com/embed/{video_id[0]}"

        if "youtu.be" in parsed_url.netloc:
            video_id = parsed_url.path.lstrip("/")
            return f"https://www.youtube.com/embed/{video_id}"

        return value
