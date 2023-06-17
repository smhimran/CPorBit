import logging
logger = logging.getLogger('django')

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
        try:
            notifications = Notification.objects.filter(user=self.request.user).order_by('-id')
            self.unread = notifications.filter(is_read=False).count()
            return notifications[:5]
        except Exception as ex:
            logger.exception(ex)
            return Response(status=500, data={'message': 'Some error occurred while getting notification data.'})

    def get_paginated_response(self, data):
        return self.paginator.get_paginated_response(data, self.unread)

    @action(detail=False, methods=['GET'])
    def all(self, request):
        try:
            notifications = Notification.objects.filter(user=self.request.user)
            serializer = NotificationSerializer(notifications, many=True)
            return Response(serializer.data)
        except Exception as ex:
            logger.exception(ex)
            return Response(status=500, data={'message': 'Some error occurred while getting all notification data.'})

    @action(detail=True, methods=['PUT'])
    def mark_as_read(self, request, pk=None):
        try:
            if pk:
                notification = Notification.objects.get(id=pk)
                notification.is_read = True
                notification.save()
                return Response(status=200)
        except Exception as ex:
            logger.exception(ex)
            return Response(status=500, data={'message': 'Some error occurred while marking notification as read.'})

    @action(detail=False, methods=['PUT'])
    def mark_all_as_read(self, request):
        try:
            notifications = Notification.objects.filter(user=self.request.user)
            notifications.update(is_read=True)
            return Response(status=200)
        except Exception as ex:
            logger.exception(ex)
            return Response(status=500, data={'message': 'Some error occurred while marking all notification as read.'})

    @action(detail=False, methods=['DELETE'])
    def clear_all(self, request):
        try:
            notifications = Notification.objects.filter(user=self.request.user)
            notifications.delete()
            return Response(status=200)
        except Exception as ex:
            logger.exception(ex)
            return Response(status=500, data={'message': 'Some error occurred while clearing all notification.'})
