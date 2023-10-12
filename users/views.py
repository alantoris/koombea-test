"""Users views."""

# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# Serializers
from users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpSerializer,
    AuthtokenVerificationSerializer
)

# Models
from users.models import User


class UserViewSet(viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer
    lookup_field = 'email'

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['signup', 'login', 'verify_token']:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def verify_token(self, request):
        """Authtoken verification."""
        serializer = AuthtokenVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {'message': "Auth token verified "}
        return Response(data, status=status.HTTP_200_OK)
