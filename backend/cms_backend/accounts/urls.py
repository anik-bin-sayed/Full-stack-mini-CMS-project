from django.urls import path
from .views import (
    RegisterApiView,
    LoginView,
    RefreshTokenApiView,
    ProfileApiView,
    LogoutApiView,
)


urlpatterns = [
    path("user/register/", RegisterApiView.as_view(), name="register"),
    path("user/login/", LoginView.as_view(), name="login"),
    path("user/refresh-token/", RefreshTokenApiView.as_view(), name="refresh-token"),
    path("user/profile/", ProfileApiView.as_view(), name="profile"),
    path("user/logout/", LogoutApiView.as_view(), name="logout"),
]
