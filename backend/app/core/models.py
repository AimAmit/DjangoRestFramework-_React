import os
import uuid

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, \
    PermissionsMixin
from django.conf import settings


def upload_recipe_image(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/recipe', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):

        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):

    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now_add=True)
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
    )
    sex = models.CharField(blank=True, null=True,
                           max_length=1, choices=GENDER_CHOICES)
    age = models.IntegerField(blank=True, null=True)
    favourites = models.ManyToManyField(
        'Recipe', related_name='user_favourites')

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name + ' - ' + self.email


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)

    def __str__(self):
        if self.name:
            return self.name
        else:
            return ''

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super().save(*args, **kwargs)


class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name if self.name else ''

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super().save(*args, **kwargs)


class Recipe(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    time_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    link = models.CharField(max_length=255, blank=True)

    tags = models.ManyToManyField('Tag')
    ingredients = models.ManyToManyField('Ingredient')

    image = models.ImageField(null=True, upload_to=upload_recipe_image)

    def __str__(self):
        return self.title if self.title else ''


class UserFavourites(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    recipe = models.ManyToManyField(Recipe)

    def __str__(self):
        return self.favourite.title
