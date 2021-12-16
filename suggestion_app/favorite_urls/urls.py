from django.urls import path
from suggestion_app.favorite_urls.views import FavoriteAV

urlpatterns = [
    path('', FavoriteAV.as_view(), name='all-favorite-problems'),
]