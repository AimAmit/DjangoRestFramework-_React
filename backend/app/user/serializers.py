from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from itertools import chain


from core.models import UserFavourites, Recipe
from recipe.serializers import RecipeSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'name', 'sex', 'age')
        read_only_fields = ('id', 'last_login', 'email')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 5,
                'style': {
                    'input_type': 'password'
                }
            }
        }

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)


class AuthTokenSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs


class FavourtieRecipeSerializer(serializers.ModelSerializer):
    # id = serializers.ModelField(
    #     model_field=ServiceType()._meta.get_field('id'))

    id = serializers.IntegerField(required=False)

    class Meta:
        model = Recipe
        fields = ('id', 'title',)
        read_only_fields = ('title',)


class UserFavouriteRecipeSerializer(serializers.ModelSerializer):
    # favourites = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Recipe.objects.all())
    favourites = FavourtieRecipeSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'favourites',)
        read_only_fields = ('id',)
        extra_kwargs = {'favourites': {'write_only': True}}

    def update(self, instance, validated_data):
        favourites_data = validated_data.pop('favourites')
        fav = instance.favourites
        for x in favourites_data:
            rec = Recipe.objects.get(**x)
            if(fav.filter(id=rec.id).exists()):
                fav.remove(rec)
            else:
                fav.add(rec)
        # print(fav)
        instance.favourites.set(fav.all())
        # print(favourites_data[0].items())
        # print(instance.favourites.filter(id=3))
        # prev_favourites = set(instance.favourites.all())

        # instance.favourites.set(
        #     prev_favourites.symmetric_difference(favourites_data))
        instance.save()

        return super().update(instance, validated_data)
