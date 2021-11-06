from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user_app.views import ProfileViewset

router = DefaultRouter()

router.register('profile', ProfileViewset)

urlpatterns = [
    path('', include(router.urls)),
]
