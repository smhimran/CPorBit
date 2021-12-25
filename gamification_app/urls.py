from django.urls import include, path
from rest_framework.routers import DefaultRouter

from gamification_app.views import StandingsViewset, get_user_score

router = DefaultRouter()

router.register('', StandingsViewset)

urlpatterns = [
    path('profile/', get_user_score, name='profile-score'),
    path('', include(router.urls)),
]
