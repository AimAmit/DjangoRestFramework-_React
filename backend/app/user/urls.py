from rest_framework.routers import DefaultRouter
from django.urls import path, include

from user.views import CreateUserView, CreateTokenView, ManageUserView, UserFavouriteRecipeView

app_name = 'user'

# router = DefaultRouter()

# router.register('recipes', UserFavouriteRecipeView, basename='recipes')

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('token/', CreateTokenView.as_view(), name='token'),
    path('me/', ManageUserView.as_view(), name='me'),
    path('recipes/', UserFavouriteRecipeView.as_view(), name='recipes')
    # path('', include(router.urls))
]
