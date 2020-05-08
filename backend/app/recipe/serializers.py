from rest_framework import serializers, permissions, authentication
# from django.contrib.auth import Tag
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

# from user.serializers import UserSerializer
from core.models import Tag, Ingredient, Recipe


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, value):
        try:
            Tag.objects.get(name=value.lower())
        except ObjectDoesNotExist:
            # Good to go
            pass
        else:
            # Username in use
            raise serializers.ValidationError('Tag with similar name Exist')

        return value


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, value):
        try:
            Ingredient.objects.get(name=value.lower())
        except ObjectDoesNotExist:
            # Good to go
            pass
        else:
            # Username in use
            raise serializers.ValidationError(
                'Ingredient with similar name Exist')

        return value


class UserRecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'name',)


class RecipeSerializer(serializers.ModelSerializer):

    # ingredients = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Ingredient.objects.all()
    # )

    # tags = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Tag.objects.all()
    # )

    user = UserRecipeSerializer()

    class Meta:
        model = Recipe
        fields = (
            'id', 'title', 'tags', 'ingredients',
            'time_minutes', 'price', 'link', 'user'
        )
        read_only_fields = ('id', 'user')
        extra_kwargs = {'tags': {'write_only': True},
                        'ingredients': {'write_only': True},
                        'link': {'write_only': True}
                        }

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags')
        tags = instance.tags
        ingredients_data = validated_data.pop('ingredients')
        ingredients = instance.ingredients
        validated_data.pop('user')

        instance.tags.set(tags_data)
        instance.ingredients.set(ingredients_data)
        instance.save()

        return super().update(instance, validated_data)


class RecipeDetailSerializer(RecipeSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    # user_favourites = serializers.BooleanField(label='user_favourites')

    class Meta:
        model = Recipe
        fields = (
            'id', 'title', 'tags', 'ingredients',
            'time_minutes', 'price', 'link', 'user', 'image',
        )
        read_only_fields = ('id', 'user',)


class RecipeImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ('id', 'image')
        read_only_fields = ('id',)
