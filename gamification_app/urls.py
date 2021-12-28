from django.urls import include, path
from rest_framework.routers import DefaultRouter

from gamification_app.views import (StandingsViewset, get_user_score,
                                    get_user_stats, get_user_strength,
                                    get_user_weakness)

router = DefaultRouter()

router.register('', StandingsViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('profile/<username>/', get_user_score, name='profile-score'),
    path('profile/<username>/stats/', get_user_stats, name='profile-stats'),
    path('profile/<username>/strengths/', get_user_strength, name='profile-strengths'),
    path('profile/<username>/weaknesses/', get_user_weakness, name='profile-weakness'),
]
