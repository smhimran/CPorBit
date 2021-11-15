from django.urls import include, path
from rest_framework.routers import DefaultRouter

from gamification_app.views import StandingsViewset

router = DefaultRouter()

router.register('', StandingsViewset)

urlpatterns = [
    path('', include(router.urls)),
]
