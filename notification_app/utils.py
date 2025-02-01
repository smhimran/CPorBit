from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def notify_user(user_id, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",
        {
            "type": "send_notification",
            "message": message,
        }
    )


@receiver(post_save, sender=Notification)
def send_new_notification(sender, instance, created, **kwargs):
    if created:
        notify_user(
            instance.user.id,
            {
                "id": instance.id,
                "type": instance.notification_type,
                "is_read": instance.is_read,
            }
        )
