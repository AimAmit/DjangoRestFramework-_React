from rest_framework import generics, permissions, viewsets, mixins
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


from user import serializers

from core.models import Recipe, UserFavourites


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        refresh = RefreshToken.for_user(user=serializer.instance)
        return Response({'access': str(refresh.access_token), 'refresh': str(refresh), 'user': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_object(self):
        return self.request.user


class UserFavouriteRecipeView(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserFavouriteRecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_object(self):
        return self.request.user

    def perform_create(self, serializer):
        print(serializer['favourites'])
        serializer.save(id=self.request.user.id)

    def get_queryset(self):
        return get_user_model().objects.filter(id=self.request.user.id)
