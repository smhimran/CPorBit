from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from notification_app.models import Notification
from notification_app.serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    allowed_methods = ['GET', 'PUT', 'DELETE']

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
