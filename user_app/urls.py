from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user_app.views import MenteeViewset, ProfileViewset

router = DefaultRouter()

router.register('profile', ProfileViewset)
router.register('mentee', MenteeViewset, basename='mentee')

urlpatterns = [
    path('', include(router.urls)),
]
