from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from notification_app.models import Notification
from notification_app.paginations.NotificationPagination import \
    NotificationPagination
from notification_app.serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination
    allowed_methods = ['GET', 'PUT', 'DELETE']

    def get_queryset(self):
        notifications = Notification.objects.filter(user=self.request.user)
        self.unread = notifications.filter(is_read=False).count()
        return notifications[:5]

    def get_paginated_response(self, data):
        return self.paginator.get_paginated_response(data, self.unread)

    @action(detail=False, methods=['GET'])
    def all(self, request):
        notifications = Notification.objects.filter(user=self.request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['PUT'])
    def mark_as_read(self, request, pk=None):
        if pk:
            notification = Notification.objects.get(id=pk)
            notification.is_read = True
            notification.save()
            return Response(status=200)

    @action(detail=False, methods=['PUT'])
    def mark_all_as_read(self, request):
        notifications = Notification.objects.filter(user=self.request.user)
        notifications.update(is_read=True)
        return Response(status=200)

    @action(detail=False, methods=['DELETE'])
    def clear_all(self, request):
        notifications = Notification.objects.filter(user=self.request.user)
        notifications.delete()
        return Response(status=200)
