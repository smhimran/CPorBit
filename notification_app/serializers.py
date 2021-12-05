from rest_framework import serializers

from notification_app.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'notification_type', 'is_read')
        read_only_fields = ('id', 'notification_type', )
