from django.urls import include, path
from rest_framework.routers import DefaultRouter as Router

from notification_app.views import NotificationViewSet

router = Router()

router.register('', NotificationViewSet, basename='Notification')

urlpatterns = [
    path('', include(router.urls))
]
