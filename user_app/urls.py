from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user_app.views import MenteeViewset, ProfileViewset, get_user_info

router = DefaultRouter()

router.register('profile', ProfileViewset)
router.register('mentee', MenteeViewset, basename='mentee')

urlpatterns = [
    path('', include(router.urls)),
    path('<username>/', get_user_info, name='user_info'),
]
