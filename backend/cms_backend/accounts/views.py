from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


from .serializers import RegisterSerializer


# Create your views here.
class RegisterApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {"message": "User register successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if not user:
            return Response(
                {"error": "Email or password is wrong"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "message": "Login successfully",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )

        # Cookies

        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 5,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=24 * 60 * 60,
        )

        return response


class RefreshTokenApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            new_refresh_token = str(refresh)

        except TokenError:
            response = Response(
                {"error": "Invalid or expired refresh token"}, status=401
            )
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            return response

        response = Response({"message": "Token refreshed"})

        response.set_cookie(
            key="access_token",
            value=str(access_token),
            httponly=True,
            secure=False,
            path="/",
            samesite="Lax",
            max_age=5 * 60,
        )

        response.set_cookie(
            key="refresh_token",
            value=new_refresh_token,
            httponly=True,
            secure=False,
            path="/",
            samesite="Lax",
            max_age=24 * 60 * 60,
        )

        return response


class ProfileApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(
            {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                    "fullName": user.full_name,
                }
            },
            status=status.HTTP_200_OK,
        )


class LogoutApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logout successfully"})

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
