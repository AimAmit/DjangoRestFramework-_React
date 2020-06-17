from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, filters
from rest_framework import permissions, authentication, status

# from django.utils.decorators import method_decorator
# from django.views.decorators.cache import cache_page
# from django.views.decorators.vary import vary_on_cookie
# from django.core.cache import cache
import json
from django_redis import get_redis_connection

from recipe import serializers
from core.models import Tag, Ingredient, Recipe, User


cache = get_redis_connection('default')


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        if (request.method in permissions.SAFE_METHODS):
            return True
        if(request.user.is_authenticated and request.method == 'POST'):
            return True
        if (request.user and request.user.is_authenticated):
            try:
                recipe = Recipe.objects.get(id=int(view.kwargs['pk']))
            except:
                return False
            if(recipe.user == request.user):
                return True
        return False


class BaseListViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = self.queryset

        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        mine = self.request.query_params.get('mine', 0)

        if assigned_only:
            queryset = queryset.filter(recipe__isnull=False)

        if self.request.user.is_authenticated and mine:
            return queryset.filter(user=self.request.user).distinct()

        return queryset.order_by('name')


class BaseCreateViewSet(viewsets.GenericViewSet,
                        mixins.CreateModelMixin):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.TokenAuthentication,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class TagViewSet(BaseListViewSet, BaseCreateViewSet):
    serializer_class = serializers.TagSerializer
    queryset = Tag.objects.all()
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def list(self, request, *args, **kwargs):
        data = cache.get('all_tags')
        if not data:
            data = serializers.TagSerializer(Tag.objects.all(), many=True).data
            cache.set('all_tags', json.dumps(data), 60*60*2)
        else:
            data = json.loads(data)
        return Response(data)

    def perform_create(self, serializer):
        cache.delete('all_tags')
        serializer.save(user=self.request.user)


class IngredientViewSet(BaseListViewSet, BaseCreateViewSet):
    serializer_class = serializers.IngredientSerializer
    queryset = Ingredient.objects.all()
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def list(self, request, *args, **kwargs):
        data = cache.get('all_ingredients')
        if not data:
            data = serializers.IngredientSerializer(
                Ingredient.objects.all(), many=True).data
            cache.set('all_ingredients', json.dumps(data), 60*60*2)
        else:
            data = json.loads(data)
        return Response(data)

    def perform_create(self, serializer):
        cache.delete('all_ingredients')
        serializer.save(user=self.request.user)


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.TokenAuthentication,)

    def list(self, request, *args, **kwargs):
        data = cache.get('all_recipes')
        if not data:
            data = serializers.RecipeSerializer(
                Recipe.objects.all(), many=True).data
            cache.set('all_recipes', json.dumps(data), 60*60*2)
        else:
            data = json.loads(data)
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        fav = False
        if not self.request.user.is_anonymous:
            fav = self.queryset.filter(
                user_favourites=self.request.user, id=self.kwargs['pk']).exists()

        recipe = cache.get('recipe_'+self.kwargs['pk'])
        if not recipe:
            instance = self.get_object()
            recipe = self.get_serializer(instance).data
            cache.set('recipe_'+self.kwargs['pk'], json.dumps(recipe), 60*60*2)
        else:
            recipe = json.loads(recipe)
        return Response({**recipe, 'favourites': fav})

    def query_params_to_ints(self, qs):
        return [int(id) for id in qs.split(',')]

    def perform_create(self, serializer):
        cache.delete('all_recipes')
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        cache.delete('all_recipes')
        cache.delete('recipe_'+self.kwargs['pk'])
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        cache.delete('all_recipes')
        cache.delete('recipe_'+self.kwargs['pk'])
        return super().destroy(request, *args, **kwargs)

    def get_serializer_class(self):

        if self.action == 'retrieve':
            return serializers.RecipeDetailSerializer
        elif self.action == 'upload_image':
            return serializers.RecipeImageSerializer

        return serializers.RecipeSerializer

    def get_queryset(self):

        queryset = Recipe.objects.all()
        tags = self.request.query_params.get('tags')
        ingredients = self.request.query_params.get('ingredients')
        mine = self.request.query_params.get('mine')

        if tags:
            tag_ids = self.query_params_to_ints(tags)
            queryset = queryset.filter(tags__id__in=tag_ids)

        if ingredients:
            ingredient_ids = self.query_params_to_ints(ingredients)
            queryset = queryset.filter(ingredients__id__in=ingredient_ids)

        if self.request.user.is_authenticated and mine:
            return queryset.filter(user=self.request.user)
        return queryset.order_by('title')

    @action(methods=['GET', 'POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        recipe = self.get_object()
        serializer = self.get_serializer(
            recipe,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            data=serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
